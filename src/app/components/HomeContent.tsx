const WHATSAPP_LINK =
  'https://wa.me/?text=Hola%20Powered%20by%20IA,%20quiero%20hablar%20sobre%20una%20demo%20o%20soluci%C3%B3n%20para%20mi%20negocio.';

const services = [
  {
    title: 'Sistema de captación',
    body: 'Una home o activo digital que explica mejor tu oferta, filtra mejor clientes y lleva a una acción principal clara.',
  },
  {
    title: 'Sistema de seguimiento',
    body: 'Flujos, formularios y automatizaciones útiles para responder más rápido, ordenar leads y no perder oportunidades por desorden.',
  },
  {
    title: 'Sistema de conversión',
    body: 'Demos, experiencias y capas con IA aterrizadas para que el cliente entienda valor, confíe más y avance.',
  },
];

const demos = [
  {
    title: 'Caso de captación',
    body: 'Una demo pensada para ordenar el mensaje, dejar una ruta comercial clara y mejorar la percepción del negocio desde el primer scroll.',
  },
  {
    title: 'Caso de seguimiento',
    body: 'Un flujo para responder mejor, confirmar interés y mover conversaciones reales sin depender de procesos rotos o demasiado manuales.',
  },
  {
    title: 'Caso de validación rápida',
    body: 'Una versión mínima, presentable y útil para probar si una idea comercial convence antes de escalarla.',
  },
];

const process = [
  'Entendemos qué estás vendiendo y dónde se pierde claridad.',
  'Diseñamos una versión más simple, más creíble y más enfocada a conversión.',
  'La dejamos lista para enseñar, validar o usar con clientes reales.',
];

const trust = [
  'Enfoque práctico y mobile-first',
  'Menos humo visual, más sistema comercial',
  'Iteraciones cortas con cambios medibles',
];

