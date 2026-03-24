"use client";

import Image from "next/image";
import { useMemo } from "react";
import type { Product } from "../../../lib/mo/types";
import ProductCard from "../ProductCard";
import {
  getVisibleTabs,
  isComboProduct,
  isFeaturedProduct,
  isHotProduct,
  isPromoProduct,
  sortCatalogProducts,
  TabId,
} from "../catalogConfig";

type MoQuickShopProps = {
  products: Product[];
  activeTab: TabId;
  onJumpToTab: (next: TabId) => void;
  onScrollToSpecial: () => void;
};

const CATEGORY_ICON_BY_ID = {
  caliente_hoy: "/RYSminisuper/icons/pasillos/comida_caliente.webp",
  combos: "/RYSminisuper/icons/pasillos/combos.webp",
  lacteos: "/RYSminisuper/icons/pasillos/lacteos.webp",
  bebidas: "/RYSminisuper/icons/pasillos/bebidas.webp",
  abarrotes: "/RYSminisuper/icons/pasillos/abarrotes.webp",
  snacks: "/RYSminisuper/icons/pasillos/snacks.webp",
  ofertas: "/RYSminisuper/icons/pasillos/ofertas.webp",
  pedido_especial: "/RYSminisuper/icons/pasillos/pedido_especial.webp",
} as const;

