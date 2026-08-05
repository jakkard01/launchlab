import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.poweredbyia.com'),
  title: {
    default: 'Diseño web para negocios locales en Alcalá | Powered by IA',
    template: '%s | Powered by IA',
  },
  description:
    'Diseño páginas web claras, rápidas y adaptadas a móvil para pequeños negocios de Alcalá de Henares. WhatsApp, ubicación, servicios y SEO local básico.',
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
    url: 'https://www.poweredbyia.com/',
    siteName: 'Powered by IA',
    title: 'Diseño web para negocios locales en Alcalá | Powered by IA',
    description:
      'Diseño páginas web claras, rápidas y adaptadas a móvil para pequeños negocios de Alcalá de Henares. WhatsApp, ubicación, servicios y SEO local básico.',
    images: [
      {
        url: '/imagenes/og-pbia-1200x630.jpg',
        width: 1200,
        height: 630,
        alt: 'Powered by IA — Diseño web para negocios locales',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Diseño web para negocios locales en Alcalá | Powered by IA',
    description:
      'Diseño páginas web claras, rápidas y adaptadas a móvil para pequeños negocios de Alcalá de Henares. WhatsApp, ubicación, servicios y SEO local básico.',
    images: ['/imagenes/og-pbia-1200x630.jpg'],
  },
};

const structuredData = [
  {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Powered by IA',
    url: 'https://www.poweredbyia.com',
    image: 'https://www.poweredbyia.com/imagenes/og-pbia-1200x630.jpg',
    areaServed: ['Alcalá de Henares y alrededores'],
    description:
      'Diseño de páginas web claras, rápidas y adaptadas a móvil para pequeños negocios.',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Powered by IA',
    url: 'https://www.poweredbyia.com',
    inLanguage: 'es-ES',
    description:
      'Diseño web claro y adaptado a móvil para pequeños negocios locales.',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Diseño web para negocios locales',
    provider: {
      '@type': 'Person',
      name: 'Powered by IA',
      url: 'https://www.poweredbyia.com',
    },
    areaServed: ['Alcalá de Henares y alrededores'],
    serviceType: [
      'Diseño web local',
      'SEO local básico',
    ],
    offers: [
      {
        '@type': 'Offer',
        name: 'Web Local Express',
        price: '490',
        priceCurrency: 'EUR',
      },
    ],
  },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {children}
      </body>
    </html>
  );
}
