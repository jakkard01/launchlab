'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import ProfileModal from './ProfileModal';
import About from './About';

const HomeContent: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [showAbout, setShowAbout] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowModal(true);
    }, 2000); // muestra el modal a los 2 segundos
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center bg-black text-white">
      {/* Imagen de fondo borrosa */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <Image
          src="/images/fondo-brujo.jpg" // 📸 asegúrate que esta imagen exista en /public/images
          alt="Fondo IA"
          layout="fill"
          objectFit="cover"
          quality={80}
          className="blur-sm brightness-75"
        />
      </div>

      {/* Foto de perfil */}
      <div className="z-10 mb-6 flex items-center justify-center">
        <Image
          src="/imagenes/perfil/perfil-v2.jpg"
          alt="Avatar Gerardo"
          width={160}
          height={160}
          className="rounded-full border-4 border-white shadow-lg object-cover"
        />
      </div>

      {/* Título principal */}
      <h1 className="z-10 text-center text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
        Powered by <span className="text-[#00ffd8]">IA</span>
      </h1>

      {/* Subtítulo */}
      <p className="z-10 mt-4 max-w-xl text-center text-lg font-light text-white/90 sm:text-xl">
        Transformando ideas en realidad con inteligencia artificial, visión y código.
      </p>

      {/* Botón para mostrar info personal */}
      <div className="mt-6">
        <button
          onClick={() => setShowModal(true)}
          className="rounded-xl border border-white bg-transparent px-6 py-3 text-white transition-all hover:bg-white hover:text-black"
        >
          ¿Quién soy?
        </button>
      </div>

      {/* Modal de información */}
      {showModal && (
        <ProfileModal onClose={() => setShowModal(false)} />
      )}

      {/* Información adicional (About) */}
      {showAbout && (
        <section className="z-10 mt-12 w-full max-w-4xl px-4">
          <About />
        </section>
      )}
    </main>
  );
};

export default HomeContent;
