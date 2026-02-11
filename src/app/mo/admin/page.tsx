"use client";

import { useEffect, useMemo, useState } from "react";
import type { Product } from "../../../lib/mo/types";
import { getMoDataAdapter } from "../../../lib/mo/data";
import {
  getEffectivePrice,
  getPromoLabel,
  getPromoSavings,
} from "../../../lib/mo/pricing";
import type {
  HotState,
  HotStatus,
  MoDataAdapter,
  MoStats,
  OrderLogEntry,
  PromoState,
  StockStatus,
} from "../../../lib/mo/data/types";

const parseMoney = (value: string) => {
  const cleaned = value.replace(/[^\d.,-]/g, "").replace(",", ".");
  const parsed = Number(cleaned);
  return Number.isFinite(parsed) ? parsed : 0;
};

const formatMoney = (value: number) => `$${value.toFixed(2)}`;

const isSameDay = (date: Date, reference: Date) => {
  return date.toDateString() === reference.toDateString();
};

const defaultHotState = (): HotState => ({
  status: "hoy_no_hicimos",
  windowStart: "",
  windowEnd: "",
  note: "",
  updatedAt: "",
});

const hotLabels: Record<HotStatus, string> = {
  preparando: "Preparando",
  listo: "Listo",
  se_acabo: "Se acabo",
  hoy_no_hicimos: "Hoy no hicimos",
};

