// src/app/page.tsx
import type { Metadata } from 'next';
import HomeClient from './components/HomeClient';

export const metadata: Metadata = {
  title: 'Powered by IA | Sistemas IA listos para vender y escalar',
  description:
    'Sistemas IA aplicados para ventas, operaciones y automatización. Demos funcionales, integraciones y entrega rápida para equipos B2B.',
};

export default function HomePage() {
  return <HomeClient />;
}
