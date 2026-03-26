import MainContent from './components/MainContent';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Powered by IA | Sistemas comerciales con foco en captación y conversión',
  description:
    'Creamos sistemas comerciales, casos aplicados y activos digitales para negocios que quieren captar mejor, responder con más orden y convertir más.',
};

export default function HomePage() {
  return <MainContent />;
}
