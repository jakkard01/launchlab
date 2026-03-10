"use client";
import { useEffect, useRef, useState } from "react";
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
  const [hasError, setHasError] = useState(false);
  const whatsappLink = buildWhatsappLink(
    "intro_video",
    "Quiero info sobre Video Packs."
  );

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const previousTouchAction = document.body.style.touchAction;
    document.body.style.overflow = "hidden";
    document.body.style.touchAction = "none";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onFinish();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.touchAction = previousTouchAction;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onFinish]);

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
      onClick={onFinish}
      role="presentation"
    >
      <div className="flex h-full w-full items-center justify-center px-4 pb-[calc(env(safe-area-inset-bottom)+16px)] pt-[calc(env(safe-area-inset-top)+16px)]">
        <div
          className="relative flex max-h-full w-full max-w-xs flex-col items-center overflow-hidden rounded-2xl border border-cyan-700 bg-black/80 p-0 shadow-2xl sm:max-w-md md:max-w-lg lg:max-w-xl"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="sticky top-0 z-20 flex w-full items-center justify-between border-b border-white/10 bg-black/85 px-4 pb-2 pt-4">
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
          <div className="relative w-full overflow-y-auto px-4 pb-4">
            {!ready && (
              <div className="absolute inset-4 rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/0 animate-pulse" />
            )}
            {hasError ? (
              <div className="relative w-full rounded-2xl border border-white/10 bg-black/70 px-4 py-6 text-center text-sm text-white/80">
                <p>No se pudo cargar el video.</p>
                <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:justify-center">
                  <a
                    href="/demos"
                    className="rounded-full border border-white/20 px-5 py-2 text-center text-xs font-semibold uppercase tracking-[0.2em] text-white/80 transition hover:border-cyan-300/60"
                  >
                    Ver ejemplos →
                  </a>
                  <a
                    href={whatsappLink}
                    className="rounded-full bg-emerald-400 px-5 py-2 text-center text-xs font-semibold uppercase tracking-[0.2em] text-black transition hover:bg-emerald-300"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Hablar por WhatsApp
                  </a>
                </div>
              </div>
            ) : video.platform === "youtube" && video.videoId ? (
              <iframe
                src={buildEmbedUrl(video.videoId)}
                title={video.title}
                className="relative h-[min(60vh,20rem)] w-full rounded-2xl border-0"
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
                poster="/video/video-poster.png"
                onCanPlay={() => setReady(true)}
                onError={() => setHasError(true)}
                className="relative h-auto max-h-[60vh] w-full rounded-2xl border-0"
                tabIndex={-1}
              >
                <track
                  kind="subtitles"
                  src="/video/subs.es.vtt"
                  srcLang="es"
                  label="Español"
                  default
                />
              </video>
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
    </div>
  );
}
