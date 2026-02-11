"use client";

import { useState } from "react";
import type { Product } from "../../lib/mo/types";
import type { StockStatus } from "../../lib/mo/data/types";
import QuantityStepper from "./cart/QuantityStepper";
import { useCart } from "./cart/CartContext";

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
  stockStatus = "disponible",
  variant = "default",
}: ProductCardProps) {
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const [justAdded, setJustAdded] = useState(false);
  const isCompact = variant === "compact";

  const handleAdd = () => {
    const safeQty = Number.isFinite(qty) && qty > 0 ? qty : 1;
    addItem(product, safeQty);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1200);
  };

  return (
    <article className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <h3
          className={`font-semibold text-slate-900 ${
            isCompact ? "text-base" : "text-lg"
          }`}
        >
          {product.name}
        </h3>
        <span
          className={`rounded-full border px-2 py-1 text-[11px] uppercase tracking-[0.2em] ${stockStyles[stockStatus]}`}
        >
          {stockLabels[stockStatus]}
        </span>
      </div>
      <div className="mt-2 flex items-center justify-between">
        <p className="text-base font-semibold text-emerald-700">
          {product.price}
        </p>
        {product.isFeatured ? (
          <span className="rounded-full border border-slate-200 px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-slate-500">
            Oferta
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
      <div className={`mt-4 flex flex-col gap-3 ${isCompact ? "hidden" : ""}`}>
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-600">Cantidad</span>
          <QuantityStepper value={qty} onChange={setQty} />
        </div>
        <button
          type="button"
          onClick={handleAdd}
          className="h-11 rounded-full bg-emerald-600 px-5 text-center text-sm font-semibold text-white transition hover:bg-emerald-700"
          aria-label={`Agregar ${product.name} al pedido`}
        >
          {justAdded ? "Agregado ✓" : "Agregar"}
        </button>
      </div>
      {isCompact ? (
        <button
          type="button"
          onClick={handleAdd}
          className="mt-4 h-10 rounded-full border border-emerald-200 px-4 text-xs font-semibold text-emerald-700 transition hover:border-emerald-300"
          aria-label={`Agregar ${product.name} al pedido`}
        >
          {justAdded ? "Agregado ✓" : "Agregar"}
        </button>
      ) : null}
    </article>
  );
}
