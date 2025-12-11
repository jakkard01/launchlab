import type { Metadata } from 'next';
import PromptsList from './PromptsList';

export const metadata: Metadata = {
  title: 'Biblioteca de Prompts | Powered by IA',
  description: 'Colección de prompts optimizados para ChatGPT y Gemini: programación, productividad, creación de contenido y más.',
  openGraph: {
    title: 'Biblioteca de Prompts | Powered by IA',
    description: 'Copia y pega los mejores prompts para IA. Optimizados para resultados reales.',
    url: 'https://www.poweredbyia.com/prompts',
  },
};

export default function PromptsPage() {
  // Datos estructurados JSON-LD para Google
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Biblioteca de Prompts IA',
    description: 'Recopilación de prompts técnicos y creativos para ChatGPT y Gemini.',
    url: 'https://www.poweredbyia.com/prompts',
    provider: {
      '@type': 'Organization',
      name: 'Powered by IA',
      url: 'https://www.poweredbyia.com'
    }
  };

  return (
    <main className="min-h-screen w-full px-4 py-16 max-w-5xl mx-auto">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <header className="mb-10 text-center">
        <p className="text-xs uppercase tracking-[0.25em] text-sky-300/80">
          Biblioteca de recursos
        </p>
        <h1 className="mt-2 text-3xl md:text-4xl font-semibold text-white">
          Prompts listos para copiar y usar
        </h1>
        <p className="mt-4 text-sm md:text-base text-slate-200/80 max-w-2xl mx-auto">
          Esta página recoge los prompts que más uso en mi día a día para música, vídeos, cursos y
          productividad. Están pensados para ChatGPT, Gemini o cualquier otra IA de texto.
        </p>
      </header>

      {/* Aquí cargamos la lista interactiva que movimos al otro archivo */}
      <PromptsList />

      <p className="mt-10 text-xs text-center text-slate-300/70">
        Iré añadiendo más prompts a medida que avance el proyecto (trading, bots, automatizaciones,
        etc.).
      </p>
    </main>
  );
}