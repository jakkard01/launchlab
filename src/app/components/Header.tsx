"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navItems = [
  { label: "Inicio", href: "/#inicio" },
  { label: "Servicios", href: "/#servicios" },
  { label: "Demos", href: "/#demos" },
  { label: "Cursos", href: "/#cursos" },
  { label: "Prompts", href: "/prompts" },
  { label: "Contacto", href: "/#contacto" },
];

const whatsappLink =
  "https://wa.me/34911528753?text=Hola%2C%20vengo%20desde%20poweredbyia.com.%20Quiero%20info%20de%20servicios%20y%20una%20demo.";

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  return (
    <header className="fixed top-0 inset-x-0 z-[50] bg-black/70 backdrop-blur border-b border-white/10">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 md:px-6">
        <Link href="/" className="font-semibold tracking-wide text-cyan-300">
          Powered by IA
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => {
            const isActive = item.href.startsWith("/#") ? pathname === "/" : pathname === item.href;
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
          <a
            href={whatsappLink}
            className="rounded-full border border-emerald-300/60 px-4 py-2 text-sm font-semibold text-emerald-200 transition hover:bg-emerald-300 hover:text-black"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Abrir WhatsApp Business"
          >
            WhatsApp
          </a>
        </nav>

        <button
          onClick={() => setMenuOpen((open) => !open)}
          className="flex items-center justify-center rounded-full border border-white/15 p-2 text-white md:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
        >
          <span className="flex flex-col gap-1.5">
            <span className="h-0.5 w-6 rounded bg-white" />
            <span className="h-0.5 w-6 rounded bg-white" />
            <span className="h-0.5 w-6 rounded bg-white" />
          </span>
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden">
          <button
            className="fixed inset-0 z-[40] bg-black/70"
            aria-hidden="true"
            onClick={() => setMenuOpen(false)}
            tabIndex={-1}
          />
          <div
            id="mobile-nav"
            className="fixed right-0 top-0 z-[50] h-full w-72 border-l border-white/10 bg-black/90 px-6 pb-10 pt-20 shadow-2xl"
            role="dialog"
            aria-modal="true"
          >
            <div className="flex flex-col gap-5">
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
              <a
                href={whatsappLink}
                onClick={() => setMenuOpen(false)}
                className="rounded-full border border-emerald-300/60 px-4 py-2 text-center text-sm font-semibold text-emerald-200 transition hover:bg-emerald-300 hover:text-black"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Abrir WhatsApp Business"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
