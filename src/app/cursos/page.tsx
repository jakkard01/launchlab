import ComingSoon from '../components/ComingSoon';

export const metadata = {
  title: "Cursos – Powered by IA",
  description: "Nuestros cursos de inteligencia artificial y automatización."
};

export default function CursosPage() {
  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center px-4 py-10">
      <ComingSoon
        title="Cursos (video‑podcasts)"
        description="Estamos preparando contenido en formato video‑podcast con HeyGen. ¡Muy pronto disponible!"
      />
    </main>
  );
} 