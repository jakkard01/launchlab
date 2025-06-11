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
    if (localStorage.getItem(SKIP_KEY) === '1') {
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
=======
import React, { useState } from 'react';
import Image from 'next/image';
import VideoModal from '../components/VideoModal';
import BotModal from '../components/BotModal';

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [showIntroVideo, setShowIntroVideo] = useState(true);
  const [showBot, setShowBot] = useState(false);

  const handleToggleModal = () => setModalOpen(!modalOpen);

  return (
    <>
      {/* Video de introducción que se cierra automáticamente */}
      {showIntroVideo && (
        <VideoModal
          isOpen={showIntroVideo}
          onClose={() => {
            setShowIntroVideo(false);
            setShowBot(true); // mostrar el bot después del video
          }}
        />
      )}

      {/* BotModal aparece después del video */}
      {showBot && <BotModal isOpen={showBot} onClose={() => setShowBot(false)} />}

      <main
        className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center px-4"
        style={{ backgroundImage: "url('/imagenes/fondo/tu-fondo.png')" }}
      >
        {/* Imagen de perfil con modal */}
        <section className="relative mt-10">
          <Image
            src="/imagenes/perfil/mifoto.jpg"
            alt="Foto de perfil"
            width={128}
            height={128}
            className="w-32 h-32 rounded-full border-4 border-purple-500 cursor-pointer hover:scale-105 transition-transform"
            onClick={handleToggleModal}
            priority
          />

          {modalOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
              onClick={handleToggleModal}
              role="dialog"
              aria-modal="true"
              aria-label="Ampliar imagen"
            >
              <div className="relative p-4">
                <Image
                  src="/imagenes/perfil/mifoto.jpg"
                  alt="Foto ampliada"
                  width={400}
                  height={400}
                  className="rounded-xl shadow-lg"
                  priority
                />
                <button
                  onClick={handleToggleModal}
                  className="absolute top-2 right-2 text-white text-2xl font-bold"
                  aria-label="Cerrar"
                >
                  ✕
                </button>
              </div>
            </div>
          )}
        </section>

        {/* Título de bienvenida */}
        <header className="mt-6 text-center">
          <h1 className="text-white text-4xl md:text-5xl font-bold drop-shadow-lg">
            Powered by IA
          </h1>
          <p className="text-white mt-2 text-lg md:text-xl opacity-80 max-w-xl">
            Transformando ideas en realidad con IA, visión y código
          </p>
        </header>

        {/* Botón de llamada a la acción */}
        <button
          className="mt-6 bg-purple-700 hover:bg-purple-800 text-white font-bold py-2 px-6 rounded-full transition-colors shadow-md"
          onClick={() => setShowBot(true)}
        >
          Empezar ahora
        </button>

        {/* Información de versión */}
        <footer className="text-sm text-white opacity-60 mt-4">
          v1.3 - LaunchLab app web/mobile
        </footer>

        {/* Sección sobre mí */}
        <section className="mt-20 max-w-4xl w-full text-white text-center px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 border-b-2 inline-block border-purple-500">
            ¿Quién soy?
          </h2>
          <p className="text-lg mt-2">
            Soy un apasionado de la tecnología, la inteligencia artificial y la automatización. Este proyecto es mi carta de presentación para mostrar mi evolución como desarrollador, estratega digital y creativo con propósito.
          </p>
        </section>
      </main>
    </>
  );

}
