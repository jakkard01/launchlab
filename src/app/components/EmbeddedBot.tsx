// src/app/components/EmbeddedBot.tsx
'use client';

import React, { useState } from 'react';
import { buildWhatsappLink } from '../../lib/site';

export default function EmbeddedBot() {
  const whatsappLink = buildWhatsappLink('embedded_bot');
  const [online] = useState(false);
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const send = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setResponse('Demo no disponible en esta versión. Solicita la demo por WhatsApp.');
    setLoading(false);
  };

  const onKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      send();
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto rounded-xl border border-white/10 bg-white/5 p-4 text-white shadow-md">
      {!online && (
        <div className="rounded-lg border border-white/10 bg-black/50 p-4 text-sm text-slate-200">
          <p className="font-semibold text-white">Demo en preparación</p>
          <p className="mt-2 text-slate-300">
            Solicita una demo personalizada por WhatsApp.
          </p>
          <a
            href={whatsappLink}
            className="mt-3 inline-flex rounded-full border border-emerald-300/60 px-4 py-2 text-xs font-semibold text-emerald-200 transition hover:bg-emerald-300 hover:text-black"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Solicitar demo por WhatsApp"
          >
            Solicitar demo
          </a>
        </div>
      )}
      {online && (
        <>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKey}
            placeholder="Escribe tu mensaje..."
            className="w-full rounded-lg border border-white/10 bg-black/60 p-3 text-sm text-white placeholder:text-slate-400 focus:ring-2 focus:ring-cyan-400"
            rows={3}
            disabled={loading}
          />
          <button
            onClick={send}
            disabled={loading}
            className={`w-full py-2 rounded-lg mb-2 text-sm font-semibold transition ${
              loading ? 'bg-slate-500 text-slate-200' : 'bg-cyan-400 hover:bg-cyan-300 text-black'
            }`}
          >
            {loading ? 'Pensando…' : 'Enviar'}
          </button>
        </>
      )}
      {response && (
        <div className="mt-2 rounded-lg bg-black/50 p-3 text-sm text-slate-200">{response}</div>
      )}
    </div>
  );
}
