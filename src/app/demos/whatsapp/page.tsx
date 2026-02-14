"use client";

import ChatSimulator, { type ChatStep } from "../components/ChatSimulator";
import { buildWhatsappLink } from "../../../lib/site";

const steps: ChatStep[] = [
  {
    id: "name",
    prompt: "Hola, soy tu asistente. ¿Cómo te llamas?",
    type: "input",
    key: "name",
    placeholder: "Tu nombre",
    response: (value) => `Encantado, ${value}. ¿Qué tipo de negocio tienes?`,
    next: "business",
  },
  {
    id: "business",
    prompt: "Selecciona tu tipo de negocio:",
    type: "options",
    key: "business",
    options: ["Ecommerce", "Servicios", "Negocio local"],
    response: () => "¿Qué objetivo quieres priorizar?",
    next: "goal",
  },
  {
    id: "goal",
    prompt: "Objetivo principal:",
    type: "options",
    key: "goal",
    options: ["Más ventas", "Soporte 24/7", "Reservas"],
    response: (_, context) =>
      `Perfecto. ${context.name ?? "Tu equipo"} busca ${context.goal ?? "mejoras"}. Te ayudo por WhatsApp.`,
    next: null,
  },
];

const autoDemoDefaults = {
  name: "Carlos",
  business: "Negocio local",
  goal: "Reservas",
};

export default function DemoWhatsAppPage() {
  return (
    <main className="min-h-screen w-full px-4 pb-20 pt-28 sm:px-6 lg:px-8">
      <section className="mx-auto w-full max-w-4xl">
        <p className="text-xs uppercase tracking-[0.4em] text-emerald-600">
          Demo WhatsApp
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-slate-900 md:text-4xl">
          Simulador de Bot WhatsApp
        </h1>
        <p className="mt-4 text-base text-slate-600">
          Conversación guiada estilo WhatsApp para calificar leads.
        </p>

        <div className="mt-8">
          <ChatSimulator
            variant="whatsapp"
            title="Asistente IA"
            subtitle="Atención rápida en WhatsApp"
            steps={steps}
            ctaLabel="Hablar por WhatsApp"
            ctaHref={buildWhatsappLink(
              "demo_bot_whatsapp",
              "Quiero una demo de bot WhatsApp."
            )}
            autoDemoDefaults={autoDemoDefaults}
          />
        </div>
      </section>
    </main>
  );
}
