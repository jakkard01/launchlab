import {
  MO_CATEGORY_DEFINITIONS,
  getMoCategoryDescription,
  getMoCategoryImage,
  getMoCategoryLabel,
  normalizeMoCategoryId,
  sortMoCategoryIds,
  type MoCategoryId,
} from "../../lib/mo/categories";
import type { Product } from "../../lib/mo/types";

export const sortCatalogProducts = (items: Product[]) =>
  [...items].sort((a, b) => {
    const byOrder = (a.sortOrder ?? 9999) - (b.sortOrder ?? 9999);
    if (byOrder !== 0) return byOrder;
    return a.name.localeCompare(b.name, "es");
  });

export const isAvailableForCatalog = (product: Product) =>
  product.status !== "hidden";

export const isHotProduct = (product: Product) =>
  new Set(["preparando", "listo"]).has(product.hotStatus ?? "hoy_no_hicimos");

export const isComboProduct = (product: Product) =>
  normalizeMoCategoryId(product.category) === "econocombos";

export const isFeaturedProduct = (product: Product) =>
  product.isFeatured && product.status === "available";

export const isPromoProduct = (product: Product) =>
  Boolean(product.promoEnabled) && (product.promoPercent ?? 0) > 0;

export const getVisibleCategoryIds = (products: Product[]) => {
  const visible = products
    .filter(isAvailableForCatalog)
    .map((product) => normalizeMoCategoryId(product.category))
    .filter((value): value is MoCategoryId =>
      MO_CATEGORY_DEFINITIONS.some((category) => category.id === value)
    );

  return sortMoCategoryIds(Array.from(new Set(visible))) as MoCategoryId[];
};

export const TABS = MO_CATEGORY_DEFINITIONS;

export type TabId = MoCategoryId;

export const matchesTab = (product: Product, tabId: TabId) =>
  normalizeMoCategoryId(product.category) === tabId;

export const getVisibleTabs = (products: Product[]) =>
  getVisibleCategoryIds(products).map((id) => ({
    id,
    label: getMoCategoryLabel(id),
    image: getMoCategoryImage(id),
    description: getMoCategoryDescription(id),
  }));
