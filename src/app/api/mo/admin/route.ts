import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import type { Product } from "../../../../lib/mo/types";
import type {
  AdminSnapshot,
  DailySalesInput,
  HotState,
  OrderLogInput,
  StockStatus,
} from "../../../../lib/mo/data/types";
import {
  getAdminSnapshot,
  getStats,
  importBackup,
  logDailySales,
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
  const message = error instanceof Error ? error.message : fallbackMessage;
  let code = "ADMIN_BACKEND_ERROR";

  if (message.includes("Google Sheets no configurado")) {
    code = "SHEETS_NOT_CONFIGURED";
  } else if (message.includes("GOOGLE_SERVICE_ACCOUNT_EMAIL no apunta")) {
    code = "SHEETS_SERVICE_ACCOUNT_PLACEHOLDER";
  } else if (message.includes("PRIVATE_KEY no tiene formato PEM válido")) {
    code = "SHEETS_PRIVATE_KEY_FORMAT";
  } else if (message.includes("PRIVATE_KEY no se pudo decodificar")) {
    code = "SHEETS_PRIVATE_KEY_INVALID";
  } else if (message.includes("account not found")) {
    code = "SHEETS_SERVICE_ACCOUNT_NOT_FOUND";
  } else if (message.includes("invalid_grant")) {
    code = "SHEETS_INVALID_GRANT";
  } else if (message.includes("No se pudo obtener token de Google Sheets")) {
    code = "SHEETS_AUTH_FAILED";
  } else if (message.includes("Unable to parse range") || message.includes("Range")) {
    code = "SHEETS_SCHEMA_RANGE_ERROR";
  } else if (message.includes("Esquema inválido")) {
    code = "SHEETS_SCHEMA_INVALID";
  }

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
  | { action: "logDailySales"; entry: DailySalesInput };

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
