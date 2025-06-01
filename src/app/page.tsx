'use client';

import React, { useState } from 'react';
import Image from 'next/image';

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);

  const handleImageClick = () => {
    console.log("✅ Se hizo clic en la imagen");
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <main
      className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center px-4"
      style={{ backgroundImage: "url('/imagenes/fondo/tu-fondo.png')" }}
    >
      {/* Imagen de perfil */}
      <div className="relative">
        <Image
          src="/imagenes/perfil/mifoto.jpg"
          alt="Mi foto"
          width={128}
          height={128}
          className="w-32 h-32 rounded-full border-4 border-purple-500 cursor-pointer hover:scale-105 transition-transform"
          onClick={handleImageClick}
          priority
        />

        {/* MODAL */}
        {modalOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
            onClick={handleCloseModal}
          >
            <div className="relative p-4">
              <Image
                src="/imagenes/perfil/mifoto.jpg"
                alt="Mi foto grande"
                width={400}
                height={400}
                className="rounded-xl shadow-lg cursor-pointer"
                priority
              />
              <button
                onClick={handleCloseModal}
                className="absolute top-2 right-2 text-white text-2xl font-bold"
              >
                ✕
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Título */}
      <h1 className="text-white text-4xl md:text-5xl font-bold mt-6 text-center drop-shadow-lg">
        Powered by IA
      </h1>
      <p className="text-white text-center mt-2 text-lg md:text-xl opacity-80">
        Transformando ideas en realidad con IA, visión y código
      </p>

      {/* Botón */}
      <button className="mt-6 bg-purple-700 hover:bg-purple-800 text-white font-bold py-2 px-6 rounded-full transition-colors shadow-md">
        Empezar ahora
      </button>

      {/* Versión */}
      <p className="text-sm text-white opacity-60 mt-4">
        v1.1 - LaunchLab app web/mobile
      </p>

      {/* Sobre mí */}
      <section className="mt-20 max-w-4xl w-full text-white text-center px-6">
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
