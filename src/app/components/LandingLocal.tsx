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
    titulo: "Prompts",
    descripcion: "Biblioteca táctica lista para producción.",
    icono: "/favicon.ico",
    link: "/prompts",
  },
  {
    titulo: "Cursos",
    descripcion: "Formación aplicada y workshops in-company.",
    icono: "/favicon.ico",
    link: "/#cursos",
  },
];

const processSteps = [
  {
    titulo: "Diagnóstico",
    descripcion: "Entendemos tu contexto, objetivos y fricciones clave.",
  },
  {
    titulo: "Implementación",
    descripcion: "Prototipos rápidos, iteración y despliegue seguro.",
  },
  {
    titulo: "Escalado",
    descripcion: "Métricas, optimización continua y documentación.",
  },
];

const values = [
  {
    titulo: "Misión",
    descripcion: "Convertir IA aplicada en resultados medibles para negocio.",
  },
  {
    titulo: "Visión",
    descripcion: "Ser el partner tecnológico que simplifica lo complejo.",
  },
  {
    titulo: "Valores",
    descripcion: "Claridad, velocidad, seguridad y foco en impacto real.",
  },
];

const demos = [
  {
    titulo: "Demo: Onboarding IA",
    descripcion: "Experiencia interactiva para clientes y equipos internos.",
  },
  {
    titulo: "Demo: Asistente Comercial",
    descripcion: "Respuestas entrenadas para convertir leads en clientes.",
  },
  {
    titulo: "Demo: Automatización",
    descripcion: "Flujos conectados a tu stack operativo actual.",
  },
];

