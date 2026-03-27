import { getMoCategoryImage } from "./categories";
import type { Product } from "./types";

const PRODUCT_IMAGE_OVERRIDES: Record<string, string> = {
  "mo-papel-higienico-scott": "/rys/categories/higiene-personal.webp",
  "mo-papel-cocina-scott": "/rys/categories/limpieza-hogar.webp",
  "mo-leche-evaporada-ideal": "/rys/categories/abarrotes.webp",
  "mo-leche-refrigerada": "/rys/categories/lacteos-refrigerados.webp",
  "mo-yogur-individual": "/rys/categories/lacteos-refrigerados.webp",
};

const LOW_QUALITY_IMAGE_PATTERNS = [
  "/RYSminisuper/icons/pasillos/",
  "/RYSminisuper/images/top/",
  "/mo/categories/",
  "/rys/categories/duplicates_unused/",
  "/rys/categories/review_pending/",
] as const;

export const isLowQualityProductImage = (value?: string | null) => {
  const src = value?.trim();
  if (!src) return true;
  return LOW_QUALITY_IMAGE_PATTERNS.some((pattern) => src.includes(pattern));
};

export const resolveProductImage = (product: Product) => {
  const forcedImage = PRODUCT_IMAGE_OVERRIDES[product.id];
  if (forcedImage) {
    return forcedImage;
  }

  const productImage = product.image?.trim();
  if (productImage && !isLowQualityProductImage(productImage)) {
    return productImage;
  }

  return getMoCategoryImage(product.category);
};
