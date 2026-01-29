import type { Metadata } from "next";
import Link from "next/link";
import { portfolio } from "../content/portfolio";
import { buildWhatsappLink, siteConfig } from "../../lib/site";

export const metadata: Metadata = {
  title: "Portfolio | Powered by IA",
  description: "Casos reales de sistemas IA listos para vender y escalar.",
  alternates: { canonical: "/portfolio" },
  openGraph: {
    title: "Portfolio | Powered by IA",
    description:
      "Casos reales de sistemas IA listos para vender y escalar.",
    images: [{ url: siteConfig.ogImage, alt: siteConfig.ogAlt }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio | Powered by IA",
    description:
      "Casos reales de sistemas IA listos para vender y escalar.",
    images: [siteConfig.ogImage],
  },
};

export default function PortfolioPage() {
  const renderTags = (tags: string[]) => {
    const visible = tags.slice(0, 3);
    const extra = tags.length - visible.length;

    return (
      <>
        {visible.map((tag, index) => (
          <span
            key={`${tag}-${index}`}
            className="rounded-full border border-white/10 bg-black/50 px-3 py-1 text-xs font-semibold text-slate-300"
          >
            {tag}
          </span>
        ))}
        {extra > 0 && (
          <span className="rounded-full border border-white/10 bg-black/50 px-3 py-1 text-xs font-semibold text-slate-300">
            +{extra}
          </span>
        )}
      </>
    );
  };

  return (
    <main className="min-h-screen w-full px-4 pb-20 pt-28 sm:px-6 lg:px-8">
      <section className="mx-auto w-full max-w-6xl">
        <p className="text-xs uppercase tracking-[0.4em] text-cyan-300/80">
          Portfolio
        </p>
        <h1 className="mt-3 text-4xl font-semibold text-white">
          Casos Powered by IA para validar y escalar
        </h1>
        <p className="mt-4 max-w-2xl text-base text-slate-300">
          Ejemplos reales en formato demo para mostrar como resolvemos friccion
          con IA.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {portfolio.map((item) => (
            <Link
              key={item.slug}
              href={`/portfolio/${item.slug}`}
              className="group rounded-2xl border border-white/10 bg-black/60 p-6 shadow-lg transition hover:-translate-y-1 hover:border-cyan-300/40 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              aria-label={`Ver caso ${item.title}`}
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-black/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-cyan-100/90">
                Case
              </div>
              <h2 className="mt-4 text-lg font-semibold text-white">{item.title}</h2>
              <p className="mt-3 text-sm text-slate-300">{item.summary}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {renderTags(item.stack)}
              </div>
              <div className="mt-4 space-y-3 text-xs text-slate-300">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.25em] text-cyan-200/70">
                    Problema
                  </p>
                  <p className="mt-1">{item.problem}</p>
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.25em] text-cyan-200/70">
                    Solucion
                  </p>
                  <p className="mt-1">{item.solution}</p>
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.25em] text-cyan-200/70">
                    Entregables
                  </p>
                  <p className="mt-1">{item.deliverables.join(", ")}</p>
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.25em] text-cyan-200/70">
                    Resultado esperado
                  </p>
                  <p className="mt-1">{item.expectedResult}</p>
                </div>
              </div>
              <div className="mt-5 flex items-center justify-end gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200/70 transition group-hover:text-cyan-200 group-hover:underline underline-offset-4">
                <span>Ver caso</span>
                <svg
                  className="h-3 w-3"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-4 rounded-3xl border border-cyan-400/30 bg-black/70 p-8 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-white">
              Necesitas un caso similar?
            </h2>
            <p className="mt-2 text-sm text-slate-300">
              Cuentalo y armamos un plan adaptado a tu negocio.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href={buildWhatsappLink("portfolio_cta")}
              className="rounded-full bg-emerald-400 px-6 py-3 text-center text-sm font-semibold text-black transition hover:bg-emerald-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp (principal)
            </a>
            <Link
              href="/contact?source=portfolio"
              className="rounded-full border border-white/20 px-6 py-3 text-center text-sm font-semibold text-white/90 transition hover:border-cyan-300/60"
            >
              Reservar llamada
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
