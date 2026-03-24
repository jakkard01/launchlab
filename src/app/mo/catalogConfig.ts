import type { Product } from "../../lib/mo/types";

export const TABS = [
  { id: "hot", label: "Caliente hoy", icon: "🔥" },
  { id: "antojitos", label: "Pupusas y antojitos", image: "/mo/categories/antojitos.svg" },
  { id: "bebidas", label: "Bebidas", image: "/mo/categories/bebida.svg" },
  { id: "ofertas", label: "Promos", icon: "🏷️" },
  { id: "combos", label: "Combos", icon: "🥡" },
  { id: "abarrotes", label: "Abarrotes", image: "/mo/categories/abarrotes.svg" },
  { id: "snacks", label: "Snacks", image: "/mo/categories/snacks.svg" },
  { id: "lacteos", label: "Lácteos", image: "/mo/categories/lacteos.svg" },
] as const;

export type TabId = (typeof TABS)[number]["id"];

const ACTIVE_HOT_STATUSES = new Set(["preparando", "listo"]);

export const sortCatalogProducts = (items: Product[]) =>
  [...items].sort((a, b) => {
    const byOrder = (a.sortOrder ?? 9999) - (b.sortOrder ?? 9999);
    if (byOrder !== 0) return byOrder;
    return a.name.localeCompare(b.name, "es");
  });

export const isAvailableForCatalog = (product: Product) =>
  product.status !== "hidden";

export const isHotProduct = (product: Product) =>
  ACTIVE_HOT_STATUSES.has(product.hotStatus ?? "hoy_no_hicimos");

export const isComboProduct = (product: Product) =>
  product.category === "combos" ||
  /combo|pack/i.test(product.name) ||
  /combo|pack/i.test(product.description ?? "");

export const isFeaturedProduct = (product: Product) =>
  product.isFeatured && product.status === "available";

export const isPromoProduct = (product: Product) =>
  Boolean(product.promoEnabled) && (product.promoPercent ?? 0) > 0;

export const matchesTab = (product: Product, tabId: TabId) => {
  switch (tabId) {
    case "hot":
      return isHotProduct(product);
    case "antojitos":
      return product.category === "antojitos";
    case "combos":
      return isComboProduct(product);
    case "lacteos":
      return product.category === "lacteos";
    case "bebidas":
      return product.category === "bebidas";
    case "abarrotes":
      return product.category === "abarrotes";
    case "snacks":
      return product.category === "snacks";
    case "ofertas":
      return isPromoProduct(product);
    default:
      return true;
  }
};

export const getVisibleTabs = (products: Product[]) =>
  TABS.filter((tab) =>
    products.some(
      (product) => isAvailableForCatalog(product) && matchesTab(product, tab.id)
    )
  );
