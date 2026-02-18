import { NextResponse } from "next/server";
import productsData from "../../../../../data/products.json";
import type { Product } from "../../../../../lib/mo/types";
import type {
  AdminSnapshot,
  HotState,
  OrderLogEntry,
  PromoState,
  StockStatus,
} from "../../../../../lib/mo/data/types";
import { getSupabaseServiceClient } from "../../../../../lib/supabase/server";

type OverrideRow = {
  product_id: string;
  price?: string;
  promo_enabled?: boolean;
  promo_percent?: number;
  stock_status?: string;
};

type HotRow = {
  product_id: string;
  status: HotState["status"];
  window_start: string | null;
  window_end: string | null;
  note: string | null;
  updated_at: string;
};

type OrderRow = {
  id: string;
  created_at: string;
  total: number | null;
  cart_json: unknown;
  notes: string | null;
};

export async function GET() {
  const baseProducts = productsData as Product[];

  let supabase;
  try {
    supabase = getSupabaseServiceClient();
  } catch (error) {
    return NextResponse.json(
      { ok: false, message: (error as Error).message },
      { status: 500 }
    );
  }

  const [overridesRes, hotRes, ordersRes] = await Promise.all([
    supabase.from("mo_inventory_overrides").select("*"),
    supabase.from("mo_hot_today").select("*"),
    supabase
      .from("orders")
      .select("id,created_at,total,cart_json,notes")
      .eq("source", "rys")
      .order("created_at", { ascending: false })
      .limit(100),
  ]);

  if (overridesRes.error) {
    return NextResponse.json(
      { ok: false, message: overridesRes.error.message },
      { status: 500 }
    );
  }
  if (hotRes.error) {
    return NextResponse.json({ ok: false, message: hotRes.error.message }, { status: 500 });
  }
  if (ordersRes.error) {
    return NextResponse.json({ ok: false, message: ordersRes.error.message }, { status: 500 });
  }

  const overrides = new Map<string, OverrideRow>();
  overridesRes.data?.forEach((row) => overrides.set(row.product_id, row));

  const products = baseProducts.map((product) => {
    const override = overrides.get(product.id);
    return {
      ...product,
      price: override?.price ?? product.price,
      promoEnabled: override?.promo_enabled ?? product.promoEnabled ?? false,
      promoPercent: override?.promo_percent ?? product.promoPercent ?? 0,
      stockStatus: (override?.stock_status as Product["stockStatus"]) ?? product.stockStatus ?? "disponible",
    };
  });

  const stock: Record<string, StockStatus> = {};
  const prices: Record<string, string> = {};
  const promo: Record<string, PromoState> = {};
  overrides.forEach((row, productId) => {
    if (row.stock_status) stock[productId] = row.stock_status as StockStatus;
    if (row.price) prices[productId] = row.price;
    promo[productId] = {
      enabled: row.promo_enabled ?? false,
      percent: row.promo_percent ?? 0,
    };
  });

  const hotToday: Record<string, HotState> = {};
  hotRes.data?.forEach((row) => {
    hotToday[row.product_id] = {
      status: row.status,
      windowStart: row.window_start ?? "",
      windowEnd: row.window_end ?? "",
      note: row.note ?? "",
      updatedAt: row.updated_at,
    };
  });

  const orderLogs: OrderLogEntry[] =
    ordersRes.data?.map((row) => {
      const cart = Array.isArray(row.cart_json) ? row.cart_json : [];
      const items = cart
        .map((item) => {
          const prodId = typeof item?.productId === "string" ? item.productId : String(item?.id ?? "");
          const qty = Number(item?.qty ?? item?.quantity ?? 0);
          if (!prodId || !Number.isFinite(qty)) return null;
          return { productId: prodId, quantity: qty };
        })
        .filter(Boolean) as OrderLogEntry["items"];
      return {
        id: row.id,
        createdAt: row.created_at,
        total: row.total ?? 0,
        items,
        channel: "manual",
        note: row.notes ?? undefined,
      };
    }) ?? [];

  const snapshot: AdminSnapshot = {
    products,
    stock,
    prices,
    promo,
    hotToday,
    orderLogs,
    dailySales: [],
  };

  return NextResponse.json({ ok: true, snapshot });
}
