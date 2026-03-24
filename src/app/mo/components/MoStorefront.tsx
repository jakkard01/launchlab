"use client";

import { useCallback, useEffect, useState } from "react";
import type { Product } from "../../../lib/mo/types";
import { getMoDataAdapter } from "../../../lib/mo/data";
import { getVisibleTabs, type TabId } from "../catalogConfig";
import MoHeader from "./MoHeader";
import MoHero from "./MoHero";
import MoCombos from "./MoCombos";
import MoSections from "./MoSections";
import CartUI from "../cart/CartUI";

type MoStorefrontProps = {
  products: Product[];
  ctaLink: string;
};

type HeaderMode = "full" | "compact" | "hidden";

const filterHidden = (items: Product[]) =>
  items
    .filter((product) => product.status !== "hidden")
    .sort((a, b) => {
      const byOrder = (a.sortOrder ?? 9999) - (b.sortOrder ?? 9999);
      if (byOrder !== 0) return byOrder;
      return a.name.localeCompare(b.name, "es");
    });

export default function MoStorefront({
  products,
  ctaLink,
}: MoStorefrontProps) {
  const hasInitialCatalog = products.length > 0;
  const [activeTab, setActiveTab] = useState<TabId>("hot");
  const [query, setQuery] = useState("");
  const [catalog, setCatalog] = useState<Product[]>(filterHidden(products));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [headerMode, setHeaderMode] = useState<HeaderMode>("full");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  useEffect(() => {
    if (hasInitialCatalog) return;
    let active = true;
    const loadProducts = async () => {
      setLoading(true);
      try {
        const adapter = await getMoDataAdapter();
        const data = await adapter.getProducts();
        if (!active) return;
        setCatalog(filterHidden(data));
        setError(null);
      } catch (err) {
        if (!active) return;
        setError(hasInitialCatalog ? null : "No se pudo cargar el catálogo.");
      } finally {
        if (active) setLoading(false);
      }
    };

    loadProducts();

    return () => {
      active = false;
    };
  }, [hasInitialCatalog]);

  useEffect(() => {
    const viewport = window.visualViewport;
    if (!viewport) return;

    const updateKeyboardState = () => {
      setIsKeyboardOpen(viewport.height < window.innerHeight - 120);
    };

    updateKeyboardState();
    viewport.addEventListener("resize", updateKeyboardState);
    return () => viewport.removeEventListener("resize", updateKeyboardState);
  }, []);

  useEffect(() => {
    let lastY = window.scrollY;

    const updateHeaderMode = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastY;
      const nearTop = currentY < 24;
      const scrollingDown = delta > 8;
      const scrollingUp = delta < -8;
      const hasQuery = query.trim().length > 0;

      if (nearTop) {
        setHeaderMode("full");
      } else if (isSearchFocused || isKeyboardOpen) {
        setHeaderMode("compact");
      } else if (hasQuery) {
        setHeaderMode("compact");
      } else if (currentY > 160 && scrollingDown) {
        setHeaderMode("hidden");
      } else if (scrollingUp) {
        setHeaderMode("compact");
      }

      lastY = currentY;
    };

    updateHeaderMode();
    window.addEventListener("scroll", updateHeaderMode, { passive: true });
    return () => window.removeEventListener("scroll", updateHeaderMode);
  }, [isKeyboardOpen, isSearchFocused, query]);

  const dismissActiveInput = useCallback(() => {
    const activeElement = document.activeElement;
    if (
      activeElement instanceof HTMLInputElement ||
      activeElement instanceof HTMLTextAreaElement ||
      activeElement instanceof HTMLSelectElement
    ) {
      activeElement.blur();
    }
    setIsSearchFocused(false);
  }, []);

  const scrollToId = useCallback((id: string) => {
    dismissActiveInput();
    const target = document.getElementById(id);
    if (!target) return;

    const isCompactHeader =
      headerMode === "compact" || headerMode === "hidden" || query.trim().length > 0;
    const headerOffset = window.innerWidth < 640
      ? isCompactHeader ? 112 : 196
      : isCompactHeader ? 92 : 136;
    const top = target.getBoundingClientRect().top + window.scrollY - headerOffset;
    window.scrollTo({ top, behavior: "smooth" });
  }, [dismissActiveInput, headerMode, query]);

  const handleSearchSubmit = useCallback(() => {
    if (!query.trim()) return;
    window.requestAnimationFrame(() => {
      scrollToId("search-results");
    });
  }, [query, scrollToId]);

  const handleJumpToTab = useCallback(
    (next: TabId) => {
      setActiveTab(next);
      scrollToId(`catalogo-${next}`);
    },
    [scrollToId]
  );

  const isSearchMode = query.trim().length > 0;
  const visibleTabs = getVisibleTabs(catalog);
  const isCompactHeader =
    headerMode === "compact" || headerMode === "hidden" || isSearchMode;
  const quickNavTopClass =
    headerMode === "hidden"
      ? "top-2 sm:top-4"
      : isCompactHeader
        ? "top-[58px] sm:top-[68px]"
        : "top-[72px] sm:top-24";

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-5 overflow-x-clip pb-8 sm:gap-8 sm:pb-10">
      <MoHeader
        query={query}
        onQueryChange={setQuery}
        whatsappLink={ctaLink}
        onScrollToSpecial={() => scrollToId("pedido-especial")}
        mode={headerMode}
        onSearchFocusChange={setIsSearchFocused}
        onSearchSubmit={handleSearchSubmit}
      />
      {error ? (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {error}
        </div>
      ) : null}
      {loading ? (
        <div className="rounded-2xl border border-default bg-surface px-4 py-3 text-sm text-muted-strong">
          Cargando catálogo...
        </div>
      ) : null}
      {isSearchMode ? (
        <section className="grid gap-3 rounded-3xl border border-[var(--accent)]/25 bg-[color-mix(in_srgb,var(--accent)_8%,var(--surface))] px-4 py-4 shadow-sm dark:bg-[color-mix(in_srgb,var(--accent)_8%,var(--surface-2))] sm:grid-cols-[1.4fr,1fr] sm:px-6">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-[var(--accent)]">
              Modo búsqueda
            </p>
            <p className="mt-2 text-sm font-semibold text-main">
              Resultados para &quot;{query.trim()}&quot;
            </p>
            <p className="mt-1 text-xs text-muted-strong">
              Te mostramos solo coincidencias reales del catálogo para que sepas rápido si sí está o si toca pedirlo por WhatsApp.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => setQuery("")}
              className="rounded-2xl border border-default bg-surface-3 px-4 py-3 text-left text-sm font-semibold text-main transition hover:border-[var(--accent)]/45 hover:text-[var(--accent)]"
            >
              Limpiar y volver
            </button>
            <button
              type="button"
              onClick={() => scrollToId("pedido-especial")}
              className="rounded-2xl border border-default bg-surface-3 px-4 py-3 text-left text-sm font-semibold text-main transition hover:border-[var(--accent)]/45 hover:text-[var(--accent)]"
            >
              Si no lo ves, pídelo
            </button>
          </div>
        </section>
      ) : (
        <>
          <section id="inicio-rys">
            <MoHero ctaLink={ctaLink} />
          </section>
          <nav className={`sticky z-30 overflow-x-clip rounded-2xl border border-default bg-[color-mix(in_srgb,var(--surface)_95%,transparent)] px-3 py-2 backdrop-blur transition-[top] duration-200 sm:px-4 ${quickNavTopClass}`}>
            <div className="no-scrollbar flex max-w-full gap-2 overflow-x-auto pb-1 [overscroll-behavior-x:contain] [touch-action:pan-x]">
              <button
                type="button"
                onClick={() => scrollToId("inicio-rys")}
                className="whitespace-nowrap rounded-full border border-default bg-surface px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-main transition hover:border-[var(--accent)]/40 hover:text-[var(--accent)]"
              >
                Inicio
              </button>
              {visibleTabs[0] ? (
                <button
                  type="button"
                  onClick={() => {
                    handleJumpToTab(visibleTabs[0].id);
                    scrollToId("catalogo");
                  }}
                  className="whitespace-nowrap rounded-full border border-default bg-surface px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-main transition hover:border-[var(--accent)]/40 hover:text-[var(--accent)]"
                >
                  Catálogo
                </button>
              ) : null}
              {visibleTabs.some((tab) => tab.id === "hot") ? (
                <button
                  type="button"
                  onClick={() => {
                    handleJumpToTab("hot");
                    scrollToId("catalogo");
                  }}
                  className="whitespace-nowrap rounded-full border border-default bg-surface px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-main transition hover:border-[var(--accent)]/40 hover:text-[var(--accent)]"
                >
                  Lo más pedido
                </button>
              ) : null}
              {visibleTabs.some((tab) => tab.id === "bebidas") ? (
                <button
                  type="button"
                  onClick={() => {
                    handleJumpToTab("bebidas");
                    scrollToId("catalogo");
                  }}
                  className="whitespace-nowrap rounded-full border border-default bg-surface px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-main transition hover:border-[var(--accent)]/40 hover:text-[var(--accent)]"
                >
                  Bebidas
                </button>
              ) : null}
              <button
                type="button"
                onClick={() => scrollToId("combos")}
                className="whitespace-nowrap rounded-full border border-default bg-surface px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-main transition hover:border-[var(--accent)]/40 hover:text-[var(--accent)]"
              >
                Combos
              </button>
              <button
                type="button"
                onClick={() => scrollToId("pedido-especial")}
                className="whitespace-nowrap rounded-full border border-default bg-surface px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-main transition hover:border-[var(--accent)]/40 hover:text-[var(--accent)]"
              >
                Pedido
              </button>
              <a
                href={ctaLink}
                className="whitespace-nowrap rounded-full border border-[var(--accent)]/40 bg-[color-mix(in_srgb,var(--accent)_10%,transparent)] px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-main transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp
              </a>
            </div>
          </nav>
          <section id="combos">
            <MoCombos products={catalog} />
          </section>
        </>
      )}
      <MoSections
        products={catalog}
        activeTab={activeTab}
        onTabChange={handleJumpToTab}
        query={query}
        onScrollToSpecial={() => scrollToId("pedido-especial")}
        onClearQuery={() => setQuery("")}
        whatsappLink={ctaLink}
        headerMode={headerMode}
      />
      <CartUI isSearchMode={isSearchMode} />
    </div>
  );
}
