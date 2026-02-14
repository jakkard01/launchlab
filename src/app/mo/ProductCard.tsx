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
  const imageEntry =
    product.imageKey && productImages[product.imageKey as keyof typeof productImages]
      ? productImages[product.imageKey as keyof typeof productImages]
      : null;
  const imageSrc = imageEntry?.src ?? "/images/placeholder.png";
  const imageAlt = imageEntry?.alt ?? product.name;

  const handleAdd = () => {
    const safeQty = Number.isFinite(qty) && qty > 0 ? qty : 1;
    addItem({ ...product, price: effectivePrice }, safeQty);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1200);
  };

  return (
    <article className="flex h-full flex-col rounded-2xl border border-transparent bg-white p-4 shadow-[0_12px_30px_rgba(15,23,42,0.08)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_36px_rgba(15,23,42,0.12)]">
      <div className="relative overflow-hidden rounded-xl border border-slate-100 bg-slate-50">
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
          className={`font-semibold text-slate-900 ${
            isCompact ? "text-base" : "text-lg"
          }`}
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
          <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-emerald-700">
            {promoLabel}
          </span>
        ) : product.isFeatured ? (
          <span className="rounded-full border border-slate-200 px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-slate-500">
            Destacado
          </span>
        ) : null}
      </div>
      <p className="mt-2 text-sm text-slate-600 truncate">
        {product.description}
      </p>
      <div className="mt-3">
        <span className="rounded-full border border-slate-200 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-slate-500">
          {product.category}
        </span>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <div>
          {promoLabel ? (
            <span className="text-xs text-slate-400 line-through">
              {product.price}
            </span>
          ) : null}
          <p className="text-lg font-semibold text-emerald-700">
            {effectivePrice}
          </p>
        </div>
      </div>
      <div className={`mt-4 flex flex-col gap-3 ${isCompact ? "hidden" : ""}`}>
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-600">Cantidad</span>
          <QuantityStepper value={qty} onChange={setQty} />
        </div>
        <button
          type="button"
          onClick={handleAdd}
          className="h-12 rounded-full bg-emerald-600 px-5 text-center text-sm font-semibold text-white transition hover:bg-emerald-700"
          aria-label={`Agregar ${product.name} al pedido`}
        >
          {justAdded ? "Agregado ✓" : "Agregar"}
        </button>
      </div>
      {isCompact ? (
        <button
          type="button"
          onClick={handleAdd}
          className="mt-4 h-11 rounded-full bg-emerald-600 px-4 text-xs font-semibold text-white transition hover:bg-emerald-700"
          aria-label={`Agregar ${product.name} al pedido`}
        >
          {justAdded ? "Agregado ✓" : "Agregar"}
        </button>
      ) : null}
    </article>
  );
}
