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

  // Si ya eligió saltar la intro alguna vez, va directo al bot
  useEffect(() => {
    if (localStorage.getItem(SKIP_KEY) === '1') {
      setStep('bot');
    }
  }, []);

  // Empieza el video SIN confirmación
  const startVideo = () => {
    setStep('video');
  };

  // Solo al pulsar "Saltar Intro" aparece confirmación
  const handleSkip = () => {
    const ok = window.confirm('🔥 ¿Seguro que querés saltarte esta intro brutal?');
    if (ok) {
      localStorage.setItem(SKIP_KEY, '1');
      setStep('bot');
    }
    // si cancela, permanece en video
  };

  // Cuando termina el video
  const finishVideo = () => {
    setStep('bot');
  };

  // Cerrar video y volver al inicio
  const closeVideo = () => {
    setStep('init');
  };

  return (
    <main
      className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center p-4"
      style={{ backgroundImage: "url('/imagenes/fondo/tu-fondo.png')" }}
    >
      {/* Modal de perfil */}
      {showModal && <ProfileModal onClose={() => setShowModal(false)} />}

      {/* Foto de perfil clicable */}
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

      {/* Título */}
      <h1 className="mt-6 text-white text-4xl md:text-5xl font-bold drop-shadow-lg text-center">
        Powered by IA
      </h1>
      <p className="text-white mt-2 text-center max-w-xl opacity-80">
        Transformando ideas en realidad con IA, visión y código
      </p>

      {/* Zona dinámica */}
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
          <EmbeddedVideo
            onFinish={finishVideo}
            onSkip={handleSkip}
            onClose={closeVideo}
          />
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

      {/* Footer */}
      <footer className="text-sm text-white opacity-60 mt-6">
        v1.8 – LaunchLab web & mobile
      </footer>

      {/* Sección "¿Quién soy?" */}
      <section className="mt-20 text-white text-center max-w-4xl px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 inline-block border-b-2 border-purple-500">
          ¿Quién soy?
        </h2>
        <p className="text-lg">
          Soy un apasionado de la tecnología, la inteligencia artificial y la automatización.
        </p>
      </section>
    </main>
);
}
