import type { Metadata } from "next";
import { buildWhatsAppMessageLink } from "../../lib/mo/whatsapp";
import {
  MO_BRAND,
  MO_CANONICAL_PATH,
  MO_STORE_IMAGE_ALT,
  MO_STORE_IMAGE_SRC,
} from "../../lib/mo/config";
import { getStoreProducts } from "../../lib/mo/data/sheetsStore";
import { getMoBackendErrorInfo } from "../../lib/mo/data/errorInfo";
import productsSeed from "../../data/products.json";
import type { Product } from "../../lib/mo/types";
import { CartProvider } from "../mo/cart/CartContext";
import MoStorefront from "../mo/components/MoStorefront";

export const metadata: Metadata = {
  title: `${MO_BRAND.currentDisplayName} | Retiro fácil en La Gloria`,
  description:
    "Bebidas, abarrotes, calientitos y categorías claras para retiro en La Gloria, San Salvador. Pide por WhatsApp, te confirmamos y pasas a retirar.",
  alternates: {
    canonical: MO_CANONICAL_PATH,
  },
  openGraph: {
    title: `${MO_BRAND.currentDisplayName} | Compra rápida para retiro en La Gloria`,
    description:
      "Pide por WhatsApp, recibe confirmación real y pasa a retirar bebidas, básicos, calientitos y econocombos en La Gloria, San Salvador.",
    url: "https://www.poweredbyia.com/RYSminisuper",
    siteName: MO_BRAND.currentDisplayName,
    type: "website",
    images: [
      {
        url: `https://www.poweredbyia.com${MO_STORE_IMAGE_SRC}`,
        width: 1200,
        height: 1200,
        alt: `${MO_BRAND.currentDisplayName}. ${MO_STORE_IMAGE_ALT}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${MO_BRAND.currentDisplayName} | Compra rápida para retiro en La Gloria`,
    description:
      "Categorías claras, confirmación por WhatsApp y retiro fácil antes de salir.",
    images: [`https://www.poweredbyia.com${MO_STORE_IMAGE_SRC}`],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export default async function RysMiniSuperPage() {
  let products: Product[] = [];

  try {
    products = await getStoreProducts();
  } catch (error) {
    getMoBackendErrorInfo(error);
    products = (productsSeed as Product[]).map((product, index) => ({
      ...product,
      sortOrder: product.sortOrder ?? index + 1,
      stockStatus: product.stockStatus ?? "disponible",
    }));
  }

  const ctaLink = buildWhatsAppMessageLink(
    `Hola ${MO_BRAND.currentDisplayName}, quiero hacer un pedido para retiro.`
  );

  return (
    <CartProvider>
      <main className="min-h-screen w-full overflow-x-clip bg-base px-3 pb-28 pt-3 text-main sm:px-6 sm:pb-36 sm:pt-10 lg:px-8">
        <MoStorefront
          products={products}
          ctaLink={ctaLink}
        />
      </main>
    </CartProvider>
  );
}
