const WHATSAPP_LINK =
  'https://wa.me/?text=Hola%20Powered%20by%20IA,%20quiero%20hablar%20sobre%20una%20demo%20o%20soluci%C3%B3n%20para%20mi%20negocio.';

const services = [
  {
    title: 'Landing y demos que convierten',
    body: 'Páginas claras, más creíbles y pensadas para que el cliente entienda rápido qué haces y cómo contactarte.',
  },
  {
    title: 'Automatización útil',
    body: 'Procesos, formularios y flujos simples para responder mejor, ordenar leads y reducir fricción operativa.',
  },
  {
    title: 'Experiencias con IA aterrizadas',
    body: 'Soluciones con IA que se ven bien, se entienden fácil y tienen un objetivo comercial real.',
  },
];

const demos = [
  {
    title: 'Demo comercial',
    body: 'Una experiencia para mostrar mejor tu oferta, ordenar la navegación y llevar a una acción clara.',
  },
  {
    title: 'Demo operativa',
    body: 'Un flujo para simplificar respuestas, pedidos o seguimiento sin meter una plataforma pesada.',
  },
  {
    title: 'Demo de validación rápida',
    body: 'Una versión mínima y presentable para probar si una idea convence antes de invertir más.',
  },
];

const process = [
  'Entendemos qué estás vendiendo y dónde se pierde claridad.',
  'Diseñamos una versión más simple, más creíble y más enfocada a conversión.',
  'La dejamos lista para enseñar, validar o usar con clientes reales.',
];

const trust = [
  'Enfoque práctico y mobile-first',
  'Menos humo visual, más claridad comercial',
  'Iteraciones cortas con cambios visibles',
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
              IA aplicada con foco comercial
            </span>
            <h1 className="mt-4 max-w-3xl text-[2.35rem] font-semibold leading-[1.02] tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl">
              Webs, demos y experiencias con IA para vender con más claridad y menos ruido.
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-white/72 sm:text-lg">
              Powered by IA ayuda a convertir ideas en presentaciones digitales más claras, más creíbles y más fáciles de usar en móvil. Menos bloques sueltos. Más foco, más confianza y una acción principal bien definida.
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
                    Qué haces, para quién y cuál es la siguiente acción.
                  </p>
                </div>
                <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                  <p className="text-sm font-semibold text-white">Servicios ordenados</p>
                  <p className="mt-1 text-sm leading-6 text-white/68">
                    Menos competencia interna entre bloques, más foco en conversión.
                  </p>
                </div>
                <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                  <p className="text-sm font-semibold text-white">Cierre con acción real</p>
                  <p className="mt-1 text-sm leading-6 text-white/68">
                    WhatsApp para hablar y demos para validar rápido si encaja.
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
              Convertimos ideas digitales en experiencias más claras, más útiles y más vendibles.
            </h2>
          </div>
          <div className="rounded-[1.6rem] border border-white/10 bg-white/[0.04] p-5">
            <p className="text-base leading-7 text-white/74">
              No se trata solo de “meter IA”. Se trata de presentar mejor una oferta, simplificar la navegación, reducir dudas y dejar una ruta de contacto más directa. El foco está en claridad comercial, percepción premium y acción real.
            </p>
          </div>
        </section>

        <section id="servicios" className="space-y-5">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-cyan-200">Servicios principales</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
              Lo esencial para que tu presencia digital convenza mejor.
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
                Tipos de demo para enseñar valor sin perder al cliente.
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-white/66 sm:text-base">
                No son piezas infladas ni promesas vacías. Son formatos de demo que ayudan a mostrar mejor una oferta, validar una idea o aterrizar una experiencia antes de invertir más.
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
              Un proceso corto, visible y fácil de validar.
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
              Powered by IA busca construir experiencias digitales que se entiendan rápido, transmitan más valor y empujen a una acción clara. La prioridad no es impresionar con capas innecesarias, sino hacer que la web se vea mejor, se sienta más sólida y convierta con menos fricción.
            </p>
            <p>
              El trabajo mezcla criterio visual, lógica comercial y ejecución directa. Menos decoración gratuita. Más estructura, más claridad y una sensación más premium.
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
              Si quieres una web más clara, más creíble y mejor enfocada a conversión, empecemos por una conversación simple.
            </h2>
            <p className="mt-4 text-base leading-7 text-white/74">
              Escríbeme por WhatsApp, cuéntame qué estás vendiendo y te respondo con la ruta más razonable: demo, mejora puntual o una reestructuración más seria.
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
