import type { Metadata } from "next";
import productsData from "../../data/products.json";
import type { Product } from "../../lib/mo/types";
import { buildWhatsAppMessageLink } from "../../lib/mo/whatsapp";
import CatalogSection from "./CatalogSection";
import FreeTextOrder from "./FreeTextOrder";
import { CartProvider } from "./cart/CartContext";
import CartUI from "./cart/CartUI";

export const metadata: Metadata = {
  title: "RYS Minisúper",
  description: "Retiro en La Gloria, San Salvador.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function MoPage() {
  const products: Product[] = productsData;
  const ctaLink = buildWhatsAppMessageLink(
    "Hola RYS Minisúper, quiero hacer un pedido para retiro."
  );

  return (
    <CartProvider>
      <main className="min-h-screen w-full px-4 pb-36 pt-10 sm:px-6 lg:px-8">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-10">
          <section
            className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white px-6 py-8 shadow-sm sm:px-8"
            data-hero-bg="placeholder-gradient"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.18),_rgba(15,23,42,0.9))]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,_rgba(255,255,255,0.22),_transparent_45%),radial-gradient(circle_at_80%_30%,_rgba(16,185,129,0.18),_transparent_55%)]" />
            <div className="absolute inset-0 bg-slate-950/25 backdrop-blur-[2px]" />
            <div className="relative">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-emerald-200">
                PRE-LANZAMIENTO
              </p>
              <h1 className="mt-3 text-4xl font-semibold text-white sm:text-5xl">
                RYS Minisúper
              </h1>
              <p className="mt-2 text-sm text-emerald-50">
                Retiro en La Gloria, San Salvador
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="rounded-full border border-emerald-200/40 bg-emerald-500/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-50">
                  Retiro
                </span>
                <span className="rounded-full border border-white/30 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
                  La Gloria
                </span>
              </div>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href={ctaLink}
                  className="h-12 rounded-full bg-emerald-400 px-6 py-3 text-center text-sm font-semibold text-slate-900 transition hover:bg-emerald-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Escribir por WhatsApp
                </a>
                <a
                  href="#catalogo"
                  className="h-12 rounded-full border border-white/40 px-6 py-3 text-center text-sm font-semibold text-white transition hover:border-emerald-200 hover:text-emerald-100"
                >
                  Ver catálogo
                </a>
              </div>
            </div>
          </section>

        <section className="grid gap-4 rounded-3xl border border-slate-200 bg-white px-6 py-8 shadow-sm sm:grid-cols-3 sm:px-8">
          <div className="sm:col-span-3">
            <p className="text-xs uppercase tracking-[0.3em] text-emerald-600">
              Cómo pedir
            </p>
            <p className="mt-2 text-sm text-slate-600">
              3 pasos para pedir y retirar.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 px-4 py-4">
            <p className="text-xs font-semibold text-emerald-600">Paso 1</p>
            <p className="mt-1 text-sm font-semibold text-slate-900">
              Elige del catalogo
            </p>
            <p className="mt-1 text-xs text-slate-500">
              O escribe lo que necesitas.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 px-4 py-4">
            <p className="text-xs font-semibold text-emerald-600">Paso 2</p>
            <p className="mt-1 text-sm font-semibold text-slate-900">
              Escribe por WhatsApp
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Confirmamos tu pedido.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 px-4 py-4">
            <p className="text-xs font-semibold text-emerald-600">Paso 3</p>
            <p className="mt-1 text-sm font-semibold text-slate-900">
              Pasás a recoger
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Listo para retirar.
            </p>
          </div>
        </section>

          <FreeTextOrder />

        <section className="rounded-3xl border border-slate-200 bg-white px-6 py-8 shadow-sm sm:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-emerald-600">
                Horario y ubicacion
              </p>
              <p className="mt-2 text-sm text-slate-600">
                Lun-Sab 9:00-6:00 (placeholder).
              </p>
              <p className="mt-2 text-sm text-slate-600">
                Si es urgente, escribinos y te decimos si está listo hoy.
              </p>
            </div>
            <a
              href="https://maps.google.com/?q=TODO"
              className="h-11 rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-emerald-300 hover:text-emerald-700"
              target="_blank"
              rel="noopener noreferrer"
            >
              Cómo llegar (TODO)
            </a>
          </div>
        </section>

          <CatalogSection products={products} />
        </div>
        <CartUI />
      </main>
    </CartProvider>
  );
}
