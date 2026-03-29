import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  getMoBackendErrorCode,
  getMoBackendErrorMessage,
} from "../../../../lib/mo/data/backendError";
import type { Product } from "../../../../lib/mo/types";
import {
  MO_ADMIN_SESSION_COOKIE,
  getAdminSessionFromCookieStore,
  getPermissionForAdminAction,
  hasPermission,
} from "../../../../lib/mo/adminAuth";
import type {
  AdminAuditEntry,
  AdminSnapshot,
  AdminSessionUser,
  DailySalesInput,
  HotState,
  MarketingEventInput,
  OrderLogInput,
  ProductCreateInput,
  ProductAdminSaveInput,
  StockStatus,
} from "../../../../lib/mo/data/types";
import {
  createProduct,
  getAdminSnapshot,
  getStoreProductById,
  getStats,
  importBackup,
  logDailySales,
  logMarketingEvent,
  logOrder,
  removeOrder,
  saveProductDraft,
  updateFeatured,
  updateHot,
  updateImage,
  updatePrice,
  updatePromo,
  updateSortOrder,
  updateStatus,
  updateStock,
} from "../../../../lib/mo/data/sheetsStore";
import {
  appendAuditEntry,
  getAuditEntriesForUser,
  getAuditEntryById,
  markAuditEntryReverted,
} from "../../../../lib/mo/data/securityStore";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const getSession = async () =>
  getAdminSessionFromCookieStore(
    cookies().get(MO_ADMIN_SESSION_COOKIE)?.value
  );

const toApiError = (error: unknown, fallbackMessage: string) => {
  const message = getMoBackendErrorMessage(error, fallbackMessage);
  const code = getMoBackendErrorCode(error, "ADMIN_BACKEND_ERROR");

  return { message, code };
};

type AdminAction =
  | { action: "saveProductDraft"; input: ProductAdminSaveInput }
  | { action: "createProduct"; input: ProductCreateInput }
  | { action: "revertAuditEntry"; entryId: string }
  | { action: "updateStock"; id: string; status: StockStatus }
  | { action: "updatePrice"; id: string; price: string }
  | { action: "updateImage"; id: string; image: string }
  | { action: "updateSortOrder"; id: string; sortOrder: number }
  | { action: "updateFeatured"; id: string; isFeatured: boolean }
  | { action: "updatePromo"; id: string; enabled: boolean; percent: number }
  | { action: "updateStatus"; id: string; status: Product["status"] }
  | { action: "importBackup"; backup: Partial<AdminSnapshot> }
  | { action: "updateHot"; id: string; next: Partial<HotState> }
  | { action: "logOrder"; entry: OrderLogInput }
  | { action: "removeOrder"; id: string }
  | { action: "logDailySales"; entry: DailySalesInput }
  | { action: "logMarketingEvent"; entry: MarketingEventInput };

const stringifyAuditValue = (value: unknown) => {
  if (value === undefined) return "";
  return JSON.stringify(value);
};

const parseAuditValue = <T,>(value: string | undefined, fallback: T): T => {
  if (!value) return fallback;
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
};

const buildAuditBase = (session: AdminSessionUser) => ({
  actorUserId: session.id,
  actorUsername: session.username || session.email,
  actorRole: session.role,
});

const fieldActionMap: Record<string, AdminAuditEntry["action"]> = {
  name: "product_updated",
  image: "product_updated",
  status: "visibility_changed",
  tags: "product_updated",
  promoEnabled: "promo_changed",
  promoPercent: "promo_changed",
  isFeatured: "product_updated",
  hotStatus: "product_updated",
  hotWindowStart: "product_updated",
  hotWindowEnd: "product_updated",
  hotNote: "product_updated",
  subgroup: "product_updated",
  category: "product_updated",
  stockStatus: "stock_changed",
  price: "price_changed",
};

const isReversibleField = (field: string) =>
  [
    "name",
    "image",
    "status",
    "tags",
    "promoEnabled",
    "promoPercent",
    "isFeatured",
    "hotStatus",
    "hotWindowStart",
    "hotWindowEnd",
    "hotNote",
  ].includes(field);

