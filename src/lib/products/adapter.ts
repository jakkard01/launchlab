export type ProductStatus = "active" | "draft";

export type Product = {
  id: string;
  name: string;
  price: string;
  description: string;
  images: string[];
  categories: string[];
  status: ProductStatus;
};

export type ProductInput = Omit<Product, "id"> & { id?: string };

export interface ProductsAdapter {
  list(): Promise<Product[]>;
  get(id: string): Promise<Product | null>;
  create(input: ProductInput): Promise<Product>;
  update(id: string, input: ProductInput): Promise<Product>;
  remove(id: string): Promise<void>;
}
