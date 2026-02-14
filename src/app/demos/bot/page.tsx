"use client";

import Link from "next/link";
import { buildWhatsappLink } from "../../../lib/site";
import BotSimulator from "./BotSimulator";
import FaqChatDemo from "./FaqChatDemo";

const whatsappLink = buildWhatsappLink("demo_bot");

export default function DemoBotPage() {
  return (
    <main className="min-h-screen w-full px-4 pb-20 pt-28 sm:px-6 lg:px-8">
      <section className="mx-auto w-full max-w-5xl">
        <p className="text-xs uppercase tracking-[0.4em] text-cyan-300/80">
          Demo FAQ Bot
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-white md:text-4xl">
          FAQ conversacional: respuestas claras y directas
        </h1>
        <p className="mt-4 max-w-2xl text-base text-slate-300">
          Demo UI sin IA. Respuestas predefinidas para guiar decisión de compra.
        </p>

        <div className="mt-8">
          <BotSimulator />
        </div>

        <div className="mt-10">
          <FaqChatDemo />
        </div>

        <div
          className="mt-8 flex flex-col gap-3 rounded-3xl border border-white/10 bg-black/60 p-6"
          data-fab-avoid
        >
          <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/80">
            CTA final
          </p>
          <p className="text-sm text-slate-300">
            ¿Listo para decidir? Te respondemos por WhatsApp o en una llamada.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href={whatsappLink}
              className="rounded-full bg-emerald-400 px-6 py-3 text-center text-sm font-semibold text-black transition hover:bg-emerald-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              Hablar por WhatsApp
            </a>
            <Link
              href="/contact?source=demos"
              className="rounded-full border border-white/20 px-6 py-3 text-center text-sm font-semibold text-white/80 transition hover:border-cyan-300/60"
            >
              Solicitar propuesta
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
