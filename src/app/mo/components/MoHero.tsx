"use client";

import Image from "next/image";
import { MO_STORE_HOURS_LABEL, MO_STORE_MAPS_URL } from "../../../lib/mo/config";

type MoHeroProps = {
  ctaLink: string;
};

export default function MoHero({ ctaLink }: MoHeroProps) {
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
        <div className="relative grid gap-4 lg:grid-cols-[minmax(0,1.4fr)_320px] lg:items-start lg:gap-6">
          <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[var(--accent)] sm:text-xs sm:tracking-[0.35em]">
            TIENDA LOCAL LISTA PARA PEDIR
          </p>
          <h1 className="mt-2 max-w-2xl text-2xl font-bold leading-tight text-main sm:mt-3 sm:text-4xl">
            Resuelve antojo, café o básicos del día sin otra cola
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-muted-strong sm:mt-3 sm:text-base">
            Abarrotes, café, antojitos y combos para retiro en La Gloria. Pides rápido, te confirmamos por WhatsApp y pasas cuando ya sabes qué hay y cuándo retirar.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="rounded-full border border-[var(--accent)]/40 bg-[var(--accent)]/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-main dark:border-[var(--accent)]/45 dark:bg-[color-mix(in_srgb,var(--accent)_20%,transparent)]">
              Retiro fácil
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
          <div className="mt-4 rounded-2xl border border-[var(--accent)]/30 bg-[color-mix(in_srgb,var(--accent)_14%,var(--surface-2))] px-4 py-3 text-xs text-main shadow-sm sm:mt-5 sm:text-sm dark:border-[var(--accent)]/36 dark:bg-[color-mix(in_srgb,var(--accent)_12%,var(--surface-2))]">
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--accent)]">
              Compra sin dar la vuelta en vano
            </p>
            <p className="mt-2 text-muted-strong">Retiro en La Gloria. Horario: {MO_STORE_HOURS_LABEL}.</p>
            <p className="mt-1 text-muted-strong">Si no sale en catálogo, pídelo por WhatsApp y te confirmamos antes de salir.</p>
          </div>
          <div className="mt-4 grid gap-2 text-xs text-muted-strong sm:mt-5 sm:grid-cols-3">
            <span>✅ Confirmamos antes de que salgas</span>
            <span>✅ Retiro fácil y pago simple</span>
            <span className="hidden sm:inline">✅ Tienda real, cercana y lista para hoy</span>
          </div>
          </div>
          <div className="mx-auto hidden w-full max-w-[320px] lg:block">
            <div className="overflow-hidden rounded-[28px] border border-default bg-surface-3 shadow-[0_24px_60px_rgba(15,24,38,0.14)] dark:shadow-[0_28px_70px_rgba(3,8,16,0.4)]">
              <div className="relative aspect-[4/5] w-full">
                <Image
                  src="/imagenes/perfil/rysminisuper.jpeg"
                  alt="Fachada del local RYS Minisúper en La Gloria"
                  fill
                  sizes="(max-width: 1024px) 100vw, 320px"
                  className="object-cover"
                  priority
                />
              </div>
              <div className="space-y-1 border-t border-default px-4 py-4 text-sm">
                <p className="font-semibold text-main">RYS Minisúper, La Gloria</p>
                <p className="text-muted-strong">
                  Local real para ubicarlo fácil antes de pasar a retirar tu pedido.
                </p>
                <a
                  href={MO_STORE_MAPS_URL}
                  className="inline-flex pt-2 text-xs font-semibold text-[var(--accent)] transition hover:text-[var(--accent)]/80"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ver ubicación
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
