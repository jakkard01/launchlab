import { createSign } from "crypto";
import productsSeed from "../../../data/products.json";
import {
  formatGoogleTokenError,
  getGoogleServiceAccountConfig,
} from "../../google/serviceAccount";
import type { Product, ProductStatus } from "../types";
import type {
  AdminSnapshot,
  DailySalesEntry,
  DailySalesInput,
  HotState,
  MoStats,
  OrderLogEntry,
  OrderLogInput,
  PromoState,
  StockStatus,
} from "./types";

const GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token";
const GOOGLE_SHEETS_SCOPE = "https://www.googleapis.com/auth/spreadsheets";
const GOOGLE_SHEETS_API = "https://sheets.googleapis.com/v4/spreadsheets";

const PRODUCTS_SHEET = "products";
const ORDERS_SHEET = "orders";
const DAILY_SALES_SHEET = "daily_sales";

const PRODUCT_HEADERS = [
  "id",
  "name",
  "category",
  "sortOrder",
  "price",
  "description",
  "image",
  "imageKey",
  "isFeatured",
  "status",
  "stockStatus",
  "promoEnabled",
  "promoPercent",
  "hotStatus",
  "hotWindowStart",
  "hotWindowEnd",
  "hotNote",
  "hotUpdatedAt",
  "updatedAt",
] as const;

const ORDER_HEADERS = [
  "id",
  "createdAt",
  "total",
  "channel",
  "note",
  "itemsJson",
] as const;

const DAILY_SALES_HEADERS = [
  "id",
  "createdAt",
  "total",
  "note",
  "topItemsJson",
] as const;

const defaultHotState = (): HotState => ({
  status: "hoy_no_hicimos",
  windowStart: "",
  windowEnd: "",
  note: "",
  updatedAt: "",
});

const parseBoolean = (value: string | undefined, fallback = false) =>
  value === "true" ? true : value === "false" ? false : fallback;

const parseNumber = (value: string | undefined, fallback = 0) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const base64Url = (value: string | Buffer) =>
  Buffer.from(value)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");

const getSheetsConfig = () => {
  return getGoogleServiceAccountConfig({
    spreadsheetIdEnv: "RYS_SHEETS_SPREADSHEET_ID",
    spreadsheetLabel: "RYS",
  });
};

const createSignedJwt = () => {
  const { clientEmail, privateKey } = getSheetsConfig();
  const now = Math.floor(Date.now() / 1000);
  const header = { alg: "RS256", typ: "JWT" };
  const payload = {
    iss: clientEmail,
    scope: GOOGLE_SHEETS_SCOPE,
    aud: GOOGLE_TOKEN_URL,
    exp: now + 3600,
    iat: now,
  };

  const encodedHeader = base64Url(JSON.stringify(header));
  const encodedPayload = base64Url(JSON.stringify(payload));
  const unsignedToken = `${encodedHeader}.${encodedPayload}`;
  const signer = createSign("RSA-SHA256");
  signer.update(unsignedToken);
  signer.end();
  const signature = signer.sign(privateKey);

  return `${unsignedToken}.${base64Url(signature)}`;
};

const getAccessToken = async () => {
  const assertion = createSignedJwt();
  const response = await fetch(GOOGLE_TOKEN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion,
    }),
    cache: "no-store",
  });

  const data = (await response.json()) as {
    access_token?: string;
    error?: string;
    error_description?: string;
  };

  if (!response.ok || !data.access_token) {
    throw new Error(formatGoogleTokenError(data.error ?? "", data.error_description));
  }

  return data.access_token;
};

const sheetsFetch = async (
  input: string,
  init?: RequestInit
) => {
  const accessToken = await getAccessToken();
  const response = await fetch(input, {
    ...init,
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });

  const raw = await response.text();
  const data = raw ? JSON.parse(raw) : {};

  if (!response.ok) {
    const message =
      data?.error?.message ??
      data?.message ??
      "No se pudo completar la operación con Google Sheets.";
    throw new Error(message);
  }

  return data as Record<string, unknown>;
};

