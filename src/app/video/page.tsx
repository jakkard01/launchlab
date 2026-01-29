import type { Metadata } from "next";
import Link from "next/link";
import { buildContactLink, buildWhatsappLink, siteUrl } from "../../lib/site";

export const metadata: Metadata = {
  title: "Video Packs y Doblaje",
  description:
    "Video packs mensuales y doblaje/subtitulos en cualquier idioma (demo EN + DE + ES).",
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

const videoPacks = [
  {
    name: "Pack Starter",
    cadence: "4 videos / mes",
    price: "Desde: consulta",
    campaign: "starter",
    includes: [
      "Guion ligero (hooks + CTA)",
      "Edicion vertical 9:16",
      "Subtitulos listos para publicar",
      "1 concepto base / mes",
    ],
    excludes: [
      "Automatizaciones n8n",
      "Grabacion presencial",
      "Licencias de pago",
    ],
    requirements: [
      "Brief de marca y objetivo",
      "Assets (logo, colores, ejemplos)",
      "Material base o referencias",
    ],
    revisions: "2 revisiones por video (microcambios).",
    timeline: "Entrega semanal (7-10 dias habiles).",
    priceNote:
      "Hasta 45s por video. 1 formato (9:16). Cambios de concepto cuentan como nueva pieza.",
  },
  {
    name: "Pack Growth",
    cadence: "8 videos / mes",
    price: "Desde: consulta",
    campaign: "growth",
    includes: [
      "Guion ligero (hooks + CTA)",
      "Edicion 9:16 + adaptacion 1:1",
      "Subtitulos pro",
      "1 concepto base / mes + variaciones",
      "Calendario editorial mensual",
    ],
    excludes: [
      "Automatizaciones n8n",
      "Regrabaciones completas",
      "Licencias de terceros",
    ],
    requirements: [
      "Brief comercial + propuesta de valor",
      "Assets y referencias",
      "Aprobacion rapida de guiones",
    ],
    revisions: "2 revisiones por video.",
    timeline: "Entrega semanal con buffer de urgencias.",
    priceNote:
      "Hasta 45s por video. 2 formatos (9:16 + 1:1).",
  },
  {
    name: "Pack Pro",
    cadence: "12-16 videos / mes",
    price: "Desde: consulta",
    campaign: "pro",
    includes: [
      "Guion completo + storyboard simple",
      "Edicion 9:16 + 1:1 + 16:9",
      "Subtitulos pro",
      "2 conceptos base / mes",
      "Variaciones A/B de hook/copy",
    ],
    excludes: [
      "Automatizaciones n8n",
      "Regrabaciones fuera de scope",
      "Licencias premium",
    ],
    requirements: [
      "Brief completo + KPIs",
      "Assets actualizados",
      "Feedback consolidado por ronda",
    ],
    revisions: "2 revisiones por video (cambios de concepto = nueva pieza).",
    timeline: "Produccion continua con slots reservados.",
    priceNote:
      "Hasta 45s por video. 3 formatos (9:16 + 1:1 + 16:9).",
  },
];

const dubbingProducts = [
  {
    name: "1 video / 2 idiomas",
    price: "Desde: consulta",
    campaign: "one_video",
    includes: [
      "Voiceover natural",
      "Subtitulos pro",
      "2 idiomas incluidos",
    ],
    excludes: [
      "Lip-sync avanzado",
      "Traducciones legales/especializadas",
    ],
    requirements: [
      "Video master sin cortes",
      "Guion o transcripcion",
      "Idioma origen definido",
    ],
    revisions: "1 pase de correccion de timing/texto.",
    timeline: "48-72h habiles.",
    priceNote:
      "Hasta 2 minutos por video. Lip-sync basico solo talking head.",
  },
  {
    name: "Batch 5 videos / 2 idiomas",
    price: "Desde: consulta",
    campaign: "batch",
    includes: [
      "Voiceover + subtitulos pro",
      "QA por lote",
      "Entrega organizada por plataforma",
    ],
    excludes: [
      "Lip-sync avanzado",
      "Edicion creativa adicional",
    ],
    requirements: [
      "5 videos finalizados",
      "Transcripciones limpias",
      "Checklist de naming",
    ],
    revisions: "1 pase de correcciones por lote.",
    timeline: "5-7 dias habiles.",
    priceNote:
      "Hasta 2 minutos por video. 2 idiomas incluidos.",
  },
];

export default function VideoPage() {
  return (
    <main className="min-h-screen w-full px-4 pb-20 pt-28 sm:px-6 lg:px-8">
      <section className="mx-auto w-full max-w-6xl">
        <div className="rounded-[32px] border border-white/10 bg-black/65 p-8 shadow-2xl">
          <p className="text-xs uppercase tracking-[0.4em] text-cyan-200/80">
            Video Packs
          </p>
          <h1 className="mt-4 text-3xl font-semibold text-white md:text-4xl">
            Produccion mensual + doblaje en cualquier idioma
          </h1>
          <p className="mt-3 text-base text-slate-200 md:text-lg">
            Video packs claros y doblaje/subtitulos con limites definidos.
            Cualquier idioma disponible (demos EN + DE + ES).
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center" data-fab-avoid>
            <a
              href={buildWhatsappUtmLink(
                "video_pack",
                "hero",
                "Quiero info de Video Packs."
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
        </div>
      </section>

      <section className="mx-auto mt-12 w-full max-w-6xl">
        <p className="text-xs uppercase tracking-[0.35em] text-cyan-200/80">
          Video Packs (mensual)
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-white md:text-3xl">
          Packs listos para vender, con limites claros
        </h2>
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {videoPacks.map((pack) => {
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

      <section id="doblaje" className="mx-auto mt-16 w-full max-w-6xl">
        <div className="rounded-[28px] border border-white/10 bg-black/60 p-6 md:p-10">
          <p className="text-xs uppercase tracking-[0.35em] text-cyan-200/80">
            Doblaje + Subtitulos
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-white md:text-3xl">
            Expande tu oferta a cualquier idioma (demo EN + DE)
          </h2>
          <p className="mt-3 text-sm text-slate-300">
            Voiceover + subtitulos listos para publicar. 2 idiomas incluidos por
            defecto. Idiomas extra disponibles como add-on. Demos EN + DE + ES.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {dubbingProducts.map((product) => (
              <article
                key={product.name}
                className="flex h-full flex-col rounded-2xl border border-white/10 bg-black/70 p-5"
              >
                <h3 className="text-lg font-semibold text-white">
                  {product.name}
                </h3>
                <p className="mt-2 text-base font-semibold text-emerald-200">
                  {product.price}
                </p>
                <p className="mt-2 text-xs text-slate-400">
                  {product.priceNote}
                </p>

                <div className="mt-4 space-y-4 text-sm text-slate-200">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200/70">
                      Que incluye
                    </p>
                    <ul className="mt-2 space-y-2">
                      {product.includes.map((item) => (
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
                      {product.excludes.map((item) => (
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
                      {product.requirements.map((item) => (
                        <li key={item} className="flex gap-2">
                          <span className="mt-1 h-1.5 w-1.5 rounded-full bg-cyan-300" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-4 rounded-xl border border-white/10 bg-black/70 px-3 py-2 text-xs text-slate-300">
                  <p>
                    <span className="font-semibold text-white">Revisiones:</span>{" "}
                    {product.revisions}
                  </p>
                  <p className="mt-2">
                    <span className="font-semibold text-white">Plazo:</span>{" "}
                    {product.timeline}
                  </p>
                </div>

                <a
                  href={buildWhatsappUtmLink(
                    "dubbing",
                    product.campaign,
                    "Quiero info de doblaje/subtitulos."
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 rounded-full bg-emerald-400 px-5 py-2 text-center text-xs font-semibold text-black transition hover:bg-emerald-300"
                  data-fab-avoid
                >
                  Hablar por WhatsApp
                </a>
              </article>
            ))}
          </div>

          <p className="mt-6 text-xs text-slate-400">
            Idiomas extra y lip-sync avanzado se cotizan aparte.
          </p>
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
            Desde: consulta
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row" data-fab-avoid>
            <a
              href={buildWhatsappUtmLink(
                "superpack",
                "video",
                "Quiero el Super Pack."
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-emerald-400 px-6 py-3 text-center text-sm font-semibold text-black transition hover:bg-emerald-300"
            >
              Hablar por WhatsApp
            </a>
            <Link
              href={buildContactLink("superpack", { utm_campaign: "video" })}
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
