import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Powered by IA | Sistemas comerciales para captar, seguir y convertir',
  description:
    'Diseñamos sistemas comerciales y activos digitales para captar mejor, dar seguimiento con más claridad y convertir sin ruido innecesario.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
