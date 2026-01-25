export type PortfolioItem = {
  slug: string;
  title: string;
  summary: string;
  challenge: string;
  solution: string;
  results: string[];
  relatedServices: string[];
};

export const portfolio: PortfolioItem[] = [
  {
    slug: "demo-onboarding-saas",
    title: "Onboarding IA para SaaS (demo)",
    summary: "Flujo guiado para convertir usuarios en clientes activos.",
    challenge:
      "Reducir friccion en el onboarding y responder dudas recurrentes.",
    solution:
      "Se implemento un bot web con base de conocimiento y prompts guiados.",
    results: [
      "Guia paso a paso en menos de 3 minutos",
      "Reduccion de tickets repetitivos",
      "Estandarizacion de mensajes comerciales",
    ],
    relatedServices: ["chatbot-bot-ia", "automatizaciones"],
  },
  {
    slug: "demo-landing-validacion",
    title: "Landing de validacion comercial (demo)",
    summary: "Landing premium para probar oferta y captar leads calificados.",
    challenge:
      "Necesidad de lanzar rapido una propuesta clara sin depender de un equipo grande.",
    solution:
      "Narrativa enfocada en beneficios, secciones modulares y CTA claro.",
    results: [
      "Tiempo de lanzamiento reducido a dias",
      "Mensaje alineado con publico objetivo",
      "Base lista para escalar contenido",
    ],
    relatedServices: ["landing-premium", "consultoria-implementacion"],
  },
  {
    slug: "demo-operaciones-automatizadas",
    title: "Operaciones automatizadas (demo)",
    summary: "Orquestacion de tareas para equipos de operaciones.",
    challenge:
      "Visibilidad baja y tareas manuales que frenaban la operacion diaria.",
    solution:
      "Automatizaciones con alertas y seguimiento por fases.",
    results: [
      "Procesos criticos monitorizados",
      "Menos pasos manuales",
      "Documentacion clara para el equipo",
    ],
    relatedServices: ["automatizaciones", "consultoria-implementacion"],
  },
];
