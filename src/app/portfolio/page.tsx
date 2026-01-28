import type { Metadata } from "next";
import Link from "next/link";
import { portfolio } from "../content/portfolio";

export const metadata: Metadata = {
  title: "Portfolio | Powered by IA",
  description: "Casos demo Powered by IA y plantillas de sistemas IA en accion.",
};

export default function PortfolioPage() {
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
              className="rounded-2xl border border-white/10 bg-black/60 p-6 shadow-lg transition hover:border-cyan-300/40 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            >
              <h2 className="text-lg font-semibold text-white">{item.title}</h2>
              <p className="mt-3 text-sm text-slate-300">{item.summary}</p>
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
                    Stack
                  </p>
                  <p className="mt-1">{item.stack.join(", ")}</p>
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.25em] text-cyan-200/70">
                    Resultado esperado
                  </p>
                  <p className="mt-1">{item.expectedResult}</p>
                </div>
              </div>
              <span className="mt-4 inline-flex text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200/70">
                Ver caso
              </span>
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
          <Link
            href="/contact?source=portfolio"
            className="rounded-full bg-cyan-400 px-6 py-3 text-center text-sm font-semibold text-black transition hover:bg-cyan-300"
          >
            Reservar llamada
          </Link>
        </div>
      </section>
    </main>
  );
}
