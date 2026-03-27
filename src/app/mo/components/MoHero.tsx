"use client";

import {
  MO_BRAND,
  MO_STORE_ADDRESS,
  MO_STORE_HOURS_LABEL,
  MO_STORE_LOCATION_FALLBACK_MESSAGE,
  MO_STORE_MAPS_URL,
  MO_STORE_PAYMENT_LABEL,
  MO_STORE_PICKUP_LABEL,
  MO_STORE_REFERENCE,
  MO_STORE_RESPONSE_TIME_LABEL,
  MO_STORE_TRUST_COPY,
} from "../../../lib/mo/config";
import { buildWhatsAppMessageLink } from "../../../lib/mo/whatsapp";

type MoHeroProps = {
  ctaLink: string;
};

export default function MoHero({ ctaLink }: MoHeroProps) {
  const locationFallbackLink = buildWhatsAppMessageLink(
    MO_STORE_LOCATION_FALLBACK_MESSAGE
  );
  const locationLink = MO_STORE_MAPS_URL || locationFallbackLink;
  const locationLinkLabel = MO_STORE_MAPS_URL ? "Cómo llegar" : "Pedir ubicación";

  return (
    <section className="space-y-3 overflow-x-clip">
      <div className="flex min-h-[34px] items-center justify-center rounded-2xl border border-default bg-surface-2 px-3 py-2 text-center text-[11px] text-main shadow-sm sm:min-h-[40px] sm:px-4 sm:text-sm sm:justify-between">
        <span className="text-main">
          Café, boquita o básicos: escribes, confirmamos y pasas solo cuando ya vale la pena salir.
        </span>
        <span className="hidden text-muted-strong sm:inline">
          La Gloria • {MO_STORE_HOURS_LABEL}
        </span>
      </div>
      <div
        className="relative overflow-hidden rounded-3xl border border-default bg-surface px-4 py-4 shadow-sm shadow-slate-950/5 sm:px-8 sm:py-6 dark:bg-[var(--surface-2)] dark:shadow-[0_24px_70px_rgba(3,8,16,0.34)]"
        data-hero-bg="placeholder-gradient"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,color-mix(in_srgb,var(--accent)_22%,transparent),transparent_52%),radial-gradient(circle_at_85%_18%,color-mix(in_srgb,var(--accent)_12%,transparent),transparent_58%),linear-gradient(135deg,color-mix(in_srgb,var(--accent)_10%,transparent),transparent_72%)] dark:bg-[radial-gradient(circle_at_18%_14%,color-mix(in_srgb,var(--accent)_18%,transparent),transparent_48%),radial-gradient(circle_at_82%_18%,rgba(255,255,255,0.06),transparent_44%),linear-gradient(145deg,rgba(255,255,255,0.05),transparent_58%)]" />
        <div className="absolute inset-0 bg-[color-mix(in_srgb,var(--surface)_62%,transparent)] backdrop-blur-[2px] dark:bg-[linear-gradient(180deg,rgba(9,16,27,0.1),rgba(9,16,27,0.34))]" />
        <div className="relative grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(280px,340px)] lg:items-start lg:gap-6">
          <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[var(--accent)] sm:text-xs sm:tracking-[0.35em]">
            TIENDA LOCAL LISTA PARA PEDIR
          </p>
          <h1 className="mt-2 max-w-2xl text-2xl font-bold leading-tight text-main sm:mt-3 sm:text-4xl">
            Pide rápido desde el móvil y retira cuando ya está confirmado
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-muted-strong sm:mt-3 sm:text-base">
            {MO_BRAND.currentDisplayName} te deja resolver café, antojos, bebidas y básicos sin vueltas de más. Buscas, armas tu pedido, mandas WhatsApp y te confirmamos antes de salir.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="rounded-full border border-[var(--accent)]/40 bg-[var(--accent)]/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-main dark:border-[var(--accent)]/45 dark:bg-[color-mix(in_srgb,var(--accent)_20%,transparent)]">
              {MO_STORE_PICKUP_LABEL}
            </span>
            <span className="rounded-full border border-default bg-[color-mix(in_srgb,var(--surface-2)_50%,transparent)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-strong">
              Desayuno y merienda
            </span>
            <span className="hidden rounded-full border border-default bg-[color-mix(in_srgb,var(--surface-2)_50%,transparent)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-strong sm:inline-flex">
              Pago al retirar
            </span>
          </div>
          <div className="mt-4 flex flex-col gap-2.5 sm:mt-5 sm:flex-row sm:items-center sm:gap-3">
            <a
              href={locationLink}
              className="h-11 rounded-full bg-[color-mix(in_srgb,var(--accent)_16%,var(--surface))] px-5 py-3 text-center text-sm font-semibold text-main shadow-[0_10px_24px_rgba(15,23,42,0.08)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
              target="_blank"
              rel="noopener noreferrer"
            >
              {locationLinkLabel}
            </a>
            <a
              href={ctaLink}
              className="h-11 rounded-full bg-[var(--accent)] px-5 py-3 text-center text-sm font-semibold text-[#07130c] shadow-[0_10px_24px_rgba(34,197,94,0.24)] transition hover:opacity-90"
              target="_blank"
              rel="noopener noreferrer"
            >
              Pedir por WhatsApp
            </a>
            <a
              href="#catalogo"
              className="h-11 rounded-full border border-default bg-[color-mix(in_srgb,var(--surface-2)_48%,transparent)] px-5 py-3 text-center text-sm font-semibold text-main transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              Ver qué hay hoy
            </a>
          </div>
          <div className="mt-4 rounded-3xl border border-[var(--accent)]/28 bg-[color-mix(in_srgb,var(--surface)_78%,var(--accent)_8%)] p-4 shadow-sm dark:bg-[color-mix(in_srgb,var(--surface-2)_86%,var(--accent)_8%)] sm:mt-5 sm:p-5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[var(--accent)]">
              Ubicación real y retiro seguro
            </p>
            <p className="mt-2 text-base font-semibold text-main sm:text-lg">
              Estamos en La Gloria, San Salvador.
            </p>
            <p className="mt-2 text-sm text-muted-strong sm:text-base">
              {MO_STORE_TRUST_COPY}
            </p>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              <div className="rounded-2xl border border-default bg-surface px-3 py-3 text-sm shadow-sm">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted">Ubicación / referencia</p>
                <p className="mt-1 font-semibold text-main">{MO_STORE_ADDRESS}</p>
                <p className="mt-1 text-xs text-muted-strong">{MO_STORE_REFERENCE}</p>
              </div>
              <div className="rounded-2xl border border-default bg-surface px-3 py-3 text-sm shadow-sm">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted">Horario</p>
                <p className="mt-1 font-semibold text-main">{MO_STORE_HOURS_LABEL}</p>
              </div>
              <div className="rounded-2xl border border-default bg-surface px-3 py-3 text-sm shadow-sm">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted">Pago</p>
                <p className="mt-1 font-semibold text-main">{MO_STORE_PAYMENT_LABEL}</p>
              </div>
              <div className="rounded-2xl border border-default bg-surface px-3 py-3 text-sm shadow-sm">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted">Retiro en tienda</p>
                <p className="mt-1 font-semibold text-main">{MO_STORE_PICKUP_LABEL}</p>
                <p className="mt-1 text-xs text-muted-strong">Si no ves algo, escríbenos y te confirmamos antes de salir.</p>
              </div>
            </div>
            <div className="mt-4 flex flex-col gap-2 sm:flex-row">
              <a
                href={locationLink}
                className="h-11 rounded-full bg-[var(--accent)] px-5 py-3 text-center text-sm font-semibold text-[#07130c] shadow-[0_10px_24px_rgba(34,197,94,0.24)] transition hover:opacity-90"
                target="_blank"
                rel="noopener noreferrer"
              >
                {locationLinkLabel}
              </a>
              <a
                href={ctaLink}
                className="h-11 rounded-full border border-default bg-surface px-5 py-3 text-center text-sm font-semibold text-main transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
                target="_blank"
                rel="noopener noreferrer"
              >
                Pedir por WhatsApp
              </a>
            </div>
          </div>
          <div className="mt-4 rounded-2xl border border-[var(--accent)]/30 bg-[color-mix(in_srgb,var(--accent)_14%,var(--surface-2))] px-4 py-3 text-xs text-main shadow-sm sm:mt-5 sm:text-sm dark:border-[var(--accent)]/36 dark:bg-[color-mix(in_srgb,var(--accent)_12%,var(--surface-2))]">
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--accent)]">
              Compra sin dar la vuelta en vano
            </p>
            <p className="mt-2 text-muted-strong">Retiro en La Gloria. Horario: {MO_STORE_HOURS_LABEL}.</p>
            <p className="mt-1 text-muted-strong">Si no sale en catálogo, pídelo por WhatsApp y te confirmamos antes de salir.</p>
          </div>
          <div className="mt-4 grid gap-2 text-xs text-muted-strong sm:mt-5 sm:grid-cols-3">
            <span>✅ Confirmamos antes de que salgas</span>
            <span>✅ Pago al retirar y retiro simple</span>
            <span className="hidden sm:inline">✅ Respuesta clara por WhatsApp</span>
          </div>
          </div>
          <div className="rounded-3xl border border-default bg-[color-mix(in_srgb,var(--surface-2)_78%,transparent)] p-4 shadow-sm dark:bg-[color-mix(in_srgb,var(--surface-2)_92%,transparent)]">
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[var(--accent)]">
              Compra en 3 pasos
            </p>
            <ol className="mt-3 space-y-3 text-sm text-muted-strong">
              <li className="rounded-2xl border border-default bg-surface px-3 py-3">
                <span className="font-semibold text-main">1. Elige tus productos</span>
                <p className="mt-1">Busca por nombre o entra por categorías útiles.</p>
              </li>
              <li className="rounded-2xl border border-default bg-surface px-3 py-3">
                <span className="font-semibold text-main">2. Manda el pedido por WhatsApp</span>
                <p className="mt-1">Te queda claro lo que llevas y si falta algo nos lo escribes.</p>
              </li>
              <li className="rounded-2xl border border-default bg-surface px-3 py-3">
                <span className="font-semibold text-main">3. Te confirmamos y lo recoges en tienda</span>
                <p className="mt-1">Pago al retirar, con confirmación antes de salir.</p>
              </li>
            </ol>
            <div className="mt-3 rounded-2xl border border-[var(--accent)]/20 bg-[color-mix(in_srgb,var(--accent)_8%,transparent)] px-3 py-3 text-xs text-muted-strong">
              <p>Pago al retirar.</p>
              <p className="mt-1">Si no ves algo, escríbenos.</p>
              <p className="mt-1">Confirmación antes de salir.</p>
              <p className="mt-1">{MO_STORE_RESPONSE_TIME_LABEL}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
