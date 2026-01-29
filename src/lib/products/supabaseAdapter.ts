import { Product, ProductInput, ProductsAdapter } from "./adapter";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Supabase env vars missing");
}

const baseHeaders = {
  apikey: supabaseKey,
  Authorization: `Bearer ${supabaseKey}`,
  "Content-Type": "application/json",
};

const productsEndpoint = `${supabaseUrl}/rest/v1/products`;

const toProduct = (data: Product): Product => data;

export const supabaseAdapter: ProductsAdapter = {
  async list() {
    const res = await fetch(`${productsEndpoint}?select=*`, {
      headers: baseHeaders,
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to list products");
    const data = (await res.json()) as Product[];
    return data.map(toProduct);
  },
  async get(id) {
    const res = await fetch(
      `${productsEndpoint}?id=eq.${encodeURIComponent(id)}&select=*`,
      {
        headers: baseHeaders,
        cache: "no-store",
      }
    );
    if (!res.ok) throw new Error("Failed to get product");
    const data = (await res.json()) as Product[];
    return data[0] ?? null;
  },
  async create(input) {
    const res = await fetch(productsEndpoint, {
      method: "POST",
      headers: { ...baseHeaders, Prefer: "return=representation" },
      body: JSON.stringify(input),
    });
    if (!res.ok) throw new Error("Failed to create product");
    const data = (await res.json()) as Product[];
    return toProduct(data[0]);
  },
  async update(id, input) {
    const res = await fetch(`${productsEndpoint}?id=eq.${encodeURIComponent(id)}`, {
      method: "PATCH",
      headers: { ...baseHeaders, Prefer: "return=representation" },
      body: JSON.stringify({ ...input, id }),
    });
    if (!res.ok) throw new Error("Failed to update product");
    const data = (await res.json()) as Product[];
    return toProduct(data[0]);
  },
  async remove(id) {
    const res = await fetch(`${productsEndpoint}?id=eq.${encodeURIComponent(id)}`, {
      method: "DELETE",
      headers: baseHeaders,
    });
    if (!res.ok) throw new Error("Failed to delete product");
  },
};
