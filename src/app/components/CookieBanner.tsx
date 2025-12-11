'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Comprobamos si ya aceptó las cookies en el pasado
    const consent = localStorage.getItem('launchlab_cookie_consent');
    if (!consent) {
      // Si no hay rastro, mostramos el banner tras 1 segundo para no ser agresivos
      const timer = setTimeout(() => setShow(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('launchlab_cookie_consent', 'true');
    setShow(false);
    console.log('Cookies aceptadas: Activando trackers (a futuro)...');
  };

  const declineCookies = () => {
    localStorage.setItem('launchlab_cookie_consent', 'false');
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 z-[100] p-6 bg-black/90 backdrop-blur-md border border-cyan-500/30 rounded-2xl shadow-[0_0_30px_rgba(6,182,212,0.15)] animate-in slide-in-from-bottom-10 fade-in duration-500">
      <div className="flex flex-col gap-4">
        <div>
          <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
            🍪 Cookies & Privacidad
          </h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            Usamos cookies para mejorar la experiencia y analizar el tráfico (preparando el terreno para monetizar). 
            Puedes leer nuestra{' '}
            <Link href="#" className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2">
              política de privacidad
            </Link>.
          </p>
        </div>
        
        <div className="flex gap-3 pt-2">
          <button
            onClick={declineCookies}
            className="flex-1 px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white border border-slate-700 hover:border-slate-500 rounded-lg transition-colors"
          >
            Rechazar
          </button>
          <button
            onClick={acceptCookies}
            className="flex-1 px-4 py-2 text-xs font-semibold text-black bg-cyan-500 hover:bg-cyan-400 rounded-lg shadow-lg shadow-cyan-500/20 transition-all hover:scale-105"
          >
            Aceptar todo
          </button>
        </div>
      </div>
    </div>
  );
}