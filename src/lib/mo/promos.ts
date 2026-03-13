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
    id: "probar_premium",
    type: "sampling",
    title: "Para probar (premium)",
    description:
      "Una opción buena para que la gente lo pruebe sin prometer “lo más barato”.",
    badge: "Probar",
    productIds: ["mo-queso-fresco"],
  },
  {
    id: "hoy_por_salir",
    type: "todaySpecial",
    title: "Hoy / por salir",
    description:
      "Stock alto o producto del día. Se confirma disponibilidad antes de que salgas.",
    badge: "Hoy",
    productIds: ["mo-ensalada-frutas", "mo-pan-blanco"],
  },
];

