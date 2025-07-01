"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function IntroOverlay({ onFinish }: { onFinish: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onFinish, 6000);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/95"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black/90 to-black/70 pointer-events-none" />
        <motion.video
          initial={{ scale: 0.97, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.97, opacity: 0 }}
          src="/intro-futurista.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="relative z-10 rounded-3xl shadow-2xl border-4 border-white/20 max-w-[90vw] max-h-[80vh] object-cover drop-shadow-[0_0_32px_#00ffd8] animate-glow"
          style={{ boxShadow: '0 0 40px 8px #00ffd8aa' }}
        />
        <motion.button
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0, transition: { delay: 0.7 } }}
          exit={{ opacity: 0, y: 30 }}
          onClick={onFinish}
          className="fixed bottom-8 right-8 z-20 rounded-full bg-white/90 px-6 py-3 text-black font-semibold shadow-lg hover:bg-[#00ffd8] hover:text-black transition-all focus:outline-none focus:ring-2 focus:ring-[#00ffd8]"
        >
          Saltar intro
        </motion.button>
      </motion.div>
    </AnimatePresence>
  );
} 