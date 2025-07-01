// src/app/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import EmbeddedVideo from './components/EmbeddedVideo';
import EmbeddedBot from './components/EmbeddedBot';
import ProfileModal from './components/ProfileModal';

const SKIP_KEY = 'skip_intro_allowed';

export default function Home() {
  const [step, setStep] = useState<'init' | 'video' | 'bot'>('init');
  const [showModal, setShowModal] = useState(false);
  const [askedSkip, setAskedSkip] = useState(false);

  // Si ya saltaste antes, ve directo al chat
  useEffect(() => {
    if (typeof window !== 'undefined' && localStorage.getItem(SKIP_KEY) === '1') {
      setStep('bot');
    }
  }, []);

  const startVideo = () => {
    setStep('video');
  };

  const handleSkip = () => {
    if (!askedSkip) {
      setAskedSkip(true);
      const ok = window.confirm('🔥 ¿Seguro que querés saltarte esta intro brutal?');
      if (!ok) {
        return; // si cancela, sigue en video
      }
      localStorage.setItem(SKIP_KEY, '1');
    }
    setStep('bot');
  };

  const handleFinish = () => {
    setStep('bot');
  };

  const handleCloseVideo = () => {
    setStep('init');
  };

  return (
    <main
      className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center p-4"
      style={{ backgroundImage: "url('/imagenes/fondo/tu-fondo.png')" }}
    >
      {showModal && <ProfileModal onClose={() => setShowModal(false)} />}

      <div className="mt-10 cursor-pointer" onClick={() => setShowModal(true)}>
        <Image
          src="/imagenes/perfil/mifoto.jpg"
          alt="Perfil"
          width={128}
          height={128}
          className="rounded-full border-4 border-purple-500"
          priority
        />
      </div>

      <h1 className="mt-6 text-white text-4xl md:text-5xl font-bold drop-shadow-lg text-center">
        Powered by IA
      </h1>
      <p className="text-white mt-2 text-center max-w-xl opacity-80">
        Transformando ideas en realidad con IA, visión y código
      </p>

      <div className="w-full max-w-2xl mt-6 space-y-4">
        {step === 'init' && (
          <button
            onClick={startVideo}
            className="w-full bg-purple-700 hover:bg-purple-800 text-white font-bold py-3 rounded-full"
          >
            Empezar ahora
          </button>
        )}

        {step === 'video' && (
          <>
            <EmbeddedVideo
              onFinish={handleFinish}
              onSkip={handleSkip}
              onClose={handleCloseVideo}
            />
          </>
        )}

        {step === 'bot' && (
          <>
            <EmbeddedBot />
            <div className="flex justify-between mt-2 text-sm text-purple-300">
              <button onClick={startVideo} className="underline">
                🔁 Ver video otra vez
              </button>
              <button onClick={() => setStep('init')} className="underline">
                ✖ Volver al inicio
              </button>
            </div>
          </>
        )}
      </div>

      <footer className="text-sm text-white opacity-60 mt-6">
        v1.8 – LaunchLab web & mobile
      </footer>

      <section className="mt-20 text-white text-center max-w-4xl px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 border-b-2 inline-block border-purple-500">
          ¿Quién soy?
        </h2>
        <p className="text-lg">
          Soy un apasionado de la tecnología, la inteligencia artificial y la automatización.
        </p>
      </section>
    </main>
  );
}
