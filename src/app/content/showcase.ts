import type { ComponentProps } from "react";
import GlyphBadge from "../components/GlyphBadge";

export type ShowcaseItem = {
  slug: string;
  title: string;
  type: "bot" | "landing" | "system" | "automation";
  status: "demo" | "live" | "wip";
  summary: string;
  detail: string;
  tags: string[];
  glyph: ComponentProps<typeof GlyphBadge>["glyph"];
  ctaLabel: string;
  ctaHref: string;
  liveUrl?: string;
  relatedServices: string[];
};

export const showcase: ShowcaseItem[] = [
  {
    slug: "bot-whatsapp-demo",
    title: "Bot WhatsApp (demo)",
    type: "bot",
    status: "demo",
    summary: "Atiende leads y soporte con respuestas guiadas por IA.",
    detail:
      "Demo funcional de WhatsApp con flujos comerciales y base de conocimiento inicial.",
    tags: ["whatsapp", "flows", "knowledge-base"],
    glyph: "messages",
    ctaLabel: "Ver demo",
    ctaHref: "/demos/bot-whatsapp-demo",
    relatedServices: ["chatbot-bot-ia", "automatizaciones"],
  },
  {
    slug: "bot-web-kb-demo",
    title: "Bot Web KB (demo)",
    type: "bot",
    status: "demo",
    summary: "Widget web entrenado con FAQs y contenido propio.",
    detail:
      "Asistente web con respuestas de conocimiento interno y derivacion a contacto.",
    tags: ["web", "knowledge-base", "widget"],
    glyph: "messages",
    ctaLabel: "Explorar demo",
    ctaHref: "/demos/bot-web-kb-demo",
    relatedServices: ["chatbot-bot-ia"],
  },
  {
    slug: "landing-premium-demo",
    title: "Landing premium (demo)",
    type: "landing",
    status: "demo",
    summary: "Plantilla premium orientada a conversion y validacion.",
    detail:
      "Estructura completa con narrativa, beneficios, prueba social y CTA listos.",
    tags: ["nextjs", "conversion", "template"],
    glyph: "layout",
    ctaLabel: "Ver detalle",
    ctaHref: "/demos/landing-premium-demo",
    relatedServices: ["landing-premium"],
  },
  {
    slug: "sistema-pedidos-tienda",
    title: "Sistema Pedidos Tienda",
    type: "system",
    status: "wip",
    summary: "Flujo de pedidos con automatizacion y panel operativo.",
    detail:
      "Demo en construccion para conectar tienda, pagos y notificaciones.",
    tags: ["automation", "ecommerce", "ops"],
    glyph: "workflow",
    ctaLabel: "Pedir acceso",
    ctaHref: "/contact?source=demos",
    relatedServices: ["automatizaciones", "consultoria-implementacion"],
  },
];
