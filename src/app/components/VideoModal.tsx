'use client';

import { useEffect, useRef } from 'react';
import type { VideoExample } from '../app/content/videoPacks';

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
        {video.platform === 'youtube' && video.videoId ? (
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
          >
            <source src={video.src} type="video/mp4" />
            Tu navegador no soporta la reproducción de video.
          </video>
        )}
      </div>
    </div>
  );
}
