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
    if (isOpen && videoRef.current) {
      videoRef.current.play().catch(() => {
        console.warn('Autoplay bloqueado');
      });

      videoRef.current.onended = () => {
        onClose();
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-80 backdrop-blur-md flex items-center justify-center">
      <div className="w-full max-w-2xl p-4 bg-gray-900 rounded-2xl shadow-2xl">
        <video
          ref={videoRef}
          className="w-full h-auto rounded-xl"
          controls
          autoPlay
          playsInline
        >
          <source src="/video/video.mp4" type="video/mp4" />
          Tu navegador no soporta la reproducción de video.
        </video>
      </div>
    </div>
  );
}
