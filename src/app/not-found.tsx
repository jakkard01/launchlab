import Link from "next/link";
import { buildWhatsappLink, siteConfig } from "../lib/site";

export default function NotFound() {
  return (
    <main className="min-h-screen w-full px-4 pb-20 pt-28 sm:px-6 lg:px-8">
      <section className="mx-auto w-full max-w-4xl rounded-3xl border border-white/10 bg-black/70 p-10 text-center shadow-xl">
        <p className="text-xs uppercase tracking-[0.4em] text-cyan-300/80">
          404
        </p>
        <h1 className="mt-4 text-4xl font-semibold text-white">
          Esta página no existe
        </h1>
        <p className="mt-4 text-base text-slate-300">
          Si necesitas ayuda para encontrar lo que buscas, escríbenos por
          WhatsApp o vuelve al inicio.
        </p>
        <p className="mt-2 text-xs text-slate-400">
          Si el enlace estaba en la web, avísanos y lo corregimos rápido.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <a
            href={buildWhatsappLink("404")}
            className="rounded-full bg-emerald-400 px-6 py-3 text-center text-sm font-semibold text-black transition hover:bg-emerald-300"
            target="_blank"
            rel="noopener noreferrer"
          >
            Hablar por WhatsApp
          </a>
          <Link
            href="/"
            className="rounded-full border border-white/20 px-6 py-3 text-center text-sm font-semibold text-white/90 transition hover:border-cyan-300/60"
          >
            Volver a {siteConfig.brand}
          </Link>
        </div>
      </section>
    </main>
  );
}
