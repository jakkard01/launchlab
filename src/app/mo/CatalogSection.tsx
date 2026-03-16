"use client";

import Image from "next/image";
import { useState } from "react";
import type { Product } from "../../lib/mo/types";
import ProductCard from "./ProductCard";
import {
  isAvailableForCatalog,
  matchesTab,
  sortCatalogProducts,
  TABS,
  type TabId,
} from "./catalogConfig";
import { rankProductsByQuery } from "../../lib/mo/search";

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
  onClearQuery?: () => void;
};

export default function CatalogSection({
  products,
  activeTab,
  onTabChange,
  query,
  onScrollToSpecial,
  onClearQuery,
}: CatalogSectionProps) {
  const activeLabel = TABS.find((tab) => tab.id === activeTab)?.label ?? "Todo";
  const [expandedTab, setExpandedTab] = useState<TabId | null>(null);

  const queryFilter = query.trim();
  const searchResults = rankProductsByQuery(
    products.filter(isAvailableForCatalog),
    queryFilter
  );

  const productsForTab = (tabId: TabId) => {
    const base = sortCatalogProducts(
      products.filter(
        (product) => isAvailableForCatalog(product) && matchesTab(product, tabId)
      )
    );
    if (!queryFilter) return base;
    return searchResults.filter((product) => matchesTab(product, tabId));
  };

  return (
    <section id="catalogo" className="space-y-6">
      <div className="flex flex-col gap-3">
        <h2 className="text-lg font-semibold text-main">
          {queryFilter ? "Resultados de búsqueda" : "Catálogo completo"}
        </h2>
        <p className="text-sm text-muted">
          {queryFilter
            ? "Aquí solo ves coincidencias reales del catálogo. Si no aparece, no significa que el buscador falle: puede que hoy no esté cargado o que toque pedirlo directo."
            : "Revisa qué hay hoy, arma tu pedido y confirma por WhatsApp antes de pasar."}
        </p>
        <div className="flex flex-wrap gap-2 text-xs text-muted">
          {!queryFilter ? (
            <span className="rounded-full border border-default px-3 py-1">
              Categoría: {activeLabel}
            </span>
          ) : null}
          {query.trim().length > 0 ? (
            <span className="rounded-full border border-default px-3 py-1">
              Buscando: {query.trim()}
            </span>
          ) : null}
          {queryFilter ? (
            <button
              type="button"
              onClick={onClearQuery}
              className="rounded-full border border-default px-3 py-1 text-xs font-semibold text-main transition hover:border-[var(--accent)]/40 hover:text-[var(--accent)]"
            >
              Limpiar búsqueda
            </button>
          ) : (
            <button
              type="button"
              onClick={() => onTabChange("hot")}
              className="rounded-full border border-default px-3 py-1 text-xs font-semibold text-main transition hover:border-[var(--accent)]/40 hover:text-[var(--accent)]"
            >
              Ver caliente hoy
            </button>
          )}
        </div>
      </div>

      {!queryFilter ? (
        <div className="sticky top-28 z-30 overflow-hidden rounded-2xl border border-default bg-[color-mix(in_srgb,var(--surface)_96%,transparent)] px-4 py-3 backdrop-blur sm:top-24 sm:px-6">
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
      ) : null}

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

      {queryFilter ? (
        <section className="space-y-4">
          <div className="grid gap-3 rounded-3xl border border-default bg-surface px-4 py-4 shadow-sm sm:grid-cols-[1.3fr,1fr]">
            <div>
              <h3 className="text-sm font-semibold text-main">
                Resultados para &quot;{queryFilter}&quot;
              </h3>
              <p className="mt-1 text-sm text-muted-strong">
                {searchResults.length > 0
                  ? `Encontramos ${searchResults.length} producto${searchResults.length === 1 ? "" : "s"} para ayudarte a comprar rápido sin dar la vuelta en vano.`
                  : "No encontramos coincidencias directas en catálogo ahora mismo."}
              </p>
            </div>
            <div className="flex flex-wrap gap-2 sm:justify-end">
              <button
                type="button"
                onClick={onClearQuery}
                className="rounded-full border border-default px-4 py-2 text-xs font-semibold text-main transition hover:border-[var(--accent)]/40 hover:text-[var(--accent)]"
              >
                Volver al catálogo
              </button>
              <button
                type="button"
                onClick={onScrollToSpecial}
                className="rounded-full border border-[var(--accent)]/40 px-4 py-2 text-xs font-semibold text-[var(--accent)] transition hover:border-[var(--accent)]/60 hover:text-[var(--accent)]/80"
              >
                Si no lo ves, pídelo
              </button>
            </div>
          </div>
          {searchResults.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {searchResults.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed border-default bg-surface px-5 py-6">
              <p className="text-sm font-semibold text-main">
                No encontramos eso en catálogo ahora mismo.
              </p>
              <p className="mt-2 text-sm text-muted-strong">
                La búsqueda sí está funcionando con lo que está cargado hoy. Si no sale aquí, puede ser que ese producto no esté en surtido o todavía no esté publicado.
              </p>
              <p className="mt-2 text-sm text-muted-strong">
                Prueba con otra palabra, vuelve al catálogo o pídelo por WhatsApp y te confirmamos antes de salir para que no salgas a probar suerte.
              </p>
              <button
                type="button"
                onClick={onScrollToSpecial}
                className="mt-4 inline-flex items-center rounded-full border border-[var(--accent)]/40 px-4 py-2 text-xs font-semibold text-[var(--accent)] transition hover:border-[var(--accent)]/60 hover:text-[var(--accent)]/80"
              >
                Si no sale aquí, pídelo por WhatsApp
              </button>
            </div>
          )}
        </section>
      ) : null}

      {!queryFilter ? (
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
                  {isExpanded ? "Ver menos" : "Ver más"}
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
      ) : null}
    </section>
  );
}
