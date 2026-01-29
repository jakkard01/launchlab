import { mockAdapter } from "./mockAdapter";
import type { ProductsAdapter } from "./adapter";

export const getProductsAdapter = async (): Promise<ProductsAdapter> => {
  if (process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY) {
    const module = await import("./supabaseAdapter");
    return module.supabaseAdapter as ProductsAdapter;
  }
  return mockAdapter;
};
