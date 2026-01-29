import type { Metadata } from "next";
import Link from "next/link";
import GlyphBadge from "../components/GlyphBadge";
import { services } from "../content/catalog";
import { site } from "../lib/site";

export const metadata: Metadata = {
  title: "Servicios IA | Powered by IA",
  description:
    "Servicios premium de Powered by IA: automatización, asistentes inteligentes y sistemas de venta digital.",
  openGraph: {
    title: "Servicios IA | Powered by IA",
    description:
      "Servicios premium de Powered by IA: automatización, asistentes inteligentes y sistemas de venta digital.",
    images: [{ url: site.ogImage, alt: site.ogAlt }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Servicios IA | Powered by IA",
    description:
      "Servicios premium de Powered by IA: automatización, asistentes inteligentes y sistemas de venta digital.",
    images: [site.ogImage],
  },
};

export default function ServicesPage() {
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
          Implementamos sistemas inteligentes que reducen fricción, elevan la
          experiencia del cliente y aumentan la velocidad operativa.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="rounded-2xl border border-white/10 bg-black/60 p-6 shadow-lg transition hover:border-cyan-300/40 focus:outline-none focus:ring-2 focus:ring-cyan-400"
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
          <Link
            href="/contact?source=services"
            className="rounded-full bg-cyan-400 px-6 py-3 text-center text-sm font-semibold text-black transition hover:bg-cyan-300"
          >
            Reservar llamada
          </Link>
        </div>
      </section>
    </main>
  );
}
