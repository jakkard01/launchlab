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
  AdminSnapshot,
  AdminSessionUser,
  DailySalesInput,
  HotState,
  MarketingEventInput,
  OrderLogInput,
  ProductAdminSaveInput,
  StockStatus,
} from "../../../../lib/mo/data/types";
import {
  getAdminSnapshot,
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
import { appendAuditEntry } from "../../../../lib/mo/data/securityStore";

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
    return NextResponse.json(snapshot);
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
        await saveProductDraft(payload.input);
        await logAudit(session, "product_updated", "product", payload.input.id, payload.input);
        break;
      case "updateStock":
        await updateStock(payload.id, payload.status);
        await logAudit(session, "stock_changed", "stock", payload.id, {
          stockStatus: payload.status,
        });
        break;
      case "updatePrice":
        await updatePrice(payload.id, payload.price);
        await logAudit(session, "price_changed", "product", payload.id, {
          price: payload.price,
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
    actorUserId: session.id,
    action,
    entityType,
    entityId,
    after: JSON.stringify(after ?? {}),
  });
};
