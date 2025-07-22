"use client";

export default function ComingSoon({
  title = "Próximamente",
  description = "Estamos trabajando en esta sección. ¡Muy pronto disponible!",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <section className="flex flex-col items-center justify-center min-h-[60vh] py-16 text-center">
      <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">{title}</h1>
      <p className="text-cyan-200 text-lg mb-8 max-w-xl mx-auto">{description}</p>
      <div className="flex items-center justify-center">
        <span className="inline-block w-12 h-12 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></span>
      </div>
    </section>
  );
} 