"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Product, ProductStatus } from "../../../lib/mo/types";
import { getMoDataAdapter } from "../../../lib/mo/data";
import {
  getMoBackendErrorInfo,
  type MoBackendErrorInfo,
} from "../../../lib/mo/data/errorInfo";
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
  const [loadError, setLoadError] = useState<MoBackendErrorInfo | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
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

  const showActionError = useCallback((message: string) => {
    setActionSuccess(null);
    setActionError(message);
  }, []);

  const showActionSuccess = useCallback((message: string) => {
    setActionError(null);
    setActionSuccess(message);
  }, []);

  useEffect(() => {
    if (!actionSuccess) return;
    const timeoutId = window.setTimeout(() => setActionSuccess(null), 2600);
    return () => window.clearTimeout(timeoutId);
  }, [actionSuccess]);

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
      showActionSuccess("Backup importado.");
    } catch {
      showActionError("No se pudo importar el backup.");
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
      setLoadError(null);
      try {
        const dataAdapter = await getMoDataAdapter();
        if (!active) return;
        setAdapter(dataAdapter);
        await reloadAll(dataAdapter);
        if (!active) return;
        setActionError(null);
        setActionSuccess(null);
      } catch (err) {
        if (!active) return;
        console.error("RYS admin load error", err);
        setLoadError(getMoBackendErrorInfo(err));
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
  const visibleCount = useMemo(
    () =>
      products.filter(
        (product) => (status[product.id] ?? product.status) !== "hidden"
      ).length,
    [products, status]
  );
  const hiddenCount = useMemo(
    () =>
      products.filter(
        (product) => (status[product.id] ?? product.status) === "hidden"
      ).length,
    [products, status]
  );
  const soldOutCount = useMemo(
    () =>
      products.filter(
        (product) => (stock[product.id] ?? product.stockStatus) === "agotado"
      ).length,
    [products, stock]
  );
  const sortedProducts = useMemo(
    () =>
      products
        .slice()
        .sort((a, b) => (a.sortOrder ?? 9999) - (b.sortOrder ?? 9999)),
    [products]
  );

  const updateStock = async (id: string, status: StockStatus) => {
    if (!adapter) return;
    setStock((prev) => ({ ...prev, [id]: status }));
    try {
      await adapter.updateStock(id, status);
      await loadStats(adapter);
      showActionSuccess("Stock actualizado.");
    } catch {
      showActionError("No se pudo actualizar el stock.");
      await reloadAll(adapter);
    }
  };

  const updatePrice = async (id: string, value: string) => {
    if (!adapter) return;
    setPrices((prev) => ({ ...prev, [id]: value }));
    try {
      await adapter.updatePrice(id, value);
      setBaselinePrices((prev) => ({ ...prev, [id]: value }));
      showActionSuccess("Precio guardado.");
    } catch {
      showActionError("No se pudo actualizar el precio.");
      await reloadAll(adapter);
    }
  };

  const updateImage = async (id: string, image: string) => {
    if (!adapter) return;
    const nextImage = image.trim();
    setProducts((prev) =>
      prev.map((product) =>
        product.id === id ? { ...product, image: nextImage } : product
      )
    );
    try {
      await adapter.updateImage(id, nextImage);
      showActionSuccess("Imagen actualizada.");
    } catch {
      showActionError("No se pudo actualizar la imagen.");
      await reloadAll(adapter);
    }
  };

  const updateSortOrder = async (id: string, sortOrder: number) => {
    if (!adapter) return;
    const safeSortOrder = Number.isFinite(sortOrder)
      ? Math.max(1, Math.round(sortOrder))
      : 9999;
    setProducts((prev) =>
      prev
        .map((product) =>
          product.id === id ? { ...product, sortOrder: safeSortOrder } : product
        )
        .sort((a, b) => (a.sortOrder ?? 9999) - (b.sortOrder ?? 9999))
    );
    try {
      await adapter.updateSortOrder(id, safeSortOrder);
      showActionSuccess("Orden actualizado.");
    } catch {
      showActionError("No se pudo actualizar el orden.");
      await reloadAll(adapter);
    }
  };

  const moveProduct = async (id: string, direction: "up" | "down") => {
    if (!adapter) return;
    const currentIndex = sortedProducts.findIndex((product) => product.id === id);
    if (currentIndex === -1) return;
    const targetIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;
    if (targetIndex < 0 || targetIndex >= sortedProducts.length) return;

    const current = sortedProducts[currentIndex];
    const target = sortedProducts[targetIndex];
    const currentOrder = current.sortOrder ?? currentIndex + 1;
    const targetOrder = target.sortOrder ?? targetIndex + 1;

    setProducts((prev) =>
      prev
        .map((product) => {
          if (product.id === current.id) return { ...product, sortOrder: targetOrder };
          if (product.id === target.id) return { ...product, sortOrder: currentOrder };
          return product;
        })
        .sort((a, b) => (a.sortOrder ?? 9999) - (b.sortOrder ?? 9999))
    );

    try {
      await adapter.updateSortOrder(current.id, targetOrder);
      await adapter.updateSortOrder(target.id, currentOrder);
      showActionSuccess("Orden actualizado.");
    } catch {
      showActionError("No se pudo mover el producto en el orden.");
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
      showActionSuccess("Oferta actualizada.");
    } catch {
      showActionError("No se pudo actualizar la oferta.");
      await reloadAll(adapter);
    }
  };

  const updateFeatured = async (id: string, isFeatured: boolean) => {
    if (!adapter) return;
    setProducts((prev) =>
      prev.map((product) =>
        product.id === id ? { ...product, isFeatured } : product
      )
    );
    try {
      await adapter.updateFeatured(id, isFeatured);
      showActionSuccess("Destacado actualizado.");
    } catch {
      showActionError("No se pudo actualizar el destacado.");
      await reloadAll(adapter);
    }
  };

  const updateStatus = async (id: string, nextStatus: ProductStatus) => {
    if (!adapter) return;
    setStatus((prev) => ({ ...prev, [id]: nextStatus }));
    try {
      await adapter.updateStatus(id, nextStatus);
      showActionSuccess("Visibilidad actualizada.");
    } catch {
      showActionError("No se pudo actualizar la visibilidad.");
      await reloadAll(adapter);
    }
  };

  const updateHot = async (id: string, state: HotState) => {
    if (!adapter) return;
    setHotToday((prev) => ({ ...prev, [id]: state }));
    try {
      await adapter.updateHot(id, state);
      await loadStats(adapter);
      showActionSuccess("Estado caliente actualizado.");
    } catch {
      showActionError("No se pudo actualizar el estado.");
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
      showActionError("Precio inválido. Debe ser un número mayor a 0.");
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
      showActionSuccess("Venta registrada.");
    } catch {
      showActionError("No se pudo registrar la venta.");
      await reloadAll(adapter);
    }
  };

  const handleManualReload = async () => {
    if (!adapter) return;
    setRefreshing(true);
    try {
      await reloadAll(adapter);
      showActionSuccess("Panel recargado.");
    } catch {
      showActionError("No se pudo recargar el panel.");
    } finally {
      setRefreshing(false);
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

  if (loadError) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
        <div className="max-w-2xl rounded-3xl border border-amber-200/20 bg-slate-900 p-6 text-slate-100 shadow-2xl">
          <p className="text-xs uppercase tracking-[0.3em] text-amber-300">
            Estado del panel
          </p>
          <h1 className="mt-3 text-2xl font-semibold">{loadError.title}</h1>
          <p className="mt-3 text-sm leading-relaxed text-slate-200">
            {loadError.message}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-slate-400">
            {loadError.help}
          </p>
          <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-300">
            {loadError.kind === "auth"
              ? "El login no quedó activo o la sesión venció."
              : "La pantalla de acceso puede funcionar, pero el panel no puede leer la hoja en este momento."}
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="rounded-full border border-rose-200/40 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-rose-100"
            >
              Reintentar
            </button>
            <a
              href="/RYSminisuper/admin/acceso"
              className="rounded-full border border-white/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/90"
            >
              Volver a acceso
            </a>
            <a
              href="/api/mo/products"
              className="rounded-full border border-white/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/90"
            >
              Ver API products
            </a>
          </div>
        </div>
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
            <p className="mt-2 text-sm text-white/60">
              Panel simple para revisar productos, stock, precios y ventas del día.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleManualReload}
              disabled={refreshing}
              className="rounded-full border border-white/10 px-4 py-2 text-xs uppercase tracking-[0.2em] text-white/70 disabled:opacity-60"
            >
              {refreshing ? "Recargando..." : "Recargar panel"}
            </button>
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

        {actionError ? (
          <div className="rounded-2xl border border-amber-300/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-100">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p>{actionError}</p>
              <button
                type="button"
                onClick={() => setActionError(null)}
                className="rounded-full border border-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white/90"
              >
                Cerrar aviso
              </button>
            </div>
          </div>
        ) : null}

        {actionSuccess ? (
          <div className="rounded-2xl border border-emerald-300/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-100">
            <p>{actionSuccess}</p>
          </div>
        ) : null}

        <section className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
            <p className="text-xs uppercase tracking-[0.25em] text-white/60">
              Productos visibles
            </p>
            <p className="mt-2 text-3xl font-semibold">{visibleCount}</p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
            <p className="text-xs uppercase tracking-[0.25em] text-white/60">
              Ocultos
            </p>
            <p className="mt-2 text-3xl font-semibold">{hiddenCount}</p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
            <p className="text-xs uppercase tracking-[0.25em] text-white/60">
              Agotados
            </p>
            <p className="mt-2 text-3xl font-semibold">{soldOutCount}</p>
          </div>
        </section>

        <section className="rounded-3xl border border-emerald-300/20 bg-emerald-400/10 p-5 text-sm text-emerald-50">
          <p className="text-xs uppercase tracking-[0.25em] text-emerald-200/80">
            Guía rápida
          </p>
          <p className="mt-2 font-semibold">
            Lo que cambias aquí se guarda al mover el selector o salir del campo.
          </p>
          <p className="mt-2 text-emerald-100/85">
            Para comprobarlo, recarga la tienda en otro celular o en otra pestaña.
            Si solo quieres esconder un producto, usa &quot;Oculto&quot; y no lo borres.
          </p>
        </section>

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
          <p className="text-sm text-white/60">
            Úsalo solo si la venta se hizo fuera del flujo normal y quieres reflejarla en el resumen del día.
          </p>
          <div className="grid gap-4 lg:grid-cols-[2fr,1fr,1fr,1fr]">
            <label className="grid gap-2 text-xs uppercase tracking-[0.2em] text-white/60">
              Producto
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
            </label>
            <label className="grid gap-2 text-xs uppercase tracking-[0.2em] text-white/60">
              Cantidad
              <input
                type="number"
                min={1}
                value={saleQuantity}
                onChange={(event) => setSaleQuantity(Number(event.target.value))}
                className="rounded-2xl border border-white/10 bg-black/70 px-4 py-3 text-sm text-white"
              />
            </label>
            <label className="grid gap-2 text-xs uppercase tracking-[0.2em] text-white/60">
              Precio unitario
              <input
                type="number"
                min={0}
                step={0.5}
                value={saleUnitPrice}
                onChange={(event) => setSaleUnitPrice(Number(event.target.value))}
                className="rounded-2xl border border-white/10 bg-black/70 px-4 py-3 text-sm text-white"
              />
            </label>
            <button
              type="button"
              onClick={registerSale}
              className="self-end rounded-2xl border border-emerald-200/40 bg-emerald-400/20 px-4 py-3 text-sm uppercase tracking-[0.2em] text-emerald-100"
            >
              Guardar
            </button>
          </div>
          <p className="text-xs text-white/45">
            Total estimado de esta venta: {formatMoney(saleTotal)}
          </p>
        </section>

        <section className="grid gap-6 rounded-3xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-sm font-semibold uppercase tracking-[0.25em] text-white/80">
            Control de pasillos
          </h2>
          <div className="grid gap-4 lg:grid-cols-2">
              {sortedProducts.map((product) => {
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
                      Estado (visible/oculto)
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
                        <option value="available">Visible</option>
                        <option value="soon">Pronto</option>
                        <option value="out_of_stock">Agotado hoy</option>
                        <option value="hidden">Oculto</option>
                      </select>
                      <span className="text-[11px] normal-case tracking-normal text-white/50">
                        Usa &quot;Oculto&quot; para quitarlo de la tienda sin borrarlo.
                      </span>
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
                        <option value="ultimas">Ultimas</option>
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
                      Orden catálogo
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          min={1}
                          value={product.sortOrder ?? 9999}
                          onChange={(event) => {
                            const nextValue = Number(event.target.value);
                            setProducts((prev) =>
                              prev.map((current) =>
                                current.id === product.id
                                  ? {
                                      ...current,
                                      sortOrder: Number.isFinite(nextValue)
                                        ? nextValue
                                        : 9999,
                                    }
                                  : current
                              )
                            );
                          }}
                          onBlur={(event) =>
                            updateSortOrder(product.id, Number(event.target.value))
                          }
                          className="w-full rounded-xl border border-white/10 bg-black/70 px-3 py-2 text-sm text-white"
                        />
                        <button
                          type="button"
                          onClick={() => moveProduct(product.id, "up")}
                          className="rounded-xl border border-white/10 bg-black/70 px-3 py-2 text-sm text-white"
                          aria-label={`Subir ${product.name}`}
                          title="Subir"
                        >
                          ↑
                        </button>
                        <button
                          type="button"
                          onClick={() => moveProduct(product.id, "down")}
                          className="rounded-xl border border-white/10 bg-black/70 px-3 py-2 text-sm text-white"
                          aria-label={`Bajar ${product.name}`}
                          title="Bajar"
                        >
                          ↓
                        </button>
                      </div>
                      <span className="text-[11px] normal-case tracking-normal text-white/50">
                        También puedes escribir el número exacto.
                      </span>
                    </label>

                    <label className="grid gap-2 text-xs uppercase tracking-[0.2em] text-white/60 md:col-span-2">
                      Imagen URL
                      <input
                        type="text"
                        value={product.image ?? ""}
                        onChange={(event) =>
                          setProducts((prev) =>
                            prev.map((current) =>
                              current.id === product.id
                                ? { ...current, image: event.target.value }
                                : current
                            )
                          )
                        }
                        onBlur={(event) =>
                          updateImage(product.id, event.target.value)
                        }
                        className="rounded-xl border border-white/10 bg-black/70 px-3 py-2 text-sm text-white"
                        placeholder="/RYSminisuper/images/... o https://..."
                      />
                      <span className="text-[11px] normal-case tracking-normal text-white/50">
                        Pega una ruta local del proyecto o una URL pública.
                      </span>
                    </label>

                    <label className="grid gap-2 text-xs uppercase tracking-[0.2em] text-white/60">
                      Destacado
                      <select
                        value={product.isFeatured ? "si" : "no"}
                        onChange={(event) =>
                          updateFeatured(
                            product.id,
                            event.target.value === "si"
                          )
                        }
                        className="rounded-xl border border-white/10 bg-black/70 px-3 py-2 text-sm text-white"
                      >
                        <option value="no">No</option>
                        <option value="si">Si</option>
                      </select>
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
