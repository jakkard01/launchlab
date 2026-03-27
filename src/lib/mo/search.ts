import type { Product } from "./types";
import { getMoCategorySearchTerms, normalizeMoCategoryId } from "./categories";

const CATEGORY_SYNONYMS: Record<string, string[]> = {
  hot: ["caliente", "comida caliente", "hoy", "listo", "calientitos"],
  bebidas: ["bebidas", "bebida", "refresco", "gaseosa", "coca", "coca cola", "pepsi", "agua"],
  "snacks-golosinas": ["snacks", "galletas", "boquitas", "boquita", "dulces", "golosinas", "chocolate"],
  "panaderia-reposteria": ["pan", "panaderia", "reposteria", "pan dulce", "artesanal", "empacado"],
  "cereales-desayuno": ["desayuno", "cereales", "cereal", "corn flakes", "kelloggs"],
  "cafe-instantaneas": ["cafe", "café", "instantaneo", "instantáneo", "te", "té", "sopa instantanea"],
  "lacteos-refrigerados": ["lacteos", "lacteo", "leche", "yogur", "yogurt", "refrigerados"],
  abarrotes: ["abarrotes", "despensa", "basicos", "casa", "atun", "sardinas", "harina"],
  "higiene-personal": ["higiene", "shampoo", "crema dental", "oral-b", "papel higienico", "toallas", "pañales"],
  "limpieza-hogar": ["limpieza", "hogar", "papel cocina", "encendedor"],
  "frutas-verduras": ["frutas", "verduras", "fruta", "banano", "tomate", "cebolla"],
  calientitos: ["calientitos", "comida", "comida caliente", "recien hecho", "recien hecha"],
  econocombos: ["combo", "combos", "pack", "packs", "econocombos"],
  ofertas: ["ofertas", "oferta", "promo", "promos", "descuento"],
};

const PRODUCT_ALIASES: Record<string, string[]> = {
  "mo-pepsi-600ml": ["pepsi", "soda pepsi", "gaseosa personal"],
  "mo-coca-cola-600ml": ["coca", "coca cola", "coke", "soda personal"],
  "mo-coca-cola-grande": ["coca", "coca cola", "familiar", "grande"],
  "mo-pepsi-grande": ["pepsi", "familiar", "grande"],
  "mo-gaseosa-naranja-grande": ["naranja", "gaseosa naranja", "familiar"],
  "mo-agua-individual": ["agua", "botella personal"],
  "mo-agua-grande": ["agua", "botella grande"],
  "mo-yogur-individual": ["yogur", "yogurt", "refrigerado"],
  "mo-kelloggs-corn-flakes": ["kelloggs", "corn flakes", "cereal"],
  "mo-nescafe-cappuccino": ["nescafe", "cappuccino", "café"],
  "mo-cafe-majada-pequeno": ["majada", "cafe majada", "café"],
  "mo-te-jengibre-limon": ["te", "té", "jengibre", "limon", "limón", "mondaisa"],
  "mo-sopa-vaso": ["sopa", "vaso", "instantanea", "instantánea"],
  "mo-sopa-sobre": ["sopa", "sobre", "instantanea", "instantánea"],
  "mo-atun-calvo-lata": ["atun", "atún", "calvo", "lata"],
  "mo-leche-polvo": ["leche en polvo", "bebida lactea", "bebida láctea"],
  "mo-pan-empacado-sinai": ["pan sinai", "pan empacado"],
  "mo-pan-dulce-artesanal": ["pan dulce", "artesanal", "desayuno", "merienda"],
  "mo-pan-dulce-especial": ["pan dulce", "especial"],
  "mo-papel-higienico-scott": ["papel higienico", "papel higiénico", "scott"],
  "mo-papel-cocina-scott": ["papel cocina", "scott"],
  "mo-panales-pampers": ["pañales", "pampers", "bebe", "bebé"],
  "mo-panales-huggies": ["pañales", "huggies", "bebe", "bebé"],
  "mo-crema-dental-oral-b": ["oral-b", "crema dental"],
  "mo-shampoo-pantene-sachet": ["pantene", "sachet", "shampoo"],
  "mo-shampoo-pantene-botella": ["pantene", "botella", "shampoo"],
  "mo-banano-unidad": ["banano"],
  "mo-racimo-banano-pequeno": ["banano", "racimo"],
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
