import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.poweredbyia.com'),
  title: {
    default: 'Powered by IA | Webs, mejoras y automatización para negocios locales',
    template: '%s | Powered by IA',
  },
  description:
    'Webs y soluciones digitales para negocios locales. Mejoramos webs existentes, automatizamos la entrada de contactos y damos un enfoque práctico, claro y sin humo.',
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: '/',
    siteName: 'Powered by IA',
    title: 'Powered by IA | Webs, mejoras y automatización para negocios locales',
    description:
      'Webs y soluciones digitales para negocios locales. Mejoramos webs existentes, automatizamos la entrada de contactos y damos un enfoque práctico, claro y sin humo.',
    images: [
      {
        url: '/imagenes/pbidesk.jpeg',
        width: 1200,
        height: 630,
        alt: 'Powered by IA: webs y soluciones digitales para negocios locales',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Powered by IA | Webs, mejoras y automatización para negocios locales',
    description:
      'Webs y soluciones digitales para negocios locales. Mejoramos webs existentes, automatizamos la entrada de contactos y damos un enfoque práctico, claro y sin humo.',
    images: ['/imagenes/pbidesk.jpeg'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
