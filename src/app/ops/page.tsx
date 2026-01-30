import type { Metadata } from "next";
import Link from "next/link";
import { buildContactLink, buildWhatsappLink, siteUrl } from "../../lib/site";

export const metadata: Metadata = {
  title: "n8n Ops",
  description:
    "Automatizaciones n8n con límites claros: flujos, integraciones y soporte operativo.",
  alternates: {
    canonical: `${siteUrl}/ops`,
  },
};

const buildWhatsappUtmLink = (
  source: string,
  campaign?: string,
  message?: string
) => {
  const url = new URL(buildWhatsappLink(source, message));
  url.searchParams.set("utm_source", source);
  if (campaign) url.searchParams.set("utm_campaign", campaign);
  return url.toString();
};

const opsPacks = [
  {
    name: "Ops Starter",
    cadence: "1 flujo",
    price: "Inversión estimada: €490–€1,200",
    campaign: "starter",
    includes: [
      "Discovery + mapeo del proceso",
      "1 flujo n8n con QA",
      "Documentacion y handoff",
    ],
    excludes: [
      "Integraciones complejas",
      "Dashboards avanzados",
      "Soporte 24/7",
    ],
    requirements: [
      "Acceso a herramientas",
      "Definicion del proceso",
      "Owner interno para validacion",
    ],
    revisions: "1 ronda de ajustes (cambios de alcance = nuevo flujo).",
    timeline: "5-7 días hábiles.",
    priceNote:
      "Simple = 1-2 integraciones, <10 nodos, sin ERP/CRM custom.",
  },
  {
    name: "Ops Growth",
    cadence: "3-5 flujos",
    price: "Inversión estimada: €1,500–€3,500",
    campaign: "growth",
    includes: [
      "Flujos criticos orquestados",
      "Integración CRM + alertas",
      "Monitoreo básico + logging",
      "Soporte post-lanzamiento",
    ],
    excludes: [
      "Integraciones custom complejas",
      "Dashboards BI avanzados",
      "SLA 24/7",
    ],
    requirements: [
      "Accesos API y credenciales",
      "Mapa de procesos acordado",
      "Tiempo de validacion semanal",
    ],
    revisions: "1 ronda por flujo.",
    timeline: "2-3 semanas.",
    priceNote:
      "Simple a media complejidad. Compleja se cotiza aparte.",
  },
  {
    name: "Ops Pro",
    cadence: "Multi-sistema",
    price: "Inversión estimada: €3,800–€7,500",
    campaign: "pro",
    includes: [
      "Arquitectura n8n escalable",
      "Dashboards operativos",
      "Logs, retries y branching",
      "Soporte prioritario",
    ],
    excludes: [
      "Integraciones propietarias sin API",
      "Cambios ilimitados",
      "Infra on-prem sin alcance",
    ],
    requirements: [
      "Acceso completo a stack",
      "Stakeholders disponibles",
      "Definicion de KPIs",
    ],
    revisions: "2 rondas por flujo.",
    timeline: "4-6 semanas.",
    priceNote:
      "Compleja = 3+ integraciones, 20+ nodos, ERP/CRM custom.",
  },
];

