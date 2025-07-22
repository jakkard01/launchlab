"use client";
import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed top-0 inset-x-0 z-[50] bg-black/70 backdrop-blur flex items-center justify-between px-6 py-4">
      {/* Logo */}
      <Link href="/" className="font-bold text-cyan-400">Powered by IA</Link>
    </header>
  );
} 