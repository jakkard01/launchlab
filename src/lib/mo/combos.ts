import type { Product } from "./types";

export type MoComboItem = {
  productId: string;
  qty: number;
};

export type MoCombo = {
  id: string;
  title: string;
  description: string;
  items: MoComboItem[];
  badge?: string;
};

// Keep this file intentionally simple: it is the easiest place to edit combos without touching catalog logic.
export const MO_COMBOS: MoCombo[] = [
  {
    id: "cafe_pan_dulce",
    title: "Cappuccino y pan dulce artesanal",
    description: "Desayuno o merienda listos para retirar sin complicarte.",
    badge: "Desayuno",
    items: [
      { productId: "mo-nescafe-cappuccino", qty: 1 },
      { productId: "mo-pan-dulce-artesanal", qty: 1 },
    ],
  },
  {
    id: "snack_pepsi",
    title: "Boquita y Pepsi",
    description: "Para visita, tarde larga o antojo rápido sin salir dos veces.",
    badge: "Boquita",
    items: [
      { productId: "mo-boquita-individual", qty: 1 },
      { productId: "mo-pepsi-600ml", qty: 1 },
    ],
  },
  {
    id: "basico_casa",
    title: "Básicos para hoy",
    description: "Harina, atún y leche evaporada para resolver básicos sin otra vuelta.",
    badge: "Casa",
    items: [
      { productId: "mo-harina-maiz", qty: 1 },
      { productId: "mo-atun-calvo-lata", qty: 1 },
      { productId: "mo-leche-evaporada-ideal", qty: 1 },
    ],
  },
];

export const getComboItems = (combo: MoCombo, products: Product[]) => {
  const byId = new Map(products.map((product) => [product.id, product]));
  return combo.items
    .map((item) => ({
      ...item,
      product: byId.get(item.productId) ?? null,
    }))
    .filter((item) => item.product !== null);
};