export default function OpsPage() {
  return (
    <main className="min-h-screen w-full px-4 pb-20 pt-28 sm:px-6 lg:px-8">
      <section className="mx-auto w-full max-w-6xl">
        <div className="rounded-[32px] border border-white/10 bg-black/65 p-8 shadow-2xl">
          <p className="text-xs uppercase tracking-[0.4em] text-cyan-200/80">
            n8n Ops
          </p>
          <h1 className="mt-4 text-3xl font-semibold text-white md:text-4xl">
            Automatizaciones operativas con límites claros
          </h1>
          <p className="mt-3 text-base text-slate-200 md:text-lg">
            Flujos n8n definidos por complejidad y volumen. Sin mezclar con otros
            productos fuera del Super Pack.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center" data-fab-avoid>
            <a
              href={buildWhatsappUtmLink(
                "ops",
                "hero",
                "Quiero info de automatizaciones n8n."
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-emerald-400 px-6 py-3 text-center text-sm font-semibold text-black transition hover:bg-emerald-300"
            >
              Hablar por WhatsApp
            </a>
            <Link
              href={buildContactLink("ops", { utm_campaign: "hero" })}
              className="rounded-full border border-white/20 px-6 py-3 text-center text-sm font-semibold text-white/80 transition hover:border-cyan-300/60"
            >
              Reservar llamada
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-12 w-full max-w-6xl">
        <p className="text-xs uppercase tracking-[0.35em] text-cyan-200/80">
          n8n Ops (producto)
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-white md:text-3xl">
          Packs por flujos, con complejidad definida
        </h2>
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {opsPacks.map((pack) => {
            const whatsappLink = buildWhatsappUtmLink(
              "ops",
              pack.campaign,
              `Quiero el ${pack.name} de n8n Ops.`
            );
            const contactLink = buildContactLink("ops", {
              utm_campaign: pack.campaign,
              utm_content: pack.name.toLowerCase().replace(/\s+/g, "_"),
            });

            return (
              <article
                key={pack.name}
                className="flex h-full flex-col rounded-3xl border border-white/10 bg-black/60 p-6 shadow-xl"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-white">
                    {pack.name}
                  </h3>
                  <span className="rounded-full border border-cyan-300/30 bg-cyan-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200">
                    {pack.cadence}
                  </span>
                </div>
                <p className="mt-3 text-lg font-semibold text-emerald-200">
                  {pack.price}
                </p>
                <p className="mt-2 text-xs text-slate-400">
                  Rango orientativo según alcance, integraciones y complejidad.
                </p>
                <p className="mt-2 text-xs text-slate-400">{pack.priceNote}</p>

                <div className="mt-5 space-y-4 text-sm text-slate-200">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200/70">
                      Qué incluye
                    </p>
                    <ul className="mt-2 space-y-2">
                      {pack.includes.map((item) => (
                        <li key={item} className="flex gap-2">
                          <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-300" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-rose-200/80">
                      Qué NO incluye
                    </p>
                    <ul className="mt-2 space-y-2">
                      {pack.excludes.map((item) => (
                        <li key={item} className="flex gap-2">
                          <span className="mt-1 h-1.5 w-1.5 rounded-full bg-rose-300" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200/70">
                      Requisitos
                    </p>
                    <ul className="mt-2 space-y-2">
                      {pack.requirements.map((item) => (
                        <li key={item} className="flex gap-2">
                          <span className="mt-1 h-1.5 w-1.5 rounded-full bg-cyan-300" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-5 rounded-2xl border border-white/10 bg-black/70 px-4 py-3 text-xs text-slate-300">
                  <p>
                    <span className="font-semibold text-white">Revisiones:</span>{" "}
                    {pack.revisions}
                  </p>
                  <p className="mt-2">
                    <span className="font-semibold text-white">Plazo:</span>{" "}
                    {pack.timeline}
                  </p>
                </div>

                <div className="mt-6 flex flex-col gap-3" data-fab-avoid>
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-emerald-400 px-5 py-3 text-center text-sm font-semibold text-black transition hover:bg-emerald-300"
                  >
                    Hablar por WhatsApp
                  </a>
                  <Link
                    href={contactLink}
                    className="rounded-full border border-white/20 px-5 py-3 text-center text-sm font-semibold text-white/80 transition hover:border-cyan-300/60"
                  >
                    Solicitar propuesta
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="mx-auto mt-16 w-full max-w-6xl">
        <div className="rounded-3xl border border-cyan-300/30 bg-black/70 p-6 shadow-xl">
          <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/80">
            Super Pack
          </p>
          <h3 className="mt-3 text-2xl font-semibold text-white">
            Video + Doblaje + Ops + Bot (todo incluido)
          </h3>
          <p className="mt-2 text-sm text-slate-300">
            8 videos/mes (≤45s, 2 formatos) + 2 flujos n8n/mes + 1 bot (≤15
            intents + handoff) + 2 doblajes/mes (2 idiomas). SLA 24-48h hábiles.
          </p>
          <p className="mt-4 text-lg font-semibold text-emerald-200">
            Inversión estimada: €2,499–€4,500 / mes
          </p>
          <p className="mt-2 text-xs text-slate-400">
            Rango orientativo según alcance, volumen y complejidad.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row" data-fab-avoid>
            <a
              href={buildWhatsappUtmLink(
                "superpack",
                "ops",
                "Quiero el Super Pack."
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-emerald-400 px-6 py-3 text-center text-sm font-semibold text-black transition hover:bg-emerald-300"
            >
              Hablar por WhatsApp
            </a>
            <Link
              href={buildContactLink("superpack", { utm_campaign: "ops" })}
              className="rounded-full border border-white/20 px-6 py-3 text-center text-sm font-semibold text-white/80 transition hover:border-cyan-300/60"
            >
              Solicitar propuesta
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
