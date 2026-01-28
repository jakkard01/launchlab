import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Paquetes | Powered by IA",
  description:
    "Paquetes claros de Powered by IA para implementar IA, automatizar y escalar.",
};

const plans = [
  {
    title: "Sprint IA",
    from: "Desde EUR 900",
    typicalTimeline: "Plazo tipico: 7-10 dias",
    description: "Diagnostico, propuesta y quick wins en 7 dias.",
    features: [
      "Workshop de objetivos",
      "Mapa de automatizaciones",
      "Plan de implementacion rapido",
    ],
    ctaLabel: "Reservar llamada",
    ctaHref: "/contact?source=pricing-sprint",
  },
  {
    title: "Launch",
    from: "Desde EUR 2.500",
    typicalTimeline: "Plazo tipico: 2-3 semanas",
    description: "Implementacion de un bot o landing premium.",
    features: [
      "Setup funcional completo",
      "Iteraciones de copy y flujo",
      "Entrega lista para publicar",
    ],
    ctaLabel: "Reservar llamada",
    ctaHref: "/contact?source=pricing-launch",
  },
  {
    title: "Scale",
    from: "Desde EUR 6.500",
    typicalTimeline: "Plazo tipico: 3-5 semanas",
    description: "Sistema IA con automatizaciones y soporte al equipo.",
    features: [
      "Integraciones clave",
      "Automatizaciones multi-proceso",
      "Documentacion operativa",
    ],
    ctaLabel: "Reservar llamada",
    ctaHref: "/contact?source=pricing-scale",
  },
  {
    title: "Enterprise",
    from: "Custom",
    typicalTimeline: "Plazo tipico: 4-8 semanas",
    description: "Arquitectura a medida para equipos complejos.",
    features: [
      "Roadmap trimestral",
      "Seguridad y compliance",
      "Acompanamiento continuo",
    ],
    ctaLabel: "Reservar llamada",
    ctaHref: "/contact?source=pricing-enterprise",
  },
];

export default function PricingPage() {
  return (
    <main className="min-h-screen w-full px-4 pb-20 pt-28 sm:px-6 lg:px-8">
      <section className="mx-auto w-full max-w-6xl">
        <p className="text-xs uppercase tracking-[0.4em] text-cyan-300/80">
          Paquetes
        </p>
        <h1 className="mt-3 text-4xl font-semibold text-white">
          Planes Powered by IA para lanzar IA con impacto
        </h1>
        <p className="mt-4 max-w-2xl text-base text-slate-300">
          Selecciona el nivel que necesitas hoy y escala cuando el sistema ya
          este probado.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {plans.map((plan) => (
            <div
              key={plan.title}
              className="rounded-2xl border border-white/10 bg-black/60 p-6 shadow-lg"
            >
              <h2 className="text-lg font-semibold text-white">{plan.title}</h2>
              <p className="mt-2 text-sm text-cyan-200">{plan.from}</p>
              <p className="mt-2 text-xs uppercase tracking-[0.3em] text-slate-400">
                {plan.typicalTimeline}
              </p>
              <p className="mt-3 text-sm text-slate-300">
                {plan.description}
              </p>
              <ul className="mt-4 space-y-2 text-sm text-slate-300">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-cyan-300" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Link
                href={plan.ctaHref}
                className="mt-6 inline-flex w-full items-center justify-center rounded-full border border-cyan-300/60 px-4 py-2 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-400 hover:text-black"
              >
                {plan.ctaLabel}
              </Link>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
