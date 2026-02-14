"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  Bot,
  Globe,
  Home,
  Layers3,
  LineChart,
  Mail,
  Rocket,
  Settings,
  Video,
  X,
} from "lucide-react";
import { trackEvent } from "../../lib/analytics";
import { buildWhatsappLink, getSocialLinks, siteConfig } from "../../lib/site";

const navItems = [
  { label: "Inicio", href: "/", icon: Home, tagline: "" },
  {
    label: "Demos",
    href: "/demos",
    icon: Layers3,
    tagline: "ver funcionando",
  },
  {
    label: "Portfolio",
    href: "/portfolio",
    icon: LineChart,
    tagline: "casos reales",
  },
  {
    label: "Contacto",
    href: "/contact",
    icon: Mail,
    tagline: "",
  },
];

const solutions = [
  {
    label: "Web",
    href: "/web",
    match: "/web",
    icon: Globe,
    tagline: "páginas web listas",
  },
  {
    label: "Servicios",
    href: "/services",
    icon: Rocket,
    tagline: "IA que vende",
  },
  {
    label: "Bots",
    href: "/bots",
    match: "/bots",
    icon: Bot,
    tagline: "web + WhatsApp API",
  },
  {
    label: "n8n Ops",
    href: "/ops",
    match: "/ops",
    icon: Settings,
    tagline: "automatizaciones premium",
  },
  {
    label: "Video Packs",
    href: "/video",
    match: "/video",
    icon: Video,
    tagline: "packs mensuales",
  },
];

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const socialLinks = getSocialLinks("header");
  const menuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const solutionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
      if (!menuOpen || event.key !== "Tab" || !menuRef.current) return;
      const focusable = menuRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const timer = window.setTimeout(() => {
      const focusable = menuRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (focusable && focusable.length > 0) {
        focusable[0].focus();
      }
    }, 0);
    return () => window.clearTimeout(timer);
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

  useEffect(() => {
    setSolutionsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!solutionsOpen) return;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSolutionsOpen(false);
    };
    const handleClick = (event: MouseEvent) => {
      if (
        solutionsRef.current &&
        !solutionsRef.current.contains(event.target as Node)
      ) {
        setSolutionsOpen(false);
      }
    };
    document.addEventListener("keydown", handleKey);
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.removeEventListener("mousedown", handleClick);
    };
  }, [solutionsOpen]);

  return (
    <header className="fixed top-0 inset-x-0 z-[10000] bg-black/70 backdrop-blur border-b border-white/10">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 md:px-6">
        <Link href="/" className="font-semibold tracking-wide text-cyan-300">
          {siteConfig.brand}
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item, index) => {
            const isActive =
              pathname === item.href ||
              (item.match ? pathname === item.match : false);
            return (
              <Fragment key={item.label}>
                <Link
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
                {index === 0 ? (
                  <div ref={solutionsRef} className="relative">
                    <button
                      type="button"
                      onClick={() => setSolutionsOpen((open) => !open)}
                      aria-haspopup="true"
                      aria-expanded={solutionsOpen}
                      aria-controls="solutions-menu"
                      className="text-sm font-medium text-slate-300 transition hover:text-white"
                    >
                      Soluciones
                    </button>
                    {solutionsOpen && (
                      <div
                        id="solutions-menu"
                        className="absolute left-0 top-full mt-3 w-56 rounded-2xl border border-white/10 bg-black/85 p-2 shadow-2xl"
                        role="menu"
                      >
                        {solutions.map((solution) => {
                          const isSolutionActive =
                            pathname === solution.href ||
                            (solution.match ? pathname === solution.match : false);
                          return (
                            <Link
                              key={solution.label}
                              href={solution.href}
                              role="menuitem"
                              onClick={() => {
                                trackEvent("click_nav_item", {
                                  label: solution.label,
                                  href: solution.href,
                                });
                                setSolutionsOpen(false);
                              }}
                              className={`flex items-center justify-between rounded-xl px-3 py-2 text-sm transition ${
                                isSolutionActive
                                  ? "text-white"
                                  : "text-slate-300 hover:bg-white/5 hover:text-white"
                              }`}
                            >
                              <span>{solution.label}</span>
                              <span className="text-[10px] uppercase tracking-[0.2em] text-slate-500">
                                {solution.tagline}
                              </span>
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                ) : null}
              </Fragment>
            );
          })}
          <a
            href={buildWhatsappLink("nav_cta")}
            className="rounded-full bg-emerald-400 px-4 py-2 text-sm font-semibold text-black transition hover:bg-emerald-300"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              trackEvent("click_nav_item", {
                label: "CTA WhatsApp",
                href: buildWhatsappLink("nav_cta"),
              })
            }
          >
            Hablar por WhatsApp
          </a>
        </nav>

        <button
          onClick={() => setMenuOpen((open) => !open)}
          className="relative z-[10000] flex items-center justify-center rounded-full border border-white/15 p-2 text-white md:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          ref={menuButtonRef}
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
              ref={menuRef}
              id="mobile-nav"
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
                      IA para vender y escalar
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
                  <div className="flex flex-col gap-3">
                    <a
                      href={buildWhatsappLink("nav_cta")}
                      onClick={() => setMenuOpen(false)}
                      className="rounded-xl bg-emerald-400 px-4 py-3 text-center text-sm font-semibold text-black transition hover:bg-emerald-300"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Hablar por WhatsApp
                    </a>
                    <div className="rounded-2xl border border-white/10 bg-black/60 px-4 py-3">
                      <p className="text-xs uppercase tracking-[0.3em] text-cyan-300/80">
                        Soluciones
                      </p>
                      <div className="mt-3 flex flex-col gap-2">
                        {solutions.map((item) => {
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
                              className="flex items-center justify-between rounded-xl border border-white/10 bg-black/50 px-3 py-2 text-sm text-white transition hover:border-cyan-300/50"
                            >
                              <span className="flex items-center gap-2">
                                <Icon className="h-4 w-4 text-cyan-200" />
                                {item.label}
                              </span>
                              <span className="text-[10px] uppercase tracking-[0.2em] text-slate-400">
                                {item.tagline}
                              </span>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                  <nav className="mt-4 flex flex-col gap-3">
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
                            <span className="text-xs text-slate-300 hidden md:block">
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
