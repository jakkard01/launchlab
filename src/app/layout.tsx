import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Powered by IA | Automatizaciones, bots y demos que convierten',
  description:
    'Diseñamos experiencias con IA, automatizaciones y demos claras para convertir mejor y operar con menos fricción.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
