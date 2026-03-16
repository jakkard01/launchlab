"use client";

import Image from "next/image";
import { MO_STORE_HOURS_LABEL, MO_STORE_MAPS_URL } from "../../../lib/mo/config";

type MoHeroProps = {
  ctaLink: string;
};

export default function MoHero({ ctaLink }: MoHeroProps) {
  return (
    <section className="space-y-4">
      <div className="flex min-h-[44px] items-center justify-center rounded-2xl border border-default bg-surface-2 px-4 py-2 text-center text-xs text-main shadow-sm sm:justify-between sm:text-sm">
        <span className="text-main">
          Café caliente, antojo o compra rápida: pides por WhatsApp, te confirmamos y pasas a retirar.
        </span>
        <span className="hidden text-muted-strong sm:inline">
          La Gloria • {MO_STORE_HOURS_LABEL}
        </span>
      </div>
      <div
        className="relative overflow-hidden rounded-3xl border border-default bg-surface px-6 py-6 shadow-sm shadow-slate-950/5 sm:px-8 dark:bg-[var(--surface-2)] dark:shadow-[0_24px_70px_rgba(3,8,16,0.34)]"
        data-hero-bg="placeholder-gradient"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,color-mix(in_srgb,var(--accent)_22%,transparent),transparent_52%),radial-gradient(circle_at_85%_18%,color-mix(in_srgb,var(--accent)_12%,transparent),transparent_58%),linear-gradient(135deg,color-mix(in_srgb,var(--accent)_10%,transparent),transparent_72%)] dark:bg-[radial-gradient(circle_at_18%_14%,color-mix(in_srgb,var(--accent)_18%,transparent),transparent_48%),radial-gradient(circle_at_82%_18%,rgba(255,255,255,0.06),transparent_44%),linear-gradient(145deg,rgba(255,255,255,0.05),transparent_58%)]" />
        <div className="absolute inset-0 bg-[color-mix(in_srgb,var(--surface)_62%,transparent)] backdrop-blur-[2px] dark:bg-[linear-gradient(180deg,rgba(9,16,27,0.1),rgba(9,16,27,0.34))]" />
        <div className="relative grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_320px] lg:items-start">
          <div>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--accent)]">
            TIENDA LOCAL LISTA PARA PEDIR
          </p>
          <h1 className="mt-3 text-3xl font-bold text-main sm:text-4xl">
            Resuelve tu compra del día sin tráfico, sin vueltas y con retiro fácil
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-muted-strong sm:text-base">
            Abarrotes, antojitos, café y combos para retiro en La Gloria,
            San Salvador. Pides rápido, te confirmamos por WhatsApp y sales
            solo cuando ya sabes qué hay, cuánto pagar y cuándo pasar, sin comerte la cola del súper.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="rounded-full border border-[var(--accent)]/40 bg-[var(--accent)]/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-main dark:border-[var(--accent)]/45 dark:bg-[color-mix(in_srgb,var(--accent)_20%,transparent)]">
              Retiro fácil
            </span>
            <span className="rounded-full border border-default bg-[color-mix(in_srgb,var(--surface-2)_50%,transparent)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-strong">
              Desayuno y merienda
            </span>
            <span className="rounded-full border border-default bg-[color-mix(in_srgb,var(--surface-2)_50%,transparent)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-strong">
              Pago al retirar
            </span>
          </div>
          <div className="mt-5 grid gap-3 text-sm text-main sm:grid-cols-3">
            <div className="rounded-2xl border border-default bg-surface-3 px-4 py-3 shadow-sm dark:shadow-[0_10px_30px_rgba(3,8,16,0.18)]">
              <p className="text-xs uppercase tracking-[0.22em] text-[var(--accent)]">
                Compra rápida
              </p>
              <p className="mt-1 text-muted-strong">Pan dulce, café caliente, boquitas y básicos de casa listos para sacarte del apuro.</p>
            </div>
            <div className="rounded-2xl border border-default bg-surface-3 px-4 py-3 shadow-sm dark:shadow-[0_10px_30px_rgba(3,8,16,0.18)]">
              <p className="text-xs uppercase tracking-[0.22em] text-[var(--accent)]">
                Confirmación real
              </p>
              <p className="mt-1 text-muted-strong">Te decimos si está disponible, total estimado y hora de retiro antes de que salgas.</p>
            </div>
            <div className="rounded-2xl border border-default bg-surface-3 px-4 py-3 shadow-sm dark:shadow-[0_10px_30px_rgba(3,8,16,0.18)]">
              <p className="text-xs uppercase tracking-[0.22em] text-[var(--accent)]">
                Ideal para hoy
              </p>
              <p className="mt-1 text-muted-strong">Perfecto para desayuno, merienda, antojo caliente o para evitar la cola del súper.</p>
            </div>
          </div>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href={ctaLink}
              className="h-12 rounded-full bg-[var(--accent)] px-6 py-3 text-center text-sm font-semibold text-[#07130c] shadow-[0_10px_24px_rgba(34,197,94,0.24)] transition hover:opacity-90"
              target="_blank"
              rel="noopener noreferrer"
            >
              Pedir y confirmar por WhatsApp
            </a>
            <a
              href="#catalogo"
              className="h-12 rounded-full border border-default bg-[color-mix(in_srgb,var(--surface-2)_48%,transparent)] px-6 py-3 text-center text-sm font-semibold text-main transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              Ver qué hay hoy
            </a>
            <a
              href={MO_STORE_MAPS_URL}
              className="h-12 rounded-full border border-[var(--accent)]/40 bg-[color-mix(in_srgb,var(--surface-2)_44%,transparent)] px-6 py-3 text-center text-sm font-semibold text-main transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
              target="_blank"
              rel="noopener noreferrer"
            >
              ¿Dónde estamos?
            </a>
          </div>
          <div className="mt-5 rounded-2xl border border-[var(--accent)]/30 bg-[color-mix(in_srgb,var(--accent)_14%,var(--surface-2))] px-4 py-3 text-xs text-main shadow-sm sm:text-sm dark:border-[var(--accent)]/36 dark:bg-[color-mix(in_srgb,var(--accent)_12%,var(--surface-2))]">
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--accent)]">
              Compra sin dar la vuelta en vano
            </p>
            <p className="mt-2 text-muted-strong">Retiro en La Gloria, San Salvador.</p>
            <p className="mt-1 text-muted-strong">Horario: {MO_STORE_HOURS_LABEL}</p>
            <p className="mt-1 text-muted-strong">Pagos: efectivo, transferencia o Tigo Money.</p>
            <p className="mt-1 text-muted-strong">Si algo no aparece en catálogo, pídelo por WhatsApp y te confirmamos si lo tenemos hoy.</p>
            <p className="mt-1 text-muted-strong">Ideal para resolver antojo, café caliente, básicos de casa o un combo rápido sin hacer cola ni dar la vuelta dos veces.</p>
          </div>
          <div className="mt-5 grid gap-2 text-xs text-muted-strong sm:grid-cols-3">
            <span>✅ Confirmamos antes de que salgas</span>
            <span>✅ Retiro fácil y pago simple</span>
            <span>✅ Tienda real, cercana y lista para hoy</span>
          </div>
          </div>
          <div className="mx-auto w-full max-w-[320px]">
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
