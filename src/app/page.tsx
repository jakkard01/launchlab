'use client';

import React, { useState } from 'react';
import Image from 'next/image';

/**
 * Modal para mostrar el video de introducción.
 */
const VideoModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl mx-4 sm:mx-auto"
        onClick={(e) => e.stopPropagation()} // evitar que se cierre el modal al hacer clic en el video
      >
        <video
          src="/videos/intro.mp4"
          controls
          controlsList="nodownload"
          preload="metadata"
          className="rounded-xl shadow-2xl w-full h-auto bg-black"
          style={{
            maxHeight: '80vh',
            objectFit: 'contain',
          }}
        />
        <button
          onClick={onClose}
          className="absolute top-2 right-4 text-white text-2xl font-bold"
          aria-label="Cerrar"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

/**
 * Modal para ampliar la imagen de perfil.
 */
const ProfileModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur"
      onClick={onClose}
    >
      <div className="relative" onClick={(e) => e.stopPropagation()}>
        <Image
          src="/imagenes/perfil/mifoto.jpg"
          alt="Foto ampliada"
          width={400}
          height={400}
          className="rounded-xl shadow-2xl"
        />
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white text-2xl font-bold"
          aria-label="Cerrar"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

/**
 * Página principal con fondo, CTA y secciones informativas.
 */
export default function Home() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <main
      className="min-h-screen bg-cover bg-center text-white flex flex-col items-center"
      style={{ backgroundImage: "url('/imagenes/fondo/tu-fondo.png')" }}
    >
      {/* Modales */}
      <VideoModal isOpen={isVideoOpen} onClose={() => setIsVideoOpen(false)} />
      <ProfileModal isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />

      {/* Encabezado principal */}
      <section className="mt-20 text-center px-4 z-10">
        <div className="flex justify-center mb-4">
          <Image
            src="/imagenes/perfil/mifoto.jpg"
            alt="Foto de perfil"
            width={100}
            height={100}
            className="rounded-full border-4 border-purple-600 shadow-lg cursor-pointer hover:scale-105 transition-transform"
            onClick={() => setIsProfileOpen(true)}
          />
        </div>

        <h1 className="text-4xl md:text-5xl font-bold drop-shadow-lg">
          Powered by IA
        </h1>
        <p className="mt-2 text-lg md:text-xl opacity-90">
          Transformando ideas en realidad con IA, visión y código
        </p>

        <button
          onClick={() => setIsVideoOpen(true)}
          className="mt-6 bg-purple-700 hover:bg-purple-800 text-white font-bold py-2 px-6 rounded-full transition-all shadow-lg"
        >
          Empezar ahora
        </button>

        <p className="text-sm opacity-60 mt-3">v1.3 – LaunchLab app web/mobile</p>
      </section>

      {/* Sección Quién Soy */}
      <section className="mt-24 max-w-4xl text-center px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 border-b-2 inline-block border-purple-500">
          ¿Quién soy?
        </h2>
        <p className="text-lg mt-2">
          Soy un apasionado de la tecnología, la inteligencia artificial y la automatización. Este proyecto es mi carta de presentación para mostrar mi evolución como desarrollador, estratega digital y creativo con propósito.
        </p>
      </section>
    </main>
  );
}
