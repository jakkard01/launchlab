"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  BriefcaseBusiness,
  HandCoins,
  Home,
  Layers3,
  LineChart,
  Mail,
  Rocket,
  X,
} from "lucide-react";
import { buildContactLink, getSocialLinks, siteConfig } from "../../lib/site";

const navItems = [
  { label: "Inicio", href: "/", icon: Home, tagline: "volver al inicio" },
  {
    label: "Servicios",
    href: "/services",
    icon: Rocket,
    tagline: "IA que vende",
  },
  {
    label: "Demos",
    href: "/demos",
    icon: Layers3,
    tagline: "ver funcionando",
  },
  {
    label: "Paquetes",
    href: "/pricing",
    icon: BriefcaseBusiness,
    tagline: "listos para comprar",
  },
  {
    label: "Portfolio",
    href: "/portfolio",
    icon: LineChart,
    tagline: "casos reales",
  },
  {
    label: "Inversión",
    href: buildContactLink("nav_inversion", { intent: "ganar_dinero" }),
    icon: HandCoins,
    tagline: "ganar dinero",
  },
  {
    label: "Contacto",
    href: "/contact",
    icon: Mail,
    tagline: "agenda una llamada",
  },
];

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const socialLinks = getSocialLinks("header");

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

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.body.dataset.mobileMenuOpen = menuOpen ? "true" : "false";
    }
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("mobile-menu-toggle", { detail: { open: menuOpen } })
      );
    }
    return () => {
      if (typeof document !== "undefined") {
        document.body.dataset.mobileMenuOpen = "false";
      }
    };
  }, [menuOpen]);

  return (
    <header className="fixed top-0 inset-x-0 z-[10000] bg-black/70 backdrop-blur border-b border-white/10">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 md:px-6">
        <Link href="/" className="font-semibold tracking-wide text-cyan-300">
          {siteConfig.brand}
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
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
          <div className="flex items-center gap-4 border-l border-white/10 pl-4">
            {socialLinks.map((link) => {
              const safeHref = link.href.startsWith("http")
                ? link.href
                : `https://${link.href}`;
              return (
                <a
                  key={link.label}
                  href={safeHref}
                  className="text-sm font-semibold text-slate-300 transition hover:text-white"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                >
                  {link.label}
                </a>
              );
            })}
          </div>
        </nav>

        <button
          onClick={() => setMenuOpen((open) => !open)}
          className="relative z-[10000] flex items-center justify-center rounded-full border border-white/15 p-2 text-white md:hidden"
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
          <div
            className="fixed inset-0 z-[9999] flex items-center justify-center px-5 py-10"
            role="dialog"
            aria-modal="true"
            onClick={() => setMenuOpen(false)}
          >
            <div className="absolute inset-0 bg-black/85 backdrop-blur-sm" />
            <div
              id="mobile-nav"
              className="relative flex max-h-[100dvh] w-full max-w-sm flex-col border border-white/10 bg-black/70 px-6 pt-[calc(env(safe-area-inset-top)+16px)] pb-[calc(env(safe-area-inset-bottom)+24px)] shadow-2xl rounded-2xl"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-cyan-300/80">
                    Menú
                  </p>
                  <p className="text-sm text-slate-300">
                    IA para vender y ganar dinero
                  </p>
                </div>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="rounded-full border border-white/10 p-2 text-white hover:border-cyan-300/60 hover:text-cyan-200 transition"
                  aria-label="Cerrar menú"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div
                className="mt-6 flex min-h-0 flex-1 flex-col gap-6 overflow-y-auto overscroll-contain"
                style={{ WebkitOverflowScrolling: "touch" }}
              >
                <nav className="flex flex-col gap-3">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.label}
                        href={item.href}
                        onClick={() => setMenuOpen(false)}
                        className="group flex items-start gap-3 rounded-xl border border-white/10 bg-black/60 px-4 py-3 text-left transition hover:border-cyan-300/50 hover:bg-black/70"
                      >
                        <span className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/70 text-cyan-200">
                          <Icon className="h-5 w-5" />
                        </span>
                        <span className="flex flex-col">
                          <span className="text-base font-semibold text-white">
                            {item.label}
                          </span>
                          <span className="text-xs text-slate-300">
                            {item.tagline}
                          </span>
                        </span>
                      </Link>
                    );
                  })}
                </nav>

                <div className="flex flex-col gap-3 border-t border-white/10 pt-4">
                  {socialLinks.map((link) => {
                    const safeHref = link.href.startsWith("http")
                      ? link.href
                      : `https://${link.href}`;
                    return (
                      <a
                        key={link.label}
                        href={safeHref}
                        onClick={() => setMenuOpen(false)}
                        className="rounded-full border border-white/10 px-4 py-2 text-center text-sm font-semibold text-slate-200 transition hover:border-cyan-300/60 hover:text-white"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={link.label}
                      >
                        {link.label}
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
