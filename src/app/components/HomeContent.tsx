import Image from 'next/image';

const WHATSAPP_NUMBER = '34911528753';
const WHATSAPP_LINK =
  `https://wa.me/${WHATSAPP_NUMBER}?text=Hola%20Powered%20by%20IA,%20quiero%20hablar%20sobre%20una%20demo%20o%20soluci%C3%B3n%20para%20mi%20negocio.`;
const CONTACT_EMAIL = 'poweredbyiaoficial@gmail.com';
const RYS_LINK = 'https://www.rysminimarket.com/';
const buildWhatsAppLink = (message: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
const buildMailtoLink = (subject: string, body: string) =>
  `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

const serviceCards = [
  {
    title: 'Web rápida para negocio local',
    body:
      'Consigue una web clara, móvil y lista para recibir mensajes, mostrar tus servicios y dar una imagen profesional sin complicarte.',
    support: 'Para comercios, bares, restaurantes, minimarkets, peluquerías, talleres y pequeños negocios.',
    price: 'Desde 350 €',
    cta: 'Quiero esto',
    href: buildWhatsAppLink('Hola, quiero una web rápida para mi negocio local.'),
  },
  {
    title: 'Mejora tu web actual',
    body:
      'Si tu web ya existe pero no transmite bien, la reorganizo para que sea más clara, más útil y más efectiva en móvil.',
    support: 'Para negocios que ya tienen web pero la experiencia es floja o no convierte bien.',
    price: 'Desde 180 €',
    cta: 'Quiero esto',
    href: buildWhatsAppLink('Hola, quiero mejorar la web que ya tengo para que convierta mejor.'),
  },
  {
    title: 'Automatiza la entrada de contactos',
    body:
      'Conecto tu formulario para que cada contacto entre de forma ordenada, quede registrado y no se pierda por el camino.',
    support: 'Formulario + Google Sheets + alertas + automatización básica.',
    price: 'Desde 180 €',
    cta: 'Quiero esto',
    href: buildWhatsAppLink('Hola, quiero automatizar la entrada de contactos de mi web.'),
  },
];

const demos = [
  {
    title: 'Powered by IA',
    body: 'Web real orientada a presentación de servicios digitales y propuesta comercial.',
    role: 'Dirección comercial, estructura web y ejecución del producto.',
    desktopImage: '/imagenes/pbidesk.jpeg',
    mobileImage: '/imagenes/pbiamov.jpeg',
    href: '#inicio',
    cta: 'Ver proyecto',
  },
  {
    title: 'RYS Minimarket',
    body: 'Tienda online y operación web con foco en navegación, producto y experiencia funcional.',
    role: 'Definición operativa, validación funcional y mejora del flujo de tienda/admin.',
    desktopImage: '/imagenes/rysdesk.jpeg',
    mobileImage: '/imagenes/rysmov.jpeg',
    href: RYS_LINK,
    cta: 'Ver tienda',
  },
];

const processSteps = [
  {
    title: 'Te escucho',
    body: 'Qué necesitas, qué vendes, qué te falta.',
  },
  {
    title: 'Te propongo la solución',
    body: 'Te digo qué tiene sentido hacer y qué no.',
  },
  {
    title: 'Lo montamos',
    body: 'Diseño, ajustes, revisión y entrega.',
  },
  {
    title: 'Lo dejas funcionando',
    body: 'Tu web o flujo queda listo para usar.',
  },
];

const priceItems = [
  {
    title: 'Web local básica',
    price: 'Desde 350 €',
    body: 'Para una presencia clara, móvil y lista para recibir mensajes sin complicarte.',
  },
  {
    title: 'Mejora de web existente',
    price: 'Desde 180 €',
    body: 'Para ordenar una web que ya existe y hacerla más útil en móvil.',
  },
  {
    title: 'Captura automática de contactos',
    price: 'Desde 180 €',
    body: 'Para registrar contactos de forma ordenada y no perder oportunidades.',
  },
];

const trust = [
  'Enfoque práctico y mobile-first',
  'Menos humo visual, más sistema comercial',
  'Iteraciones cortas con cambios medibles',
];

export default function HomeContent() {
  return (
    <main
      className="pbia-home relative isolate overflow-hidden bg-[#07111a] text-white"
      style={{
        backgroundImage:
          'linear-gradient(180deg, rgba(7, 17, 26, 0.32) 0%, rgba(7, 17, 26, 0.52) 28%, rgba(7, 17, 26, 0.78) 100%), url(/imagenes/fondo/tu-fondo.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.14),transparent_28%),radial-gradient(circle_at_84%_14%,rgba(96,165,250,0.11),transparent_18%),linear-gradient(180deg,rgba(7,17,26,0.03)_0%,rgba(7,17,26,0.12)_40%,rgba(7,17,26,0.26)_100%)]" />

      <header className="sticky top-0 z-30 bg-[linear-gradient(180deg,rgba(7,17,26,0.22),rgba(7,17,26,0.04))] backdrop-blur-[2px]">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <a href="#inicio" className="text-sm font-semibold tracking-[0.18em] text-white/88">
            Powered by <span className="text-cyan-300">IA</span>
          </a>
          <div className="flex items-center gap-2">
            <a
              href="#proyectos"
              className="inline-flex h-10 items-center rounded-full border border-white/12 bg-white/[0.03] px-4 text-sm font-medium text-white/84 transition hover:border-cyan-300/40 hover:bg-white/[0.08] hover:text-white"
            >
              Ver proyectos
            </a>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 items-center rounded-full bg-cyan-300 px-4 text-sm font-semibold text-[#041018] shadow-[0_10px_32px_rgba(34,211,238,0.22)] transition hover:bg-cyan-200"
            >
              Hablar por WhatsApp
            </a>
          </div>
        </div>
      </header>

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-20 px-4 pb-20 pt-10 sm:px-6 sm:pb-28 sm:pt-14">
        <section
          id="inicio"
          className="grid gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:items-center"
        >
          <div className="relative max-w-3xl">
            <div className="pointer-events-none absolute -inset-x-4 -inset-y-6 rounded-[2rem] bg-[linear-gradient(180deg,rgba(7,17,26,0.34),rgba(7,17,26,0.18))] blur-2xl sm:-inset-x-8" />
            <span className="inline-flex rounded-full bg-cyan-300/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-200 shadow-[inset_0_0_0_1px_rgba(103,232,249,0.16)]">
              Sistemas comerciales con IA
            </span>
            <h1 className="relative mt-5 max-w-3xl text-[2.6rem] font-semibold leading-[0.98] tracking-[-0.05em] text-white drop-shadow-[0_10px_28px_rgba(0,0,0,0.42)] sm:text-5xl lg:text-[4.4rem]">
              Sistemas comerciales con IA para captar, responder y convertir mejor.
            </h1>
            <p className="relative mt-5 max-w-2xl text-base leading-7 text-white/82 drop-shadow-[0_6px_18px_rgba(0,0,0,0.34)] sm:text-[1.1rem]">
              Aclaramos qué estás vendiendo, ordenamos cómo respondes y dejamos una ruta comercial más simple para convertir mejor. Después sumamos bots, automatizaciones o demos solo cuando ayudan de verdad.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center justify-center rounded-full bg-cyan-300 px-6 text-sm font-semibold text-[#041018] shadow-[0_18px_42px_rgba(34,211,238,0.24)] transition hover:bg-cyan-200"
              >
                Hablar por WhatsApp
              </a>
              <a
                href="#proyectos"
                className="inline-flex h-12 items-center justify-center rounded-full border border-white/14 bg-white/[0.03] px-6 text-sm font-semibold text-white/88 transition hover:border-cyan-300/40 hover:bg-white/[0.08]"
              >
                Ver proyectos
              </a>
            </div>
            <div className="mt-8 flex flex-wrap gap-2.5">
              {trust.map((item) => (
                <span
                  key={item}
                  className="rounded-full bg-black/16 px-3 py-2 text-xs font-medium text-white/74 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.07)] backdrop-blur-[1px]"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="relative lg:pl-10">
            <div className="pointer-events-none absolute -left-10 top-8 h-36 w-36 rounded-full bg-cyan-300/12 blur-3xl" />
            <div className="pointer-events-none absolute right-6 top-2 h-48 w-48 rounded-full bg-sky-400/10 blur-3xl" />
            <div className="pointer-events-none absolute left-10 top-14 hidden h-28 w-28 rounded-full bg-white/6 blur-3xl sm:block" />
            <div className="relative">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                <Image
                  src="/imagenes/perfil/mifoto.jpg"
                  alt="Foto de perfil de Powered by IA"
                  width={176}
                  height={176}
                  className="h-32 w-32 rounded-full object-cover shadow-[0_26px_74px_rgba(0,0,0,0.34)] ring-1 ring-white/16 sm:h-40 sm:w-40"
                  priority
                />
                <div className="relative max-w-md rounded-[1.5rem] bg-[linear-gradient(180deg,rgba(7,17,26,0.24),rgba(7,17,26,0.08))] px-4 py-3 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05)] backdrop-blur-[2px]">
                  <div className="pointer-events-none absolute -left-4 top-7 hidden h-px w-10 bg-gradient-to-r from-cyan-300/45 to-transparent sm:block" />
                  <p className="text-xs uppercase tracking-[0.26em] text-cyan-200/78">Powered by IA</p>
                  <p className="mt-2 text-2xl font-semibold leading-tight text-white drop-shadow-[0_8px_20px_rgba(0,0,0,0.32)]">
                    Dirección comercial y ejecución en el mismo flujo
                  </p>
                  <p className="mt-3 max-w-md text-sm leading-6 text-white/78">
                    Una sola dirección para ordenar mensaje, sistema y siguiente paso sin separar estrategia, ejecución y conversión.
                  </p>
                </div>
              </div>
              <div className="mt-10 grid gap-5">
                <div className="border-l border-cyan-300/32 pl-4">
                  <p className="text-sm font-semibold text-white">Mensaje principal claro</p>
                  <p className="mt-1 text-sm leading-6 text-white/74">
                    Qué haces, qué problema resuelves y cuál es la siguiente acción.
                  </p>
                </div>
                <div className="border-l border-white/12 pl-4">
                  <p className="text-sm font-semibold text-white">Capacidades secundarias con criterio</p>
                  <p className="mt-1 text-sm leading-6 text-white/74">
                    Bots, automatizaciones y demos entran cuando refuerzan la conversión, no para crear bazar.
                  </p>
                </div>
                <div className="border-l border-white/12 pl-4">
                  <p className="text-sm font-semibold text-white">Cierre con acción real</p>
                  <p className="mt-1 text-sm leading-6 text-white/74">
                    WhatsApp como ruta principal y demos como prueba de apoyo.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="que-hacemos" className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-cyan-200">Qué hacemos</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
              Ordenamos captación, respuesta y conversión en un solo sistema comercial.
            </h2>
          </div>
          <div className="max-w-2xl border-l border-white/10 pl-5">
            <p className="text-base leading-7 text-white/78">
              Hacemos que la propuesta se entienda rápido, que la respuesta llegue ordenada y que el siguiente paso sea simple.
            </p>
          </div>
        </section>

        <section id="servicios" className="space-y-5">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-cyan-200">Servicios principales</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
              Tres ofertas claras para resolver lo que más mueve un negocio local.
            </h2>
          </div>
          <div className="grid gap-4 lg:grid-cols-3">
            {serviceCards.map((service) => (
              <article
                key={service.title}
                className="flex h-full flex-col rounded-[1.35rem] bg-[linear-gradient(180deg,rgba(7,17,26,0.14),rgba(7,17,26,0.06))] p-5 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05)] backdrop-blur-[1px]"
              >
                <span className="block h-px w-14 bg-cyan-300/55" />
                <h3 className="mt-4 text-lg font-semibold text-white">{service.title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/80">{service.body}</p>
                <p className="mt-4 text-sm leading-6 text-cyan-100/86">{service.support}</p>
                <div className="mt-auto pt-5">
                  <div className="flex items-end justify-between gap-3">
                    <p className="text-sm uppercase tracking-[0.2em] text-white/46">Precio</p>
                    <p className="text-lg font-semibold text-white">{service.price}</p>
                  </div>
                  <a
                    href={service.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex h-11 w-full items-center justify-center rounded-full bg-cyan-300 px-4 text-sm font-semibold text-[#041018] shadow-[0_14px_30px_rgba(34,211,238,0.18)] transition hover:bg-cyan-200"
                  >
                    {service.cta}
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="precios" className="space-y-5">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-cyan-200">Precios</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
              Servicios claros, precios orientativos
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/76 sm:text-base">
              Rangos reales para filtrar curiosos y dar una referencia rápida antes de hablar.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {priceItems.map((item) => (
              <article
                key={item.title}
                className="rounded-[1.35rem] bg-[linear-gradient(180deg,rgba(7,17,26,0.14),rgba(7,17,26,0.06))] p-5 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05)] backdrop-blur-[1px]"
              >
                <span className="block h-px w-14 bg-cyan-300/55" />
                <h3 className="mt-4 text-base font-semibold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/76">{item.body}</p>
                <p className="mt-5 text-lg font-semibold text-white">{item.price}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="proyectos" className="scroll-mt-24 space-y-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-cyan-200">Prueba real</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
                Proyectos reales
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-white/76 sm:text-base">
                Son casos reales de trabajo. Powered by IA abre la lista como proyecto activo y RYS Minimarket aporta autoridad funcional sin comerse la marca principal.
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
          <div className="grid gap-4 lg:grid-cols-2">
            {demos.map((demo) => (
              <a
                key={demo.title}
                href={demo.href}
                target={demo.href.startsWith('http') ? '_blank' : undefined}
                rel={demo.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="group block rounded-[1.4rem] bg-[linear-gradient(180deg,rgba(8,18,27,0.14),rgba(8,18,27,0.04))] p-5 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)] backdrop-blur-[1px] transition hover:shadow-[inset_0_0_0_1px_rgba(103,232,249,0.22)]"
              >
                <p className="text-xs uppercase tracking-[0.24em] text-white/45">
                  {demo.title === 'Powered by IA' ? 'Proyecto activo' : 'Caso real en producción'}
                </p>
                <h3 className="mt-2 text-lg font-semibold text-white">{demo.title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/76">{demo.body}</p>
                <div className="mt-5 grid gap-4 md:grid-cols-[1.35fr_0.65fr]">
                  <figure className="overflow-hidden rounded-[1.15rem] bg-black/20 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05)]">
                    <div className="relative aspect-[16/10] w-full">
                      <Image
                        src={demo.desktopImage}
                        alt={`Captura desktop de ${demo.title}`}
                        fill
                        sizes="(min-width: 768px) 55vw, 100vw"
                        className="object-cover object-top"
                      />
                    </div>
                    <figcaption className="px-3 py-2 text-[11px] uppercase tracking-[0.2em] text-white/50">
                      Captura desktop
                    </figcaption>
                  </figure>
                  <div className="grid gap-4">
                    <figure className="overflow-hidden rounded-[1.15rem] bg-black/20 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05)]">
                      <div className="relative aspect-[9/16] w-full">
                        <Image
                          src={demo.mobileImage}
                          alt={`Captura móvil de ${demo.title}`}
                          fill
                          sizes="(min-width: 768px) 22vw, 100vw"
                          className="object-cover object-top"
                        />
                      </div>
                      <figcaption className="px-3 py-2 text-[11px] uppercase tracking-[0.2em] text-white/50">
                        Captura móvil
                      </figcaption>
                    </figure>
                    <div className="rounded-[1.15rem] bg-white/[0.03] px-4 py-4 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05)]">
                      <p className="text-[11px] uppercase tracking-[0.2em] text-white/46">Mi papel</p>
                      <p className="mt-2 text-sm leading-6 text-white/74">{demo.role}</p>
                    </div>
                  </div>
                </div>
                <span className="mt-5 inline-flex items-center text-sm font-semibold text-cyan-200 transition group-hover:text-cyan-100">
                  {demo.cta}
                </span>
              </a>
            ))}
          </div>
        </section>

        <section id="como-trabajamos" className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-cyan-200">Enfoque</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
              Trabajo con enfoque práctico
            </h2>
          </div>
          <div className="space-y-4 rounded-[1.45rem] bg-[linear-gradient(180deg,rgba(7,17,26,0.12),rgba(7,17,26,0.05))] p-5 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05)] backdrop-blur-[1px]">
            <p className="text-sm leading-7 text-white/80 sm:text-base">
              Ayudo a pequeños negocios y proyectos a tener una presencia online más clara, funcional y útil. Mi enfoque combina producto, validación, mejora web y automatización práctica para resolver necesidades reales sin vender humo.
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              {processSteps.map((step, index) => (
                <article
                  key={step.title}
                  className="flex gap-4 rounded-[1.35rem] bg-[linear-gradient(180deg,rgba(7,17,26,0.14),rgba(7,17,26,0.06))] px-4 py-4 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05)] backdrop-blur-[1px]"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cyan-300/92 text-sm font-semibold text-[#041018] shadow-[0_10px_28px_rgba(34,211,238,0.2)]">
                    {index + 1}
                  </span>
                  <div className="pt-0.5">
                    <p className="text-sm font-semibold text-white">{step.title}</p>
                    <p className="mt-1 text-sm leading-6 text-white/78">{step.body}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="quien-esta-detras" className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-cyan-200">Quién está detrás</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
              Dirección comercial, criterio visual y ejecución directa.
            </h2>
          </div>
          <div className="space-y-4 border-l border-white/10 pl-5 text-sm leading-7 text-white/78 sm:text-base">
            <p>
              Powered by IA construye sistemas comerciales que se entienden rápido, transmiten seriedad y empujan a una acción concreta. La prioridad no es acumular servicios, sino dejar una base que ayude a captar, responder y convertir mejor.
            </p>
            <p>
              El trabajo mezcla mensaje, criterio comercial y ejecución técnica dentro del mismo flujo. Menos piezas sueltas y más dirección clara para mover al cliente hacia la conversación correcta.
            </p>
          </div>
        </section>

        <section
          id="contacto"
          className="rounded-[2rem] bg-[linear-gradient(180deg,rgba(34,211,238,0.1),rgba(8,18,27,0.1))] px-5 py-8 shadow-[inset_0_0_0_1px_rgba(103,232,249,0.14)] backdrop-blur-[2px] sm:px-7 sm:py-10"
        >
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.24em] text-cyan-200">CTA final</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
              ¿Tienes un negocio y quieres una web clara o mejorar la que ya tienes?
            </h2>
            <p className="mt-4 text-base leading-7 text-white/80">
              Cuéntame qué necesitas y te diré qué tendría sentido hacer.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center justify-center rounded-full bg-cyan-300 px-5 text-sm font-semibold text-[#041018] shadow-[0_18px_42px_rgba(34,211,238,0.24)] transition hover:bg-cyan-200"
              >
                Hablar por WhatsApp
              </a>
              <a
                href={buildMailtoLink(
                  'Formulario PBIA',
                  'Hola, quiero dejarte mi caso por formulario. Necesito que revises mi web o me propongas una web nueva.',
                )}
                className="inline-flex h-12 items-center justify-center rounded-full border border-white/14 bg-white/[0.03] px-5 text-sm font-semibold text-white/88 transition hover:border-cyan-300/40 hover:bg-white/[0.08]"
              >
                Formulario
              </a>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="inline-flex h-12 items-center justify-center rounded-full border border-cyan-300/22 bg-cyan-300/10 px-5 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-300/14"
              >
                Email
              </a>
            </div>
          </div>
        </section>
      </div>

      <a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 z-40 hidden h-12 items-center justify-center rounded-full bg-cyan-300/96 px-4 text-sm font-semibold text-[#041018] shadow-[0_14px_32px_rgba(0,0,0,0.24)] transition hover:bg-cyan-200 sm:inline-flex"
        aria-label="Abrir WhatsApp"
      >
        WhatsApp
      </a>
    </main>
  );
}
