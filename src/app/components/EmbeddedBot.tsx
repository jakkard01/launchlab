// src/app/components/EmbeddedBot.tsx
'use client';

import React, { useEffect, useState } from 'react';

export default function EmbeddedBot() {
  const whatsappLink =
    'https://wa.me/34911528753?text=Hola%2C%20vengo%20desde%20poweredbyia.com.%20Quiero%20info%20de%20servicios%20y%20una%20demo.';
  const [online, setOnline] = useState(true);
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/ping')
      .then((r) => r.json())
      .then((j) => setOnline(j.status === 'ok'))
      .catch(() => setOnline(false));
  }, []);

  const send = async () => {
    if (!input.trim() || !online) return;
    setLoading(true);
    try {
      const res = await fetch('http://127.0.0.1:8000/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: input }),  // <— aquí debe ir "prompt"
      });
      const data = await res.json();
      setResponse(data.response || 'Sin respuesta.');
    } catch {
      setResponse('❌ Error de conexión.');
    } finally {
      setLoading(false);
    }
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
            rel="noreferrer"
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
