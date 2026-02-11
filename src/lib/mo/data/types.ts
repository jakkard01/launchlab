import type { Product } from "../types";

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

export type MoStats = {
  top7: StatEntry[];
  top30: StatEntry[];
  mostRequestedSoldOut: StatEntry[];
};

export type MoDataAdapter = {
  getProducts: () => Promise<Product[]>;
  updateStock: (id: string, status: StockStatus) => Promise<void>;
  updatePrice: (id: string, price: string) => Promise<void>;
  updateHot: (id: string, next: Partial<HotState>) => Promise<void>;
  logOrder: (entry: OrderLogInput) => Promise<void>;
  logDailySales: (entry: DailySalesInput) => Promise<void>;
  getStats: () => Promise<MoStats>;
};
