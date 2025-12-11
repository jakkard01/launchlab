import type { Metadata } from 'next';
import PromptsList from './PromptsList';

export const metadata: Metadata = {
  title: 'Biblioteca de Prompts | Powered by IA',
  description: 'Colección de prompts optimizados para ChatGPT y Gemini: música, vídeo, productividad y cursos.',
};

export default function PromptsPage() {
  return (
    <main className="min-h-screen w-full px-4 py-24 max-w-6xl mx-auto relative z-10">
      <header className="mb-12 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-cyan-400 font-bold mb-3">
          Recursos de Ingeniería
        </p>
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
          Biblioteca de Prompts
        </h1>
        <p className="text-base md:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Selecciona una categoría para filtrar. Copia, pega y adapta estos prompts para tus proyectos.
        </p>
      </header>

      <PromptsList />
    </main>
  );
}