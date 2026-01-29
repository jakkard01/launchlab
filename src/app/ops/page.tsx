import type { Metadata } from "next";
import Link from "next/link";
import { buildContactLink, buildWhatsappLink, siteUrl } from "../../lib/site";

export const metadata: Metadata = {
  title: "n8n Ops",
  description:
    "Automatizaciones n8n para equipos que quieren operar sin friccion: flujos, CRM, alertas y dashboards.",
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
    plazo: "Entrega en 5-7 dias",
    campaign: "starter",
    price: "Desde $249-$699",
    includes: [
      "Mapeo del proceso + requisitos",
      "1 flujo n8n con QA",
      "Documentacion y video corto",
    ],
  },
  {
    name: "Ops Growth",
    cadence: "3-5 flujos",
    plazo: "2-3 semanas",
    campaign: "growth",
    price: "Desde $899-$2499",
    includes: [
      "Orquestacion de flujos criticos",
      "Integracion CRM + alertas",
      "Monitoreo basico + handoff",
      "Soporte post-lanzamiento",
    ],
  },
  {
    name: "Ops Pro",
    cadence: "Multi-sistema",
    plazo: "4-6 semanas",
    campaign: "pro",
    price: "Desde $2,999",
    includes: [
      "Arquitectura n8n escalable",
      "Dashboards operativos",
      "Automatizaciones multi-equipo",
      "Soporte prioritario",
    ],
  },
];

export default function OpsPage() {
  return (
    <main className="min-h-screen w-full px-4 pb-[calc(env(safe-area-inset-bottom)+140px)] pt-28 sm:px-6 lg:px-8">
      <section className="mx-auto w-full max-w-6xl">
        <div className="rounded-[32px] border border-white/10 bg-black/65 p-8 shadow-2xl">
          <p className="text-xs uppercase tracking-[0.4em] text-cyan-200/80">
            n8n Ops
          </p>
          <h1 className="mt-4 text-3xl font-semibold text-white md:text-4xl">
            Automatizaciones listas para operar sin friccion
          </h1>
          <p className="mt-3 text-base text-slate-200 md:text-lg">
            Diseñamos y operamos flujos n8n para ventas, soporte y operaciones.
            Menos tareas manuales, mas foco en cerrar y escalar.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
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
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {[
              "Flujos n8n listos para vender",
              "Alertas y handoff automatico",
              "Dashboards + visibilidad operativa",
            ].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-white/10 bg-black/70 px-4 py-3 text-sm text-slate-200"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto mt-12 w-full max-w-6xl">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-cyan-200/80">
              Planes Ops
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-white md:text-3xl">
              n8n Ops para crecer sin cuellos de botella
            </h2>
            <p className="mt-2 text-sm text-slate-300">
              Implementaciones modulares, listas para operar y escalar.
            </p>
          </div>
        </div>

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
                className="group relative flex h-full flex-col rounded-3xl border border-white/10 bg-black/60 p-6 shadow-xl transition hover:border-cyan-300/40 hover:bg-black/70"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-white">
                    {pack.name}
                  </h3>
                  <span className="rounded-full border border-cyan-300/30 bg-cyan-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200">
                    {pack.cadence}
                  </span>
                </div>
                <p className="mt-3 text-base font-semibold text-emerald-200">
                  {pack.price}
                </p>

                <p className="mt-4 text-sm text-slate-300">Que incluye</p>
                <ul className="mt-3 space-y-3 text-sm text-slate-200">
                  {pack.includes.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-300" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 rounded-2xl border border-white/10 bg-black/70 px-4 py-3 text-xs text-slate-300">
                  <span className="font-semibold text-white">Plazo:</span>{" "}
                  {pack.plazo}
                </div>

                <div className="mt-6 flex flex-col gap-3">
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-emerald-400 px-5 py-3 text-center text-sm font-semibold text-black transition hover:bg-emerald-300"
                  >
                    WhatsApp: quiero este pack
                  </a>
                  <Link
                    href={contactLink}
                    className="rounded-full border border-white/20 px-5 py-3 text-center text-sm font-semibold text-white/80 transition hover:border-cyan-300/60"
                  >
                    Reservar llamada
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
        <div className="mt-8 rounded-3xl border border-cyan-300/30 bg-black/70 p-6 shadow-xl">
          <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/80">
            Super Pack
          </p>
          <h3 className="mt-3 text-2xl font-semibold text-white">
            Video + Doblaje + Ops + Bot
          </h3>
          <p className="mt-2 text-sm text-slate-300">
            Bundle premium para equipos que quieren crecimiento full-stack.
          </p>
          <p className="mt-4 text-lg font-semibold text-emerald-200">
            Desde $2,499
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
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
              WhatsApp: quiero el Super Pack
            </a>
            <Link
              href={buildContactLink("superpack", { utm_campaign: "ops" })}
              className="rounded-full border border-white/20 px-6 py-3 text-center text-sm font-semibold text-white/80 transition hover:border-cyan-300/60"
            >
              Reservar llamada
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
