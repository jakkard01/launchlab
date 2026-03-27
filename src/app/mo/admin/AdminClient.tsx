"use client";

import Image from "next/image";
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
import {
  MO_CATEGORY_DEFINITIONS,
  getMoCategoryDescription,
  getMoCategoryLabel,
  normalizeMoCategoryId,
} from "../../../lib/mo/categories";
import { matchesProductQuery, rankProductsByQuery } from "../../../lib/mo/search";
import type {
  AdminRole,
  AdminSessionUser,
  HotState,
  HotStatus,
  MarketingEventEntry,
  MoDataAdapter,
  MoStats,
  OrderLogInput,
  OrderLogEntry,
  ProductAdminSaveInput,
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

const ADMIN_TAG_OPTIONS = [
  "caliente hoy",
  "antojo",
  "combo",
  "oferta",
  "destacado",
  "desayuno",
  "merienda",
  "cena",
  "basico",
  "cafe caliente",
] as const;

type ProductDraft = {
  category: string;
  subgroup: string;
  tagsInput: string;
  price: string;
  image: string;
  sortOrder: number;
  isFeatured: boolean;
  status: ProductStatus;
  stockStatus: StockStatus;
  promoEnabled: boolean;
  promoPercent: number;
  hotStatus: HotStatus;
  hotWindowStart: string;
  hotWindowEnd: string;
  hotNote: string;
};

type SaveState = "idle" | "dirty" | "saving" | "saved" | "error";

const normalizeTags = (value: string) =>
  Array.from(
    new Set(
      value
        .split(",")
        .map((tag) => tag.trim().replace(/\s+/g, " ").toLowerCase())
        .filter(Boolean)
    )
  );

const buildProductDraft = (
  product: Product,
  price: string,
  stockStatus: StockStatus,
  productStatus: ProductStatus,
  promoState: PromoState,
  hotState: HotState
): ProductDraft => ({
  category: product.category,
  subgroup: product.subgroup ?? "",
  tagsInput: (product.tags ?? []).join(", "),
  price,
  image: product.image ?? "",
  sortOrder: product.sortOrder ?? 9999,
  isFeatured: product.isFeatured,
  status: productStatus,
  stockStatus,
  promoEnabled: promoState.enabled,
  promoPercent: promoState.percent,
  hotStatus: hotState.status,
  hotWindowStart: hotState.windowStart,
  hotWindowEnd: hotState.windowEnd,
  hotNote: hotState.note,
});

const areDraftsEqual = (left: ProductDraft, right: ProductDraft) =>
  left.category.trim() === right.category.trim() &&
  left.subgroup.trim() === right.subgroup.trim() &&
  left.price.trim() === right.price.trim() &&
  left.image.trim() === right.image.trim() &&
  left.sortOrder === right.sortOrder &&
  left.isFeatured === right.isFeatured &&
  left.status === right.status &&
  left.stockStatus === right.stockStatus &&
  left.promoEnabled === right.promoEnabled &&
  left.promoPercent === right.promoPercent &&
  left.hotStatus === right.hotStatus &&
  left.hotWindowStart === right.hotWindowStart &&
  left.hotWindowEnd === right.hotWindowEnd &&
  left.hotNote.trim() === right.hotNote.trim() &&
  normalizeTags(left.tagsInput).join("|") === normalizeTags(right.tagsInput).join("|");

type ActionNoticeTone = "error" | "success";

type ActionNotice = {
  tone: ActionNoticeTone;
  title: string;
  message: string;
};

type InlineNotice = {
  tone: ActionNoticeTone;
  message: string;
};

type AdminSection = "resumen" | "hoy" | "catalogo" | "marketing" | "avanzado";

const ROLE_LABELS: Record<AdminRole, string> = {
  owner: "Owner",
  admin: "Admin",
  operator: "Operadora",
  viewer: "Solo lectura",
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
  const [currentUser, setCurrentUser] = useState<AdminSessionUser | null>(null);
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
  const [productDrafts, setProductDrafts] = useState<Record<string, ProductDraft>>({});
  const [saveStateById, setSaveStateById] = useState<Record<string, SaveState>>({});

  const [saleProductId, setSaleProductId] = useState("");
  const [saleQuantity, setSaleQuantity] = useState(1);
  const [saleUnitPrice, setSaleUnitPrice] = useState(0);
  const [salePaymentMethod, setSalePaymentMethod] = useState("efectivo");
  const [saleNote, setSaleNote] = useState("");
  const [manualSaleNotice, setManualSaleNotice] = useState<InlineNotice | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [visibilityFilter, setVisibilityFilter] = useState<VisibilityFilter>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [activeSection, setActiveSection] = useState<AdminSection>("resumen");
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

  useEffect(() => {
    if (!manualSaleNotice || manualSaleNotice.tone !== "success") return;
    const timeoutId = window.setTimeout(() => setManualSaleNotice(null), 3200);
    return () => window.clearTimeout(timeoutId);
  }, [manualSaleNotice]);

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
    setProductDrafts(
      Object.fromEntries(
        snapshot.products.map((product) => [
          product.id,
          buildProductDraft(
            product,
            snapshot.prices[product.id] ?? product.price,
            snapshot.stock[product.id] ?? product.stockStatus ?? "disponible",
            snapshot.status[product.id] ?? product.status ?? "available",
            snapshot.promo[product.id] ?? {
              enabled: product.promoEnabled ?? false,
              percent: product.promoPercent ?? 0,
            },
            snapshot.hotToday[product.id] ?? defaultHotState()
          ),
        ])
      )
    );
  }, []);

  const loadStats = useCallback(async (activeAdapter: MoDataAdapter) => {
    const nextStats = await activeAdapter.getStats();
    setStats(nextStats);
  }, []);

  const loadSession = useCallback(async () => {
    const response = await fetch("/api/mo/admin/me", {
      method: "GET",
      cache: "no-store",
    });
    if (!response.ok) {
      throw new Error("No se pudo validar la sesión admin.");
    }
    const data = (await response.json()) as { user: AdminSessionUser };
    setCurrentUser(data.user);
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
        await Promise.all([loadSession(), reloadAll(dataAdapter)]);
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
  }, [loadSession, reloadAll]);

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

  const categoryOptions = useMemo(() => {
    const liveCategories = new Set(
      products.map((product) => normalizeMoCategoryId(product.category)).filter(Boolean)
    );
    return MO_CATEGORY_DEFINITIONS.filter((category) => liveCategories.has(category.id));
  }, [products]);

  const categoryCounts = useMemo(() => {
    return MO_CATEGORY_DEFINITIONS.map((category) => ({
      ...category,
      count: sortedProducts.filter(
        (product) => normalizeMoCategoryId(product.category) === category.id
      ).length,
    })).filter((category) => category.count > 0);
  }, [sortedProducts]);

  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim();
    const visibleProducts = sortedProducts.filter((product) => {
      const normalizedCategory = normalizeMoCategoryId(product.category);
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
      const matchesCategory =
        categoryFilter === "all" || normalizedCategory === categoryFilter;
      if (!matchesVisibility || !matchesCategory) return false;
      if (!query) return true;
      return matchesProductQuery(
        {
          ...product,
          price: prices[product.id] ?? product.price,
        },
        query
      );
    });
    return query ? rankProductsByQuery(visibleProducts, query) : visibleProducts;
  }, [categoryFilter, hotToday, prices, promo, searchQuery, sortedProducts, status, stock, visibilityFilter]);

  const currentRole = currentUser?.role ?? "viewer";
  const canEditCatalog =
    currentRole === "owner" || currentRole === "admin" || currentRole === "operator";
  const canSeeAdvanced = currentRole === "owner" || currentRole === "admin";
  const canSeeMarketing = currentRole !== "viewer";
  const canUseManualSale = currentRole !== "viewer";

  const availableSections = useMemo(
    () => [
      {
        id: "resumen" as const,
        label: "Resumen",
        help: "Métricas rápidas y accesos del día.",
      },
      {
        id: "hoy" as const,
        label: "Operación",
        help: "Lo diario: tocar y seguir.",
      },
      {
        id: "catalogo" as const,
        label: "Catálogo",
        help: "Buscar producto y abrir ficha.",
      },
      ...(canSeeMarketing
        ? [
            {
              id: "marketing" as const,
              label: "Promos",
              help: "Qué estás empujando hoy.",
            },
          ]
        : []),
      ...(canSeeAdvanced
        ? [
            {
              id: "avanzado" as const,
              label: "Más ajustes",
              help: "Configuración más fina.",
            },
          ]
        : []),
    ],
    [canSeeAdvanced, canSeeMarketing]
  );

  const sectionProducts = useMemo(() => {
    if (searchQuery.trim() || visibilityFilter !== "all" || categoryFilter !== "all") return filteredProducts;

    if (activeSection === "marketing") {
      const marketingFirst = filteredProducts.filter((product) => {
        const currentPromo = promo[product.id] ?? {
          enabled: product.promoEnabled ?? false,
          percent: product.promoPercent ?? 0,
        };
        const currentHot = hotToday[product.id] ?? defaultHotState();
        return (
          product.isFeatured ||
          currentPromo.enabled ||
          currentHot.status !== "hoy_no_hicimos"
        );
      });
      return marketingFirst.length > 0 ? marketingFirst : filteredProducts.slice(0, 12);
    }

    if (activeSection === "hoy") {
      return [...filteredProducts].sort((left, right) => {
        const leftScore =
          ((stock[left.id] ?? left.stockStatus) === "agotado" ? 10 : 0) +
          ((promo[left.id]?.enabled ?? left.promoEnabled) ? 8 : 0) +
          ((hotToday[left.id]?.status ?? "hoy_no_hicimos") !== "hoy_no_hicimos" ? 6 : 0) +
          (left.isFeatured ? 4 : 0);
        const rightScore =
          ((stock[right.id] ?? right.stockStatus) === "agotado" ? 10 : 0) +
          ((promo[right.id]?.enabled ?? right.promoEnabled) ? 8 : 0) +
          ((hotToday[right.id]?.status ?? "hoy_no_hicimos") !== "hoy_no_hicimos" ? 6 : 0) +
          (right.isFeatured ? 4 : 0);
        if (leftScore !== rightScore) return rightScore - leftScore;
        return (left.sortOrder ?? 9999) - (right.sortOrder ?? 9999);
      });
    }

    return filteredProducts;
  }, [activeSection, categoryFilter, filteredProducts, hotToday, promo, searchQuery, stock, visibilityFilter]);

  useEffect(() => {
    if (availableSections.some((section) => section.id === activeSection)) return;
    setActiveSection("resumen");
  }, [activeSection, availableSections]);

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

  const updateDraft = useCallback(
    (id: string, updater: (draft: ProductDraft) => ProductDraft) => {
      setProductDrafts((prev) => {
        const current = prev[id];
        if (!current) return prev;
        return {
          ...prev,
          [id]: updater(current),
        };
      });
      setSaveStateById((prev) => ({ ...prev, [id]: "dirty" }));
    },
    []
  );

  const resetDraft = useCallback(
    (product: Product) => {
      const nextDraft = buildProductDraft(
        product,
        prices[product.id] ?? product.price,
        stock[product.id] ?? product.stockStatus ?? "disponible",
        status[product.id] ?? product.status ?? "available",
        promo[product.id] ?? {
          enabled: product.promoEnabled ?? false,
          percent: product.promoPercent ?? 0,
        },
        hotToday[product.id] ?? defaultHotState()
      );
      setProductDrafts((prev) => ({ ...prev, [product.id]: nextDraft }));
      setSaveStateById((prev) => ({ ...prev, [product.id]: "idle" }));
    },
    [hotToday, prices, promo, status, stock]
  );

  const toggleDraftTag = useCallback(
    (id: string, tag: string) => {
      updateDraft(id, (draft) => {
        const tags = normalizeTags(draft.tagsInput);
        const normalizedTag = tag.toLowerCase();
        const nextTags = tags.includes(normalizedTag)
          ? tags.filter((entry) => entry !== normalizedTag)
          : [...tags, normalizedTag];
        return {
          ...draft,
          tagsInput: nextTags.join(", "),
        };
      });
    },
    [updateDraft]
  );

  const saveProductChanges = async (product: Product) => {
    if (!adapter) return;
    const draft = productDrafts[product.id];
    if (!draft) return;

    const normalizedPrice = draft.price.trim();
    const parsedPrice = parseMoney(normalizedPrice);
    if (!parsedPrice || parsedPrice <= 0) {
      showActionError(
        "Precio inválido",
        "Revisa el precio antes de guardar. Debe ser mayor a 0."
      );
      setSaveStateById((prev) => ({ ...prev, [product.id]: "error" }));
      return;
    }

    const normalizedTags = normalizeTags(draft.tagsInput);
    const payload: ProductAdminSaveInput = {
      id: product.id,
      category: draft.category.trim() || product.category,
      subgroup: draft.subgroup.trim(),
      tags: normalizedTags,
      price: normalizedPrice.startsWith("$")
        ? normalizedPrice
        : formatMoney(parsedPrice),
      image: draft.image.trim(),
      sortOrder: Number.isFinite(draft.sortOrder)
        ? Math.max(1, Math.round(draft.sortOrder))
        : product.sortOrder ?? 9999,
      isFeatured: draft.isFeatured,
      status: draft.status,
      stockStatus: draft.stockStatus,
      promo: {
        enabled: draft.promoEnabled,
        percent: Math.max(0, Math.min(90, Math.round(draft.promoPercent || 0))),
      },
      hot: {
        status: draft.hotStatus,
        windowStart: draft.hotWindowStart,
        windowEnd: draft.hotWindowEnd,
        note: draft.hotNote.trim(),
        updatedAt: new Date().toISOString(),
      },
    };

    setSaveStateById((prev) => ({ ...prev, [product.id]: "saving" }));

    try {
      await adapter.saveProductDraft(payload);
      await reloadAll(adapter);
      setSaveStateById((prev) => ({ ...prev, [product.id]: "saved" }));
      showActionSuccess(
        "Cambios guardados",
        `${product.name} quedó actualizado en la hoja con guardado explícito.`
      );
    } catch {
      setSaveStateById((prev) => ({ ...prev, [product.id]: "error" }));
      showActionError(
        "No se pudo guardar este producto",
        "El panel mantuvo tus cambios en pantalla para que puedas corregir o intentar de nuevo."
      );
    }
  };

  const registerSale = async () => {
    if (!adapter) return;
    if (!saleProductId) {
      setManualSaleNotice({
        tone: "error",
        message: "Elige un producto antes de guardar la venta manual.",
      });
      showActionError(
        "Falta elegir producto",
        "Selecciona un producto antes de registrar la venta manual."
      );
      return;
    }

    const product = products.find((item) => item.id === saleProductId);
    if (!product) {
      setManualSaleNotice({
        tone: "error",
        message: "El producto seleccionado ya no está disponible en el panel.",
      });
      showActionError(
        "Producto no encontrado",
        "Vuelve a elegir el producto e intenta de nuevo."
      );
      return;
    }
    if (!Number.isFinite(safeQuantity) || safeQuantity <= 0) {
      setManualSaleNotice({
        tone: "error",
        message: "La cantidad debe ser mayor a 0.",
      });
      showActionError("Cantidad inválida", "La cantidad debe ser mayor a 0.");
      return;
    }
    if (!Number.isFinite(saleTotal) || saleTotal <= 0) {
      setManualSaleNotice({
        tone: "error",
        message: "Revisa el precio unitario antes de guardar.",
      });
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
      note: [
        product.name,
        `pago:${salePaymentMethod}`,
        saleNote.trim() ? `nota:${saleNote.trim()}` : "",
      ]
        .filter(Boolean)
        .join(" | "),
    };

    try {
      setPendingActionLabel("Registrando venta manual...");
      await adapter.logOrder(saleEntry);
      await reloadAll(adapter);
      setSaleQuantity(1);
      setSaleUnitPrice(parseMoney(prices[saleProductId] ?? product.price));
      setSalePaymentMethod("efectivo");
      setSaleNote("");
      setManualSaleNotice({
        tone: "success",
        message: `${product.name} x${safeQuantity} se sumó al resumen de hoy por ${formatMoney(
          saleTotal
        )}.`,
      });
      showActionSuccess(
        "Venta registrada",
        `${product.name} x${safeQuantity} quedó sumado al resumen del día.`
      );
    } catch {
      setManualSaleNotice({
        tone: "error",
        message: "No se pudo guardar la venta manual. Revisa la sesión e inténtalo de nuevo.",
      });
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
        "No se pudo actualizar el panel en este momento",
        "Si todavía ves productos y atajos, puedes seguir operando y volver a probar en unos segundos. Si la lista desapareció, recarga la página."
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

  const setQuickPromoPercent = async (id: string, percent: number) => {
    await runQuickAction("Guardando promo rápida...", async (activeAdapter) => {
      await activeAdapter.updatePromo(id, true, percent);
      showActionSuccess(
        "Promo actualizada",
        `La promo quedó activa con ${percent}% de descuento.`
      );
    });
  };

  const clearHotState = async (id: string) => {
    await runQuickAction("Quitando caliente del día...", async (activeAdapter) => {
      await activeAdapter.updateHot(id, {
        status: "hoy_no_hicimos",
        windowStart: "",
        windowEnd: "",
        note: "",
        updatedAt: new Date().toISOString(),
      });
      showActionSuccess(
        "Caliente del día limpiado",
        "El producto quedó fuera de la sección de calientes."
      );
    });
  };

  const hideProductQuick = async (id: string) => {
    await runQuickAction("Ocultando producto...", async (activeAdapter) => {
      await activeAdapter.updateStatus(id, "hidden");
      showActionSuccess(
        "Producto oculto",
        "Ya no aparece en tienda, pero sigue guardado para volverlo a activar luego."
      );
    });
  };

  const markFeaturedHot = async (id: string) => {
    await runQuickAction("Dejando producto listo para empujar hoy...", async (activeAdapter) => {
      await activeAdapter.updateStatus(id, "available");
      await activeAdapter.updateStock(id, "disponible");
      await activeAdapter.updateFeatured(id, true);
      await activeAdapter.updateHot(id, {
        status: "listo",
        updatedAt: new Date().toISOString(),
      });
      showActionSuccess(
        "Producto listo para empujar hoy",
        "Quedó visible, disponible, destacado y marcado para hoy."
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
            <h1 className="text-3xl font-semibold">Panel de operación</h1>
            <p className="mt-2 text-sm text-white/60">
              Lo diario primero. Marketing y ajustes finos solo cuando de verdad hagan falta.
            </p>
            <div className="mt-3 flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.2em]">
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-white/70">
                {ROLE_LABELS[currentRole]}
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-white/70">
                {currentUser?.isLegacy ? "Acceso legacy temporal" : currentUser?.name ?? "Sesión admin"}
              </span>
            </div>
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
            {canSeeAdvanced ? (
              <>
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
              </>
            ) : null}
            <div className="rounded-full border border-emerald-300/40 bg-emerald-400/10 px-4 py-2 text-xs uppercase tracking-[0.3em] text-emerald-200">
              {hotCount} calientes activos
            </div>
            {currentRole === "owner" ? (
              <a
                href="/RYSminisuper/admin/seguridad"
                className="rounded-full border border-white/10 px-4 py-2 text-xs uppercase tracking-[0.2em] text-white/70"
              >
                Seguridad
              </a>
            ) : null}
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

        <section className="grid gap-3 rounded-3xl border border-white/10 bg-white/5 p-4">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-white/60">
              Navegación rápida
            </p>
            <p className="mt-2 text-sm text-white/55">
              Primero opera. Después empuja promos. Lo más fino vive en Más ajustes.
            </p>
          </div>
          <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-5">
            {availableSections.map((section) => {
              const isActive = activeSection === section.id;
              return (
                <button
                  key={section.id}
                  type="button"
                  onClick={() => setActiveSection(section.id)}
                  className={`rounded-2xl border px-4 py-3 text-left transition ${
                    isActive
                      ? "border-emerald-300/40 bg-emerald-400/15 text-emerald-100"
                      : "border-white/10 bg-black/30 text-white/75"
                  }`}
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.18em]">
                    {section.label}
                  </p>
                  <p className="mt-1 text-xs text-inherit/80">{section.help}</p>
                </button>
              );
            })}
          </div>
        </section>

        {activeSection === "resumen" && (
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
        )}

        {activeSection === "resumen" && (
        <section className="rounded-3xl border border-emerald-300/20 bg-emerald-400/10 p-5 text-sm text-emerald-50">
          <p className="text-xs uppercase tracking-[0.25em] text-emerald-200/80">
            Guía rápida
          </p>
          <p className="mt-2 font-semibold">
            Lo más usado debe resolverse con atajos: listo hoy, agotado, promo y destacado.
          </p>
          <p className="mt-2 text-emerald-100/85">
            Para comprobarlo, recarga la tienda en otro celular o en otra pestaña. Si solo quieres quitar algo del storefront, usa &quot;Oculto&quot; y no lo borres.
          </p>
          <p className="mt-2 text-emerald-100/85">
            Deja los campos largos para casos puntuales. Lo diario debería salir con los botones rápidos.
          </p>
        </section>
        )}

        {activeSection === "resumen" && (
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
        )}

        {activeSection === "resumen" && canUseManualSale && (
        <details className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <summary className="cursor-pointer list-none text-sm font-semibold uppercase tracking-[0.25em] text-white/80">
            Registrar venta manual
          </summary>
          <p className="mt-4 text-sm text-white/60">
            Úsalo solo si la venta se hizo fuera del flujo normal y quieres reflejarla en el resumen del día.
          </p>
          <div className="mt-4 rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-xs text-white/70">
            Aquí debería pasar algo visible: o se suma al resumen de hoy, o ves el error aquí mismo.
          </div>
          <div className="mt-4 grid gap-4 lg:grid-cols-[2fr,1fr,1fr,1fr]">
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
            <label className="grid gap-2 text-xs uppercase tracking-[0.2em] text-white/60">
              Pago
              <select
                value={salePaymentMethod}
                onChange={(event) => setSalePaymentMethod(event.target.value)}
                className="rounded-2xl border border-white/10 bg-black/70 px-4 py-3 text-sm text-white"
              >
                <option value="efectivo">Efectivo</option>
                <option value="transferencia">Transferencia</option>
                <option value="tarjeta">Tarjeta</option>
              </select>
            </label>
            <button
              type="button"
              onClick={registerSale}
              disabled={pendingActionLabel === "Registrando venta manual..."}
              className="w-full self-end rounded-2xl border border-emerald-200/40 bg-emerald-400/20 px-4 py-3 text-sm uppercase tracking-[0.2em] text-emerald-100 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {pendingActionLabel === "Registrando venta manual..."
                ? "Guardando..."
                : "Agregar venta manual"}
            </button>
          </div>
          <label className="mt-4 grid gap-2 text-xs uppercase tracking-[0.2em] text-white/60">
            Nota corta
            <input
              type="text"
              value={saleNote}
              onChange={(event) => setSaleNote(event.target.value)}
              placeholder="Ej. retiro, transferencia, pedido directo"
              className="rounded-2xl border border-white/10 bg-black/70 px-4 py-3 text-sm text-white"
            />
          </label>
          {manualSaleNotice ? (
            <div
              className={`mt-4 rounded-2xl border px-4 py-3 text-sm ${
                manualSaleNotice.tone === "success"
                  ? "border-emerald-300/30 bg-emerald-500/10 text-emerald-100"
                  : "border-amber-300/30 bg-amber-500/10 text-amber-100"
              }`}
            >
              {manualSaleNotice.message}
            </div>
          ) : null}
          <p className="mt-3 text-xs text-white/45">
            Total estimado de esta venta: {formatMoney(saleTotal)}
          </p>
          <p className="text-xs text-white/45">
            Sugerencia: si cambiaste el precio en el catálogo, revisa aquí el precio unitario antes de guardar.
          </p>
        </details>
        )}

        {activeSection !== "resumen" && (
        <section className="grid gap-6 rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-[0.25em] text-white/80">
                {activeSection === "hoy"
                  ? "Operación de hoy"
                  : activeSection === "marketing"
                    ? "Promos y empuje comercial"
                    : activeSection === "avanzado"
                      ? "Ajustes avanzados"
                      : "Catálogo"}
              </h2>
              <p className="mt-2 text-sm text-white/60">
                {activeSection === "hoy"
                  ? "Aquí va lo diario: agotado, listo hoy, promo rápida, visibilidad y tocar una vez para seguir."
                  : activeSection === "marketing"
                    ? "Aquí decides qué empujar hoy: promos, destacados, etiquetas y productos calientes."
                    : activeSection === "avanzado"
                      ? "Esta zona es para cambios finos. Si no lo necesitas hoy, no la toques."
                      : "Busca un producto por nombre, categoría o etiqueta y entra por bloques de categoría para operar sin perderte en una sábana eterna."}
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-xs text-white/65">
              Mostrando {sectionProducts.length} de {sortedProducts.length} productos
            </div>
          </div>
          <div className="grid gap-4 lg:grid-cols-[2fr,1fr,1fr,auto]">
            <label className="grid gap-2 text-xs uppercase tracking-[0.2em] text-white/60">
              Buscar producto
              <input
                type="search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Ej. café, shampoo, Coca-Cola..."
                className="rounded-2xl border border-white/10 bg-black/70 px-4 py-3 text-sm text-white"
              />
            </label>
            <label className="grid gap-2 text-xs uppercase tracking-[0.2em] text-white/60">
              Categoría
              <select
                value={categoryFilter}
                onChange={(event) => setCategoryFilter(event.target.value)}
                className="rounded-2xl border border-white/10 bg-black/70 px-4 py-3 text-sm text-white"
              >
                <option value="all">Todas</option>
                {categoryOptions.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.label}
                  </option>
                ))}
              </select>
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
            <div className="flex items-end">
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setCategoryFilter("all");
                  setVisibilityFilter("all");
                }}
                className="w-full rounded-2xl border border-white/10 px-4 py-3 text-xs uppercase tracking-[0.2em] text-white/70"
              >
                Limpiar
              </button>
            </div>
          </div>
          {categoryCounts.length > 0 ? (
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {categoryCounts.map((category) => {
                const isActive = categoryFilter === category.id;
                return (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() =>
                      setCategoryFilter((current) =>
                        current === category.id ? "all" : category.id
                      )
                    }
                    className={`flex items-center gap-3 rounded-2xl border p-3 text-left transition ${
                      isActive
                        ? "border-emerald-300/35 bg-emerald-400/10"
                        : "border-white/10 bg-black/25 hover:border-white/20"
                    }`}
                  >
                    <span className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-black/25">
                      <Image
                        src={category.image}
                        alt=""
                        aria-hidden="true"
                        width={56}
                        height={56}
                        className="h-14 w-14 object-contain"
                      />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm font-semibold text-white">
                        {category.label}
                      </span>
                      <span className="mt-1 block text-xs text-white/55">
                        {category.count} producto{category.count === 1 ? "" : "s"}
                      </span>
                      <span className="mt-1 block text-[11px] text-white/45">
                        {getMoCategoryDescription(category.id)}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          ) : null}
          <div className="grid gap-4 lg:grid-cols-2">
              {sectionProducts.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-white/15 bg-black/20 p-5 text-sm text-white/60 lg:col-span-2">
                  No hay productos que coincidan con la búsqueda o el filtro actual. Si buscabas algo del surtido y no sale aquí, no significa que el buscador esté roto: puede que ese producto no esté cargado hoy.
                </div>
              ) : sectionProducts.map((product) => {
                const stockStatus = stock[product.id] ?? "disponible";
                const promoState = promo[product.id] ?? {
                  enabled: false,
                  percent: 0,
                };
                const visibility = status[product.id] ?? product.status ?? "available";
                const baselinePrice = baselinePrices[product.id] ?? product.price;
                const hotState = hotToday[product.id] ?? defaultHotState();
                const price = parseMoney(prices[product.id] ?? "");
                const draft =
                  productDrafts[product.id] ??
                  buildProductDraft(
                    product,
                    prices[product.id] ?? product.price,
                    stockStatus,
                    visibility,
                    promoState,
                    hotState
                  );
                const savedDraft = buildProductDraft(
                  product,
                  prices[product.id] ?? product.price,
                  stockStatus,
                  visibility,
                  promoState,
                  hotState
                );
                const isDirty = !areDraftsEqual(draft, savedDraft);
                const saveState = saveStateById[product.id] ?? (isDirty ? "dirty" : "idle");
              const pricingProduct = {
                ...product,
                price: draft.price,
                promoEnabled: draft.promoEnabled,
                promoPercent: draft.promoPercent,
              };
              const effectivePriceValue =
                getEffectivePriceValue(pricingProduct) ?? price;
              const promoLabel = getPromoLabel(pricingProduct);
              const promoSavings = getPromoSavings(pricingProduct);
              const statusSummary = [
                draft.status === "hidden"
                  ? "Oculto"
                  : draft.status === "out_of_stock"
                    ? "Agotado"
                    : draft.status === "soon"
                      ? "Pronto"
                      : "Visible",
                draft.stockStatus === "agotado"
                  ? "Stock agotado"
                  : draft.stockStatus === "ultimas"
                    ? "Últimas"
                    : "Stock disponible",
                draft.promoEnabled && draft.promoPercent > 0
                  ? `Promo ${draft.promoPercent}%`
                  : "",
                draft.hotStatus !== "hoy_no_hicimos"
                  ? hotLabels[draft.hotStatus]
                  : "",
                draft.isFeatured ? "Destacado" : "",
              ]
                .filter(Boolean)
                .join(" · ");
              const showTodayBlock =
                activeSection === "hoy" || activeSection === "catalogo";
              const showBasicsBlock =
                activeSection === "hoy" || activeSection === "catalogo";
              const showMarketingBlock =
                activeSection === "marketing" ||
                activeSection === "catalogo" ||
                activeSection === "hoy";
              const showAdvancedBlock =
                canSeeAdvanced &&
                (activeSection === "avanzado" || activeSection === "catalogo");

              return (
                <div
                  key={product.id}
                  className="rounded-3xl border border-white/10 bg-black/40 p-4 shadow-[0_14px_38px_rgba(0,0,0,0.16)]"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="text-xs uppercase tracking-[0.3em] text-white/60">
                        {getMoCategoryLabel(draft.category)}
                      </p>
                      {draft.subgroup.trim() ? (
                        <p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-white/45">
                          {draft.subgroup}
                        </p>
                      ) : null}
                      <h3 className="mt-2 text-lg font-semibold">
                        {product.name}
                      </h3>
                      <p className="mt-2 text-xs text-white/55">
                        {statusSummary}
                      </p>
                      <p className="mt-2 text-xs text-white/45">
                        {normalizeTags(draft.tagsInput).length > 0
                          ? normalizeTags(draft.tagsInput).join(" · ")
                          : "Sin etiquetas comerciales"}
                      </p>
                    </div>
                    <div className="min-w-[136px] text-right">
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
                      <p className="mt-2 text-[11px] text-white/55">
                        {saveState === "saving"
                          ? "Guardando..."
                          : saveState === "saved"
                            ? "Guardado"
                            : saveState === "error"
                              ? "Revisa y vuelve a guardar"
                              : isDirty
                                ? "Hay cambios sin guardar"
                                : "Sin cambios pendientes"}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 rounded-2xl border border-emerald-300/20 bg-emerald-400/10 p-3">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <p className="text-[11px] uppercase tracking-[0.22em] text-emerald-200/80">
                          Guardado del producto
                        </p>
                        <p className="mt-1 text-xs text-emerald-50/85">
                          Los atajos de hoy se guardan al tocar. Lo demás se confirma con Guardar cambios.
                        </p>
                      </div>
                      <span className="rounded-full border border-white/10 bg-black/25 px-3 py-1 text-[11px] font-semibold text-white/85">
                        {saveState === "saving"
                          ? "Guardando"
                          : saveState === "saved"
                            ? "Guardado"
                            : saveState === "error"
                              ? "Revisar"
                              : isDirty
                                ? "Pendiente"
                                : "Al día"}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 grid gap-2 sm:grid-cols-2">
                    <button
                      type="button"
                      onClick={() => saveProductChanges(product)}
                      disabled={!canEditCatalog || !isDirty || saveState === "saving"}
                      className="min-h-[46px] rounded-2xl bg-emerald-300 px-4 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#07130c] disabled:cursor-not-allowed disabled:opacity-45"
                    >
                      {saveState === "saving" ? "Guardando..." : "Guardar cambios"}
                    </button>
                    <button
                      type="button"
                      onClick={() => resetDraft(product)}
                      disabled={!canEditCatalog || !isDirty || saveState === "saving"}
                      className="min-h-[46px] rounded-2xl border border-white/15 px-4 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-white/75 disabled:cursor-not-allowed disabled:opacity-45"
                    >
                      Descartar
                    </button>
                  </div>

                  <div className="mt-4 grid gap-3 md:grid-cols-2">
                    {currentRole !== "viewer" && showTodayBlock ? (
                    <div className="md:col-span-2 rounded-2xl border border-emerald-300/15 bg-emerald-400/10 p-3">
                      <p className="text-[11px] uppercase tracking-[0.22em] text-emerald-200/80">
                        Hoy
                      </p>
                      <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
                        <button
                          type="button"
                          onClick={() => markReadyToday(product.id)}
                          className="min-h-[44px] rounded-2xl border border-emerald-300/30 px-3 py-2 text-xs font-semibold text-emerald-100"
                        >
                          Listo hoy
                        </button>
                        <button
                          type="button"
                          onClick={() => markFeaturedHot(product.id)}
                          className="min-h-[44px] rounded-2xl border border-teal-300/30 px-3 py-2 text-xs font-semibold text-teal-100"
                        >
                          Empujar hoy
                        </button>
                        <button
                          type="button"
                          onClick={() => markSoldOutNow(product.id)}
                          className="min-h-[44px] rounded-2xl border border-amber-300/30 px-3 py-2 text-xs font-semibold text-amber-100"
                        >
                          Agotado
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            toggleQuickFeatured(product.id, !draft.isFeatured)
                          }
                          className="min-h-[44px] rounded-2xl border border-sky-300/30 px-3 py-2 text-xs font-semibold text-sky-100"
                        >
                          {draft.isFeatured ? "Quitar destacado" : "Destacar"}
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
                          className="min-h-[44px] rounded-2xl border border-fuchsia-300/30 px-3 py-2 text-xs font-semibold text-fuchsia-100"
                        >
                          {promoState.enabled ? "Quitar promo" : "Promo 10%"}
                        </button>
                        <button
                          type="button"
                          onClick={() => setQuickPromoPercent(product.id, 15)}
                          className="min-h-[44px] rounded-2xl border border-pink-300/30 px-3 py-2 text-xs font-semibold text-pink-100"
                        >
                          Promo 15%
                        </button>
                        <button
                          type="button"
                          onClick={() => clearHotState(product.id)}
                          className="min-h-[44px] rounded-2xl border border-white/15 px-3 py-2 text-xs font-semibold text-white/80"
                        >
                          Quitar caliente
                        </button>
                        <button
                          type="button"
                          onClick={() => hideProductQuick(product.id)}
                          className="min-h-[44px] rounded-2xl border border-white/15 px-3 py-2 text-xs font-semibold text-white/80"
                        >
                          Ocultar
                        </button>
                      </div>
                      <p className="mt-3 text-[11px] text-emerald-100/75">
                        Esto es lo diario: tocar y seguir. Abre &quot;Más ajustes&quot; solo si vas a cambiar algo más fino.
                      </p>
                    </div>
                    ) : null}

                    {currentRole !== "viewer" && (showBasicsBlock || showMarketingBlock) ? (
                    <>
                    {showBasicsBlock ? (
                    <>
                    <label className="grid gap-2 text-xs uppercase tracking-[0.2em] text-white/60">
                      Visibilidad
                      <select
                        value={draft.status}
                        onChange={(event) =>
                          updateDraft(product.id, (current) => ({
                            ...current,
                            status: event.target.value as ProductStatus,
                          }))
                        }
                        className="rounded-xl border border-white/10 bg-black/70 px-3 py-2 text-sm text-white"
                        disabled={!canEditCatalog}
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
                        value={draft.stockStatus}
                        onChange={(event) =>
                          updateDraft(product.id, (current) => ({
                            ...current,
                            stockStatus: event.target.value as StockStatus,
                          }))
                        }
                        className="rounded-xl border border-white/10 bg-black/70 px-3 py-2 text-sm text-white"
                        disabled={!canEditCatalog}
                      >
                        <option value="disponible">Disponible</option>
                        <option value="ultimas">Ultimas</option>
                        <option value="agotado">Agotado</option>
                      </select>
                    </label>

                    <label className="grid gap-2 text-xs uppercase tracking-[0.2em] text-white/60">
                      Precio unitario
                      <span className="text-[11px] normal-case tracking-normal text-white/45">
                        Cámbialo aquí y luego usa Guardar cambios.
                      </span>
                      <input
                        type="text"
                        value={draft.price}
                        onChange={(event) =>
                          updateDraft(product.id, (current) => ({
                            ...current,
                            price: event.target.value,
                          }))
                        }
                        inputMode="decimal"
                        className="rounded-xl border border-white/10 bg-black/70 px-3 py-2 text-sm text-white"
                        disabled={!canEditCatalog}
                      />
                    </label>

                    <div className="grid gap-2 text-xs uppercase tracking-[0.2em] text-white/60">
                      <p>Promo rápida</p>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { label: "Sin promo", enabled: false, percent: 0 },
                          { label: "10%", enabled: true, percent: 10 },
                          { label: "15%", enabled: true, percent: 15 },
                        ].map((option) => {
                          const isActive =
                            draft.promoEnabled === option.enabled &&
                            draft.promoPercent === option.percent;
                          return (
                            <button
                              key={option.label}
                              type="button"
                              onClick={() =>
                                updateDraft(product.id, (current) => ({
                                  ...current,
                                  promoEnabled: option.enabled,
                                  promoPercent: option.percent,
                                }))
                              }
                              disabled={!canEditCatalog}
                              className={`min-h-[44px] rounded-2xl border px-3 py-2 text-[11px] font-semibold ${
                                isActive
                                  ? "border-emerald-300/40 bg-emerald-400/15 text-emerald-100"
                                  : "border-white/15 text-white/80"
                              }`}
                            >
                              {option.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                    </>
                    ) : null}

                    {showMarketingBlock ? (
                    <div className="md:col-span-2 grid gap-2 text-xs uppercase tracking-[0.2em] text-white/60">
                      <p>Marketing</p>
                      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                        {ADMIN_TAG_OPTIONS.map((tag) => {
                          const isActive = normalizeTags(draft.tagsInput).includes(tag);
                          return (
                            <button
                              key={tag}
                              type="button"
                              onClick={() => toggleDraftTag(product.id, tag)}
                              disabled={!canEditCatalog}
                              className={`min-h-[42px] rounded-2xl border px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.08em] ${
                                isActive
                                  ? "border-emerald-300/40 bg-emerald-400/15 text-emerald-100"
                                  : "border-white/15 text-white/75"
                              }`}
                            >
                              {tag}
                            </button>
                          );
                        })}
                      </div>
                      <input
                        type="text"
                        value={draft.tagsInput}
                        onChange={(event) =>
                          updateDraft(product.id, (current) => ({
                            ...current,
                            tagsInput: event.target.value,
                          }))
                        }
                        className="rounded-xl border border-white/10 bg-black/70 px-3 py-2 text-sm text-white"
                        placeholder="Ej. desayuno, cafe caliente, oferta"
                        disabled={!canEditCatalog}
                      />
                      <p className="text-[11px] normal-case tracking-normal text-white/45">
                        Aquí decides qué empujar hoy. Úsalas para búsqueda, promos y lectura comercial rápida.
                      </p>
                    </div>
                    ) : null}
                    </>
                    ) : (
                      <div className="md:col-span-2 rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-white/65">
                        Modo solo lectura: puedes revisar estado, precio final y señales del producto, pero no editar.
                      </div>
                    )}
                  </div>

                  {showAdvancedBlock ? (
                  <details className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-4">
                    <summary className="cursor-pointer list-none text-sm font-semibold text-white">
                      Más ajustes
                    </summary>
                    <div className="mt-4 grid gap-3 md:grid-cols-2">
                      <label className="grid gap-2 text-xs uppercase tracking-[0.2em] text-white/60">
                        Categoría
                        <select
                          value={draft.category}
                          onChange={(event) =>
                            updateDraft(product.id, (current) => ({
                              ...current,
                              category: event.target.value,
                            }))
                          }
                          className="rounded-xl border border-white/10 bg-black/70 px-3 py-2 text-sm text-white"
                          disabled={!canEditCatalog}
                        >
                          {categoryOptions.map((option) => (
                            <option key={option.id} value={option.id}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </label>

                      <label className="grid gap-2 text-xs uppercase tracking-[0.2em] text-white/60">
                        Subgrupo
                        <input
                          type="text"
                          value={draft.subgroup}
                          onChange={(event) =>
                            updateDraft(product.id, (current) => ({
                              ...current,
                              subgroup: event.target.value,
                            }))
                          }
                          className="rounded-xl border border-white/10 bg-black/70 px-3 py-2 text-sm text-white"
                          placeholder="Ej. artesanal, empacado, familiar"
                          disabled={!canEditCatalog}
                        />
                        <span className="text-[11px] normal-case tracking-normal text-white/45">
                          Sirve para separar variantes reales sin mezclar precios.
                        </span>
                      </label>

                      <label className="grid gap-2 text-xs uppercase tracking-[0.2em] text-white/60">
                        Orden catálogo
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            min={1}
                            value={draft.sortOrder}
                            inputMode="numeric"
                            onChange={(event) => {
                              const nextValue = Number(event.target.value);
                              updateDraft(product.id, (current) => ({
                                ...current,
                                sortOrder: Number.isFinite(nextValue) ? nextValue : 9999,
                              }));
                            }}
                            className="w-full rounded-xl border border-white/10 bg-black/70 px-3 py-2 text-sm text-white"
                            disabled={!canEditCatalog}
                          />
                          <button
                            type="button"
                            onClick={() => moveProduct(product.id, "up")}
                            className="rounded-xl border border-white/10 bg-black/70 px-3 py-2 text-sm text-white disabled:opacity-40"
                            disabled={!canEditCatalog}
                            aria-label={`Subir ${product.name}`}
                            title="Subir"
                          >
                            ↑
                          </button>
                          <button
                            type="button"
                            onClick={() => moveProduct(product.id, "down")}
                            className="rounded-xl border border-white/10 bg-black/70 px-3 py-2 text-sm text-white disabled:opacity-40"
                            disabled={!canEditCatalog}
                            aria-label={`Bajar ${product.name}`}
                            title="Bajar"
                          >
                            ↓
                          </button>
                        </div>
                      </label>

                      <label className="grid gap-2 text-xs uppercase tracking-[0.2em] text-white/60">
                        Destacado
                        <select
                          value={draft.isFeatured ? "si" : "no"}
                          onChange={(event) =>
                            updateDraft(product.id, (current) => ({
                              ...current,
                              isFeatured: event.target.value === "si",
                            }))
                          }
                          className="rounded-xl border border-white/10 bg-black/70 px-3 py-2 text-sm text-white"
                          disabled={!canEditCatalog}
                        >
                          <option value="no">No</option>
                          <option value="si">Si</option>
                        </select>
                      </label>

                      <label className="grid gap-2 text-xs uppercase tracking-[0.2em] text-white/60">
                        Oferta
                        <select
                          value={draft.promoEnabled ? "activa" : "inactiva"}
                          onChange={(event) =>
                            updateDraft(product.id, (current) => ({
                              ...current,
                              promoEnabled: event.target.value === "activa",
                            }))
                          }
                          className="rounded-xl border border-white/10 bg-black/70 px-3 py-2 text-sm text-white"
                          disabled={!canEditCatalog}
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
                          value={draft.promoPercent}
                          onChange={(event) =>
                            updateDraft(product.id, (current) => ({
                              ...current,
                              promoPercent: Number(event.target.value),
                            }))
                          }
                          className="rounded-xl border border-white/10 bg-black/70 px-3 py-2 text-sm text-white"
                          disabled={!canEditCatalog}
                        />
                      </label>

                      <label className="grid gap-2 text-xs uppercase tracking-[0.2em] text-white/60">
                        Estado calientes
                        <select
                          value={draft.hotStatus}
                          onChange={(event) =>
                            updateDraft(product.id, (current) => ({
                              ...current,
                              hotStatus: event.target.value as HotStatus,
                            }))
                          }
                          className="rounded-xl border border-white/10 bg-black/70 px-3 py-2 text-sm text-white"
                          disabled={!canEditCatalog}
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
                            value={draft.hotWindowStart}
                            onChange={(event) =>
                              updateDraft(product.id, (current) => ({
                                ...current,
                                hotWindowStart: event.target.value,
                              }))
                            }
                            className="w-full rounded-xl border border-white/10 bg-black/70 px-3 py-2 text-sm text-white"
                            disabled={!canEditCatalog}
                          />
                          <input
                            type="time"
                            value={draft.hotWindowEnd}
                            onChange={(event) =>
                              updateDraft(product.id, (current) => ({
                                ...current,
                                hotWindowEnd: event.target.value,
                              }))
                            }
                            className="w-full rounded-xl border border-white/10 bg-black/70 px-3 py-2 text-sm text-white"
                            disabled={!canEditCatalog}
                          />
                        </div>
                      </label>

                      <label className="grid gap-2 text-xs uppercase tracking-[0.2em] text-white/60">
                        Nota del día
                        <input
                          type="text"
                          value={draft.hotNote}
                          onChange={(event) =>
                            updateDraft(product.id, (current) => ({
                              ...current,
                              hotNote: event.target.value,
                            }))
                          }
                          className="rounded-xl border border-white/10 bg-black/70 px-3 py-2 text-sm text-white"
                          disabled={!canEditCatalog}
                        />
                      </label>

                      <label className="grid gap-2 text-xs uppercase tracking-[0.2em] text-white/60 md:col-span-2">
                        Imagen URL
                        <input
                          type="text"
                          value={draft.image}
                          onChange={(event) =>
                            updateDraft(product.id, (current) => ({
                              ...current,
                              image: event.target.value,
                            }))
                          }
                          className="rounded-xl border border-white/10 bg-black/70 px-3 py-2 text-sm text-white"
                          placeholder="/RYSminisuper/images/... o https://..."
                          disabled={!canEditCatalog}
                        />
                      </label>

                      <div className="grid gap-2 text-xs uppercase tracking-[0.2em] text-white/60">
                        Última actualización
                        <div className="rounded-xl border border-white/10 bg-black/70 px-3 py-2 text-sm text-white/70">
                          {hotState.updatedAt
                            ? new Date(hotState.updatedAt).toLocaleString()
                            : "-"}
                        </div>
                      </div>
                    </div>
                  </details>
                  ) : null}
                </div>
              );
            })}
          </div>
        </section>
        )}

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

        {(activeSection === "resumen" || activeSection === "marketing") && (
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
        )}

        {(activeSection === "resumen" || activeSection === "marketing") && (
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
        )}
      </div>
    </div>
  );
}
