import type { Metadata } from "next";
import Image from "next/image";
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
    title: "Web Starter",
    from: "Rango orientativo: €850–€1,400",
    typicalTimeline: "Plazo típico: 5-7 días hábiles",
    description: "Landing clara para validar oferta y convertir.",
    includes: [
      "1 página (secciones)",
      "Copy base + CTA + formulario",
      "SEO básico (title/meta, sitemap, robots)",
      "Performance mobile first",
      "1 ronda de cambios",
    ],
  },
  {
    slug: "growth",
    title: "Web Growth",
    from: "Rango orientativo: €1,800–€3,000",
    typicalTimeline: "Plazo típico: 10-14 días hábiles",
    description: "Sitio completo con páginas clave y analítica.",
    includes: [
      "4-6 páginas",
      "2 rondas de cambios",
      "Integración Calendly/WhatsApp",
      "Analítica básica",
      "FAQ + Legal",
    ],
    featured: true,
  },
  {
    slug: "pro",
    title: "Web Pro",
    from: "Rango orientativo: €3,500–€6,500",
    typicalTimeline: "Plazo típico: 2-3 semanas",
    description: "Conversión premium con variantes y casos.",
    includes: [
      "6-10 páginas",
      "3 rondas de cambios",
      "A/B de CTA o 2 variantes de hero",
      "Componentes premium",
      "QA + handoff",
    ],
  },
];

export default function PricingPage() {
  return (
    <main className="min-h-screen w-full px-4 pb-20 pt-28 sm:px-6 lg:px-8">
      <section className="mx-auto w-full max-w-6xl">
        <p className="text-xs uppercase tracking-[0.4em] text-cyan-300/80">
          Web / Páginas Web
        </p>
        <h1 className="mt-3 text-4xl font-semibold text-white">
          Webs de conversión con entregables claros
        </h1>
        <p className="mt-4 max-w-2xl text-base text-slate-300">
          Planes con alcance definido, plazos típicos y revisiones claras. Precio
          orientativo según alcance.
        </p>
        <div className="mt-6 rounded-2xl border border-white/10 bg-black/60 px-6 py-4 text-sm text-slate-200 shadow-lg">
          <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/80">
            Resultados esperados (orientativos)
          </p>
          <ul className="mt-3 space-y-2">
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-300" aria-hidden="true" />
              <span>Entrega web según plan y activos disponibles</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-300" aria-hidden="true" />
              <span>SEO base + performance mobile first</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-300" aria-hidden="true" />
              <span>Proceso por etapas con validación</span>
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
              <p className="mt-2 text-xs text-slate-400">
                Rango orientativo según alcance, contenidos e integraciones.
              </p>
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
                  data-fab-avoid
                  className="inline-flex w-full items-center justify-center rounded-full border border-emerald-300/60 px-4 py-2 text-sm font-semibold text-emerald-200 transition hover:bg-emerald-300 hover:text-black"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Pedir propuesta por WhatsApp
                </a>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 rounded-2xl border border-white/10 bg-black/60 px-6 py-4 text-sm text-slate-300">
          <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/80">
            Limites claros
          </p>
          <p className="mt-3">
            Dominio y hosting pueden gestionarse por nuestro equipo con coste
            externo y quedan a tu nombre. Licencias premium e integraciones
            enterprise se cotizan aparte. Alcance final se valida en llamada.
          </p>
        </div>

        <div className="mt-10 rounded-3xl border border-white/10 bg-black/60 p-6 md:p-8">
          <p className="text-xs uppercase tracking-[0.4em] text-cyan-200/80">
            Quién está detrás
          </p>
          <div className="mt-4 flex flex-col gap-6 md:flex-row md:items-center">
            <Image
              src="/imagenes/perfil/mifoto.jpg"
              alt="Foto del responsable del proyecto"
              width={80}
              height={80}
              className="h-20 w-20 rounded-full border border-white/10 object-cover"
            />
            <div>
              <h3 className="text-xl font-semibold text-white">
                Equipo reducido, ejecución directa
              </h3>
              <p className="mt-2 text-sm text-slate-300">
                Proceso por etapas, validación continua y soporte post-entrega
                según plan.
              </p>
              <ul className="mt-3 space-y-2 text-sm text-slate-200">
                {[
                  "Roadmaps claros y realistas",
                  "Implementación con QA y handoff",
                  "Soporte post-entrega definido",
                ].map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-cyan-300" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
