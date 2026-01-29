export type PortfolioItem = {
  slug: string;
  title: string;
  summary: string;
  problem: string;
  solution: string;
  deliverables: string[];
  stack: string[];
  expectedResult: string;
  relatedServices: string[];
};

export const portfolio: PortfolioItem[] = [
  {
    slug: "demo-onboarding-saas",
    title: "Onboarding IA para SaaS (demo)",
    summary: "Flujo guiado para activar usuarios y reducir bloqueos iniciales.",
    problem:
      "Onboarding largo, dudas repetitivas y baja activacion en los primeros dias.",
    solution:
      "FAQ bot determinista con guias paso a paso y contacto directo al equipo.",
    deliverables: [
      "Mapa de categorias y preguntas clave",
      "Widget web integrado",
      "Guia de mantenimiento de contenido",
    ],
    stack: ["Next.js", "UI components", "Tracking basico"],
    expectedResult: "Demo validado con equipo y checklist de activación.",
    relatedServices: ["chatbot-bot-ia", "automatizaciones"],
  },
  {
    slug: "demo-landing-validacion",
    title: "Landing de validacion comercial (demo)",
    summary: "Landing premium para probar oferta y captar leads.",
    problem:
      "Lanzamiento lento por falta de copy claro y estructura de conversion.",
    solution:
      "Plantilla premium con narrativa, secciones modulares y CTA coherente.",
    deliverables: [
      "Landing responsive lista para publicar",
      "Secciones clave preconfiguradas",
      "Checklist de conversion",
    ],
    stack: ["Next.js", "Tailwind", "SEO basico"],
    expectedResult: "Demo validado para captar leads iniciales.",
    relatedServices: ["landing-premium", "consultoria-implementacion"],
  },
  {
    slug: "demo-operaciones-automatizadas",
    title: "Operaciones automatizadas (demo)",
    summary: "Flujos conectados para reducir tareas manuales.",
    problem:
      "Visibilidad baja y tareas repetitivas que frenan la operacion diaria.",
    solution:
      "Automatizaciones con alertas, checklist y seguimiento por fases.",
    deliverables: [
      "Flujo operativo documentado",
      "Alertas y reportes basicos",
      "Panel de responsables",
    ],
    stack: ["n8n", "Webhooks", "Dashboards basicos"],
    expectedResult: "Demo operativo con métricas base y flujos definidos.",
    relatedServices: ["automatizaciones", "consultoria-implementacion"],
  },
];