const getSpreadsheetUrl = (suffix: string) => {
  const { spreadsheetId } = getSheetsConfig();
  return `${GOOGLE_SHEETS_API}/${spreadsheetId}${suffix}`;
};

const getSpreadsheetMeta = async () => {
  return sheetsFetch(getSpreadsheetUrl(""));
};

const ensureSheet = async (title: string) => {
  const meta = (await getSpreadsheetMeta()) as {
    sheets?: Array<{ properties?: { title?: string } }>;
  };
  const exists = meta.sheets?.some((sheet) => sheet.properties?.title === title);

  if (exists) return;

  await sheetsFetch(getSpreadsheetUrl(":batchUpdate"), {
    method: "POST",
    body: JSON.stringify({
      requests: [{ addSheet: { properties: { title } } }],
    }),
  });
};

const readSheet = async (sheetName: string) => {
  await ensureSheet(sheetName);
  const encodedRange = encodeURIComponent(`${sheetName}!A:Z`);
  const data = (await sheetsFetch(
    getSpreadsheetUrl(`/values/${encodedRange}`)
  )) as { values?: string[][] };

  return Array.isArray(data.values) ? data.values : [];
};

const writeSheet = async (
  sheetName: string,
  headers: readonly string[],
  rows: string[][]
) => {
  await ensureSheet(sheetName);
  const encodedRange = encodeURIComponent(`${sheetName}!A1:Z`);

  await sheetsFetch(
    `${getSpreadsheetUrl(`/values/${encodedRange}`)}?valueInputOption=RAW`,
    {
      method: "PUT",
      body: JSON.stringify({
        range: `${sheetName}!A1:Z`,
        majorDimension: "ROWS",
        values: [headers, ...rows],
      }),
    }
  );
};

const seedProducts = (): Product[] =>
  (productsSeed as Product[])
    .map((product, index) => ({
      ...product,
      sortOrder: product.sortOrder ?? index + 1,
      stockStatus: product.stockStatus ?? "disponible",
      promoEnabled: product.promoEnabled ?? false,
      promoPercent: product.promoPercent ?? 0,
      hotStatus: product.hotStatus ?? "hoy_no_hicimos",
      hotWindowStart: product.hotWindowStart ?? "",
      hotWindowEnd: product.hotWindowEnd ?? "",
      hotNote: product.hotNote ?? "",
      updatedAt: product.updatedAt ?? "",
    }))
    .sort((a, b) => (a.sortOrder ?? 9999) - (b.sortOrder ?? 9999));

const ensureRequiredHeaders = (
  sheetName: string,
  headers: string[],
  required: readonly string[]
) => {
  const missing = required.filter((header) => !headers.includes(header));
  if (missing.length > 0) {
    throw new Error(
      `Esquema inválido en ${sheetName}. Faltan columnas: ${missing.join(", ")}.`
    );
  }
};

const parseProducts = (rows: string[][]): Product[] => {
  if (rows.length <= 1) {
    return [];
  }

  const headers = rows[0];
  ensureRequiredHeaders(PRODUCTS_SHEET, headers, PRODUCT_HEADERS);
  return rows
    .slice(1)
    .filter((row) => row[0])
    .map((row, index) => {
      const record = Object.fromEntries(
        headers.map((key, headerIndex) => [key, row[headerIndex] ?? ""])
      );
      return {
        id: String(record.id),
        name: String(record.name),
        category: String(record.category),
        sortOrder: parseNumber(record.sortOrder, index + 1),
        price: String(record.price),
        description: String(record.description ?? ""),
        image: String(record.image ?? ""),
        imageKey: String(record.imageKey ?? "") || undefined,
        isFeatured: parseBoolean(record.isFeatured),
        status: (record.status as ProductStatus) || "available",
        stockStatus: (record.stockStatus as StockStatus) || "disponible",
        promoEnabled: parseBoolean(record.promoEnabled),
        promoPercent: parseNumber(record.promoPercent),
        hotStatus: (record.hotStatus as Product["hotStatus"]) || "hoy_no_hicimos",
        hotWindowStart: String(record.hotWindowStart ?? ""),
        hotWindowEnd: String(record.hotWindowEnd ?? ""),
        hotNote: String(record.hotNote ?? ""),
        updatedAt: String(record.updatedAt ?? ""),
      };
    })
    .sort((a, b) => {
      const byOrder = (a.sortOrder ?? 9999) - (b.sortOrder ?? 9999);
      if (byOrder !== 0) return byOrder;
      return a.name.localeCompare(b.name, "es");
    });
};

