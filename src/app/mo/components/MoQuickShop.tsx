"use client";

import Image from "next/image";
import { useMemo } from "react";
import type { Product } from "../../../lib/mo/types";
import ProductCard from "../ProductCard";
import { TABS, TabId } from "../catalogConfig";

type MoQuickShopProps = {
  products: Product[];
  activeTab: TabId;
  onJumpToTab: (next: TabId) => void;
  onScrollToSpecial: () => void;
};

const CATEGORY_ICONS = {
  "Caliente hoy": "/mo/icons/pasillos/comida_caliente.png",
  Combos: "/mo/icons/pasillos/combos.png",
  "Lácteos": "/mo/icons/pasillos/lacteos.png",
  Bebidas: "/mo/icons/pasillos/bebidas.png",
  Abarrotes: "/mo/icons/pasillos/abarrotes.png",
  Snacks: "/mo/icons/pasillos/snacks.png",
  Ofertas: "/mo/icons/pasillos/ofertas.png",
  "Pedido especial": "/mo/icons/pasillos/pedido_especial.png",
} as const;

type CategoryLabel = keyof typeof CATEGORY_ICONS;

export default function MoQuickShop({
  products,
  activeTab,
  onJumpToTab,
  onScrollToSpecial,
}: MoQuickShopProps) {
  const featured = useMemo(
    () => products.filter((product) => product.isFeatured).slice(0, 6),
    [products]
  );

  const promoProducts = useMemo(() => {
    return products
      .filter((product) => product.promoEnabled && (product.promoPercent ?? 0) > 0)
      .sort((a, b) => {
        const byPercent =
          (b.promoPercent ?? 0) - (a.promoPercent ?? 0);
        if (byPercent !== 0) return byPercent;
        return a.name.localeCompare(b.name);
      })
      .slice(0, 6);
  }, [products]);

  const antojitos = useMemo(() => {
    return products.filter((product) => product.category === "antojitos").slice(0, 8);
  }, [products]);

  const aisles = [
    {
      id: "hot",
      label: "Caliente hoy" as CategoryLabel,
      accent: "bg-rose-50 text-rose-600 border-rose-200",
    },
    {
      id: "combos",
      label: "Combos" as CategoryLabel,
      accent: "bg-amber-50 text-amber-700 border-amber-200",
    },
    {
      id: "lacteos",
      label: "Lácteos" as CategoryLabel,
      accent: "bg-sky-50 text-sky-700 border-sky-200",
    },
    {
      id: "bebidas",
      label: "Bebidas" as CategoryLabel,
      accent: "bg-emerald-50 text-emerald-700 border-emerald-200",
    },
    {
      id: "abarrotes",
      label: "Abarrotes" as CategoryLabel,
      accent: "bg-slate-50 text-slate-700 border-slate-200",
    },
    {
      id: "snacks",
      label: "Snacks" as CategoryLabel,
      accent: "bg-orange-50 text-orange-700 border-orange-200",
    },
    {
      id: "ofertas",
      label: "Ofertas" as CategoryLabel,
      accent: "bg-emerald-50 text-emerald-700 border-emerald-200",
    },
  ] as const;

  return (
    <section className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-emerald-600">
          Pasillos
        </p>
        <h2 className="mt-2 text-lg font-semibold text-slate-900">
          Elegi por categoría
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {aisles.map((aisle) => {
          const isActive = aisle.id === activeTab;
          return (
            <button
              key={aisle.id}
              type="button"
              onClick={() => onJumpToTab(aisle.id)}
              className={`flex items-center justify-between gap-2 rounded-2xl border px-3 py-3 text-left text-xs font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 ${
                isActive
                  ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                  : aisle.accent
              }`}
            >
              <span>{aisle.label}</span>
              <Image
                src={CATEGORY_ICONS[aisle.label]}
                alt=""
                aria-hidden="true"
                width={24}
                height={24}
                className="h-6 w-6 shrink-0 opacity-80"
              />
            </button>
          );
        })}
        <button
          type="button"
          onClick={onScrollToSpecial}
          className="flex items-center justify-between gap-2 rounded-2xl border border-purple-200 bg-purple-50 px-3 py-3 text-left text-xs font-semibold text-purple-700 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
        >
          <span>Pedido especial</span>
          <Image
            src={CATEGORY_ICONS["Pedido especial"]}
            alt=""
            aria-hidden="true"
            width={24}
            height={24}
            className="h-6 w-6 shrink-0 opacity-80"
          />
        </button>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-slate-900">
            Antojitos de hoy
          </h3>
          <span className="text-xs text-emerald-600">Pide hoy</span>
        </div>
        {antojitos.length > 0 ? (
          <div className="flex gap-3 overflow-x-auto pb-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:overflow-visible">
            {antojitos.map((product) => (
              <div key={product.id} className="min-w-[240px] sm:min-w-0">
                <ProductCard product={product} variant="compact" />
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-200 px-4 py-5 text-sm text-slate-500">
            No hay antojitos cargados por ahora.
          </div>
        )}
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-slate-900">
            Ofertas rápidas
          </h3>
          <span className="text-xs text-slate-500">
            Descuentos del día
          </span>
        </div>
        {promoProducts.length > 0 ? (
          <div className="flex gap-3 overflow-x-auto pb-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:overflow-visible">
            {promoProducts.map((product) => (
              <div key={product.id} className="min-w-[240px] sm:min-w-0">
                <ProductCard product={product} variant="compact" />
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-200 px-4 py-5 text-sm text-slate-500">
            Aún no hay ofertas activas.
          </div>
        )}
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-slate-900">
            Lo más pedido hoy
          </h3>
          <span className="text-xs text-slate-500">Top picks</span>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:overflow-visible">
          {featured.length > 0 ? (
            featured.map((product) => (
              <div key={product.id} className="min-w-[240px] sm:min-w-0">
                <ProductCard product={product} variant="compact" />
              </div>
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
