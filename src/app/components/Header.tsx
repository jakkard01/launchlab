"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navItems = [
  { label: "Inicio", href: "/" },
  { label: "Servicios", href: "/services" },
  { label: "Demos", href: "/demos" },
  { label: "Cursos", href: "/courses" },
  { label: "Prompts", href: "/prompts" },
  { label: "Contacto", href: "/contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-[50] bg-black/70 backdrop-blur border-b border-white/10">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 md:px-6">
        <Link href="/" className="font-semibold tracking-wide text-cyan-300">
          Powered by IA
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => {
            const isActive = item.href !== "/#contacto" && pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`text-sm font-medium transition ${
                  isActive ? "text-white" : "text-slate-300 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            href="/contact"
            className="rounded-full border border-cyan-400/60 px-4 py-2 text-sm font-semibold text-cyan-200 transition hover:bg-cyan-400 hover:text-black"
          >
            Agendar llamada
          </Link>
        </nav>

        <button
          onClick={() => setMenuOpen((open) => !open)}
          className="flex items-center gap-2 text-sm font-semibold text-white md:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
        >
          <span className="sr-only">Abrir menú</span>
          <span className="h-0.5 w-6 rounded bg-white" />
          <span className="h-0.5 w-6 rounded bg-white" />
          <span className="h-0.5 w-6 rounded bg-white" />
        </button>
      </div>

      {menuOpen && (
        <div id="mobile-nav" className="md:hidden">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 pb-6">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="text-base font-medium text-slate-200 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setMenuOpen(false)}
              className="rounded-full border border-cyan-400/60 px-4 py-2 text-center text-sm font-semibold text-cyan-200 transition hover:bg-cyan-400 hover:text-black"
            >
              Agendar llamada
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
