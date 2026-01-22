import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Demos IA | Powered by IA",
  description:
    "Explora demos profesionales de asistentes IA, automatizaciones y experiencias conversacionales.",
};

const demoCards = [
  {
    title: "Asistente Comercial",
    detail: "Demo conversacional entrenada para capturar y calificar leads.",
  },
  {
    title: "Onboarding Inteligente",
    detail: "Experiencia guiada para usuarios nuevos y equipos internos.",
  },
  {
    title: "Automatización Operativa",
    detail: "Flujos conectados a herramientas de productividad y CRM.",
  },
];

export default function DemosPage() {
  return (
    <main className="min-h-screen w-full px-4 pb-20 pt-28 sm:px-6 lg:px-8">
      <section className="mx-auto w-full max-w-6xl">
        <p className="text-xs uppercase tracking-[0.4em] text-cyan-300/80">
          Demos
        </p>
        <h1 className="mt-3 text-4xl font-semibold text-white">
          Demos funcionales listas para validar
        </h1>
        <p className="mt-4 max-w-2xl text-base text-slate-300">
          Casos reales en preparación. Solicita acceso anticipado y recibe un
          walkthrough privado.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {demoCards.map((demo) => (
            <div
              key={demo.title}
              className="rounded-2xl border border-white/10 bg-black/60 p-6 shadow-lg"
            >
              <h2 className="text-lg font-semibold text-white">{demo.title}</h2>
              <p className="mt-3 text-sm text-slate-300">{demo.detail}</p>
              <p className="mt-6 text-xs uppercase tracking-[0.3em] text-cyan-200/70">
                Disponible pronto
              </p>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-4 rounded-3xl border border-cyan-400/30 bg-black/70 p-8 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-white">
              ¿Quieres ver una demo en vivo?
            </h2>
            <p className="mt-2 text-sm text-slate-300">
              Agenda una sesión para revisar tu caso de uso.
            </p>
          </div>
          <Link
            href="/contact"
            className="rounded-full bg-cyan-400 px-6 py-3 text-center text-sm font-semibold text-black transition hover:bg-cyan-300"
          >
            Solicitar demo
          </Link>
        </div>
      </section>
    </main>
  );
}
