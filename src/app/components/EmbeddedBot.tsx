// src/app/components/EmbeddedBot.tsx
'use client';

import React, { useEffect, useState } from 'react';

export default function EmbeddedBot() {
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
    <div className="bg-white bg-opacity-90 p-4 rounded-xl shadow-md text-black w-full max-w-2xl mx-auto">
      {!online && (
        <div className="text-red-600 font-semibold mb-4">
          🚧 Bot fuera de servicio.
        </div>
      )}
      {online && (
        <>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKey}
            placeholder="Escribe tu mensaje..."
            className="w-full p-2 rounded border mb-2 focus:ring"
            rows={3}
            disabled={loading}
          />
          <button
            onClick={send}
            disabled={loading}
            className={`w-full py-2 rounded mb-2 font-bold transition ${
              loading ? 'bg-gray-400 text-gray-700' : 'bg-purple-700 hover:bg-purple-800 text-white'
            }`}
          >
            {loading ? 'Pensando…' : 'Enviar'}
          </button>
        </>
      )}
      {response && (
        <div className="mt-2 p-3 bg-gray-100 rounded text-sm">{response}</div>
      )}
    </div>
  );
}
