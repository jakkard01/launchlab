'use client';

import React from 'react';
import Image from "next/image";

interface HeroProps {
  onShowProfile: () => void;
}

export default function Hero({ onShowProfile }: HeroProps) {
  return (
    <section className="flex flex-col items-center justify-center py-12">
      <div className="mb-6 flex items-center justify-center">
        <Image
          src="/gerardo-avatar.jpg"
          alt="Avatar Gerardo"
          width={160}
          height={160}
          className="rounded-full border-4 border-white w-40 h-40 object-cover shadow-lg"
        />
      </div>
      <h1 className="text-4xl font-extrabold tracking-tight text-center">
        Powered by <span className="text-cyan-400">IA</span>
      </h1>
      <p className="mt-4 text-lg text-gray-400 text-center max-w-xl">
        Transformando ideas en realidad con inteligencia artificial, visión y código.
      </p>
      <button
        onClick={onShowProfile}
        className="mt-6 rounded-xl border border-cyan-400 bg-transparent px-6 py-3 text-cyan-400 font-semibold transition-all hover:bg-cyan-400 hover:text-black shadow-md hover:shadow-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-300 animate-glow"
      >
        ¿Quién soy?
      </button>
    </section>
  );
}
