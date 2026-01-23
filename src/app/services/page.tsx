import type { Metadata } from "next";
import type { ComponentProps } from "react";
import Link from "next/link";
import GlyphBadge from "../components/GlyphBadge";

export const metadata: Metadata = {
  title: "Servicios IA | Powered by IA",
  description:
    "Servicios premium de IA aplicada: automatización, asistentes inteligentes y sistemas de venta digital.",
};

type Glyph = ComponentProps<typeof GlyphBadge>["glyph"];

const serviceBlocks: { title: string; detail: string; glyph: Glyph; step: string }[] = [
  {
    title: "Landing premium (demo)",
    detail:
      "Experiencias de conversión listas para negocio, validación y posicionamiento.",
    glyph: "layout",
    step: "Paso 02 · Implementación",
  },
  {
    title: "Chatbot / Bot IA",
    detail: "Bots web + WhatsApp con base de conocimiento real.",
    glyph: "messages",
    step: "Paso 02 · Implementación",
  },
  {
    title: "Automatizaciones",
    detail: "n8n, IA local y orquestación de procesos conectados a tu stack.",
    glyph: "workflow",
    step: "Paso 03 · Escalado",
  },
  {
    title: "Avatares / videos IA",
    detail: "Guion, diseño y producción de videos IA de marca.",
    glyph: "video",
    step: "Paso 02 · Implementación",
  },
  {
    title: "Consultoría / Implementación",
    detail: "Diagnóstico, roadmap y ejecución con despliegue técnico seguro.",
    glyph: "shield",
    step: "Paso 01 · Diagnóstico",
  },
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen w-full px-4 pb-20 pt-28 sm:px-6 lg:px-8">
      <section className="mx-auto w-full max-w-6xl">
        <p className="text-xs uppercase tracking-[0.4em] text-cyan-300/80">
          Servicios
        </p>
        <h1 className="mt-3 text-4xl font-semibold text-white">
          Soluciones IA diseñadas para equipos ambiciosos
        </h1>
        <p className="mt-4 max-w-2xl text-base text-slate-300">
          Implementamos sistemas inteligentes que reducen fricción, elevan la
          experiencia del cliente y aumentan la velocidad operativa.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {serviceBlocks.map((service) => (
            <div
              key={service.title}
              className="rounded-2xl border border-white/10 bg-black/60 p-6 shadow-lg"
            >
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-black/70 px-3 py-1"><GlyphBadge glyph={service.glyph} /><span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-cyan-100/90">{service.step}</span></div><h2 className="text-lg font-semibold text-white">
                {service.title}
              </h2>
              <p className="mt-3 text-sm text-slate-300">{service.detail}</p>
            </div>
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
            href="/contact"
            className="rounded-full bg-cyan-400 px-6 py-3 text-center text-sm font-semibold text-black transition hover:bg-cyan-300"
          >
            Reservar llamada
          </Link>
        </div>
      </section>
    </main>
  );
}