const logProductFieldDiffs = async (
  session: AdminSessionUser,
  before: Product,
  after: Product
) => {
  const changes: Array<{ field: string; oldValue: unknown; newValue: unknown }> = [
    { field: "name", oldValue: before.name, newValue: after.name },
    { field: "category", oldValue: before.category, newValue: after.category },
    { field: "subgroup", oldValue: before.subgroup ?? "", newValue: after.subgroup ?? "" },
    { field: "tags", oldValue: before.tags ?? [], newValue: after.tags ?? [] },
    { field: "price", oldValue: before.price, newValue: after.price },
    { field: "image", oldValue: before.image, newValue: after.image },
    { field: "isFeatured", oldValue: Boolean(before.isFeatured), newValue: Boolean(after.isFeatured) },
    { field: "status", oldValue: before.status ?? "available", newValue: after.status ?? "available" },
    { field: "stockStatus", oldValue: before.stockStatus ?? "disponible", newValue: after.stockStatus ?? "disponible" },
    { field: "promoEnabled", oldValue: Boolean(before.promoEnabled), newValue: Boolean(after.promoEnabled) },
    { field: "promoPercent", oldValue: before.promoPercent ?? 0, newValue: after.promoPercent ?? 0 },
    { field: "hotStatus", oldValue: before.hotStatus ?? "hoy_no_hicimos", newValue: after.hotStatus ?? "hoy_no_hicimos" },
    { field: "hotWindowStart", oldValue: before.hotWindowStart ?? "", newValue: after.hotWindowStart ?? "" },
    { field: "hotWindowEnd", oldValue: before.hotWindowEnd ?? "", newValue: after.hotWindowEnd ?? "" },
    { field: "hotNote", oldValue: before.hotNote ?? "", newValue: after.hotNote ?? "" },
  ];

  await Promise.all(
    changes
      .filter(
        (entry) => stringifyAuditValue(entry.oldValue) !== stringifyAuditValue(entry.newValue)
      )
      .map((entry) =>
        appendAuditEntry({
          ...buildAuditBase(session),
          action: fieldActionMap[entry.field] ?? "product_updated",
          entityType: entry.field === "price" ? "product" : "product",
          entityId: after.id,
          productId: after.id,
          productName: after.name,
          field: entry.field,
          oldValue: stringifyAuditValue(entry.oldValue),
          newValue: stringifyAuditValue(entry.newValue),
          reversible: isReversibleField(entry.field),
          before: stringifyAuditValue(entry.oldValue),
          after: stringifyAuditValue(entry.newValue),
        })
      )
  );
};

const revertAuditChange = async (
  session: AdminSessionUser,
  entry: AdminAuditEntry
) => {
  if (!entry.productId || !entry.field) {
    throw new Error("Este cambio no se puede deshacer.");
  }
  const product = await getStoreProductById(entry.productId);
  if (!product) {
    throw new Error("El producto original ya no existe.");
  }

  const oldValue = entry.oldValue ?? "";
  const nextInput: ProductAdminSaveInput = {
    id: product.id,
    name: product.name,
    category: product.category,
    subgroup: product.subgroup ?? "",
    tags: product.tags ?? [],
    price: product.price,
    image: product.image ?? "",
    sortOrder: product.sortOrder ?? 9999,
    isFeatured: Boolean(product.isFeatured),
    status: product.status ?? "available",
    stockStatus: product.stockStatus ?? "disponible",
    promo: {
      enabled: Boolean(product.promoEnabled),
      percent: product.promoPercent ?? 0,
    },
    hot: {
      status: product.hotStatus ?? "hoy_no_hicimos",
      windowStart: product.hotWindowStart ?? "",
      windowEnd: product.hotWindowEnd ?? "",
      note: product.hotNote ?? "",
      updatedAt: new Date().toISOString(),
    },
  };

  switch (entry.field) {
    case "name":
      nextInput.name = parseAuditValue(oldValue, product.name);
      break;
    case "image":
      nextInput.image = parseAuditValue(oldValue, product.image ?? "");
      break;
    case "status":
      nextInput.status = parseAuditValue(oldValue, product.status ?? "available");
      break;
    case "tags":
      nextInput.tags = parseAuditValue(oldValue, product.tags ?? []);
      break;
    case "promoEnabled":
      nextInput.promo.enabled = parseAuditValue(oldValue, Boolean(product.promoEnabled));
      break;
    case "promoPercent":
      nextInput.promo.percent = parseAuditValue(oldValue, product.promoPercent ?? 0);
      break;
    case "isFeatured":
      nextInput.isFeatured = parseAuditValue(oldValue, Boolean(product.isFeatured));
      break;
    case "hotStatus":
      nextInput.hot.status = parseAuditValue(oldValue, product.hotStatus ?? "hoy_no_hicimos");
      break;
    case "hotWindowStart":
      nextInput.hot.windowStart = parseAuditValue(oldValue, product.hotWindowStart ?? "");
      break;
    case "hotWindowEnd":
      nextInput.hot.windowEnd = parseAuditValue(oldValue, product.hotWindowEnd ?? "");
      break;
    case "hotNote":
      nextInput.hot.note = parseAuditValue(oldValue, product.hotNote ?? "");
      break;
    default:
      throw new Error("Este cambio no tiene deshacer rápido.");
  }

  await saveProductDraft(nextInput);
  await markAuditEntryReverted(entry.id, session.id);
  await appendAuditEntry({
    ...buildAuditBase(session),
    action: "product_reverted",
    entityType: "product",
    entityId: product.id,
    productId: product.id,
    productName: nextInput.name,
    field: entry.field,
    oldValue: entry.newValue,
    newValue: entry.oldValue,
    reversible: false,
    before: entry.newValue,
    after: entry.oldValue,
  });
};

