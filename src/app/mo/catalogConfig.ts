import type { Product } from "../../lib/mo/types";

export const HOT_IDS = ["mo-cafe-pack"];
export const COMBO_IDS: string[] = [];

export const TABS = [
  { id: "hot", label: "🔥 Caliente hoy" },
  { id: "antojitos", label: "🍽️ Antojitos" },
  { id: "combos", label: "🥡 Combos" },
  { id: "lacteos", label: "🥛 Lácteos" },
  { id: "bebidas", label: "🥤 Bebidas" },
  { id: "abarrotes", label: "🧺 Abarrotes" },
  { id: "snacks", label: "🍬 Snacks" },
  { id: "ofertas", label: "🏷️ Ofertas" },
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
