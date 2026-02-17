import { MO_STORE_HOURS_LABEL, MO_STORE_MAPS_URL } from "../../../lib/mo/config";

type MoHeroProps = {
  ctaLink: string;
};

export default function MoHero({ ctaLink }: MoHeroProps) {
  return (
    <section className="space-y-4">
      <div className="flex h-10 items-center justify-center rounded-2xl border border-default bg-surface px-4 text-center text-xs text-main sm:justify-between sm:text-sm">
        <span className="text-main">Pedís por WhatsApp y pasás a recoger. Sin vueltas.</span>
        <span className="hidden text-muted sm:inline">
          La Gloria • {MO_STORE_HOURS_LABEL}
        </span>
      </div>
      <div
        className="relative overflow-hidden rounded-3xl border border-default bg-surface px-6 py-6 shadow-sm sm:px-8"
        data-hero-bg="placeholder-gradient"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,color-mix(in_srgb,var(--accent)_20%,transparent),transparent_55%),radial-gradient(circle_at_85%_20%,color-mix(in_srgb,var(--accent)_12%,transparent),transparent_60%),linear-gradient(135deg,color-mix(in_srgb,var(--accent)_10%,transparent),transparent_70%)]" />
        <div className="absolute inset-0 bg-[color-mix(in_srgb,var(--surface)_65%,transparent)] backdrop-blur-[2px]" />
        <div className="relative">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--accent)]">
            TIENDA EXPRESS
          </p>
          <h1 className="mt-3 text-3xl font-semibold text-main sm:text-4xl">
            RYS Minisúper
          </h1>
          <p className="mt-2 text-sm text-muted">
            Retiro en La Gloria, San Salvador
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="rounded-full border border-[var(--accent)]/40 bg-[var(--accent)]/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-main">
              Retiro
            </span>
            <span className="rounded-full border border-default px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted">
              La Gloria
            </span>
          </div>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href={ctaLink}
              className="h-12 rounded-full bg-[var(--accent)] px-6 py-3 text-center text-sm font-semibold text-[var(--surface)] transition hover:opacity-90"
              target="_blank"
              rel="noopener noreferrer"
            >
              Escribir por WhatsApp
            </a>
            <a
              href="#catalogo"
              className="h-12 rounded-full border border-default px-6 py-3 text-center text-sm font-semibold text-main transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              Ver catálogo
            </a>
            <a
              href={MO_STORE_MAPS_URL}
              className="h-12 rounded-full border border-[var(--accent)]/40 px-6 py-3 text-center text-sm font-semibold text-main transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
              target="_blank"
              rel="noopener noreferrer"
            >
              ¿Dónde estamos?
            </a>
          </div>
          <div className="mt-5 rounded-2xl border border-[var(--accent)]/30 bg-[var(--accent)]/10 px-4 py-3 text-xs text-main sm:text-sm">
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--accent)]">
              Retiro local
            </p>
            <p className="mt-2 text-main">Retiro en La Gloria, San Salvador.</p>
            <p className="mt-1 text-main">Horario: {MO_STORE_HOURS_LABEL}</p>
            <p className="mt-1 text-main">Pagos: efectivo, transferencia o Tigo Money.</p>
          </div>
          <div className="mt-5 grid gap-2 text-xs text-main sm:grid-cols-3">
            <span>✅ Confirmamos disponibilidad</span>
            <span>✅ Pago al retirar</span>
            <span>✅ Listo para retiro</span>
          </div>
        </div>
      </div>
    </section>
  );
}
