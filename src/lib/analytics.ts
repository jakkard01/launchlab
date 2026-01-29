type TrackEventName =
  | "click_whatsapp"
  | "click_call"
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
    const analytics = (window as { analytics?: { track?: Function } }).analytics;
    if (analytics?.track) {
      analytics.track(name, payload);
    }
  }
}