export default function MoAdminPage() {
  const [adapter, setAdapter] = useState<MoDataAdapter | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [stock, setStock] = useState<Record<string, StockStatus>>({});
  const [prices, setPrices] = useState<Record<string, string>>({});
  const [promo, setPromo] = useState<Record<string, PromoState>>({});
  const [hotToday, setHotToday] = useState<Record<string, HotState>>({});
  const [orderLogs, setOrderLogs] = useState<OrderLogEntry[]>([]);
  const [stats, setStats] = useState<MoStats | null>(null);

  const [saleProductId, setSaleProductId] = useState("");
  const [saleQuantity, setSaleQuantity] = useState(1);
  const [saleUnitPrice, setSaleUnitPrice] = useState(0);

  const loadSnapshot = async (activeAdapter: MoDataAdapter) => {
    const snapshot = await activeAdapter.getAdminSnapshot();
    setProducts(snapshot.products);
    setStock(snapshot.stock);
    setPrices(snapshot.prices);
    setPromo(snapshot.promo);
    setHotToday(snapshot.hotToday);
    setOrderLogs(snapshot.orderLogs);
  };

  const loadStats = async (activeAdapter: MoDataAdapter) => {
    const nextStats = await activeAdapter.getStats();
    setStats(nextStats);
  };

  const reloadAll = async (activeAdapter?: MoDataAdapter) => {
    const current = activeAdapter ?? adapter;
    if (!current) return;
    await Promise.all([loadSnapshot(current), loadStats(current)]);
  };

  useEffect(() => {
    let active = true;

    const init = async () => {
      setLoading(true);
      try {
        const dataAdapter = await getMoDataAdapter();
        if (!active) return;
        setAdapter(dataAdapter);
        await reloadAll(dataAdapter);
        if (!active) return;
        setError(null);
      } catch (err) {
        if (!active) return;
        setError("No se pudo cargar el panel.");
      } finally {
        if (active) setLoading(false);
      }
    };

    init();

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!saleProductId && products.length > 0) {
      setSaleProductId(products[0].id);
    }
  }, [products, saleProductId]);

  useEffect(() => {
    if (!saleProductId) return;
    setSaleUnitPrice(parseMoney(prices[saleProductId] ?? ""));
  }, [saleProductId, prices]);

  const hotCount = useMemo(() => {
    return Object.values(hotToday).filter(
      (hot) => hot && hot.status !== "hoy_no_hicimos"
    ).length;
  }, [hotToday]);

  const productNameById = useMemo(() => {
    const map = new Map<string, string>();
    products.forEach((product) => map.set(product.id, product.name));
    return map;
  }, [products]);

  const todaySales = useMemo(() => {
    const today = new Date();
    return orderLogs.filter((sale) =>
      isSameDay(new Date(sale.createdAt), today)
    );
  }, [orderLogs]);

  const todayTotals = useMemo(() => {
    return todaySales.reduce(
      (acc, sale) => {
        const qty = sale.items.reduce((sum, item) => sum + item.quantity, 0);
        acc.quantity += qty;
        acc.total += sale.total;
        return acc;
      },
      { quantity: 0, total: 0 }
    );
  }, [todaySales]);

  const safeQuantity = Math.max(1, Math.floor(saleQuantity || 1));
  const safeUnitPrice = Number.isFinite(saleUnitPrice) ? saleUnitPrice : 0;
  const saleTotal = safeQuantity * safeUnitPrice;

  const top7 = useMemo(() => stats?.top7 ?? [], [stats]);
  const top30 = useMemo(() => stats?.top30 ?? [], [stats]);

  const updateStock = async (id: string, status: StockStatus) => {
    if (!adapter) return;
    setStock((prev) => ({ ...prev, [id]: status }));
    try {
      await adapter.updateStock(id, status);
      await loadStats(adapter);
    } catch (err) {
      setError("No se pudo actualizar el stock.");
      await reloadAll(adapter);
    }
  };

  const updatePrice = async (id: string, value: string) => {
    if (!adapter) return;
    setPrices((prev) => ({ ...prev, [id]: value }));
    try {
      await adapter.updatePrice(id, value);
    } catch (err) {
      setError("No se pudo actualizar el precio.");
      await reloadAll(adapter);
    }
  };

  const updatePromo = async (
    id: string,
    enabled: boolean,
    percent: number
  ) => {
    if (!adapter) return;
    setPromo((prev) => ({
      ...prev,
      [id]: { enabled, percent },
    }));
    try {
      await adapter.updatePromo(id, enabled, percent);
    } catch (err) {
      setError("No se pudo actualizar la oferta.");
      await reloadAll(adapter);
    }
  };

  const updateHot = async (id: string, next: Partial<HotState>) => {
    if (!adapter) return;
    setHotToday((prev) => ({
      ...prev,
      [id]: { ...(prev[id] ?? defaultHotState()), ...next },
    }));
    try {
      await adapter.updateHot(id, next);
    } catch (err) {
      setError("No se pudo actualizar Caliente hoy.");
      await reloadAll(adapter);
    }
  };

  const addSale = async () => {
    if (!adapter || !saleProductId) return;
    const quantity = Math.max(1, Math.floor(saleQuantity || 1));
    const unitPrice = Number.isFinite(saleUnitPrice) ? saleUnitPrice : 0;
    const total = quantity * unitPrice;

    try {
      await adapter.logOrder({
        items: [{ productId: saleProductId, quantity }],
        total,
        channel: "manual",
      });
      await reloadAll(adapter);
      setSaleQuantity(1);
    } catch (err) {
      setError("No se pudo registrar la venta.");
    }
  };

  const removeSale = async (id: string) => {
    if (!adapter) return;
    try {
      await adapter.removeOrder(id);
      await reloadAll(adapter);
    } catch (err) {
      setError("No se pudo eliminar la venta.");
    }
  };

  const stockOptions: { value: StockStatus; label: string }[] = [
    { value: "disponible", label: "Disponible" },
    { value: "ultimas", label: "Ultimas" },
    { value: "agotado", label: "Agotado" },
  ];

  const hotOptions: { value: HotStatus; label: string }[] = [
    { value: "preparando", label: "Preparando" },
    { value: "listo", label: "Listo" },
    { value: "se_acabo", label: "Se acabo" },
    { value: "hoy_no_hicimos", label: "Hoy no hicimos" },
  ];

  const promoOptions = [0, 5, 10, 15, 20];

  if (loading) {
    return (
      <main className="min-h-screen w-full px-4 pb-20 pt-10 sm:px-6 lg:px-8">
        <p className="text-sm text-slate-500">Cargando panel...</p>
      </main>
    );
  }

  if (!adapter) {
    return (
      <main className="min-h-screen w-full px-4 pb-20 pt-10 sm:px-6 lg:px-8">
        <p className="text-sm text-slate-500">
          No se pudo cargar el panel. Revisa configuracion.
        </p>
      </main>
    );
  }

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
          {error && (
            <p className="mt-3 text-xs font-semibold text-rose-600">{error}</p>
          )}
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
                    const isActive = stock[product.id] === option.value;
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
                  value={prices[product.id] ?? ""}
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
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-emerald-600">
              Ofertas
            </p>
            <h2 className="mt-2 text-lg font-semibold text-slate-900">
              Descuento controlado por producto
            </h2>
          </div>
          <div className="mt-4 grid gap-3">
            {products.map((product) => {
              const promoState = promo[product.id] ?? {
                enabled: false,
                percent: 0,
              };
              const basePrice = prices[product.id] ?? product.price;
              const promoProduct: Product = {
                ...product,
                price: basePrice,
                promoEnabled: promoState.enabled,
                promoPercent: promoState.percent,
              };
              const promoLabel = getPromoLabel(promoProduct);
              const effectivePrice = getEffectivePrice(promoProduct);
              const savings = getPromoSavings(promoProduct);

              return (
                <div
                  key={product.id}
                  className="grid gap-3 rounded-2xl border border-slate-200 px-4 py-4 sm:grid-cols-[1.3fr_1.1fr_1.1fr]"
                >
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      {product.name}
                    </p>
                    <p className="text-xs text-slate-500">
                      Base: {basePrice} · Final: {effectivePrice}
                      {savings !== null
                        ? ` · Ahorro: $${savings.toFixed(2)}`
                        : ""}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <label className="flex items-center gap-2 text-xs text-slate-600">
                      <input
                        type="checkbox"
                        checked={promoState.enabled}
                        onChange={(event) =>
                          updatePromo(
                            product.id,
                            event.target.checked,
                            event.target.checked ? promoState.percent : 0
                          )
                        }
                        className="h-4 w-4 rounded border-slate-300 text-emerald-600"
                      />
                      En oferta
                    </label>
                    <select
                      value={promoState.percent}
                      onChange={(event) =>
                        updatePromo(
                          product.id,
                          promoState.enabled,
                          Number(event.target.value)
                        )
                      }
                      disabled={!promoState.enabled}
                      className="rounded-full border border-slate-200 px-3 py-1 text-xs text-slate-700 disabled:opacity-50"
                    >
                      {promoOptions.map((percent) => (
                        <option key={percent} value={percent}>
                          {percent}%
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-emerald-700">
                    {promoLabel ? (
                      <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1">
                        {promoLabel}
                      </span>
                    ) : (
                      <span className="text-slate-400">Sin oferta</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white px-6 py-6 shadow-sm">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-emerald-600">
                Caliente hoy
              </p>
              <h2 className="mt-2 text-lg font-semibold text-slate-900">
                Estado, ventana y nota por producto
              </h2>
            </div>
          </div>
          <div className="mt-4 grid gap-3">
            {products.map((product) => {
              const hot = hotToday[product.id] ?? defaultHotState();
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
                      {hotLabels[hot.status]}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="flex items-center gap-2 text-xs text-slate-600">
                      <input
                        type="checkbox"
                        checked={hot.status !== "hoy_no_hicimos"}
                        onChange={(event) =>
                          updateHot(product.id, {
                            status: event.target.checked
                              ? "preparando"
                              : "hoy_no_hicimos",
                          })
                        }
                        className="h-4 w-4 rounded border-slate-300 text-emerald-600"
                      />
                      Hoy
                    </label>
                    <select
                      value={hot.status}
                      onChange={(event) =>
                        updateHot(product.id, {
                          status: event.target.value as HotStatus,
                        })
                      }
                      className="rounded-full border border-slate-200 px-3 py-1 text-xs text-slate-700"
                    >
                      {hotOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600">
                    <span className="rounded-full border border-slate-200 px-3 py-1">
                      Ventana
                    </span>
                    <input
                      type="time"
                      value={hot.windowStart}
                      onChange={(event) =>
                        updateHot(product.id, {
                          windowStart: event.target.value,
                        })
                      }
                      className="rounded-full border border-slate-200 px-3 py-1"
                    />
                    <span>a</span>
                    <input
                      type="time"
                      value={hot.windowEnd}
                      onChange={(event) =>
                        updateHot(product.id, { windowEnd: event.target.value })
                      }
                      className="rounded-full border border-slate-200 px-3 py-1"
                    />
                  </div>
                  <input
                    type="text"
                    value={hot.note}
                    onChange={(event) =>
                      updateHot(product.id, { note: event.target.value })
                    }
                    placeholder="Nota corta"
                    className="w-full rounded-full border border-slate-200 px-3 py-1 text-xs text-slate-600 sm:col-span-3"
                  />
                </div>
              );
            })}
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white px-6 py-6 shadow-sm">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-emerald-600">
              Ventas del dia
            </p>
            <h2 className="mt-2 text-lg font-semibold text-slate-900">
              Registrar venta manual
            </h2>
          </div>
          <div className="mt-4 grid gap-3 rounded-2xl border border-slate-200 px-4 py-4 sm:grid-cols-[1.3fr_0.6fr_0.7fr_0.7fr_auto] sm:items-end">
            <label className="flex flex-col gap-2 text-xs text-slate-600">
              Producto
              <select
                value={saleProductId}
                onChange={(event) => setSaleProductId(event.target.value)}
                className="rounded-full border border-slate-200 px-3 py-2 text-sm text-slate-700"
              >
                {products.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.name}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex flex-col gap-2 text-xs text-slate-600">
              Unidades
              <input
                type="number"
                min={1}
                value={saleQuantity}
                onChange={(event) => setSaleQuantity(Number(event.target.value))}
                className="rounded-full border border-slate-200 px-3 py-2 text-sm text-slate-700"
              />
            </label>
            <label className="flex flex-col gap-2 text-xs text-slate-600">
              Precio unitario
              <input
                type="number"
                min={0}
                step={0.01}
                value={safeUnitPrice}
                onChange={(event) =>
                  setSaleUnitPrice(Number(event.target.value))
                }
                className="rounded-full border border-slate-200 px-3 py-2 text-sm text-slate-700"
              />
            </label>
            <div className="flex flex-col gap-2 text-xs text-slate-600">
              Total
              <div className="rounded-full border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-900">
                {formatMoney(saleTotal)}
              </div>
            </div>
            <button
              type="button"
              onClick={addSale}
              className="h-11 rounded-full bg-emerald-500 px-5 text-sm font-semibold text-white transition hover:bg-emerald-400"
            >
              Registrar
            </button>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-600">
            <span className="rounded-full border border-slate-200 px-3 py-1">
              Hoy: {todayTotals.quantity} unidades
            </span>
            <span className="rounded-full border border-slate-200 px-3 py-1">
              Total: {formatMoney(todayTotals.total)}
            </span>
          </div>

          <div className="mt-4 grid gap-2">
            {todaySales.length === 0 ? (
              <p className="text-xs text-slate-500">
                Sin ventas registradas hoy.
              </p>
            ) : (
              todaySales.map((sale) => {
                const time = sale.createdAt.slice(11, 16);
                const qty = sale.items.reduce(
                  (sum, item) => sum + item.quantity,
                  0
                );
                const primary = sale.items[0];
                const name = primary
                  ? productNameById.get(primary.productId) ?? "Producto"
                  : "Producto";

                return (
                  <div
                    key={sale.id}
                    className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 px-4 py-3"
                  >
                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        {name}
                      </p>
                      <p className="text-xs text-slate-500">
                        {time} · {qty} unidades · {formatMoney(sale.total)}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeSale(sale.id)}
                      className="rounded-full border border-rose-200 px-3 py-1 text-xs font-semibold text-rose-600"
                    >
                      Eliminar
                    </button>
                  </div>
                );
              })
            )}
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white px-6 py-6 shadow-sm">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-emerald-600">
              Resumen basico
            </p>
            <h2 className="mt-2 text-lg font-semibold text-slate-900">
              Mejores 7 y 30 dias
            </h2>
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 px-4 py-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Ultimos 7 dias
              </p>
              <div className="mt-3 grid gap-2">
                {top7.length === 0 ? (
                  <p className="text-xs text-slate-500">
                    Sin datos todavia.
                  </p>
                ) : (
                  top7.map((entry, index) => (
                    <div
                      key={entry.productId}
                      className="flex items-center justify-between text-sm text-slate-700"
                    >
                      <span>
                        {index + 1}. {productNameById.get(entry.productId) ?? "Producto"}
                      </span>
                      <span className="text-xs text-slate-500">
                        {entry.quantity} u
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
            <div className="rounded-2xl border border-slate-200 px-4 py-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Ultimos 30 dias
              </p>
              <div className="mt-3 grid gap-2">
                {top30.length === 0 ? (
                  <p className="text-xs text-slate-500">
                    Sin datos todavia.
                  </p>
                ) : (
                  top30.map((entry, index) => (
                    <div
                      key={entry.productId}
                      className="flex items-center justify-between text-sm text-slate-700"
                    >
                      <span>
                        {index + 1}. {productNameById.get(entry.productId) ?? "Producto"}
                      </span>
                      <span className="text-xs text-slate-500">
                        {entry.quantity} u
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
