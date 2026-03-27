import type { Product } from "./types";
import { getMoCategorySearchTerms, normalizeMoCategoryId } from "./categories";

const CATEGORY_SYNONYMS: Record<string, string[]> = {
  hot: ["caliente", "comida caliente", "hoy", "listo", "calientitos"],
  bebidas: ["bebidas", "bebida", "refresco", "gaseosa", "jugo", "coca", "coca cola", "soda"],
  "snacks-golosinas": ["snacks", "galletas", "boquitas", "boquita", "mani", "dulces", "golosinas"],
  "panaderia-reposteria": ["pan", "panaderia", "reposteria", "pan dulce", "pan integral"],
  "cereales-desayuno": ["desayuno", "cereales", "cereal", "avena", "granola"],
  "cafe-instantaneas": ["cafe", "café", "instantaneo", "instantáneo", "caliente"],
  "lacteos-refrigerados": ["lacteos", "lacteo", "leche", "queso", "yogurt", "refrigerados"],
  abarrotes: ["abarrotes", "basicos", "casa", "arroz", "frijoles"],
  "higiene-personal": ["higiene", "shampoo", "jabon", "jabón", "papel higienico", "baño"],
  "limpieza-hogar": ["limpieza", "hogar", "detergente", "escoba", "trapeador", "servilletas"],
  "frutas-verduras": ["frutas", "verduras", "fruta", "ensalada"],
  calientitos: ["calientitos", "comida", "comida caliente", "recien hecho", "tamales", "tostadas"],
  econocombos: ["combo", "combos", "pack", "packs", "econocombos"],
  ofertas: ["ofertas", "oferta", "promo", "promos", "descuento"],
};

const PRODUCT_ALIASES: Record<string, string[]> = {
  "mo-coca-cola-600ml": ["coca", "coca cola", "coke", "soda personal"],
  "mo-gaseosa-cola-2l": ["coca", "coca cola", "coke", "soda", "cola"],
  "mo-cafe-pack": ["cafe", "café", "desayuno", "pan dulce"],
  "mo-cafe-servido": ["cafe", "café", "cafe caliente"],
  "mo-cafe-instantaneo": ["cafe", "café", "instantaneo", "instantáneo"],
  "mo-cafe-molido": ["cafe", "café", "molido", "para preparar"],
  "mo-pan-dulce": ["pan dulce", "desayuno", "merienda", "cafe con pan"],
  "mo-mani-salado": ["mani", "maní", "boquita"],
  "mo-mani-limon-chile": ["mani", "maní", "limon", "limón", "chile", "boquita"],
  "mo-tortillitas-limon": ["tortillitas", "limon", "limón", "boquita", "snack"],
  "mo-platanitos": ["platanitos", "platano", "plátano", "boquita", "snack"],
};

export const normalizeSearchText = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();

const tokenize = (value: string) =>
  normalizeSearchText(value)
    .split(/[^a-z0-9]+/)
    .filter(Boolean);

const getCategoryTerms = (product: Product) => {
  const category = normalizeSearchText(normalizeMoCategoryId(product.category));
  const base = CATEGORY_SYNONYMS[category] ?? [];
  const configured = getMoCategorySearchTerms(product.category).map(normalizeSearchText);
  return [category, ...base, ...configured].filter(Boolean);
};

const getAliasTerms = (product: Product) =>
  PRODUCT_ALIASES[product.id] ?? [];

export const getProductSearchHaystack = (product: Product) => {
  const parts = [
    product.name,
    product.description,
    product.category,
    product.subgroup ?? "",
    ...(product.tags ?? []),
    ...getCategoryTerms(product),
    ...getAliasTerms(product),
  ];

  return normalizeSearchText(parts.join(" "));
};

export const matchesProductQuery = (product: Product, query: string) => {
  const normalizedQuery = normalizeSearchText(query);
  if (!normalizedQuery) return true;

  const haystack = getProductSearchHaystack(product);
  const tokens = tokenize(normalizedQuery);

  return tokens.every((token) => haystack.includes(token));
};

export const rankProductsByQuery = (products: Product[], query: string) => {
  const normalizedQuery = normalizeSearchText(query);
  if (!normalizedQuery) return products;

  const tokens = tokenize(normalizedQuery);

  return [...products]
    .filter((product) => matchesProductQuery(product, normalizedQuery))
    .sort((a, b) => {
      const haystackA = getProductSearchHaystack(a);
      const haystackB = getProductSearchHaystack(b);
      const nameA = normalizeSearchText(a.name);
      const nameB = normalizeSearchText(b.name);
      const categoryA = normalizeSearchText(a.category);
      const categoryB = normalizeSearchText(b.category);
      const aliasA = normalizeSearchText(getAliasTerms(a).join(" "));
      const aliasB = normalizeSearchText(getAliasTerms(b).join(" "));

      const score = (
        product: Product,
        name: string,
        category: string,
        haystack: string,
        alias: string
      ) => {
        let total = 0;
        if (name === normalizedQuery) total += 140;
        if (name.startsWith(normalizedQuery)) total += 90;
        if (name.includes(normalizedQuery)) total += 55;
        if (alias === normalizedQuery) total += 80;
        if (alias.includes(normalizedQuery)) total += 35;
        if (category.includes(normalizedQuery)) total += 40;
        if (haystack.includes(normalizedQuery)) total += 20;
        total += tokens.filter((token) => name.startsWith(token)).length * 16;
        total += tokens.filter((token) => alias.includes(token)).length * 10;
        total += tokens.filter((token) => category.includes(token)).length * 8;
        total += tokens.filter((token) => haystack.includes(token)).length * 4;
        if (product.isFeatured) total += 6;
        if ((product.hotStatus ?? "hoy_no_hicimos") !== "hoy_no_hicimos") total += 8;
        return total;
      };

      const scoreA = score(a, nameA, categoryA, haystackA, aliasA);
      const scoreB = score(b, nameB, categoryB, haystackB, aliasB);

      if (scoreA !== scoreB) return scoreB - scoreA;
      const byOrder = (a.sortOrder ?? 9999) - (b.sortOrder ?? 9999);
      if (byOrder !== 0) return byOrder;
      return a.name.localeCompare(b.name, "es");
    });
};
