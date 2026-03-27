export const MO_CATEGORY_DEFINITIONS = [
  {
    id: "bebidas",
    label: "Bebidas",
    shortLabel: "Bebidas",
    image: "/rys/categories/bebidas.webp",
    icon: "/mo/categories/bebida.svg",
    fallbackImage: "/rys/categories/bebidas.webp",
    description: "Frías, listas y fáciles de ubicar.",
    searchTerms: ["bebidas", "refrescos", "jugos", "gaseosas", "agua"],
  },
  {
    id: "snacks-golosinas",
    label: "Snacks y golosinas",
    shortLabel: "Snacks",
    image: "/rys/categories/snacks-golosinas.webp",
    icon: "/mo/categories/snacks.svg",
    fallbackImage: "/rys/categories/snacks-golosinas.webp",
    description: "Boquitas, dulces y picadas rápidas.",
    searchTerms: ["snacks", "boquitas", "golosinas", "dulces", "chocolates"],
  },
  {
    id: "panaderia-reposteria",
    label: "Panadería y repostería",
    shortLabel: "Panadería",
    image: "/rys/categories/panaderia-reposteria.webp",
    icon: "/mo/categories/pan.svg",
    fallbackImage: "/rys/categories/panaderia-reposteria.webp",
    description: "Pan de diario, pan dulce y repostería ligera.",
    searchTerms: ["pan", "panaderia", "reposteria", "pan dulce", "pan integral"],
  },
  {
    id: "cereales-desayuno",
    label: "Cereales y desayuno",
    shortLabel: "Desayuno",
    image: "/rys/categories/cereales-desayuno.webp",
    icon: "/rys/categories/cereales-desayuno.webp",
    fallbackImage: "/rys/categories/cereales-desayuno.webp",
    description: "Avena, cereales y básicos para arrancar el día.",
    searchTerms: ["desayuno", "cereales", "avena", "granola"],
  },
  {
    id: "cafe-instantaneas",
    label: "Café e instantáneas",
    shortLabel: "Café",
    image: "/rys/categories/cafe-instantaneas.webp",
    icon: "/mo/categories/cafe.svg",
    fallbackImage: "/rys/categories/cafe-instantaneas.webp",
    description: "Café servido, molido o instantáneo para resolver rápido.",
    searchTerms: ["cafe", "café", "instantaneo", "caliente", "despertar"],
  },
  {
    id: "lacteos-refrigerados",
    label: "Lácteos y refrigerados",
    shortLabel: "Lácteos",
    image: "/rys/categories/lacteos-refrigerados.webp",
    icon: "/mo/categories/lacteos.svg",
    fallbackImage: "/rys/categories/lacteos-refrigerados.webp",
    description: "Leche, queso, yogurt y refrigerados del día.",
    searchTerms: ["lacteos", "lácteos", "leche", "queso", "yogurt"],
  },
  {
    id: "abarrotes",
    label: "Abarrotes",
    shortLabel: "Abarrotes",
    image: "/rys/categories/abarrotes.webp",
    icon: "/mo/categories/abarrotes.svg",
    fallbackImage: "/rys/categories/abarrotes.webp",
    description: "Lo básico para la casa y la cocina.",
    searchTerms: ["abarrotes", "basicos", "arroz", "frijoles", "aceite"],
  },
  {
    id: "higiene-personal",
    label: "Higiene personal",
    shortLabel: "Higiene",
    image: "/rys/categories/higiene-personal.webp",
    icon: "/rys/categories/higiene-personal.webp",
    fallbackImage: "/rys/categories/higiene-personal.webp",
    description: "Baño, cuidado diario y artículos personales.",
    searchTerms: ["higiene", "baño", "shampoo", "jabón", "papel higiénico"],
  },
  {
    id: "limpieza-hogar",
    label: "Limpieza y hogar",
    shortLabel: "Hogar",
    image: "/rys/categories/limpieza-hogar.webp",
    icon: "/rys/categories/limpieza-hogar.webp",
    fallbackImage: "/rys/categories/limpieza-hogar.webp",
    description: "Limpieza rápida y básicos del hogar.",
    searchTerms: ["limpieza", "hogar", "detergente", "escoba", "trapeador"],
  },
  {
    id: "frutas-verduras",
    label: "Frutas y verduras",
    shortLabel: "Frutas",
    image: "/rys/categories/frutas-verduras.webp",
    icon: "/rys/categories/frutas-verduras.webp",
    fallbackImage: "/rys/categories/frutas-verduras.webp",
    description: "Fruta fresca y apoyo rápido para el día.",
    searchTerms: ["frutas", "verduras", "fruta", "ensalada"],
  },
  {
    id: "calientitos",
    label: "Calientitos / comida recién hecha",
    shortLabel: "Calientitos",
    image: "/rys/categories/calientitos.webp",
    icon: "/rys/categories/calientitos.webp",
    fallbackImage: "/rys/categories/calientitos.webp",
    description: "Comida recién hecha y salida rápida para hoy.",
    searchTerms: ["calientitos", "comida", "comida recien hecha", "tamales", "tostadas"],
  },
  {
    id: "econocombos",
    label: "Econocombos",
    shortLabel: "Combos",
    image: "/rys/categories/econocombos.webp",
    icon: "/rys/categories/econocombos.webp",
    fallbackImage: "/rys/categories/econocombos.webp",
    description: "Packs simples para resolver más de una cosa de una vez.",
    searchTerms: ["combos", "econocombos", "pack", "packs"],
  },
] as const;

