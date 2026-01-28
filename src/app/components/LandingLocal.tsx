"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { services } from "../content/catalog";
import { portfolio } from "../content/portfolio";
import { showcase } from "../content/showcase";
import EmbeddedBot from "./EmbeddedBot";

interface LandingLocalProps {
  onShowVideo: () => void;
  heroRef: React.RefObject<HTMLDivElement>;
  onScrollToHero: () => void;
}

const quickAccess = [
  {
    titulo: "Servicios",
    descripcion: "Soluciones IA y automatizaciones para negocio.",
    icono: "/favicon.ico",
    link: "/#servicios",
  },
  {
    titulo: "Demos",
    descripcion: "Demos funcionales para validar rápido.",
    icono: "/favicon.ico",
    link: "/#demos",
  },
  {
    titulo: "Paquetes",
    descripcion: "Planes claros con alcance y entregables.",
    icono: "/favicon.ico",
    link: "/#paquetes",
  },
];

const trustItems = [
  "Demo funcional en 7 días",
  "Integraciones: WhatsApp/Web/CRM",
  "Soporte 30 días",
  "Stack: Next.js + TS",
  "SSR + SEO listo",
  "Rate limit en /api/contact",
];

const conversionPath = [
  {
    step: "Paso 1",
    title: "Reservar llamada",
    description: "15 minutos para aterrizar objetivos.",
    href: "/contact?source=home_path",
  },
  {
    step: "Paso 2",
    title: "Ver demo",
    description: "Bot o Business OS en acción.",
    href: "/demos",
  },
  {
    step: "Paso 3",
    title: "Ver paquetes",
    description: "Precios desde y alcance claro.",
    href: "/pricing",
  },
];

const processSteps = [
  {
    titulo: "Diagnóstico (15 min)",
    descripcion: "Alineamos objetivos, stack y fricciones en una llamada breve.",
  },
  {
    titulo: "Build (demo en días)",
    descripcion: "Construimos un demo funcional para validar flujos y valor.",
  },
  {
    titulo: "Deploy + iteración",
    descripcion: "Lanzamos, medimos y optimizamos con entregables claros.",
  },
];

const deliveryItems = [
  "Landing o sección de conversión",
  "Tracking básico + eventos clave",
  "Demo de bot o flujo automatizado",
  "Documentación y handoff al equipo",
];

const faqs = [
  {
    q: "¿Qué tipo de empresas atienden?",
    a: "Startups, pymes y equipos enterprise que necesitan IA aplicada.",
  },
  {
    q: "¿Cuánto tarda un proyecto?",
    a: "Entre 2 y 6 semanas según alcance y validaciones.",
  },
  {
    q: "¿Ofrecen soporte continuo?",
    a: "Sí, con planes de mantenimiento y evolución trimestral.",
  },
  {
    q: "¿Pueden integrarse con mi stack actual?",
    a: "Sí, trabajamos con APIs, CRMs y herramientas existentes.",
  },
];

const pricingPlans = [
  {
    slug: "basico",
    title: "Plan Básico",
    price: "Desde €900",
    who: "Teams que necesitan un primer sistema IA operativo.",
    includes: ["Diagnóstico + alcance", "1 flujo automatizado", "Demo funcional"],
    cta: "Reservar Básico",
  },
  {
    slug: "growth",
    title: "Plan Growth",
    price: "Desde €1.500",
    who: "Equipos comerciales que buscan convertir más rápido.",
    includes: ["Bot + integraciones", "Training inicial", "Soporte 30 días"],
    cta: "Reservar Growth",
    featured: true,
  },
  {
    slug: "pro",
    title: "Plan Pro",
    price: "Desde €3.000",
    who: "Operaciones que necesitan IA conectada a procesos core.",
    includes: ["Mapa de procesos", "Automatizaciones multi-stack", "Iteraciones por sprint"],
    cta: "Reservar Pro",
  },
];

const whatsappNumber = "911 52 87 53";
const whatsappLink =
  "https://wa.me/34911528753?text=Hola%2C%20vengo%20desde%20poweredbyia.com.%20Quiero%20info%20de%20servicios%20y%20una%20demo.";
const contactEmail = "poweredbyiaoficial@gmail.com";

