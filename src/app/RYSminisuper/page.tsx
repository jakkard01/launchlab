import type { Metadata } from "next";
import { buildWhatsAppMessageLink } from "../../lib/mo/whatsapp";
import { getStoreProducts } from "../../lib/mo/data/sheetsStore";
import { CartProvider } from "../mo/cart/CartContext";
import CartUI from "../mo/cart/CartUI";
import MoStorefront from "../mo/components/MoStorefront";

export const metadata: Metadata = {
  title: "RYS Minisúper",
  description: "Retiro en La Gloria, San Salvador.",
  robots: {
    index: true,
    follow: true,
  },
};

export const dynamic = "force-dynamic";

export default async function RysMiniSuperPage() {
  const products = await getStoreProducts();
  const ctaLink = buildWhatsAppMessageLink(
    "Hola RYS Minisúper, quiero hacer un pedido para retiro."
  );

  return (
    <CartProvider>
      <main className="min-h-screen w-full bg-base px-4 pb-36 pt-10 text-main sm:px-6 lg:px-8">
        <MoStorefront products={products} ctaLink={ctaLink} />
        <CartUI />
      </main>
    </CartProvider>
  );
}
