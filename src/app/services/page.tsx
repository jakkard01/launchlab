import type { Metadata } from "next";
import Link from "next/link";
import GlyphBadge from "../components/GlyphBadge";
import { services } from "../content/catalog";
import { buildWhatsappLink, siteConfig } from "../../lib/site";

export const metadata: Metadata = {
  title: "Servicios IA | Powered by IA",
  description:
    "Servicios de IA para vender y escalar: captación, soporte e integraciones.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Servicios IA | Powered by IA",
    description:
      "Servicios de IA para vender y escalar: captación, soporte e integraciones.",
    images: [{ url: siteConfig.ogImage, alt: siteConfig.ogAlt }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Servicios IA | Powered by IA",
    description:
      "Servicios de IA para vender y escalar: captación, soporte e integraciones.",
    images: [siteConfig.ogImage],
  },
};

export default function ServicesPage() {
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
          Servicios
        </p>
        <h1 className="mt-3 text-4xl font-semibold text-white">
          Servicios Powered by IA para equipos ambiciosos
        </h1>
        <p className="mt-4 max-w-2xl text-base text-slate-300">
          Implementamos sistemas con alcance definido, validación por etapas y
          entregables claros.
        </p>

        <div className="mt-8 rounded-3xl border border-cyan-400/30 bg-black/70 p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/80">
            Producto principal
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-white">
            Webs de conversión
          </h2>
          <p className="mt-2 text-sm text-slate-300">
            Landing, sitio o conversión (Pro). Entregables claros, plazos
            típicos y revisiones definidas.
          </p>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row" data-fab-avoid>
            <Link
              href="/web"
              className="rounded-full bg-emerald-400 px-5 py-2 text-center text-sm font-semibold text-black transition hover:bg-emerald-300"
            >
              Ver planes web
            </Link>
            <a
              href={buildWhatsappLink("services_web")}
              className="rounded-full border border-white/20 px-5 py-2 text-center text-sm font-semibold text-white/90 transition hover:border-cyan-300/60"
              target="_blank"
              rel="noopener noreferrer"
            >
              Hablar por WhatsApp
            </a>
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="group rounded-2xl border border-white/10 bg-black/60 p-6 shadow-lg transition hover:-translate-y-1 hover:border-cyan-300/40 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              aria-label={`Ver detalles de ${service.title}`}
            >
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-black/70 px-3 py-1">
                <GlyphBadge glyph={service.glyph} />
                <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-cyan-100/90">
                  {service.step}
                </span>
              </div>
              <h2 className="text-lg font-semibold text-white">
                {service.title}
              </h2>
              <p className="mt-3 text-sm text-slate-300">{service.summary}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {renderTags(service.tags)}
              </div>
              <div className="mt-5 flex items-center justify-end gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200/70 transition group-hover:text-cyan-200 group-hover:underline underline-offset-4">
                <span>Ver detalles</span>
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
              Agenda una consultoría estratégica
            </h2>
            <p className="mt-2 text-sm text-slate-300">
              Diagnóstico inicial, roadmap y próximos pasos claros.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row" data-fab-avoid>
            <a
              href={buildWhatsappLink("services_cta")}
              className="rounded-full bg-emerald-400 px-6 py-3 text-center text-sm font-semibold text-black transition hover:bg-emerald-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              Hablar por WhatsApp
            </a>
            <Link
              href="/contact?source=services"
              className="rounded-full border border-white/20 px-6 py-3 text-center text-sm font-semibold text-white/90 transition hover:border-cyan-300/60"
            >
              Solicitar propuesta
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
