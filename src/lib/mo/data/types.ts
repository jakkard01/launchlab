import type { Product, ProductStatus } from "../types";

export type StockStatus = "disponible" | "ultimas" | "agotado";

export type HotStatus =
  | "preparando"
  | "listo"
  | "se_acabo"
  | "hoy_no_hicimos";

export type HotState = {
  status: HotStatus;
  windowStart: string;
  windowEnd: string;
  note: string;
  updatedAt: string;
};

export type OrderItem = {
  productId: string;
  quantity: number;
};

export type OrderLogInput = {
  items: OrderItem[];
  total: number;
  note?: string;
  channel?: "whatsapp" | "manual";
};

export type OrderLogEntry = OrderLogInput & {
  id: string;
  createdAt: string;
};

export type DailySalesInput = {
  total: number;
  topItems: OrderItem[];
  note?: string;
};

export type DailySalesEntry = DailySalesInput & {
  id: string;
  createdAt: string;
};

export type StatEntry = {
  productId: string;
  quantity: number;
};

export type PromoState = {
  enabled: boolean;
  percent: number;
};

export type MarketingEventName =
  | "product_click"
  | "search_zero_results"
  | "combo_used"
  | "promo_used"
  | "whatsapp_cta";

export type MarketingEventInput = {
  name: MarketingEventName;
  productId?: string;
  query?: string;
  context?: string;
  label?: string;
  meta?: Record<string, string | number | boolean | null>;
};

export type MarketingEventEntry = MarketingEventInput & {
  id: string;
  createdAt: string;
};

export type AdminSnapshot = {
  products: Product[];
  stock: Record<string, StockStatus>;
  prices: Record<string, string>;
  promo: Record<string, PromoState>;
  status: Record<string, ProductStatus>;
  hotToday: Record<string, HotState>;
  orderLogs: OrderLogEntry[];
  dailySales: DailySalesEntry[];
  marketingEvents: MarketingEventEntry[];
};

export type MoDataAdapter = {
  getProducts: () => Promise<Product[]>;
  getAdminSnapshot: () => Promise<AdminSnapshot>;
  updateStock: (id: string, status: StockStatus) => Promise<void>;
  updatePrice: (id: string, price: string) => Promise<void>;
  updateImage: (id: string, image: string) => Promise<void>;
  updateSortOrder: (id: string, sortOrder: number) => Promise<void>;
  updateFeatured: (id: string, isFeatured: boolean) => Promise<void>;
  updatePromo: (id: string, enabled: boolean, percent: number) => Promise<void>;
  updateStatus: (id: string, status: ProductStatus) => Promise<void>;
  importBackup: (backup: Partial<AdminSnapshot>) => Promise<void>;
  updateHot: (id: string, next: Partial<HotState>) => Promise<void>;
  logOrder: (entry: OrderLogInput) => Promise<void>;
  removeOrder: (id: string) => Promise<void>;
  logDailySales: (entry: DailySalesInput) => Promise<void>;
  logMarketingEvent: (entry: MarketingEventInput) => Promise<void>;
  getStats: () => Promise<MoStats>;
};

export type QueryStatEntry = {
  query: string;
  count: number;
};

export type LabelStatEntry = {
  label: string;
  count: number;
};

export type ContextStatEntry = {
  context: string;
  count: number;
};

export type MoStats = {
  top7: StatEntry[];
  top30: StatEntry[];
  mostRequestedSoldOut: StatEntry[];
  topProductClicks: StatEntry[];
  zeroResultSearches: QueryStatEntry[];
  comboUsage: LabelStatEntry[];
  promoUsage: StatEntry[];
  whatsappClicks: ContextStatEntry[];
};
