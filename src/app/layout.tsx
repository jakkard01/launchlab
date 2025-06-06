// src/app/layout.tsx
import './globals.css'
import { ReactNode } from 'react'

export const metadata = {
  title: 'Powered by IA 😈',
  description: 'Portfolio impulsado por inteligencia artificial, visión y código👽.',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-gray-900">{children}</body>
    </html>
  )
}
