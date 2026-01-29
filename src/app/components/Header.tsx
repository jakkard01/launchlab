"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import {
  BriefcaseBusiness,
  HandCoins,
  Home,
  Layers3,
  Languages,
  LineChart,
  Mail,
  Rocket,
  Video,
  X,
} from "lucide-react";
import { trackEvent } from "../../lib/analytics";
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
    label: "Video Packs",
    href: "/video",
    match: "/video",
    icon: Video,
    tagline: "packs mensuales",
  },
  {
    label: "Doblaje",
    href: "/video#doblaje",
    match: "/video",
    icon: Languages,
    tagline: "EN + DE listo para vender",
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
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = menuOpen ? "hidden" : "";
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
            const isActive =
              pathname === item.href ||
              (item.match ? pathname === item.match : false);
            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={() =>
                  trackEvent("click_nav_item", {
                    label: item.label,
                    href: item.href,
                  })
                }
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

      {menuOpen &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            className="fixed inset-0 z-[99999]"
            role="dialog"
            aria-modal="true"
            onPointerDown={() => setMenuOpen(false)}
          >
            <div className="absolute inset-0 bg-black/85 backdrop-blur-sm pointer-events-auto" />
            <div
              className="absolute inset-x-0 top-0 mx-auto w-full max-w-md p-4 pt-[calc(env(safe-area-inset-top)+16px)]"
              onPointerDown={(event) => event.stopPropagation()}
            >
              <div className="flex max-h-[calc(100dvh-24px)] flex-col overflow-hidden rounded-2xl border border-white/10 bg-black/70 shadow-2xl">
                <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-cyan-300/80">
                      Menú
                    </p>
                    <p className="text-sm text-slate-300">
                      IA para vender y ganar dinero
                    </p>
                  </div>
                  <button
                    onPointerDown={() => setMenuOpen(false)}
                    className="rounded-full border border-white/10 p-2 text-white hover:border-cyan-300/60 hover:text-cyan-200 transition"
                    aria-label="Cerrar menú"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div
                  className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-3 py-3 pb-[calc(env(safe-area-inset-bottom)+24px)]"
                  style={{
                    WebkitOverflowScrolling: "touch",
                    touchAction: "pan-y",
                  }}
                >
                  <nav className="flex flex-col gap-3">
                    {navItems.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.label}
                          href={item.href}
                          onClick={() => {
                            trackEvent("click_nav_item", {
                              label: item.label,
                              href: item.href,
                            });
                            setMenuOpen(false);
                          }}
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

                  <div className="mt-6 flex flex-col gap-3 border-t border-white/10 pt-4">
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
          </div>,
          document.body
        )}
    </header>
  );
}
