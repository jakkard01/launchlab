// src/app/components/EmbeddedVideo.tsx
'use client';

import React, { useEffect, useRef } from 'react';

export default function EmbeddedVideo({
  onFinish,
  onSkip,
  onClose,
}: {
  onFinish: () => void;
  onSkip: () => void;
  onClose: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (v) {
      v.play().catch(() => console.warn('Autoplay bloqueado'));
      const onEnded = () => onFinish();
      v.addEventListener('ended', onEnded);
      return () => v.removeEventListener('ended', onEnded);
    }
  }, [onFinish]);

  return (
    <div className="w-full max-w-2xl mx-auto mt-6 space-y-2">
      {/* Contenedor 16:9 */}
      <div className="relative w-full pb-[56.25%] rounded-xl overflow-hidden shadow-md">
        <video
          ref={videoRef}
          src="/video/video.mp4"
          controls
          playsInline
          muted
          preload="metadata"
          poster="/video/video-poster.png"
          className="absolute top-0 left-0 w-full h-full object-contain"
        >
          <track
            kind="subtitles"
            src="/video/subs.es.vtt"
            srcLang="es"
            label="Español"
            default
          />
        </video>
      </div>

      {/* Botones de control */}
      <div className="flex justify-between text-sm">
        <button
          onClick={onClose}
          className="px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-600 transition"
        >
          ✖ Cerrar
        </button>
        <button
          onClick={onSkip}
          className="px-3 py-1 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
        >
          ⏩ Saltar Intro
        </button>
      </div>
    </div>
  );
}
