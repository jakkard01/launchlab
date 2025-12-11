// src/app/layout.tsx
import './globals.css'
import { Inter } from 'next/font/google'
import type { Metadata } from 'next'
import ClientLayout from './components/ClientLayout'
import FAB from './components/FAB';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Powered by IA',
  description: 'Transformando ideas en resultados con IA, visión y código',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={inter.className + ' relative min-h-screen'}>
        {/* Fondo galaxia global */}
        <div className="fixed inset-0 -z-10 w-full h-full bg-galaxy bg-cover bg-center bg-no-repeat" aria-hidden="true" />
        <ClientLayout>
          {children}
        </ClientLayout>
        {/* FAB global: solo visible si no estamos en la home */}
        <FAB />
      </body>
    </html>
  );
}
