import type { Metadata } from "next";
import Link from "next/link";
import { buildWhatsappLink, site } from "../../lib/site";

export const metadata: Metadata = {
  title: "Paquetes | Powered by IA",
  description:
    "Paquetes claros de Powered by IA para implementar IA, automatizar y escalar.",
  openGraph: {
    title: "Paquetes | Powered by IA",
    description:
      "Paquetes claros de Powered by IA para implementar IA, automatizar y escalar.",
    images: [{ url: site.ogImage, alt: site.ogAlt }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Paquetes | Powered by IA",
    description:
      "Paquetes claros de Powered by IA para implementar IA, automatizar y escalar.",
    images: [site.ogImage],
  },
};

const plans = [
  {
    slug: "starter",
    title: "Plan Starter",
    from: "Desde €900",
    typicalTimeline: "Plazo típico: 7-10 días",
    description: "Sprint para validar un flujo con IA y medir respuesta.",
    includes: [
      "Diagnóstico + alcance",
      "1 flujo automatizado",
      "Demo funcional",
    ],
    excludes: ["Integraciones complejas", "Múltiples squads"],
  },
  {
    slug: "growth",
    title: "Plan Growth",
    from: "Desde €1.500",
    typicalTimeline: "Plazo típico: 2-3 semanas",
    description: "Bot o landing con integraciones ligeras para ventas.",
    includes: [
      "Setup completo + copy base",
      "Integraciones WhatsApp / Web",
      "Soporte 30 días",
    ],
    excludes: ["Automatizaciones multi-área", "Infraestructura a medida"],
    featured: true,
  },
  {
    slug: "pro",
    title: "Plan Pro",
    from: "Desde €3.000",
    typicalTimeline: "Plazo típico: 3-5 semanas",
    description: "Sistema IA conectado a procesos críticos.",
    includes: [
      "Mapa de procesos",
      "Automatizaciones multi-stack",
      "Documentación operativa",
    ],
    excludes: ["Desarrollo de producto completo", "Equipos dedicados"],
  },
  {
    slug: "custom",
    title: "Custom",
    from: "A medida",
    typicalTimeline: "Plazo típico: 4-8 semanas",
    description: "Arquitectura avanzada y coordinación multi-equipo.",
    includes: [
      "Roadmap y sprints",
      "Compliance básico",
      "Acompañamiento continuo",
    ],
    excludes: ["Soporte 24/7", "Licencias de terceros"],
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
              className={`rounded-2xl border p-6 shadow-lg ${
                plan.featured
                  ? "border-cyan-400/40 bg-black/70"
                  : "border-white/10 bg-black/60"
              }`}
            >
              <h2 className="text-lg font-semibold text-white">{plan.title}</h2>
              <p className="mt-2 text-sm text-cyan-200">{plan.from}</p>
              <p className="mt-2 text-xs uppercase tracking-[0.3em] text-slate-400">
                {plan.typicalTimeline}
              </p>
              <p className="mt-3 text-sm text-slate-300">
                {plan.description}
              </p>
              <div className="mt-4">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200/70">
                  Incluye
                </p>
                <ul className="mt-3 space-y-2 text-sm text-slate-300">
                  {plan.includes.map((feature) => (
                    <li key={feature} className="flex gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-cyan-300" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-4">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                  No incluye
                </p>
                <ul className="mt-3 space-y-2 text-sm text-slate-400">
                  {plan.excludes.map((feature) => (
                    <li key={feature} className="flex gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-white/20" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-6 flex flex-col gap-3">
                <Link
                  href={`/contact?source=pricing_${plan.slug}`}
                  className="inline-flex w-full items-center justify-center rounded-full bg-cyan-400 px-4 py-2 text-sm font-semibold text-black transition hover:bg-cyan-300"
                >
                  Reservar llamada
                </Link>
                <a
                  href={buildWhatsappLink(
                    `pricing_${plan.slug}`,
                    `Hola, vengo desde poweredbyia.com. Me interesa el plan ${plan.title}.`
                  )}
                  className="inline-flex w-full items-center justify-center rounded-full border border-emerald-300/60 px-4 py-2 text-sm font-semibold text-emerald-200 transition hover:bg-emerald-300 hover:text-black"
                  target="_blank"
                  rel="noreferrer"
                >
                  WhatsApp directo
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
