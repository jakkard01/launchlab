export type ProductStatus = "available" | "soon" | "hidden" | "out_of_stock";

export type Product = {
  id: string;
  name: string;
  price: string;
  category: string;
  description: string;
  image: string;
  imageKey?: string;
  isFeatured: boolean;
  status?: ProductStatus;
  promoEnabled?: boolean;
  promoPercent?: number;
  featuredRank?: number;
  imageUrl?: string;
  stockStatus?: "disponible" | "ultimas" | "agotado";
};
