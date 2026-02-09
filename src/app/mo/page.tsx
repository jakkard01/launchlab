import type { Metadata } from "next";
import productsData from "../../data/products.json";
import type { Product } from "../../lib/mo/types";
import { buildWhatsAppMessageLink } from "../../lib/mo/whatsapp";
import ProductCard from "./ProductCard";
import StickyWhatsAppButton from "./StickyWhatsAppButton";

export const metadata: Metadata = {
  title: "Mo MiniMarket",
  description: "Pickup en San Salvador La Gloria.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function MoPage() {
  const products: Product[] = productsData;
  const ctaLink = buildWhatsAppMessageLink(
    "Hola, quiero hacer un pedido para pickup."
  );

  return (
    <main className="min-h-screen w-full px-4 pb-24 pt-12 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-10">
        <section className="rounded-3xl border border-slate-200 bg-white px-6 py-8 shadow-sm sm:px-8">
          <p className="text-xs uppercase tracking-[0.4em] text-emerald-600">
            Pre-lanzamiento
          </p>
          <h1 className="mt-3 text-3xl font-semibold text-slate-900">
            Mo MiniMarket
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Pickup en San Salvador La Gloria
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <a
              href={ctaLink}
              className="rounded-full bg-emerald-500 px-5 py-2 text-sm font-semibold text-white transition hover:bg-emerald-600"
              target="_blank"
              rel="noopener noreferrer"
            >
              Escribir por WhatsApp
            </a>
            <span className="rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Pickup
            </span>
          </div>
        </section>

        <section className="grid gap-4 rounded-3xl border border-slate-200 bg-white px-6 py-8 shadow-sm sm:grid-cols-3 sm:px-8">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-emerald-600">
              Como pedir
            </p>
            <p className="mt-2 text-sm text-slate-600">
              3 pasos para tu pickup.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 px-4 py-3">
            <p className="text-xs font-semibold text-emerald-600">Paso 1</p>
            <p className="mt-1 text-sm font-semibold text-slate-900">
              Elige productos
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Selecciona del catalogo.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 px-4 py-3">
            <p className="text-xs font-semibold text-emerald-600">Paso 2</p>
            <p className="mt-1 text-sm font-semibold text-slate-900">
              Escribe por WhatsApp
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Confirmamos tu pedido.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 px-4 py-3 sm:col-start-2">
            <p className="text-xs font-semibold text-emerald-600">Paso 3</p>
            <p className="mt-1 text-sm font-semibold text-slate-900">
              Retira en pickup
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Listo para retirar.
            </p>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white px-6 py-8 shadow-sm sm:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-emerald-600">
                Horario y ubicacion
              </p>
              <p className="mt-2 text-sm text-slate-600">
                Lunes a sabado, 9:00 a.m. - 6:00 p.m. (placeholder).
              </p>
            </div>
            <a
              href="https://maps.google.com/?q=TODO"
              className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-emerald-300 hover:text-emerald-700"
              target="_blank"
              rel="noopener noreferrer"
            >
              Ver mapa (TODO)
            </a>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900">Catalogo</h2>
          <p className="mt-2 text-sm text-slate-600">
            Catalogo minimo con productos listos para pickup.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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
