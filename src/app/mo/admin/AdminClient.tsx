"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Product, ProductStatus } from "../../../lib/mo/types";
import { getMoDataAdapter } from "../../../lib/mo/data";
import {
  getEffectivePriceValue,
  getPromoLabel,
  getPromoSavings,
} from "../../../lib/mo/pricing";
import type {
  HotState,
  HotStatus,
  MoDataAdapter,
  MoStats,
  OrderLogInput,
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

export default function AdminClient() {
  const [adapter, setAdapter] = useState<MoDataAdapter | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [stock, setStock] = useState<Record<string, StockStatus>>({});
  const [prices, setPrices] = useState<Record<string, string>>({});
  const [baselinePrices, setBaselinePrices] = useState<Record<string, string>>(
    {}
  );
  const [promo, setPromo] = useState<Record<string, PromoState>>({});
  const [status, setStatus] = useState<Record<string, ProductStatus>>({});
  const [hotToday, setHotToday] = useState<Record<string, HotState>>({});
  const [orderLogs, setOrderLogs] = useState<OrderLogEntry[]>([]);
  const [stats, setStats] = useState<MoStats | null>(null);

  const [saleProductId, setSaleProductId] = useState("");
  const [saleQuantity, setSaleQuantity] = useState(1);
  const [saleUnitPrice, setSaleUnitPrice] = useState(0);
  const importInputRef = useRef<HTMLInputElement>(null);
  const handleExport = () => {
    const payload = {
      products,
      stock,
      prices,
      promo,
      status,
      hotToday,
      orderLogs,
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `rys-admin-backup-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleImportClick = () => {
    importInputRef.current?.click();
  };

  const handleImportFile = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file || !adapter) return;
    try {
      const raw = await file.text();
      const parsed = JSON.parse(raw);
      const ok = window.confirm(
        "¿Seguro? Esto reemplaza el estado actual del catalogo."
      );
      if (!ok) return;
      await adapter.importBackup(parsed);
      await reloadAll(adapter);
    } catch (err) {
      setError("No se pudo importar el backup.");
    } finally {
      event.target.value = "";
    }
  };

  const loadSnapshot = useCallback(async (activeAdapter: MoDataAdapter) => {
    const snapshot = await activeAdapter.getAdminSnapshot();
    setProducts(snapshot.products);
    setStock(snapshot.stock);
    setPrices(snapshot.prices);
    setBaselinePrices(snapshot.prices);
    setPromo(snapshot.promo);
    setStatus(snapshot.status);
    setHotToday(snapshot.hotToday);
    setOrderLogs(snapshot.orderLogs);
  }, []);

  const loadStats = useCallback(async (activeAdapter: MoDataAdapter) => {
    const nextStats = await activeAdapter.getStats();
    setStats(nextStats);
  }, []);

  const reloadAll = useCallback(
    async (activeAdapter?: MoDataAdapter) => {
      const current = activeAdapter ?? adapter;
      if (!current) return;
      await Promise.all([loadSnapshot(current), loadStats(current)]);
    },
    [adapter, loadSnapshot, loadStats]
  );

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
  }, [reloadAll]);

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
      setBaselinePrices((prev) => ({ ...prev, [id]: value }));
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

  const updateStatus = async (id: string, nextStatus: ProductStatus) => {
    if (!adapter) return;
    setStatus((prev) => ({ ...prev, [id]: nextStatus }));
    try {
      await adapter.updateStatus(id, nextStatus);
    } catch (err) {
      setError("No se pudo actualizar la visibilidad.");
      await reloadAll(adapter);
    }
  };

  const updateHot = async (id: string, state: HotState) => {
    if (!adapter) return;
    setHotToday((prev) => ({ ...prev, [id]: state }));
    try {
      await adapter.updateHot(id, state);
      await loadStats(adapter);
    } catch (err) {
      setError("No se pudo actualizar el estado.");
      await reloadAll(adapter);
    }
  };

  const updateHotStatus = async (id: string, status: HotStatus) => {
    const current = hotToday[id] ?? defaultHotState();
    await updateHot(id, {
      ...current,
      status,
      updatedAt: new Date().toISOString(),
    });
  };

  const handlePriceBlur = async (
    id: string,
    value: string,
    fallback: string
  ) => {
    const parsed = parseMoney(value);
    if (!parsed || parsed <= 0) {
      setError("Precio invalido. Debe ser un numero mayor a 0.");
      setPrices((prev) => ({ ...prev, [id]: fallback }));
      return;
    }
    const baseline = parseMoney(fallback) ?? parsed;
    if (baseline > 0 && parsed < baseline * 0.5) {
      const ok = window.confirm(
        "¿Seguro? Parece un precio muy bajo versus el anterior."
      );
      if (!ok) {
        setPrices((prev) => ({ ...prev, [id]: fallback }));
        return;
      }
    }
    await updatePrice(id, value);
  };

  const updateHotWindow = async (
    id: string,
    windowStart: string,
    windowEnd: string
  ) => {
    const current = hotToday[id] ?? defaultHotState();
    await updateHot(id, {
      ...current,
      windowStart,
      windowEnd,
      updatedAt: new Date().toISOString(),
    });
  };

  const updateHotNote = async (id: string, note: string) => {
    const current = hotToday[id] ?? defaultHotState();
    await updateHot(id, {
      ...current,
      note,
      updatedAt: new Date().toISOString(),
    });
  };

  const registerSale = async () => {
    if (!adapter) return;
    if (!saleProductId) return;

    const product = products.find((item) => item.id === saleProductId);
    if (!product) return;

    const saleEntry: OrderLogInput = {
      items: [
        {
          productId: saleProductId,
          quantity: safeQuantity,
        },
      ],
      total: saleTotal,
      channel: "manual",
      note: product.name,
    };

    try {
      await adapter.logOrder(saleEntry);
      await reloadAll(adapter);
    } catch (err) {
      setError("No se pudo registrar la venta.");
      await reloadAll(adapter);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black">
        <p className="text-sm uppercase tracking-[0.4em] text-white/70">
          Cargando panel...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black">
        <p className="text-sm uppercase tracking-[0.4em] text-rose-300">
          {error}
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black px-4 pb-12 pt-10 text-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.45em] text-emerald-200/80">
              RYS minisuper admin
            </p>
            <h1 className="text-3xl font-semibold">Resumen diario</h1>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleExport}
              className="rounded-full border border-white/10 px-4 py-2 text-xs uppercase tracking-[0.2em] text-white/70"
            >
              Exportar backup
            </button>
            <button
              type="button"
              onClick={handleImportClick}
              className="rounded-full border border-white/10 px-4 py-2 text-xs uppercase tracking-[0.2em] text-white/70"
            >
              Importar backup
            </button>
            <input
              ref={importInputRef}
              type="file"
              accept="application/json"
              className="hidden"
              onChange={handleImportFile}
            />
            <div className="rounded-full border border-emerald-300/40 bg-emerald-400/10 px-4 py-2 text-xs uppercase tracking-[0.3em] text-emerald-200">
              {hotCount} calientes activos
            </div>
          </div>
        </header>

        <section className="grid gap-4 rounded-3xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-sm font-semibold uppercase tracking-[0.25em] text-white/80">
            Ventas de hoy
          </h2>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
              <p className="text-xs uppercase tracking-[0.3em] text-white/60">
                Total
              </p>
              <p className="mt-2 text-3xl font-semibold">
                {formatMoney(todayTotals.total)}
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
              <p className="text-xs uppercase tracking-[0.3em] text-white/60">
                Productos vendidos
              </p>
              <p className="mt-2 text-3xl font-semibold">
                {todayTotals.quantity}
              </p>
            </div>
          </div>
        </section>

        <section className="grid gap-4 rounded-3xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-sm font-semibold uppercase tracking-[0.25em] text-white/80">
            Registrar venta manual
          </h2>
          <div className="grid gap-4 lg:grid-cols-[2fr,1fr,1fr,1fr]">
            <select
              value={saleProductId}
              onChange={(event) => setSaleProductId(event.target.value)}
              className="rounded-2xl border border-white/10 bg-black/70 px-4 py-3 text-sm text-white"
            >
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
            </select>
            <input
              type="number"
              min={1}
              value={saleQuantity}
              onChange={(event) => setSaleQuantity(Number(event.target.value))}
              className="rounded-2xl border border-white/10 bg-black/70 px-4 py-3 text-sm text-white"
            />
            <input
              type="number"
              min={0}
              step={0.5}
              value={saleUnitPrice}
              onChange={(event) => setSaleUnitPrice(Number(event.target.value))}
              className="rounded-2xl border border-white/10 bg-black/70 px-4 py-3 text-sm text-white"
            />
            <button
              type="button"
              onClick={registerSale}
              className="rounded-2xl border border-emerald-200/40 bg-emerald-400/20 px-4 py-3 text-sm uppercase tracking-[0.2em] text-emerald-100"
            >
              Guardar
            </button>
          </div>
        </section>

        <section className="grid gap-6 rounded-3xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-sm font-semibold uppercase tracking-[0.25em] text-white/80">
            Control de pasillos
          </h2>
          <div className="grid gap-4 lg:grid-cols-2">
              {products.map((product) => {
                const stockStatus = stock[product.id] ?? "disponible";
                const promoState = promo[product.id] ?? {
                  enabled: false,
                  percent: 0,
                };
                const visibility = status[product.id] ?? product.status ?? "available";
                const baselinePrice = baselinePrices[product.id] ?? product.price;
                const hotState = hotToday[product.id] ?? defaultHotState();
                const price = parseMoney(prices[product.id] ?? "");
              const pricingProduct = {
                ...product,
                price: prices[product.id] ?? product.price,
                promoEnabled: promoState.enabled,
                promoPercent: promoState.percent,
              };
              const effectivePriceValue =
                getEffectivePriceValue(pricingProduct) ?? price;
              const promoLabel = getPromoLabel(pricingProduct);
              const promoSavings = getPromoSavings(pricingProduct);

              return (
                <div
                  key={product.id}
                  className="rounded-2xl border border-white/10 bg-black/40 p-4"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="text-xs uppercase tracking-[0.3em] text-white/60">
                        {product.category}
                      </p>
                      <h3 className="mt-2 text-lg font-semibold">
                        {product.name}
                      </h3>
                    </div>
                    <div className="text-right">
                      <p className="text-xs uppercase tracking-[0.3em] text-white/60">
                        Precio final
                      </p>
                      <p className="mt-2 text-lg font-semibold">
                        {formatMoney(effectivePriceValue)}
                      </p>
                      {promoLabel && (
                        <p className="text-xs text-emerald-200">{promoLabel}</p>
                      )}
                      {promoSavings !== null && promoSavings > 0 && (
                        <p className="text-xs text-emerald-200">
                          Ahorro {formatMoney(promoSavings)}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mt-4 grid gap-3 md:grid-cols-2">
                    <label className="grid gap-2 text-xs uppercase tracking-[0.2em] text-white/60">
                      Visibilidad
                      <select
                        value={visibility}
                        onChange={(event) =>
                          (async () => {
                            const nextStatus = event.target.value as ProductStatus;
                            if (nextStatus === "hidden") {
                              const ok = window.confirm(
                                "¿Seguro? Este producto quedará oculto."
                              );
                              if (!ok) return;
                            }
                            await updateStatus(product.id, nextStatus);
                          })()
                        }
                        className="rounded-xl border border-white/10 bg-black/70 px-3 py-2 text-sm text-white"
                      >
                        <option value="available">Disponible</option>
                        <option value="soon">Pronto</option>
                        <option value="out_of_stock">Agotado hoy</option>
                        <option value="hidden">Oculto</option>
                      </select>
                    </label>

                    <label className="grid gap-2 text-xs uppercase tracking-[0.2em] text-white/60">
                      Stock
                      <select
                        value={stockStatus}
                        onChange={(event) =>
                          updateStock(
                            product.id,
                            event.target.value as StockStatus
                          )
                        }
                        className="rounded-xl border border-white/10 bg-black/70 px-3 py-2 text-sm text-white"
                      >
                        <option value="disponible">Disponible</option>
                        <option value="limitado">Limitado</option>
                        <option value="agotado">Agotado</option>
                      </select>
                    </label>

                    <label className="grid gap-2 text-xs uppercase tracking-[0.2em] text-white/60">
                      Precio unitario
                      <input
                        type="text"
                        value={prices[product.id] ?? ""}
                        onChange={(event) =>
                          setPrices((prev) => ({
                            ...prev,
                            [product.id]: event.target.value,
                          }))
                        }
                        onBlur={(event) =>
                          handlePriceBlur(
                            product.id,
                            event.target.value,
                            baselinePrice
                          )
                        }
                        className="rounded-xl border border-white/10 bg-black/70 px-3 py-2 text-sm text-white"
                      />
                    </label>

                    <label className="grid gap-2 text-xs uppercase tracking-[0.2em] text-white/60">
                      Oferta
                      <select
                        value={promoState.enabled ? "activa" : "inactiva"}
                        onChange={(event) =>
                          updatePromo(
                            product.id,
                            event.target.value === "activa",
                            promoState.percent
                          )
                        }
                        className="rounded-xl border border-white/10 bg-black/70 px-3 py-2 text-sm text-white"
                      >
                        <option value="inactiva">Inactiva</option>
                        <option value="activa">Activa</option>
                      </select>
                    </label>

                    <label className="grid gap-2 text-xs uppercase tracking-[0.2em] text-white/60">
                      Descuento
                      <input
                        type="number"
                        min={0}
                        max={90}
                        value={promoState.percent}
                        onChange={(event) =>
                          updatePromo(
                            product.id,
                            promoState.enabled,
                            Number(event.target.value)
                          )
                        }
                        className="rounded-xl border border-white/10 bg-black/70 px-3 py-2 text-sm text-white"
                      />
                    </label>
                  </div>

                  <div className="mt-4 grid gap-3 md:grid-cols-2">
                    <label className="grid gap-2 text-xs uppercase tracking-[0.2em] text-white/60">
                      Estado calientes
                      <select
                        value={hotState.status}
                        onChange={(event) =>
                          updateHotStatus(
                            product.id,
                            event.target.value as HotStatus
                          )
                        }
                        className="rounded-xl border border-white/10 bg-black/70 px-3 py-2 text-sm text-white"
                      >
                        {Object.entries(hotLabels).map(([value, label]) => (
                          <option key={value} value={value}>
                            {label}
                          </option>
                        ))}
                      </select>
                    </label>

                    <label className="grid gap-2 text-xs uppercase tracking-[0.2em] text-white/60">
                      Horario
                      <div className="flex gap-2">
                        <input
                          type="time"
                          value={hotState.windowStart}
                          onChange={(event) =>
                            updateHotWindow(
                              product.id,
                              event.target.value,
                              hotState.windowEnd
                            )
                          }
                          className="w-full rounded-xl border border-white/10 bg-black/70 px-3 py-2 text-sm text-white"
                        />
                        <input
                          type="time"
                          value={hotState.windowEnd}
                          onChange={(event) =>
                            updateHotWindow(
                              product.id,
                              hotState.windowStart,
                              event.target.value
                            )
                          }
                          className="w-full rounded-xl border border-white/10 bg-black/70 px-3 py-2 text-sm text-white"
                        />
                      </div>
                    </label>

                    <label className="grid gap-2 text-xs uppercase tracking-[0.2em] text-white/60">
                      Nota del dia
                      <input
                        type="text"
                        value={hotState.note}
                        onChange={(event) =>
                          updateHotNote(product.id, event.target.value)
                        }
                        className="rounded-xl border border-white/10 bg-black/70 px-3 py-2 text-sm text-white"
                      />
                    </label>

                    <div className="grid gap-2 text-xs uppercase tracking-[0.2em] text-white/60">
                      Ultima actualizacion
                      <div className="rounded-xl border border-white/10 bg-black/70 px-3 py-2 text-sm text-white/70">
                        {hotState.updatedAt
                          ? new Date(hotState.updatedAt).toLocaleTimeString()
                          : "-"}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="grid gap-4 rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-sm font-semibold uppercase tracking-[0.25em] text-white/80">
              Top 7 (hoy)
            </h2>
            <button
              type="button"
              onClick={() => reloadAll()}
              className="rounded-full border border-white/10 px-4 py-2 text-xs uppercase tracking-[0.2em] text-white/70"
            >
              Recargar
            </button>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {top7.map((entry) => (
              <div
                key={entry.productId}
                className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/40 px-4 py-3"
              >
                <div>
                  <p className="text-sm font-semibold text-white">
                    {productNameById.get(entry.productId) ?? entry.productId}
                  </p>
                  <p className="text-xs text-white/60">Unidades</p>
                </div>
                <p className="text-sm font-semibold text-white">
                  {entry.quantity} uds
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-4 rounded-3xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-sm font-semibold uppercase tracking-[0.25em] text-white/80">
            Top 30 (30 dias)
          </h2>
          <div className="grid gap-3 md:grid-cols-2">
            {top30.map((entry) => (
              <div
                key={entry.productId}
                className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/40 px-4 py-3"
              >
                <div>
                  <p className="text-sm font-semibold text-white">
                    {productNameById.get(entry.productId) ?? entry.productId}
                  </p>
                  <p className="text-xs text-white/60">Unidades</p>
                </div>
                <p className="text-sm font-semibold text-white">
                  {entry.quantity} uds
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
