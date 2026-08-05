"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';

const WHATSAPP_NUMBER = '34911528753';
const CONTACT_EMAIL = 'poweredbyiaoficial@gmail.com';
const RYS_LINK = 'https://www.rysminimarket.com/';

const buildWhatsAppLink = (message: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

const buildMailtoLink = (subject: string, body: string) =>
  `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

const WHATSAPP_LINK = buildWhatsAppLink(
  'Hola Powered by IA, quiero información sobre Web Local Express.',
);
const POINT_IMPROVEMENT_LINK = buildWhatsAppLink(
  'Hola Gerardo, necesito una mejora puntual para mi negocio. Me gustaría contarte el caso para saber si puedes ayudarme.',
);

const badges = ['Adaptada a móvil', 'WhatsApp o llamada', 'SEO local básico'];

const services = [
  {
    title: 'Web Local Express',
    price: '490 €',
    intro: 'Una web clara para mostrar tu negocio y facilitar que te contacten.',
    idealFor: 'pequeños negocios que necesitan explicar sus servicios, ubicación y horarios sin complicarse.',
    bullets: [
      'Landing de una página',
      'Hasta seis secciones',
      'Diseño adaptado a móvil',
      'WhatsApp o llamada',
      'SEO local básico',
      'Entrega estimada en siete días laborables',
    ],
    includes: [
      'Landing de una página',
      'Hasta seis secciones',
      'Diseño adaptado a móvil',
      'Servicios, horarios, ubicación y mapa',
      'Botón de WhatsApp o llamada',
      'Formulario sencillo, solo si ya existe y funciona',
      'SEO local básico',
      'Conexión técnica de un dominio existente y publicación',
      'Dos rondas de revisión',
      'Catorce días de soporte',
      'Entrega estimada en siete días laborables desde la recepción completa del material',
    ],
    excludes: [
      'Tienda online o pasarela de pago',
      'Logotipo o identidad completa',
      'Fotografía profesional',
      'Reservas complejas',
      'Automatizaciones personalizadas',
      'Gestión de redes sociales',
      'Contenido nuevo ilimitado',
      'Posicionamiento garantizado',
    ],
    cta: 'Hablar conmigo por WhatsApp',
    href: buildWhatsAppLink(
      'Hola, me interesa Web Local Express por 490 €.',
    ),
  },
];

const projects = [
  {
    title: 'RYS Minimarket',
    type: 'Web para negocio local',
    value: 'Proyecto real de Yasmin con presentación digital y estructura comercial clara.',
    skills: ['Web rápida', 'Presentación digital', 'Contacto visible', 'Estructura comercial'],
    problem:
      'Dar al negocio una presencia web clara y fácil de consultar desde móvil.',
    solution:
      'Gerardo ayudó con la web, la presentación digital y la estructura comercial.',
    proof:
      'Demuestra criterio móvil, presentación clara y contacto visible para facilitar consultas.',
    desktopImage: '/imagenes/rysdesk.jpeg',
    mobileImage: '/imagenes/rysmov.jpeg',
    href: RYS_LINK,
    cta: 'Ver tienda',
  },
];

const processSteps = [
  {
    title: 'Alcance y material',
    body: 'Fijamos qué incluye la web y reunimos el material necesario.',
  },
  {
    title: 'Estructura y contenido',
    body: 'Ordenamos servicios, horarios, ubicación y contacto.',
  },
  {
    title: 'Diseño mobile-first',
    body: 'Primero móvil, luego escritorio.',
  },
  {
    title: 'Contacto visible',
    body: 'Dejamos WhatsApp o llamada con un siguiente paso claro.',
  },
  {
    title: 'Dos rondas de revisión',
    body: 'Ajustamos el contenido dentro del alcance acordado.',
  },
  {
    title: 'Publicación',
    body: 'Conectamos el dominio existente y dejamos la web publicada.',
  },
];

const faqs = [
  {
    question: '¿Cuánto cuesta una web?',
    answer:
      'Web Local Express cuesta 490 €.',
  },
  {
    question: '¿Qué necesito para empezar?',
    answer:
      'Necesito el material completo de tu negocio: servicios, horarios, ubicación, formas de contacto y contenido que quieras incluir.',
  },
  {
    question: '¿Cuánto tarda?',
    answer:
      'La entrega estimada es de siete días laborables desde la recepción completa del material.',
  },
  {
    question: '¿Qué incluye el SEO local básico?',
    answer:
      'Incluye una estructura técnica y de contenido preparada para búsquedas locales. No incluye gestión continuada del Perfil de Empresa ni posiciones garantizadas.',
  },
  {
    question: '¿Puedo empezar solo con WhatsApp?',
    answer:
      'Sí. La web incluye un botón de WhatsApp o llamada. El formulario sencillo solo se incluye si ya existe y funciona.',
  },
  {
    question: '¿Y si ya tengo web?',
    answer:
      'Incluye conexión técnica de un dominio existente y publicación. Los costes de dominio, hosting, correo y servicios externos no están incluidos.',
  },
  {
    question: '¿Qué cubre el soporte?',
    answer:
      'Catorce días para errores de entrega y pequeños ajustes dentro del alcance.',
  },
  {
    question: '¿Qué no está incluido?',
    answer:
      'No incluye tienda online, identidad completa, fotografía profesional, reservas complejas, automatizaciones personalizadas, redes sociales, contenido ilimitado ni posicionamiento garantizado.',
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
  // The assistant remains available in the codebase for a future demo, but is
  // intentionally excluded from this commercial flow.
  const showAssistantDemo = false;
  const [isBotOpen, setIsBotOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<{ id: string; role: 'user' | 'assistant'; text: string }[]>([]);
  const [chatDraft, setChatDraft] = useState('');
  const quickQuestions: { question: string }[] = [];
  const openBot = () => setIsBotOpen(true);
  const closeBot = () => setIsBotOpen(false);
  const sendBotMessage = (message: string) => {
    if (!message.trim()) return;
    setChatMessages((current) => [...current, { id: String(Date.now()), role: 'user', text: message }]);
  };
  const handleChatSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    sendBotMessage(chatDraft);
    setChatDraft('');
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
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(34,211,238,0.13),transparent_24%),linear-gradient(180deg,rgba(2,6,12,0.08)_0%,rgba(2,6,12,0.34)_44%,rgba(2,6,12,0.72)_100%)]" />

      <header className="fixed inset-x-0 top-0 z-40 border-b border-white/8 bg-[#07111a]/88 shadow-[0_10px_30px_rgba(0,0,0,0.18)] backdrop-blur-md">
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
            WhatsApp
          </a>
        </div>
      </header>

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 pb-32 pt-24 sm:gap-14 sm:px-6 sm:pb-28 sm:pt-28">
        <section id="inicio" className="grid min-h-[62vh] scroll-mt-24 gap-9 lg:min-h-[60vh] lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
          <div className="relative max-w-3xl">
            <span className="inline-flex rounded-full border border-cyan-200/18 bg-cyan-300/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-100">
              Diseño web para negocio local
            </span>
            <h1 className="mt-5 max-w-4xl text-[2.35rem] font-semibold leading-[1.02] text-white drop-shadow-[0_14px_34px_rgba(0,0,0,0.42)] sm:text-5xl lg:text-[4.15rem]">
              Webs claras para negocios locales en Alcalá de Henares
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-white/84 drop-shadow-[0_8px_20px_rgba(0,0,0,0.28)] sm:text-[1.08rem]">
              Creo páginas rápidas y adaptadas a móvil para mostrar tus servicios, ubicación y horarios, y facilitar que tus clientes contacten contigo.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center justify-center rounded-full bg-cyan-300 px-6 text-sm font-semibold text-[#041018] shadow-[0_18px_42px_rgba(34,211,238,0.24)] transition hover:bg-cyan-200"
              >
                Hablar conmigo por WhatsApp
              </a>
              <a
                href="#proyectos"
                className="inline-flex h-12 items-center justify-center rounded-full border border-white/16 bg-white/[0.04] px-6 text-sm font-semibold text-white/88 transition hover:border-cyan-300/40 hover:bg-white/[0.08]"
              >
                Ver proyecto real
              </a>
            </div>
            <div className="mt-7 flex flex-wrap gap-2">
              {badges.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/8 bg-black/18 px-3 py-1.5 text-xs font-medium text-white/76"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="relative lg:pl-8">
            <div className="relative overflow-hidden rounded-[1.25rem] border border-white/8 bg-[#07111a]/58 p-4 shadow-[0_18px_60px_rgba(0,0,0,0.22)] backdrop-blur-sm sm:p-5">
              <div className="flex items-center gap-4">
                <Image
                  src="/imagenes/perfil/mifoto.jpg"
                  alt="Gerardo, creador de Powered by IA"
                  width={112}
                  height={112}
                  className="h-20 w-20 rounded-full object-cover ring-1 ring-white/16 sm:h-24 sm:w-24"
                  priority
                />
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-cyan-200/78">Hablas conmigo directamente</p>
                  <p className="mt-2 text-xl font-semibold leading-tight text-white">
                    Una web clara para que te encuentren y contacten.
                  </p>
                </div>
              </div>
              <div className="mt-5 grid gap-3">
                {[
                  ['Servicios y horarios', 'La información esencial de tu negocio, a la vista.'],
                  ['Contacto fácil', 'WhatsApp o llamada sin esconder el siguiente paso.'],
                  ['SEO local básico', 'Una base técnica y de contenido para búsquedas locales.'],
                ].map(([title, body]) => (
                  <div key={title} className="border-t border-white/8 pt-3">
                    <p className="text-sm font-semibold text-white">{title}</p>
                    <p className="mt-1 text-sm leading-6 text-white/72">{body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="problema" className="scroll-mt-24 border-l border-cyan-300/35 pl-5 sm:pl-7">
          <p className="text-xs uppercase tracking-[0.24em] text-cyan-200">Problema</p>
          <h2 className="mt-4 max-w-4xl text-[1.65rem] font-semibold leading-[1.18] text-white sm:text-4xl">
            Muchos negocios no pierden clientes por falta de calidad, sino porque su web no se entiende, el contacto está escondido o las consultas quedan desordenadas.
          </h2>
        </section>

        <section id="servicios" className="scroll-mt-24 space-y-6">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-cyan-200">Servicios y precios</p>
            <h2 className="mt-3 max-w-3xl text-[1.7rem] font-semibold leading-tight tracking-[-0.03em] text-white sm:text-4xl">
              Una web clara, con el alcance definido desde el principio.
            </h2>
          </div>
          <div className="grid gap-3">
            {services.map((service) => {
              const isOpen = openService === service.title;

              return (
                <article
                  key={service.title}
                  className="relative flex h-full flex-col rounded-[1.1rem] border border-cyan-300/32 bg-cyan-300/[0.08] p-4 shadow-[0_14px_42px_rgba(0,0,0,0.16)] backdrop-blur-sm sm:p-5"
                >
                  <span className="block h-px w-10 bg-cyan-300/50" />
                  <h3 className="mt-4 text-xl font-semibold text-white">{service.title}</h3>
                  <p className="mt-2 text-2xl font-semibold text-cyan-100">{service.price}</p>
                  <p className="mt-4 text-sm leading-6 text-white/80">{service.intro}</p>
                  <p className="mt-3 rounded-xl border border-cyan-300/14 bg-cyan-300/[0.06] px-3 py-2 text-sm leading-6 text-cyan-50/82">
                    <span className="font-semibold text-cyan-100">Ideal para: </span>
                    {service.idealFor}
                  </p>
                  <ul className="mt-4 space-y-2">
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
                    <div className="mt-4 grid gap-5 border-t border-white/8 pt-4 md:grid-cols-2">
                      <ServiceList title="Incluye" items={service.includes} />
                      <div className="space-y-5">
                        <ServiceList title="No incluye" items={service.excludes} />
                        <p className="text-sm leading-6 text-white/68">
                          Los costes de dominio, hosting, correo y servicios externos no están incluidos.
                        </p>
                        <p className="text-sm leading-6 text-white/68">
                          El soporte cubre errores de entrega y pequeños ajustes dentro del alcance. El SEO local básico no incluye gestión continuada del Perfil de Empresa ni posiciones garantizadas.
                        </p>
                      </div>
                    </div>
                  ) : null}
                </article>
              );
            })}
          </div>
          <aside className="rounded-[1.1rem] border border-white/8 bg-[#07111a]/42 p-4 sm:p-5">
            <h3 className="text-lg font-semibold text-white">¿Ahora solo necesitas una mejora concreta?</h3>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-white/76">
              También realizo trabajos puntuales como mejorar textos, configurar WhatsApp, optimizar tu presencia local o actualizar una web existente. Cuéntame tu caso y te diré con claridad si puedo ayudarte.
            </p>
            <a
              href={POINT_IMPROVEMENT_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex h-11 items-center justify-center rounded-full border border-cyan-300/22 bg-cyan-300/10 px-5 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-300/14"
            >
              Consultar una mejora puntual
            </a>
          </aside>
        </section>

        <section id="seo-local" className="grid scroll-mt-24 gap-5 border-t border-white/8 pt-8 lg:grid-cols-[0.86fr_1.14fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-cyan-200">SEO local</p>
            <h2 className="mt-3 text-[1.7rem] font-semibold leading-tight tracking-[-0.03em] text-white sm:text-4xl">
              SEO local básico para una web que se entiende bien
            </h2>
          </div>
          <div className="text-sm leading-7 text-white/80 sm:text-base">
            <p>
              Trabajo con pequeños negocios que necesitan una web clara, rápida y pensada para móvil. La estructura ayuda a mostrar servicios, ubicación y formas de contacto de manera comprensible para personas y buscadores.
            </p>
            <p className="mt-4">
              El SEO local básico prepara títulos, descripción, estructura y contenido relevante para Alcalá de Henares y alrededores. No incluye gestión continuada del Perfil de Empresa ni posiciones garantizadas.
            </p>
          </div>
        </section>

        <section id="proyectos" className="scroll-mt-24 space-y-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-cyan-200">Casos reales</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
                Ejemplos reales
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-white/76 sm:text-base">
              Proyectos existentes usados para enseñar criterio comercial, UX móvil y ejecución técnica sin inventar resultados.
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
              Hablar conmigo por WhatsApp
            </a>
          </div>
          <div className="grid max-w-4xl gap-3">
            {projects.map((project) => {
              const isOpen = openProject === project.title;

              return (
                <article
                  key={project.title}
                  className="rounded-[1.1rem] border border-white/8 bg-[#07111a]/48 p-4 shadow-[0_12px_38px_rgba(0,0,0,0.14)] backdrop-blur-sm sm:p-5"
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
                            className="rounded-full border border-cyan-200/12 bg-cyan-300/8 px-3 py-1.5 text-xs font-medium text-cyan-100"
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
                    <div className="mt-5 border-t border-white/8 pt-5">
                      <div className="grid gap-3 lg:grid-cols-3">
                        {[
                          ['Problema', project.problem],
                          ['Solución', project.solution],
                          ['Qué demuestra', project.proof],
                        ].map(([label, text]) => (
                          <div
                            key={label}
                            className="border-l border-cyan-300/20 pl-4"
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

        <section className="grid scroll-mt-24 gap-5 border-t border-white/8 pt-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-cyan-200">Trabajo directo</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
              Alcance claro antes de empezar.
            </h2>
          </div>
          <p className="text-sm leading-7 text-white/78 sm:text-base">
            Soy Gerardo y trabajo directamente con pequeños negocios. No hay comerciales ni intermediarios: hablamos, fijamos el alcance y sabes qué voy a entregar antes de empezar.
          </p>
        </section>

        <section id="como-trabajamos" className="scroll-mt-24 space-y-6">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-cyan-200">Proceso</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
              Cómo trabajamos
            </h2>
          </div>
          <div className="grid gap-2.5 md:grid-cols-2 lg:grid-cols-3">
            {processSteps.map((step, index) => (
              <article
                key={step.title}
                className="flex gap-4 rounded-[1rem] border border-white/8 bg-[#07111a]/42 px-4 py-3.5"
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

        <section id="faq" className="scroll-mt-24 space-y-6">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-cyan-200">FAQ</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
              Preguntas frecuentes
            </h2>
          </div>
          <div className="grid gap-2">
            {faqs.map((faq) => {
              const isOpen = openFaq === faq.question;

              return (
                <article
                  key={faq.question}
                  className="overflow-hidden rounded-[0.95rem] border border-white/8 bg-[#07111a]/46"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : faq.question)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 px-4 py-3.5 text-left sm:px-5"
                  >
                    <span className="text-sm font-semibold leading-6 text-white sm:text-base">{faq.question}</span>
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/[0.05] text-base font-semibold text-cyan-100">
                      {isOpen ? '-' : '+'}
                    </span>
                  </button>
                  {isOpen ? (
                    <p className="border-t border-white/8 px-4 pb-4 pt-3 text-sm leading-6 text-white/76 sm:px-5">
                      {faq.answer}
                    </p>
                  ) : null}
                </article>
              );
            })}
          </div>
        </section>

        <section
          id="contacto"
          className="scroll-mt-24 rounded-[1.35rem] border border-cyan-300/18 bg-cyan-300/[0.07] px-5 py-6 shadow-[0_18px_55px_rgba(0,0,0,0.18)] backdrop-blur-sm sm:px-7 sm:py-8"
        >
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.24em] text-cyan-200">Contacto</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
              Cuéntame tu negocio y hablamos de la web.
            </h2>
            <p className="mt-4 text-base leading-7 text-white/80">
              Si Web Local Express encaja contigo, fijamos el alcance y el material necesario para empezar.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center justify-center rounded-full bg-cyan-300 px-5 text-sm font-semibold text-[#041018] shadow-[0_18px_42px_rgba(34,211,238,0.24)] transition hover:bg-cyan-200"
              >
                Hablar conmigo por WhatsApp
              </a>
              <a
                href={buildMailtoLink(
                  'Web Local Express | Powered by IA',
                  'Hola, quiero información sobre Web Local Express. Mi negocio es:',
                )}
                className="inline-flex h-12 items-center justify-center rounded-full border border-white/14 bg-white/[0.04] px-5 text-sm font-semibold text-white/88 transition hover:border-cyan-300/40 hover:bg-white/[0.08]"
              >
                Enviar por email
              </a>
              <a
                href="#servicios"
                className="inline-flex h-12 items-center justify-center rounded-full border border-cyan-300/22 bg-cyan-300/10 px-5 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-300/14"
              >
                Ver Web Local Express
              </a>
            </div>
          </div>
        </section>

        <footer className="border-t border-white/8 pt-6 text-sm text-white/54">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p>Powered by IA · diseño web para negocios locales.</p>
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

      {showAssistantDemo ? (
        <>
      <div className="fixed bottom-2 right-2 z-30 flex flex-col items-end gap-2 sm:bottom-4 sm:right-4">
        <button
          type="button"
          onClick={openBot}
          className="group max-w-[calc(100vw-1rem)] rounded-full bg-[#061018]/88 p-0.5 text-left shadow-[0_12px_30px_rgba(0,0,0,0.26),inset_0_0_0_1px_rgba(103,232,249,0.18)] backdrop-blur-md transition hover:shadow-[0_12px_30px_rgba(0,0,0,0.26),inset_0_0_0_1px_rgba(103,232,249,0.34)] sm:max-w-[calc(100vw-1.5rem)]"
          aria-label="Abrir asistente orientativo"
        >
          <span className="flex items-center gap-1.5 rounded-full bg-cyan-300 px-2.5 py-1.5 text-[11px] font-semibold leading-tight text-[#041018] sm:gap-3 sm:px-4 sm:py-2.5 sm:text-sm">
            <span>Dudas rápidas</span>
            <span className="hidden rounded-full bg-[#041018]/10 px-2 py-1 text-[10px] uppercase tracking-[0.14em] sm:inline-flex">
              Respuestas orientativas
            </span>
          </span>
        </button>
        <a
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden h-10 items-center justify-center rounded-full bg-white/[0.08] px-4 text-xs font-semibold text-white/82 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.12)] backdrop-blur-md transition hover:bg-white/[0.12] sm:inline-flex"
          aria-label="Abrir WhatsApp"
        >
          WhatsApp
        </a>
      </div>

      {isBotOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/58 px-2 py-2 backdrop-blur-sm sm:items-center sm:p-6"
          onMouseDown={closeBot}
          onTouchStart={closeBot}
          aria-label="Cerrar asistente orientativo"
          role="presentation"
        >
          <div
            className="flex max-h-[82vh] w-full max-w-lg flex-col overflow-hidden rounded-[1rem] border border-white/10 bg-[#061018] shadow-[0_24px_80px_rgba(0,0,0,0.42)] sm:max-h-[75vh] sm:rounded-[1.35rem]"
            onMouseDown={(event) => event.stopPropagation()}
            onTouchStart={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Asistente orientativo"
          >
            <div className="flex shrink-0 items-start justify-between gap-4 border-b border-white/8 px-4 py-3 sm:px-5 sm:py-4">
              <div>
                <p className="text-sm font-semibold text-white">Dudas rápidas</p>
                <p className="mt-1 text-xs text-cyan-100/78">Respuestas orientativas · No sustituye atención humana</p>
              </div>
              <button
                type="button"
                onClick={closeBot}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/[0.08] text-lg font-semibold text-white transition hover:bg-white/[0.13]"
                aria-label="Cerrar asistente orientativo"
              >
                ×
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-3 py-3 sm:px-5 sm:py-5">
              <div className="rounded-xl bg-white/[0.06] px-3 py-2.5 text-sm leading-6 text-white/82 sm:px-4 sm:py-3">
                Respuestas orientativas. Para una propuesta real, pide diagnóstico gratis.
              </div>

              <div className="mt-4 flex flex-wrap gap-1.5 sm:mt-5 sm:gap-2">
                {quickQuestions.map((item) => (
                  <button
                    key={item.question}
                    type="button"
                    onClick={() => sendBotMessage(item.question)}
                    className="rounded-full bg-white/[0.06] px-3 py-1.5 text-left text-xs font-medium text-white/78 transition hover:bg-white/[0.1] sm:px-4 sm:py-2 sm:text-sm"
                  >
                    {item.question}
                  </button>
                ))}
              </div>

              <div className="mt-4 space-y-3 sm:mt-5">
                {chatMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`max-w-[92%] rounded-2xl px-3 py-2.5 text-sm leading-6 sm:px-4 sm:py-3 ${
                      message.role === 'user'
                        ? 'ml-auto rounded-tr-sm bg-cyan-300 text-[#041018]'
                        : 'rounded-tl-sm bg-white/[0.07] text-white/84'
                    }`}
                  >
                    {message.text}
                  </div>
                ))}
              </div>

              <p className="mt-5 text-xs leading-5 text-white/46">
                Respuestas orientativas. No sustituye atención humana.
              </p>
            </div>

            <form
              onSubmit={handleChatSubmit}
              className="flex shrink-0 gap-2 border-t border-white/8 p-3 sm:p-4"
            >
              <input
                type="text"
                value={chatDraft}
                onChange={(event) => setChatDraft(event.target.value)}
                placeholder="Escribe tu pregunta"
                className="min-w-0 flex-1 rounded-full border border-white/10 bg-white/[0.06] px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/40 focus:border-cyan-300/50 focus:bg-white/[0.09]"
              />
              <button
                type="submit"
                disabled={!chatDraft.trim()}
                className="rounded-full bg-cyan-300 px-4 py-3 text-sm font-semibold text-[#041018] transition hover:bg-cyan-200 disabled:cursor-not-allowed disabled:opacity-45 sm:px-5"
              >
                Enviar
              </button>
            </form>
          </div>
        </div>
      ) : null}
        </>
      ) : null}
    </main>
  );
}
