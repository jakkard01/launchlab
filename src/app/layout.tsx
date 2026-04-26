import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.poweredbyia.com'),
  title: {
    default: 'Powered by IA | Diseño web para negocios locales en Alcalá de Henares',
    template: '%s | Powered by IA',
  },
  description:
    'Webs claras, rápidas y enfocadas en captar contactos para negocios locales. Diseño web, mejora de páginas existentes y captación ordenada por WhatsApp, formulario o correo.',
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
    url: 'https://www.poweredbyia.com',
    siteName: 'Powered by IA',
    title: 'Powered by IA | Diseño web para negocios locales en Alcalá de Henares',
    description:
      'Webs claras, rápidas y enfocadas en captar contactos para negocios locales. Diseño web, mejora de páginas existentes y captación ordenada por WhatsApp, formulario o correo.',
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
    title: 'Powered by IA | Diseño web para negocios locales en Alcalá de Henares',
    description:
      'Webs claras, rápidas y enfocadas en captar contactos para negocios locales. Diseño web, mejora de páginas existentes y captación ordenada por WhatsApp, formulario o correo.',
    images: ['/imagenes/pbidesk.jpeg'],
  },
};

const structuredData = [
  {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Powered by IA',
    url: 'https://www.poweredbyia.com',
    image: 'https://www.poweredbyia.com/imagenes/pbidesk.jpeg',
    email: 'poweredbyiaoficial@gmail.com',
    telephone: '+34911528753',
    areaServed: ['Alcalá de Henares', 'Madrid', 'España'],
    description:
      'Diseño web para negocios locales, mejora de páginas existentes y captación ordenada por WhatsApp, formulario o correo.',
    priceRange: '€€',
    sameAs: ['https://www.poweredbyia.com'],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Powered by IA',
    url: 'https://www.poweredbyia.com',
    inLanguage: 'es-ES',
    description:
      'Webs claras, rápidas y enfocadas en captar contactos para negocios locales.',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Diseño web para negocios locales',
    provider: {
      '@type': 'LocalBusiness',
      name: 'Powered by IA',
      url: 'https://www.poweredbyia.com',
    },
    areaServed: ['Alcalá de Henares', 'Madrid'],
    serviceType: [
      'Diseño web local',
      'Mejora de páginas web',
      'Captación ordenada de contactos',
    ],
    offers: [
      {
        '@type': 'Offer',
        name: 'Mejora Web Express',
        price: '180',
        priceCurrency: 'EUR',
      },
      {
        '@type': 'Offer',
        name: 'Web Local Base',
        price: '350',
        priceCurrency: 'EUR',
      },
      {
        '@type': 'Offer',
        name: 'Pack Web + Contactos',
        price: '500',
        priceCurrency: 'EUR',
      },
      {
        '@type': 'Offer',
        name: 'Pack Pro Captación',
        price: '750',
        priceCurrency: 'EUR',
      },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: '¿Cuánto cuesta una web?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Una mejora empieza desde 180 €. Una web local clara desde 350 €. Si quieres ordenar contactos, el pack recomendado empieza desde 500 €.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Qué necesito para empezar?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Una explicación breve de tu negocio, servicios, zona, forma de contacto y, si ya tienes web, el enlace actual.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Cuánto tarda?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Depende del alcance. Una mejora simple puede ir rápido; una web nueva necesita estructura, textos, revisión móvil y publicación.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Qué diferencia hay entre una web normal y una web preparada para captar contactos?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Una web preparada para captar contactos explica rápido, genera confianza y deja WhatsApp, formulario o correo como siguiente paso claro.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Puedo empezar solo con WhatsApp?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Sí. WhatsApp puede ser el contacto principal. Si necesitas más orden, se puede sumar formulario y registro simple.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Y si ya tengo web?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Podemos revisar la web actual y mejorar estructura, textos, móvil y llamadas a la acción sin rehacer todo desde cero.',
        },
      },
      {
        '@type': 'Question',
        name: '¿El bot IA ya está disponible?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Está en modo demo/FAQ. No promete 24/7 si el servidor local está apagado y no sustituye atención humana.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Hay mantenimiento mensual?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No es obligatorio. Se puede plantear solo si necesitas cambios frecuentes, medición, campañas o mejoras continuas.',
        },
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
