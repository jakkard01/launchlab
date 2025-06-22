'use client';
import { useState } from 'react';

export default function BotModal() {
  const [prompt, setPrompt] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  const send = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    try {
      const res = await fetch('http://localhost:8000/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      setAnswer(data.response);
    } catch (e) {
      setAnswer('❌ Error de conexión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-gray-900 text-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-4">PoweredByIA Bot</h3>
      <textarea
        rows={4}
        className="w-full p-2 mb-3 rounded text-black"
        placeholder="Escribe tu pregunta..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <button
        onClick={send}
        disabled={loading}
        className="w-full bg-purple-600 hover:bg-purple-700 py-2 rounded mb-3"
      >
        {loading ? 'Pensando...' : 'Enviar'}
      </button>
      {answer && (
        <div className="bg-gray-800 p-3 rounded text-green-300 whitespace-pre-line">
          {answer}
        </div>
      )}
    </div>
  );
}
