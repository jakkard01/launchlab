"use client";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface IntroOverlayProps {
  src: string;
  onClose?: () => void;
  onEnded?: () => void;
  children?: React.ReactNode;
}

export default function IntroOverlay({ src, onClose, onEnded, children }: IntroOverlayProps) {
  const vidRef = useRef<HTMLVideoElement>(null);
  const [hasError, setHasError] = useState(false);

  return (
    <motion.div
      key="intro"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center w-full px-2"
    >
      {hasError ? (
        <div className="mx-auto block w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg rounded-2xl border border-white/10 bg-black/70 px-4 py-6 text-center text-sm text-white/80">
          <p>No se pudo cargar el video.</p>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <a
              href="/demos"
              className="rounded-full border border-white/20 px-5 py-2 text-center text-xs font-semibold uppercase tracking-[0.2em] text-white/80 transition hover:border-cyan-300/60"
            >
              Ver ejemplos →
            </a>
            <a
              href="https://wa.me/34911528753?text=Quiero%20ejemplos%20de%20video."
              className="rounded-full bg-emerald-400 px-5 py-2 text-center text-xs font-semibold uppercase tracking-[0.2em] text-black transition hover:bg-emerald-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              Hablar por WhatsApp
            </a>
          </div>
        </div>
      ) : (
        <video
          ref={vidRef}
          src={src}
          autoPlay
          playsInline
          controls
          preload="metadata"
          poster="/video/video-poster.png"
          onEnded={onEnded}
          onError={() => setHasError(true)}
          className="mx-auto block w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg rounded-2xl shadow-lg"
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
      <div className="flex flex-row justify-between w-full max-w-xs sm:max-w-sm md:max-w-md mt-4">
        <button
          onClick={onClose}
          className="text-white underline"
          aria-label="Volver al inicio"
        >
          Volver al inicio
        </button>
        <button
          onClick={onClose}
          className="bg-cyan-500 text-white px-4 py-2 rounded shadow"
          aria-label="Saltar intro"
        >
          Saltar intro
        </button>
      </div>
      {children}
    </motion.div>
  );
} 
