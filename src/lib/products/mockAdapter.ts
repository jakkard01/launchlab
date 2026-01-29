import { Product, ProductInput, ProductsAdapter } from "./adapter";

const seedProducts: Product[] = [
  {
    id: "landing-starter",
    name: "Landing Starter",
    price: "Rango orientativo: €850–€1,400",
    description:
      "Landing de 1 pagina con copy base, CTA y performance mobile first.",
    images: ["/imagenes/demo/landing-starter.png"],
    categories: ["web", "landing"],
    status: "active",
  },
  {
    id: "ecommerce-addon",
    name: "Add-on Ecommerce",
    price: "Rango orientativo: €2,500–€6,000",
    description:
      "Catalogo + carrito/checkout o pedido por WhatsApp, con panel basico.",
    images: ["/imagenes/demo/ecommerce-addon.png"],
    categories: ["web", "ecommerce"],
    status: "active",
  },
  {
    id: "menu-digital-resto",
    name: "Menu digital restaurante",
    price: "Rango orientativo: €650–€1,200",
    description:
      "Carta visual, reservas y pedido por WhatsApp.",
    images: ["/imagenes/demo/resto-menu.png"],
    categories: ["local", "restaurante"],
    status: "draft",
  },
];

let memoryStore: Product[] = [...seedProducts];

const normalizeInput = (input: ProductInput, id: string): Product => ({
  id,
  name: input.name.trim(),
  price: input.price.trim(),
  description: input.description.trim(),
  images: input.images ?? [],
  categories: input.categories ?? [],
  status: input.status ?? "draft",
});

export const mockAdapter: ProductsAdapter = {
  async list() {
    return memoryStore;
  },
  async get(id) {
    return memoryStore.find((item) => item.id === id) ?? null;
  },
  async create(input) {
    const id =
      input.id ??
      input.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
    const record = normalizeInput(input, id);
    memoryStore = [...memoryStore.filter((item) => item.id !== id), record];
    return record;
  },
  async update(id, input) {
    const record = normalizeInput(input, id);
    memoryStore = memoryStore.map((item) =>
      item.id === id ? record : item
    );
    return record;
  },
  async remove(id) {
    memoryStore = memoryStore.filter((item) => item.id !== id);
  },
};
