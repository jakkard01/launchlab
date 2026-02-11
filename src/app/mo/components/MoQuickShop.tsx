"use client";

import { useMemo } from "react";
import type { Product } from "../../../lib/mo/types";
import ProductCard from "../ProductCard";
import { HOT_IDS, TABS, TabId } from "../catalogConfig";

type MoQuickShopProps = {
  products: Product[];
  activeTab: TabId;
  onTabChange: (next: TabId) => void;
};

export default function MoQuickShop({
  products,
  activeTab,
  onTabChange,
}: MoQuickShopProps) {
  const featured = useMemo(
    () => products.filter((product) => product.isFeatured).slice(0, 6),
    [products]
  );

  const hotItems = useMemo(
    () => products.filter((product) => HOT_IDS.includes(product.id)),
    [products]
  );

  return (
    <section className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-emerald-600">
          Comprar ya
        </p>
        <h2 className="mt-2 text-lg font-semibold text-slate-900">
          Acceso rapido por categoria
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
        {TABS.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onTabChange(tab.id)}
              className={`rounded-full border px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] transition sm:px-4 ${
                isActive
                  ? "border-emerald-200 bg-emerald-600 text-white"
                  : "border-slate-200 bg-white text-slate-600 hover:border-emerald-200 hover:text-emerald-700"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {hotItems.length > 0 ? (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-900">
              Caliente hoy
            </h3>
            <span className="text-xs text-slate-500">
              Desliza para ver mas
            </span>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {hotItems.map((product) => (
              <div key={product.id} className="min-w-[240px] max-w-[260px]">
                <ProductCard product={product} variant="compact" />
              </div>
            ))}
          </div>
        </div>
      ) : null}

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-slate-900">
            Ofertas y destacados
          </h3>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
    </section>
  );
}
