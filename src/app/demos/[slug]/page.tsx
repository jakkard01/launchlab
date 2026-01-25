import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import GlyphBadge from "../../components/GlyphBadge";
import { showcase } from "../../content/showcase";
import { services } from "../../content/catalog";

type PageProps = {
  params: { slug: string };
};

export function generateMetadata({ params }: PageProps): Metadata {
  const item = showcase.find((entry) => entry.slug === params.slug);

  if (!item) {
    return {
      title: "Demo no encontrada | Powered by IA",
      description: "La demo solicitada no esta disponible.",
    };
  }

  return {
    title: `${item.title} | Powered by IA`,
    description: item.summary,
  };
}

function usageSteps(type: string) {
  if (type === "landing") {
    return [
      "Revisa la narrativa y adapta el copy a tu oferta",
      "Sustituye logos y paleta visual",
      "Publica y mide conversion",
    ];
  }
  if (type === "automation") {
    return [
      "Conecta el flujo con tus fuentes de datos",
      "Define los disparadores y alertas",
      "Monitorea la ejecucion inicial",
    ];
  }
  if (type === "system") {
    return [
      "Define el alcance funcional del sistema",
      "Configura panel y permisos",
      "Ejecuta pruebas con casos reales",
    ];
  }

  return [
    "Entrena el bot con contenido base",
    "Prueba con escenarios reales",
    "Activa el canal de contacto",
  ];
}

function statusLabel(status: string) {
  if (status === "live") {
    return "Live";
  }
  if (status === "wip") {
    return "WIP";
  }
  return "Demo";
}

export default function DemoDetailPage({ params }: PageProps) {
  const item = showcase.find((entry) => entry.slug === params.slug);

  if (!item) {
    notFound();
  }

  const related = services.filter((service) =>
    item.relatedServices.includes(service.slug)
  );
  const steps = usageSteps(item.type);

  return (
    <main className="min-h-screen w-full px-4 pb-20 pt-28 sm:px-6 lg:px-8">
      <section className="mx-auto w-full max-w-5xl">
        <Link
          href="/demos"
          className="text-sm font-semibold text-cyan-200 underline-offset-4 hover:underline"
        >
          Volver a demos
        </Link>

        <div className="mt-6 rounded-3xl border border-white/10 bg-black/65 p-8 shadow-xl">
          <div className="inline-flex items-center gap-3 rounded-full border border-cyan-300/30 bg-black/70 px-3 py-1">
            <GlyphBadge glyph={item.glyph} />
            <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-cyan-100/90">
              {statusLabel(item.status)}
            </span>
          </div>
          <h1 className="mt-4 text-3xl font-semibold text-white md:text-4xl">
            {item.title}
          </h1>
          <p className="mt-3 text-base text-slate-200">{item.summary}</p>
          <p className="mt-4 text-sm text-slate-300">{item.detail}</p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-black/60 p-6">
            <h2 className="text-lg font-semibold text-white">Que es</h2>
            <p className="mt-3 text-sm text-slate-300">{item.detail}</p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-black/60 p-6">
            <h2 className="text-lg font-semibold text-white">Que resuelve</h2>
            <ul className="mt-4 space-y-3 text-sm text-slate-300">
              {item.tags.map((tag) => (
                <li key={tag} className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-cyan-300" />
                  <span>{tag}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border border-white/10 bg-black/60 p-6">
            <h2 className="text-lg font-semibold text-white">Como se usa</h2>
            <ul className="mt-4 space-y-3 text-sm text-slate-300">
              {steps.map((step) => (
                <li key={step} className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-cyan-300" />
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-10 rounded-3xl border border-white/10 bg-black/60 p-6">
            <h2 className="text-lg font-semibold text-white">
              Servicios relacionados
            </h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {related.map((service) => (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="rounded-2xl border border-white/10 bg-black/50 p-4 text-sm text-slate-300 transition hover:border-cyan-300/40"
                >
                  <p className="font-semibold text-white">{service.title}</p>
                  <p className="mt-2 text-xs text-slate-400">{service.summary}</p>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="mt-10 flex flex-col gap-4 rounded-3xl border border-cyan-400/30 bg-black/70 p-8 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-white">
              Quieres activar esta demo?
            </h2>
            <p className="mt-2 text-sm text-slate-300">
              Te ayudamos a personalizarla y conectarla a tu stack.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            {item.liveUrl && (
              <a
                href={item.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-emerald-300/60 px-6 py-3 text-center text-sm font-semibold text-emerald-200 transition hover:bg-emerald-300 hover:text-black"
              >
                Ver demo live
              </a>
            )}
            <Link
              href={item.status === "wip" ? "/contact?source=demos" : item.ctaHref}
              className="rounded-full bg-cyan-400 px-6 py-3 text-center text-sm font-semibold text-black transition hover:bg-cyan-300"
            >
              {item.status === "wip" ? "Pedir acceso" : "Reservar llamada"}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