const testimonials = [
  {
    quote: "“Implementación impecable y resultados desde la primera semana.”",
    name: "Testimonio de ejemplo",
    role: "Dirección Comercial",
  },
  {
    quote: "“El equipo entendió nuestro negocio y ejecutó con precisión.”",
    name: "Testimonio de ejemplo",
    role: "Dirección General",
  },
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

const pricingHighlights = [
  {
    title: "Sprint IA",
    price: "Desde EUR 900",
    summary: "Diagnostico y quick wins en 7 dias.",
  },
  {
    title: "Launch",
    price: "Desde EUR 2.500",
    summary: "Bot o landing premium lista para publicar.",
  },
  {
    title: "Scale",
    price: "Desde EUR 6.500",
    summary: "Sistema IA conectado a procesos reales.",
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
    <main className="min-h-screen w-full flex flex-col items-center px-4 pb-20 pt-28 sm:px-6 lg:px-8 relative">
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
                href="/contact?source=home"
                className="rounded-full bg-cyan-400 px-6 py-3 text-sm font-semibold text-black transition hover:bg-cyan-300"
              >
                Reservar llamada
              </Link>
              <Link
                href="/demos/bot"
                className="rounded-full border border-cyan-300/60 px-6 py-3 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-400 hover:text-black"
              >
                Ver demo del bot
              </Link>
              <button
                onClick={onShowVideo}
                className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white/90 transition hover:border-white/60"
                aria-label="Ver demo en video"
              >
                Ver demo en video
              </button>
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
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-cyan-300/80">Servicios</p>
            <h2 className="mt-3 text-3xl font-semibold text-white">Soluciones IA de alto impacto</h2>
          </div>
          <Link
            href="/services"
            className="rounded-full border border-white/20 px-5 py-2 text-sm font-semibold text-white/80 transition hover:border-cyan-300/60"
          >
            Ver detalle completo
          </Link>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.slug}
              className="rounded-2xl border border-white/10 bg-black/55 p-6 shadow-lg"
            >
              <h3 className="text-lg font-semibold text-white">{service.title}</h3>
              <p className="mt-3 text-sm text-slate-300">{service.summary}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="demos" className="mt-20 w-full max-w-6xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-cyan-300/80">Demos</p>
            <h2 className="mt-3 text-3xl font-semibold text-white">Showcase listo para activar</h2>
          </div>
          <Link
            href="/demos"
            className="rounded-full border border-white/20 px-5 py-2 text-sm font-semibold text-white/80 transition hover:border-cyan-300/60"
          >
            Ver todas las demos
          </Link>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {demoHighlights.map((item) => (
            <Link
              key={item.slug}
              href={item.ctaHref}
              className="rounded-2xl border border-white/10 bg-black/55 p-6 shadow-lg transition hover:border-cyan-300/40"
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
      </section>

      <section id="paquetes" className="mt-20 w-full max-w-6xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-cyan-300/80">Paquetes</p>
            <h2 className="mt-3 text-3xl font-semibold text-white">Planes listos para facturar</h2>
          </div>
          <Link
            href="/pricing"
            className="rounded-full border border-white/20 px-5 py-2 text-sm font-semibold text-white/80 transition hover:border-cyan-300/60"
          >
            Ver todos los paquetes
          </Link>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {pricingHighlights.map((plan) => (
            <div
              key={plan.title}
              className="rounded-2xl border border-white/10 bg-black/55 p-6 shadow-lg"
            >
              <h3 className="text-lg font-semibold text-white">{plan.title}</h3>
              <p className="mt-2 text-sm text-cyan-200">{plan.price}</p>
              <p className="mt-3 text-sm text-slate-300">{plan.summary}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="portfolio" className="mt-20 w-full max-w-6xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-cyan-300/80">Portfolio</p>
            <h2 className="mt-3 text-3xl font-semibold text-white">Casos demo para inspirar</h2>
          </div>
          <Link
            href="/portfolio"
            className="rounded-full border border-white/20 px-5 py-2 text-sm font-semibold text-white/80 transition hover:border-cyan-300/60"
          >
            Ver portfolio
          </Link>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {portfolioHighlights.map((item) => (
            <Link
              key={item.slug}
              href={`/portfolio/${item.slug}`}
              className="rounded-2xl border border-white/10 bg-black/55 p-6 shadow-lg transition hover:border-cyan-300/40"
            >
              <h3 className="text-lg font-semibold text-white">{item.title}</h3>
              <p className="mt-3 text-sm text-slate-300">{item.summary}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-20 w-full max-w-6xl">
        <div className="grid gap-10 md:grid-cols-[1fr_1.1fr]">
          <div className="rounded-3xl border border-white/10 bg-black/60 p-8">
            <p className="text-xs uppercase tracking-[0.4em] text-cyan-300/80">Proceso</p>
            <h2 className="mt-3 text-3xl font-semibold text-white">De estrategia a ejecución</h2>
            <p className="mt-4 text-sm text-slate-300">
              Diseñamos, prototipamos e iteramos con foco en resultados y experiencia de usuario.
            </p>
            <div className="mt-6 space-y-4">
              {processSteps.map((step, index) => (
                <div key={step.titulo} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <p className="text-xs font-semibold text-cyan-200">Paso 0{index + 1}</p>
                  <h3 className="mt-2 text-base font-semibold text-white">{step.titulo}</h3>
                  <p className="mt-2 text-sm text-slate-300">{step.descripcion}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="grid gap-6">
            {values.map((item) => (
              <div key={item.titulo} className="rounded-3xl border border-white/10 bg-black/55 p-6">
                <h3 className="text-lg font-semibold text-white">{item.titulo}</h3>
                <p className="mt-3 text-sm text-slate-300">{item.descripcion}</p>
              </div>
            ))}
            <div className="rounded-3xl border border-cyan-400/30 bg-black/70 p-6">
              <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/80">
                Garantia de proceso
              </p>
              <h3 className="mt-2 text-lg font-semibold text-white">
                Metodo claro, entregables definidos
              </h3>
              <p className="mt-3 text-sm text-slate-300">
                Alcance, iteraciones y entregables acordados desde el inicio.
                Sin promesas infladas, con foco en ejecucion real.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="demos" className="mt-20 w-full max-w-6xl">
        <p className="text-xs uppercase tracking-[0.4em] text-cyan-300/80">Demos & casos</p>
        <h2 className="mt-3 text-3xl font-semibold text-white">Casos de uso demostrables</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {demos.map((demo) => (
            <div key={demo.titulo} className="rounded-2xl border border-white/10 bg-black/60 p-6">
              <h3 className="text-lg font-semibold text-white">{demo.titulo}</h3>
              <p className="mt-3 text-sm text-slate-300">{demo.descripcion}</p>
              <p className="mt-5 text-xs uppercase tracking-[0.3em] text-cyan-200/70">Disponible pronto</p>
            </div>
          ))}
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

      <section id="prompts" className="mt-20 w-full max-w-6xl">
        <div className="rounded-3xl border border-white/10 bg-black/60 p-8">
          <p className="text-xs uppercase tracking-[0.4em] text-cyan-300/80">Prompts</p>
          <h2 className="mt-3 text-3xl font-semibold text-white">Biblioteca diaria de prompts</h2>
          <p className="mt-4 text-sm text-slate-300">
            Acceso a prompts listos para producción, organizados por categoría.
          </p>
          <div className="mt-6">
            <Link
              href="/prompts"
              className="inline-flex rounded-full border border-cyan-300/60 px-5 py-2 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-400 hover:text-black"
            >
              Ir a la biblioteca
            </Link>
          </div>
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

      <section className="mt-20 w-full max-w-6xl">
        <p className="text-xs uppercase tracking-[0.4em] text-cyan-300/80">Testimonios</p>
        <h2 className="mt-3 text-3xl font-semibold text-white">Confianza validada</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {testimonials.map((t) => (
            <div key={t.quote} className="rounded-3xl border border-white/10 bg-black/55 p-6">
              <p className="text-lg text-white">{t.quote}</p>
              <p className="mt-4 text-sm text-cyan-200">{t.name}</p>
              <p className="text-xs text-slate-400">{t.role}</p>
            </div>
          ))}
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

      <footer className="mt-16 w-full text-center text-xs text-slate-400">
        &copy; {new Date().getFullYear()} Powered by IA. Todos los derechos reservados.
      </footer>
    </main>
  );
}
