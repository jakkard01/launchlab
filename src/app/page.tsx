# Código refactorizado para sobrescribir `page.tsx` con buenas prácticas
refactored_page = """\
'use client';

import React, { useState } from 'react';
import Image from 'next/image';

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);

  const handleToggleModal = () => setModalOpen(!modalOpen);

  return (
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
        onClick={() => console.log('CTA clicked')}
      >
        Empezar ahora
      </button>

      {/* Información de versión */}
      <footer className="text-sm text-white opacity-60 mt-4">
        v1.1 - LaunchLab app web/mobile
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
  );
}
"""

# Sobrescribir el archivo
with open(page_path, 'w', encoding='utf-8') as f:
    f.write(refactored_page)

"✅ Archivo 'page.tsx' actualizado con refactor limpio y buenas prácticas."
