'use client';

import React from 'react';

interface HeroProps {
  onCTA: () => void;
}

export default function Hero({ onCTA }: HeroProps) {
  return (
    <section className="text-center mt-10">
      <h1 className="text-white text-4xl md:text-5xl font-bold drop-shadow-lg">
        Powered by IA
      </h1>
      <p className="text-white mt-2 text-lg md:text-xl opacity-80">
        Transformando ideas en realidad con IA, visión y código
      </p>
      <button
        onClick={onCTA}
        className="mt-6 bg-purple-700 hover:bg-purple-800 text-white font-bold py-2 px-6 rounded-full transition-colors shadow-md"
      >
        Empezar ahora
      </button>
    </section>
  );
}
