"use client";

import { useEffect, useState } from "react";
import { buildWhatsappLink } from "../../lib/site";
import type { Product } from "../../lib/products/adapter";

export default function TiendaPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const res = await fetch("/api/products");
      const data = (await res.json()) as { products: Product[] };
      const list = (data.products ?? []).filter(
        (item) => item.status === "active"
      );
      setProducts(list);
      setLoading(false);
    };
    load();
  }, []);

  return (
    <main className="min-h-screen w-full px-4 pb-20 pt-28 sm:px-6 lg:px-8">
      <section className="mx-auto w-full max-w-6xl">
        <p className="text-xs uppercase tracking-[0.4em] text-cyan-300/80">
          Tienda (demo)
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-white">
          Catalogo editable con pedido por WhatsApp
        </h1>
        <p className="mt-3 text-sm text-slate-300">
          Esta demo usa el catalogo del admin. No hay checkout real.
        </p>

        {loading ? (
          <p className="mt-6 text-sm text-slate-300">Cargando productos...</p>
        ) : (
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => {
              const message = `Hola, quiero pedir: ${product.name} (${product.price}).`;
              return (
                <article
                  key={product.id}
                  className="flex h-full flex-col rounded-3xl border border-white/10 bg-black/60 p-6 shadow-xl"
                >
                  <h2 className="text-lg font-semibold text-white">
                    {product.name}
                  </h2>
                  <p className="mt-2 text-sm text-emerald-200">
                    {product.price}
                  </p>
                  <p className="mt-3 text-sm text-slate-300">
                    {product.description}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {product.categories.map((cat) => (
                      <span
                        key={cat}
                        className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-slate-200"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                  <a
                    href={buildWhatsappLink("store_demo", message)}
                    className="mt-6 rounded-full bg-emerald-400 px-5 py-2 text-center text-sm font-semibold text-black transition hover:bg-emerald-300"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-fab-avoid
                  >
                    Pedido por WhatsApp
                  </a>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}