const CATEGORY_HINT_BY_ID = {
  caliente_hoy: "Listo para hoy",
  combos: "Resuelve en 1 click",
  lacteos: "Leche y queso",
  bebidas: "Frías y listas",
  abarrotes: "Lo básico",
  snacks: "Boquitas y antojo",
  ofertas: "Precio especial",
  pedido_especial: "Si no lo ves, pídelo",
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

const productGridClass = "grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3";

export default function MoQuickShop({
  products,
  activeTab,
  onJumpToTab,
  onScrollToSpecial,
}: MoQuickShopProps) {
  const hotToday = useMemo(
    () => sortCatalogProducts(products.filter((product) => isHotProduct(product))).slice(0, 6),
    [products]
  );

  const featured = useMemo(
    () =>
      sortCatalogProducts(
        products.filter(
          (product) =>
            isFeaturedProduct(product) &&
            !isHotProduct(product) &&
            !isComboProduct(product)
        )
      ).slice(0, 6),
    [products]
  );

  const combos = useMemo(
    () => sortCatalogProducts(products.filter((product) => isComboProduct(product))).slice(0, 6),
    [products]
  );

  const promoProducts = useMemo(() => {
    return sortCatalogProducts(products.filter((product) => isPromoProduct(product)))
      .sort((a, b) => {
        const byPercent =
          (b.promoPercent ?? 0) - (a.promoPercent ?? 0);
        if (byPercent !== 0) return byPercent;
        return (a.sortOrder ?? 9999) - (b.sortOrder ?? 9999);
      })
      .slice(0, 6);
  }, [products]);

  const antojitos = useMemo(() => {
    return sortCatalogProducts(
      products.filter((product) => product.category === "antojitos")
    ).slice(0, 8);
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

  const visibleTabIds = useMemo(
    () => new Set(getVisibleTabs(products).map((tab) => tab.id)),
    [products]
  );

  const visibleAisles = aisles.filter((aisle) => visibleTabIds.has(aisle.id));

  const mostWanted = hotToday.length > 0 ? hotToday : featured;

  return (
    <section className="space-y-5 overflow-x-clip">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-muted">
          Pedido rápido
        </p>
        <h2 className="mt-2 text-lg font-semibold text-main">
          Lo más pedido hoy y accesos rápidos
        </h2>
        <p className="mt-2 text-sm text-muted-strong">
          Entra por lo que más sale o ve directo a las categorías que más resuelven una compra rápida.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {visibleAisles.map((aisle) => {
          const iconSrc = resolveCategoryIcon(aisle.id);
          const isActive = aisle.id === activeTab;
          const hint =
            CATEGORY_HINT_BY_ID[
              (aisle.id === "hot" ? "caliente_hoy" : aisle.id) as CategoryIconId
            ] ?? "";
          return (
            <button
              key={aisle.id}
              type="button"
              onClick={() => onJumpToTab(aisle.id)}
              className={`min-h-[88px] flex items-start justify-between gap-2.5 rounded-2xl border px-3 py-3 text-left text-[12px] font-medium tracking-[0.08em] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]/30 active:translate-y-[1px] ${
                isActive
                  ? "border-[var(--accent)]/50 bg-[color-mix(in_srgb,var(--accent)_10%,transparent)] text-main shadow-[0_0_0_1px_rgba(34,197,94,0.08)]"
                  : "border-default bg-surface text-main hover:border-[var(--accent)]/25 hover:bg-base"
              }`}
            >
              <span className="flex flex-col gap-1">
                <span className="text-[13px] font-semibold tracking-[0.06em]">
                  {aisle.label}
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-muted">
                  {hint}
                </span>
              </span>
              {iconSrc ? (
                <span
                  className={`flex h-10 w-10 items-center justify-center rounded-xl border bg-[color-mix(in_srgb,var(--surface)_92%,transparent)] shadow-sm dark:bg-[color-mix(in_srgb,var(--surface)_75%,transparent)] ${
                    isActive
                      ? "border-[var(--accent)]/35 bg-[color-mix(in_srgb,var(--accent)_12%,transparent)]"
                      : "border-[var(--border)]/60"
                  }`}
                >
                  <Image
                    src={iconSrc}
                    alt=""
                    aria-hidden="true"
                    width={30}
                    height={30}
                    className="h-[30px] w-[30px] object-contain"
                  />
                </span>
              ) : null}
            </button>
          );
        })}
        <button
          type="button"
          onClick={onScrollToSpecial}
          className="min-h-[88px] flex items-start justify-between gap-2.5 rounded-2xl border border-[var(--accent)]/30 bg-surface px-3 py-3 text-left text-[12px] font-medium tracking-[0.08em] text-main transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]/30 active:translate-y-[1px] hover:border-[var(--accent)]/35 hover:bg-base"
        >
          <span className="flex flex-col gap-1">
            <span className="text-[13px] font-semibold tracking-[0.06em]">
              Pedido especial
            </span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-muted">
              Pide lo que falte
            </span>
          </span>
          {resolveCategoryIcon("pedido_especial") ? (
            <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--accent)]/35 bg-[color-mix(in_srgb,var(--accent)_12%,transparent)] shadow-sm dark:bg-[color-mix(in_srgb,var(--accent)_14%,transparent)]">
              <Image
                src={resolveCategoryIcon("pedido_especial")}
                alt=""
                aria-hidden="true"
                width={30}
                height={30}
                className="h-[30px] w-[30px] object-contain"
              />
            </span>
          ) : null}
        </button>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-main">
            Lo más pedido hoy
          </h3>
          <span className="text-xs text-[var(--accent)]">
            {hotToday.length > 0 ? "Hecho para hoy" : "Lo que más ayuda a resolver"}
          </span>
        </div>
        {mostWanted.length > 0 ? (
          <div className={productGridClass}>
            {mostWanted.map((product) => (
              <div key={product.id}>
                <ProductCard
                  product={product}
                  variant="compact"
                  showStatusBadge={false}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-default bg-surface px-4 py-5 text-sm text-muted-strong">
            Hoy no hay productos destacados confirmados. Escríbenos por WhatsApp y te decimos qué sale más rápido.
          </div>
        )}
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-main">
            Combos y packs
          </h3>
          <span className="text-xs text-muted-strong">Para no salir dos veces</span>
        </div>
        {combos.length > 0 ? (
          <div className={productGridClass}>
            {combos.map((product) => (
              <div key={product.id}>
                <ProductCard
                  product={product}
                  variant="compact"
                  showStatusBadge={false}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-default bg-surface px-4 py-5 text-sm text-muted-strong">
            Aún no hay combos cargados.
          </div>
        )}
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-main">
            Antojitos y boquitas
          </h3>
          <span className="text-xs text-[var(--accent)]">Café caliente, pan dulce y antojo</span>
        </div>
        {antojitos.length > 0 ? (
          <div className={productGridClass}>
            {antojitos.map((product) => (
              <div key={product.id}>
                <ProductCard
                  product={product}
                  variant="compact"
                  showStatusBadge={false}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-default bg-surface px-4 py-5 text-sm text-muted-strong">
            No hay antojitos cargados por ahora.
          </div>
        )}
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-main">
            Promos de hoy
          </h3>
          <span className="text-xs text-muted-strong">Para resolver hoy sin cola</span>
        </div>
        {promoProducts.length > 0 ? (
          <div className={productGridClass}>
            {promoProducts.map((product) => (
              <div key={product.id}>
                <ProductCard
                  product={product}
                  variant="compact"
                  showStatusBadge={false}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-default bg-surface px-4 py-5 text-sm text-muted-strong">
            Aún no hay ofertas activas.
          </div>
        )}
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-main">
            Destacados del local
          </h3>
          <span className="text-xs text-muted-strong">Lo que más ayuda a resolver la compra</span>
        </div>
        <div className={productGridClass}>
          {featured.length > 0 ? (
            featured.map((product) => (
              <div key={product.id}>
                <ProductCard
                  product={product}
                  variant="compact"
                  showStatusBadge={false}
                />
              </div>
            ))
          ) : (
            <p className="text-sm text-muted-strong">
              Aún no hay destacados cargados.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
