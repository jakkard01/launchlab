import type { Metadata } from 'next';
import ComingSoon from '../components/ComingSoon'; // Ajustamos la ruta para salir un nivel hacia arriba

export const metadata: Metadata = {
  title: 'Cursos de IA y Automatización | Powered by IA',
  description: 'Formación práctica en Inteligencia Artificial, visión por computador y código. Próximamente.',
  alternates: {
    canonical: '/cursos',
  },
};

export default function CursosPage() {
  return (
    <main className="min-h-screen w-full">
      <ComingSoon 
        title="Academia Powered by IA"
        description="Estamos cocinando los mejores cursos prácticos de IA y automatización. Muy pronto podrás acceder."
      />
    </main>
  );
}
