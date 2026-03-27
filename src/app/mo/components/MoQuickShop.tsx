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
import {
  getMoCategoryIcon,
  getMoCategoryShortLabel,
  normalizeMoCategoryId,
} from "../../../lib/mo/categories";

type MoQuickShopProps = {
  products: Product[];
  activeTab: TabId;
  onJumpToTab: (next: TabId) => void;
  onScrollToSpecial: () => void;
};

const CATEGORY_HINT_BY_ID = {
  bebidas: "Frías y listas",
  "snacks-golosinas": "Boquitas y dulces",
  "panaderia-reposteria": "Pan del día",
  "cereales-desayuno": "Desayuno fácil",
  "cafe-instantaneas": "Café al toque",
  "lacteos-refrigerados": "Leche y queso",
  abarrotes: "Lo básico",
  "higiene-personal": "Uso diario",
  "limpieza-hogar": "Casa al día",
  "frutas-verduras": "Fresco y rápido",
  calientitos: "Listo para hoy",
  econocombos: "Rinde mejor",
} as const;

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

  const econocombos = useMemo(
    () => sortCatalogProducts(products.filter((product) => isComboProduct(product))).slice(0, 6),
    [products]
  );

  const promoProducts = useMemo(() => {
    return sortCatalogProducts(products.filter((product) => isPromoProduct(product)))
      .sort((a, b) => {
        const byPercent = (b.promoPercent ?? 0) - (a.promoPercent ?? 0);
        if (byPercent !== 0) return byPercent;
        return (a.sortOrder ?? 9999) - (b.sortOrder ?? 9999);
      })
      .slice(0, 6);
  }, [products]);

  const calientitos = useMemo(
    () =>
      sortCatalogProducts(
        products.filter((product) => normalizeMoCategoryId(product.category) === "calientitos")
      ).slice(0, 8),
    [products]
  );

  const visibleAisles = useMemo(() => getVisibleTabs(products), [products]);
  const mostWanted = hotToday.length > 0 ? hotToday : featured;

  return (
    <section className="space-y-5 overflow-x-clip">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-muted">
          Pedido rápido
        </p>
        <h2 className="mt-2 text-lg font-semibold text-main">
          Accesos rápidos por categoría
        </h2>
        <p className="mt-2 text-sm text-muted-strong">
          Entra por categorías claras, baja al producto puntual y confirma por WhatsApp sin perderte en una lista eterna.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {visibleAisles.map((aisle) => {
          const iconSrc = getMoCategoryIcon(aisle.id);
          const isActive = aisle.id === activeTab;
          const hint = CATEGORY_HINT_BY_ID[aisle.id as keyof typeof CATEGORY_HINT_BY_ID] ?? "";
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
                  {getMoCategoryShortLabel(aisle.id)}
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-muted">
                  {hint}
                </span>
              </span>
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
                  className="h-[30px] w-[30px] rounded-lg object-cover"
                />
              </span>
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
              Si no lo ves, pídelo
            </span>
          </span>
          <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--accent)]/35 bg-[color-mix(in_srgb,var(--accent)_12%,transparent)] shadow-sm dark:bg-[color-mix(in_srgb,var(--accent)_14%,transparent)]">
            <Image
              src="/rys/favicon/rys-mini-market-cart.svg"
              alt=""
              aria-hidden="true"
              width={30}
              height={30}
              className="h-[30px] w-[30px] object-contain"
            />
          </span>
        </button>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-main">
            Lo que más resuelve hoy
          </h3>
          <span className="text-xs text-[var(--accent)]">
            {hotToday.length > 0 ? "Hecho para hoy" : "Lo que más ayuda a resolver"}
          </span>
        </div>
        {mostWanted.length > 0 ? (
          <div className={productGridClass}>
            {mostWanted.map((product) => (
              <div key={product.id}>
                <ProductCard product={product} variant="compact" showStatusBadge={false} />
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-default bg-surface px-4 py-5 text-sm text-muted-strong">
            Hoy no hay productos destacados confirmados. Escríbenos por WhatsApp y te decimos qué sale más rápido.
          </div>
        )}
      </div>

      {econocombos.length > 0 ? (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-main">
              Econocombos
            </h3>
            <span className="text-xs text-muted-strong">Para resolver más de una cosa de una vez</span>
          </div>
          <div className={productGridClass}>
            {econocombos.map((product) => (
              <div key={product.id}>
                <ProductCard product={product} variant="compact" showStatusBadge={false} />
              </div>
            ))}
          </div>
        </div>
      ) : null}

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-main">
            Calientitos / comida recién hecha
          </h3>
          <span className="text-xs text-[var(--accent)]">Listo para hoy</span>
        </div>
        {calientitos.length > 0 ? (
          <div className={productGridClass}>
            {calientitos.map((product) => (
              <div key={product.id}>
                <ProductCard product={product} variant="compact" showStatusBadge={false} />
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-default bg-surface px-4 py-5 text-sm text-muted-strong">
            No hay calientitos cargados por ahora.
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
                <ProductCard product={product} variant="compact" showStatusBadge={false} />
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-default bg-surface px-4 py-5 text-sm text-muted-strong">
            Aún no hay ofertas activas.
          </div>
        )}
      </div>
    </section>
  );
}
