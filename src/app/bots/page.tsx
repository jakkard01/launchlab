import type { Metadata } from "next";
import Link from "next/link";
import { buildContactLink, buildWhatsappLink, siteUrl } from "../../lib/site";

export const metadata: Metadata = {
  title: "Bots / Chatbot",
  description:
    "Bots web + WhatsApp Cloud API con alcance definido, handoff y analitica basica.",
  alternates: {
    canonical: `${siteUrl}/bots`,
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

const botPacks = [
  {
    name: "Bot Starter",
    cadence: "Web widget",
    price: "Desde €650-€1,200",
    campaign: "starter",
    includes: [
      "Web widget embebible",
      "Hasta 8 intents",
      "Handoff a humano",
      "Analitica basica",
    ],
    excludes: [
      "WhatsApp Cloud API",
      "Integraciones complejas",
      "Canales extra",
    ],
    requirements: [
      "FAQs/KB base",
      "Tonality + brand assets",
      "Owner para validacion",
    ],
    revisions: "2 rondas de ajustes en intents.",
    timeline: "1-2 semanas.",
    priceNote: "Hasta 8 intents. Web widget only.",
  },
  {
    name: "Bot Growth",
    cadence: "Web + WhatsApp Cloud API",
    price: "Desde €1,500-€3,000",
    campaign: "growth",
    includes: [
      "Web widget + WhatsApp Cloud API",
      "Hasta 15 intents",
      "Handoff + alertas",
      "Analitica basica",
    ],
    excludes: [
      "Canales adicionales",
      "Integraciones ERP/CRM custom",
      "Soporte 24/7",
    ],
    requirements: [
      "Acceso a WhatsApp Cloud API",
      "KB/FAQs estructuradas",
      "Aprobacion de flows",
    ],
    revisions: "2 rondas de ajustes en flows.",
    timeline: "2-3 semanas.",
    priceNote: "Hasta 15 intents. Canales extra bajo pedido.",
  },
  {
    name: "Bot Pro",
    cadence: "Multi-flow",
    price: "Desde €3,500-€7,000",
    campaign: "pro",
    includes: [
      "Flows multi-objetivo",
      "Handoff avanzado",
      "Dashboards y eventos",
      "Soporte prioritario",
    ],
    excludes: [
      "WhatsApp on-prem",
      "Integraciones sin API",
      "Mantenimiento ilimitado",
    ],
    requirements: [
      "Stakeholders disponibles",
      "Integraciones acordadas",
      "KPIs definidos",
    ],
    revisions: "3 rondas de ajustes.",
    timeline: "3-5 semanas.",
    priceNote: "WhatsApp Cloud API + web widget. Otros canales bajo pedido.",
  },
];

export default function BotsPage() {
  return (
    <main className="min-h-screen w-full px-4 pb-20 pt-28 sm:px-6 lg:px-8">
      <section className="mx-auto w-full max-w-6xl">
        <div className="rounded-[32px] border border-white/10 bg-black/65 p-8 shadow-2xl">
          <p className="text-xs uppercase tracking-[0.4em] text-cyan-200/80">
            Bots / Chatbot
          </p>
          <h1 className="mt-4 text-3xl font-semibold text-white md:text-4xl">
            Bots claros, con limites definidos
          </h1>
          <p className="mt-3 text-base text-slate-200 md:text-lg">
            Canales soportados: Web widget + WhatsApp Cloud API. Otros canales
            bajo pedido.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center" data-fab-avoid>
            <a
              href={buildWhatsappUtmLink(
                "bots",
                "hero",
                "Quiero info de bots/chatbot."
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-emerald-400 px-6 py-3 text-center text-sm font-semibold text-black transition hover:bg-emerald-300"
            >
              Hablar por WhatsApp
            </a>
            <Link
              href={buildContactLink("bots", { utm_campaign: "hero" })}
              className="rounded-full border border-white/20 px-6 py-3 text-center text-sm font-semibold text-white/80 transition hover:border-cyan-300/60"
            >
              Reservar llamada
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-12 w-full max-w-6xl">
        <p className="text-xs uppercase tracking-[0.35em] text-cyan-200/80">
          Bots (producto)
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-white md:text-3xl">
          Packs con alcance por intents y canales
        </h2>
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {botPacks.map((pack) => {
            const whatsappLink = buildWhatsappUtmLink(
              "bots",
              pack.campaign,
              `Quiero el ${pack.name}.`
            );
            const contactLink = buildContactLink("bots", {
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
                <p className="mt-2 text-xs text-slate-400">{pack.priceNote}</p>

                <div className="mt-5 space-y-4 text-sm text-slate-200">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200/70">
                      Que incluye
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
                      Que NO incluye
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
            intents + handoff) + 2 doblajes/mes (2 idiomas). SLA 24-48h habiles.
          </p>
          <p className="mt-4 text-lg font-semibold text-emerald-200">
            Desde €2,499 / mes
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row" data-fab-avoid>
            <a
              href={buildWhatsappUtmLink(
                "superpack",
                "bots",
                "Quiero el Super Pack."
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-emerald-400 px-6 py-3 text-center text-sm font-semibold text-black transition hover:bg-emerald-300"
            >
              WhatsApp: quiero el Super Pack
            </a>
            <Link
              href={buildContactLink("superpack", { utm_campaign: "bots" })}
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
