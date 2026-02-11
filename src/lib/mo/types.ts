export type Product = {
  id: string;
  name: string;
  price: string;
  category: string;
  description: string;
  image: string;
  isFeatured: boolean;
  promoEnabled?: boolean;
  promoPercent?: number;
  featuredRank?: number;
  imageUrl?: string;
  stockStatus?: "disponible" | "ultimas" | "agotado";
};
