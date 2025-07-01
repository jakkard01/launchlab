import './globals.css';
import type { Metadata } from 'next';
import IntroOverlay from './components/IntroOverlay';
import React from 'react';

export const metadata: Metadata = {
  title: 'Powered by IA',
  description: 'Transformando ideas en realidad con IA, visión y código',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [showIntro, setShowIntro] = React.useState(true);
  return (
    <html lang="es">
      <body>
        {showIntro && <IntroOverlay onFinish={() => setShowIntro(false)} />}
        {children}
      </body>
    </html>
  );
}
