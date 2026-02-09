"use client";

import { useMemo, useState } from "react";
import type { Product } from "../../lib/mo/types";
import { buildWhatsAppLink } from "../../lib/mo/whatsapp";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const [qty, setQty] = useState(1);
  const [note, setNote] = useState("");
  const [zone, setZone] = useState("");

  const whatsappLink = useMemo(() => {
    const safeQty = Number.isFinite(qty) && qty > 0 ? qty : 1;
    return buildWhatsAppLink({
      productName: product.name,
      qty: safeQty,
      pickup: true,
      note,
      zone,
    });
  }, [product.name, qty, note, zone]);

  const qtyId = `${product.id}-qty`;
  const noteId = `${product.id}-note`;
  const zoneId = `${product.id}-zone`;

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
      <div className="mt-5 grid gap-3">
        <label className="text-xs font-semibold text-slate-600" htmlFor={qtyId}>
          Cantidad
        </label>
        <input
          id={qtyId}
          type="number"
          min={1}
          value={qty}
          onChange={(event) => setQty(Number(event.target.value))}
          className="h-11 rounded-xl border border-slate-200 px-3 text-sm text-slate-700 focus:border-emerald-400 focus:outline-none"
        />
        <label className="text-xs font-semibold text-slate-600" htmlFor={noteId}>
          Nota (opcional)
        </label>
        <input
          id={noteId}
          type="text"
          value={note}
          onChange={(event) => setNote(event.target.value)}
          placeholder="Sin picante, por favor"
          className="h-11 rounded-xl border border-slate-200 px-3 text-sm text-slate-700 focus:border-emerald-400 focus:outline-none"
        />
        <label className="text-xs font-semibold text-slate-600" htmlFor={zoneId}>
          Estoy cerca de
        </label>
        <input
          id={zoneId}
          type="text"
          value={zone}
          onChange={(event) => setZone(event.target.value)}
          placeholder="Plaza X o zona"
          className="h-11 rounded-xl border border-slate-200 px-3 text-sm text-slate-700 focus:border-emerald-400 focus:outline-none"
        />
        <a
          href={whatsappLink}
          className="h-12 rounded-full bg-emerald-500 px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-emerald-600"
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Pedir ${product.name} por WhatsApp`}
        >
          Escribir por WhatsApp
        </a>
      </div>
    </article>
  );
}
