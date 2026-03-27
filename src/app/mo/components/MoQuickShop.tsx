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
  bebidas: "Listas para llevar",
  "snacks-golosinas": "Boquitas y dulces",
  "panaderia-reposteria": "Pan y repostería",
  "cereales-desayuno": "Desayuno rápido",
  "cafe-instantaneas": "Café y sopas",
  "lacteos-refrigerados": "Frío del día",
  abarrotes: "Despensa básica",
  "higiene-personal": "Cuidado diario",
  "limpieza-hogar": "Casa al día",
  "frutas-verduras": "Fresco al momento",
  calientitos: "Próximamente",
  econocombos: "Compra resuelta",
} as const;

const CATEGORY_TONE_BY_ID = {
  bebidas: "from-sky-100/95 to-cyan-50/70 text-sky-900",
  "snacks-golosinas": "from-amber-100/95 to-orange-50/70 text-amber-900",
  "panaderia-reposteria": "from-yellow-100/95 to-orange-50/70 text-amber-900",
  "cereales-desayuno": "from-lime-100/95 to-amber-50/70 text-lime-950",
  "cafe-instantaneas": "from-stone-100/95 to-amber-50/70 text-stone-900",
  "lacteos-refrigerados": "from-cyan-100/95 to-sky-50/70 text-cyan-950",
  abarrotes: "from-emerald-100/95 to-lime-50/70 text-emerald-950",
  "higiene-personal": "from-fuchsia-100/95 to-rose-50/70 text-fuchsia-950",
  "limpieza-hogar": "from-indigo-100/95 to-slate-50/70 text-indigo-950",
  "frutas-verduras": "from-green-100/95 to-lime-50/70 text-green-950",
  calientitos: "from-rose-100/95 to-orange-50/70 text-rose-950",
  econocombos: "from-emerald-100/95 to-teal-50/70 text-emerald-950",
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
        <p className="mt-1.5 text-sm text-muted-strong">
          Entra rápido a lo que sí necesitas hoy.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 pb-16 sm:grid-cols-4 sm:pb-4">
        {visibleAisles.map((aisle) => {
          const iconSrc = getMoCategoryIcon(aisle.id);
          const isActive = aisle.id === activeTab;
          const hint = CATEGORY_HINT_BY_ID[aisle.id as keyof typeof CATEGORY_HINT_BY_ID] ?? "";
          const tone =
            CATEGORY_TONE_BY_ID[aisle.id as keyof typeof CATEGORY_TONE_BY_ID] ??
            "from-white/95 to-slate-50/70 text-main";
          return (
            <button
              key={aisle.id}
              type="button"
              onClick={() => onJumpToTab(aisle.id)}
              className={`group relative overflow-hidden rounded-[1.4rem] border text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]/30 active:translate-y-[1px] ${
                isActive
                  ? "border-[var(--accent)]/45 bg-[color-mix(in_srgb,var(--accent)_10%,var(--surface))] text-main shadow-[0_0_0_1px_rgba(34,197,94,0.1)]"
                  : "border-default bg-surface text-main hover:border-[var(--accent)]/25 hover:bg-base"
              }`}
            >
              <div className="relative aspect-[1.28/1] w-full overflow-hidden bg-[color-mix(in_srgb,var(--surface-3)_88%,transparent)]">
                <Image
                  src={iconSrc}
                  alt=""
                  aria-hidden="true"
                  fill
                  sizes="(max-width: 640px) 44vw, 220px"
                  className="object-cover object-center transition duration-300 group-hover:scale-[1.03]"
                />
                <div
                  className={`pointer-events-none absolute inset-0 ${
                    isActive
                      ? "bg-[linear-gradient(180deg,rgba(7,17,26,0.02)_0%,rgba(7,17,26,0.08)_45%,rgba(7,17,26,0.2)_100%)]"
                      : "bg-[linear-gradient(180deg,rgba(7,17,26,0.02)_0%,rgba(7,17,26,0.06)_42%,rgba(7,17,26,0.16)_100%)]"
                  }`}
                />
                <span
                  className={`absolute right-2.5 top-2.5 rounded-full px-2 py-1 text-[9px] font-semibold uppercase tracking-[0.22em] ${
                    isActive
                      ? "bg-[color-mix(in_srgb,var(--accent)_18%,white)] text-main shadow-sm"
                      : "bg-[rgba(255,255,255,0.86)] text-muted-strong shadow-sm"
                  }`}
                >
                  {isActive ? "Abierta" : "Entrar"}
                </span>
              </div>
              <div className={`flex min-h-[74px] flex-col justify-between gap-1.5 bg-gradient-to-br px-3.5 py-2.5 ${tone}`}>
                <div className="space-y-1">
                  <span className="block text-[14px] font-semibold leading-snug tracking-[0.02em] text-main">
                    {getMoCategoryShortLabel(aisle.id)}
                  </span>
                  <span className="block text-[10.5px] leading-4 text-muted-strong">
                    {hint}
                  </span>
                </div>
                <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--accent)]">
                  Ver categoría
                </span>
              </div>
            </button>
          );
        })}
        <button
          type="button"
          onClick={onScrollToSpecial}
          className="group relative overflow-hidden rounded-[1.4rem] border border-[var(--accent)]/30 bg-[linear-gradient(160deg,color-mix(in_srgb,var(--accent)_16%,var(--surface)),color-mix(in_srgb,var(--surface)_94%,transparent))] text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]/30 active:translate-y-[1px] hover:border-[var(--accent)]/45"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_88%_14%,color-mix(in_srgb,var(--accent)_18%,transparent),transparent_36%),linear-gradient(180deg,transparent,rgba(7,17,26,0.04))]" />
          <div className="relative flex min-h-[164px] flex-col justify-between px-3.5 py-3">
            <div className="flex items-start justify-between gap-3">
              <span className="rounded-full bg-[rgba(255,255,255,0.88)] px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.22em] text-[var(--accent)] shadow-sm">
                Ayuda rápida
              </span>
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[var(--accent)]/25 bg-[rgba(255,255,255,0.75)] shadow-sm">
                <Image
                  src="/rys/favicon/rys-mini-market-cart.svg"
                  alt=""
                  aria-hidden="true"
                  width={30}
                  height={30}
                  className="h-[30px] w-[30px] object-contain"
                />
              </span>
            </div>
            <div className="space-y-1.5">
              <span className="block text-[15px] font-semibold leading-snug text-main">
                Pedido especial
              </span>
              <span className="block text-[12px] leading-4 text-muted-strong">
                Si no aparece aquí, lo consultas por WhatsApp y te confirmamos antes de salir.
              </span>
            </div>
            <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--accent)]">
              Consultar por WhatsApp
            </span>
          </div>
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
            La comida recién hecha todavía no está definida en catálogo. Si quieres consultarla, pídela por WhatsApp.
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
