import { MO_STORE_HOURS_LABEL, MO_STORE_MAPS_URL } from "../../../lib/mo/config";

type MoHeroProps = {
  ctaLink: string;
};

export default function MoHero({ ctaLink }: MoHeroProps) {
  return (
    <section className="space-y-4">
      <div className="flex h-10 items-center justify-center rounded-2xl bg-slate-900 px-4 text-center text-xs text-white sm:justify-between sm:text-sm">
        <span>Pedís por WhatsApp y pasás a recoger. Sin vueltas.</span>
        <span className="hidden text-white/80 sm:inline">
          La Gloria • {MO_STORE_HOURS_LABEL}
        </span>
      </div>
      <div
        className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white px-6 py-6 shadow-sm sm:px-8"
        data-hero-bg="placeholder-gradient"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.18),_rgba(15,23,42,0.9))]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,_rgba(255,255,255,0.22),_transparent_45%),radial-gradient(circle_at_80%_30%,_rgba(16,185,129,0.18),_transparent_55%)]" />
        <div className="absolute inset-0 bg-slate-950/25 backdrop-blur-[2px]" />
        <div className="relative">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-emerald-200">
            TIENDA EXPRESS
          </p>
          <h1 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">
            RYS Minisúper
          </h1>
          <p className="mt-2 text-sm text-emerald-50">
            Retiro en La Gloria, San Salvador
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="rounded-full border border-emerald-200/40 bg-emerald-500/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-50">
              Retiro
            </span>
            <span className="rounded-full border border-white/30 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
              La Gloria
            </span>
          </div>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href={ctaLink}
              className="h-12 rounded-full bg-emerald-400 px-6 py-3 text-center text-sm font-semibold text-slate-900 transition hover:bg-emerald-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              Escribir por WhatsApp
            </a>
            <a
              href="#catalogo"
              className="h-12 rounded-full border border-white/40 px-6 py-3 text-center text-sm font-semibold text-white transition hover:border-emerald-200 hover:text-emerald-100"
            >
              Ver catálogo
            </a>
            <a
              href={MO_STORE_MAPS_URL}
              className="h-12 rounded-full border border-emerald-200/40 px-6 py-3 text-center text-sm font-semibold text-emerald-50 transition hover:border-emerald-200 hover:text-emerald-100"
              target="_blank"
              rel="noopener noreferrer"
            >
              ¿Dónde estamos?
            </a>
          </div>
          <div className="mt-5 grid gap-2 text-xs text-emerald-50 sm:grid-cols-3">
            <span>✅ Confirmamos disponibilidad</span>
            <span>✅ Pago al retirar</span>
            <span>✅ Listo para retiro</span>
          </div>
        </div>
      </div>
    </section>
  );
}
