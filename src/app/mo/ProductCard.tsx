"use client";

import Image from "next/image";
import { useState } from "react";
import type { Product } from "../../lib/mo/types";
import type { StockStatus } from "../../lib/mo/data/types";
import { getEffectivePrice, getPromoLabel } from "../../lib/mo/pricing";
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

const TOP_IMAGES = {
  frijoles: "/RYSminisuper/images/top/frijoles.webp",
  sopa_frijoles: "/RYSminisuper/images/top/sopa_frijoles.webp",
  fritos: "/RYSminisuper/images/top/fritos.webp",
  platano_tajadas: "/RYSminisuper/images/top/platano_tajadas.webp",
  pupusas: "/RYSminisuper/images/top/pupusas.webp",
  "cafe-pack": "/RYSminisuper/images/top/cafe.webp",
} as const;

const normalizeText = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

const resolveTopImage = (product: Product) => {
  const key = product.imageKey ?? "";
  if (key && key in TOP_IMAGES) {
    return TOP_IMAGES[key as keyof typeof TOP_IMAGES];
  }
  const name = normalizeText(product.name);
  if (name.includes("sopa") && name.includes("frijol")) {
    return TOP_IMAGES.sopa_frijoles;
  }
  if (name.includes("frijol")) {
    return TOP_IMAGES.frijoles;
  }
  if (name.includes("pupusa")) {
    return TOP_IMAGES.pupusas;
  }
  if (name.includes("platano")) {
    return TOP_IMAGES.platano_tajadas;
  }
  if (name.includes("frito")) {
    return TOP_IMAGES.fritos;
  }
  if (name.includes("cafe")) {
    return TOP_IMAGES["cafe-pack"];
  }
  return null;
};

const getInitials = (value: string) =>
  value
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((item) => item[0]?.toUpperCase())
    .join("");

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
  const topImageSrc = resolveTopImage(product);
  const imageAlt = product.name;
  const initials = getInitials(product.name);

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
        {topImageSrc ? (
          <Image
            src={topImageSrc}
            alt={imageAlt}
            width={480}
            height={320}
            className="h-40 w-full object-cover"
            sizes="(max-width: 480px) 45vw, 240px"
            quality={55}
          />
        ) : (
          <div className="relative flex h-40 w-full items-end justify-between overflow-hidden bg-[radial-gradient(circle_at_20%_15%,color-mix(in_srgb,var(--accent)_10%,transparent),transparent_55%),linear-gradient(135deg,color-mix(in_srgb,var(--surface)_92%,transparent),color-mix(in_srgb,var(--accent)_6%,transparent))] px-4 py-3">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted">
                {product.category}
              </span>
              <span className="text-xs font-medium text-main">
                Selección RYS
              </span>
            </div>
            <span className="rounded-full border border-default bg-[color-mix(in_srgb,var(--surface)_90%,transparent)] px-3 py-1 text-[11px] uppercase tracking-[0.3em] text-muted">
              {initials || "RYS"}
            </span>
          </div>
        )}
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
