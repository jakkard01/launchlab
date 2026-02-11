"use client";

import { useEffect, useMemo, useState } from "react";
import productsData from "../../../data/products.json";
import type { Product } from "../../../lib/mo/types";

type StockStatus = "disponible" | "ultimas" | "agotado";
type HotStatus = "activo" | "pausa";

type HotState = {
  enabled: boolean;
  status: HotStatus;
  start: string;
  end: string;
};

type AdminState = {
  stock: Record<string, StockStatus>;
  prices: Record<string, string>;
  hotToday: Record<string, HotState>;
  sales: [];
};

const storageKey = "moAdminState.v1";

const createDefaultState = (products: Product[]): AdminState => {
  const stock: Record<string, StockStatus> = {};
  const prices: Record<string, string> = {};
  const hotToday: Record<string, HotState> = {};

  products.forEach((product) => {
    stock[product.id] = "disponible";
    prices[product.id] = product.price;
    hotToday[product.id] = {
      enabled: false,
      status: "activo",
      start: "",
      end: "",
    };
  });

  return { stock, prices, hotToday, sales: [] };
};

const mergeState = (incoming: Partial<AdminState>, products: Product[]) => {
  const base = createDefaultState(products);

  return {
    ...base,
    ...incoming,
    stock: { ...base.stock, ...incoming.stock },
    prices: { ...base.prices, ...incoming.prices },
    hotToday: { ...base.hotToday, ...incoming.hotToday },
    sales: Array.isArray(incoming.sales) ? incoming.sales : [],
  } as AdminState;
};


