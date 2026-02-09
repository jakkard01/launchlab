import type { Metadata } from "next";
import productsData from "../../data/products.json";
import type { Product } from "../../lib/mo/types";
import { buildWhatsAppMessageLink } from "../../lib/mo/whatsapp";
import FreeTextOrder from "./FreeTextOrder";
import ProductCard from "./ProductCard";
import StickyWhatsAppButton from "./StickyWhatsAppButton";

export const metadata: Metadata = {
  title: "YRS Minisúper",
  description: "Pickup en San Salvador La Gloria.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function MoPage() {
  const products: Product[] = productsData;
  const ctaLink = buildWhatsAppMessageLink(
    "Hola YRS Minisúper, quiero hacer un pedido para pickup."
  );

  return (
    <main className="min-h-screen w-full px-4 pb-28 pt-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-10">
        <section className="rounded-3xl border border-slate-200 bg-white px-6 py-8 shadow-sm sm:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-emerald-600">
            PRE-LANZAMIENTO
          </p>
          <h1 className="mt-3 text-4xl font-semibold text-slate-900 sm:text-5xl">
            YRS Minisúper
          </h1>
          <p className="mt-3 text-base text-slate-600">
            Pickup en San Salvador La Gloria
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
              Pickup
            </span>
            <span className="rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              La Gloria
            </span>
          </div>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href={ctaLink}
              className="h-12 rounded-full bg-emerald-600 px-6 py-3 text-center text-sm font-semibold text-white transition hover:bg-emerald-700"
              target="_blank"
              rel="noopener noreferrer"
            >
              Escribir por WhatsApp
            </a>
            <a
              href="#catalogo"
              className="h-12 rounded-full border border-slate-200 px-6 py-3 text-center text-sm font-semibold text-slate-700 transition hover:border-emerald-200 hover:text-emerald-700"
            >
              Ver catálogo
            </a>
          </div>
        </section>

        <section className="grid gap-4 rounded-3xl border border-slate-200 bg-white px-6 py-8 shadow-sm sm:grid-cols-3 sm:px-8">
          <div className="sm:col-span-3">
            <p className="text-xs uppercase tracking-[0.3em] text-emerald-600">
              Cómo pedir
            </p>
            <p className="mt-2 text-sm text-slate-600">
              3 pasos simples para tu pickup.
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
              Retira en pickup
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

        <section id="catalogo">
          <h2 className="text-lg font-semibold text-slate-900">Catálogo</h2>
          <p className="mt-2 text-sm text-slate-600">
            Catálogo mínimo con productos listos para pickup.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </div>
      <StickyWhatsAppButton />
    </main>
  );
}
