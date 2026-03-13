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
          Pides por WhatsApp, te confirmamos y pasas a retirar. Sin dar la vuelta en vano.
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
            TIENDA LOCAL
          </p>
          <h1 className="mt-3 text-3xl font-bold text-main sm:text-4xl">
            RYS Minisúper La Gloria
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-muted-strong sm:text-base">
            Abarrotes, antojitos y compras rápidas para retiro en La Gloria,
            San Salvador. Pides fácil, te confirmamos por WhatsApp y sales
            solo cuando tu pedido ya está listo o confirmado.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="rounded-full border border-[var(--accent)]/40 bg-[var(--accent)]/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-main dark:border-[var(--accent)]/45 dark:bg-[color-mix(in_srgb,var(--accent)_20%,transparent)]">
              Retiro local
            </span>
            <span className="rounded-full border border-default bg-[color-mix(in_srgb,var(--surface-2)_50%,transparent)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-strong">
              La Gloria
            </span>
            <span className="rounded-full border border-default bg-[color-mix(in_srgb,var(--surface-2)_50%,transparent)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-strong">
              Pago al retirar
            </span>
          </div>
          <div className="mt-5 grid gap-3 text-sm text-main sm:grid-cols-3">
            <div className="rounded-2xl border border-default bg-surface-3 px-4 py-3 shadow-sm dark:shadow-[0_10px_30px_rgba(3,8,16,0.18)]">
              <p className="text-xs uppercase tracking-[0.22em] text-[var(--accent)]">
                Qué es
              </p>
              <p className="mt-1 text-muted-strong">Minisúper de barrio con catálogo rápido para pedir.</p>
            </div>
            <div className="rounded-2xl border border-default bg-surface-3 px-4 py-3 shadow-sm dark:shadow-[0_10px_30px_rgba(3,8,16,0.18)]">
              <p className="text-xs uppercase tracking-[0.22em] text-[var(--accent)]">
                Cómo funciona
              </p>
              <p className="mt-1 text-muted-strong">Eliges, escribes por WhatsApp y te confirmamos antes de salir.</p>
            </div>
            <div className="rounded-2xl border border-default bg-surface-3 px-4 py-3 shadow-sm dark:shadow-[0_10px_30px_rgba(3,8,16,0.18)]">
              <p className="text-xs uppercase tracking-[0.22em] text-[var(--accent)]">
                Por qué conviene
              </p>
              <p className="mt-1 text-muted-strong">Te ahorra tiempo y evita ir sin saber si realmente hay.</p>
            </div>
          </div>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href={ctaLink}
              className="h-12 rounded-full bg-[var(--accent)] px-6 py-3 text-center text-sm font-semibold text-[#07130c] shadow-[0_10px_24px_rgba(34,197,94,0.24)] transition hover:opacity-90"
              target="_blank"
              rel="noopener noreferrer"
            >
              Pedir por WhatsApp
            </a>
            <a
              href="#catalogo"
              className="h-12 rounded-full border border-default bg-[color-mix(in_srgb,var(--surface-2)_48%,transparent)] px-6 py-3 text-center text-sm font-semibold text-main transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              Ver catálogo
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
              Información útil
            </p>
            <p className="mt-2 text-muted-strong">Retiro en La Gloria, San Salvador.</p>
            <p className="mt-1 text-muted-strong">Horario: {MO_STORE_HOURS_LABEL}</p>
            <p className="mt-1 text-muted-strong">Pagos: efectivo, transferencia o Tigo Money.</p>
            <p className="mt-1 text-muted-strong">Si algo no aparece en catálogo, pídelo por WhatsApp y te confirmamos.</p>
            <p className="mt-1 text-muted-strong">Ideal para resolver la compra rápida del día sin perder tiempo.</p>
          </div>
          <div className="mt-5 grid gap-2 text-xs text-muted-strong sm:grid-cols-3">
            <span>✅ Confirmamos antes de que salgas</span>
            <span>✅ Pago al retirar</span>
            <span>✅ Tienda real y cercana</span>
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
                  Foto real del local para ubicarlo mejor antes de pasar a retirar.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