export default function LandingLocal({ onShowVideo, heroRef, onScrollToHero }: LandingLocalProps) {
  const [imgError, setImgError] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const demoHighlights = showcase
    .filter((item) => item.status === "demo" || item.status === "live")
    .slice(0, 3);
  const portfolioHighlights = portfolio.slice(0, 2);

  return (
    <main className="relative min-h-screen w-full flex flex-col items-center px-4 pb-36 pt-28 sm:px-6 lg:px-8 md:pb-20">
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-black/45"
        aria-hidden="true"
      />
      {/* Modal de imagen grande */}
      {showModal && !imgError && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm" onClick={() => setShowModal(false)}>
          <div className="relative" onClick={e => e.stopPropagation()}>
            <Image
              src="/imagenes/perfil/mifoto.jpg"
              alt="Foto de perfil grande"
              width={320}
              height={320}
              className="rounded-full w-80 h-80 ring-8 ring-purple-500 object-cover shadow-2xl"
              priority
            />
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 bg-black/60 text-white rounded-full p-2 hover:bg-black/80 focus:outline-none focus:ring-2 focus:ring-purple-400"
              aria-label="Cerrar imagen"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
        </div>
      )}
      {/* Hero */}
      <section
        id="inicio"
        ref={heroRef}
        className="w-full max-w-5xl mx-auto rounded-3xl border border-white/10 bg-black/65 px-6 py-10 shadow-2xl backdrop-blur"
      >
        <div className="grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-cyan-300/80">
              Sistemas IA aplicados
            </p>
            <h1 className="mt-4 text-4xl font-semibold leading-tight text-white md:text-5xl">
              Diseñamos sistemas IA listos para vender, operar y escalar.
            </h1>
            <p className="mt-4 text-base text-slate-200 md:text-lg">
              Para equipos que necesitan automatizar procesos, potenciar ventas y lanzar productos digitales
              con foco en resultados medibles.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <Link
                href="/contact?source=home_hero"
                className="rounded-full bg-cyan-400 px-6 py-3 text-sm font-semibold text-black transition hover:bg-cyan-300"
                aria-label="Reservar llamada"
              >
                Reservar llamada
              </Link>
              <Link
                href="/demos/bot"
                className="rounded-full border border-cyan-300/60 px-6 py-3 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-400 hover:text-black"
                aria-label="Ver demo del bot"
              >
                Ver demo del bot
              </Link>
            </div>
            <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
              <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/80">
                Proof inmediato
              </p>
              <div className="mt-3 grid gap-2 text-sm text-slate-200 sm:grid-cols-2">
                {trustItems.map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" aria-hidden="true" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {conversionPath.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="rounded-2xl border border-white/10 bg-black/50 px-4 py-3 text-left transition hover:border-cyan-300/40"
                  aria-label={item.title}
                >
                  <p className="text-xs font-semibold text-cyan-200">{item.step}</p>
                  <p className="mt-1 text-sm font-semibold text-white">{item.title}</p>
                  <p className="mt-1 text-xs text-slate-300">{item.description}</p>
                </Link>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-center gap-4">
            {!imgError && (
              <button
                onClick={() => setShowModal(true)}
                className="focus:outline-none focus:ring-2 focus:ring-cyan-400 rounded-full"
                aria-label="Ver foto de perfil en grande"
                tabIndex={0}
              >
                <Image
                  src="/imagenes/perfil/mifoto.jpg"
                  alt="Foto de perfil"
                  width={160}
                  height={160}
                  className="rounded-full w-32 h-32 ring-4 ring-cyan-400/60 mx-auto object-cover"
                  onError={() => setImgError(true)}
                  priority
                />
              </button>
            )}
            <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-sm text-slate-200">
              <p className="font-semibold text-white">Powered by IA</p>
              <p className="mt-1 text-slate-300">
                Sistemas, demos funcionales y servicios premium.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Accesos rápidos */}
      <section className="mt-12 w-full max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {quickAccess.map((a) => (
          <Link
            key={a.titulo}
            href={a.link}
            className="flex flex-col items-start gap-3 rounded-2xl border border-white/10 bg-black/60 p-6 shadow-lg transition hover:border-cyan-300/40 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          >
            <Image src={a.icono} alt={a.titulo} width={36} height={36} className="opacity-80" loading="lazy" />
            <h3 className="text-lg font-semibold text-white">{a.titulo}</h3>
            <p className="text-sm text-slate-300">{a.descripcion}</p>
          </Link>
        ))}
      </section>

      <section id="servicios" className="mt-20 w-full max-w-6xl">
        <div className="rounded-3xl border border-white/10 bg-black/60 p-8 shadow-xl">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-cyan-300/80">Servicios</p>
              <h2 className="mt-3 text-3xl font-semibold text-white">Soluciones IA de alto impacto</h2>
            </div>
            <Link
              href="/services"
              className="rounded-full border border-white/20 px-5 py-2 text-sm font-semibold text-white/80 transition hover:border-cyan-300/60"
              aria-label="Ver detalle completo de servicios"
            >
              Ver detalle completo
            </Link>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <div
                key={service.slug}
                className={`rounded-2xl border border-white/10 p-6 shadow-lg ${
                  index < 2 ? "bg-black/70" : "bg-black/45"
                }`}
              >
                <h3 className="text-lg font-semibold text-white">{service.title}</h3>
                <p className="mt-3 text-sm text-slate-300">{service.summary}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="demos" className="mt-20 w-full max-w-6xl">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-xl">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-cyan-300/80">Demos</p>
              <h2 className="mt-3 text-3xl font-semibold text-white">Showcase listo para activar</h2>
            </div>
            <Link
              href="/demos"
              className="rounded-full border border-white/20 px-5 py-2 text-sm font-semibold text-white/80 transition hover:border-cyan-300/60"
              aria-label="Ver todas las demos"
            >
              Ver todas las demos
            </Link>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {demoHighlights.map((item, index) => (
              <Link
                key={item.slug}
                href={item.ctaHref}
                className={`rounded-2xl border border-white/10 p-6 shadow-lg transition hover:border-cyan-300/40 ${
                  index === 0 ? "bg-black/70" : "bg-black/45"
                }`}
              >
                <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-3 text-sm text-slate-300">{item.summary}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {item.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/10 bg-black/50 px-3 py-1 text-xs font-semibold text-slate-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="paquetes" className="mt-20 w-full max-w-6xl">
        <div className="rounded-3xl border border-white/10 bg-black/60 p-8 shadow-xl">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-cyan-300/80">Paquetes</p>
              <h2 className="mt-3 text-3xl font-semibold text-white">Planes listos para facturar</h2>
            </div>
            <Link
              href="/pricing"
              className="rounded-full border border-white/20 px-5 py-2 text-sm font-semibold text-white/80 transition hover:border-cyan-300/60"
              aria-label="Ver todos los paquetes"
            >
              Ver todos los paquetes
            </Link>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {pricingPlans.map((plan) => (
              <div
                key={plan.title}
                className={`rounded-2xl border p-6 shadow-lg ${
                  plan.featured
                    ? "border-cyan-400/40 bg-black/75"
                    : "border-white/10 bg-black/50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-white">{plan.title}</h3>
                  <span className="text-xs uppercase tracking-[0.2em] text-cyan-200/80">
                    {plan.price}
                  </span>
                </div>
                <p className="mt-3 text-sm text-slate-300">Para quién: {plan.who}</p>
                <ul className="mt-4 space-y-2 text-sm text-slate-300">
                  {plan.includes.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-xs text-slate-400">Precio final según alcance.</p>
                <Link
                  href={`/contact?source=home&plan=${plan.slug}`}
                  className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-cyan-400 px-5 py-2 text-sm font-semibold text-black transition hover:bg-cyan-300"
                  aria-label={`Reservar llamada para ${plan.title}`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="portfolio" className="mt-20 w-full max-w-6xl">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-xl">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-cyan-300/80">Portfolio</p>
              <h2 className="mt-3 text-3xl font-semibold text-white">Casos demo para inspirar</h2>
            </div>
            <Link
              href="/portfolio"
              className="rounded-full border border-white/20 px-5 py-2 text-sm font-semibold text-white/80 transition hover:border-cyan-300/60"
              aria-label="Ver portfolio completo"
            >
              Ver portfolio
            </Link>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {portfolioHighlights.map((item, index) => (
              <Link
                key={item.slug}
                href={`/portfolio/${item.slug}`}
                className={`rounded-2xl border border-white/10 p-6 shadow-lg transition hover:border-cyan-300/40 ${
                  index === 0 ? "bg-black/70" : "bg-black/45"
                }`}
              >
                <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-3 text-sm text-slate-300">{item.summary}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-20 w-full max-w-6xl">
        <div className="rounded-3xl border border-white/10 bg-black/60 p-8 shadow-xl">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-cyan-300/80">Cómo trabajamos</p>
              <h2 className="mt-3 text-3xl font-semibold text-white">De diagnóstico a demo en días</h2>
            </div>
            <p className="text-sm text-slate-300">
              Sprint inicial para validar, luego iteramos con entregables claros.
            </p>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {processSteps.map((step, index) => (
              <div key={step.titulo} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <p className="text-xs font-semibold text-cyan-200">Paso 0{index + 1}</p>
                <h3 className="mt-2 text-base font-semibold text-white">{step.titulo}</h3>
                <p className="mt-2 text-sm text-slate-300">{step.descripcion}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-2xl border border-white/10 bg-black/55 p-6">
              <h3 className="text-lg font-semibold text-white">Qué entregamos</h3>
              <ul className="mt-4 space-y-2 text-sm text-slate-300">
                {deliveryItems.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-cyan-400/30 bg-black/70 p-6">
              <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/80">
                Riesgo controlado
              </p>
              <h3 className="mt-2 text-lg font-semibold text-white">
                Demo first, luego escalamos
              </h3>
              <p className="mt-3 text-sm text-slate-300">
                Arrancamos con un sprint corto para validar el flujo antes de invertir en un despliegue mayor.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="cursos" className="mt-20 w-full max-w-6xl">
        <p className="text-xs uppercase tracking-[0.4em] text-cyan-300/80">Cursos</p>
        <h2 className="mt-3 text-3xl font-semibold text-white">Formación práctica para equipos</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-black/60 p-6">
            <h3 className="text-lg font-semibold text-white">IA aplicada para negocio</h3>
            <p className="mt-3 text-sm text-slate-300">
              Capacitación para equipos que necesitan estrategia, datos y ejecución.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-black/60 p-6">
            <h3 className="text-lg font-semibold text-white">Automatización con IA</h3>
            <p className="mt-3 text-sm text-slate-300">
              Flujos reales con n8n, integraciones y operación continua.
            </p>
          </div>
        </div>
        <div className="mt-6">
          <Link
            href="/courses"
            className="inline-flex rounded-full border border-white/20 px-5 py-2 text-sm font-semibold text-white/80 transition hover:border-cyan-300/60"
          >
            Ver programas
          </Link>
        </div>
      </section>


      <section id="bot" className="mt-20 w-full max-w-5xl">
        <div className="rounded-3xl border border-white/10 bg-black/65 p-8">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-cyan-300/80">Bot en vivo</p>
              <h2 className="mt-3 text-3xl font-semibold text-white">Prueba una demo interactiva</h2>
            </div>
          <button
            onClick={onShowVideo}
            className="rounded-full border border-cyan-300/60 px-5 py-2 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-400 hover:text-black"
            aria-label="Ver video demo"
          >
            Ver video
          </button>
        </div>
          <p className="mt-4 text-sm text-slate-300">
            Explora cómo un asistente entrenado puede resolver consultas y acelerar ventas.
          </p>
          <div className="mt-6">
            <EmbeddedBot />
          </div>
        </div>
      </section>

      <section id="faq" className="mt-20 w-full max-w-5xl">
        <p className="text-xs uppercase tracking-[0.4em] text-cyan-300/80">FAQ</p>
        <h2 className="mt-3 text-3xl font-semibold text-white">Respuestas rápidas</h2>
        <div className="mt-8 grid gap-4">
          {faqs.map((faq) => (
            <div key={faq.q} className="rounded-2xl border border-white/10 bg-black/55 p-5">
              <h3 className="text-base font-semibold text-white">{faq.q}</h3>
              <p className="mt-2 text-sm text-slate-300">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="contacto" className="mt-20 w-full max-w-5xl">
        <div className="rounded-3xl border border-cyan-400/30 bg-black/70 p-8 shadow-lg">
          <p className="text-xs uppercase tracking-[0.4em] text-cyan-200">Contacto</p>
          <h2 className="mt-3 text-3xl font-semibold text-white">
            ¿Listo para lanzar tu próximo sistema IA?
          </h2>
          <p className="mt-4 text-sm text-slate-300">
            Agenda una llamada o escribe por WhatsApp Business. Respuesta en menos de 24 horas hábiles.
          </p>
          <div className="mt-6 flex flex-col gap-4 md:flex-row">
            <a
              href={whatsappLink}
              className="rounded-full bg-emerald-400 px-6 py-3 text-center text-sm font-semibold text-black transition hover:bg-emerald-300"
              target="_blank"
              rel="noreferrer"
              aria-label="Abrir WhatsApp Business"
            >
              WhatsApp Business: {whatsappNumber}
            </a>
            <a
              href={`mailto:${contactEmail}`}
              className="rounded-full border border-white/20 px-6 py-3 text-center text-sm font-semibold text-white/80 transition hover:border-cyan-300/60"
              aria-label="Enviar email"
            >
              {contactEmail}
            </a>
          </div>
          <button
            onClick={onScrollToHero}
            className="mt-6 text-sm font-semibold text-cyan-200 underline-offset-4 hover:underline"
          >
            Volver al inicio
          </button>
        </div>
      </section>

      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/10 bg-black/80 px-4 py-3 backdrop-blur md:hidden">
        <div className="mx-auto flex w-full max-w-md gap-3">
          <Link
            href="/contact?source=sticky"
            className="flex-1 rounded-full bg-cyan-400 px-4 py-3 text-center text-sm font-semibold text-black transition hover:bg-cyan-300"
            aria-label="Reservar llamada desde la barra inferior"
          >
            Reservar
          </Link>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noreferrer"
            className="flex-1 rounded-full border border-emerald-400/70 px-4 py-3 text-center text-sm font-semibold text-emerald-200 transition hover:bg-emerald-400 hover:text-black"
            aria-label="Abrir WhatsApp desde la barra inferior"
          >
            WhatsApp
          </a>
        </div>
      </div>

      <footer className="mt-16 w-full text-center text-xs text-slate-400">
        &copy; {new Date().getFullYear()} Powered by IA. Todos los derechos reservados.
      </footer>
    </main>
  );
}
