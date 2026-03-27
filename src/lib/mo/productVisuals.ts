import { getMoCategoryImage } from "./categories";
import type { Product } from "./types";

const PRODUCT_IMAGE_OVERRIDES: Record<string, string> = {
  "mo-papel-higienico-scott": "/rys/categories/higiene-personal.webp",
  "mo-papel-cocina-scott": "/rys/categories/limpieza-hogar.webp",
  "mo-leche-evaporada-ideal": "/rys/categories/abarrotes.webp",
  "mo-leche-refrigerada": "/rys/categories/lacteos-refrigerados.webp",
  "mo-yogur-individual": "/rys/categories/lacteos-refrigerados.webp",
};

const TOP_IMAGES = {
  frijoles: "/RYSminisuper/images/top/frijoles.webp",
  sopa_frijoles: "/RYSminisuper/images/top/sopa_frijoles.webp",
  fritos: "/RYSminisuper/images/top/fritos.webp",
  platano_tajadas: "/RYSminisuper/images/top/platano_tajadas.webp",
  "cafe-pack": "/RYSminisuper/images/top/cafe.webp",
} as const;

const LOW_QUALITY_IMAGE_PATTERNS = [
  "/RYSminisuper/icons/pasillos/",
  "/mo/categories/",
] as const;

const normalizeText = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

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
  if (name.includes("platano")) {
    return TOP_IMAGES.platano_tajadas;
  }
  if (name.includes("frito")) {
    return TOP_IMAGES.fritos;
  }
  if (name.includes("cafe")) {
    return TOP_IMAGES["cafe-pack"];
  }

  return getMoCategoryImage(product.category);
};
