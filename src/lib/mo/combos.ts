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
    id: "pupusas_coca",
    title: "Pupusas y Coca-Cola",
    description: "Combo directo para resolver comida rápida, antojo caliente y salida corta.",
    badge: "Sale rápido",
    items: [
      { productId: "mo-pupusas", qty: 1 },
      { productId: "mo-coca-cola-600ml", qty: 1 },
    ],
  },
  {
    id: "cafe_pan_dulce",
    title: "Café caliente y pan dulce",
    description: "Desayuno o merienda listos para pasar retirando sin otra cola.",
    badge: "Desayuno",
    items: [
      { productId: "mo-cafe-servido", qty: 1 },
      { productId: "mo-pan-dulce", qty: 1 },
    ],
  },
  {
    id: "snack_coca",
    title: "Boquita y Coca-Cola",
    description: "Para visita, tarde larga o antojo rápido sin salir dos veces.",
    badge: "Boquita",
    items: [
      { productId: "mo-tortillitas-limon", qty: 1 },
      { productId: "mo-coca-cola-600ml", qty: 1 },
    ],
  },
  {
    id: "antojito_bebida",
    title: "Empanadas y Coca-Cola",
    description: "Antojo rápido para hoy, con bebida lista para salir y seguir el día.",
    badge: "Hoy",
    items: [
      { productId: "mo-empanadas", qty: 1 },
      { productId: "mo-coca-cola-600ml", qty: 1 },
    ],
  },
  {
    id: "basico_casa",
    title: "Básicos para hoy",
    description: "Arroz, frijoles, aceite y sal para resolver la casa en una sola pasada.",
    badge: "Casa",
    items: [
      { productId: "mo-arroz-1kg", qty: 1 },
      { productId: "mo-frijoles", qty: 1 },
      { productId: "mo-aceite-900ml", qty: 1 },
      { productId: "mo-sal-mesa", qty: 1 },
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
