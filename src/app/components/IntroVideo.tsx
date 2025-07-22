"use client";
import { useRef } from "react";

interface IntroVideoProps {
  onSkip: () => void;
  onFinish: () => void;
}

export default function IntroVideo({ onSkip, onFinish }: IntroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="relative flex flex-col items-center w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl mx-4 p-0 bg-black/80 rounded-2xl shadow-2xl border border-cyan-700">
        {/* Botón cerrar (X) en la esquina superior derecha del modal */}
        <button
          onClick={onFinish}
          className="absolute top-3 right-3 bg-black/70 text-white rounded-full p-2 hover:bg-black/90 focus:outline-none focus:ring-2 focus:ring-cyan-400 z-10"
          aria-label="Cerrar video"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
        <video
          ref={videoRef}
          src="/video/video.mp4"
          autoPlay
          muted
          playsInline
          controls
          className="rounded-2xl w-full h-auto max-h-[60vh] mt-0 mb-4 border-0"
          tabIndex={-1}
        />
        <button
          onClick={onSkip}
          className="mb-6 px-8 py-3 rounded-full bg-cyan-600 text-white font-bold text-lg shadow-lg hover:bg-cyan-400 transition focus:outline-none focus:ring-2 focus:ring-cyan-400"
          aria-label="Saltar video"
          type="button"
        >
          Saltar video
        </button>
      </div>
    </div>
  );
} 