export default function HomeContent() {
  return (
    <main className="pbia-home relative overflow-hidden bg-[#07111a] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.18),transparent_32%),radial-gradient(circle_at_85%_15%,rgba(96,165,250,0.16),transparent_24%),linear-gradient(180deg,#07111a_0%,#0a1521_48%,#08121b_100%)]" />

      <header className="sticky top-0 z-30 border-b border-white/10 bg-[rgba(7,17,26,0.82)] backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <a href="#inicio" className="text-sm font-semibold tracking-[0.18em] text-white/88">
            Powered by <span className="text-cyan-300">IA</span>
          </a>
          <div className="flex items-center gap-2">
            <a
              href="#demos"
              className="inline-flex h-10 items-center rounded-full border border-white/14 px-4 text-sm font-medium text-white/84 transition hover:border-cyan-300/40 hover:text-white"
            >
              Ver demos
            </a>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 items-center rounded-full bg-cyan-300 px-4 text-sm font-semibold text-[#041018] transition hover:bg-cyan-200"
            >
              Hablar por WhatsApp
            </a>
          </div>
        </div>
      </header>

      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-16 px-4 pb-16 pt-8 sm:px-6 sm:pb-24 sm:pt-12">
        <section
          id="inicio"
          className="grid gap-8 rounded-[2rem] border border-white/10 bg-white/[0.04] px-5 py-6 shadow-[0_24px_80px_rgba(0,0,0,0.28)] sm:px-8 sm:py-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center"
        >
          <div>
            <span className="inline-flex rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-200">
              Sistemas comerciales con IA aplicada
            </span>
            <h1 className="mt-4 max-w-3xl text-[2.35rem] font-semibold leading-[1.02] tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl">
              Activos digitales y sistemas comerciales para captar mejor, dar seguimiento y convertir con más claridad.
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-white/72 sm:text-lg">
              Powered by IA no vende piezas sueltas ni ruido digital. Diseña sistemas comerciales: páginas, demos y flujos que ordenan el mensaje, elevan la percepción del negocio y empujan a una acción concreta.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center justify-center rounded-full bg-cyan-300 px-6 text-sm font-semibold text-[#041018] transition hover:bg-cyan-200"
              >
                Hablar por WhatsApp
              </a>
              <a
                href="#demos"
                className="inline-flex h-12 items-center justify-center rounded-full border border-white/14 px-6 text-sm font-semibold text-white/88 transition hover:border-cyan-300/40 hover:bg-white/[0.04]"
              >
                Ver demos
              </a>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {trust.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/12 bg-white/[0.03] px-3 py-2 text-xs font-medium text-white/70"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-cyan-300/18 bg-[linear-gradient(180deg,rgba(15,30,43,0.92),rgba(8,18,27,0.94))] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
            <div className="rounded-[1.4rem] border border-white/8 bg-[#09121b] p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.22em] text-cyan-200/80">Ruta clara</p>
                  <p className="mt-1 text-lg font-semibold text-white">Una home con mejor lectura comercial</p>
                </div>
                <span className="rounded-full border border-cyan-300/25 bg-cyan-300/10 px-3 py-1 text-[11px] font-semibold text-cyan-200">
                  Móvil primero
                </span>
              </div>
              <div className="mt-5 grid gap-3">
                <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                  <p className="text-sm font-semibold text-white">Mensaje principal claro</p>
                  <p className="mt-1 text-sm leading-6 text-white/68">
                    Qué sistema necesitas, para qué sirve y cuál es la siguiente acción.
                  </p>
                </div>
                <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                  <p className="text-sm font-semibold text-white">Oferta menos commodity</p>
                  <p className="mt-1 text-sm leading-6 text-white/68">
                    Menos “hago de todo”, más foco en captación, seguimiento y conversión.
                  </p>
                </div>
                <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                  <p className="text-sm font-semibold text-white">Cierre con acción real</p>
                  <p className="mt-1 text-sm leading-6 text-white/68">
                    WhatsApp para abrir conversación y demos para mostrar dirección real.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="que-hacemos" className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-cyan-200">Qué hacemos</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
              Convertimos ofertas dispersas en sistemas comerciales más claros, más creíbles y más útiles.
            </h2>
          </div>
          <div className="rounded-[1.6rem] border border-white/10 bg-white/[0.04] p-5">
            <p className="text-base leading-7 text-white/74">
              No se trata solo de meter IA ni de llenar una web de secciones. Se trata de construir un sistema comercial que capte atención, ordene seguimiento y haga más fácil convertir una visita en conversación o venta.
            </p>
          </div>
        </section>

        <section id="servicios" className="space-y-5">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-cyan-200">Servicios principales</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
              Tres capas para que tu presencia digital deje de verse como piezas sueltas.
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {services.map((service) => (
              <article
                key={service.title}
                className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5 shadow-[0_18px_48px_rgba(0,0,0,0.18)]"
              >
                <h3 className="text-lg font-semibold text-white">{service.title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/70">{service.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="demos" className="space-y-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-cyan-200">Demos y casos</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
                Casos y demos para probar dirección comercial antes de escalar.
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-white/66 sm:text-base">
                Aquí la demo no es entretenimiento. Es una herramienta para comprobar si el mensaje, la estructura y la ruta de contacto realmente ayudan a vender mejor.
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
          <div className="grid gap-4 lg:grid-cols-3">
            {demos.map((demo) => (
              <article
                key={demo.title}
                className="rounded-[1.5rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.03))] p-5"
              >
                <p className="text-xs uppercase tracking-[0.24em] text-white/45">Tipo de demo</p>
                <h3 className="mt-2 text-lg font-semibold text-white">{demo.title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/68">{demo.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="como-trabajamos" className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-cyan-200">Cómo trabajamos</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
              Un proceso corto para aterrizar el sistema antes de complicarlo.
            </h2>
          </div>
          <div className="grid gap-3">
            {process.map((step, index) => (
              <div
                key={step}
                className="flex gap-4 rounded-[1.4rem] border border-white/10 bg-white/[0.04] p-4"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-cyan-300 text-sm font-semibold text-[#041018]">
                  {index + 1}
                </span>
                <p className="pt-1 text-sm leading-6 text-white/72">{step}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="quien-esta-detras" className="grid gap-5 rounded-[1.8rem] border border-white/10 bg-white/[0.04] p-5 sm:p-7 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-cyan-200">Quién está detrás</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
              Dirección creativa y enfoque práctico para que esto no se quede en humo.
            </h2>
          </div>
          <div className="space-y-4 text-sm leading-7 text-white/72 sm:text-base">
            <p>
              Powered by IA busca construir activos digitales que se entiendan rápido, transmitan más autoridad y empujen a una acción concreta. La prioridad no es acumular servicios, sino ordenar sistemas comerciales que funcionen de verdad.
            </p>
            <p>
              El trabajo mezcla criterio visual, lógica comercial y ejecución directa. Menos commodity, menos bazar digital y más estructura útil para captar, seguir y convertir con mejor percepción.
            </p>
          </div>
        </section>

        <section
          id="contacto"
          className="rounded-[2rem] border border-cyan-300/16 bg-[linear-gradient(180deg,rgba(34,211,238,0.08),rgba(255,255,255,0.04))] px-5 py-7 shadow-[0_18px_60px_rgba(0,0,0,0.18)] sm:px-7 sm:py-8"
        >
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.24em] text-cyan-200">CTA final</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
              Si quieres un sistema comercial más claro y más serio para vender mejor, empecemos por una conversación simple.
            </h2>
            <p className="mt-4 text-base leading-7 text-white/74">
              Escríbeme por WhatsApp, cuéntame qué estás vendiendo y te respondo con la ruta más razonable: captar mejor, ordenar seguimiento o mejorar conversión sin llenar tu negocio de más ruido.
            </p>
            <p className="mt-3 text-sm leading-6 text-white/60">
              El botón abre WhatsApp con un mensaje base listo para que el primer contacto sea rápido y directo.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center justify-center rounded-full bg-cyan-300 px-6 text-sm font-semibold text-[#041018] transition hover:bg-cyan-200"
              >
                Hablar por WhatsApp
              </a>
              <a
                href="#demos"
                className="inline-flex h-12 items-center justify-center rounded-full border border-white/14 px-6 text-sm font-semibold text-white/88 transition hover:border-cyan-300/40 hover:bg-white/[0.04]"
              >
                Ver demos
              </a>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
