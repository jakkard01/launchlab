"use client";

import { useMemo } from "react";
import type { Product } from "../../../lib/mo/types";
import { MO_PROMOS } from "../../../lib/mo/promos";
import ProductCard from "../ProductCard";

type MoPromosProps = {
  products: Product[];
};

export default function MoPromos({ products }: MoPromosProps) {
  const productById = useMemo(() => {
    return new Map(products.map((product) => [product.id, product]));
  }, [products]);

  const promos = useMemo(() => {
    return MO_PROMOS.map((promo) => {
      const items = promo.productIds
        .map((id) => productById.get(id) ?? null)
        .filter((item): item is Product => item !== null && item.status !== "hidden");
      return { promo, items };
    }).filter((entry) => entry.items.length > 0);
  }, [productById]);

  if (promos.length === 0) return null;

  return (
    <section className="space-y-4">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-muted">
          Promos de hoy
        </p>
        <h2 className="mt-2 text-lg font-semibold text-main">
          Para vender por antojo, hambre o conveniencia
        </h2>
        <p className="mt-2 text-sm text-muted-strong">
          Usa estas promos para salir con café caliente, antojo o algo resuelto sin perder tiempo.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {promos.map(({ promo, items }) => (
          <section
            key={promo.id}
            className="rounded-3xl border border-default bg-surface p-5 shadow-sm dark:bg-[var(--surface-2)] dark:shadow-[0_18px_40px_rgba(3,8,16,0.2)]"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-base font-semibold text-main">
                  {promo.title}
                </h3>
                <p className="mt-1 text-sm text-muted-strong">
                  {promo.description}
                </p>
              </div>
              {promo.badge ? (
                <span className="shrink-0 rounded-full border border-default bg-surface-3 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-strong">
                  {promo.badge}
                </span>
              ) : null}
            </div>

            <div className="mt-4 flex gap-3 overflow-x-auto pb-2 sm:grid sm:grid-cols-1 sm:overflow-visible">
              {items.map((product) => (
                <div key={product.id} className="min-w-[240px] sm:min-w-0">
                  <ProductCard
                    product={product}
                    variant="compact"
                    showActions={false}
                    showStatusBadge={false}
                  />
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </section>
  );
}
