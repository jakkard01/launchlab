import productsData from "../../../data/products.json";
import type { Product } from "../types";
import type {
  AdminSnapshot,
  DailySalesEntry,
  DailySalesInput,
  HotState,
  MoDataAdapter,
  MoStats,
  OrderLogEntry,
  OrderLogInput,
  PromoState,
  StockStatus,
} from "./types";

const STORAGE_KEY = "moData.v1";

type LocalStore = {
  stock: Record<string, StockStatus>;
  prices: Record<string, string>;
  promo: Record<string, PromoState>;
  hotToday: Record<string, HotState>;
  orderLogs: OrderLogEntry[];
  dailySales: DailySalesEntry[];
};

const emptyHotState = (): HotState => ({
  status: "preparando",
  windowStart: "",
  windowEnd: "",
  note: "",
  updatedAt: new Date(0).toISOString(),
});

const createDefaultStore = (products: Product[]): LocalStore => {
  const stock: Record<string, StockStatus> = {};
  const prices: Record<string, string> = {};
  const promo: Record<string, PromoState> = {};
  const hotToday: Record<string, HotState> = {};

  products.forEach((product) => {
    stock[product.id] = "disponible";
    prices[product.id] = product.price;
    promo[product.id] = {
      enabled: product.promoEnabled ?? false,
      percent: product.promoPercent ?? 0,
    };
    hotToday[product.id] = emptyHotState();
  });

  return {
    stock,
    prices,
    promo,
    hotToday,
    orderLogs: [],
    dailySales: [],
  };
};

const ensureStore = (incoming: Partial<LocalStore>, products: Product[]) => {
  const base = createDefaultStore(products);

  return {
    ...base,
    ...incoming,
    stock: { ...base.stock, ...incoming.stock },
    prices: { ...base.prices, ...incoming.prices },
    promo: { ...base.promo, ...incoming.promo },
    hotToday: { ...base.hotToday, ...incoming.hotToday },
    orderLogs: Array.isArray(incoming.orderLogs) ? incoming.orderLogs : [],
    dailySales: Array.isArray(incoming.dailySales) ? incoming.dailySales : [],
  } as LocalStore;
};

const products = productsData as Product[];
let memoryStore: LocalStore = createDefaultStore(products);

const readStore = () => {
  if (typeof window === "undefined") {
    return memoryStore;
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    const fresh = createDefaultStore(products);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(fresh));
    return fresh;
  }

  try {
    const parsed = JSON.parse(raw) as Partial<LocalStore>;
    return ensureStore(parsed, products);
  } catch {
    const fresh = createDefaultStore(products);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(fresh));
    return fresh;
  }
};

const writeStore = (next: LocalStore) => {
  if (typeof window === "undefined") {
    memoryStore = next;
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
};

const buildStats = (store: LocalStore): MoStats => {
  const now = new Date();
  const top7: Record<string, number> = {};
  const top30: Record<string, number> = {};
  const soldOutRequests: Record<string, number> = {};

  store.orderLogs.forEach((order) => {
    const createdAt = new Date(order.createdAt);
    const diffDays = Math.floor(
      (now.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24)
    );

    order.items.forEach((item) => {
      if (diffDays <= 6) {
        top7[item.productId] = (top7[item.productId] ?? 0) + item.quantity;
      }
      if (diffDays <= 29) {
        top30[item.productId] = (top30[item.productId] ?? 0) + item.quantity;
      }
      if (store.stock[item.productId] === "agotado") {
        soldOutRequests[item.productId] =
          (soldOutRequests[item.productId] ?? 0) + item.quantity;
      }
    });
  });

  const toEntries = (bucket: Record<string, number>) =>
    Object.entries(bucket)
      .map(([productId, quantity]) => ({ productId, quantity }))
      .sort((a, b) => b.quantity - a.quantity);

  return {
    top7: toEntries(top7).slice(0, 7),
    top30: toEntries(top30).slice(0, 7),
    mostRequestedSoldOut: toEntries(soldOutRequests).slice(0, 5),
  };
};

const decorateProducts = (store: LocalStore) => {
  return products.map((product) => ({
    ...product,
    price: store.prices[product.id] ?? product.price,
    promoEnabled: store.promo[product.id]?.enabled ?? false,
    promoPercent: store.promo[product.id]?.percent ?? 0,
    stockStatus: store.stock[product.id] ?? "disponible",
  }));
};

export const localAdapter: MoDataAdapter = {
  async getProducts() {
    const store = readStore();
    return decorateProducts(store);
  },
  async getAdminSnapshot(): Promise<AdminSnapshot> {
    const store = readStore();
    return {
      products: decorateProducts(store),
      stock: store.stock,
      prices: store.prices,
      promo: store.promo,
      hotToday: store.hotToday,
      orderLogs: store.orderLogs,
      dailySales: store.dailySales,
    };
  },
  async updateStock(id, status) {
    const store = readStore();
    const next = {
      ...store,
      stock: { ...store.stock, [id]: status },
    };
    writeStore(next);
  },
  async updatePrice(id, price) {
    const store = readStore();
    const next = {
      ...store,
      prices: { ...store.prices, [id]: price },
    };
    writeStore(next);
  },
  async updatePromo(id, enabled, percent) {
    const store = readStore();
    const next = {
      ...store,
      promo: {
        ...store.promo,
        [id]: {
          enabled,
          percent,
        },
      },
    };
    writeStore(next);
  },
  async updateHot(id, nextHot) {
    const store = readStore();
    const current = store.hotToday[id] ?? emptyHotState();
    const next: LocalStore = {
      ...store,
      hotToday: {
        ...store.hotToday,
        [id]: {
          ...current,
          ...nextHot,
          updatedAt: new Date().toISOString(),
        },
      },
    };
    writeStore(next);
  },
  async logOrder(entry: OrderLogInput) {
    const store = readStore();
    const record: OrderLogEntry = {
      ...entry,
      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      createdAt: new Date().toISOString(),
    };
    const next = {
      ...store,
      orderLogs: [record, ...store.orderLogs],
    };
    writeStore(next);
  },
  async removeOrder(id: string) {
    const store = readStore();
    const next = {
      ...store,
      orderLogs: store.orderLogs.filter((order) => order.id !== id),
    };
    writeStore(next);
  },
  async logDailySales(entry: DailySalesInput) {
    const store = readStore();
    const record: DailySalesEntry = {
      ...entry,
      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      createdAt: new Date().toISOString(),
    };
    const next = {
      ...store,
      dailySales: [record, ...store.dailySales],
    };
    writeStore(next);
  },
  async getStats() {
    const store = readStore();
    return buildStats(store);
  },
};
