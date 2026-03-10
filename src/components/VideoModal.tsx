'use client';

import { useEffect, useRef } from 'react';

export default function VideoModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

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

    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        console.warn('Autoplay bloqueado');
      });

      videoRef.current.onended = () => {
        onClose();
      };
    }

    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.touchAction = previousTouchAction;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black bg-opacity-80 backdrop-blur-md"
      onClick={onClose}
      role="presentation"
    >
      <div className="flex h-full w-full items-center justify-center px-4 py-[max(env(safe-area-inset-top),16px)] pb-[max(env(safe-area-inset-bottom),16px)]">
        <div
          className="relative w-full max-w-2xl rounded-2xl bg-gray-900 p-4 shadow-2xl"
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
          <video
            ref={videoRef}
            className="w-full max-h-[75vh] rounded-xl"
            controls
            autoPlay
            playsInline
            muted
            preload="metadata"
            poster="/video/video-poster.png"
          >
            <source src="/video/video.mp4" type="video/mp4" />
            <track
              kind="subtitles"
              src="/video/subs.es.vtt"
              srcLang="es"
              label="Español"
              default
            />
            Tu navegador no soporta la reproducción de video.
          </video>
        </div>
      </div>
    </div>
  );
}
