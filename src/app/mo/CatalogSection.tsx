"use client";

import Image from "next/image";
import { useState } from "react";
import type { Product } from "../../lib/mo/types";
import ProductCard from "./ProductCard";
import { matchesTab, TABS, type TabId } from "./catalogConfig";

const CATEGORY_ICON_BY_ID = {
  hot: "/RYSminisuper/icons/pasillos/comida_caliente.webp",
  combos: "/RYSminisuper/icons/pasillos/combos.webp",
  lacteos: "/RYSminisuper/icons/pasillos/lacteos.webp",
  bebidas: "/RYSminisuper/icons/pasillos/bebidas.webp",
  abarrotes: "/RYSminisuper/icons/pasillos/abarrotes.webp",
  snacks: "/RYSminisuper/icons/pasillos/snacks.webp",
  ofertas: "/RYSminisuper/icons/pasillos/ofertas.webp",
} as const;

const resolveCategoryIcon = (id: TabId) =>
  CATEGORY_ICON_BY_ID[id as keyof typeof CATEGORY_ICON_BY_ID];

type CatalogSectionProps = {
  products: Product[];
  activeTab: TabId;
  onTabChange: (next: TabId) => void;
  query: string;
  onScrollToSpecial?: () => void;
};

export default function CatalogSection({
  products,
  activeTab,
  onTabChange,
  query,
  onScrollToSpecial,
}: CatalogSectionProps) {
  const activeLabel = TABS.find((tab) => tab.id === activeTab)?.label ?? "Todo";
  const [expandedTab, setExpandedTab] = useState<TabId | null>(null);

  const queryFilter = query.trim().toLowerCase();
  const productsForTab = (tabId: TabId) => {
    const base = products.filter((product) => matchesTab(product, tabId));
    if (!queryFilter) return base;
    return base.filter((product) =>
      product.name.toLowerCase().includes(queryFilter)
    );
  };

  return (
    <section id="catalogo" className="space-y-6">
      <div className="flex flex-col gap-3">
        <h2 className="text-lg font-semibold text-main">
          Catálogo completo
        </h2>
        <p className="text-sm text-muted">
          Catálogo mínimo con productos listos para retiro.
        </p>
        <div className="flex flex-wrap gap-2 text-xs text-muted">
          <span className="rounded-full border border-default px-3 py-1">
            Categoría: {activeLabel}
          </span>
          {query.trim().length > 0 ? (
            <span className="rounded-full border border-default px-3 py-1">
              Búsqueda: {query.trim()}
            </span>
          ) : null}
          <button
            type="button"
            onClick={() => onTabChange("hot")}
            className="rounded-full border border-default px-3 py-1 text-xs font-semibold text-main transition hover:border-[var(--accent)]/40 hover:text-[var(--accent)]"
          >
            Ver Caliente hoy
          </button>
        </div>
      </div>

      <div className="sticky top-16 z-30 -mx-4 border-y border-default bg-[var(--surface)] bg-opacity-95 px-4 py-3 backdrop-blur sm:mx-0 sm:top-0 sm:rounded-2xl sm:border sm:px-6">
        <div className="no-scrollbar flex gap-2 overflow-x-auto">
          {TABS.map((tab) => {
            const isActive = tab.id === activeTab;
            const iconSrc = resolveCategoryIcon(tab.id);
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onTabChange(tab.id)}
                className={`whitespace-nowrap rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]/50 ${
                  isActive
                    ? "border-[var(--accent)]/60 bg-[var(--accent)] text-[var(--surface)]"
                    : "border-default bg-[var(--surface)] text-main hover:border-[var(--accent)]/40 hover:text-[var(--accent)]"
                }`}
                aria-pressed={isActive}
              >
                <span className="flex items-center gap-2">
                  {iconSrc ? (
                    <span className="flex h-5 w-5 items-center justify-center overflow-hidden rounded-full border border-default bg-[var(--surface)]">
                      <Image
                        src={iconSrc}
                        alt=""
                        aria-hidden="true"
                        width={20}
                        height={20}
                        className="h-5 w-5 object-cover"
                      />
                    </span>
                  ) : ("icon" in tab && tab.icon) ? (
                    <span aria-hidden="true">{tab.icon}</span>
                  ) : null}
                  <span>{tab.label}</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        .no-scrollbar {
          scrollbar-width: none;
          -ms-overflow-style: none;
          -webkit-overflow-scrolling: touch;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      <div className="space-y-8">
        {TABS.map((tab) => {
          const items = productsForTab(tab.id);
          const isExpanded = expandedTab === tab.id;
          const visibleItems = isExpanded ? items : items.slice(0, 4);

          return (
            <section
              key={tab.id}
              id={`catalogo-${tab.id}`}
              className="scroll-mt-28 space-y-3"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-main">
                  {tab.label}
                </h3>
                <button
                  type="button"
                  onClick={() =>
                    setExpandedTab(isExpanded ? null : tab.id)
                  }
                  className="text-xs font-semibold text-[var(--accent)] transition hover:text-[var(--accent)]/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]/50"
                >
                  {isExpanded ? "Ver menos" : "Ver todo"}
                </button>
              </div>
              {items.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-default px-4 py-6 text-sm text-muted">
                  <p>Sin productos en esta categoría.</p>
                  {queryFilter ? (
                    <button
                      type="button"
                      onClick={onScrollToSpecial}
                      className="mt-3 inline-flex items-center rounded-full border border-[var(--accent)]/40 px-4 py-2 text-xs font-semibold text-[var(--accent)] transition hover:border-[var(--accent)]/60 hover:text-[var(--accent)]/80"
                    >
                      No lo tenemos. Agrégalo a tu Pedido Especial.
                    </button>
                  ) : null}
                </div>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {visibleItems.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </section>
          );
        })}
      </div>
    </section>
  );
}
