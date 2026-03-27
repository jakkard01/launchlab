import { getMoCategoryImage } from "./categories";
import type { Product } from "./types";

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
