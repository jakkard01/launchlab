export type Product = {
  id: string;
  name: string;
  price: string;
  category: string;
  description: string;
  image: string;
  imageKey?: string;
  isFeatured: boolean;
  promoEnabled?: boolean;
  promoPercent?: number;
  featuredRank?: number;
  imageUrl?: string;
  stockStatus?: "disponible" | "ultimas" | "agotado";
};
