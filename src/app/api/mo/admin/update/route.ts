import { NextResponse } from "next/server";
import { getSupabaseServiceClient } from "../../../../../lib/supabase/server";

type Payload =
  | { action: "updateStock"; id: string; status: string }
  | { action: "updatePrice"; id: string; price: string }
  | { action: "updatePromo"; id: string; enabled: boolean; percent: number }
  | {
      action: "updateHot";
      id: string;
      status?: string;
      windowStart?: string;
      windowEnd?: string;
      note?: string;
    };

export async function POST(request: Request) {
  const payload = (await request.json()) as Payload;
  let supabase;
  try {
    supabase = getSupabaseServiceClient();
  } catch (error) {
    return NextResponse.json(
      { ok: false, message: (error as Error).message },
      { status: 500 }
    );
  }

  switch (payload.action) {
    case "updateStock": {
      const { error } = await supabase.from("mo_inventory_overrides").upsert(
        { product_id: payload.id, stock_status: payload.status },
        { onConflict: "product_id" }
      );
      if (error) return NextResponse.json({ ok: false, message: error.message }, { status: 500 });
      return NextResponse.json({ ok: true });
    }
    case "updatePrice": {
      const { error } = await supabase.from("mo_inventory_overrides").upsert(
        { product_id: payload.id, price: payload.price },
        { onConflict: "product_id" }
      );
      if (error) return NextResponse.json({ ok: false, message: error.message }, { status: 500 });
      return NextResponse.json({ ok: true });
    }
    case "updatePromo": {
      const { error } = await supabase.from("mo_inventory_overrides").upsert(
        {
          product_id: payload.id,
          promo_enabled: payload.enabled,
          promo_percent: payload.percent,
        },
        { onConflict: "product_id" }
      );
      if (error) return NextResponse.json({ ok: false, message: error.message }, { status: 500 });
      return NextResponse.json({ ok: true });
    }
    case "updateHot": {
      const { error } = await supabase.from("mo_hot_today").upsert(
        {
          product_id: payload.id,
          status: payload.status ?? "preparando",
          window_start: payload.windowStart ?? "",
          window_end: payload.windowEnd ?? "",
          note: payload.note ?? "",
        },
        { onConflict: "product_id" }
      );
      if (error) return NextResponse.json({ ok: false, message: error.message }, { status: 500 });
      return NextResponse.json({ ok: true });
    }
    default:
      return NextResponse.json({ ok: false, message: "Acción no soportada" }, { status: 400 });
  }
}
