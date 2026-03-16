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
    title: "Café caliente y pan dulce",
    description:
      "Para arrancar la mañana o resolver merienda sin cola, sin tráfico y sin salir a probar suerte.",
    badge: "Temprano",
    productIds: ["mo-cafe-servido", "mo-pan-dulce"],
  },
  {
    id: "antojito_sin_vuelta",
    type: "todaySpecial",
    title: "Antojo caliente con bebida",
    description:
      "Pupusas, empanadas y bebida para quitarte el antojo caliente y salir de una vez.",
    badge: "Hoy",
    productIds: ["mo-pupusas", "mo-empanadas", "mo-coca-cola-600ml"],
  },
  {
    id: "algo_rapido_para_hoy",
    type: "sampling",
    title: "Boquita o café para hoy",
    description:
      "Para visita, merienda o salida corta sin meterte otra cola innecesaria.",
    badge: "Sale rápido",
    productIds: ["mo-cafe-servido", "mo-tortillitas-limon", "mo-mani-limon-chile"],
  },
];
