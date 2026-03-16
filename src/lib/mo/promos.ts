export type MoPromoType = "sampling" | "expiring" | "todaySpecial";

export type MoPromo = {
  id: string;
  type: MoPromoType;
  title: string;
  description: string;
  productIds: string[];
  badge?: string;
};

// Promos are intentionally manual and lightweight.
// The idea is operational: update a couple of IDs and message based on today's reality.
export const MO_PROMOS: MoPromo[] = [
  {
    id: "desayuno_resuelto",
    type: "todaySpecial",
    title: "Desayuno resuelto",
    description:
      "Café caliente y pan dulce para salir sin hacer cola ni dar la vuelta en vano.",
    badge: "Temprano",
    productIds: ["mo-cafe-servido", "mo-pan-dulce"],
  },
  {
    id: "antojito_sin_vuelta",
    type: "todaySpecial",
    title: "Antojito sin vuelta",
    description:
      "Pupusas, empanadas y bebida para resolver antojo caliente sin salir a probar suerte.",
    badge: "Hoy",
    productIds: ["mo-pupusas", "mo-empanadas", "mo-coca-cola-600ml"],
  },
  {
    id: "algo_rapido_para_hoy",
    type: "sampling",
    title: "Algo rápido para hoy",
    description:
      "Boquita, café o bebida fría para resolver merienda, visita o salida corta.",
    badge: "Sin vueltas",
    productIds: ["mo-cafe-servido", "mo-tortillitas-limon", "mo-mani-limon-chile"],
  },
];
