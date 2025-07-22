"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function FAB() {
  const pathname = usePathname();
  if (pathname === '/') return null;
  return (
    <Link
      href="/"
      className="fixed bottom-6 right-6 z-50 bg-[rgba(0,0,0,0.3)] hover:scale-105 transition-transform duration-150 text-white rounded-full shadow-lg p-4 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-cyan-400"
      aria-label="Volver al inicio"
      style={{ boxShadow: '0 4px 24px 0 rgba(0,0,0,0.25)' }}
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0h6" /></svg>
    </Link>
  );
} 