export async function GET(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const url = new URL(request.url);
    if (url.searchParams.get("view") === "stats") {
      if (!hasPermission(session, "stats:view")) {
        return NextResponse.json({ message: "Forbidden" }, { status: 403 });
      }
      const stats = await getStats();
      return NextResponse.json({ stats });
    }

    if (!hasPermission(session, "catalog:view")) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }
    const snapshot = await getAdminSnapshot();
    const recentChanges = await getAuditEntriesForUser(session.id, 12);
    return NextResponse.json({ ...snapshot, recentChanges });
  } catch (error) {
    const apiError = toApiError(error, "No se pudo leer Google Sheets.");
    return NextResponse.json(
      apiError,
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const payload = (await request.json()) as AdminAction;
    const permission = getPermissionForAdminAction(payload.action);
    if (!hasPermission(session, permission)) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    switch (payload.action) {
      case "saveProductDraft":
        {
        const before = await getStoreProductById(payload.input.id);
        await saveProductDraft(payload.input);
        const after = await getStoreProductById(payload.input.id);
        if (before && after) {
          await logProductFieldDiffs(session, before, after);
        }
        break;
        }
      case "createProduct":
        {
          const product = await createProduct(payload.input);
          await appendAuditEntry({
            ...buildAuditBase(session),
            action: "product_created",
            entityType: "product",
            entityId: product.id,
            productId: product.id,
            productName: product.name,
            field: "create",
            oldValue: "",
            newValue: stringifyAuditValue(product),
            reversible: false,
            after: stringifyAuditValue(product),
          });
          return NextResponse.json({ ok: true, product });
        }
      case "revertAuditEntry":
        {
          const entry = await getAuditEntryById(payload.entryId);
          if (!entry) {
            return NextResponse.json({ message: "Cambio no encontrado." }, { status: 404 });
          }
          if (!entry.reversible || entry.revertedAt) {
            return NextResponse.json(
              { message: "Este cambio ya no se puede deshacer." },
              { status: 400 }
            );
          }
          if (session.role !== "super_admin" && entry.actorUserId !== session.id) {
            return NextResponse.json({ message: "Forbidden" }, { status: 403 });
          }
          await revertAuditChange(session, entry);
          break;
        }
      case "updateStock":
        await updateStock(payload.id, payload.status);
        await appendAuditEntry({
          ...buildAuditBase(session),
          action: "stock_changed",
          entityType: "stock",
          entityId: payload.id,
          productId: payload.id,
          field: "stockStatus",
          newValue: stringifyAuditValue(payload.status),
        });
        break;
      case "updatePrice":
        await updatePrice(payload.id, payload.price);
        await appendAuditEntry({
          ...buildAuditBase(session),
          action: "price_changed",
          entityType: "product",
          entityId: payload.id,
          productId: payload.id,
          field: "price",
          newValue: stringifyAuditValue(payload.price),
          reversible: false,
        });
        break;
      case "updateImage":
        await updateImage(payload.id, payload.image);
        await logAudit(session, "product_updated", "product", payload.id, {
          image: payload.image,
        });
        break;
      case "updateSortOrder":
        await updateSortOrder(payload.id, payload.sortOrder);
        await logAudit(session, "product_updated", "product", payload.id, {
          sortOrder: payload.sortOrder,
        });
        break;
      case "updateFeatured":
        await updateFeatured(payload.id, payload.isFeatured);
        await logAudit(session, "product_updated", "product", payload.id, {
          isFeatured: payload.isFeatured,
        });
        break;
      case "updatePromo":
        await updatePromo(payload.id, payload.enabled, payload.percent);
        await logAudit(session, "promo_changed", "promo", payload.id, {
          enabled: payload.enabled,
          percent: payload.percent,
        });
        break;
      case "updateStatus":
        await updateStatus(payload.id, payload.status ?? "available");
        await logAudit(session, "visibility_changed", "product", payload.id, {
          status: payload.status ?? "available",
        });
        break;
      case "importBackup":
        await importBackup(payload.backup);
        break;
      case "updateHot":
        await updateHot(payload.id, payload.next);
        await logAudit(session, "stock_changed", "product", payload.id, payload.next);
        break;
      case "logOrder":
        await logOrder(payload.entry);
        await logAudit(session, "manual_sale_logged", "manual_sale", "manual_sale", payload.entry);
        break;
      case "removeOrder":
        await removeOrder(payload.id);
        break;
      case "logDailySales":
        await logDailySales(payload.entry);
        break;
      case "logMarketingEvent":
        await logMarketingEvent(payload.entry);
        break;
      default:
        return NextResponse.json(
          { message: "Acción no soportada." },
          { status: 400 }
        );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    const apiError = toApiError(error, "No se pudo escribir Google Sheets.");
    return NextResponse.json(
      apiError,
      { status: 500 }
    );
  }
}

const logAudit = async (
  session: AdminSessionUser,
  action: Parameters<typeof appendAuditEntry>[0]["action"],
  entityType: Parameters<typeof appendAuditEntry>[0]["entityType"],
  entityId: string,
  after: unknown
) => {
  await appendAuditEntry({
    ...buildAuditBase(session),
    action,
    entityType,
    entityId,
    after: JSON.stringify(after ?? {}),
  });
};
