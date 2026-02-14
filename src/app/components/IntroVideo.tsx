"use client";
import { useRef, useState } from "react";

interface IntroVideoProps {
  onSkip: () => void;
  onFinish: () => void;
}

export default function IntroVideo({ onSkip, onFinish }: IntroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);

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
          <video
            ref={videoRef}
            src="/video/video.mp4"
            autoPlay
            muted
            playsInline
            controls
            preload="metadata"
            onCanPlay={() => setReady(true)}
            className="relative rounded-2xl w-full h-auto max-h-[60vh] border-0"
            tabIndex={-1}
          />
        </div>
        <div className="w-full px-4 pb-6">
          <button
            onClick={onSkip}
            className="w-full rounded-full bg-cyan-600 px-8 py-3 text-center text-sm font-semibold text-white shadow-lg transition hover:bg-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            aria-label="Saltar intro"
            type="button"
          >
            Saltar intro
          </button>
        </div>
      </div>
    </div>
  );
} 
