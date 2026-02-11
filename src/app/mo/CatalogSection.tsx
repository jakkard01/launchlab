"use client";

import { useState } from "react";
import type { Product } from "../../lib/mo/types";
import ProductCard from "./ProductCard";
import { matchesTab, TABS, type TabId } from "./catalogConfig";

type CatalogSectionProps = {
  products: Product[];
  activeTab: TabId;
  onTabChange: (next: TabId) => void;
  query: string;
};

export default function CatalogSection({
  products,
  activeTab,
  onTabChange,
  query,
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
        <h2 className="text-lg font-semibold text-slate-900">
          Catálogo completo
        </h2>
        <p className="text-sm text-slate-600">
          Catálogo mínimo con productos listos para retiro.
        </p>
        <div className="flex flex-wrap gap-2 text-xs text-slate-500">
          <span className="rounded-full border border-slate-200 px-3 py-1">
            Categoría: {activeLabel}
          </span>
          {query.trim().length > 0 ? (
            <span className="rounded-full border border-slate-200 px-3 py-1">
              Búsqueda: {query.trim()}
            </span>
          ) : null}
          <button
            type="button"
            onClick={() => onTabChange("hot")}
            className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600 transition hover:border-emerald-200 hover:text-emerald-700"
          >
            Ver Caliente hoy
          </button>
        </div>
      </div>

      <div className="sticky top-16 z-30 -mx-4 border-y border-slate-200 bg-white/95 px-4 py-3 backdrop-blur sm:mx-0 sm:top-0 sm:rounded-2xl sm:border sm:px-6">
        <div className="flex gap-2 overflow-x-auto">
          {TABS.map((tab) => {
            const isActive = tab.id === activeTab;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onTabChange(tab.id)}
                className={`whitespace-nowrap rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 ${
                  isActive
                    ? "border-emerald-200 bg-emerald-600 text-white"
                    : "border-slate-200 bg-white text-slate-600 hover:border-emerald-200 hover:text-emerald-700"
                }`}
                aria-pressed={isActive}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

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
                <h3 className="text-sm font-semibold text-slate-900">
                  {tab.label}
                </h3>
                <button
                  type="button"
                  onClick={() =>
                    setExpandedTab(isExpanded ? null : tab.id)
                  }
                  className="text-xs font-semibold text-emerald-600 transition hover:text-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
                >
                  {isExpanded ? "Ver menos" : "Ver todo"}
                </button>
              </div>
              {items.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-slate-200 px-4 py-6 text-sm text-slate-500">
                  Sin productos en esta categoría.
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
