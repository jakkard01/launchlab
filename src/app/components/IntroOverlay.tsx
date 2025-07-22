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

  return (
    <motion.div
      key="intro"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center w-full px-2"
    >
      <video
        ref={vidRef}
        src={src}
        autoPlay
        playsInline
        controls
        onEnded={onEnded}
        className="mx-auto block w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg rounded-2xl shadow-lg"
      />
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