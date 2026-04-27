"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import SalesBot from './sales-bot/SalesBot';

const WHATSAPP_NUMBER = '34911528753';
const CONTACT_EMAIL = 'poweredbyiaoficial@gmail.com';
const RYS_LINK = 'https://www.rysminimarket.com/';

const buildWhatsAppLink = (message: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

const buildMailtoLink = (subject: string, body: string) =>
  `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

const WHATSAPP_LINK = buildWhatsAppLink(
  'Hola Powered by IA, quiero pedir un diagnostico gratis para mi negocio local.',
);

const badges = ['Mobile-first', 'WhatsApp', 'SEO local', 'Contactos ordenados'];

const services = [
  {
    title: 'Mejora Web Express',
    price: 'Desde 180 €',
    intro: 'Para webs que existen, pero no transmiten confianza ni convierten bien en móvil.',
    bullets: ['Revisión de estructura', 'Textos y CTA más claros', 'Mejor experiencia móvil'],
    includes: [
      'Revisión de estructura',
      'Mejora de textos',
      'Limpieza visual ligera',
      'CTA más claros',
      'Mejora de experiencia móvil',
      'Recomendaciones SEO básicas',
    ],
    excludes: ['Rediseño completo', 'Nueva marca visual desde cero', 'Automatizaciones', 'Tienda online'],
    cta: 'Revisar mi web',
    href: buildWhatsAppLink(
      'Hola, me interesa Mejora Web Express. Quiero revisar si mi web actual puede convertir mejor en movil.',
    ),
  },
  {
    title: 'Web Local Base',
    price: 'Desde 350 €',
    intro: 'Para tener una web profesional, clara y lista para recibir contactos.',
    bullets: ['Landing responsive', 'WhatsApp y formulario básico', 'SEO local básico'],
    includes: [
      'Landing responsive',
      'Textos claros',
      'Secciones de servicios',
      'Botones a WhatsApp',
      'Formulario básico',
      'SEO local básico',
      'Publicación',
      'Revisión final en móvil',
    ],
    excludes: ['Tienda online', 'Reservas complejas', 'Automatizaciones avanzadas', 'Campañas de anuncios'],
    cta: 'Quiero una web clara',
    href: buildWhatsAppLink(
      'Hola, me interesa Web Local Base. Quiero una web clara para recibir contactos.',
    ),
  },
  {
    title: 'Pack Web + Contactos',
    price: 'Desde 500 €',
    intro: 'Recomendado si no quieres solo una web bonita, sino empezar a recoger contactos de forma ordenada.',
    bullets: ['Web Local Base', 'Formulario conectado', 'Siguiente paso claro para cada consulta'],
    includes: [
      'Web Local Base',
      'Formulario conectado',
      'Google Sheets como registro simple',
      'Aviso por email',
      'WhatsApp visible',
      'Estructura preparada para campañas',
    ],
    excludes: ['Bot conversacional IA', 'CRM profesional complejo', 'Gestión mensual de anuncios', 'Soporte 24/7'],
    cta: 'Quiero el recomendado',
    href: buildWhatsAppLink(
      'Hola, me interesa Pack Web + Contactos. Quiero una web y contactos ordenados desde el primer dia.',
    ),
    recommended: true,
  },
  {
    title: 'Pack Pro Captación',
    price: 'Desde 750 €',
    intro: 'Para una presencia más seria, con mejor mensaje y captación más preparada.',
    bullets: ['Copy más trabajado', 'SEO local más completo', 'Medición básica de conversiones'],
    includes: [
      'Web Local Base',
      'Google Sheets',
      'Email automático',
      'Copy más trabajado',
      'SEO local más completo',
      'FAQ',
      'Medición básica de conversiones',
    ],
    excludes: ['Inversión publicitaria', 'Gestión mensual de campañas', 'Bot IA avanzado', 'Integraciones complejas'],
    cta: 'Preparar captación',
    href: buildWhatsAppLink(
      'Hola, me interesa Pack Pro Captacion. Quiero una presencia mas seria y captacion mejor preparada.',
    ),
  },
];

const projects = [
  {
    title: 'Powered by IA',
    type: 'Landing comercial + IA demo',
    value: 'Portfolio vivo para vender webs, captación ordenada y futuros operadores IA.',
    skills: ['Estrategia comercial', 'UX mobile-first', 'SEO local', 'Bot FAQ demo'],
    problem:
      'Convertir una web personal en una landing comercial clara para clientes locales y, a la vez, enseñar capacidad técnica sin saturar la página.',
    solution:
      'Estructura de servicios, precios orientativos, CTA a WhatsApp, SEO local, FAQ y una demo de respuestas rápidas para preparar el producto de operador IA.',
    proof:
      'Demuestra estrategia comercial, diseño mobile-first, copy de conversión, SEO local y una primera capa de producto IA explicada con límites claros.',
    result:
      'Proyecto real en producción con dominio propio, servicios publicados, páginas legales y flujo de contacto claro.',
    desktopImage: '/imagenes/pbidesk.jpeg',
    mobileImage: '/imagenes/pbiamov.jpeg',
    href: '#inicio',
    cta: 'Ver proyecto',
  },
  {
    title: 'RYS Minimarket',
    type: 'Catálogo mobile-first',
    value: 'Tienda ligera con navegación móvil, contacto claro y operación web simple.',
    skills: ['Next.js', 'UX móvil', 'Catálogo', 'WhatsApp/contacto'],
    problem:
      'Mostrar productos y facilitar contacto desde móvil sin convertir la experiencia en una tienda pesada o difícil de operar.',
    solution:
      'Catálogo web ligero con navegación clara, enfoque móvil, contacto visible y flujo pensado para operación sencilla.',
    proof:
      'Demuestra ejecución en Next.js, criterio de UX móvil, organización de catálogo y orientación práctica a contacto/venta.',
    result:
      'El negocio puede compartir una URL clara y facilitar consultas desde móvil sin depender de una tienda compleja.',
    desktopImage: '/imagenes/rysdesk.jpeg',
    mobileImage: '/imagenes/rysmov.jpeg',
    href: RYS_LINK,
    cta: 'Ver tienda',
  },
];

const processSteps = [
  {
    title: 'Diagnóstico rápido',
    body: 'Vemos qué necesitas y qué no merece la pena hacer.',
  },
  {
    title: 'Estructura y mensaje',
    body: 'Ordenamos la oferta para que se entienda rápido.',
  },
  {
    title: 'Diseño mobile-first',
    body: 'Primero móvil, luego escritorio.',
  },
  {
    title: 'Contacto y captación',
    body: 'WhatsApp, formulario o correo con siguiente paso claro.',
  },
  {
    title: 'Revisión final',
    body: 'Ajustamos textos, enlaces y visual antes de publicar.',
  },
  {
    title: 'Publicación',
    body: 'Dejamos la web lista para compartir y medir.',
  },
];

const faqs = [
  {
    question: '¿Cuánto cuesta una web?',
    answer:
      'Una mejora empieza desde 180 €. Una web local clara desde 350 €. Si quieres ordenar contactos, el pack recomendado empieza desde 500 €. El precio final depende del alcance.',
  },
  {
    question: '¿Qué necesito para empezar?',
    answer:
      'Una explicación breve de tu negocio, servicios, zona, forma de contacto y, si ya tienes web, el enlace actual.',
  },
  {
    question: '¿Cuánto tarda?',
    answer:
      'Depende del alcance. Una landing local sencilla puede prepararse en pocos días si el material está claro. Primero reviso tu caso antes de presupuestar.',
  },
  {
    question: '¿Qué diferencia hay entre una web normal y una web preparada para captar contactos?',
    answer:
      'La segunda no solo se ve bien: explica rápido, genera confianza y deja WhatsApp, formulario o correo como siguiente paso claro.',
  },
  {
    question: '¿Puedo empezar solo con WhatsApp?',
    answer:
      'Sí. WhatsApp puede ser el contacto principal. Si necesitas más orden, se puede sumar formulario y registro simple.',
  },
  {
    question: '¿Y si ya tengo web?',
    answer:
      'Podemos revisarla y mejorar estructura, textos, móvil y llamadas a la acción sin rehacer todo desde cero.',
  },
  {
    question: '¿El bot IA ya está disponible?',
    answer:
      'Ahora está en modo respuestas rápidas/demo. La versión con IA comercial real está en preparación y dependerá del servidor. No sustituye atención humana.',
  },
  {
    question: '¿Cómo se paga?',
    answer:
      'Para proyectos pequeños puedo trabajar con transferencia bancaria o metálico. En proyectos más completos, lo normal es reservar con un anticipo y cerrar el resto al entregar o publicar.',
  },
  {
    question: '¿Hay mantenimiento mensual?',
    answer:
      'No es obligatorio. Se puede plantear solo si necesitas cambios frecuentes, medición, campañas o mejoras continuas.',
  },
];

function ProjectShot({
  src,
  alt,
  caption,
  aspectClassName,
  imageClassName = 'object-cover object-top',
}: {
  src: string;
  alt: string;
  caption: string;
  aspectClassName: string;
  imageClassName?: string;
}) {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
  }, [src]);

  return (
    <figure className="overflow-hidden rounded-[1.15rem] bg-black/22 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]">
      <div className={`relative w-full ${aspectClassName}`}>
        {failed ? (
          <div className="flex h-full w-full items-center justify-center bg-[#07111a] px-4 text-center">
            <div>
              <p className="text-[11px] uppercase tracking-[0.22em] text-cyan-200/70">{caption}</p>
              <p className="mt-2 text-sm leading-6 text-white/76">{alt}</p>
            </div>
          </div>
        ) : (
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className={imageClassName}
            onError={() => setFailed(true)}
          />
        )}
      </div>
      <figcaption className="px-3 py-2 text-[10px] uppercase tracking-[0.18em] text-white/42">
        {caption}
      </figcaption>
    </figure>
  );
}

function ServiceList({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-100/68">
        {title}
      </p>
      <ul className="mt-3 space-y-2">
        {items.map((item) => (
          <li key={item} className="flex gap-2 text-sm leading-5 text-white/76">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300/80" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function HomeContent() {
  const [openService, setOpenService] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<string | null>(null);
  const [openProject, setOpenProject] = useState<string | null>(null);
  const [isBotOpen, setIsBotOpen] = useState(false);

  const openBot = () => {
    setIsBotOpen(true);
  };

  return (
    <main
      className="pbia-home relative isolate overflow-hidden bg-[#07111a] text-white"
      style={{
        backgroundImage:
          'linear-gradient(180deg, rgba(7, 17, 26, 0.18) 0%, rgba(7, 17, 26, 0.62) 36%, rgba(7, 17, 26, 0.9) 100%), url(/imagenes/fondo/tu-fondo.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center top',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(34,211,238,0.18),transparent_24%),radial-gradient(circle_at_86%_8%,rgba(96,165,250,0.12),transparent_22%),linear-gradient(180deg,rgba(2,6,12,0.08)_0%,rgba(2,6,12,0.34)_44%,rgba(2,6,12,0.68)_100%)]" />

      <header className="fixed inset-x-0 top-0 z-40 border-b border-white/8 bg-[#07111a]/82 shadow-[0_12px_36px_rgba(0,0,0,0.22)] backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 py-2.5 sm:px-6 sm:py-3">
          <a href="#inicio" className="text-sm font-semibold tracking-[0.18em] text-white/88">
            Powered by <span className="text-cyan-300">IA</span>
          </a>
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-9 items-center rounded-full bg-cyan-300 px-3 text-xs font-semibold text-[#041018] shadow-[0_10px_32px_rgba(34,211,238,0.2)] transition hover:bg-cyan-200 sm:h-10 sm:px-4 sm:text-sm"
          >
            Diagnóstico gratis
          </a>
        </div>
      </header>

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-16 px-4 pb-52 pt-24 sm:gap-20 sm:px-6 sm:pb-40 sm:pt-28">
        <section id="inicio" className="grid min-h-[72vh] gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
          <div className="relative max-w-3xl">
            <span className="inline-flex rounded-full bg-cyan-300/12 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-100 shadow-[inset_0_0_0_1px_rgba(103,232,249,0.18)] backdrop-blur">
              Diseño web para negocio local
            </span>
            <h1 className="mt-5 max-w-4xl text-[2.55rem] font-semibold leading-[0.98] tracking-[-0.055em] text-white drop-shadow-[0_18px_42px_rgba(0,0,0,0.54)] sm:text-5xl lg:text-[4.35rem]">
              Webs claras para negocios locales que quieren recibir más contactos sin complicarse.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-white/84 drop-shadow-[0_8px_22px_rgba(0,0,0,0.36)] sm:text-[1.1rem]">
              Diseño una web sencilla, rápida y enfocada en que tus clientes entiendan qué haces, confíen en ti y te escriban por WhatsApp, formulario o correo.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center justify-center rounded-full bg-cyan-300 px-6 text-sm font-semibold text-[#041018] shadow-[0_18px_42px_rgba(34,211,238,0.24)] transition hover:bg-cyan-200"
              >
                Pedir diagnóstico gratis
              </a>
              <a
                href="#proyectos"
                className="inline-flex h-12 items-center justify-center rounded-full border border-white/16 bg-white/[0.04] px-6 text-sm font-semibold text-white/88 transition hover:border-cyan-300/40 hover:bg-white/[0.08]"
              >
                Ver ejemplos reales
              </a>
            </div>
            <p className="mt-3 max-w-xl text-xs leading-5 text-white/66 sm:text-sm">
              Te respondo con 3 mejoras claras: mensaje, móvil y contacto. Sin compromiso.
            </p>
            <div className="mt-8 flex flex-wrap gap-2.5">
              {badges.map((item) => (
                <span
                  key={item}
                  className="rounded-full bg-black/22 px-3 py-2 text-xs font-medium text-white/78 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)] backdrop-blur"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="relative lg:pl-8">
            <div className="pointer-events-none absolute -inset-4 rounded-[2rem] bg-cyan-300/8 blur-3xl" />
            <div className="relative overflow-hidden rounded-[1.7rem] bg-[linear-gradient(180deg,rgba(7,17,26,0.54),rgba(7,17,26,0.28))] p-5 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08),0_24px_90px_rgba(0,0,0,0.34)] backdrop-blur-md">
              <div className="flex items-center gap-4">
                <Image
                  src="/imagenes/perfil/mifoto.jpg"
                  alt="Foto de perfil de Powered by IA"
                  width={112}
                  height={112}
                  className="h-20 w-20 rounded-full object-cover ring-1 ring-white/16 sm:h-24 sm:w-24"
                  priority
                />
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-cyan-200/78">Trato directo</p>
                  <p className="mt-2 text-xl font-semibold leading-tight text-white">
                    Claridad comercial, móvil y contacto visible.
                  </p>
                </div>
              </div>
              <div className="mt-6 grid gap-3">
                {[
                  ['Mensaje claro', 'Tu cliente entiende qué haces en segundos.'],
                  ['Contacto fácil', 'WhatsApp, formulario o correo sin esconder el siguiente paso.'],
                  ['Captación ordenada', 'Base preparada para registrar y seguir consultas.'],
                ].map(([title, body]) => (
                  <div key={title} className="rounded-[1.1rem] bg-black/18 p-4 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]">
                    <p className="text-sm font-semibold text-white">{title}</p>
                    <p className="mt-1 text-sm leading-6 text-white/72">{body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="problema" className="rounded-[1.8rem] bg-[linear-gradient(135deg,rgba(7,17,26,0.7),rgba(7,17,26,0.28))] p-6 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)] backdrop-blur-md sm:p-8">
          <p className="text-xs uppercase tracking-[0.24em] text-cyan-200">Problema</p>
          <h2 className="mt-4 max-w-4xl text-2xl font-semibold leading-tight tracking-[-0.03em] text-white sm:text-4xl">
            Muchos negocios no pierden clientes por falta de calidad, sino porque su web no se entiende, el contacto está escondido o las consultas quedan desordenadas.
          </h2>
        </section>

        <section id="servicios" className="space-y-6">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-cyan-200">Servicios y precios</p>
            <h2 className="mt-3 max-w-3xl text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
              Elige una solución simple, clara y proporcional.
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-white/66">
              Los precios son orientativos y parten de un alcance base. El presupuesto final depende del número de secciones, materiales disponibles y funciones necesarias.
            </p>
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            {services.map((service) => {
              const isOpen = openService === service.title;

              return (
                <article
                  key={service.title}
                  className={`relative flex h-full flex-col rounded-[1.5rem] p-5 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.07)] backdrop-blur-md ${
                    service.recommended
                      ? 'bg-[linear-gradient(180deg,rgba(34,211,238,0.18),rgba(7,17,26,0.34))] ring-1 ring-cyan-300/32'
                      : 'bg-[linear-gradient(180deg,rgba(7,17,26,0.46),rgba(7,17,26,0.22))]'
                  }`}
                >
                  {service.recommended ? (
                    <span className="absolute right-4 top-4 rounded-full bg-cyan-300 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#041018]">
                      Recomendado
                    </span>
                  ) : null}
                  <span className="block h-px w-14 bg-cyan-300/55" />
                  <h3 className="mt-4 pr-28 text-xl font-semibold text-white">{service.title}</h3>
                  <p className="mt-2 text-2xl font-semibold text-cyan-100">{service.price}</p>
                  <p className="mt-4 text-sm leading-6 text-white/80">{service.intro}</p>
                  <ul className="mt-5 space-y-2">
                    {service.bullets.map((item) => (
                      <li key={item} className="flex gap-2 text-sm leading-5 text-white/78">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300/80" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-6">
                    <a
                      href={service.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-11 w-full items-center justify-center rounded-full bg-cyan-300 px-4 text-sm font-semibold text-[#041018] shadow-[0_14px_30px_rgba(34,211,238,0.18)] transition hover:bg-cyan-200"
                    >
                      {service.cta}
                    </a>
                    <button
                      type="button"
                      onClick={() => setOpenService(isOpen ? null : service.title)}
                      aria-expanded={isOpen}
                      className="mt-3 inline-flex h-10 w-full items-center justify-center rounded-full border border-white/12 bg-white/[0.03] px-4 text-sm font-semibold text-white/82 transition hover:border-cyan-300/34 hover:bg-white/[0.07]"
                    >
                      {isOpen ? 'Ocultar detalles' : 'Ver qué incluye'}
                    </button>
                  </div>
                  {isOpen ? (
                    <div className="mt-5 grid gap-5 rounded-[1.1rem] bg-black/14 p-4 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05)] md:grid-cols-2">
                      <ServiceList title="Incluye" items={service.includes} />
                      <ServiceList title="No incluye" items={service.excludes} />
                    </div>
                  ) : null}
                </article>
              );
            })}
          </div>
          <p className="rounded-[1.15rem] bg-white/[0.04] px-4 py-3 text-xs leading-5 text-white/58 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]">
            Los packs base no incluyen tienda online, reservas complejas, campañas de anuncios ni sistemas a medida. Si aparece una necesidad fuera del alcance, se plantea aparte antes de empezar.
          </p>
        </section>

        <section id="bot-ia-local" className="grid gap-4 rounded-[2rem] bg-[radial-gradient(circle_at_18%_12%,rgba(34,211,238,0.16),transparent_26%),linear-gradient(135deg,rgba(7,17,26,0.68),rgba(4,12,20,0.42))] p-5 shadow-[inset_0_0_0_1px_rgba(103,232,249,0.16)] backdrop-blur-md sm:p-6 lg:grid-cols-[1fr_0.68fr] lg:items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-cyan-200">Producto futuro</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
              Operador IA Local - Demo en desarrollo
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/80 sm:text-base">
              Un asistente para responder dudas básicas, recoger datos y orientar contactos cuando el modo IA real esté disponible. Ahora funciona como demo de respuestas rápidas dentro del portfolio técnico.
            </p>
            <div className="mt-4 flex flex-wrap gap-2 text-xs text-white/72">
              <span className="rounded-full bg-white/[0.06] px-3 py-1.5">Demo en desarrollo</span>
              <span className="rounded-full bg-white/[0.06] px-3 py-1.5">No promete 24/7</span>
              <span className="rounded-full bg-white/[0.06] px-3 py-1.5">No sustituye atención humana</span>
              <span className="rounded-full bg-white/[0.06] px-3 py-1.5">Portfolio técnico PBIA</span>
            </div>
            <button
              type="button"
              onClick={openBot}
              className="mt-5 inline-flex h-11 items-center justify-center rounded-full bg-cyan-300 px-5 text-sm font-semibold text-[#041018] transition hover:bg-cyan-200"
            >
              Probar demo FAQ
            </button>
          </div>

          <button
            type="button"
            onClick={openBot}
            className="rounded-[1.25rem] bg-[#061018]/74 p-3 text-left shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08),0_18px_52px_rgba(0,0,0,0.2)] transition hover:shadow-[inset_0_0_0_1px_rgba(103,232,249,0.2),0_18px_52px_rgba(0,0,0,0.2)] sm:p-4"
          >
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-white">Chat IA demo</p>
                <p className="mt-1 text-xs text-white/50">Modo respuestas rápidas</p>
              </div>
              <span className="rounded-full bg-amber-300/12 px-3 py-1 text-xs font-medium text-amber-100">
                Demo FAQ
              </span>
            </div>
            <div className="mt-4 space-y-2.5">
              <div className="ml-auto max-w-[86%] rounded-2xl rounded-tr-sm bg-cyan-300 px-3 py-2 text-xs leading-5 text-[#041018] sm:text-sm sm:leading-6">
                ¿Cuánto cuesta una web sencilla?
              </div>
              <div className="max-w-[90%] rounded-2xl rounded-tl-sm bg-white/[0.07] px-3 py-2 text-xs leading-5 text-white/84 sm:text-sm sm:leading-6">
                Desde 350 €. Si quieres ordenar contactos, el pack recomendado empieza desde 500 €.
              </div>
            </div>
          </button>
        </section>

        <section id="seo-local" className="grid gap-6 lg:grid-cols-[0.86fr_1.14fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-cyan-200">SEO local</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
              Diseño web para negocios locales en Alcalá de Henares y Madrid
            </h2>
          </div>
          <div className="rounded-[1.45rem] bg-[linear-gradient(180deg,rgba(7,17,26,0.48),rgba(7,17,26,0.2))] p-5 text-sm leading-7 text-white/80 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.07)] backdrop-blur-md sm:p-6 sm:text-base">
            <p>
              Trabajo con pequeños negocios que necesitan una web clara, rápida y pensada para móvil: peluquerías, barberías, clínicas de estética, consultas, restaurantes y servicios locales. Si estás en Alcalá de Henares, Madrid o trabajas en remoto, la prioridad es la misma: que el cliente entienda qué ofreces y tenga un siguiente paso claro para contactarte por WhatsApp, formulario o correo.
            </p>
            <p className="mt-4">
              El enfoque combina diseño web para negocios locales, landing page para negocio local, web con WhatsApp y automatización de contactos cuando aporta orden de verdad.
            </p>
          </div>
        </section>

        <section id="proyectos" className="scroll-mt-24 space-y-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-cyan-200">Portfolio</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
                Ejemplos reales
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-white/76 sm:text-base">
                Proyectos existentes usados para enseñar criterio comercial, UX móvil y ejecución técnica sin inventar clientes no autorizados.
              </p>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-cyan-100/78">
                Abre solo el caso que quieras revisar. La idea es enseñar trabajo real sin llenar la página de ruido.
              </p>
            </div>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center justify-center rounded-full border border-cyan-300/22 bg-cyan-300/10 px-5 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-300/14"
            >
              Hablar sobre tu caso
            </a>
          </div>
          <div className="grid gap-4">
            {projects.map((project) => {
              const isOpen = openProject === project.title;

              return (
                <article
                  key={project.title}
                  className="rounded-[1.4rem] bg-[linear-gradient(180deg,rgba(8,18,27,0.48),rgba(8,18,27,0.18))] p-5 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)] backdrop-blur-md"
                >
                  <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-start">
                    <div>
                      <p className="text-xs uppercase tracking-[0.24em] text-white/45">{project.type}</p>
                      <h3 className="mt-2 text-xl font-semibold text-white">{project.title}</h3>
                      <p className="mt-3 max-w-2xl text-sm leading-6 text-white/76">{project.value}</p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {project.skills.map((skill) => (
                          <span
                            key={skill}
                            className="rounded-full bg-cyan-300/10 px-3 py-1.5 text-xs font-medium text-cyan-100 shadow-[inset_0_0_0_1px_rgba(103,232,249,0.14)]"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 sm:flex-row lg:flex-col">
                      <button
                        type="button"
                        onClick={() => setOpenProject(isOpen ? null : project.title)}
                        aria-expanded={isOpen}
                        className="inline-flex h-11 items-center justify-center rounded-full bg-cyan-300 px-5 text-sm font-semibold text-[#041018] transition hover:bg-cyan-200"
                      >
                        {isOpen ? 'Ocultar resumen' : 'Ver resumen'}
                      </button>
                      <a
                        href={project.href}
                        target={project.href.startsWith('http') ? '_blank' : undefined}
                        rel={project.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="inline-flex h-11 items-center justify-center rounded-full border border-white/14 bg-white/[0.04] px-5 text-sm font-semibold text-white/86 transition hover:border-cyan-300/34 hover:bg-white/[0.08]"
                      >
                        {project.cta}
                      </a>
                    </div>
                  </div>

                  {isOpen ? (
                    <div className="mt-5 border-t border-white/10 pt-5">
                      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
                        {[
                          ['Problema', project.problem],
                          ['Solución', project.solution],
                          ['Qué demuestra', project.proof],
                          ['Resultado observable', project.result],
                        ].map(([label, text]) => (
                          <div
                            key={label}
                            className="rounded-[1.1rem] bg-black/14 p-4 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05)]"
                          >
                            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-100/68">
                              {label}
                            </p>
                            <p className="mt-3 text-sm leading-6 text-white/74">{text}</p>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 grid gap-3 md:grid-cols-[1.2fr_0.8fr] md:items-start">
                        <ProjectShot
                          src={project.desktopImage}
                          alt={`Captura real desktop de ${project.title}`}
                          caption="Desktop real"
                          aspectClassName="aspect-[19/10]"
                        />
                        <ProjectShot
                          src={project.mobileImage}
                          alt={`Captura real móvil de ${project.title}`}
                          caption="Móvil real"
                          aspectClassName="aspect-[1/2]"
                          imageClassName="object-contain object-top bg-[#07111a]"
                        />
                      </div>
                    </div>
                  ) : null}
                </article>
              );
            })}
          </div>
        </section>

        <section id="como-trabajamos" className="space-y-6">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-cyan-200">Proceso</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
              Cómo trabajamos
            </h2>
          </div>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {processSteps.map((step, index) => (
              <article
                key={step.title}
                className="flex gap-4 rounded-[1.35rem] bg-[linear-gradient(180deg,rgba(7,17,26,0.46),rgba(7,17,26,0.2))] px-4 py-4 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.07)] backdrop-blur-md"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cyan-300 text-base font-bold text-[#041018] shadow-[0_10px_28px_rgba(34,211,238,0.18)]">
                  {index + 1}
                </span>
                <div>
                  <h3 className="text-sm font-semibold text-white">{step.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-white/72">{step.body}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="faq" className="space-y-6">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-cyan-200">FAQ</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
              Preguntas frecuentes
            </h2>
          </div>
          <div className="grid gap-3">
            {faqs.map((faq) => {
              const isOpen = openFaq === faq.question;

              return (
                <article
                  key={faq.question}
                  className="overflow-hidden rounded-[1.25rem] bg-[linear-gradient(180deg,rgba(7,17,26,0.46),rgba(7,17,26,0.18))] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.07)] backdrop-blur-md"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : faq.question)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  >
                    <span className="text-base font-semibold text-white">{faq.question}</span>
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/[0.06] text-lg font-semibold text-cyan-100">
                      {isOpen ? '-' : '+'}
                    </span>
                  </button>
                  {isOpen ? (
                    <p className="border-t border-white/8 px-5 pb-5 pt-4 text-sm leading-6 text-white/76">
                      {faq.answer}
                    </p>
                  ) : null}
                </article>
              );
            })}
          </div>
        </section>

        <section id="quien-esta-detras" className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-cyan-200">Quién está detrás</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
              Trato directo, ejecución clara y soluciones sin mareos.
            </h2>
          </div>
          <div className="space-y-4 rounded-[1.45rem] bg-[linear-gradient(180deg,rgba(7,17,26,0.46),rgba(7,17,26,0.18))] p-5 text-sm leading-7 text-white/78 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.07)] backdrop-blur-md sm:text-base">
            <p>
              Soy Gerardo, creador de Powered by IA. Trabajo directamente contigo para ordenar tu presencia online sin meterte en sistemas que no necesitas.
            </p>
            <p>
              Analizo, diseño, escribo y publico con foco en algo simple: que tus clientes entiendan qué haces y tengan claro cómo contactarte.
            </p>
          </div>
        </section>

        <section
          id="contacto"
          className="rounded-[2rem] bg-[linear-gradient(180deg,rgba(34,211,238,0.12),rgba(8,18,27,0.18))] px-5 py-8 shadow-[inset_0_0_0_1px_rgba(103,232,249,0.16)] backdrop-blur-md sm:px-7 sm:py-10"
        >
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.24em] text-cyan-200">Contacto</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
              Pide un diagnóstico gratis y te digo qué haría primero.
            </h2>
            <p className="mt-4 text-base leading-7 text-white/80">
              Cuéntame tu caso y reviso si te conviene mejorar tu web, crear una landing nueva o preparar un sistema simple para ordenar contactos.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center justify-center rounded-full bg-cyan-300 px-5 text-sm font-semibold text-[#041018] shadow-[0_18px_42px_rgba(34,211,238,0.24)] transition hover:bg-cyan-200"
              >
                Pedir diagnóstico gratis
              </a>
              <a
                href={buildMailtoLink(
                  'Diagnóstico Powered by IA',
                  'Hola, quiero pedir un diagnostico gratis. Mi negocio es:',
                )}
                className="inline-flex h-12 items-center justify-center rounded-full border border-white/14 bg-white/[0.04] px-5 text-sm font-semibold text-white/88 transition hover:border-cyan-300/40 hover:bg-white/[0.08]"
              >
                Enviar por email
              </a>
              <a
                href="#servicios"
                className="inline-flex h-12 items-center justify-center rounded-full border border-cyan-300/22 bg-cyan-300/10 px-5 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-300/14"
              >
                Ver servicios
              </a>
            </div>
          </div>
        </section>

        <footer className="border-t border-white/8 pt-6 text-sm text-white/54">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p>Powered by IA · diseño web y captación para negocios locales.</p>
            <div className="flex flex-wrap gap-4">
              <a href="/aviso-legal" className="transition hover:text-white">
                Aviso legal
              </a>
              <a href="/privacidad" className="transition hover:text-white">
                Privacidad
              </a>
              <a href="/cookies" className="transition hover:text-white">
                Cookies
              </a>
            </div>
          </div>
          <p className="mt-2 max-w-3xl text-xs leading-5 text-white/42">
            Esta versión no usa analítica ni cookies de terceros. Si se añaden herramientas no esenciales en el futuro, se activará el consentimiento antes de usarlas.
          </p>
        </footer>
      </div>

      <SalesBot
        isOpen={isBotOpen}
        onOpen={openBot}
        onClose={() => setIsBotOpen(false)}
      />
    </main>
  );
}
