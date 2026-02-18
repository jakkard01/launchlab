import { NextResponse } from "next/server";
import { getSupabaseServiceClient } from "../../../../lib/supabase/server";

type CartItem = {
  id: string;
  name: string;
  qty: number;
  price?: string;
};

type Payload = {
  items: CartItem[];
  zone: string;
  note: string;
  paymentMethod: "efectivo" | "tigo" | "transferencia";
  pickupWindow: "mediodia" | "tarde" | "frio" | "";
  totalEstimate: number | null;
};

export async function POST(request: Request) {
  const payload = (await request.json()) as Payload;

  if (!Array.isArray(payload.items) || payload.items.length === 0) {
    return NextResponse.json({ ok: false, message: "Carrito vacío" }, { status: 400 });
  }

  const total =
    payload.totalEstimate ??
    payload.items.reduce((sum, item) => {
      const numeric = Number(item.price?.replace(/[^0-9.]/g, ""));
      return Number.isFinite(numeric) ? sum + numeric * item.qty : sum;
    }, 0);

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
    .from("orders")
    .insert({
      total,
      currency: "EUR",
      channel: "web",
      status: "new",
      notes: payload.note,
      cart_json: payload.items,
      source: "rys",
      pickup_time: payload.pickupWindow ?? "",
      customer_name: "",
      customer_phone: "",
    })
    .select("id,created_at")
    .limit(1)
    .single();

  if (error || !data) {
    return NextResponse.json(
      { ok: false, message: error?.message ?? "No se pudo registrar" },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true, orderId: data.id, createdAt: data.created_at });
}

export async function DELETE(request: Request) {
  const { id } = (await request.json()) as { id?: string };
  if (!id) {
    return NextResponse.json({ ok: false, message: "Falta id" }, { status: 400 });
  }
  let supabase;
  try {
    supabase = getSupabaseServiceClient();
  } catch (error) {
    return NextResponse.json(
      { ok: false, message: (error as Error).message },
      { status: 500 }
    );
  }
  const { error } = await supabase.from("orders").delete().eq("id", id);
  if (error) {
    return NextResponse.json({ ok: false, message: error.message }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
