import './globals.css';
import type { Metadata } from 'next';
import AppShell from './components/AppShell';
import { siteConfig, siteUrl } from '../lib/site';

// --- CONFIGURACIÓN SEO GLOBAL ---
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Powered by IA | Sistemas IA, automatización y productos digitales',
    template: `%s | ${siteConfig.brand}`,
  },
  description: 'Portafolio tech y servicios premium de IA aplicada: automatización, asistentes inteligentes y lanzamientos digitales.',
  alternates: {
    canonical: siteUrl,
  },
  manifest: "/site.webmanifest",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon.ico",
  },
  keywords: ['Inteligencia Artificial', 'Automatización', 'Prompts', 'Asistentes IA', 'n8n', 'Productos digitales'],
  authors: [{ name: siteConfig.brand }],
  creator: siteConfig.brand,
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: siteUrl,
    siteName: siteConfig.brand,
    title: 'Powered by IA | Sistemas IA listos para vender y escalar',
    description: 'Soluciones IA premium, demos funcionales y servicios para equipos exigentes.',
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.ogAlt,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Powered by IA | Sistemas IA premium',
    description: 'Portafolio tech, demos y servicios de IA aplicada.',
    images: [siteConfig.ogImage],
  },
  robots: {
    index: true,
    follow: true,
  },
};

// --- LAYOUT PRINCIPAL ---
export default function RootLayout({ children }: { children: React.ReactNode }) {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.brand,
    url: siteUrl,
    logo: `${siteUrl}${siteConfig.ogImage}`,
    email: siteConfig.email,
    sameAs: [
      siteConfig.socials.instagram,
      siteConfig.socials.tiktok,
      siteConfig.socials.youtube,
      siteConfig.socials.x,
      siteConfig.socials.facebook,
    ],
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.brand,
    url: siteUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteUrl}/?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html lang="es">
      <body className="relative min-h-screen">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
