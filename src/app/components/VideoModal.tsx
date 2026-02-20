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
    <div className="fixed inset-0 z-50 bg-black bg-opacity-80 backdrop-blur-md flex items-center justify-center">
      <div className="w-full max-w-2xl p-4 bg-gray-900 rounded-2xl shadow-2xl">
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
            className="w-full h-[360px] rounded-xl"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <video
            ref={videoRef}
            className="w-full h-auto rounded-xl"
            controls
            autoPlay
            playsInline
            preload="metadata"
            poster="/video/video-poster.png"
            onError={() => setHasError(true)}
          >
            <source src={video.src} type="video/mp4" />
            <track
              kind="subtitles"
              src="/video/subs.es.vtt"
              srcLang="es"
              label="Español"
              default
            />
            Tu navegador no soporta la reproducción de video.
          </video>
        )}
      </div>
    </div>
  );
}
