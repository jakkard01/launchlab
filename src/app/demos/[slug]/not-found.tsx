import Link from "next/link";
import { buildWhatsappLink, siteConfig } from "../../../lib/site";

export default function DemoNotFound() {
  return (
    <main className="min-h-screen w-full px-4 pb-20 pt-28 sm:px-6 lg:px-8">
      <section className="mx-auto w-full max-w-4xl rounded-3xl border border-white/10 bg-black/70 p-10 text-center shadow-xl">
        <p className="text-xs uppercase tracking-[0.4em] text-cyan-300/80">
          Demo no encontrada
        </p>
        <h1 className="mt-4 text-3xl font-semibold text-white">
          Esta demo no está disponible
        </h1>
        <p className="mt-4 text-base text-slate-300">
          Podemos preparar una demo similar para tu negocio.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <a
            href={buildWhatsappLink("demos_not_found")}
            className="rounded-full bg-emerald-400 px-6 py-3 text-center text-sm font-semibold text-black transition hover:bg-emerald-300"
            target="_blank"
            rel="noopener noreferrer"
          >
            Hablar por WhatsApp
          </a>
          <Link
            href="/demos"
            className="rounded-full border border-white/20 px-6 py-3 text-center text-sm font-semibold text-white/90 transition hover:border-cyan-300/60"
          >
            Volver a {siteConfig.brand}
          </Link>
        </div>
      </section>
    </main>
  );
}