const serializeProducts = (
  products: Product[],
  hotToday: Record<string, HotState>
) =>
  products.map((product) => {
    const hot = hotToday[product.id] ?? defaultHotState();
    return [
      product.id,
      product.name,
      product.category,
      String(product.sortOrder ?? 9999),
      product.price,
      product.description,
      product.image,
      product.imageKey ?? "",
      String(Boolean(product.isFeatured)),
      product.status ?? "available",
      product.stockStatus ?? "disponible",
      String(Boolean(product.promoEnabled)),
      String(product.promoPercent ?? 0),
      hot.status,
      hot.windowStart,
      hot.windowEnd,
      hot.note,
      hot.updatedAt,
      product.updatedAt ?? "",
    ];
  });

const parseHotToday = (rows: string[][]) => {
  if (rows.length <= 1) return {} as Record<string, HotState>;
  const headers = rows[0];
  return Object.fromEntries(
    rows.slice(1).filter((row) => row[0]).map((row) => {
      const record = Object.fromEntries(headers.map((key, index) => [key, row[index] ?? ""]));
      return [
        String(record.id),
        {
          status: (record.hotStatus as HotState["status"]) || "hoy_no_hicimos",
          windowStart: String(record.hotWindowStart ?? ""),
          windowEnd: String(record.hotWindowEnd ?? ""),
          note: String(record.hotNote ?? ""),
          updatedAt: String(record.hotUpdatedAt ?? ""),
        },
      ];
    })
  );
};

const parseOrders = (rows: string[][]): OrderLogEntry[] => {
  if (rows.length <= 1) return [];
  const headers = rows[0];
  ensureRequiredHeaders(ORDERS_SHEET, headers, ORDER_HEADERS);
  return rows.slice(1).filter((row) => row[0]).map((row) => {
    const record = Object.fromEntries(headers.map((key, index) => [key, row[index] ?? ""]));
    let items: OrderLogEntry["items"] = [];
    try {
      items = JSON.parse(String(record.itemsJson ?? "[]"));
    } catch {
      throw new Error(`Esquema inválido en ${ORDERS_SHEET}. itemsJson no es JSON válido.`);
    }
    return {
      id: String(record.id),
      createdAt: String(record.createdAt),
      total: parseNumber(record.total),
      channel:
        record.channel === "manual" || record.channel === "whatsapp"
          ? record.channel
          : "manual",
      note: String(record.note ?? ""),
      items,
    };
  });
};

const serializeOrders = (orders: OrderLogEntry[]) =>
  orders.map((order) => [
    order.id,
    order.createdAt,
    String(order.total),
    order.channel ?? "manual",
    order.note ?? "",
    JSON.stringify(order.items),
  ]);

const parseDailySales = (rows: string[][]): DailySalesEntry[] => {
  if (rows.length <= 1) return [];
  const headers = rows[0];
  ensureRequiredHeaders(DAILY_SALES_SHEET, headers, DAILY_SALES_HEADERS);
  return rows.slice(1).filter((row) => row[0]).map((row) => {
    const record = Object.fromEntries(headers.map((key, index) => [key, row[index] ?? ""]));
    let topItems: DailySalesEntry["topItems"] = [];
    try {
      topItems = JSON.parse(String(record.topItemsJson ?? "[]"));
    } catch {
      throw new Error(
        `Esquema inválido en ${DAILY_SALES_SHEET}. topItemsJson no es JSON válido.`
      );
    }
    return {
      id: String(record.id),
      createdAt: String(record.createdAt),
      total: parseNumber(record.total),
      note: String(record.note ?? ""),
      topItems,
    };
  });
};

