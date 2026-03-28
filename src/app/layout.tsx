import './globals.css';
import type { Metadata } from 'next';
import { headers } from 'next/headers';
import AppShell from './components/AppShell';
import { siteConfig, siteUrl } from '../lib/site';
import {
  MO_BRAND,
  MO_CANONICAL_URL,
  MO_SITE_URL,
  MO_STORE_IMAGE_ALT,
  MO_STORE_IMAGE_SRC,
} from '../lib/mo/config';

const storeHosts = new Set(["rysminimarket.com", "www.rysminimarket.com"]);

const defaultMetadata: Metadata = {
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

const rysMetadata: Metadata = {
  metadataBase: new URL(MO_SITE_URL),
  title: {
    absolute: `${MO_BRAND.currentDisplayName} | Retiro fácil en La Gloria`,
  },
  description:
    'Bebidas, abarrotes y categorías claras para retiro en La Gloria, San Salvador. Pide por WhatsApp, te confirmamos y pasas a retirar.',
  alternates: {
    canonical: MO_CANONICAL_URL,
  },
  manifest: "/site.webmanifest",
  icons: {
    icon: "/rys/favicon/rys-mini-market-cart.svg",
    apple: "/rys/favicon/rys-mini-market-apple-touch.svg",
    shortcut: "/rys/favicon/rys-mini-market-cart.svg",
  },
  keywords: ['RYS Mini Market', 'RYS Minimarket', 'minimarket', 'retiro en tienda', 'La Gloria', 'San Salvador'],
  authors: [{ name: MO_BRAND.currentDisplayName }],
  creator: MO_BRAND.currentDisplayName,
  openGraph: {
    type: 'website',
    locale: 'es_SV',
    url: MO_CANONICAL_URL,
    siteName: MO_BRAND.currentDisplayName,
    title: `${MO_BRAND.currentDisplayName} | Retiro fácil en La Gloria`,
    description: 'Compra rápida por WhatsApp y retiro confirmado antes de salir.',
    images: [
      {
        url: `${MO_SITE_URL}${MO_STORE_IMAGE_SRC}`,
        width: 1200,
        height: 1200,
        alt: `${MO_BRAND.currentDisplayName}. ${MO_STORE_IMAGE_ALT}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${MO_BRAND.currentDisplayName} | Retiro fácil en La Gloria`,
    description: 'Compra rápida por WhatsApp y retiro confirmado antes de salir.',
    images: [`${MO_SITE_URL}${MO_STORE_IMAGE_SRC}`],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const host = (await headers()).get("host")?.toLowerCase() ?? "";
  return storeHosts.has(host) ? rysMetadata : defaultMetadata;
}

// --- LAYOUT PRINCIPAL ---
export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const host = (await headers()).get("host")?.toLowerCase() ?? "";
  const isStoreHost = storeHosts.has(host);
  const organizationJsonLd = isStoreHost
    ? {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: MO_BRAND.currentDisplayName,
        url: MO_SITE_URL,
        logo: `${MO_SITE_URL}${MO_STORE_IMAGE_SRC}`,
      }
    : {
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

  const websiteJsonLd = isStoreHost
    ? {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: MO_BRAND.currentDisplayName,
        url: MO_SITE_URL,
        potentialAction: {
          "@type": "SearchAction",
          target: `${MO_SITE_URL}/?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      }
    : {
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
          dangerouslySetInnerHTML={{
            __html: `(() => {
  try {
    const storeHosts = ["rysminimarket.com", "www.rysminimarket.com"];
    const host = window.location.hostname.toLowerCase();
    const root = document.documentElement;
    if (storeHosts.includes(host)) {
      root.dataset.storeHost = "rys";
    } else {
      delete root.dataset.storeHost;
    }
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const theme = stored === "dark" || stored === "light" ? stored : (prefersDark ? "dark" : "light");
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    root.style.colorScheme = theme;
  } catch {}
})();`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <AppShell isStoreHost={isStoreHost}>{children}</AppShell>
      </body>
    </html>
  );
}
