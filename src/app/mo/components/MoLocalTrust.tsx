import Image from "next/image";
import {
  MO_BRAND,
  MO_STORE_ADDRESS,
  MO_STORE_HOURS_LABEL,
  MO_STORE_IMAGE_ALT,
  MO_STORE_IMAGE_SRC,
  MO_STORE_LOCATION_FALLBACK_MESSAGE,
  MO_STORE_MAPS_URL,
  MO_STORE_NOTE_IF_MISSING,
  MO_STORE_PAYMENT_LABEL,
  MO_STORE_PICKUP_LABEL,
  MO_STORE_REFERENCE,
  MO_STORE_RESPONSE_TIME_LABEL,
  MO_STORE_TRUST_COPY,
} from "../../../lib/mo/config";
import { buildWhatsAppMessageLink } from "../../../lib/mo/whatsapp";

type MoLocalTrustProps = {
  onScrollToSpecial: () => void;
  whatsappLink: string;
};

export default function MoLocalTrust({
  onScrollToSpecial,
  whatsappLink,
}: MoLocalTrustProps) {
  const locationFallbackLink = buildWhatsAppMessageLink(
    MO_STORE_LOCATION_FALLBACK_MESSAGE
  );
  const locationLink = MO_STORE_MAPS_URL || locationFallbackLink;
  const locationLinkLabel = MO_STORE_MAPS_URL ? "Cómo llegar" : "Pedir ubicación";

  return (
    <section
      id="local-real"
      className="grid gap-4 rounded-3xl border border-default bg-surface px-4 py-4 shadow-sm dark:bg-[var(--surface-2)] dark:shadow-[0_18px_40px_rgba(3,8,16,0.2)] sm:grid-cols-[minmax(0,300px)_1fr] sm:px-6 sm:py-5"
    >
      <div className="relative overflow-hidden rounded-2xl border border-default bg-[linear-gradient(180deg,rgba(240,231,209,0.7),rgba(231,221,196,0.95))]">
        <div className="relative aspect-[4/5] sm:aspect-[5/4]">
        <Image
          src={MO_STORE_IMAGE_SRC}
          alt={`${MO_BRAND.currentDisplayName}. ${MO_STORE_IMAGE_ALT}`}
          fill
          sizes="(max-width: 640px) calc(100vw - 32px), 300px"
          className="object-contain object-center p-2 sm:p-3"
        />
        </div>
        <div className="absolute inset-x-3 bottom-3 rounded-2xl bg-[rgba(10,16,26,0.76)] px-3 py-2 text-xs text-white backdrop-blur-sm">
          <p className="font-semibold">Retira tu pedido aquí</p>
          <p className="mt-1 text-white/85">Asi reconoces la tienda al llegar.</p>
        </div>
      </div>
      <div className="flex flex-col justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--accent)]">
            Ubicación real y retiro seguro
          </p>
          <p className="mt-2 text-sm font-semibold text-main sm:text-base">
            {MO_BRAND.currentDisplayName}, punto real para retirar sin perder tiempo.
          </p>
          <p className="mt-2 text-sm text-muted-strong">
            {MO_STORE_TRUST_COPY}
          </p>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            <div className="rounded-2xl border border-default bg-surface-3 px-3 py-3 text-sm">
              <p className="text-xs uppercase tracking-[0.2em] text-muted">Dirección</p>
              <p className="mt-1 font-semibold text-main">{MO_STORE_ADDRESS}</p>
            </div>
            <div className="rounded-2xl border border-default bg-surface-3 px-3 py-3 text-sm">
              <p className="text-xs uppercase tracking-[0.2em] text-muted">Referencia</p>
              <p className="mt-1 font-semibold text-main">{MO_STORE_REFERENCE}</p>
            </div>
            <div className="rounded-2xl border border-default bg-surface-3 px-3 py-3 text-sm">
              <p className="text-xs uppercase tracking-[0.2em] text-muted">Horario</p>
              <p className="mt-1 font-semibold text-main">{MO_STORE_HOURS_LABEL}</p>
            </div>
            <div className="rounded-2xl border border-default bg-surface-3 px-3 py-3 text-sm">
              <p className="text-xs uppercase tracking-[0.2em] text-muted">Pago actual</p>
              <p className="mt-1 font-semibold text-main">{MO_STORE_PAYMENT_LABEL}</p>
            </div>
            <div className="rounded-2xl border border-default bg-surface-3 px-3 py-3 text-sm">
              <p className="text-xs uppercase tracking-[0.2em] text-muted">Retiro</p>
              <p className="mt-1 font-semibold text-main">{MO_STORE_PICKUP_LABEL}</p>
            </div>
            <div className="rounded-2xl border border-default bg-surface-3 px-3 py-3 text-sm">
              <p className="text-xs uppercase tracking-[0.2em] text-muted">WhatsApp</p>
              <p className="mt-1 font-semibold text-main">{MO_STORE_RESPONSE_TIME_LABEL}</p>
            </div>
          </div>
          <p className="mt-4 text-sm text-muted-strong">{MO_STORE_NOTE_IF_MISSING}</p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
          <a
            href={locationLink}
            className="h-11 rounded-full border border-default bg-surface-3 px-4 py-2 text-center text-sm font-semibold text-main transition hover:border-[var(--accent)]/45 hover:text-[var(--accent)]"
            target="_blank"
            rel="noopener noreferrer"
          >
            {locationLinkLabel}
          </a>
          <a
            href={whatsappLink}
            className="h-11 rounded-full border border-[var(--accent)] bg-[var(--accent)] px-4 py-2 text-center text-sm font-semibold text-[#07130c] transition hover:opacity-90"
            target="_blank"
            rel="noopener noreferrer"
          >
            Pedir por WhatsApp
          </a>
          <button
            type="button"
            onClick={onScrollToSpecial}
            className="h-11 rounded-full border border-[var(--accent)]/40 bg-[color-mix(in_srgb,var(--accent)_10%,transparent)] px-4 py-2 text-center text-sm font-semibold text-main transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
          >
            Si no lo ves, pídelo
          </button>
        </div>
      </div>
    </section>
  );
}
