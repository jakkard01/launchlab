import type { Metadata } from 'next';
import MainContent from './components/MainContent';

export const metadata: Metadata = {
  title: 'Diseño web para negocios locales en Alcalá | Powered by IA',
  description:
    'Diseño páginas web claras, rápidas y adaptadas a móvil para pequeños negocios de Alcalá de Henares. WhatsApp, ubicación, servicios y SEO local básico.',
  alternates: {
    canonical: 'https://www.poweredbyia.com/',
  },
};

export default function HomePage() {
  return <MainContent />;
}
