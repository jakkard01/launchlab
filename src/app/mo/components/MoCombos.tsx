"use client";

import { useMemo, useState } from "react";
import type { Product } from "../../../lib/mo/types";
import { MO_COMBOS } from "../../../lib/mo/combos";
import { useCart } from "../cart/CartContext";

const parsePrice = (price?: string) => {
  if (!price) return null;
  const numeric = Number(price.replace(/[^0-9.]/g, ""));
  return Number.isFinite(numeric) ? numeric : null;
};

const isAddable = (product: Product) =>
  product.status !== "hidden" &&
  product.status !== "out_of_stock" &&
  product.status !== "soon" &&
  product.stockStatus !== "agotado";

type MoCombosProps = {
  products: Product[];
};

export default function MoCombos({ products }: MoCombosProps) {
  const { addItem } = useCart();
  const [noticeById, setNoticeById] = useState<Record<string, string>>({});

  const productById = useMemo(() => {
    return new Map(products.map((product) => [product.id, product]));
  }, [products]);

  const addCombo = (comboId: string) => {
    const combo = MO_COMBOS.find((item) => item.id === comboId);
    if (!combo) return;

    let added = 0;
    let skipped = 0;
    for (const item of combo.items) {
      const product = productById.get(item.productId);
      if (!product || !isAddable(product)) {
        skipped += 1;
        continue;
      }
      addItem(product, item.qty);
      added += 1;
    }

    const message =
      added === 0
        ? "No disponible ahora. Confirma por WhatsApp."
        : skipped > 0
          ? "Agregado con ajustes (algunos items no estaban disponibles)."
          : "Combo agregado.";

    setNoticeById((prev) => ({ ...prev, [comboId]: message }));
    window.setTimeout(() => {
      setNoticeById((prev) => {
        const next = { ...prev };
        delete next[comboId];
        return next;
      });
    }, 1600);
  };

  const combosWithEstimate = useMemo(() => {
    return MO_COMBOS.map((combo) => {
      const totals = combo.items
        .map((item) => {
          const product = productById.get(item.productId);
          const parsed = parsePrice(product?.price);
          return parsed === null ? null : parsed * item.qty;
        })
        .filter((value): value is number => value !== null);

      const estimate = totals.length === combo.items.length
        ? totals.reduce((sum, value) => sum + value, 0)
        : null;

      return { combo, estimate };
    });
  }, [productById]);

  return (
    <section className="space-y-4">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-muted">
            Combos útiles
          </p>
          <h2 className="mt-2 text-lg font-semibold text-main">
            Combos para desayuno, antojo o compra rápida
          </h2>
          <p className="mt-2 text-sm text-muted-strong">
            Agrega un combo, confirma por WhatsApp y evita otra vuelta o la cola del súper.
          </p>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {combosWithEstimate.map(({ combo, estimate }) => (
          <article
            key={combo.id}
            className="rounded-3xl border border-default bg-surface p-5 shadow-sm dark:bg-[var(--surface-2)] dark:shadow-[0_18px_40px_rgba(3,8,16,0.2)]"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-base font-semibold text-main">
                  {combo.title}
                </h3>
                <p className="mt-1 text-sm text-muted-strong">
                  {combo.description}
                </p>
              </div>
              {combo.badge ? (
                <span className="shrink-0 rounded-full border border-default bg-surface-3 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-strong">
                  {combo.badge}
                </span>
              ) : null}
            </div>

            <div className="mt-4 grid gap-2">
              {combo.items.map((item) => {
                const product = productById.get(item.productId);
                const isMissing = !product;
                const unavailable = product ? !isAddable(product) : false;
                return (
                  <div
                    key={`${combo.id}-${item.productId}`}
                    className="flex items-center justify-between gap-3 rounded-2xl border border-default bg-surface-3 px-4 py-2"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-main">
                        {product?.name ?? item.productId}
                      </p>
                      <p className="text-[11px] text-muted">
                        {isMissing
                          ? "No se encontró en el catálogo"
                          : unavailable
                            ? "No disponible ahora"
                            : "Listo para agregar"}
                      </p>
                    </div>
                    <span className="shrink-0 rounded-full border border-default bg-surface px-3 py-1 text-[11px] font-semibold text-main">
                      x{item.qty}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-sm text-muted-strong">
                {estimate !== null ? (
                  <span>
                    Total est. <span className="font-semibold text-main">${estimate.toFixed(2)}</span>
                  </span>
                ) : (
                  <span>Total est. por confirmar</span>
                )}
              </div>
              <button
                type="button"
                onClick={() => addCombo(combo.id)}
                className="h-11 rounded-full bg-[var(--accent)] px-5 text-sm font-semibold text-[#07130c] transition hover:opacity-90"
              >
                Agregar combo al pedido
              </button>
            </div>

            {noticeById[combo.id] ? (
              <p className="mt-3 text-xs text-[var(--accent)]">
                {noticeById[combo.id]}
              </p>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
}
