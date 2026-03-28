import { getMoCategoryImage } from "./categories";
import type { Product } from "./types";

const PRODUCT_IMAGE_OVERRIDES: Record<string, string> = {
  "mo-pepsi-600ml": "/rys/categories/bebidas.webp",
  "mo-coca-cola-600ml": "/rys/categories/bebidas.webp",
  "mo-coca-cola-grande": "/rys/categories/bebidas.webp",
  "mo-pepsi-grande": "/rys/categories/bebidas.webp",
  "mo-yogur-individual": "/rys/products/yogur-individual-refrigerado.png",
  "mo-boquita-individual": "/rys/products/boquita-individual.png",
  "mo-pan-dulce-artesanal": "/rys/products/pan-dulce-artesanal.png",
  "mo-shampoo-pantene-sachet": "/rys/products/shampoo-basico.png",
  "mo-shampoo-pantene-botella": "/rys/products/shampoo-basico.png",
  "mo-papel-higienico-scott": "/rys/categories/higiene-personal.webp",
  "mo-papel-cocina-scott": "/rys/categories/limpieza-hogar.webp",
  "mo-leche-evaporada-ideal": "/rys/categories/abarrotes.webp",
  "mo-atun-calvo-lata": "/rys/categories/abarrotes.webp",
  "mo-leche-refrigerada": "/rys/categories/lacteos-refrigerados.webp",
  "mo-sopa-vaso": "/rys/categories/abarrotes.webp",
  "mo-sopa-sobre": "/rys/categories/abarrotes.webp",
};

const LOW_QUALITY_IMAGE_PATTERNS = [
  "/RYSminisuper/icons/pasillos/",
  "/RYSminisuper/images/top/",
  "/mo/categories/",
  "/rys/categories/duplicates_unused/",
  "/rys/categories/review_pending/",
] as const;

const ALLOWED_PRODUCT_IMAGE_PREFIXES = [
  "/rys/products/",
  "/rys/categories/",
  "https://",
  "http://",
  "data:image/",
] as const;

export const isLowQualityProductImage = (value?: string | null) => {
  const src = value?.trim();
  if (!src) return true;
  return LOW_QUALITY_IMAGE_PATTERNS.some((pattern) => src.includes(pattern));
};

const isAllowedProductImagePrefix = (value: string) =>
  ALLOWED_PRODUCT_IMAGE_PREFIXES.some((prefix) => value.startsWith(prefix));

const isCategoryCoverImage = (value: string) => value.startsWith("/rys/categories/");

export const resolveProductImage = (product: Product) => {
  const forcedImage = PRODUCT_IMAGE_OVERRIDES[product.id];
  if (forcedImage) {
    return forcedImage;
  }

  const productImage = product.image?.trim();
  if (
    productImage &&
    !isLowQualityProductImage(productImage) &&
    isAllowedProductImagePrefix(productImage)
  ) {
    if (isCategoryCoverImage(productImage)) {
      const categoryImage = getMoCategoryImage(product.category);
      if (productImage === categoryImage) {
        return productImage;
      }
    } else {
      return productImage;
    }
  }

  return getMoCategoryImage(product.category);
};
