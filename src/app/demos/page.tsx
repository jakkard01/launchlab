export default function DemosPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-3xl font-semibold">Demos</h1>
      <p className="mt-3 opacity-80">
        Ejemplos reales: bots, automatizaciones y vídeo IA. Sin humo. Sin PowerPoint.
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <a className="rounded-2xl border p-5 hover:opacity-90" href="/demos/bot">
          <h2 className="text-xl font-semibold">Demo: Bot de atención</h2>
          <p className="mt-2 opacity-80">Simulador rápido para ver cómo respondería en tu negocio.</p>
        </a>

        <a className="rounded-2xl border p-5 hover:opacity-90" href="/prompts">
          <h2 className="text-xl font-semibold">Biblioteca de Prompts</h2>
          <p className="mt-2 opacity-80">Recursos listos para usar (esta ruta no se toca).</p>
        </a>
      </div>
    </main>
  );
}
