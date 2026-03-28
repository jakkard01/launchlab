import { headers } from "next/headers";
import Link from "next/link";
import { buildWhatsAppMessageLink } from "../lib/mo/whatsapp";

export default function NotFound() {
  const host = headers().get("host") ?? "";
  const hostname = host.split(":")[0].toLowerCase();
  const isRysHost =
    hostname === "rysminimarket.com" || hostname === "www.rysminimarket.com";

  if (isRysHost) {
    return (
      <main className="min-h-screen w-full bg-slate-950 px-4 pb-20 pt-20 text-slate-100 sm:px-6 lg:px-8">
        <section className="mx-auto w-full max-w-3xl rounded-3xl border border-white/10 bg-white/5 p-8 text-center shadow-xl">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-200/80">
            RYS Mini Market
          </p>
          <h1 className="mt-3 text-3xl font-semibold text-white">
            Esta ruta no existe
          </h1>
          <p className="mt-3 text-sm text-slate-300">
            Vuelve al inicio de RYS, abre el admin o escríbenos por WhatsApp.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/"
              className="rounded-full bg-emerald-300 px-6 py-3 text-sm font-semibold text-[#08110c]"
            >
              Volver al inicio
            </Link>
            <Link
              href="/admin/acceso"
              className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white/90"
            >
              Abrir admin
            </Link>
            <a
              href={buildWhatsAppMessageLink(
                "Hola RYS Mini Market, necesito ayuda para encontrar una ruta de la web."
              )}
              className="rounded-full border border-emerald-300/30 bg-emerald-400/10 px-6 py-3 text-sm font-semibold text-emerald-100"
              target="_blank"
              rel="noopener noreferrer"
            >
              Hablar por WhatsApp
            </a>
          </div>
        </section>
      </main>
    );
  }

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
            href={buildWhatsAppMessageLink(
              "Hola, necesito ayuda para encontrar una ruta de la web."
            )}
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
            Volver al inicio
          </Link>
        </div>
      </section>
    </main>
  );
}