export default function MoAdminPage() {
  const products = productsData as Product[];
  const [state, setState] = useState<AdminState>(() =>
    createDefaultState(products)
  );
  const [ready, setReady] = useState(false);

  const hotCount = useMemo(() => {
    return products.filter((product) => state.hotToday[product.id]?.enabled)
      .length;
  }, [products, state.hotToday]);

  useEffect(() => {
    const raw = window.localStorage.getItem(storageKey);
    if (raw) {
      try {
        const parsed = JSON.parse(raw) as Partial<AdminState>;
        setState(mergeState(parsed, products));
      } catch {
        setState(createDefaultState(products));
      }
    }
    setReady(true);
  }, [products]);

  useEffect(() => {
    if (!ready) return;
    window.localStorage.setItem(storageKey, JSON.stringify(state));
  }, [ready, state]);

  const updateStock = (id: string, status: StockStatus) => {
    setState((prev) => ({
      ...prev,
      stock: { ...prev.stock, [id]: status },
    }));
  };

  const updatePrice = (id: string, value: string) => {
    setState((prev) => ({
      ...prev,
      prices: { ...prev.prices, [id]: value },
    }));
  };

  const updateHot = (id: string, next: Partial<HotState>) => {
    setState((prev) => ({
      ...prev,
      hotToday: {
        ...prev.hotToday,
        [id]: { ...prev.hotToday[id], ...next },
      },
    }));
  };

  const stockOptions: { value: StockStatus; label: string }[] = [
    { value: "disponible", label: "Disponible" },
    { value: "ultimas", label: "Ultimas" },
    { value: "agotado", label: "Agotado" },
  ];

  return (
    <main className="min-h-screen w-full px-4 pb-20 pt-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
        <header className="rounded-3xl border border-slate-200 bg-white px-6 py-6 shadow-sm">
          <p className="text-xs uppercase tracking-[0.3em] text-emerald-600">
            Panel facil
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-slate-900">
            Control del minisuper
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Cambios rapidos, sin miedo. Se guarda en este dispositivo.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="rounded-full border border-emerald-200/50 bg-emerald-50 px-4 py-2 text-xs font-semibold text-emerald-700">
              {hotCount} calientes hoy
            </span>
            <a
              href="/mo"
              className="rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 transition hover:border-emerald-300 hover:text-emerald-700"
            >
              Volver al catalogo
            </a>
          </div>
        </header>

        <section className="rounded-3xl border border-slate-200 bg-white px-6 py-6 shadow-sm">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-emerald-600">
                Stock
              </p>
              <h2 className="mt-2 text-lg font-semibold text-slate-900">
                Disponible, ultimas o agotado
              </h2>
            </div>
          </div>
          <div className="mt-4 grid gap-3">
            {products.map((product) => (
              <div
                key={product.id}
                className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 px-4 py-3"
              >
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    {product.name}
                  </p>
                  <p className="text-xs text-slate-500">{product.category}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {stockOptions.map((option) => {
                    const isActive = state.stock[product.id] === option.value;
                    const base =
                      "rounded-full px-3 py-1 text-xs font-semibold transition";
                    const activeStyle =
                      option.value === "disponible"
                        ? "bg-emerald-500 text-white"
                        : option.value === "ultimas"
                        ? "bg-amber-400 text-amber-950"
                        : "bg-rose-500 text-white";

                    return (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => updateStock(product.id, option.value)}
                        className={`${base} ${
                          isActive
                            ? activeStyle
                            : "border border-slate-200 text-slate-600 hover:border-emerald-300"
                        }`}
                      >
                        {option.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white px-6 py-6 shadow-sm">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-emerald-600">
              Precios
            </p>
            <h2 className="mt-2 text-lg font-semibold text-slate-900">
              Solo precio visible
            </h2>
          </div>
          <div className="mt-4 grid gap-3">
            {products.map((product) => (
              <label
                key={product.id}
                className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 px-4 py-3"
              >
                <span className="text-sm font-semibold text-slate-900">
                  {product.name}
                </span>
                <input
                  value={state.prices[product.id] ?? ""}
                  onChange={(event) =>
                    updatePrice(product.id, event.target.value)
                  }
                  placeholder={product.price}
                  className="w-32 rounded-full border border-slate-200 px-3 py-1 text-sm text-slate-700 outline-none focus:border-emerald-300"
                />
              </label>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white px-6 py-6 shadow-sm">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-emerald-600">
                Caliente hoy
              </p>
              <h2 className="mt-2 text-lg font-semibold text-slate-900">
                Estado y ventana por producto
              </h2>
            </div>
          </div>
          <div className="mt-4 grid gap-3">
            {products.map((product) => {
              const hot = state.hotToday[product.id];
              return (
                <div
                  key={product.id}
                  className="grid gap-3 rounded-2xl border border-slate-200 px-4 py-3 sm:grid-cols-[1.1fr_0.9fr_1.2fr] sm:items-center"
                >
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      {product.name}
                    </p>
                    <p className="text-xs text-slate-500">
                      {hot?.enabled ? "Activo" : "Apagado"}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="flex items-center gap-2 text-xs text-slate-600">
                      <input
                        type="checkbox"
                        checked={hot?.enabled ?? false}
                        onChange={(event) =>
                          updateHot(product.id, {
                            enabled: event.target.checked,
                          })
                        }
                        className="h-4 w-4 rounded border-slate-300 text-emerald-600"
                      />
                      Hoy
                    </label>
                    <select
                      value={hot?.status ?? "activo"}
                      onChange={(event) =>
                        updateHot(product.id, {
                          status: event.target.value as HotStatus,
                        })
                      }
                      className="rounded-full border border-slate-200 px-3 py-1 text-xs text-slate-700"
                    >
                      <option value="activo">Activo</option>
                      <option value="pausa">Pausa</option>
                    </select>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600">
                    <span className="rounded-full border border-slate-200 px-3 py-1">
                      Ventana
                    </span>
                    <input
                      type="time"
                      value={hot?.start ?? ""}
                      onChange={(event) =>
                        updateHot(product.id, { start: event.target.value })
                      }
                      className="rounded-full border border-slate-200 px-3 py-1"
                    />
                    <span>a</span>
                    <input
                      type="time"
                      value={hot?.end ?? ""}
                      onChange={(event) =>
                        updateHot(product.id, { end: event.target.value })
                      }
                      className="rounded-full border border-slate-200 px-3 py-1"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}
