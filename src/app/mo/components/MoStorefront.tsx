"use client";

import { useCallback, useEffect, useState } from "react";
import type { Product } from "../../../lib/mo/types";
import { getMoDataAdapter } from "../../../lib/mo/data";
import type { TabId } from "../catalogConfig";
import MoHeader from "./MoHeader";
import MoHero from "./MoHero";
import MoCombos from "./MoCombos";
import MoSections from "./MoSections";
import CartUI from "../cart/CartUI";

type MoStorefrontProps = {
  products: Product[];
  ctaLink: string;
  hasAdminSession: boolean;
};

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
  hasAdminSession,
}: MoStorefrontProps) {
  const hasInitialCatalog = products.length > 0;
  const [activeTab, setActiveTab] = useState<TabId>("hot");
  const [query, setQuery] = useState("");
  const [catalog, setCatalog] = useState<Product[]>(filterHidden(products));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  const scrollToId = useCallback((id: string) => {
    const target = document.getElementById(id);
    if (!target) return;
    // Keep anchor targets visible below the sticky RYS header and quick nav.
    const headerOffset = window.innerWidth < 640 ? 196 : 136;
    const top = target.getBoundingClientRect().top + window.scrollY - headerOffset;
    window.scrollTo({ top, behavior: "smooth" });
  }, []);

  const handleJumpToTab = useCallback(
    (next: TabId) => {
      setActiveTab(next);
      scrollToId(`catalogo-${next}`);
    },
    [scrollToId]
  );

  const isSearchMode = query.trim().length > 0;

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-5 overflow-x-clip pb-8 sm:gap-8 sm:pb-10">
      <MoHeader
        query={query}
        onQueryChange={setQuery}
        whatsappLink={ctaLink}
        hasAdminSession={hasAdminSession}
        onScrollToSpecial={() => scrollToId("pedido-especial")}
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
          <nav className="sticky top-[72px] z-30 overflow-x-clip rounded-2xl border border-default bg-[color-mix(in_srgb,var(--surface)_95%,transparent)] px-3 py-2 backdrop-blur sm:top-24 sm:px-4">
            <div className="no-scrollbar flex max-w-full gap-2 overflow-x-auto pb-1 [overscroll-behavior-x:contain] [touch-action:pan-x]">
              <button
                type="button"
                onClick={() => scrollToId("inicio-rys")}
                className="whitespace-nowrap rounded-full border border-default bg-surface px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-main transition hover:border-[var(--accent)]/40 hover:text-[var(--accent)]"
              >
                Inicio
              </button>
              <button
                type="button"
                onClick={() => {
                  handleJumpToTab("hot");
                  scrollToId("catalogo");
                }}
                className="whitespace-nowrap rounded-full border border-default bg-surface px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-main transition hover:border-[var(--accent)]/40 hover:text-[var(--accent)]"
              >
                Catálogo
              </button>
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
      />
      <CartUI isSearchMode={isSearchMode} />
    </div>
  );
}
