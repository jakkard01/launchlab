import type { Metadata } from "next";
import Link from "next/link";
import { buildContactLink, buildWhatsappLink, siteUrl } from "../../lib/site";

export const metadata: Metadata = {
  title: "Video Packs",
  description:
    "Video packs mensuales con edicion premium y automatizaciones n8n para publicar y escalar.",
  alternates: {
    canonical: `${siteUrl}/video`,
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

const packs = [
  {
    name: "Pack Starter",
    cadence: "4 videos / mes",
    plazo: "Entrega en 7-10 dias habiles",
    campaign: "starter",
    includes: [
      "Guion corto con hook + CTA",
      "Edicion vertical 9:16 con subtitulos",
      "1 ronda de ajustes",
      "Version lista para Reels/TikTok/Shorts",
    ],
  },
  {
    name: "Pack Growth",
    cadence: "8 videos / mes",
    plazo: "Entrega semanal + buffer de urgencias",
    campaign: "growth",
    includes: [
      "Guiones optimizados por oferta",
      "Edicion 9:16 + adaptacion 1:1",
      "2 rondas de ajustes",
      "Calendario y automatizacion n8n",
      "Report de rendimiento mensual",
    ],
  },
  {
    name: "Pack Pro",
    cadence: "12-16 videos / mes",
    plazo: "Produccion continua con slots reservados",
    campaign: "pro",
    includes: [
      "Linea creativa completa + storyboard",
      "Edicion multi-formato (9:16, 1:1, 16:9)",
      "Doble CTA y variaciones A/B",
      "Automatizaciones n8n + bots para leads",
      "Soporte prioritario",
    ],
  },
];

export default function VideoPage() {
  return (
    <main className="min-h-screen w-full px-4 pb-20 pt-28 sm:px-6 lg:px-8">
      <section className="mx-auto w-full max-w-6xl">
        <div className="rounded-[32px] border border-white/10 bg-black/65 p-8 shadow-2xl">
          <p className="text-xs uppercase tracking-[0.4em] text-cyan-200/80">
            Nueva linea premium
          </p>
          <h1 className="mt-4 text-3xl font-semibold text-white md:text-4xl">
            Video Packs + n8n/Automatizaciones
          </h1>
          <p className="mt-3 text-base text-slate-200 md:text-lg">
            Produccion mensual lista para vender: videos de alto impacto y
            automatizaciones para publicar y convertir sin friccion.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href={buildWhatsappUtmLink(
                "video_pack",
                "hero",
                "Quiero informacion sobre Video Packs."
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-emerald-400 px-6 py-3 text-center text-sm font-semibold text-black transition hover:bg-emerald-300"
            >
              Hablar por WhatsApp
            </a>
            <Link
              href={buildContactLink("video_pack", { utm_campaign: "hero" })}
              className="rounded-full border border-white/20 px-6 py-3 text-center text-sm font-semibold text-white/80 transition hover:border-cyan-300/60"
            >
              Reservar llamada
            </Link>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {[
              "Brief creativo + guiones accionables",
              "Edicion premium + subtitulos",
              "Delivery con automatizaciones n8n",
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
              Video Packs
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-white md:text-3xl">
              Packs mensuales listos para crecer
            </h2>
            <p className="mt-2 text-sm text-slate-300">
              Elige el ritmo y nosotros producimos, editamos y entregamos con
              calidad premium.
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {packs.map((pack) => {
            const whatsappLink = buildWhatsappUtmLink(
              "video_pack",
              pack.campaign,
              `Quiero el ${pack.name}.`
            );
            const contactLink = buildContactLink("video_pack", {
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
      </section>

    </main>
  );
}
