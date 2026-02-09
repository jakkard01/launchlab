"use client";

import { useState } from "react";
import type { Product } from "../../lib/mo/types";
import QuantityStepper from "./cart/QuantityStepper";
import { useCart } from "./cart/CartContext";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  const handleAdd = () => {
    const safeQty = Number.isFinite(qty) && qty > 0 ? qty : 1;
    addItem(product, safeQty);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1200);
  };

  return (
    <article className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-lg font-semibold text-slate-900">{product.name}</h3>
        {product.isFeatured ? (
          <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2 py-1 text-[11px] uppercase tracking-[0.2em] text-emerald-700">
            Destacado
          </span>
        ) : null}
      </div>
      <p className="mt-2 text-sm text-emerald-700">{product.price}</p>
      <p className="mt-3 text-sm text-slate-600">{product.description}</p>
      <div className="mt-4">
        <span className="rounded-full border border-slate-200 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-slate-500">
          {product.category}
        </span>
      </div>
      <div className="mt-5 flex flex-col gap-4">
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
    </article>
  );
}
