import Image from 'next/image';

const WHATSAPP_NUMBER = '34911528753';
const WHATSAPP_LINK =
  `https://wa.me/${WHATSAPP_NUMBER}?text=Hola%20Powered%20by%20IA,%20quiero%20hablar%20sobre%20una%20demo%20o%20soluci%C3%B3n%20para%20mi%20negocio.`;
const CONTACT_EMAIL = 'poweredbyiaoficial@gmail.com';
const RYS_LINK = '/RYSminisuper';

const services = [
  {
    title: 'Captar mejor',
    body: 'Landing, oferta y entrada comercial más claras para atraer mejores oportunidades.',
  },
  {
    title: 'Responder mejor',
    body: 'Bots, flujos y automatizaciones útiles para responder rápido y no perder leads por desorden.',
  },
  {
    title: 'Convertir mejor',
    body: 'Seguimiento y demos útiles para que el cliente entienda valor y avance con menos fricción.',
  },
];

const demos = [
  {
    title: 'RYS Mini Market',
    body: 'Caso real donde catálogo, pedido y WhatsApp trabajan dentro del mismo flujo comercial en móvil.',
    href: RYS_LINK,
    cta: 'Ver caso real',
  },
  {
    title: 'Bots, automatizaciones y demos guiadas',
    body: 'Recursos secundarios para responder, validar o ordenar mejor el negocio cuando el sistema principal ya está claro.',
    href: WHATSAPP_LINK,
    cta: 'Hablar sobre esto',
  },
];

const process = [
  {
    title: 'Aclaramos la entrada comercial',
    body: 'Vemos dónde se pierde atención, respuesta o intención de compra para dejar más claro qué vendes y qué debe pasar después.',
  },
  {
    title: 'Ordenamos el sistema útil',
    body: 'Definimos la versión más razonable para captar mejor, responder con más orden y sostener la conversación sin ruido extra.',
  },
  {
    title: 'Lo dejamos listo para usar',
    body: 'Se prueba, se valida y se deja preparado para crecer sin rehacer la base cada vez que quieras avanzar.',
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
              href="#demos"
              className="inline-flex h-10 items-center rounded-full border border-white/12 bg-white/[0.03] px-4 text-sm font-medium text-white/84 transition hover:border-cyan-300/40 hover:bg-white/[0.08] hover:text-white"
            >
              Ver demos
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
                href="#demos"
                className="inline-flex h-12 items-center justify-center rounded-full border border-white/14 bg-white/[0.03] px-6 text-sm font-semibold text-white/88 transition hover:border-cyan-300/40 hover:bg-white/[0.08]"
              >
                Ver demos
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
              Hacemos que la propuesta se entienda rápido, que la respuesta llegue mejor y que el cliente tenga más claro cómo avanzar.
            </p>
          </div>
        </section>

        <section id="servicios" className="space-y-5">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-cyan-200">Servicios principales</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
              Un sistema central con tres efectos claros: captar, responder y convertir mejor.
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {services.map((service) => (
              <article
                key={service.title}
                className="rounded-[1.2rem] bg-[linear-gradient(180deg,rgba(7,17,26,0.1),rgba(7,17,26,0.04))] p-5 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)] backdrop-blur-[1px]"
              >
                <span className="block h-px w-14 bg-cyan-300/55" />
                <h3 className="mt-4 text-lg font-semibold text-white">{service.title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/76">{service.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="demos" className="scroll-mt-24 space-y-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-cyan-200">Demos y casos</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
                RYS como caso real principal. Lo demás, como apoyo para validar rápido.
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-white/76 sm:text-base">
                Aquí no enseñamos juguetes. Mostramos un caso real y dejamos visibles las capacidades secundarias para validar mensaje, respuesta o automatización cuando hace falta.
              </p>
            </div>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center justify-center rounded-full border border-cyan-300/22 bg-cyan-300/10 px-5 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-300/14"
            >
              Pedir una demo
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
                  {demo.title === 'RYS Mini Market' ? 'Caso real' : 'Capacidades relacionadas'}
                </p>
                <h3 className="mt-2 text-lg font-semibold text-white">{demo.title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/76">{demo.body}</p>
                <span className="mt-5 inline-flex items-center text-sm font-semibold text-cyan-200 transition group-hover:text-cyan-100">
                  {demo.cta}
                </span>
              </a>
            ))}
          </div>
        </section>

        <section id="como-trabajamos" className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-cyan-200">Cómo trabajamos</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
              Un recorrido claro para pasar de idea dispersa a sistema comercial utilizable.
            </h2>
          </div>
          <div className="relative grid gap-4">
            <div className="pointer-events-none absolute bottom-6 left-[1.1rem] top-6 w-px bg-gradient-to-b from-cyan-300/0 via-cyan-300/28 to-cyan-300/0" />
            {process.map((step, index) => (
              <div
                key={step.title}
                className="relative flex gap-4 rounded-[1.35rem] bg-[linear-gradient(180deg,rgba(7,17,26,0.16),rgba(7,17,26,0.06))] px-4 py-4 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)] backdrop-blur-[1px]"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-cyan-300/92 text-sm font-semibold text-[#041018] shadow-[0_10px_28px_rgba(34,211,238,0.2)]">
                  {index + 1}
                </span>
                <div className="pt-0.5">
                  <p className="text-sm font-semibold text-white">{step.title}</p>
                  <p className="mt-1 text-sm leading-6 text-white/76">{step.body}</p>
                </div>
              </div>
            ))}
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
          className="rounded-[2rem] bg-[linear-gradient(180deg,rgba(34,211,238,0.08),rgba(8,18,27,0.08))] px-5 py-8 shadow-[inset_0_0_0_1px_rgba(103,232,249,0.11)] backdrop-blur-[2px] sm:px-7 sm:py-9"
        >
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.24em] text-cyan-200">CTA final</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
              Si quieres un sistema comercial más claro y más serio para vender mejor, empecemos por una conversación simple.
            </h2>
            <p className="mt-4 text-base leading-7 text-white/80">
              Escríbeme por WhatsApp, cuéntame qué estás vendiendo y te respondo con la ruta más razonable para captar mejor, responder con más orden o convertir con menos fricción.
            </p>
            <p className="mt-3 text-sm leading-6 text-white/68">
              El botón abre WhatsApp con un mensaje base listo para que el primer contacto sea rápido y directo.
            </p>
            <p className="mt-3 text-sm leading-6 text-white/76">
              También puedes escribir a{' '}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="font-medium text-cyan-200 underline underline-offset-4 transition hover:text-cyan-100"
              >
                {CONTACT_EMAIL}
              </a>
              {' '}si prefieres correo.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center justify-center rounded-full bg-cyan-300 px-6 text-sm font-semibold text-[#041018] shadow-[0_18px_42px_rgba(34,211,238,0.24)] transition hover:bg-cyan-200"
              >
                Hablar por WhatsApp
              </a>
              <a
                href="#demos"
                className="inline-flex h-12 items-center justify-center rounded-full border border-white/14 bg-white/[0.03] px-6 text-sm font-semibold text-white/88 transition hover:border-cyan-300/40 hover:bg-white/[0.08]"
              >
                Ver demos
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
