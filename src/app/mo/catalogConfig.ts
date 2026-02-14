import type { Product } from "../../lib/mo/types";

export const HOT_IDS = ["mo-cafe-pack"];
export const COMBO_IDS: string[] = [];

export const TABS = [
  { id: "hot", label: "Caliente hoy", icon: "🔥" },
  { id: "antojitos", label: "Antojitos", image: "/mo/products/antojitos.svg" },
  { id: "combos", label: "Combos", icon: "🥡" },
  { id: "lacteos", label: "Lácteos", image: "/mo/products/lacteos.svg" },
  { id: "bebidas", label: "Bebidas", image: "/mo/products/bebida.svg" },
  { id: "abarrotes", label: "Abarrotes", image: "/mo/products/abarrotes.svg" },
  { id: "snacks", label: "Snacks", image: "/mo/products/snacks.svg" },
  { id: "ofertas", label: "Ofertas", icon: "🏷️" },
] as const;

export type TabId = (typeof TABS)[number]["id"];

export const matchesTab = (product: Product, tabId: TabId) => {
  switch (tabId) {
    case "hot":
      return HOT_IDS.includes(product.id);
    case "antojitos":
      return product.category === "antojitos";
    case "combos":
      return COMBO_IDS.includes(product.id);
    case "lacteos":
      return product.category === "lacteos";
    case "bebidas":
      return product.category === "bebidas";
    case "abarrotes":
      return product.category === "abarrotes";
    case "snacks":
      return product.category === "snacks";
    case "ofertas":
      return product.isFeatured;
    default:
      return true;
  }
};
