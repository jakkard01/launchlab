import type { Metadata } from 'next';
import MainContent from './components/MainContent';

export const metadata: Metadata = {
  title: 'Powered by IA — Webs rápidas e IA para negocios locales',
  description:
    'Diseño webs claras para negocios locales en Alcalá de Henares y Madrid, con WhatsApp, SEO local, captación de contactos, automatización básica e IA aplicada.',
  alternates: {
    canonical: 'https://www.poweredbyia.com/',
  },
};

export default function HomePage() {
  return <MainContent />;
}
