import { NextResponse } from "next/server";
import type { MarketingEventInput } from "../../../../lib/mo/data/types";
import { logMarketingEvent } from "../../../../lib/mo/data/sheetsStore";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const ALLOWED_EVENTS = new Set([
  "product_click",
  "search_zero_results",
  "combo_used",
  "promo_used",
  "whatsapp_cta",
]);

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as MarketingEventInput;
    if (!payload?.name || !ALLOWED_EVENTS.has(payload.name)) {
      return NextResponse.json(
        { message: "Evento no soportado." },
        { status: 400 }
      );
    }

    await logMarketingEvent({
      name: payload.name,
      productId: payload.productId,
      query: payload.query,
      context: payload.context,
      label: payload.label,
      meta: payload.meta,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "No se pudo guardar el evento.";
    return NextResponse.json(
      { message },
      { status: 500 }
    );
  }
}
