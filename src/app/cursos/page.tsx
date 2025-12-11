import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cursos | Powered by IA',
  description:
    'Cursos prácticos de inteligencia artificial y automatización, diseñados para gente real con poco tiempo y muchas ganas de avanzar.',
};

export default function CursosPage() {
  return (
    <main className="min-h-screen w-full px-4 py-16 max-w-4xl mx-auto">
      <header className="text-center mb-10">
        <p className="text-xs uppercase tracking-[0.25em] text-sky-300/80">
          Formación en construcción
        </p>
        <h1 className="mt-2 text-3xl md:text-4xl font-semibold text-white">
          Cursos Powered by IA (en cocina)
        </h1>
        <p className="mt-4 text-sm md:text-base text-slate-200/80 max-w-2xl mx-auto">
          Aquí van a vivir los cursos gratuitos y de pago sobre IA práctica, automatización y uso
          inteligente de herramientas. Ahora mismo estamos en fase de guion, pruebas y grabación.
        </p>
      </header>

      <section className="space-y-6">
        <div className="rounded-2xl border border-white/10 bg-slate-950/40 backdrop-blur-sm p-5">
          <h2 className="text-lg md:text-xl font-semibold text-white">
            Primer curso gratuito en camino
          </h2>
          <p className="mt-2 text-sm md:text-base text-slate-200/80">
            El primer curso estará centrado en cómo usar la IA en tu día a día para ahorrar tiempo,
            tomar mejores decisiones y abrir nuevas oportunidades, sin necesidad de ser programador.
          </p>
          <p className="mt-3 text-sm text-slate-200/80">
            Lo verás nacer en directo: desde el guion hasta la publicación en YouTube y aquí en la
            web, lección por lección.
          </p>
        </div>

        <div className="rounded-2xl border border-dashed border-white/15 bg-slate-950/30 backdrop-blur-sm p-5">
          <h3 className="text-base md:text-lg font-semibold text-white">
            ¿Qué puedes esperar?
          </h3>
          <ul className="mt-2 text-sm md:text-base text-slate-200/80 space-y-1.5">
            <li>• Lecciones cortas y directas, pensadas para gente que trabaja.</li>
            <li>• Ejemplos reales usando herramientas como ChatGPT, Gemini, CapCut y más.</li>
            <li>• Proyectos prácticos que luego podrás enseñar en tu portafolio.</li>
          </ul>
        </div>

        <div className="text-xs md:text-sm text-slate-300/80 text-center mt-8">
          Mientras tanto, puedes ver los avances y contenido corto en el canal de YouTube de{' '}
          <span className="font-semibold">Powered by IA</span> y en la sección de prompts.
        </div>
      </section>
    </main>
  );
}
