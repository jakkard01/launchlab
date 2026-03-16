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
    title: "Antojo caliente",
    description: "Pupusas con Coca-Cola para quitarte el antojo sin hacer otra vuelta.",
    badge: "Sale rápido",
    items: [
      { productId: "mo-pupusas", qty: 1 },
      { productId: "mo-coca-cola-600ml", qty: 1 },
    ],
  },
  {
    id: "cafe_pan_dulce",
    title: "Café y pan",
    description: "Desayuno resuelto o merienda rápida para pasar retirando sin cola.",
    badge: "Desayuno",
    items: [
      { productId: "mo-cafe-servido", qty: 1 },
      { productId: "mo-pan-dulce", qty: 1 },
    ],
  },
  {
    id: "snack_coca",
    title: "Merienda sin vueltas",
    description: "Boquita con Coca-Cola para visita, tarde larga o salida rápida.",
    badge: "Boquita",
    items: [
      { productId: "mo-tortillitas-limon", qty: 1 },
      { productId: "mo-coca-cola-600ml", qty: 1 },
    ],
  },
  {
    id: "antojito_bebida",
    title: "Algo rápido para hoy",
    description: "Empanadas con bebida para resolver antojo y seguir el día sin complicarte.",
    badge: "Hoy",
    items: [
      { productId: "mo-empanadas", qty: 1 },
      { productId: "mo-coca-cola-600ml", qty: 1 },
    ],
  },
  {
    id: "basico_casa",
    title: "Para no salir dos veces",
    description: "Arroz, frijoles, aceite y sal para resolver lo básico de la casa de una vez.",
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
