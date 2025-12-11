import './globals.css';
import { Inter } from 'next/font/google';
import type { Metadata, Viewport } from 'next';
import ClientLayout from './components/ClientLayout';
import FAB from './components/FAB';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://www.poweredbyia.com'),
  title: {
    default: 'Powered by IA | Transformando ideas con Inteligencia Artificial',
    template: '%s | Powered by IA',
  },
  description: 'Plataforma de aprendizaje sobre IA, prompts y código. Transforma ideas en resultados reales con herramientas de automatización.',
  keywords: ['Inteligencia Artificial', 'Prompts', 'ChatGPT', 'Gemini', 'Cursos IA', 'Desarrollo Web', 'Automatización'],
  authors: [{ name: 'Powered by IA' }],
  creator: 'Powered by IA',
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://www.poweredbyia.com',
    siteName: 'Powered by IA',
    title: 'Powered by IA | Domina la Inteligencia Artificial',
    description: 'Transformando ideas en resultados reales con IA, visión y código.',
    images: [
      {
        url: '/imagenes/perfil/mifoto.jpg',
        width: 1200,
        height: 630,
        alt: 'Powered by IA - Transformando ideas',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Powered by IA',
    description: 'Aprende a usar la IA para proyectos reales.',
    images: ['/imagenes/perfil/mifoto.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={inter.className + ' relative min-h-screen'}>
        {/* Fondo galaxia global */}
        <div 
          className="fixed inset-0 -z-10 w-full h-full bg-galaxy bg-cover bg-center bg-no-repeat" 
          aria-hidden="true" 
        />
        <ClientLayout>
          {children}
        </ClientLayout>
        <FAB />
      </body>
    </html>
  );
}