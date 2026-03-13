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
    id: "cena_resuelta",
    title: "Cena resuelta",
    description: "Algo rico, rápido y listo para retirar hoy.",
    badge: "Noche",
    items: [
      { productId: "mo-pupusas", qty: 1 },
      { productId: "mo-gaseosa-cola-2l", qty: 1 },
    ],
  },
  {
    id: "desayuno_rapido",
    title: "Desayuno rápido",
    description: "Para salir sin complicarte: base + lácteo.",
    badge: "Mañana",
    items: [
      { productId: "mo-pan-integral", qty: 1 },
      { productId: "mo-leche-entera", qty: 1 },
    ],
  },
  {
    id: "merienda_tarde",
    title: "Merienda tarde",
    description: "Café, pan y algo extra para aguantar la tarde.",
    badge: "Tarde",
    items: [
      { productId: "mo-cafe-pack", qty: 1 },
      { productId: "mo-galletas-avena", qty: 1 },
    ],
  },
  {
    id: "basico_casa",
    title: "Básico casa",
    description: "Lo esencial para la casa, sin pensar mucho.",
    badge: "Hogar",
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

