"use client";

import { useEffect, useState } from "react";
import type { Product, ProductStatus } from "../../lib/products/adapter";

const emptyProduct: Product = {
  id: "",
  name: "",
  price: "",
  description: "",
  images: [],
  categories: [],
  status: "draft",
};

export default function AdminPage() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [password, setPassword] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState<Product>(emptyProduct);
  const [message, setMessage] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);

  const fetchProducts = async () => {
    const res = await fetch("/api/products");
    const data = (await res.json()) as { products: Product[] };
    setProducts(data.products ?? []);
  };

  useEffect(() => {
    const init = async () => {
      const res = await fetch("/api/admin/me");
      const data = (await res.json()) as { isAdmin: boolean; role?: string };
      setIsAdmin(data.isAdmin);
      setRole(data.role ?? null);
      await fetchProducts();
      setLoading(false);
    };
    init();
  }, []);

  const handleLogin = async () => {
    setMessage(null);
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (!res.ok) {
      setMessage("Password incorrecto.");
      return;
    }
    setIsAdmin(true);
    setPassword("");
    const resMe = await fetch("/api/admin/me");
    const data = (await resMe.json()) as { role?: string };
    setRole(data.role ?? null);
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    setIsAdmin(false);
    setRole(null);
  };

  const handleSave = async () => {
    if (!isAdmin) return;
    setMessage(null);
    const payload = {
      ...form,
      images: form.images.filter(Boolean),
      categories: form.categories.filter(Boolean),
    };
    const isEdit = Boolean(form.id);
    const res = await fetch(
      isEdit ? `/api/products/${form.id}` : "/api/products",
      {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );
    if (!res.ok) {
      setMessage("No se pudo guardar. Revisa permisos o datos.");
      return;
    }
    await fetchProducts();
    setForm(emptyProduct);
    setMessage("Guardado.");
  };

  const handleDelete = async (id: string) => {
    if (!isAdmin) return;
    const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
    if (!res.ok) {
      setMessage("No se pudo eliminar.");
      return;
    }
    await fetchProducts();
    setForm(emptyProduct);
  };

  const updateField = (field: keyof Product, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const updateListField = (field: "images" | "categories", value: string) => {
    const items = value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
    setForm((prev) => ({ ...prev, [field]: items }));
  };

  if (loading) {
    return (
      <main className="min-h-screen w-full px-4 pb-20 pt-28 sm:px-6 lg:px-8">
        <p className="text-sm text-slate-300">Cargando admin...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen w-full px-4 pb-20 pt-28 sm:px-6 lg:px-8">
      <section className="mx-auto w-full max-w-6xl">
        <div className="rounded-3xl border border-white/10 bg-black/60 p-6">
          <p className="text-xs uppercase tracking-[0.4em] text-cyan-200/80">
            Admin
          </p>
          <h1 className="mt-3 text-3xl font-semibold text-white">
            Catalogo de productos
          </h1>
          <p className="mt-2 text-sm text-slate-300">
            Crea, edita o elimina productos sin tocar codigo.
          </p>

          {!isAdmin ? (
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Password admin"
                className="w-full rounded-full border border-white/10 bg-black/40 px-4 py-2 text-sm text-white outline-none focus:border-cyan-300"
              />
              <button
                type="button"
                onClick={handleLogin}
                className="rounded-full bg-emerald-400 px-5 py-2 text-sm font-semibold text-black transition hover:bg-emerald-300"
              >
                Entrar
              </button>
            </div>
          ) : (
            <div className="mt-6 flex items-center gap-3">
              <span className="rounded-full border border-white/15 px-3 py-1 text-xs uppercase tracking-[0.2em] text-slate-200">
                {role ?? "admin"}
              </span>
              <button
                type="button"
                onClick={handleLogout}
                className="text-xs font-semibold text-cyan-200 underline-offset-4 hover:underline"
              >
                Cerrar sesion
              </button>
            </div>
          )}
          {message && (
            <p className="mt-4 text-xs text-emerald-200">{message}</p>
          )}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl border border-white/10 bg-black/60 p-6">
            <h2 className="text-lg font-semibold text-white">Productos</h2>
            <div className="mt-4 grid gap-3">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="rounded-2xl border border-white/10 bg-black/50 p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-white">
                        {product.name}
                      </p>
                      <p className="text-xs text-slate-400">{product.price}</p>
                      <p className="mt-2 text-xs text-slate-300">
                        {product.description}
                      </p>
                      <p className="mt-2 text-[11px] uppercase tracking-[0.2em] text-cyan-200/70">
                        {product.status}
                      </p>
                    </div>
                    {isAdmin && (
                      <div className="flex flex-col gap-2">
                        <button
                          type="button"
                          onClick={() => setForm(product)}
                          className="rounded-full border border-white/15 px-3 py-1 text-xs font-semibold text-white/80 hover:border-cyan-300/60"
                        >
                          Editar
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(product.id)}
                          className="rounded-full border border-rose-300/40 px-3 py-1 text-xs font-semibold text-rose-200"
                        >
                          Eliminar
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-black/60 p-6">
            <h2 className="text-lg font-semibold text-white">Editor</h2>
            <p className="mt-2 text-xs text-slate-400">
              Campos separados por comas en imagenes y categorias.
            </p>
            <div className="mt-4 flex flex-col gap-3">
              <input
                value={form.name}
                onChange={(event) => updateField("name", event.target.value)}
                placeholder="Nombre"
                className="w-full rounded-full border border-white/10 bg-black/40 px-4 py-2 text-sm text-white outline-none focus:border-cyan-300"
              />
              <input
                value={form.price}
                onChange={(event) => updateField("price", event.target.value)}
                placeholder="Precio"
                className="w-full rounded-full border border-white/10 bg-black/40 px-4 py-2 text-sm text-white outline-none focus:border-cyan-300"
              />
              <textarea
                value={form.description}
                onChange={(event) => updateField("description", event.target.value)}
                placeholder="Descripcion"
                className="min-h-[90px] w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-2 text-sm text-white outline-none focus:border-cyan-300"
              />
              <input
                value={form.images.join(", ")}
                onChange={(event) => updateListField("images", event.target.value)}
                placeholder="Imagenes (url1, url2)"
                className="w-full rounded-full border border-white/10 bg-black/40 px-4 py-2 text-sm text-white outline-none focus:border-cyan-300"
              />
              <input
                value={form.categories.join(", ")}
                onChange={(event) => updateListField("categories", event.target.value)}
                placeholder="Categorias (web, ecommerce)"
                className="w-full rounded-full border border-white/10 bg-black/40 px-4 py-2 text-sm text-white outline-none focus:border-cyan-300"
              />
              <select
                value={form.status}
                onChange={(event) =>
                  updateField("status", event.target.value as ProductStatus)
                }
                className="w-full rounded-full border border-white/10 bg-black/40 px-4 py-2 text-sm text-white outline-none focus:border-cyan-300"
              >
                <option value="active">active</option>
                <option value="draft">draft</option>
              </select>
              <button
                type="button"
                onClick={handleSave}
                className="rounded-full bg-emerald-400 px-5 py-2 text-sm font-semibold text-black transition hover:bg-emerald-300"
                disabled={!isAdmin}
              >
                Guardar producto
              </button>
              <button
                type="button"
                onClick={() => setForm(emptyProduct)}
                className="rounded-full border border-white/20 px-5 py-2 text-sm font-semibold text-white/80 transition hover:border-cyan-300/60"
              >
                Limpiar
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
