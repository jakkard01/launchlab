// src/app/page.tsx
import type { Metadata } from 'next';
import HomeClient from './components/HomeClient';
import { siteConfig } from '../lib/site';

export const metadata: Metadata = {
  title: 'Powered by IA | Sistemas IA listos para vender y escalar',
  description:
    'Sistemas de IA listos para vender y escalar. Captación, seguimiento y soporte con demos y casos reales.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Powered by IA | Sistemas IA listos para vender y escalar',
    description:
      'Sistemas de IA listos para vender y escalar. Captación, seguimiento y soporte con demos y casos reales.',
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
      'Sistemas de IA listos para vender y escalar. Captación, seguimiento y soporte con demos y casos reales.',
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
          text: "Startups, pymes y equipos B2B que necesitan IA aplicada con foco en ventas y operación.",
        },
      },
      {
        "@type": "Question",
        name: "¿Cuánto tarda un proyecto?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Entre 7 y 30 días según alcance, integraciones y validaciones.",
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

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Sistemas de IA listos para vender y escalar",
    serviceType: [
      "Captación y seguimiento automatizado",
      "Asistentes inteligentes para soporte",
      "Integraciones con CRM y WhatsApp",
    ],
    provider: {
      "@type": "Organization",
      name: siteConfig.brand,
      url: siteConfig.domain.startsWith("http")
        ? siteConfig.domain
        : `https://${siteConfig.domain}`,
    },
    areaServed: "Global",
    audience: {
      "@type": "BusinessAudience",
      audienceType: "B2B",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <HomeClient />
    </>
  );
}
