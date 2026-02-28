export type VideoPlatform = "youtube" | "local";

export type VideoExample = {
  id: string;
  title: string;
  benefit: string;
  category: string;
  platform: VideoPlatform;
  src: string;
  poster?: string;
  captions?: string;
  videoId?: string;
  tags: string[];
  duration?: string;
  featured?: boolean;
};

export const videoExamples: VideoExample[] = [
  {
    id: "web-conversion-hero",
    title: "Web que se paga sola",
    benefit: "Narrativa clara + CTA visible para cerrar leads.",
    category: "Web",
    platform: "local",
    src: "/media/galeria/v1.mp4",
    poster: "/media/galeria/v1.jpg",
    captions: "/media/galeria/v1.vtt",
    tags: ["conversion", "landing", "cta"],
    duration: "0:30",
    featured: true,
  },
  {
    id: "audit-mobile",
    title: "Auditoría móvil + performance",
    benefit: "Detecta fugas y mejora velocidad en móvil.",
    category: "Auditoría",
    platform: "local",
    src: "/media/galeria/v2.mp4",
    poster: "/media/galeria/v2.jpg",
    captions: "/media/galeria/v2.vtt",
    tags: ["seo", "performance", "mobile"],
    duration: "0:29",
  },
  {
    id: "whatsapp-operator",
    title: "WhatsApp 24/7 automatizado",
    benefit: "Atiende, filtra y recupera clientes sin perder leads.",
    category: "Automatización",
    platform: "local",
    src: "/media/galeria/v3.mp4",
    poster: "/media/galeria/v3.jpg",
    captions: "/media/galeria/v3.vtt",
    tags: ["whatsapp", "bots", "automatizacion"],
    duration: "0:26",
  },
];

export const getFeaturedVideo = () =>
  videoExamples.find((item) => item.featured) ?? videoExamples[0];
