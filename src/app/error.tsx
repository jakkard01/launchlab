"use client";

import Link from "next/link";
import { buildWhatsappLink, siteConfig } from "../lib/site";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="mx-auto flex min-h-[70vh] w-full max-w-3xl flex-col items-start justify-center px-6 py-20 text-white">
      <p className="text-xs uppercase tracking-[0.4em] text-cyan-300/80">Algo salió mal</p>
      <h1 className="mt-3 text-3xl font-semibold">No pudimos cargar esta página</h1>
      <p className="mt-4 text-sm text-slate-300">
        Intenta recargar o vuelve al inicio. Si necesitas ayuda inmediata, escríbenos por WhatsApp.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <a
          href={buildWhatsappLink("error")}
          className="rounded-full bg-emerald-400 px-6 py-3 text-center text-sm font-semibold text-black transition hover:bg-emerald-300"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Abrir WhatsApp Business"
        >
          WhatsApp Business: {siteConfig.whatsapp.phone}
        </a>
        <Link
          href="/"
          className="rounded-full border border-white/20 px-6 py-3 text-center text-sm font-semibold text-white/80 transition hover:border-cyan-300/60"
        >
          Volver a Home
        </Link>
        <button
          onClick={reset}
          className="rounded-full border border-cyan-300/40 px-6 py-3 text-center text-sm font-semibold text-cyan-100 transition hover:bg-cyan-400 hover:text-black"
        >
          Reintentar
        </button>
      </div>
    </main>
  );
}
