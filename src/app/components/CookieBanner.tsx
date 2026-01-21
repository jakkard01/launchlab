'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

type ConsentStatus = 'accepted' | 'rejected';

type ConsentPayload = {
  v: number;          // versión del consentimiento (por si cambias textos/política)
  status: ConsentStatus;
  ts: number;         // timestamp
};

const CONSENT_KEY = 'launchlab_cookie_consent_v1';
const CONSENT_VERSION = 1;

function readConsent(): ConsentPayload | null {
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as ConsentPayload;
    if (!parsed?.status || typeof parsed.ts !== 'number') return null;
    return parsed;
  } catch {
    return null;
  }
}

function writeConsent(status: ConsentStatus) {
  const payload: ConsentPayload = { v: CONSENT_VERSION, status, ts: Date.now() };
  localStorage.setItem(CONSENT_KEY, JSON.stringify(payload));

  // Evento para que el resto de la app se entere (cargar scripts, etc.)
  window.dispatchEvent(new CustomEvent('cookie-consent', { detail: payload }));
}

export default function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = readConsent();
    if (!consent) {
      const timer = setTimeout(() => setShow(true), 900);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptAll = () => {
    writeConsent('accepted');
    setShow(false);
  };

  const rejectAll = () => {
    writeConsent('rejected');
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
            Usamos cookies para mejorar la experiencia. Las de analítica/marketing solo se activan si aceptas.
            Puedes leer nuestra{' '}
            <Link
              href="/privacidad"
              className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2"
            >
              política de privacidad
            </Link>.
          </p>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            onClick={rejectAll}
            className="flex-1 px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white border border-slate-700 hover:border-slate-500 rounded-lg transition-colors"
          >
            Rechazar
          </button>

          <button
            onClick={acceptAll}
            className="flex-1 px-4 py-2 text-xs font-semibold text-black bg-cyan-500 hover:bg-cyan-400 rounded-lg shadow-lg shadow-cyan-500/20 transition-all hover:scale-105"
          >
            Aceptar todo
          </button>
        </div>
      </div>
    </div>
  );
}
