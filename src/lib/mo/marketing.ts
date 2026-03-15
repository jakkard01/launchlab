"use client";

type MarketingEventName =
  | "product_click"
  | "search_zero_results"
  | "combo_used"
  | "promo_used"
  | "whatsapp_cta";

type MarketingEventPayload = {
  productId?: string;
  query?: string;
  context?: string;
  label?: string;
  meta?: Record<string, string | number | boolean | null>;
};

const STORAGE_KEY = "rys-mini-marketing-events-v1";

const pushToLocalBuffer = (event: Record<string, unknown>) => {
  if (typeof window === "undefined") return;

  try {
    const current = window.localStorage.getItem(STORAGE_KEY);
    const parsed = current ? (JSON.parse(current) as Array<Record<string, unknown>>) : [];
    const next = [event, ...parsed].slice(0, 200);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Ignore local buffer errors.
  }
};

export const trackMoEvent = (
  name: MarketingEventName,
  payload: MarketingEventPayload = {}
) => {
  if (typeof window === "undefined") return;

  const event = {
    name,
    productId: payload.productId ?? "",
    query: payload.query ?? "",
    context: payload.context ?? "",
    label: payload.label ?? "",
    meta: payload.meta ?? {},
    ts: new Date().toISOString(),
  };

  pushToLocalBuffer(event);

  void fetch("/api/mo/events", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(event),
    keepalive: true,
  }).catch(() => {
    // Local buffer keeps a fallback if remote logging fails.
  });
};
