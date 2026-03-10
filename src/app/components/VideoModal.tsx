'use client';

import { useEffect, useRef, useState } from 'react';
import { buildWhatsappLink } from '../../lib/site';
import type { VideoExample } from '../content/videoPacks';

const buildEmbedUrl = (videoId: string) =>
  `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`;

export default function VideoModal({
  isOpen,
  onClose,
  video,
}: {
  isOpen: boolean;
  onClose: () => void;
  video: VideoExample;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasError, setHasError] = useState(false);
  const whatsappLink = buildWhatsappLink('video_modal', 'Quiero ejemplos de video.');

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    const previousTouchAction = document.body.style.touchAction;
    document.body.style.overflow = "hidden";
    document.body.style.touchAction = "none";
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.touchAction = previousTouchAction;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen || !videoRef.current) return;
    videoRef.current.play().catch(() => {
      console.warn('Autoplay bloqueado');
    });

    videoRef.current.onended = () => {
      onClose();
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black bg-opacity-80 backdrop-blur-md"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="relative flex h-full w-full items-center justify-center px-4 py-[max(env(safe-area-inset-top),16px)] pb-[max(env(safe-area-inset-bottom),16px)]"
      >
        <div
          className="relative max-h-full w-full max-w-2xl overflow-hidden rounded-2xl bg-gray-900 shadow-2xl"
          onClick={(event) => event.stopPropagation()}
        >
          <button
            type="button"
            onClick={onClose}
            className="absolute right-3 top-3 z-20 rounded-full border border-white/25 bg-black/75 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white"
            aria-label="Cerrar video"
          >
            Cerrar
          </button>
          {hasError ? (
            <div className="rounded-xl border border-white/10 bg-black/70 px-6 py-8 text-center text-sm text-white/80">
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
          ) : video.platform === 'youtube' && video.videoId ? (
            <iframe
              src={buildEmbedUrl(video.videoId)}
              title={video.title}
              className="block h-[min(70vh,360px)] w-full rounded-xl"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <video
              ref={videoRef}
              className="block max-h-[75vh] w-full rounded-xl"
              controls
              autoPlay
              playsInline
              muted
              preload="metadata"
              poster={video.poster ?? "/video/video-poster.png"}
              onError={() => setHasError(true)}
            >
              <source src={video.src} type="video/mp4" />
              {video.captions ? (
                <track
                  kind="subtitles"
                  src={video.captions}
                  srcLang="es"
                  label="Español"
                />
              ) : null}
              Tu navegador no soporta la reproducción de video.
            </video>
          )}
        </div>
      </div>
    </div>
  );
}
