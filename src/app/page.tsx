// src/app/page.tsx
import type { Metadata } from 'next';
import HomeClient from './components/HomeClient';
import { site } from '../lib/site';

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
        url: site.ogImage,
        alt: site.ogAlt,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Powered by IA | Sistemas IA listos para vender y escalar',
    description:
      'Sistemas IA aplicados para ventas, operaciones y automatización. Demos funcionales, integraciones y entrega rápida para equipos B2B.',
    images: [site.ogImage],
  },
};

export default function HomePage() {
  return <HomeClient />;
}
