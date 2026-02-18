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

const CATEGORY_ICON_BY_ID = {
  caliente_hoy: "/mo/icons/pasillos/comida_caliente.png",
  combos: "/mo/icons/pasillos/combos.png",
  lacteos: "/mo/icons/pasillos/lacteos.png",
  bebidas: "/mo/icons/pasillos/bebidas.png",
  abarrotes: "/mo/icons/pasillos/abarrotes.png",
  snacks: "/mo/icons/pasillos/snacks.png",
  ofertas: "/mo/icons/pasillos/ofertas.png",
  pedido_especial: "/mo/icons/pasillos/pedido_especial.png",
} as const;

type CategoryIconId = keyof typeof CATEGORY_ICON_BY_ID;

const normalizeCategoryId = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");

const resolveCategoryIcon = (id: string) => {
  const normalized = normalizeCategoryId(id);
  const key = (normalized === "hot" ? "caliente_hoy" : normalized) as CategoryIconId;
  return CATEGORY_ICON_BY_ID[key];
};

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
      label: "Caliente hoy",
      accent: "bg-rose-50 text-rose-600 border-rose-200",
    },
    {
      id: "combos",
      label: "Combos",
      accent: "bg-amber-50 text-amber-700 border-amber-200",
    },
    {
      id: "lacteos",
      label: "Lácteos",
      accent: "bg-sky-50 text-sky-700 border-sky-200",
    },
    {
      id: "bebidas",
      label: "Bebidas",
      accent: "bg-emerald-50 text-emerald-700 border-emerald-200",
    },
    {
      id: "abarrotes",
      label: "Abarrotes",
      accent: "bg-slate-50 text-slate-700 border-slate-200",
    },
    {
      id: "snacks",
      label: "Snacks",
      accent: "bg-orange-50 text-orange-700 border-orange-200",
    },
    {
      id: "ofertas",
      label: "Ofertas",
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
          const iconSrc = resolveCategoryIcon(aisle.id);
          const isActive = aisle.id === activeTab;
          return (
            <button
              key={aisle.id}
              type="button"
              onClick={() => onJumpToTab(aisle.id)}
              className={`flex items-center gap-2.5 rounded-2xl border px-3 py-2 text-left text-[12px] font-medium tracking-[0.08em] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]/30 active:translate-y-[1px] ${
                isActive
                  ? "border-[var(--accent)]/60 bg-[var(--accent)]/10 text-main shadow-[0_0_0_1px_rgba(34,197,94,0.12)]"
                  : "border-default bg-surface text-main hover:border-[var(--accent)]/30 hover:bg-base"
              }`}
            >
              <span>{aisle.label}</span>
              {iconSrc ? (
                <span
                  className={`flex h-7 w-7 items-center justify-center rounded-full border bg-surface shadow-sm ${
                    isActive
                      ? "border-[var(--accent)]/40 bg-[var(--accent)]/10"
                      : "border-default"
                  }`}
                >
                  <Image
                    src={iconSrc}
                    alt=""
                    aria-hidden="true"
                    width={18}
                    height={18}
                    className="h-[18px] w-[18px] object-contain opacity-90"
                  />
                </span>
              ) : null}
            </button>
          );
        })}
        <button
          type="button"
          onClick={onScrollToSpecial}
          className="flex items-center gap-2.5 rounded-2xl border border-[var(--accent)]/30 bg-surface px-3 py-2 text-left text-[12px] font-medium tracking-[0.08em] text-main transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]/30 active:translate-y-[1px] hover:border-[var(--accent)]/40 hover:bg-base"
        >
          <span>Pedido especial</span>
          {resolveCategoryIcon("pedido_especial") ? (
            <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[var(--accent)]/40 bg-[var(--accent)]/10 shadow-sm">
              <Image
                src={resolveCategoryIcon("pedido_especial")}
                alt=""
                aria-hidden="true"
                width={18}
                height={18}
                className="h-[18px] w-[18px] object-contain opacity-90"
              />
            </span>
          ) : null}
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