const serializeDailySales = (entries: DailySalesEntry[]) =>
  entries.map((entry) => [
    entry.id,
    entry.createdAt,
    String(entry.total),
    entry.note ?? "",
    JSON.stringify(entry.topItems),
  ]);

const ensureProductsSeeded = async () => {
  const rows = await readSheet(PRODUCTS_SHEET);
  if (rows.length > 1) {
    return rows;
  }

  const products = seedProducts();
  const hotToday = Object.fromEntries(
    products.map((product) => [product.id, defaultHotState()])
  );
  await writeSheet(PRODUCTS_SHEET, PRODUCT_HEADERS, serializeProducts(products, hotToday));
  return readSheet(PRODUCTS_SHEET);
};

const ensureSupportSheets = async () => {
  const orders = await readSheet(ORDERS_SHEET);
  if (orders.length === 0) {
    await writeSheet(ORDERS_SHEET, ORDER_HEADERS, []);
  }

  const dailySales = await readSheet(DAILY_SALES_SHEET);
  if (dailySales.length === 0) {
    await writeSheet(DAILY_SALES_SHEET, DAILY_SALES_HEADERS, []);
  }
};

const loadState = async () => {
  const productRows = await ensureProductsSeeded();
  await ensureSupportSheets();
  const orderRows = await readSheet(ORDERS_SHEET);
  const dailyRows = await readSheet(DAILY_SALES_SHEET);

  const products = parseProducts(productRows);
  const hotToday = parseHotToday(productRows);
  const orderLogs = parseOrders(orderRows);
  const dailySales = parseDailySales(dailyRows);

  return { products, hotToday, orderLogs, dailySales };
};

const toMaps = (products: Product[]) => {
  const stock: Record<string, StockStatus> = {};
  const prices: Record<string, string> = {};
  const promo: Record<string, PromoState> = {};
  const status: Record<string, ProductStatus> = {};

  products.forEach((product) => {
    stock[product.id] = product.stockStatus ?? "disponible";
    prices[product.id] = product.price;
    promo[product.id] = {
      enabled: product.promoEnabled ?? false,
      percent: product.promoPercent ?? 0,
    };
    status[product.id] = product.status ?? "available";
  });

  return { stock, prices, promo, status };
};

const saveProducts = async (
  products: Product[],
  hotToday: Record<string, HotState>
) => {
  const ordered = [...products].sort((a, b) => {
    const byOrder = (a.sortOrder ?? 9999) - (b.sortOrder ?? 9999);
    if (byOrder !== 0) return byOrder;
    return a.name.localeCompare(b.name, "es");
  });
  await writeSheet(
    PRODUCTS_SHEET,
    PRODUCT_HEADERS,
    serializeProducts(ordered, hotToday)
  );
};

const updateProduct = async (
  id: string,
  updater: (product: Product) => Product
) => {
  const state = await loadState();
  const products = state.products.map((product) =>
    product.id === id
      ? {
          ...updater(product),
          updatedAt: new Date().toISOString(),
        }
      : product
  );

  await saveProducts(products, state.hotToday);
};

export const getStoreProducts = async () => {
  const state = await loadState();
  return state.products;
};

export const getAdminSnapshot = async (): Promise<AdminSnapshot> => {
  const state = await loadState();
  const maps = toMaps(state.products);

  return {
    products: state.products,
    stock: maps.stock,
    prices: maps.prices,
    promo: maps.promo,
    status: maps.status,
    hotToday: state.hotToday,
    orderLogs: state.orderLogs,
    dailySales: state.dailySales,
  };
};

export const updateStock = async (id: string, stockStatus: StockStatus) => {
  await updateProduct(id, (product) => ({ ...product, stockStatus }));
};

