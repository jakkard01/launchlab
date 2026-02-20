'use client';

import React, { useState, useCallback, useRef, useImperativeHandle, forwardRef, useEffect } from 'react';
import Image from 'next/image';
import ProfileModal from './ProfileModal';
import IntroOverlay from './IntroOverlay';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import EmbeddedBot from './EmbeddedBot';

const Hero = forwardRef<HTMLImageElement>((props, ref) => {
  const [showProfile, setShowProfile] = useState(false);
  const [showIntro, setShowIntro] = useState(false);
  const [showBot, setShowBot] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuBtnRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const [introSeen, setIntroSeen] = useState(false);

  useEffect(() => {
    setIntroSeen(localStorage.getItem('introSeen') === 'true');
  }, []);

  // Cierra menú al hacer click fuera o ESC
  useEffect(() => {
    if (!menuOpen) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setMenuOpen(false);
      if (e.key === "Tab" && menuRef.current) {
        const focusable = menuRef.current.querySelectorAll<HTMLElement>(
          'a,button,[tabindex]:not([tabindex="-1"])'
        );
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
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node) && menuBtnRef.current && !menuBtnRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("keydown", handleKey);
    document.addEventListener("mousedown", handleClick);
    setTimeout(() => firstLinkRef.current?.focus(), 50);
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.removeEventListener("mousedown", handleClick);
    };
  }, [menuOpen]);

  const openProfile = useCallback(() => setShowProfile(true), []);
  const closeProfile = useCallback(() => setShowProfile(false), []);

  const abrirModalBot = () => {
    setMenuOpen(false);
    setTimeout(() => setShowBot(true), 350);
  };

  const handleFinish = () => {
    setShowIntro(false);
    localStorage.setItem('introSeen', 'true');
  };

  return (
    <header className="mt-6 text-center flex flex-col items-center">
      <button
        type="button"
        role="button"
        tabIndex={0}
        aria-label="Ver avatar en grande"
        className="mb-6 flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-full"
        onClick={openProfile}
      >
        <Image
          src="/imagenes/perfil/perfil-v2.jpg"
          alt="Avatar Gerardo"
          width={160}
          height={160}
          className="rounded-full border-4 border-white w-40 h-40 object-cover shadow-lg"
          priority
        />
      </button>
      {/* Menú hamburguesa debajo del avatar, en el flujo del layout */}
      <div className="mb-6 flex flex-col items-center w-full">
        <button
          ref={menuBtnRef}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={menuOpen}
          aria-controls="hero-menu-dropdown"
          className="flex flex-col items-center gap-1 text-white hover:text-cyan-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
        >
          <div className="flex flex-col gap-1">
            <span className="block w-7 h-0.5 bg-current rounded"></span>
            <span className="block w-7 h-0.5 bg-current rounded"></span>
            <span className="block w-7 h-0.5 bg-current rounded"></span>
          </div>
          <span className="text-sm font-medium mt-1">Menú</span>
        </button>
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              ref={menuRef}
              id="hero-menu-dropdown"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden w-full flex flex-col items-center"
              role="menu"
            >
              <div className="rounded-xl flex flex-col items-center gap-3 text-white max-w-xs w-full mx-auto mt-2">
                <Link
                  href="/cursos"
                  ref={firstLinkRef}
                  onClick={() => setMenuOpen(false)}
                  className="text-lg font-semibold hover:text-cyan-400 transition-colors w-full text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                  role="menuitem"
                  tabIndex={0}
                >
                  Cursos
                </Link>
                <Link
                  href="/portfolio"
                  onClick={() => setMenuOpen(false)}
                  className="text-lg font-semibold hover:text-cyan-400 transition-colors w-full text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                  role="menuitem"
                  tabIndex={0}
                >
                  Portfolio
                </Link>
                <button
                  onClick={abrirModalBot}
                  className="text-lg font-semibold hover:text-cyan-400 transition-colors w-full text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                  role="menuitem"
                  tabIndex={0}
                >
                  Bot
                </button>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="mt-2 text-white text-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                  aria-label="Cerrar menú"
                  role="menuitem"
                  tabIndex={0}
                >
                  ✕
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <h1 className="text-white text-4xl md:text-5xl font-bold drop-shadow-lg">
        Powered by IA
      </h1>
      <p className="text-white mt-2 text-lg md:text-xl opacity-80 max-w-xl mx-auto">
        Transformando ideas en realidad con IA, visión y código
      </p>
      {!showIntro ? (
        <button
          className="mt-6 border border-cyan-400 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-cyan-400 hover:text-black transition shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          onClick={() => setShowIntro(true)}
          aria-label="Empezar ahora"
        >
          Empezar ahora
        </button>
      ) : (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full flex flex-col items-center my-8"
        >
          {videoError ? (
            <div className="w-full max-w-xs sm:max-w-sm md:max-w-md rounded-2xl border border-white/10 bg-black/70 px-4 py-6 text-center text-sm text-white/80">
              <p>No se pudo cargar el video.</p>
              <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:justify-center">
                <Link
                  href="/demos"
                  className="rounded-full border border-white/20 px-5 py-2 text-center text-xs font-semibold uppercase tracking-[0.2em] text-white/80 transition hover:border-cyan-300/60"
                >
                  Ver ejemplos →
                </Link>
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
              src="/video/video.mp4"
              poster="/video/video-poster.png"
              preload="metadata"
              autoPlay
              playsInline
              controls
              className="mx-auto block w-full max-w-xs sm:max-w-sm md:max-w-md rounded-2xl shadow-lg"
              onEnded={handleFinish}
              onError={() => setVideoError(true)}
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
          <div className="flex justify-between w-full max-w-xs sm:max-w-sm md:max-w-md mt-4">
            <button onClick={handleFinish} className="text-cyan-500 underline focus:ring-2 focus:ring-cyan-400 focus:outline-none">
              Volver al inicio
            </button>
            <button onClick={handleFinish} className="bg-cyan-500 text-white px-4 py-2 rounded focus:ring-2 focus:ring-cyan-400 focus:outline-none">
              Saltar intro
            </button>
          </div>
        </motion.div>
      )}
      {showProfile && <ProfileModal onClose={closeProfile} />}
      <AnimatePresence>
        {showBot && (
          <motion.div
            className="fixed inset-0 z-[70] bg-black/50 flex items-center justify-center backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-2xl mx-auto bg-black/90 rounded-xl shadow-2xl p-6"
            >
              <EmbeddedBot />
              <button
                onClick={() => setShowBot(false)}
                className="absolute top-2 right-2 bg-black/70 text-white rounded-full px-3 py-1 text-sm hover:bg-cyan-400 hover:text-black transition focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                aria-label="Cerrar Bot"
                tabIndex={0}
              >
                Cerrar
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
});

export default Hero;

Hero.displayName = "Hero";
