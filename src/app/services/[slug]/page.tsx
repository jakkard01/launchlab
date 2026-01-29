import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import GlyphBadge from "../../components/GlyphBadge";
import { services } from "../../content/catalog";

type PageProps = {
  params: { slug: string };
};

export function generateMetadata({ params }: PageProps): Metadata {
  const service = services.find((item) => item.slug === params.slug);

  if (!service) {
    return {
      title: "Servicio no encontrado | Powered by IA",
      description: "El servicio solicitado no esta disponible.",
    };
  }

  return {
    title: `${service.title} | Powered by IA`,
    description: service.summary,
  };
}

export default function ServiceDetailPage({ params }: PageProps) {
  const service = services.find((item) => item.slug === params.slug);

  if (!service) {
    notFound();
  }

  return (
    <main className="min-h-screen w-full px-4 pb-20 pt-28 sm:px-6 lg:px-8">
      <section className="mx-auto w-full max-w-5xl">
        <Link
          href="/services"
          className="text-sm font-semibold text-cyan-200 underline-offset-4 hover:underline"
        >
          Volver a servicios
        </Link>

        <div className="mt-6 rounded-3xl border border-white/10 bg-black/65 p-8 shadow-xl">
          <div className="inline-flex items-center gap-3 rounded-full border border-cyan-300/30 bg-black/70 px-3 py-1">
            <GlyphBadge glyph={service.glyph} />
            <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-cyan-100/90">
              {service.step}
            </span>
          </div>
          <h1 className="mt-4 text-3xl font-semibold text-white md:text-4xl">
            {service.title}
          </h1>
          <p className="mt-3 text-base text-slate-200">{service.summary}</p>
          <p className="mt-4 text-sm text-slate-300">{service.detail}</p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-black/60 p-6">
            <h2 className="text-lg font-semibold text-white">Que incluye</h2>
            <ul className="mt-4 space-y-3 text-sm text-slate-300">
              {service.bullets.map((bullet) => (
                <li key={bullet} className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-cyan-300" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl border border-white/10 bg-black/60 p-6">
            <h2 className="text-lg font-semibold text-white">Para quien</h2>
            <ul className="mt-4 space-y-3 text-sm text-slate-300">
              {service.forWho.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-cyan-300" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl border border-white/10 bg-black/60 p-6">
            <h2 className="text-lg font-semibold text-white">Entrega</h2>
            <ul className="mt-4 space-y-3 text-sm text-slate-300">
              {service.deliverables.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-cyan-300" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 rounded-3xl border border-cyan-400/30 bg-black/70 p-8 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-white">
              Listo para empezar?
            </h2>
            <p className="mt-2 text-sm text-slate-300">
              Escribenos por WhatsApp o agenda una llamada para definir el
              alcance.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href={service.ctaHref}
              className="rounded-full bg-emerald-400 px-6 py-3 text-center text-sm font-semibold text-black transition hover:bg-emerald-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              {service.ctaLabel}
            </a>
            <Link
              href="/contact?source=services_detail"
              className="rounded-full border border-white/20 px-6 py-3 text-center text-sm font-semibold text-white/80 transition hover:border-cyan-300/60"
            >
              Reservar llamada
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
