import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { portfolio } from "../../content/portfolio";
import { services } from "../../content/catalog";
import { buildWhatsappLink } from "../../../lib/site";

type PageProps = {
  params: { slug: string };
};

export function generateMetadata({ params }: PageProps): Metadata {
  const item = portfolio.find((entry) => entry.slug === params.slug);

  if (!item) {
    return {
      title: "Caso no encontrado | Powered by IA",
      description: "El caso solicitado no esta disponible.",
    };
  }

  return {
    title: `${item.title} | Powered by IA`,
    description: item.summary,
  };
}

export default function PortfolioDetailPage({ params }: PageProps) {
  const item = portfolio.find((entry) => entry.slug === params.slug);

  if (!item) {
    notFound();
  }

  const related = services.filter((service) =>
    item.relatedServices.includes(service.slug)
  );

  return (
    <main className="min-h-screen w-full px-4 pb-20 pt-28 sm:px-6 lg:px-8">
      <section className="mx-auto w-full max-w-5xl">
        <Link
          href="/portfolio"
          className="text-sm font-semibold text-cyan-200 underline-offset-4 hover:underline"
        >
          Volver a portfolio
        </Link>

        <div className="mt-6 rounded-3xl border border-white/10 bg-black/65 p-8 shadow-xl">
          <h1 className="text-3xl font-semibold text-white md:text-4xl">
            {item.title}
          </h1>
          <p className="mt-3 text-base text-slate-200">{item.summary}</p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-black/60 p-6">
            <h2 className="text-lg font-semibold text-white">Problema</h2>
            <p className="mt-3 text-sm text-slate-300">{item.problem}</p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-black/60 p-6">
            <h2 className="text-lg font-semibold text-white">Solucion</h2>
            <p className="mt-3 text-sm text-slate-300">{item.solution}</p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-black/60 p-6">
            <h2 className="text-lg font-semibold text-white">Entregables</h2>
            <ul className="mt-4 space-y-3 text-sm text-slate-300">
              {item.deliverables.map((deliverable) => (
                <li key={deliverable} className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-cyan-300" />
                  <span>{deliverable}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-black/60 p-6">
            <h2 className="text-lg font-semibold text-white">Stack</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {item.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-white/10 bg-black/50 px-3 py-1 text-xs font-semibold text-slate-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
          <div className="rounded-3xl border border-white/10 bg-black/60 p-6">
            <h2 className="text-lg font-semibold text-white">Resultado esperado</h2>
            <p className="mt-3 text-sm text-slate-300">{item.expectedResult}</p>
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
              Te gustaria algo similar?
            </h2>
            <p className="mt-2 text-sm text-slate-300">
              Compartenos tu contexto y proponemos la siguiente iteracion.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href={buildWhatsappLink("portfolio_detail")}
              className="rounded-full border border-emerald-300/60 px-6 py-3 text-center text-sm font-semibold text-emerald-200 transition hover:bg-emerald-300 hover:text-black"
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp
            </a>
            <Link
              href="/contact?source=portfolio"
              className="rounded-full bg-cyan-400 px-6 py-3 text-center text-sm font-semibold text-black transition hover:bg-cyan-300"
            >
              Reservar llamada
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
