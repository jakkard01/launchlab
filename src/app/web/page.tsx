import type { Metadata } from "next";
import Link from "next/link";
import { buildContactLink, buildWhatsappLink, siteUrl } from "../../lib/site";

export const metadata: Metadata = {
  title: "Páginas web",
  description:
    "Páginas web listas para vender: landing, ecommerce y negocios locales. Alcance y plazos definidos.",
  alternates: {
    canonical: `${siteUrl}/web`,
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

const webTiers = [
  {
    name: "Web Starter (Landing)",
    price: "Inversión estimada: €850–€1,400",
    campaign: "starter",
    summary: "1 página optimizada para conversión.",
    includes: [
      "1 página (secciones)",
      "Copywriting de venta + CTA + WhatsApp + formulario",
      "SEO básico (title/meta, sitemap, robots)",
      "Performance + mobile first",
    ],
    excludes: [
      "Dominio/hosting (se gestiona con coste externo + configuración)",
      "Fotos premium/licencias",
      "Automatizaciones avanzadas",
    ],
    requirements: [
      "Logo + colores + referencias",
      "Brief de oferta y objetivo",
      "Textos base o esquema",
    ],
    revisions: "1 ronda de cambios.",
    timeline: "5-7 días hábiles.",
    priceNote: "Hasta 6-8 secciones. Sin múltiples idiomas.",
  },
  {
    name: "Web Growth (Sitio)",
    price: "Inversión estimada: €1,800–€3,000",
    campaign: "growth",
    summary: "Sitio completo con 4-6 páginas.",
    includes: [
      "4-6 páginas (Inicio, Servicios, Sobre, Contacto, FAQ, Legal)",
      "2 rondas de cambios",
      "Integración Calendly/WhatsApp",
      "Medición esencial (GA4 + eventos clave)",
    ],
    excludes: [
      "Multilenguaje completo",
      "Integraciones enterprise",
      "Producción de contenido audiovisual",
      "Dominio/hosting (se gestiona con coste externo + configuración)",
    ],
    requirements: [
      "Brief y jerarquía de contenido",
      "Assets listos",
      "Accesos a Calendly/Analytics",
    ],
    revisions: "2 rondas de cambios.",
    timeline: "10-14 días hábiles.",
    priceNote: "Hasta 6 páginas. 1 idioma.",
  },
  {
    name: "Web Pro (Conversión)",
    price: "Inversión estimada: €3,500–€6,500",
    campaign: "pro",
    summary: "Sitio premium para conversión y captación.",
    includes: [
      "6-10 páginas",
      "Componentes premium (testimonios, casos, lead magnet)",
      "3 rondas de cambios",
      "A/B de CTA o 2 variantes de hero",
    ],
    excludes: [
      "Apps internas",
      "Integraciones complejas sin API",
      "SEO avanzado fuera de alcance",
      "Dominio/hosting (se gestiona con coste externo + configuración)",
    ],
    requirements: [
      "KPIs claros",
      "Contenido validado",
      "Stakeholder para feedback rápido",
    ],
    revisions: "3 rondas de cambios.",
    timeline: "2-3 semanas.",
    priceNote: "Hasta 10 páginas. 1 idioma.",
  },
];

const ecommerceAddon = {
  name: "Add-on Ecommerce",
  price: "Inversión estimada: €2,500–€6,000",
  campaign: "ecommerce",
  includes: [
    "Catálogo + carrito/checkout o pedido por WhatsApp",
    "Panel admin para productos",
    "Configuración básica de envíos/pagos",
  ],
  excludes: [
    "ERP/stock avanzado",
    "Migraciones masivas",
    "Catálogos con 1,000+ SKUs",
  ],
  requirements: [
    "Listado de productos en CSV",
    "Fotos/imágenes del cliente",
    "Pasarela de pago si aplica",
  ],
  revisions: "1 ronda de cambios en catálogo.",
  timeline: "2-4 semanas (según catálogo).",
  priceNote: "Hasta 100 productos en el setup inicial.",
};

export default function WebPage() {
  return (
    <main className="min-h-screen w-full px-4 pb-20 pt-28 sm:px-6 lg:px-8">
      <section className="mx-auto w-full max-w-6xl">
        <div className="rounded-[32px] border border-white/10 bg-black/65 p-8 shadow-2xl">
          <p className="text-xs uppercase tracking-[0.4em] text-cyan-200/80">
            Web / Páginas Web
          </p>
          <h1 className="mt-4 text-3xl font-semibold text-white md:text-4xl">
            Páginas web listas para vender (landing, ecommerce y negocios locales)
          </h1>
          <p className="mt-3 text-base text-slate-200 md:text-lg">
            Diseno premium + SEO base + velocidad + panel de edicion. Alcance y
            plazos definidos.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center" data-fab-avoid>
            <a
              href={buildWhatsappUtmLink(
                "web",
                "hero",
                "Quiero una página web."
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-emerald-400 px-6 py-3 text-center text-sm font-semibold text-black transition hover:bg-emerald-300"
            >
              Hablar por WhatsApp
            </a>
            <Link
              href={buildContactLink("web", { utm_campaign: "hero" })}
              className="rounded-full border border-white/20 px-6 py-3 text-center text-sm font-semibold text-white/80 transition hover:border-cyan-300/60"
            >
              Reservar llamada
            </Link>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {[
              "Landing, ecommerce y negocios locales",
              "SEO base + performance mobile",
              "Panel de edicion simple",
            ].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-white/10 bg-black/70 px-4 py-3 text-sm text-slate-200"
              >
                {item}
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-slate-400">
            Integraciones n8n disponibles como add-on (no incluidas en planes base).
          </p>
        </div>
      </section>

      <section className="mx-auto mt-12 w-full max-w-6xl">
        <div className="grid gap-6 rounded-3xl border border-white/10 bg-black/60 p-6 shadow-xl md:grid-cols-[1.1fr_0.9fr] md:items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-cyan-200/80">
              Video de venta
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-white md:text-3xl">
              Una web que convierte en menos de 2 minutos
            </h2>
            <p className="mt-3 text-sm text-slate-200 md:text-base">
              Mira el enfoque de narrativa, CTA y prueba social que usamos para
              vender. Es el mismo framework que aplicamos en cada plan Web.
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <a
                href={buildWhatsappUtmLink(
                  "web",
                  "video",
                  "Quiero una web con enfoque de conversion."
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-emerald-400 px-6 py-3 text-center text-sm font-semibold text-black transition hover:bg-emerald-300"
              >
                Hablar por WhatsApp
              </a>
              <Link
                href={buildContactLink("web", { utm_campaign: "video" })}
                className="rounded-full border border-white/20 px-6 py-3 text-center text-sm font-semibold text-white/80 transition hover:border-cyan-300/60"
              >
                Pedir demo
              </Link>
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-black/70 p-3">
            <video
              controls
              playsInline
              preload="metadata"
              poster="/video/video-poster.png"
              className="h-auto w-full rounded-xl"
            >
              <source src="/video/video.mp4" type="video/mp4" />
              <track
                kind="subtitles"
                src="/video/subs.es.vtt"
                srcLang="es"
                label="Español"
                default
              />
              Tu navegador no soporta la reproducción de video.
            </video>
            <div className="mt-3 flex flex-col gap-2 rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-xs text-slate-200">
              <p>No se pudo cargar el video.</p>
              <div className="flex flex-wrap gap-2">
                <Link
                  href="/demos"
                  className="rounded-full border border-white/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/80 transition hover:border-cyan-300/60"
                >
                  Ver ejemplos →
                </Link>
                <a
                  href={buildWhatsappUtmLink(
                    "web",
                    "video_fallback",
                    "Quiero ejemplos de video."
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-emerald-400 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-black transition hover:bg-emerald-300"
                >
                  Hablar por WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-12 w-full max-w-6xl">
        <p className="text-xs uppercase tracking-[0.35em] text-cyan-200/80">
          Planes Web
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-white md:text-3xl">
          Entregables claros por nivel
        </h2>
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {webTiers.map((tier) => {
            const whatsappLink = buildWhatsappUtmLink(
              "web",
              tier.campaign,
              `Quiero el ${tier.name}.`
            );
            const contactLink = buildContactLink("web", {
              utm_campaign: tier.campaign,
              utm_content: tier.name.toLowerCase().replace(/\s+/g, "_"),
            });
            return (
              <article
                key={tier.name}
                className="flex h-full flex-col rounded-3xl border border-white/10 bg-black/60 p-6 shadow-xl"
              >
                <div>
                  <h3 className="text-xl font-semibold text-white">
                    {tier.name}
                  </h3>
                  <p className="mt-2 text-sm text-slate-300">{tier.summary}</p>
                  <p className="mt-3 text-lg font-semibold text-emerald-200">
                    {tier.price}
                  </p>
                  <p className="mt-2 text-xs text-slate-400">
                    Precio orientativo. Confirmamos tras 10 min de briefing.
                  </p>
                  <p className="mt-2 text-xs text-slate-400">{tier.priceNote}</p>
                </div>

                <div className="mt-5 space-y-4 text-sm text-slate-200">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200/70">
                      Qué incluye
                    </p>
                    <ul className="mt-2 space-y-2">
                      {tier.includes.map((item) => (
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
                      {tier.excludes.map((item) => (
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
                      {tier.requirements.map((item) => (
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
                    {tier.revisions}
                  </p>
                  <p className="mt-2">
                    <span className="font-semibold text-white">Plazo:</span>{" "}
                    {tier.timeline}
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
        <p className="mt-6 text-xs text-slate-400">
          Cambios mayores (nueva estructura o objetivo) se consideran nuevo
          alcance y se cotizan aparte.
        </p>
      </section>

      <section className="mx-auto mt-12 w-full max-w-6xl">
        <div className="rounded-3xl border border-white/10 bg-black/60 p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/80">
            Add-on Ecommerce
          </p>
          <h3 className="mt-3 text-2xl font-semibold text-white">
            Catálogo + carrito o pedido por WhatsApp
          </h3>
          <p className="mt-2 text-sm text-slate-300">
            Si necesitas e-commerce, agregamos panel de productos y checkout o
            pedido directo por WhatsApp.
          </p>
          <p className="mt-3 text-lg font-semibold text-emerald-200">
            {ecommerceAddon.price}
          </p>
          <p className="mt-1 text-xs text-slate-400">
            Precio orientativo. Confirmamos tras 10 min de briefing.
          </p>
          <p className="mt-2 text-xs text-slate-400">
            {ecommerceAddon.priceNote}
          </p>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200/70">
                Qué incluye
              </p>
              <ul className="mt-2 space-y-2 text-sm text-slate-200">
                {ecommerceAddon.includes.map((item) => (
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
              <ul className="mt-2 space-y-2 text-sm text-slate-200">
                {ecommerceAddon.excludes.map((item) => (
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
              <ul className="mt-2 space-y-2 text-sm text-slate-200">
                {ecommerceAddon.requirements.map((item) => (
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
              {ecommerceAddon.revisions}
            </p>
            <p className="mt-2">
              <span className="font-semibold text-white">Plazo:</span>{" "}
              {ecommerceAddon.timeline}
            </p>
          </div>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row" data-fab-avoid>
            <a
              href={buildWhatsappUtmLink(
                "web",
                "ecommerce",
                "Quiero el add-on ecommerce."
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-emerald-400 px-6 py-3 text-center text-sm font-semibold text-black transition hover:bg-emerald-300"
            >
              Hablar por WhatsApp
            </a>
            <Link
              href={buildContactLink("web", { utm_campaign: "ecommerce" })}
              className="rounded-full border border-white/20 px-6 py-3 text-center text-sm font-semibold text-white/80 transition hover:border-cyan-300/60"
            >
              Solicitar propuesta
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-12 w-full max-w-6xl">
        <div className="rounded-3xl border border-white/10 bg-black/60 p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/80">
            Proceso
          </p>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {["Brief", "Diseno", "Entrega"].map((step, index) => (
              <div
                key={step}
                className="rounded-2xl border border-white/10 bg-black/70 p-4"
              >
                <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/70">
                  Paso {index + 1}
                </p>
                <p className="mt-2 text-base font-semibold text-white">
                  {step}
                </p>
                <p className="mt-2 text-sm text-slate-300">
                  {step === "Brief"
                    ? "Definimos objetivos, contenido y alcance."
                    : step === "Diseno"
                    ? "Diseño UI/UX y copy con revisiones acordadas."
                    : "Entrega con handoff, QA y checklist."}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row" data-fab-avoid>
            <a
              href={buildWhatsappUtmLink(
                "web",
                "process",
                "Quiero iniciar un proyecto web."
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-emerald-400 px-6 py-3 text-center text-sm font-semibold text-black transition hover:bg-emerald-300"
            >
              Hablar por WhatsApp
            </a>
            <Link
              href="/alcance"
              className="rounded-full border border-white/20 px-6 py-3 text-center text-sm font-semibold text-white/80 transition hover:border-cyan-300/60"
            >
              Ver límites y proceso
            </Link>
            <a
              href="/docs/alcance-web.txt"
              download
              className="rounded-full border border-white/20 px-6 py-3 text-center text-sm font-semibold text-white/80 transition hover:border-cyan-300/60"
            >
              Descargar Documento de Alcance
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
