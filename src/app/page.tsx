'use client';

import React, { useState } from 'react';
import Image from 'next/image'; // Usamos el componente optimizado de Next.js

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);

  // Abre el modal cuando se hace clic en la imagen
  const handleImageClick = () => {
    setModalOpen(true);
  };

  // Cierra el modal cuando se hace clic en la superposición
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <main
      className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center px-4"
      // Imagen de fondo general desde carpeta pública
      style={{ backgroundImage: "url('/imagenes/fondo/tu-fondo.png')" }}
    >
      {/* Imagen de perfil redonda con borde y animación */}
      <div className="relative">
        <Image
          src="/imagenes/profile/mifoto.jpg"
          alt="Mi foto"
          width={128}
          height={128}
          className="rounded-full border-4 border-purple-500 cursor-pointer hover:scale-105 transition-transform"
          onClick={handleImageClick}
        />

        {/* Modal (pantalla completa) que aparece al hacer clic */}
        {modalOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
            onClick={handleCloseModal}
          >
            <Image
              src="/imagenes/profile/mifoto.jpg"
              alt="Mi foto grande"
              width={600}
              height={600}
              className="rounded-xl shadow-lg"
            />
          </div>
        )}
      </div>

      {/* Título principal */}
      <h1 className="text-white text-4xl md:text-5xl font-bold mt-6 text-center drop-shadow-lg">
        Powered by IA
      </h1>

      {/* Subtítulo o descripción */}
      <p className="text-white text-center mt-2 text-lg md:text-xl opacity-80">
        Transformando ideas en realidad con IA, visión y código
      </p>

      {/* Botón principal */}
      <button className="mt-6 bg-purple-700 hover:bg-purple-800 text-white font-bold py-2 px-6 rounded-full transition-colors shadow-md">
        Empezar ahora
      </button>

      {/* Pie con la versión actual */}
      <p className="text-sm text-white opacity-60 mt-4">
        v1.2 - LaunchLab app web/mobile
      </p>

      {/* Sección modular "Sobre mí" */}
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
