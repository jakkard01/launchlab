import MainContent from './components/MainContent';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Powered by IA | IA aplicada para vender mejor y operar más claro',
  description:
    'Creamos demos, automatizaciones y experiencias con IA para negocios que quieren verse mejor, responder más rápido y convertir más.',
};

export default function HomePage() {
  return <MainContent />;
}
