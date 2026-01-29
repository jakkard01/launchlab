import React from "react";
import GlyphBadge from "./GlyphBadge";

const steps = [
  { n: "01", title: "Descubre", desc: "Objetivos, stack y fricciones clave.", glyph: "cpu" as const },
  { n: "02", title: "Demo", desc: "Pruebas interactivas antes de prometer.", glyph: "play" as const },
  { n: "03", title: "Implementación", desc: "Bots, automatización y entrega sólida.", glyph: "workflow" as const },
  { n: "04", title: "Escala", desc: "Mantenimiento, mejoras y resultados.", glyph: "shield" as const },
];

export default function RouteStepper() {
  return (
    <section className="mx-auto mt-10 max-w-6xl px-4">
      <div className="rounded-3xl border border-white/10 bg-black/25 p-6 backdrop-blur-md">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-cyan-300/80">Ruta</p>
            <h2 className="mt-3 text-2xl font-semibold text-white">De estrategia a ejecución</h2>
            <p className="mt-2 max-w-2xl text-sm text-white/70">
              Un recorrido claro para pasar de idea a sistema IA operativo, con limites definidos.
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-4">
          {steps.map((s) => (
            <div key={s.n} className="rounded-2xl border border-white/10 bg-black/30 p-4">
              <div className="flex items-center justify-between gap-3">
                <GlyphBadge glyph={s.glyph} label={`Paso ${s.n}`} />
              </div>
              <h3 className="mt-3 text-base font-semibold text-white">{s.title}</h3>
              <p className="mt-1 text-sm text-white/70">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
