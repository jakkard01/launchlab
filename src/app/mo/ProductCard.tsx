"use client";

import Image from "next/image";
import { useState } from "react";
import type { Product } from "../../lib/mo/types";
import type { StockStatus } from "../../lib/mo/data/types";
import {
  formatPriceLabel,
  getEffectivePrice,
  getPromoLabel,
} from "../../lib/mo/pricing";
import { MO_BRAND } from "../../lib/mo/config";
import { buildWhatsAppMessageLink } from "../../lib/mo/whatsapp";
import QuantityStepper from "./cart/QuantityStepper";
import { useCart } from "./cart/CartContext";

type ProductCardProps = {
  product: Product;
  stockStatus?: StockStatus;
  variant?: "default" | "compact";
  showActions?: boolean;
  showStatusBadge?: boolean;
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
  if (product.image) {
    return product.image;
  }
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

const isExternalUrl = (value: string) =>
  value.startsWith("http://") || value.startsWith("https://");

export default function ProductCard({
  product,
  stockStatus,
  variant = "default",
  showActions = true,
  showStatusBadge = true,
}: ProductCardProps) {
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const [justAdded, setJustAdded] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);
  const isCompact = variant === "compact";
  const promoLabel = getPromoLabel(product);
  const effectivePrice = getEffectivePrice(product);
  const status = product.status ?? "available";
  const isSoon = status === "soon";
  const isHidden = status === "hidden";
  const isOutOfStockStatus = status === "out_of_stock";
  const resolvedStock =
    isOutOfStockStatus ? "agotado" : stockStatus ?? product.stockStatus ?? "disponible";
  const isOutOfStock = resolvedStock === "agotado" || isSoon || isOutOfStockStatus;
  const topImageSrc = resolveTopImage(product);
  const imageAlt = product.name;
  const initials = getInitials(product.name);
  const notifyLink = buildWhatsAppMessageLink(
    `Hola ${MO_BRAND.currentDisplayName}, avisame cuando esté disponible: ${product.name}.`
  );
  const statusBadge =
    isSoon ? "Pronto" : isOutOfStockStatus ? "Agotado hoy" : stockLabels[resolvedStock];
  const addButtonLabel = isOutOfStock
    ? "No disponible"
    : justAdded
      ? "Agregado ✓"
      : "Añadir al pedido";
  const displayPrice = formatPriceLabel(product.price);

  const handleAdd = () => {
    if (isOutOfStock) return;
    const safeQty = Number.isFinite(qty) && qty > 0 ? qty : 1;
    addItem({ ...product, price: effectivePrice }, safeQty);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1200);
  };

  if (isHidden) {
    return null;
  }

  return (
    <article className={`surface-card flex h-full flex-col rounded-2xl transition hover:-translate-y-0.5 hover:shadow-md dark:bg-[var(--surface-2)] ${
      isCompact ? "p-2.5" : "p-3 sm:p-3.5"
    }`}>
      <div className="relative overflow-hidden rounded-xl border border-default bg-surface-3">
        {topImageSrc && !imageFailed ? (
          <Image
            src={topImageSrc}
            alt={imageAlt}
            fill
            className="object-cover object-center"
            sizes="(max-width: 480px) 45vw, 240px"
            quality={55}
            unoptimized={isExternalUrl(topImageSrc)}
            onError={() => setImageFailed(true)}
          />
        ) : (
          <div className="absolute inset-0 flex items-end justify-between overflow-hidden bg-[radial-gradient(circle_at_20%_15%,color-mix(in_srgb,var(--accent)_10%,transparent),transparent_55%),linear-gradient(135deg,color-mix(in_srgb,var(--surface-3)_92%,transparent),color-mix(in_srgb,var(--accent)_6%,transparent))] px-2.5 py-2">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted">
                {product.category}
              </span>
              <span className="text-xs font-medium text-main">
                Selección local
              </span>
            </div>
            <span className="rounded-full border border-default bg-[color-mix(in_srgb,var(--surface-3)_90%,transparent)] px-3 py-1 text-[11px] uppercase tracking-[0.3em] text-muted-strong">
              {initials || MO_BRAND.shortName}
            </span>
          </div>
        )}
        <div className={`pointer-events-none w-full ${isCompact ? "pt-[50%]" : "pt-[58%] sm:pt-[64%]"}`} />
      </div>
      <div className={`flex items-start justify-between gap-2 ${isCompact ? "mt-2.5" : "mt-3"}`}>
        <h3
          className={`font-semibold leading-snug text-main ${isCompact ? "text-[14px] sm:text-[15px]" : "text-[15px] sm:text-base"}`}
        >
          {product.name}
        </h3>
        {showStatusBadge ? (
          <span
            className={`shrink-0 rounded-full border px-1.5 py-1 text-[9px] uppercase tracking-[0.16em] ${stockStyles[resolvedStock]}`}
          >
            {statusBadge}
          </span>
        ) : null}
      </div>
      <div className="mt-1.5 flex min-h-[1.5rem] items-center justify-between gap-2">
        {promoLabel ? (
          <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2 py-1 text-[9px] uppercase tracking-[0.16em] text-emerald-700">
            {promoLabel}
          </span>
        ) : product.isFeatured ? (
          <span className="rounded-full border border-default bg-surface-3 px-2 py-1 text-[9px] uppercase tracking-[0.16em] text-muted-strong">
            Sale rápido
          </span>
        ) : null}
      </div>
      <p className={`mt-1.5 overflow-hidden text-muted-strong [display:-webkit-box] [-webkit-box-orient:vertical] ${isCompact ? "text-[12px] leading-[1.25rem] [-webkit-line-clamp:2]" : "text-[13px] leading-5 [-webkit-line-clamp:2]"}`}>
        {product.description}
      </p>
      {product.hotNote ? (
        <p className="mt-1.5 rounded-2xl border border-default bg-surface-3 px-2.5 py-1.5 text-[10px] leading-4 text-muted-strong">
          {product.hotNote}
        </p>
      ) : null}
      <div className="mt-2">
        <span className="rounded-full border border-default bg-[color-mix(in_srgb,var(--surface-3)_80%,transparent)] px-2.5 py-1 text-[10px] uppercase tracking-[0.16em] text-muted-strong">
          {product.category}
        </span>
      </div>
      <div className={`flex items-center justify-between ${isCompact ? "mt-2.5" : "mt-3"}`}>
        <div>
          {promoLabel ? (
            <span className="text-[11px] text-muted-strong line-through">
              {displayPrice}
            </span>
          ) : null}
          <p className={`${isCompact ? "text-[17px]" : "text-lg sm:text-xl"} font-semibold leading-none text-main`}>
            {effectivePrice}
          </p>
        </div>
      </div>
      {showActions ? (
        isCompact ? (
          <>
            <button
              type="button"
              onClick={handleAdd}
              disabled={isOutOfStock}
              className="mt-2.5 h-10 rounded-xl bg-[var(--accent)] px-3.5 text-[11px] font-semibold text-[#07130c] shadow-sm transition hover:opacity-95 hover:shadow-md disabled:cursor-not-allowed disabled:bg-[var(--border)] disabled:text-muted"
              aria-label={`Agregar ${product.name} al pedido`}
            >
              {addButtonLabel}
            </button>
            {isOutOfStock ? (
              <a
                href={notifyLink}
                className="mt-1.5 h-8 rounded-xl border border-[var(--accent)]/40 px-3 text-center text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--accent)] transition hover:border-[var(--accent)]/60 hover:text-[var(--accent)]"
                target="_blank"
                rel="noopener noreferrer"
              >
                Avisarme
              </a>
            ) : null}
          </>
        ) : (
          <div className="mt-3.5 flex flex-col gap-2.5">
            <div className="flex items-center gap-2">
              <QuantityStepper value={qty} onChange={setQty} compact />
              <button
                type="button"
                onClick={handleAdd}
                disabled={isOutOfStock}
                className="h-10 flex-1 rounded-xl bg-[var(--accent)] px-4 text-center text-sm font-semibold text-[#07130c] shadow-sm transition hover:opacity-95 hover:shadow-md disabled:cursor-not-allowed disabled:bg-[var(--border)] disabled:text-muted"
                aria-label={`Agregar ${product.name} al pedido`}
              >
                {addButtonLabel}
              </button>
            </div>
            {!isOutOfStock ? (
              <p className="hidden text-xs text-muted-strong sm:block">
                Lo agregas al pedido y ajustas cantidades si hace falta en el carrito.
              </p>
            ) : null}
            {isOutOfStock ? (
              <a
                href={notifyLink}
                className="h-10 rounded-xl border border-[var(--accent)]/40 px-5 text-center text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)] transition hover:border-[var(--accent)]/60 hover:text-[var(--accent)]"
                target="_blank"
                rel="noopener noreferrer"
              >
                Avisarme
              </a>
            ) : null}
          </div>
        )
      ) : null}
    </article>
  );
}
