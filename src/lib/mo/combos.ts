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
    title: "Pupusas + Coca-Cola",
    description: "El combo más obvio para salida rápida y antojo local.",
    badge: "Alta salida",
    items: [
      { productId: "mo-pupusas", qty: 1 },
      { productId: "mo-coca-cola-600ml", qty: 1 },
    ],
  },
  {
    id: "cafe_pan_dulce",
    title: "Café + pan dulce",
    description: "Desayuno o merienda rápida, simple y con buena salida.",
    badge: "Desayuno",
    items: [
      { productId: "mo-cafe-servido", qty: 1 },
      { productId: "mo-pan-dulce", qty: 1 },
    ],
  },
  {
    id: "snack_coca",
    title: "Snack + Coca-Cola",
    description: "Boquita rápida para antojo, visita o salida corta.",
    badge: "Boquita",
    items: [
      { productId: "mo-tortillitas-limon", qty: 1 },
      { productId: "mo-coca-cola-600ml", qty: 1 },
    ],
  },
  {
    id: "antojito_bebida",
    title: "Antojito + bebida",
    description: "Empanadas y Coca-Cola personal para resolver sin pensarlo mucho.",
    badge: "Rápido",
    items: [
      { productId: "mo-empanadas", qty: 1 },
      { productId: "mo-coca-cola-600ml", qty: 1 },
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
