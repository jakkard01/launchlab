"use client";

import { useMemo } from "react";
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

  const filtered = useMemo(() => {
    const byTab = products.filter((product) => matchesTab(product, activeTab));
    const q = query.trim().toLowerCase();
    if (!q) return byTab;
    return byTab.filter((product) => product.name.toLowerCase().includes(q));
  }, [products, activeTab, query]);

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

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.length > 0 ? (
          filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-200 px-4 py-6 text-sm text-slate-500">
            No encontramos productos en esta categoría.
          </div>
        )}
      </div>
    </section>
  );
}
