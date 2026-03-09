import type { Metadata } from "next";
import { buildWhatsAppMessageLink } from "../../lib/mo/whatsapp";
import { getStoreProducts } from "../../lib/mo/data/sheetsStore";
import productsSeed from "../../data/products.json";
import type { Product } from "../../lib/mo/types";
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
  let products: Product[] = [];
  let fallbackWarning: string | null = null;

  try {
    products = await getStoreProducts();
  } catch (error) {
    // Keep storefront available even when Sheets is temporarily unavailable.
    products = (productsSeed as Product[]).map((product, index) => ({
      ...product,
      sortOrder: product.sortOrder ?? index + 1,
      stockStatus: product.stockStatus ?? "disponible",
    }));
    fallbackWarning =
      "Catálogo temporal en modo respaldo. Revisa credenciales de Google Sheets para datos en vivo.";
  }

  const ctaLink = buildWhatsAppMessageLink(
    "Hola RYS Minisúper, quiero hacer un pedido para retiro."
  );

  return (
    <CartProvider>
      <main className="min-h-screen w-full bg-base px-4 pb-36 pt-10 text-main sm:px-6 lg:px-8">
        {fallbackWarning ? (
          <div className="mx-auto mb-4 w-full max-w-5xl rounded-2xl border border-amber-300/50 bg-amber-50 px-4 py-3 text-sm text-amber-800">
            {fallbackWarning}
          </div>
        ) : null}
        <MoStorefront products={products} ctaLink={ctaLink} />
        <CartUI />
      </main>
    </CartProvider>
  );
}
