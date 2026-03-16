import type { Metadata } from "next";
import { cookies } from "next/headers";
import { buildWhatsAppMessageLink } from "../../lib/mo/whatsapp";
import { getStoreProducts } from "../../lib/mo/data/sheetsStore";
import { getMoBackendErrorInfo } from "../../lib/mo/data/errorInfo";
import productsSeed from "../../data/products.json";
import type { Product } from "../../lib/mo/types";
import { CartProvider } from "../mo/cart/CartContext";
import MoStorefront from "../mo/components/MoStorefront";

export const metadata: Metadata = {
  title: "RYS Minisúper | Retiro fácil en La Gloria",
  description:
    "Abarrotes, café, antojitos y combos para retiro en La Gloria, San Salvador. Pide por WhatsApp, te confirmamos y pasas a retirar.",
  alternates: {
    canonical: "/RYSminisuper",
  },
  openGraph: {
    title: "RYS Minisúper | Compra rápida para retiro en La Gloria",
    description:
      "Pide por WhatsApp, recibe confirmación real y pasa a retirar café, antojitos, básicos y combos en La Gloria, San Salvador.",
    url: "https://www.poweredbyia.com/RYSminisuper",
    siteName: "RYS Minisúper",
    type: "website",
    images: [
      {
        url: "https://www.poweredbyia.com/imagenes/perfil/rysminisuper.jpeg",
        width: 1200,
        height: 1200,
        alt: "RYS Minisúper en La Gloria, San Salvador",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "RYS Minisúper | Compra rápida para retiro en La Gloria",
    description:
      "Abarrotes, café, antojitos y combos con confirmación por WhatsApp antes de salir.",
    images: ["https://www.poweredbyia.com/imagenes/perfil/rysminisuper.jpeg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export default async function RysMiniSuperPage() {
  const hasAdminSession = cookies().get("mo_admin")?.value === "1";
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
      message:
        issue.kind === "quota"
          ? "Estamos mostrando el catálogo de respaldo mientras bajan las lecturas contra la hoja."
          : issue.message,
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
          <div className="mx-auto mb-4 w-full max-w-5xl rounded-2xl border border-amber-300/50 bg-amber-50 px-4 py-3 text-sm text-amber-900 dark:border-amber-300/25 dark:bg-amber-500/10 dark:text-amber-100">
            <p className="font-semibold">{fallbackWarning.title}</p>
            <p className="mt-1">{fallbackWarning.message}</p>
            <p className="mt-1 text-xs text-amber-900/80 dark:text-amber-100/80">
              {fallbackWarning.help}
            </p>
          </div>
        ) : null}
        <MoStorefront
          products={products}
          ctaLink={ctaLink}
          hasAdminSession={hasAdminSession}
        />
      </main>
    </CartProvider>
  );
}
