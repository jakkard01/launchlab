import type { ComponentProps } from "react";
import GlyphBadge from "../components/GlyphBadge";
import { buildWhatsappLink } from "../../lib/site";

export type Glyph = ComponentProps<typeof GlyphBadge>["glyph"];

export type ServiceItem = {
  slug: string;
  title: string;
  summary: string;
  detail: string;
  glyph: Glyph;
  step: string;
  bullets: string[];
  forWho: string[];
  deliverables: string[];
  tags: string[];
  ctaLabel: string;
  ctaHref: string;
};

const whatsappLink = buildWhatsappLink("services_catalog");

export const services: ServiceItem[] = [
  {
    slug: "landing-premium",
    title: "Landing premium (demo)",
    summary: "Experiencias de conversion listas para validar oferta y captar leads.",
    detail:
      "Disenamos una landing premium con narrativa clara, estructura de conversion y demo lista para publicar.",
    glyph: "layout",
    step: "Paso 02 · Implementación",
    bullets: [
      "Arquitectura de mensaje y jerarquia visual enfocada en ventas",
      "Secciones clave: hero, beneficios, prueba social y CTA",
      "Iteraciones rapidas para afinar la propuesta de valor",
    ],
    tags: ["conversion", "landing", "copy"],
    forWho: [
      "Equipos que lanzan un producto digital y necesitan validar mensaje",
      "Negocios que quieren elevar la tasa de conversion",
      "Fundadores que buscan una demo lista para mostrar",
    ],
    deliverables: [
      "Landing responsive lista para publicar",
      "Version demo con ajustes iterativos",
      "Guia de contenido y estructura de CTA",
    ],
    ctaLabel: "Quiero la demo",
    ctaHref: whatsappLink,
  },
  {
    slug: "chatbot-bot-ia",
    title: "Chatbot / Bot IA",
    summary: "Asistentes inteligentes para soporte, ventas y atencion 24/7.",
    detail:
      "Implementamos bots con flujos guiados, base de conocimiento y respuestas alineadas a tu negocio.",
    glyph: "messages",
    step: "Paso 02 · Implementación",
    bullets: [
      "Diseno de flujos conversacionales y tono de marca",
      "Base de conocimiento curada y actualizable",
      "Pruebas con escenarios reales y ajustes finos",
    ],
    tags: ["bot", "ventas", "soporte"],
    forWho: [
      "Equipos comerciales que buscan responder mas rapido",
      "Operaciones con alto volumen de consultas repetitivas",
      "Productos digitales que requieren soporte continuo",
    ],
    deliverables: [
      "Bot entrenado y listo para operar",
      "Set de flujos principales documentados",
      "Panel de mejoras y recomendaciones iniciales",
    ],
    ctaLabel: "Pedir informacion",
    ctaHref: whatsappLink,
  },
  {
    slug: "automatizaciones",
    title: "Automatizaciones",
    summary: "Procesos conectados que reducen friccion y escalan la operacion.",
    detail:
      "Orquestamos tareas entre sistemas para eliminar trabajo manual y acelerar tiempos de respuesta.",
    glyph: "workflow",
    step: "Paso 03 · Escalado",
    bullets: [
      "Mapeo de procesos criticos y puntos de friccion",
      "Automatizaciones con disparadores claros y alertas",
      "Monitoreo inicial para asegurar estabilidad",
    ],
    tags: ["ops", "automation", "integraciones"],
    forWho: [
      "Equipos que operan con tareas repetitivas",
      "Empresas que necesitan visibilidad y control",
      "Lideres que buscan eficiencia sin perder calidad",
    ],
    deliverables: [
      "Flujos automatizados listos para operar",
      "Documentacion de procesos y responsables",
      "Checklist de mantenimiento recomendado",
    ],
    ctaLabel: "Explorar automatizaciones",
    ctaHref: whatsappLink,
  },
  {
    slug: "avatares-video-ia",
    title: "Avatares / videos IA",
    summary: "Contenido audiovisual escalable para ventas, training y soporte.",
    detail:
      "Creamos videos IA alineados a tu marca para comunicar, explicar y convertir de forma consistente.",
    glyph: "video",
    step: "Paso 02 · Implementación",
    bullets: [
      "Guion, estructura y storyboard de alto impacto",
      "Estilo visual coherente con tu marca",
      "Versiones optimizadas para distintos canales",
    ],
    tags: ["video", "ventas", "contenido"],
    forWho: [
      "Equipos que necesitan contenido frecuente",
      "Empresas que venden productos complejos",
      "Marcas que quieren soporte audiovisual rapido",
    ],
    deliverables: [
      "Pack de videos listos para publicar",
      "Archivos finales en formatos clave",
      "Guia de uso y variantes recomendadas",
    ],
    ctaLabel: "Solicitar propuesta",
    ctaHref: whatsappLink,
  },
  {
    slug: "consultoria-implementacion",
    title: "Consultoria / Implementacion",
    summary: "Diagnostico, roadmap y ejecucion tecnica de sistemas IA.",
    detail:
      "Alineamos estrategia, datos y despliegue para que la IA impacte en resultados reales.",
    glyph: "shield",
    step: "Paso 01 · Diagnóstico",
    bullets: [
      "Audit de procesos, datos y objetivos",
      "Roadmap priorizado con quick wins",
      "Acompanamiento en la implementacion",
    ],
    forWho: [
      "Equipos que quieren una hoja de ruta clara",
      "Direcciones que necesitan impacto medible",
      "Proyectos que requieren ejecucion segura",
    ],
    deliverables: [
      "Informe de diagnostico y oportunidades",
      "Plan de implementacion con fases",
      "Recomendaciones tecnicas accionables",
    ],
    ctaLabel: "Agendar consultoria",
    ctaHref: whatsappLink,
  },
];
