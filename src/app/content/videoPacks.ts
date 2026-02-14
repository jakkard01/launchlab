export type VideoPlatform = "youtube" | "local";

export type VideoExample = {
  id: string;
  title: string;
  benefit: string;
  category: string;
  platform: VideoPlatform;
  src: string;
  poster?: string;
  videoId?: string;
  tags: string[];
  duration?: string;
  featured?: boolean;
};

export const videoExamples: VideoExample[] = [
  {
    id: "web-conversion-hero",
    title: "Web que convierte en 60s",
    benefit: "Narrativa clara + CTA visible para cerrar leads.",
    category: "Web",
    platform: "local",
    src: "/video/video.mp4",
    poster: "/og.png",
    tags: ["conversion", "landing", "cta"],
    duration: "0:58",
    featured: true,
  },
  {
    id: "pack-starter-placeholder",
    title: "Pack Starter (placeholder)",
    benefit: "Ejemplo de edición vertical con subtítulos.",
    category: "Video Packs",
    platform: "youtube",
    src: "",
    videoId: "",
    poster: "/og.png",
    tags: ["shorts", "subtitulos", "hooks"],
  },
  {
    id: "doblaje-placeholder",
    title: "Doblaje multi-idioma (placeholder)",
    benefit: "Ejemplo de doblaje con QA de timing.",
    category: "Doblaje",
    platform: "youtube",
    src: "",
    videoId: "",
    poster: "/og.png",
    tags: ["voiceover", "qa", "idiomas"],
  },
];

export const getFeaturedVideo = () =>
  videoExamples.find((item) => item.featured) ?? videoExamples[0];
