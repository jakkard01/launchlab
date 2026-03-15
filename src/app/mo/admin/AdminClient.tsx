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
import { matchesProductQuery } from "../../../lib/mo/search";
import type {
  HotState,
  HotStatus,
  MarketingEventEntry,
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

type ActionNoticeTone = "error" | "success";

type ActionNotice = {
  tone: ActionNoticeTone;
  title: string;
  message: string;
};

export default function AdminClient() {
  type VisibilityFilter =
    | "all"
    | "visible"
    | "hidden"
    | "sold_out"
    | "featured"
    | "promo"
    | "hot";

  const [adapter, setAdapter] = useState<MoDataAdapter | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<MoBackendErrorInfo | null>(null);
  const [actionNotice, setActionNotice] = useState<ActionNotice | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [pendingActionLabel, setPendingActionLabel] = useState<string | null>(null);
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
  const [marketingEvents, setMarketingEvents] = useState<MarketingEventEntry[]>([]);
  const [stats, setStats] = useState<MoStats | null>(null);

  const [saleProductId, setSaleProductId] = useState("");
  const [saleQuantity, setSaleQuantity] = useState(1);
  const [saleUnitPrice, setSaleUnitPrice] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [visibilityFilter, setVisibilityFilter] = useState<VisibilityFilter>("all");
  const importInputRef = useRef<HTMLInputElement>(null);

  const showActionError = useCallback((title: string, message: string) => {
    setActionNotice({ tone: "error", title, message });
  }, []);

  const showActionSuccess = useCallback((title: string, message: string) => {
    setActionNotice({ tone: "success", title, message });
  }, []);

  useEffect(() => {
    if (!actionNotice || actionNotice.tone !== "success") return;
    const timeoutId = window.setTimeout(() => setActionNotice(null), 2600);
    return () => window.clearTimeout(timeoutId);
  }, [actionNotice]);

  const handleExport = () => {
    const payload = {
      products,
      stock,
      prices,
      promo,
      status,
      hotToday,
      orderLogs,
      marketingEvents,
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
      setPendingActionLabel("Importando backup...");
      await adapter.importBackup(parsed);
      await reloadAll(adapter);
      showActionSuccess("Backup importado", "El panel ya recargó el estado actual.");
    } catch {
      showActionError(
        "No se pudo importar el backup",
        "Revisa que el archivo sea un JSON válido exportado desde este panel."
      );
    } finally {
      setPendingActionLabel(null);
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
    setMarketingEvents(snapshot.marketingEvents);
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
        setActionNotice(null);
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
  const topProductClicks = useMemo(() => stats?.topProductClicks ?? [], [stats]);
  const zeroResultSearches = useMemo(() => stats?.zeroResultSearches ?? [], [stats]);
  const comboUsage = useMemo(() => stats?.comboUsage ?? [], [stats]);
  const promoUsage = useMemo(() => stats?.promoUsage ?? [], [stats]);
  const whatsappClicks = useMemo(() => stats?.whatsappClicks ?? [], [stats]);
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

  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim();
    return sortedProducts.filter((product) => {
      const currentStatus = status[product.id] ?? product.status ?? "available";
      const currentStock = stock[product.id] ?? product.stockStatus ?? "disponible";
      const currentPromo = promo[product.id] ?? {
        enabled: product.promoEnabled ?? false,
        percent: product.promoPercent ?? 0,
      };
      const currentHot = hotToday[product.id] ?? defaultHotState();
      const matchesVisibility =
        visibilityFilter === "all" ||
        (visibilityFilter === "visible" && currentStatus !== "hidden") ||
        (visibilityFilter === "hidden" && currentStatus === "hidden") ||
        (visibilityFilter === "sold_out" &&
          (currentStatus === "out_of_stock" || currentStock === "agotado")) ||
        (visibilityFilter === "featured" && product.isFeatured) ||
        (visibilityFilter === "promo" && currentPromo.enabled && currentPromo.percent > 0) ||
        (visibilityFilter === "hot" && currentHot.status !== "hoy_no_hicimos");
      if (!matchesVisibility) return false;
      if (!query) return true;
      return matchesProductQuery(
        {
          ...product,
          price: prices[product.id] ?? product.price,
        },
        query
      );
    });
  }, [hotToday, prices, promo, searchQuery, sortedProducts, status, stock, visibilityFilter]);

  const runQuickAction = async (
    actionLabel: string,
    runner: (activeAdapter: MoDataAdapter) => Promise<void>
  ) => {
    if (!adapter) return;
    setPendingActionLabel(actionLabel);
    try {
      await runner(adapter);
      await reloadAll(adapter);
    } catch {
      showActionError(
        "No se pudo completar la acción rápida",
        "El panel recargó el estado actual para evitar confusión."
      );
      await reloadAll(adapter);
    } finally {
      setPendingActionLabel(null);
    }
  };

  const updateStock = async (id: string, status: StockStatus) => {
    if (!adapter) return;
    setPendingActionLabel("Guardando stock...");
    setStock((prev) => ({ ...prev, [id]: status }));
    try {
      await adapter.updateStock(id, status);
      await loadStats(adapter);
      showActionSuccess("Stock actualizado", "El estado de stock ya quedó guardado.");
    } catch {
      showActionError(
        "No se pudo actualizar el stock",
        "La selección volvió a su estado anterior después del error."
      );
      await reloadAll(adapter);
    } finally {
      setPendingActionLabel(null);
    }
  };

  const updatePrice = async (id: string, value: string) => {
    if (!adapter) return;
    setPendingActionLabel("Guardando precio...");
    setPrices((prev) => ({ ...prev, [id]: value }));
    try {
      await adapter.updatePrice(id, value);
      setBaselinePrices((prev) => ({ ...prev, [id]: value }));
      showActionSuccess("Precio guardado", "El precio quedó actualizado en el panel.");
    } catch {
      showActionError(
        "No se pudo actualizar el precio",
        "El panel recargó el valor anterior para evitar dudas."
      );
      await reloadAll(adapter);
    } finally {
      setPendingActionLabel(null);
    }
  };

  const updateImage = async (id: string, image: string) => {
    if (!adapter) return;
    const nextImage = image.trim();
    setPendingActionLabel("Guardando imagen...");
    setProducts((prev) =>
      prev.map((product) =>
        product.id === id ? { ...product, image: nextImage } : product
      )
    );
    try {
      await adapter.updateImage(id, nextImage);
      showActionSuccess("Imagen actualizada", "La nueva ruta quedó guardada.");
    } catch {
      showActionError(
        "No se pudo actualizar la imagen",
        "Comprueba que la ruta local o la URL pública sea válida."
      );
      await reloadAll(adapter);
    } finally {
      setPendingActionLabel(null);
    }
  };

  const updateSortOrder = async (id: string, sortOrder: number) => {
    if (!adapter) return;
    const safeSortOrder = Number.isFinite(sortOrder)
      ? Math.max(1, Math.round(sortOrder))
      : 9999;
    setPendingActionLabel("Guardando orden...");
    setProducts((prev) =>
      prev
        .map((product) =>
          product.id === id ? { ...product, sortOrder: safeSortOrder } : product
        )
        .sort((a, b) => (a.sortOrder ?? 9999) - (b.sortOrder ?? 9999))
    );
    try {
      await adapter.updateSortOrder(id, safeSortOrder);
      showActionSuccess("Orden actualizado", "La posición del catálogo ya quedó guardada.");
    } catch {
      showActionError(
        "No se pudo actualizar el orden",
        "El panel recargó el orden anterior para evitar confusión."
      );
      await reloadAll(adapter);
    } finally {
      setPendingActionLabel(null);
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
    setPendingActionLabel("Moviendo producto...");

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
      showActionSuccess("Orden actualizado", "El producto cambió de posición.");
    } catch {
      showActionError(
        "No se pudo mover el producto",
        "El panel volvió a cargar el orden guardado para evitar desajustes."
      );
      await reloadAll(adapter);
    } finally {
      setPendingActionLabel(null);
    }
  };

  const updatePromo = async (
    id: string,
    enabled: boolean,
    percent: number
  ) => {
    if (!adapter) return;
    setPendingActionLabel("Guardando oferta...");
    setPromo((prev) => ({
      ...prev,
      [id]: { enabled, percent },
    }));
    try {
      await adapter.updatePromo(id, enabled, percent);
      showActionSuccess("Oferta actualizada", "La promo quedó guardada.");
    } catch {
      showActionError(
        "No se pudo actualizar la oferta",
        "Revisa el porcentaje e intenta de nuevo."
      );
      await reloadAll(adapter);
    } finally {
      setPendingActionLabel(null);
    }
  };

  const updateFeatured = async (id: string, isFeatured: boolean) => {
    if (!adapter) return;
    setPendingActionLabel("Guardando destacado...");
    setProducts((prev) =>
      prev.map((product) =>
        product.id === id ? { ...product, isFeatured } : product
      )
    );
    try {
      await adapter.updateFeatured(id, isFeatured);
      showActionSuccess("Destacado actualizado", "La selección destacada quedó guardada.");
    } catch {
      showActionError(
        "No se pudo actualizar el destacado",
        "El panel restauró el estado anterior después del error."
      );
      await reloadAll(adapter);
    } finally {
      setPendingActionLabel(null);
    }
  };

  const updateStatus = async (id: string, nextStatus: ProductStatus) => {
    if (!adapter) return;
    setPendingActionLabel("Guardando visibilidad...");
    setStatus((prev) => ({ ...prev, [id]: nextStatus }));
    try {
      await adapter.updateStatus(id, nextStatus);
      showActionSuccess("Visibilidad actualizada", "El producto ya quedó visible u oculto.");
    } catch {
      showActionError(
        "No se pudo actualizar la visibilidad",
        "El panel volvió a cargar el estado anterior."
      );
      await reloadAll(adapter);
    } finally {
      setPendingActionLabel(null);
    }
  };

  const updateHot = async (id: string, state: HotState) => {
    if (!adapter) return;
    setPendingActionLabel("Guardando caliente del día...");
    setHotToday((prev) => ({ ...prev, [id]: state }));
    try {
      await adapter.updateHot(id, state);
      await loadStats(adapter);
      showActionSuccess(
        "Caliente del día actualizado",
        "El estado y horario del producto ya quedaron guardados."
      );
    } catch {
      showActionError(
        "No se pudo actualizar el caliente del día",
        "El panel recargó el estado anterior después del error."
      );
      await reloadAll(adapter);
    } finally {
      setPendingActionLabel(null);
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
      showActionError(
        "Precio inválido",
        "Debe ser un número mayor a 0. Se restauró el valor anterior."
      );
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
    if (!saleProductId) {
      showActionError(
        "Falta elegir producto",
        "Selecciona un producto antes de registrar la venta manual."
      );
      return;
    }

    const product = products.find((item) => item.id === saleProductId);
    if (!product) {
      showActionError(
        "Producto no encontrado",
        "Vuelve a elegir el producto e intenta de nuevo."
      );
      return;
    }
    if (!Number.isFinite(safeQuantity) || safeQuantity <= 0) {
      showActionError("Cantidad inválida", "La cantidad debe ser mayor a 0.");
      return;
    }
    if (!Number.isFinite(saleTotal) || saleTotal <= 0) {
      showActionError(
        "Precio inválido",
        "El precio unitario debe ser mayor a 0 para registrar la venta."
      );
      return;
    }

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
      setPendingActionLabel("Registrando venta manual...");
      await adapter.logOrder(saleEntry);
      await reloadAll(adapter);
      showActionSuccess(
        "Venta registrada",
        `${product.name} x${safeQuantity} quedó sumado al resumen del día.`
      );
    } catch {
      showActionError(
        "No se pudo registrar la venta",
        "Intenta de nuevo y comprueba que la sesión siga activa."
      );
      await reloadAll(adapter);
    } finally {
      setPendingActionLabel(null);
    }
  };

  const handleManualReload = async () => {
    if (!adapter) return;
    setRefreshing(true);
    try {
      await reloadAll(adapter);
      showActionSuccess("Panel recargado", "Se volvió a leer el estado actual de la hoja.");
    } catch {
      showActionError(
        "No se pudo recargar el panel",
        "Puede ser sesión vencida o un problema temporal de lectura."
      );
    } finally {
      setRefreshing(false);
    }
  };

  const markReadyToday = async (id: string) => {
    await runQuickAction("Marcando producto listo para hoy...", async (activeAdapter) => {
      await activeAdapter.updateStatus(id, "available");
      await activeAdapter.updateStock(id, "disponible");
      await activeAdapter.updateHot(id, {
        status: "listo",
        updatedAt: new Date().toISOString(),
      });
      showActionSuccess(
        "Producto listo para hoy",
        "Quedó visible, disponible y marcado en Caliente hoy."
      );
    });
  };

  const markSoldOutNow = async (id: string) => {
    await runQuickAction("Marcando agotado...", async (activeAdapter) => {
      await activeAdapter.updateStatus(id, "out_of_stock");
      await activeAdapter.updateStock(id, "agotado");
      await activeAdapter.updateHot(id, {
        status: "se_acabo",
        updatedAt: new Date().toISOString(),
      });
      showActionSuccess(
        "Producto marcado como agotado",
        "Ya quedó reflejado como agotado para evitar pedidos equivocados."
      );
    });
  };

  const toggleQuickFeatured = async (id: string, nextValue: boolean) => {
    await runQuickAction("Guardando destacado...", async (activeAdapter) => {
      await activeAdapter.updateFeatured(id, nextValue);
      showActionSuccess(
        "Destacado actualizado",
        nextValue ? "El producto quedó como destacado." : "El producto salió de destacados."
      );
    });
  };

  const toggleQuickPromo = async (
    id: string,
    enabled: boolean,
    percent: number
  ) => {
    const nextEnabled = !enabled;
    const nextPercent = nextEnabled ? percent || 10 : percent;
    await runQuickAction("Guardando promo rápida...", async (activeAdapter) => {
      await activeAdapter.updatePromo(id, nextEnabled, nextPercent);
      showActionSuccess(
        "Promo actualizada",
        nextEnabled
          ? `La promo quedó activa con ${nextPercent}% de descuento.`
          : "La promo quedó desactivada."
      );
    });
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

        {pendingActionLabel ? (
          <div className="rounded-2xl border border-sky-300/30 bg-sky-500/10 px-4 py-3 text-sm text-sky-100">
            <p>{pendingActionLabel}</p>
          </div>
        ) : null}

        {actionNotice?.tone === "error" ? (
          <div className="rounded-2xl border border-amber-300/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-100">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="font-semibold">{actionNotice.title}</p>
                <p className="mt-1 text-amber-50/90">{actionNotice.message}</p>
              </div>
              <button
                type="button"
                onClick={() => setActionNotice(null)}
                className="rounded-full border border-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white/90"
              >
                Cerrar aviso
              </button>
            </div>
          </div>
        ) : null}

        {actionNotice?.tone === "success" ? (
          <div className="rounded-2xl border border-emerald-300/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-100">
            <p className="font-semibold">{actionNotice.title}</p>
            <p className="mt-1 text-emerald-50/90">{actionNotice.message}</p>
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
          <p className="mt-2 text-emerald-100/85">
            Si el acceso entró pero esta pantalla no carga, el problema ya no es la clave: suele ser sesión o lectura de Sheets.
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
                inputMode="numeric"
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
                inputMode="decimal"
                className="rounded-2xl border border-white/10 bg-black/70 px-4 py-3 text-sm text-white"
              />
            </label>
            <button
              type="button"
              onClick={registerSale}
              disabled={pendingActionLabel === "Registrando venta manual..."}
              className="self-end rounded-2xl border border-emerald-200/40 bg-emerald-400/20 px-4 py-3 text-sm uppercase tracking-[0.2em] text-emerald-100 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {pendingActionLabel === "Registrando venta manual..."
                ? "Guardando..."
                : "Guardar"}
            </button>
          </div>
          <p className="text-xs text-white/45">
            Total estimado de esta venta: {formatMoney(saleTotal)}
          </p>
          <p className="text-xs text-white/45">
            Sugerencia: si cambiaste el precio en el catálogo, revisa aquí el precio unitario antes de guardar.
          </p>
        </section>

        <section className="grid gap-6 rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-[0.25em] text-white/80">
                Control de catálogo
              </h2>
              <p className="mt-2 text-sm text-white/60">
                Busca un producto y ajusta precio, stock, visibilidad, orden o imagen sin perderte en toda la lista.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-xs text-white/65">
              Mostrando {filteredProducts.length} de {sortedProducts.length} productos
            </div>
          </div>
          <div className="grid gap-4 lg:grid-cols-[2fr,1fr]">
            <label className="grid gap-2 text-xs uppercase tracking-[0.2em] text-white/60">
              Buscar producto
              <input
                type="search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Ej. leche, pupusas, combo..."
                className="rounded-2xl border border-white/10 bg-black/70 px-4 py-3 text-sm text-white"
              />
            </label>
            <label className="grid gap-2 text-xs uppercase tracking-[0.2em] text-white/60">
              Filtrar lista
              <select
                value={visibilityFilter}
                onChange={(event) =>
                  setVisibilityFilter(event.target.value as VisibilityFilter)
                }
                className="rounded-2xl border border-white/10 bg-black/70 px-4 py-3 text-sm text-white"
              >
                <option value="all">Todos</option>
                <option value="visible">Solo visibles</option>
                <option value="hidden">Solo ocultos</option>
                <option value="sold_out">Agotados</option>
                <option value="featured">Destacados</option>
                <option value="promo">Promos</option>
                <option value="hot">Hoy</option>
              </select>
            </label>
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
              {filteredProducts.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-white/15 bg-black/20 p-5 text-sm text-white/60 lg:col-span-2">
                  No hay productos que coincidan con la búsqueda o el filtro actual.
                </div>
              ) : filteredProducts.map((product) => {
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
                    <div className="md:col-span-2 rounded-2xl border border-emerald-300/15 bg-emerald-400/10 p-3">
                      <p className="text-[11px] uppercase tracking-[0.22em] text-emerald-200/80">
                        Atajos rápidos
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() => markReadyToday(product.id)}
                          className="rounded-full border border-emerald-300/30 px-3 py-2 text-xs font-semibold text-emerald-100"
                        >
                          Marcar hoy
                        </button>
                        <button
                          type="button"
                          onClick={() => markSoldOutNow(product.id)}
                          className="rounded-full border border-amber-300/30 px-3 py-2 text-xs font-semibold text-amber-100"
                        >
                          Marcar agotado
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            toggleQuickFeatured(product.id, !product.isFeatured)
                          }
                          className="rounded-full border border-sky-300/30 px-3 py-2 text-xs font-semibold text-sky-100"
                        >
                          {product.isFeatured ? "Quitar destacado" : "Destacar"}
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            toggleQuickPromo(
                              product.id,
                              promoState.enabled,
                              promoState.percent
                            )
                          }
                          className="rounded-full border border-fuchsia-300/30 px-3 py-2 text-xs font-semibold text-fuchsia-100"
                        >
                          {promoState.enabled ? "Quitar promo" : "Promo 10%"}
                        </button>
                      </div>
                    </div>

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
                      <span className="text-[11px] normal-case tracking-normal text-white/45">
                        Se guarda al salir del campo. Formato sugerido: $2.50
                      </span>
                        <input
                          type="text"
                          value={prices[product.id] ?? ""}
                          onChange={(event) =>
                            setPrices((prev) => ({
                              ...prev,
                              [product.id]: event.target.value,
                            }))
                          }
                          inputMode="decimal"
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
                          inputMode="numeric"
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
                          ? new Date(hotState.updatedAt).toLocaleString()
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
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-[0.25em] text-white/80">
                Señales de marketing
              </h2>
              <p className="mt-2 text-sm text-white/60">
                Lectura mínima de interés real: clics, búsquedas perdidas, combos y CTA a WhatsApp.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-xs text-white/65">
              Se guarda en la hoja `events`
            </div>
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
              <p className="text-xs uppercase tracking-[0.22em] text-white/50">
                Productos con más clic
              </p>
              <div className="mt-3 grid gap-2">
                {topProductClicks.length > 0 ? topProductClicks.map((entry) => (
                  <div
                    key={entry.productId}
                    className="flex items-center justify-between rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-sm"
                  >
                    <span>{productNameById.get(entry.productId) ?? entry.productId}</span>
                    <span className="text-white/70">{entry.quantity}</span>
                  </div>
                )) : (
                  <p className="text-sm text-white/55">Aún no hay clics registrados.</p>
                )}
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
              <p className="text-xs uppercase tracking-[0.22em] text-white/50">
                Búsquedas sin resultado
              </p>
              <div className="mt-3 grid gap-2">
                {zeroResultSearches.length > 0 ? zeroResultSearches.map((entry) => (
                  <div
                    key={entry.query}
                    className="flex items-center justify-between rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-sm"
                  >
                    <span>{entry.query}</span>
                    <span className="text-white/70">{entry.count}</span>
                  </div>
                )) : (
                  <p className="text-sm text-white/55">Aún no hay búsquedas perdidas.</p>
                )}
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
              <p className="text-xs uppercase tracking-[0.22em] text-white/50">
                Combos más usados
              </p>
              <div className="mt-3 grid gap-2">
                {comboUsage.length > 0 ? comboUsage.map((entry) => (
                  <div
                    key={entry.label}
                    className="flex items-center justify-between rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-sm"
                  >
                    <span>{entry.label}</span>
                    <span className="text-white/70">{entry.count}</span>
                  </div>
                )) : (
                  <p className="text-sm text-white/55">Aún no hay combos usados.</p>
                )}
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
              <p className="text-xs uppercase tracking-[0.22em] text-white/50">
                CTA WhatsApp
              </p>
              <div className="mt-3 grid gap-2">
                {whatsappClicks.length > 0 ? whatsappClicks.map((entry) => (
                  <div
                    key={entry.context}
                    className="flex items-center justify-between rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-sm"
                  >
                    <span>{entry.context}</span>
                    <span className="text-white/70">{entry.count}</span>
                  </div>
                )) : (
                  <p className="text-sm text-white/55">Aún no hay clics a WhatsApp.</p>
                )}
              </div>
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
            <p className="text-xs uppercase tracking-[0.22em] text-white/50">
              Promos con más uso
            </p>
            <div className="mt-3 grid gap-2 md:grid-cols-2">
              {promoUsage.length > 0 ? promoUsage.map((entry) => (
                <div
                  key={entry.productId}
                  className="flex items-center justify-between rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-sm"
                >
                  <span>{productNameById.get(entry.productId) ?? entry.productId}</span>
                  <span className="text-white/70">{entry.quantity}</span>
                </div>
              )) : (
                <p className="text-sm text-white/55">Aún no hay promos usadas.</p>
              )}
            </div>
          </div>
          <div className="rounded-2xl border border-amber-300/20 bg-amber-400/10 px-4 py-3 text-sm text-amber-50/90">
            Los combos siguen siendo manuales por ahora. Si hace falta mover un combo útil sin tocar el panel, la edición sigue concentrada en `src/lib/mo/combos.ts`.
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
