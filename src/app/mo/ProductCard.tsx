"use client";

import Image from "next/image";
import { useState } from "react";
import type { Product } from "../../lib/mo/types";
import type { StockStatus } from "../../lib/mo/data/types";
import { getEffectivePrice, getPromoLabel } from "../../lib/mo/pricing";
import QuantityStepper from "./cart/QuantityStepper";
import { useCart } from "./cart/CartContext";
import productImages from "../../data/product_images.json";

type ProductCardProps = {
  product: Product;
  stockStatus?: StockStatus;
  variant?: "default" | "compact";
};

const stockStyles: Record<StockStatus, string> = {
  disponible: "border-emerald-200 bg-emerald-50 text-emerald-700",
  ultimas: "border-amber-200 bg-amber-50 text-amber-800",
  agotado: "border-rose-200 bg-rose-50 text-rose-700",
};

const stockLabels: Record<StockStatus, string> = {
  disponible: "Disponible",
  ultimas: "Ultimas",
  agotado: "Agotado",
};

export default function ProductCard({
  product,
  stockStatus,
  variant = "default",
}: ProductCardProps) {
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const [justAdded, setJustAdded] = useState(false);
  const isCompact = variant === "compact";
  const promoLabel = getPromoLabel(product);
  const effectivePrice = getEffectivePrice(product);
  const resolvedStock = stockStatus ?? product.stockStatus ?? "disponible";
  const isOutOfStock = resolvedStock === "agotado";
  const imageEntry =
    product.imageKey && productImages[product.imageKey as keyof typeof productImages]
      ? productImages[product.imageKey as keyof typeof productImages]
      : null;
  const imageSrc = imageEntry?.src ?? "/images/placeholder.png";
  const imageAlt = imageEntry?.alt ?? product.name;

  const handleAdd = () => {
    if (isOutOfStock) return;
    const safeQty = Number.isFinite(qty) && qty > 0 ? qty : 1;
    addItem({ ...product, price: effectivePrice }, safeQty);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1200);
  };

  return (
    <article className="surface-card flex h-full flex-col rounded-2xl p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="relative overflow-hidden rounded-xl border border-default bg-base">
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={480}
          height={320}
          className="h-40 w-full object-cover"
          sizes="(max-width: 640px) 100vw, 320px"
        />
      </div>
      <div className="mt-4 flex items-start justify-between gap-3">
        <h3
          className={`font-semibold text-main ${isCompact ? "text-base" : "text-lg"}`}
        >
          {product.name}
        </h3>
        <span
          className={`rounded-full border px-2 py-1 text-[11px] uppercase tracking-[0.2em] ${stockStyles[resolvedStock]}`}
        >
          {stockLabels[resolvedStock]}
        </span>
      </div>
      <div className="mt-2 flex items-center justify-between">
        {promoLabel ? (
          <span className="rounded-full border border-default bg-base px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-muted">
            {promoLabel}
          </span>
        ) : product.isFeatured ? (
          <span className="rounded-full border border-default px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-muted">
            Destacado
          </span>
        ) : null}
      </div>
      <p className="mt-2 text-sm text-muted truncate">
        {product.description}
      </p>
      <div className="mt-3">
        <span className="rounded-full border border-default px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-muted">
          {product.category}
        </span>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <div>
          {promoLabel ? (
            <span className="text-xs text-muted line-through">
              {product.price}
            </span>
          ) : null}
          <p className="text-xl font-semibold text-main">
            {effectivePrice}
          </p>
        </div>
      </div>
      <div className={`mt-4 flex flex-col gap-3 ${isCompact ? "hidden" : ""}`}>
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-main">Cantidad</span>
          <QuantityStepper value={qty} onChange={setQty} />
        </div>
        <button
          type="button"
          onClick={handleAdd}
          disabled={isOutOfStock}
          className="h-12 rounded-2xl bg-[var(--accent)] px-6 text-center text-sm font-semibold text-[var(--surface)] shadow-sm transition hover:opacity-95 hover:shadow-md disabled:cursor-not-allowed disabled:bg-[var(--border)] disabled:text-muted"
          aria-label={`Agregar ${product.name} al pedido`}
        >
          {isOutOfStock ? "Agotado" : justAdded ? "Agregado ✓" : "Agregar"}
        </button>
      </div>
      {isCompact ? (
        <button
          type="button"
          onClick={handleAdd}
          disabled={isOutOfStock}
          className="mt-4 h-11 rounded-xl bg-[var(--accent)] px-4 text-xs font-semibold text-[var(--surface)] shadow-sm transition hover:opacity-95 hover:shadow-md disabled:cursor-not-allowed disabled:bg-[var(--border)] disabled:text-muted"
          aria-label={`Agregar ${product.name} al pedido`}
        >
          {isOutOfStock ? "Agotado" : justAdded ? "Agregado ✓" : "Agregar"}
        </button>
      ) : null}
    </article>
  );
}
