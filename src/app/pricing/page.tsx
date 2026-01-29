import type { Metadata } from "next";
import { buildWhatsappLink, siteConfig } from "../../lib/site";

export const metadata: Metadata = {
  title: "Paquetes | Powered by IA",
  description:
    "Paquetes claros para sistemas de IA listos para vender y escalar.",
  alternates: { canonical: "/pricing" },
  openGraph: {
    title: "Paquetes | Powered by IA",
    description:
      "Paquetes claros para sistemas de IA listos para vender y escalar.",
    images: [{ url: siteConfig.ogImage, alt: siteConfig.ogAlt }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Paquetes | Powered by IA",
    description:
      "Paquetes claros para sistemas de IA listos para vender y escalar.",
    images: [siteConfig.ogImage],
  },
};

const plans = [
  {
    slug: "starter",
    title: "Starter",
    from: "Desde: consulta",
    typicalTimeline: "Plazo típico: 7-10 días",
    description: "Demo + captación para validar rápido.",
    includes: [
      "Diagnóstico express y objetivos",
      "1 flujo de captación (form o WhatsApp)",
      "Demo funcional con guion",
      "Copy base + CTA listos",
      "Handoff + próximos pasos",
    ],
  },
  {
    slug: "growth",
    title: "Growth",
    from: "Desde: consulta",
    typicalTimeline: "Plazo típico: 2-3 semanas",
    description: "Captación + seguimiento + dashboard básico.",
    includes: [
      "Landing o bot con seguimiento",
      "Integraciones WhatsApp / Web",
      "Dashboard básico de leads",
      "Alertas y handoff al equipo",
      "Soporte 30 días",
    ],
    featured: true,
  },
  {
    slug: "pro",
    title: "Pro",
    from: "Desde: consulta",
    typicalTimeline: "Plazo típico: 3-5 semanas",
    description: "End-to-end + integraciones + soporte.",
    includes: [
      "Mapa de procesos + roadmap",
      "Automatizaciones multi-stack",
      "Integraciones CRM / ERP",
      "QA + documentación operativa",
      "Soporte continuo",
    ],
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
        <div className="mt-6 rounded-2xl border border-white/10 bg-black/60 px-6 py-4 text-sm text-slate-200 shadow-lg">
          <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/80">
            Resultados esperados (orientativos)
          </p>
          <ul className="mt-3 space-y-2">
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-300" aria-hidden="true" />
              <span>Demo funcional en 7-10 días</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-300" aria-hidden="true" />
              <span>Casos reales y entregables claros</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-300" aria-hidden="true" />
              <span>Proceso claro con validación por etapas</span>
            </li>
          </ul>
        </div>

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
                  Entregables
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
              <div className="mt-6 flex flex-col gap-3">
                <a
                  href={buildWhatsappLink(
                    `pricing_${plan.slug}`,
                    `Hola, vengo desde poweredbyia.com. Me interesa el paquete ${plan.title}. Industria: __. Objetivo: __. Presupuesto: __.`
                  )}
                  className="inline-flex w-full items-center justify-center rounded-full border border-emerald-300/60 px-4 py-2 text-sm font-semibold text-emerald-200 transition hover:bg-emerald-300 hover:text-black"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Pedir precio por WhatsApp
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
