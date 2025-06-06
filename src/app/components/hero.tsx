'use client';

import React from 'react';

interface HeroProps {
  onCTA?: () => void;
}

export default function Hero({ onCTA }: HeroProps) {
  return (
    <header className="mt-6 text-center">
      <h1 className="text-white text-4xl md:text-5xl font-bold drop-shadow-lg">
        Powered by IA
      </h1>
      <p className="text-white mt-2 text-lg md:text-xl opacity-80 max-w-xl mx-auto">
        Transformando ideas en realidad con IA, visión y código
      </p>

      <button
        className="mt-6 bg-purple-700 hover:bg-purple-800 text-white font-bold py-2 px-6 rounded-full transition-colors shadow-md"
        onClick={onCTA}
      >
        Empezar ahora
      </button>
    </header>
  );
}
