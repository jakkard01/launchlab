"use client";

import ChatSimulator, { type ChatStep } from "../components/ChatSimulator";
import { buildWhatsappLink } from "../../../lib/site";

const steps: ChatStep[] = [
  {
    id: "name",
    prompt: "Hola, soy el bot demo. ¿Cómo te llamas?",
    type: "input",
    key: "name",
    placeholder: "Tu nombre",
    response: (value) => `Genial, ${value}. ¿Qué tipo de negocio tienes?`,
    next: "business",
  },
  {
    id: "business",
    prompt: "Selecciona tu tipo de negocio:",
    type: "options",
    key: "business",
    options: ["Ecommerce", "Servicios", "Restaurante"],
    response: () => "Perfecto. ¿Cuál es el objetivo principal?",
    next: "goal",
  },
  {
    id: "goal",
    prompt: "Elige el objetivo:",
    type: "options",
    key: "goal",
    options: ["Más ventas", "Soporte 24/7", "Reservas"],
    response: (_, context) =>
      `Listo. ${context.name ?? "Tu equipo"} quiere ${context.goal ?? "resultados"}. Te dejo el siguiente paso por WhatsApp.`,
    next: null,
  },
];

const autoDemoDefaults = {
  name: "Sofía",
  business: "Ecommerce",
  goal: "Más ventas",
};

export default function BotSimulator() {
  return (
    <ChatSimulator
      variant="web"
      title="Simulador"
      subtitle="Simula una conversación real"
      steps={steps}
      ctaLabel="Hablar por WhatsApp"
      ctaHref={buildWhatsappLink(
        "demo_bot_sim",
        "Quiero una demo de bot web."
      )}
      autoDemoDefaults={autoDemoDefaults}
    />
  );
}
