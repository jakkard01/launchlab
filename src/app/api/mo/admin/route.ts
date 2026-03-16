import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  getMoBackendErrorCode,
  getMoBackendErrorMessage,
} from "../../../../lib/mo/data/backendError";
import type { Product } from "../../../../lib/mo/types";
import type {
  AdminSnapshot,
  DailySalesInput,
  HotState,
  MarketingEventInput,
  OrderLogInput,
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
  updateFeatured,
  updateHot,
  updateImage,
  updatePrice,
  updatePromo,
  updateSortOrder,
  updateStatus,
  updateStock,
} from "../../../../lib/mo/data/sheetsStore";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const isMoAdmin = () => cookies().get("mo_admin")?.value === "1";

const toApiError = (error: unknown, fallbackMessage: string) => {
  const message = getMoBackendErrorMessage(error, fallbackMessage);
  const code = getMoBackendErrorCode(error, "ADMIN_BACKEND_ERROR");

  return { message, code };
};

type AdminAction =
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
  if (!isMoAdmin()) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const url = new URL(request.url);
    if (url.searchParams.get("view") === "stats") {
      const stats = await getStats();
      return NextResponse.json({ stats });
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
  if (!isMoAdmin()) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const payload = (await request.json()) as AdminAction;

    switch (payload.action) {
      case "updateStock":
        await updateStock(payload.id, payload.status);
        break;
      case "updatePrice":
        await updatePrice(payload.id, payload.price);
        break;
      case "updateImage":
        await updateImage(payload.id, payload.image);
        break;
      case "updateSortOrder":
        await updateSortOrder(payload.id, payload.sortOrder);
        break;
      case "updateFeatured":
        await updateFeatured(payload.id, payload.isFeatured);
        break;
      case "updatePromo":
        await updatePromo(payload.id, payload.enabled, payload.percent);
        break;
      case "updateStatus":
        await updateStatus(payload.id, payload.status ?? "available");
        break;
      case "importBackup":
        await importBackup(payload.backup);
        break;
      case "updateHot":
        await updateHot(payload.id, payload.next);
        break;
      case "logOrder":
        await logOrder(payload.entry);
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
