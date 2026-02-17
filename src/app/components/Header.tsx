"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  Bot,
  ChevronDown,
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
import ThemeToggle from "./ThemeToggle";

type NavItem = {
  label: string;
  href: string;
  icon: typeof Home;
  tagline: string;
  match?: string;
};

const navItems: NavItem[] = [
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
    label: "Inversión",
    href: "/pricing",
    icon: Rocket,
    tagline: "paquetes claros",
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
    label: "Video Packs",
    href: "/video",
    match: "/video",
    icon: Video,
    tagline: "packs mensuales",
  },
  {
    label: "Doblaje",
    href: "/video#doblaje",
    icon: Video,
    tagline: "voz y subtítulos",
  },
  {
    label: "Ops",
    href: "/ops",
    match: "/ops",
    icon: Settings,
    tagline: "automatizaciones premium",
  },
  {
    label: "Bots",
    href: "/bots",
    match: "/bots",
    icon: Bot,
    tagline: "web + WhatsApp API",
  },
  {
    label: "Paquetes",
    href: "/pricing",
    match: "/pricing",
    icon: Rocket,
    tagline: "planes claros",
  },
];

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [mobileSolutionsOpen, setMobileSolutionsOpen] = useState(false);
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
    setMobileSolutionsOpen(false);
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

  useEffect(() => {
    if (!menuOpen) setMobileSolutionsOpen(false);
  }, [menuOpen]);

  return (
    <header className="fixed top-0 inset-x-0 z-[10000] border-b border-default bg-surface backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-4 md:px-6">
        <Link href="/" className="font-semibold tracking-wide text-main">
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
                    isActive ? "text-main" : "text-muted hover:text-main"
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
                      className="flex items-center gap-2 text-sm font-medium text-muted transition hover:text-main"
                    >
                      Soluciones
                      <ChevronDown
                        className={`h-4 w-4 transition ${
                          solutionsOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {solutionsOpen && (
                      <div
                        id="solutions-menu"
                        className="absolute left-0 top-full mt-3 w-56 rounded-2xl border border-default bg-surface p-2 shadow-2xl"
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
                                  ? "text-main border border-[var(--accent)] bg-surface"
                                  : "text-muted hover:bg-base hover:text-main border border-transparent"
                              }`}
                            >
                              <span>{solution.label}</span>
                              <span className="text-[10px] uppercase tracking-[0.2em] text-muted">
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
            className="rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-[var(--surface)] transition hover:opacity-90"
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

        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />
        </div>

        <button
          onClick={() => setMenuOpen((open) => !open)}
          className="relative z-[10000] flex items-center justify-center rounded-full border border-default p-2 text-main md:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          ref={menuButtonRef}
        >
          <span className="flex flex-col gap-1.5">
            <span className="h-0.5 w-6 rounded bg-[var(--text)]" />
            <span className="h-0.5 w-6 rounded bg-[var(--text)]" />
            <span className="h-0.5 w-6 rounded bg-[var(--text)]" />
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
            <div className="absolute inset-0 bg-[rgba(11,18,32,0.85)] backdrop-blur-sm pointer-events-auto" />
            <div
              ref={menuRef}
              id="mobile-nav"
              className="absolute inset-x-0 top-0 mx-auto w-full max-w-md p-4 pt-[calc(env(safe-area-inset-top)+16px)]"
              onPointerDown={(event) => event.stopPropagation()}
            >
              <div className="flex max-h-[calc(100dvh-24px)] flex-col overflow-hidden rounded-2xl border border-default bg-surface shadow-2xl text-main">
                <div className="flex items-center justify-between px-5 py-4 border-b border-default">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-muted">
                      Menú
                    </p>
                    <p className="text-sm text-muted">
                      IA para vender y escalar
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <ThemeToggle />
                    <button
                      onPointerDown={() => setMenuOpen(false)}
                      className="rounded-full border border-default p-2 text-main hover:border-[var(--accent)] hover:text-[var(--accent)] transition"
                      aria-label="Cerrar menú"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
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
                      className="rounded-xl bg-[var(--accent)] px-4 py-3 text-center text-sm font-semibold text-[var(--surface)] transition hover:opacity-90"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Hablar por WhatsApp
                    </a>
                    <div className="rounded-2xl border border-default bg-base px-4 py-3">
                      <button
                        type="button"
                        onClick={() => setMobileSolutionsOpen((open) => !open)}
                        className="flex w-full items-center justify-between text-xs uppercase tracking-[0.3em] text-muted"
                        aria-expanded={mobileSolutionsOpen}
                        aria-controls="mobile-solutions"
                      >
                        Soluciones
                        <ChevronDown
                          className={`h-4 w-4 transition ${
                            mobileSolutionsOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      <div
                        id="mobile-solutions"
                        className={`mt-3 flex flex-col gap-2 ${
                          mobileSolutionsOpen ? "" : "hidden"
                        }`}
                      >
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
                              className="flex items-center justify-between rounded-xl border border-default bg-surface px-3 py-2 text-sm text-main transition hover:border-[var(--accent)]"
                            >
                              <span className="flex items-center gap-2">
                                <Icon className="h-4 w-4 text-muted" />
                                {item.label}
                              </span>
                              <span className="text-[10px] uppercase tracking-[0.2em] text-muted">
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
                          className="group flex items-start gap-3 rounded-xl border border-default bg-surface px-4 py-3 text-left transition hover:border-[var(--accent)] hover:bg-base"
                        >
                          <span className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-full border border-default bg-base text-muted">
                            <Icon className="h-5 w-5" />
                          </span>
                          <span className="flex flex-col">
                            <span className="text-base font-semibold text-main">
                              {item.label}
                            </span>
                            <span className="text-xs text-muted hidden md:block">
                              {item.tagline}
                            </span>
                          </span>
                        </Link>
                      );
                    })}
                  </nav>

                  <div className="mt-6 flex flex-col gap-3 border-t border-default pt-4">
                    {socialLinks.map((link) => {
                      const safeHref = link.href.startsWith("http")
                        ? link.href
                        : `https://${link.href}`;
                      return (
                        <a
                          key={link.label}
                          href={safeHref}
                          onClick={() => setMenuOpen(false)}
                          className="rounded-full border border-default px-4 py-2 text-center text-sm font-semibold text-muted transition hover:border-[var(--accent)] hover:text-main"
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
