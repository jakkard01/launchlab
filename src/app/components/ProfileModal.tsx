'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';

export default function ProfileModal({ onClose }: { onClose: () => void }) {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  // Focus trap y cierre con Escape
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Tab' && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll<HTMLElement>('button, [tabindex]:not([tabindex="-1"])');
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
    document.addEventListener('keydown', handleKey);
    setTimeout(() => closeBtnRef.current?.focus(), 50);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  // Cierra con click fuera
  function handleOverlay(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === modalRef.current) onClose();
  }

  return (
    <AnimatePresence>
      <motion.div
        ref={modalRef}
        className="fixed inset-0 bg-black/80 flex items-center justify-center z-[70] backdrop-blur-sm"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        onClick={handleOverlay}
        role="dialog"
        aria-modal="true"
        aria-label="Foto de perfil ampliada"
        tabIndex={-1}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="relative"
        >
          <Image
            src="/imagenes/perfil/mifoto.jpg"
            alt="Foto ampliada"
            width={600}
            height={600}
            className="rounded-xl shadow-lg"
            priority
          />
          <button
            ref={closeBtnRef}
            onClick={onClose}
            className="absolute top-2 right-2 bg-black/70 text-white rounded-full px-3 py-1 text-lg hover:bg-cyan-400 hover:text-black transition focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            aria-label="Cerrar foto ampliada"
            tabIndex={0}
          >
            ✕
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}


