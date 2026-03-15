import type { Product } from "./types";

const CATEGORY_SYNONYMS: Record<string, string[]> = {
  hot: ["caliente", "comida caliente", "hoy", "listo", "antojitos"],
  antojitos: ["antojitos", "pupusas", "fritos", "comida"],
  combos: ["combo", "combos", "pack", "packs"],
  lacteos: ["lacteos", "lacteo", "leche", "queso"],
  bebidas: ["bebidas", "bebida", "refresco", "gaseosa", "jugo", "cafe"],
  abarrotes: ["abarrotes", "basicos", "casa", "arroz", "frijoles"],
  snacks: ["snacks", "galletas", "boquitas"],
  ofertas: ["ofertas", "oferta", "promo", "promos", "descuento"],
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
  const category = normalizeSearchText(product.category);
  const base = CATEGORY_SYNONYMS[category] ?? [];
  return [category, ...base].filter(Boolean);
};

export const getProductSearchHaystack = (product: Product) => {
  const parts = [
    product.name,
    product.description,
    product.category,
    ...getCategoryTerms(product),
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

      const score = (name: string, category: string, haystack: string) => {
        let total = 0;
        if (name === normalizedQuery) total += 140;
        if (name.startsWith(normalizedQuery)) total += 90;
        if (name.includes(normalizedQuery)) total += 55;
        if (category.includes(normalizedQuery)) total += 40;
        if (haystack.includes(normalizedQuery)) total += 20;
        total += tokens.filter((token) => name.startsWith(token)).length * 16;
        total += tokens.filter((token) => category.includes(token)).length * 8;
        total += tokens.filter((token) => haystack.includes(token)).length * 4;
        return total;
      };

      const scoreA = score(nameA, categoryA, haystackA);
      const scoreB = score(nameB, categoryB, haystackB);

      if (scoreA !== scoreB) return scoreB - scoreA;
      const byOrder = (a.sortOrder ?? 9999) - (b.sortOrder ?? 9999);
      if (byOrder !== 0) return byOrder;
      return a.name.localeCompare(b.name, "es");
    });
};
