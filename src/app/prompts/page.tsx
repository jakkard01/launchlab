'use client';

import { useState } from 'react';

export default function PromptsPage() {
  const [copiedIdx, setCopiedIdx] = useState<number|null>(null);
  const prompts = [
    {
      categoria: 'Fotografía y Realismo',
      titulo: 'Foto Profesional de Comida',
      descripcion: 'Usa este prompt para crear imágenes de comida realistas y apetitosas, perfectas para Instagram o blogs de recetas.',
      prompt: 'Genera una fotografía profesional de un plato gourmet, iluminación natural, fondo desenfocado, estilo food magazine.'
    },
    {
      categoria: 'Ilustración y Arte Digital',
      titulo: 'Retrato Estilo Cómic',
      descripcion: 'Prompt para crear retratos en estilo cómic americano, ideal para portadas o avatares llamativos.',
      prompt: 'Ilustración digital de un héroe en estilo cómic americano, colores vibrantes, fondo dinámico.'
    },
    {
      categoria: 'Marketing y Redes Sociales',
      titulo: 'Post Viral para Instagram',
      descripcion: 'Prompt para generar ideas de posts virales y atractivos para redes sociales.',
      prompt: 'Crea un post visualmente impactante para Instagram sobre consejos de productividad, colores brillantes, tipografía moderna.'
    }
  ];
  const categorias = [
    'Fotografía y Realismo',
    'Ilustración y Arte Digital',
    'Marketing y Redes Sociales',
    'Herramientas y Vida Diaria'
  ];
  return (
    <main
      className="min-h-screen w-full flex flex-col items-center px-4 py-10 relative"
      style={{
        backgroundImage: 'url(/imagenes/fondo/fondoprompts.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="w-full max-w-3xl mx-auto text-center mb-10 bg-black/60 rounded-2xl py-8 px-4 shadow-lg">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 drop-shadow-lg">Bóveda de Prompts</h1>
        <p className="text-cyan-200 text-lg mb-4">Explora, copia y comparte los mejores prompts para IA</p>
        <div className="flex flex-wrap justify-center gap-2 mb-2">
          {categorias.map(cat => (
            <span key={cat} className="px-4 py-1 rounded-full bg-cyan-900/60 text-cyan-200 text-sm font-semibold shadow focus:outline-none focus:ring-2 focus:ring-cyan-400 cursor-pointer">{cat}</span>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        {prompts.map((p, i) => (
          <div key={i} className="bg-black/70 rounded-2xl shadow-lg p-6 flex flex-col gap-4 border border-cyan-900/40 items-stretch">
            <h2 className="text-xl font-bold text-cyan-300 mb-1 text-left">{p.titulo}</h2>
            <p className="text-gray-200 text-sm mb-2 text-left">{p.descripcion}</p>
            <pre className="bg-gray-900/80 text-cyan-100 rounded-lg p-4 text-sm overflow-x-auto select-all font-mono mb-3 whitespace-pre-wrap w-full">{p.prompt}</pre>
            <div className="flex justify-center">
              <button
                className="bg-cyan-700 hover:bg-cyan-500 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-cyan-400 text-sm font-semibold transition"
                onClick={async () => {
                  await navigator.clipboard.writeText(p.prompt);
                  setCopiedIdx(i);
                  setTimeout(() => setCopiedIdx(null), 1500);
                }}
                aria-label="Copiar Prompt"
              >
                {copiedIdx === i ? '¡Copiado!' : 'Copiar Prompt'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
} 