export const updatePrice = async (id: string, price: string) => {
  await updateProduct(id, (product) => ({ ...product, price }));
};

export const updateImage = async (id: string, image: string) => {
  await updateProduct(id, (product) => ({ ...product, image }));
};

export const updateSortOrder = async (id: string, sortOrder: number) => {
  const safeSortOrder = Number.isFinite(sortOrder)
    ? Math.max(1, Math.round(sortOrder))
    : 9999;
  await updateProduct(id, (product) => ({
    ...product,
    sortOrder: safeSortOrder,
  }));
};

export const updateFeatured = async (id: string, isFeatured: boolean) => {
  await updateProduct(id, (product) => ({ ...product, isFeatured }));
};

export const updatePromo = async (
  id: string,
  enabled: boolean,
  percent: number
) => {
  await updateProduct(id, (product) => ({
    ...product,
    promoEnabled: enabled,
    promoPercent: percent,
  }));
};

export const updateStatus = async (id: string, status: ProductStatus) => {
  await updateProduct(id, (product) => ({ ...product, status }));
};

export const updateHot = async (id: string, next: Partial<HotState>) => {
  const state = await loadState();
  const current = state.hotToday[id] ?? defaultHotState();
  await saveProducts(state.products, {
    ...state.hotToday,
    [id]: {
      ...current,
      ...next,
      updatedAt: new Date().toISOString(),
    },
  });
};

export const importBackup = async (backup: Partial<AdminSnapshot>) => {
  const products = Array.isArray(backup.products) ? backup.products : seedProducts();
  const nextProducts = products.map((product, index) => ({
    ...product,
    sortOrder: product.sortOrder ?? index + 1,
    price: backup.prices?.[product.id] ?? product.price,
    stockStatus: backup.stock?.[product.id] ?? product.stockStatus ?? "disponible",
    promoEnabled: backup.promo?.[product.id]?.enabled ?? product.promoEnabled ?? false,
    promoPercent: backup.promo?.[product.id]?.percent ?? product.promoPercent ?? 0,
    status: backup.status?.[product.id] ?? product.status ?? "available",
    updatedAt: new Date().toISOString(),
  }));

  await saveProducts(nextProducts, backup.hotToday ?? {});
  await writeSheet(
    ORDERS_SHEET,
    ORDER_HEADERS,
    serializeOrders((backup.orderLogs ?? []) as OrderLogEntry[])
  );
  await writeSheet(
    DAILY_SALES_SHEET,
    DAILY_SALES_HEADERS,
    serializeDailySales((backup.dailySales ?? []) as DailySalesEntry[])
  );
};

export const logOrder = async (entry: OrderLogInput) => {
  const state = await loadState();
  const record: OrderLogEntry = {
    ...entry,
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    createdAt: new Date().toISOString(),
  };
  await writeSheet(
    ORDERS_SHEET,
    ORDER_HEADERS,
    serializeOrders([record, ...state.orderLogs])
  );
};

export const removeOrder = async (id: string) => {
  const state = await loadState();
  await writeSheet(
    ORDERS_SHEET,
    ORDER_HEADERS,
    serializeOrders(state.orderLogs.filter((order) => order.id !== id))
  );
};

export const logDailySales = async (entry: DailySalesInput) => {
  const state = await loadState();
  const record: DailySalesEntry = {
    ...entry,
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    createdAt: new Date().toISOString(),
  };
  await writeSheet(
    DAILY_SALES_SHEET,
    DAILY_SALES_HEADERS,
    serializeDailySales([record, ...state.dailySales])
  );
};

export const getStats = async (): Promise<MoStats> => {
  const state = await loadState();
  const now = new Date();
  const top7: Record<string, number> = {};
  const top30: Record<string, number> = {};
  const soldOutRequests: Record<string, number> = {};

  state.orderLogs.forEach((order) => {
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

      const product = state.products.find((current) => current.id === item.productId);
      if ((product?.stockStatus ?? "disponible") === "agotado") {
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
