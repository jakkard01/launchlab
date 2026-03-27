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

export type ProductAdminSaveInput = {
  id: string;
  category: string;
  subgroup: string;
  tags: string[];
  price: string;
  image: string;
  sortOrder: number;
  isFeatured: boolean;
  status: ProductStatus;
  stockStatus: StockStatus;
  promo: PromoState;
  hot: HotState;
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
  saveProductDraft: (input: ProductAdminSaveInput) => Promise<void>;
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

export type AdminRole = "owner" | "admin" | "operator" | "viewer";

export type AdminUserRecord = {
  id: string;
  name: string;
  username: string;
  email: string;
  passwordHash: string;
  role: AdminRole;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  lastLoginAt?: string;
};

export type AdminUserSafe = Omit<AdminUserRecord, "passwordHash">;

export type AdminUserCreateInput = {
  name: string;
  username?: string;
  email?: string;
  password: string;
  role: AdminRole;
  isActive?: boolean;
};

export type AdminUserUpdateInput = {
  id: string;
  name?: string;
  username?: string;
  email?: string;
  password?: string;
  role?: AdminRole;
  isActive?: boolean;
};

export type AuditEntityType =
  | "auth"
  | "user"
  | "product"
  | "promo"
  | "stock"
  | "manual_sale";

export type AuditAction =
  | "login_success"
  | "login_failed"
  | "logout"
  | "user_created"
  | "user_deactivated"
  | "role_changed"
  | "product_updated"
  | "price_changed"
  | "stock_changed"
  | "promo_changed"
  | "visibility_changed"
  | "manual_sale_logged";

export type AdminAuditEntry = {
  id: string;
  actorUserId: string;
  action: AuditAction;
  entityType: AuditEntityType;
  entityId: string;
  before?: string;
  after?: string;
  createdAt: string;
};

export type AdminSessionUser = {
  id: string;
  name: string;
  username: string;
  email: string;
  role: AdminRole;
  isActive: boolean;
  isLegacy?: boolean;
};
