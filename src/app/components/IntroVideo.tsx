"use client";
import { useRef, useState } from "react";
import { buildWhatsappLink } from "../../lib/site";
import type { VideoExample } from "../content/videoPacks";

interface IntroVideoProps {
  onSkip: () => void;
  onFinish: () => void;
  video: VideoExample;
}

const buildEmbedUrl = (videoId: string) =>
  `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`;

export default function IntroVideo({ onSkip, onFinish, video }: IntroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  const whatsappLink = buildWhatsappLink(
    "intro_video",
    "Quiero info sobre Video Packs."
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4 pb-[calc(env(safe-area-inset-bottom)+16px)] pt-[calc(env(safe-area-inset-top)+16px)]">
      <div className="relative flex w-full max-w-xs flex-col items-center rounded-2xl border border-cyan-700 bg-black/80 p-0 shadow-2xl sm:max-w-md md:max-w-lg lg:max-w-xl">
        <div className="flex w-full items-center justify-between px-4 pb-2 pt-4">
          <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/80">
            Intro
          </p>
          <button
            onClick={onFinish}
            className="rounded-full border border-white/10 px-3 py-1 text-xs font-semibold text-white/80 transition hover:border-cyan-300/60 hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
            aria-label="Cerrar video"
          >
            Cerrar
          </button>
        </div>
        <div className="relative w-full px-4 pb-4">
          {!ready && (
            <div className="absolute inset-4 rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/0 animate-pulse" />
          )}
          {video.platform === "youtube" && video.videoId ? (
            <iframe
              src={buildEmbedUrl(video.videoId)}
              title={video.title}
              className="relative h-64 w-full rounded-2xl border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              onLoad={() => setReady(true)}
            />
          ) : (
            <video
              ref={videoRef}
              src={video.src}
              autoPlay
              muted
              playsInline
              controls
              preload="metadata"
              onCanPlay={() => setReady(true)}
              className="relative rounded-2xl w-full h-auto max-h-[60vh] border-0"
              tabIndex={-1}
            />
          )}
        </div>
        <div className="w-full px-4 pb-6">
          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              onClick={onSkip}
              className="w-full rounded-full border border-white/20 px-5 py-3 text-center text-xs font-semibold uppercase tracking-[0.2em] text-white/80 transition hover:border-cyan-300/60"
              aria-label="Saltar intro"
              type="button"
            >
              Saltar intro
            </button>
            <a
              href={whatsappLink}
              className="w-full rounded-full bg-emerald-400 px-5 py-3 text-center text-xs font-semibold uppercase tracking-[0.2em] text-black transition hover:bg-emerald-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              Escríbenos por WhatsApp
            </a>
            <a
              href="/video"
              className="w-full rounded-full border border-cyan-300/60 px-5 py-3 text-center text-xs font-semibold uppercase tracking-[0.2em] text-cyan-100 transition hover:bg-cyan-400 hover:text-black"
            >
              Ver ejemplos
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
