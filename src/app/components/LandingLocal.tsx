"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface LandingLocalProps {
  onShowVideo: () => void;
  heroRef: React.RefObject<HTMLDivElement>;
  onScrollToHero: () => void;
}

const accesos = [
  {
    titulo: 'Prompts',
    descripcion: 'Explora y copia los mejores prompts para IA',
    icono: '/favicon.ico',
    link: '/prompts'
  },
  {
    titulo: 'Cursos',
    descripcion: 'Aprende IA, visión y código desde cero',
    icono: '/favicon.ico',
    link: '/cursos'
  },
  {
    titulo: 'Bot',
    descripcion: 'Chatea con nuestro bot de IA',
    icono: '/favicon.ico',
    link: '#bot'
  }
];

export default function LandingLocal({ onShowVideo, heroRef, onScrollToHero }: LandingLocalProps) {
  const [imgError, setImgError] = useState(false);
  const [showModal, setShowModal] = useState(false);

  return (
    <main
      className="min-h-screen w-full flex flex-col items-center px-2 py-6 sm:px-4 sm:py-10 relative"
      style={{
        backgroundImage: 'url(/imagenes/fondo/tu-fondo.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Modal de imagen grande */}
      {showModal && !imgError && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm" onClick={() => setShowModal(false)}>
          <div className="relative" onClick={e => e.stopPropagation()}>
            <Image
              src="/imagenes/perfil/mifoto.jpg"
              alt="Foto de perfil grande"
              width={320}
              height={320}
              className="rounded-full w-80 h-80 ring-8 ring-purple-500 object-cover shadow-2xl"
              priority
            />
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 bg-black/60 text-white rounded-full p-2 hover:bg-black/80 focus:outline-none focus:ring-2 focus:ring-purple-400"
              aria-label="Cerrar imagen"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
        </div>
      )}
      {/* Hero */}
      <div ref={heroRef} className="w-full max-w-2xl mx-auto text-center mb-10 bg-black/60 rounded-2xl py-8 px-4 shadow-lg mt-8">
        {/* Foto de perfil redonda si existe */}
        {!imgError && (
          <button
            onClick={() => setShowModal(true)}
            className="focus:outline-none focus:ring-2 focus:ring-purple-400 rounded-full mb-4"
            aria-label="Ver foto de perfil en grande"
            tabIndex={0}
          >
            <Image
              src="/imagenes/perfil/mifoto.jpg"
              alt="Foto de perfil"
              width={96}
              height={96}
              className="rounded-full w-24 h-24 ring-4 ring-purple-500 mx-auto object-cover"
              onError={() => setImgError(true)}
              priority
            />
          </button>
        )}
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 drop-shadow-lg">Powered by IA</h1>
        <p className="text-cyan-200 text-lg mb-4">Transformando ideas en resultados con IA, visión y código</p>
        <button
          onClick={onShowVideo}
          className="bg-purple-600 hover:bg-purple-500 text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg transition mb-4 focus:outline-none focus:ring-2 focus:ring-purple-400"
          aria-label="Ver video de bienvenida"
        >
          <span className="inline-flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-6.518-3.759A1 1 0 007 8.118v7.764a1 1 0 001.234.97l6.518-1.757A1 1 0 0016 14.118V9.882a1 1 0 00-1.248-.714z" /></svg>
            Ver video de bienvenida
          </span>
        </button>
        <p className="text-gray-300 mb-2">Bienvenido a LaunchLab, tu espacio para aprender, experimentar y crear con inteligencia artificial. Explora prompts, cursos y herramientas para potenciar tus ideas.</p>
      </div>
      {/* Accesos rápidos */}
      <section className="w-full max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mb-16">
        {accesos.map((a) => (
          <Link
            key={a.titulo}
            href={a.link}
            className="flex flex-col items-center bg-black/60 rounded-2xl shadow-lg p-6 hover:bg-cyan-900/40 transition focus:outline-none focus:ring-2 focus:ring-cyan-400"
          >
            <Image src={a.icono} alt={a.titulo} width={48} height={48} className="mb-3" loading="lazy" />
            <h3 className="text-lg font-bold text-cyan-200 mb-1">{a.titulo}</h3>
            <p className="text-gray-300 text-sm text-center">{a.descripcion}</p>
          </Link>
        ))}
      </section>
      <section className="w-full max-w-2xl mx-auto text-center mb-10 bg-black/40 rounded-2xl py-6 px-4 shadow mt-4">
        <h2 className="text-2xl font-bold text-cyan-300 mb-2">¿Qué puedes hacer aquí?</h2>
        <ul className="text-gray-200 text-left mx-auto max-w-md list-disc list-inside space-y-2">
          <li>Explorar y copiar prompts para IA generativa.</li>
          <li>Aprender sobre inteligencia artificial, visión y código con cursos y recursos.</li>
          <li>Chatear con nuestro bot de IA para resolver dudas o inspirarte.</li>
          <li>Descubrir novedades y herramientas cada semana.</li>
        </ul>
      </section>
      <footer className="w-full text-center text-cyan-200 py-6 opacity-80 text-sm mt-auto">
        &copy; {new Date().getFullYear()} Powered by IA — LaunchLab web & mobile
      </footer>
      {/* FAB flotante para volver al inicio */}
      <button
        onClick={onScrollToHero}
        className="fixed bottom-6 right-6 z-40 bg-cyan-700 hover:bg-cyan-500 text-white rounded-full shadow-lg p-4 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
        aria-label="Volver al inicio"
        style={{ boxShadow: '0 4px 24px 0 rgba(0,0,0,0.25)' }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0h6" /></svg>
      </button>
    </main>
  );
} 