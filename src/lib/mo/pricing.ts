import type { Product } from "./types";

const parsePriceValue = (price?: string) => {
  if (!price) return null;
  const numeric = Number(price.replace(/[^0-9.]/g, ""));
  return Number.isFinite(numeric) ? numeric : null;
};

export const getEffectivePriceValue = (product: Product) => {
  const base = parsePriceValue(product.price);
  if (base === null) return null;
  const percent = product.promoEnabled ? product.promoPercent ?? 0 : 0;
  if (!percent || percent <= 0) return base;
  const discount = Math.min(Math.max(percent, 0), 80) / 100;
  return Number((base * (1 - discount)).toFixed(2));
};

export const getEffectivePrice = (product: Product) => {
  const effective = getEffectivePriceValue(product);
  if (effective === null) return product.price;
  return `$${effective.toFixed(2)}`;
};

export const getPromoLabel = (product: Product) => {
  if (!product.promoEnabled) return null;
  const percent = product.promoPercent ?? 0;
  if (percent <= 0) return "OFERTA";
  return `-${percent}%`;
};

export const getPromoSavings = (product: Product) => {
  const base = parsePriceValue(product.price);
  const effective = getEffectivePriceValue(product);
  if (base === null || effective === null) return null;
  return Number((base - effective).toFixed(2));
};
