// src/app/page.tsx
import type { Metadata } from 'next';
import HomeClient from './components/HomeClient';
import { siteConfig } from '../lib/site';

export const metadata: Metadata = {
  title: 'Powered by IA | Sistemas IA listos para vender y escalar',
  description:
    'Sistemas IA aplicados para ventas, operaciones y automatización. Demos funcionales, integraciones y entrega rápida para equipos B2B.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Powered by IA | Sistemas IA listos para vender y escalar',
    description:
      'Sistemas IA aplicados para ventas, operaciones y automatización. Demos funcionales, integraciones y entrega rápida para equipos B2B.',
    images: [
      {
        url: siteConfig.ogImage,
        alt: siteConfig.ogAlt,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Powered by IA | Sistemas IA listos para vender y escalar',
    description:
      'Sistemas IA aplicados para ventas, operaciones y automatización. Demos funcionales, integraciones y entrega rápida para equipos B2B.',
    images: [siteConfig.ogImage],
  },
};

export default function HomePage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "¿Qué tipo de empresas atienden?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Startups, pymes y equipos enterprise que necesitan IA aplicada.",
        },
      },
      {
        "@type": "Question",
        name: "¿Cuánto tarda un proyecto?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Entre 2 y 6 semanas según alcance y validaciones.",
        },
      },
      {
        "@type": "Question",
        name: "¿Ofrecen soporte continuo?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sí, con planes de mantenimiento y evolución trimestral.",
        },
      },
      {
        "@type": "Question",
        name: "¿Pueden integrarse con mi stack actual?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sí, trabajamos con APIs, CRMs y herramientas existentes.",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <HomeClient />
    </>
  );
}
