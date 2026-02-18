import { NextResponse } from "next/server";
import productsData from "../../../../data/products.json";
import type { Product } from "../../../../lib/mo/types";
import { getSupabaseServiceClient } from "../../../../lib/supabase/server";

type OverrideRow = {
  product_id: string;
  price?: string;
  promo_enabled?: boolean;
  promo_percent?: number;
  stock_status?: string;
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
  const { data, error } = await supabase
    .from("mo_inventory_overrides")
    .select("*");

  if (error) {
    return NextResponse.json(
      { ok: false, message: "No se pudieron leer overrides", error: error.message },
      { status: 500 }
    );
  }

  const overrides = new Map<string, OverrideRow>();
  data?.forEach((row) => overrides.set(row.product_id, row));

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

  return NextResponse.json({ ok: true, products });
}
