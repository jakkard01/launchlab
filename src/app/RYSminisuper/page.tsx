import type { Metadata } from "next";
import { buildWhatsAppMessageLink } from "../../lib/mo/whatsapp";
import { getStoreProducts } from "../../lib/mo/data/sheetsStore";
import { getMoBackendErrorInfo } from "../../lib/mo/data/errorInfo";
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
  let fallbackWarning: { title: string; message: string; help: string } | null = null;

  try {
    products = await getStoreProducts();
  } catch (error) {
    const issue = getMoBackendErrorInfo(error);
    products = (productsSeed as Product[]).map((product, index) => ({
      ...product,
      sortOrder: product.sortOrder ?? index + 1,
      stockStatus: product.stockStatus ?? "disponible",
    }));
    fallbackWarning = {
      title: "Catálogo temporal en modo respaldo",
      message: issue.message,
      help: issue.help,
    };
  }

  const ctaLink = buildWhatsAppMessageLink(
    "Hola RYS Minisúper, quiero hacer un pedido para retiro."
  );

  return (
    <CartProvider>
      <main className="min-h-screen w-full bg-base px-4 pb-36 pt-10 text-main sm:px-6 lg:px-8">
        {fallbackWarning ? (
          <div className="mx-auto mb-4 w-full max-w-5xl rounded-2xl border border-amber-300/50 bg-amber-50 px-4 py-3 text-sm text-amber-900">
            <p className="font-semibold">{fallbackWarning.title}</p>
            <p className="mt-1">{fallbackWarning.message}</p>
            <p className="mt-1 text-xs text-amber-900/80">
              {fallbackWarning.help}
            </p>
          </div>
        ) : null}
        <MoStorefront products={products} ctaLink={ctaLink} />
        <CartUI />
      </main>
    </CartProvider>
  );
}
