type TrackEventName =
  | "click_whatsapp"
  | "click_call"
  | "click_whatsapp_primary"
  | "click_whatsapp_sticky"
  | "click_book_call"
  | "click_nav_item"
  | "click_view_details"
  | "contact_submit_ok"
  | "contact_submit_error"
  | "contact_submit_429";

type TrackPayload = Record<string, string | number | boolean | undefined>;

export function trackEvent(name: TrackEventName, payload: TrackPayload = {}) {
  if (process.env.NODE_ENV !== "production") {
    // eslint-disable-next-line no-console
    console.info("[track]", name, payload);
  }

  if (typeof window !== "undefined") {
    const eventPayload = { event: name, ...payload, ts: Date.now() };
    const dataLayer = (window as { dataLayer?: unknown }).dataLayer;
    if (Array.isArray(dataLayer)) {
      dataLayer.push(eventPayload);
    }

    const bufferKey = "__pbiaEvents";
    const bufferHost = window as typeof window & {
      __pbiaEvents?: Array<Record<string, unknown>>;
    };
    if (!Array.isArray(bufferHost[bufferKey])) {
      bufferHost[bufferKey] = [];
    }
    bufferHost[bufferKey]?.push(eventPayload);

    const analytics = (window as { analytics?: { track?: Function } }).analytics;
    if (analytics?.track) {
      analytics.track(name, payload);
    }
  }
}

type UtmParams = {
  source: string;
  medium?: string;
  campaign?: string;
  content?: string;
  term?: string;
};

export function withUtm(url: string, params: UtmParams) {
  const base = url.startsWith("http") ? undefined : "https://poweredbyia.local";
  const parsed = new URL(url, base);
  const search = parsed.searchParams;
  search.set("utm_source", params.source);
  search.set("utm_medium", params.medium ?? "cta");
  search.set("utm_campaign", params.campaign ?? "conversion");
  if (params.content) search.set("utm_content", params.content);
  if (params.term) search.set("utm_term", params.term);

  return url.startsWith("http")
    ? parsed.toString()
    : `${parsed.pathname}${parsed.search}${parsed.hash}`;
}
