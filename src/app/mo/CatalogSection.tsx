"use client";

import { useMemo, useState } from "react";
import type { Product } from "../../lib/mo/types";
import ProductCard from "./ProductCard";

type CatalogSectionProps = {
  products: Product[];
};

const HOT_IDS = ["mo-cafe-pack"];
const COMBO_IDS: string[] = [];

const TABS = [
  { id: "hot", label: "Caliente hoy" },
  { id: "combos", label: "Combos" },
  { id: "lacteos", label: "Lácteos" },
  { id: "bebidas", label: "Bebidas" },
  { id: "abarrotes", label: "Abarrotes" },
  { id: "snacks", label: "Snacks" },
  { id: "ofertas", label: "Ofertas" },
] as const;

const matchesTab = (product: Product, tabId: (typeof TABS)[number]["id"]) => {
  switch (tabId) {
    case "hot":
      return HOT_IDS.includes(product.id);
    case "combos":
      return COMBO_IDS.includes(product.id);
    case "lacteos":
      return product.category === "lacteos";
    case "bebidas":
      return product.category === "bebidas";
    case "abarrotes":
      return product.category === "abarrotes";
    case "snacks":
      return product.category === "snacks";
    case "ofertas":
      return product.isFeatured;
    default:
      return true;
  }
};

export default function CatalogSection({ products }: CatalogSectionProps) {
  const [activeTab, setActiveTab] = useState<(typeof TABS)[number]["id"]>("hot");
  const [query, setQuery] = useState("");

  const featured = useMemo(
    () => products.filter((product) => product.isFeatured).slice(0, 5),
    [products]
  );

  const filtered = useMemo(() => {
    const byTab = products.filter((product) => matchesTab(product, activeTab));
    const q = query.trim().toLowerCase();
    if (!q) return byTab;
    return byTab.filter((product) => product.name.toLowerCase().includes(q));
  }, [products, activeTab, query]);

  return (
    <section id="catalogo" className="space-y-6">
      <div className="flex flex-col gap-3">
        <h2 className="text-lg font-semibold text-slate-900">Catálogo</h2>
        <p className="text-sm text-slate-600">
          Catálogo mínimo con productos listos para retiro.
        </p>
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Buscar por nombre"
          className="h-12 rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-700 focus:border-emerald-400 focus:outline-none"
          aria-label="Buscar producto por nombre"
        />
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2">
        {TABS.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`whitespace-nowrap rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] transition ${
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

      <div className="rounded-3xl border border-slate-200 bg-white px-5 py-5 shadow-sm">
        <h3 className="text-sm font-semibold text-slate-900">
          Destacados de hoy
        </h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.length > 0 ? (
            featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <p className="text-sm text-slate-500">
              Aún no hay destacados cargados.
            </p>
          )}
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
