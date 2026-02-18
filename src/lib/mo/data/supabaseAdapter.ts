import type {
  AdminSnapshot,
  DailySalesInput,
  MoDataAdapter,
  OrderLogInput,
} from "./types";

async function apiGet<T>(url: string): Promise<T> {
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`API error ${res.status}`);
  }
  return (await res.json()) as T;
}

async function apiPost<T>(url: string, body: unknown): Promise<T> {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const message = (await res.json().catch(() => ({}))) as { message?: string };
    throw new Error(message.message ?? `API error ${res.status}`);
  }
  return (await res.json()) as T;
}

export const supabaseAdapter: MoDataAdapter = {
  async getProducts() {
    const data = await apiGet<{ ok: boolean; products: any[] }>("/api/mo/products");
    return data.products;
  },
  async getAdminSnapshot() {
    const data = await apiGet<{ ok: boolean; snapshot: AdminSnapshot }>("/api/mo/admin/snapshot");
    return data.snapshot;
  },
  async updateStock(id, status) {
    await apiPost("/api/mo/admin/update", { action: "updateStock", id, status });
  },
  async updatePrice(id, price) {
    await apiPost("/api/mo/admin/update", { action: "updatePrice", id, price });
  },
  async updatePromo(id, enabled, percent) {
    await apiPost("/api/mo/admin/update", {
      action: "updatePromo",
      id,
      enabled,
      percent,
    });
  },
  async updateHot(id, next) {
    await apiPost("/api/mo/admin/update", { action: "updateHot", id, ...next });
  },
  async logOrder(entry: OrderLogInput) {
    // Map to cart payload used by backend
    await apiPost("/api/mo/orders", {
      items: entry.items.map((item) => ({
        id: item.productId,
        name: "",
        qty: item.quantity,
      })),
      zone: "",
      note: entry.note ?? "",
      paymentMethod: "efectivo",
      pickupWindow: "",
      totalEstimate: entry.total,
    });
  },
  async removeOrder(id: string) {
    const res = await fetch("/api/mo/orders", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (!res.ok) {
      throw new Error(`API error ${res.status}`);
    }
  },
  async logDailySales(_entry: DailySalesInput) {
    // opcional: no-op por ahora
  },
  async getStats() {
    const data = await apiGet<{ ok: boolean; snapshot: AdminSnapshot }>("/api/mo/admin/snapshot");
    return {
      top7: [],
      top30: [],
      mostRequestedSoldOut: [],
    };
  },
};