export type MoCategoryId = (typeof MO_CATEGORY_DEFINITIONS)[number]["id"];

export type MoCategoryDefinition = (typeof MO_CATEGORY_DEFINITIONS)[number];

const MO_CATEGORY_BY_ID = new Map(
  MO_CATEGORY_DEFINITIONS.map((category) => [category.id, category])
);

const LEGACY_CATEGORY_MAP: Record<string, MoCategoryId> = {
  antojitos: "calientitos",
  bebidas: "bebidas",
  combos: "econocombos",
  lacteos: "lacteos-refrigerados",
  abarrotes: "abarrotes",
  snacks: "snacks-golosinas",
};

export const normalizeMoCategoryId = (value: string) => {
  const normalized = value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();

  return (LEGACY_CATEGORY_MAP[normalized] ?? normalized) as MoCategoryId | string;
};

export const getMoCategoryById = (value: string) =>
  MO_CATEGORY_BY_ID.get(normalizeMoCategoryId(value) as MoCategoryId);

export const getMoCategoryLabel = (value: string) =>
  getMoCategoryById(value)?.label ?? value;

export const getMoCategoryShortLabel = (value: string) =>
  getMoCategoryById(value)?.shortLabel ?? value;

export const getMoCategoryImage = (value: string) => {
  const category = getMoCategoryById(value);
  return category?.image ?? category?.fallbackImage ?? "/rys/categories/abarrotes.webp";
};

export const getMoCategoryIcon = (value: string) => {
  const category = getMoCategoryById(value);
  return category?.image ?? category?.icon ?? category?.fallbackImage ?? "/rys/categories/abarrotes.webp";
};

export const getMoCategoryFallbackImage = (value: string) =>
  getMoCategoryById(value)?.fallbackImage ?? "/rys/categories/abarrotes.webp";

export const getMoCategoryDescription = (value: string) =>
  getMoCategoryById(value)?.description ?? "Categoría del catálogo.";

export const getMoCategorySearchTerms = (value: string) =>
  getMoCategoryById(value)?.searchTerms ?? [];

export const sortMoCategoryIds = (values: string[]) => {
  const order = new Map(
    MO_CATEGORY_DEFINITIONS.map((category, index) => [category.id, index])
  );

  return [...values].sort((left, right) => {
    const leftOrder = order.get(normalizeMoCategoryId(left) as MoCategoryId) ?? 999;
    const rightOrder = order.get(normalizeMoCategoryId(right) as MoCategoryId) ?? 999;
    if (leftOrder !== rightOrder) return leftOrder - rightOrder;
    return getMoCategoryLabel(left).localeCompare(getMoCategoryLabel(right), "es");
  });
};
