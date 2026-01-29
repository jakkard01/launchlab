import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Alcance y limites",
  description:
    "Resumen de alcance, requisitos y limites para proyectos web y servicios asociados.",
  alternates: { canonical: "/alcance" },
};

export default function AlcancePage() {
  return (
    <main className="min-h-screen w-full px-4 pb-20 pt-28 sm:px-6 lg:px-8">
      <section className="mx-auto w-full max-w-5xl">
        <p className="text-xs uppercase tracking-[0.4em] text-cyan-300/80">
          Alcance
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-white">
          Limites claros y proceso definido
        </h1>
        <p className="mt-3 text-sm text-slate-300">
          Este resumen define lo que incluye y lo que no incluye cada producto.
          Para detalles completos, consulta los documentos en /docs.
        </p>

        <div className="mt-8 grid gap-6">
          <div className="rounded-3xl border border-white/10 bg-black/60 p-6">
            <h2 className="text-xl font-semibold text-white">Web</h2>
            <ul className="mt-3 space-y-2 text-sm text-slate-300">
              <li>Incluye: diseno, SEO base, performance y revisiones acordadas.</li>
              <li>No incluye: hosting, dominio, licencias premium, integraciones enterprise.</li>
              <li>Requisitos: brief, assets y aprobaciones rapidas.</li>
            </ul>
          </div>
          <div className="rounded-3xl border border-white/10 bg-black/60 p-6">
            <h2 className="text-xl font-semibold text-white">Video y Doblaje</h2>
            <ul className="mt-3 space-y-2 text-sm text-slate-300">
              <li>Incluye: guion segun pack, edicion, subtitulos, voiceover.</li>
              <li>No incluye: regrabaciones fuera de scope, licencias premium.</li>
              <li>Requisitos: assets, guion base y video master.</li>
            </ul>
          </div>
          <div className="rounded-3xl border border-white/10 bg-black/60 p-6">
            <h2 className="text-xl font-semibold text-white">n8n Ops y Bots</h2>
            <ul className="mt-3 space-y-2 text-sm text-slate-300">
              <li>Incluye: flujos definidos, QA, handoff y soporte segun pack.</li>
              <li>No incluye: integraciones sin API, cambios ilimitados.</li>
              <li>Requisitos: accesos, owner interno y validacion semanal.</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/web"
            className="rounded-full bg-emerald-400 px-6 py-3 text-center text-sm font-semibold text-black transition hover:bg-emerald-300"
          >
            Ver planes web
          </Link>
          <Link
            href="/contact"
            className="rounded-full border border-white/20 px-6 py-3 text-center text-sm font-semibold text-white/80 transition hover:border-cyan-300/60"
          >
            Reservar llamada
          </Link>
        </div>
      </section>
    </main>
  );
}
