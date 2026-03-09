import type { Product } from "../types";
import type {
  AdminSnapshot,
  DailySalesInput,
  HotState,
  MoDataAdapter,
  MoStats,
  OrderLogInput,
  StockStatus,
} from "./types";

type AdminAction =
  | { action: "updateStock"; id: string; status: StockStatus }
  | { action: "updatePrice"; id: string; price: string }
  | { action: "updateImage"; id: string; image: string }
  | { action: "updateSortOrder"; id: string; sortOrder: number }
  | { action: "updateFeatured"; id: string; isFeatured: boolean }
  | { action: "updatePromo"; id: string; enabled: boolean; percent: number }
  | { action: "updateStatus"; id: string; status: Product["status"] }
  | { action: "importBackup"; backup: Partial<AdminSnapshot> }
  | { action: "updateHot"; id: string; next: Partial<HotState> }
  | { action: "logOrder"; entry: OrderLogInput }
  | { action: "removeOrder"; id: string }
  | { action: "logDailySales"; entry: DailySalesInput };

export class MoApiError extends Error {
  status: number;
  code?: string;

  constructor(message: string, status: number, code?: string) {
    super(message);
    this.name = "MoApiError";
    this.status = status;
    this.code = code;
  }
}

const fetchJson = async <T>(input: RequestInfo, init?: RequestInit): Promise<T> => {
  const response = await fetch(input, {
    ...init,
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });

  const data = (await response.json()) as T & { message?: string; code?: string };

  if (!response.ok) {
    throw new MoApiError(
      data.message ?? "No se pudo completar la operación.",
      response.status,
      data.code
    );
  }

  return data;
};

const runAdminAction = async (payload: AdminAction) => {
  await fetchJson<{ ok: true }>("/api/mo/admin", {
    method: "POST",
    body: JSON.stringify(payload),
  });
};

export const apiAdapter: MoDataAdapter = {
  async getProducts() {
    const data = await fetchJson<{ products: Product[] }>("/api/mo/products");
    return data.products;
  },
  async getAdminSnapshot() {
    return fetchJson<AdminSnapshot>("/api/mo/admin", {
      method: "GET",
    });
  },
  async updateStock(id, status) {
    await runAdminAction({ action: "updateStock", id, status });
  },
  async updatePrice(id, price) {
    await runAdminAction({ action: "updatePrice", id, price });
  },
  async updateImage(id, image) {
    await runAdminAction({ action: "updateImage", id, image });
  },
  async updateSortOrder(id, sortOrder) {
    await runAdminAction({ action: "updateSortOrder", id, sortOrder });
  },
  async updateFeatured(id, isFeatured) {
    await runAdminAction({ action: "updateFeatured", id, isFeatured });
  },
  async updatePromo(id, enabled, percent) {
    await runAdminAction({ action: "updatePromo", id, enabled, percent });
  },
  async updateStatus(id, status) {
    await runAdminAction({ action: "updateStatus", id, status });
  },
  async importBackup(backup) {
    await runAdminAction({ action: "importBackup", backup });
  },
  async updateHot(id, next) {
    await runAdminAction({ action: "updateHot", id, next });
  },
  async logOrder(entry) {
    await runAdminAction({ action: "logOrder", entry });
  },
  async removeOrder(id) {
    await runAdminAction({ action: "removeOrder", id });
  },
  async logDailySales(entry) {
    await runAdminAction({ action: "logDailySales", entry });
  },
  async getStats() {
    const data = await fetchJson<{ stats: MoStats }>("/api/mo/admin?view=stats");
    return data.stats;
  },
};
