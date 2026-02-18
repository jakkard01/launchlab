"use client";

import { useState } from "react";

export default function BotModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");

  const handleSend = async () => {
    setResponse("Demo offline. Pide la demo por WhatsApp.");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed top-0 right-0 z-50 w-[350px] h-full bg-black bg-opacity-80 p-4 text-white">
      <h2 className="text-xl font-bold mb-4">PoweredByIA Bot</h2>
      <p className="mb-2">Hola, soy tu bot personal. ¿En qué puedo ayudarte hoy?</p>
      <input
        className="w-full px-3 py-2 rounded text-black"
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Escribe tu pregunta"
      />
      <button onClick={handleSend} className="mt-2 bg-purple-600 px-4 py-2 rounded hover:bg-purple-700">Enviar</button>
      <p className="mt-3">{response}</p>
      <button onClick={onClose} className="mt-2 text-sm underline text-purple-300">Cerrar</button>
    </div>
  );
}
