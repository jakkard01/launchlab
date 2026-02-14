import type { Metadata } from "next";
import productsData from "../../data/products.json";
import type { Product } from "../../lib/mo/types";
import { buildWhatsAppMessageLink } from "../../lib/mo/whatsapp";
import { CartProvider } from "../mo/cart/CartContext";
import CartUI from "../mo/cart/CartUI";
import MoStorefront from "../mo/components/MoStorefront";

export const metadata: Metadata = {
  title: "RYS Minisúper",
  description: "Retiro en La Gloria, San Salvador.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function RysMiniSuperPage() {
  const products: Product[] = productsData;
  const ctaLink = buildWhatsAppMessageLink(
    "Hola RYS Minisúper, quiero hacer un pedido para retiro."
  );

  return (
    <CartProvider>
      <main className="min-h-screen w-full px-4 pb-36 pt-10 sm:px-6 lg:px-8">
        <MoStorefront products={products} ctaLink={ctaLink} />
        <CartUI />
      </main>
    </CartProvider>
  );
}
