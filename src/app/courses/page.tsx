import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cursos IA | Powered by IA",
  description:
    "Cursos y workshops de IA aplicada para equipos técnicos y ejecutivos.",
};

const tracks = [
  {
    title: "IA Aplicada para Negocio",
    detail: "Frameworks, casos reales y toma de decisiones con datos.",
  },
  {
    title: "Automatización y n8n",
    detail: "Workflows, integraciones y orquestación de procesos.",
  },
  {
    title: "Prompting Profesional",
    detail: "Metodología para equipos productivos y creativos.",
  },
];

export default function CoursesPage() {
  return (
    <main className="min-h-screen w-full px-4 pb-20 pt-28 sm:px-6 lg:px-8">
      <section className="mx-auto w-full max-w-6xl">
        <p className="text-xs uppercase tracking-[0.4em] text-cyan-300/80">
          Cursos
        </p>
        <h1 className="mt-3 text-4xl font-semibold text-white">
          Formación práctica para equipos que ejecutan
        </h1>
        <p className="mt-4 max-w-2xl text-base text-slate-300">
          Programas diseñados para acelerar adopción de IA, automatizar procesos
          y elevar el nivel técnico de tu organización.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tracks.map((track) => (
            <div
              key={track.title}
              className="rounded-2xl border border-white/10 bg-black/60 p-6 shadow-lg"
            >
              <h2 className="text-lg font-semibold text-white">{track.title}</h2>
              <p className="mt-3 text-sm text-slate-300">{track.detail}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-4 rounded-3xl border border-cyan-400/30 bg-black/70 p-8 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-white">
              Solicita un workshop a medida
            </h2>
            <p className="mt-2 text-sm text-slate-300">
              Formato ejecutivo o técnico, con casos reales de tu industria.
            </p>
          </div>
          <Link
            href="/contact"
            className="rounded-full bg-cyan-400 px-6 py-3 text-center text-sm font-semibold text-black transition hover:bg-cyan-300"
          >
            Hablar con un advisor
          </Link>
        </div>
      </section>
    </main>
  );
}
