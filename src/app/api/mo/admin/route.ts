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
  updatePrice,
  updatePromo,
  updateStatus,
  updateStock,
} from "../../../../lib/mo/data/sheetsStore";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const isMoAdmin = () => cookies().get("mo_admin")?.value === "1";

type AdminAction =
  | { action: "updateStock"; id: string; status: StockStatus }
  | { action: "updatePrice"; id: string; price: string }
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
    return NextResponse.json(
      {
        message:
          error instanceof Error ? error.message : "No se pudo leer Google Sheets.",
      },
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
    return NextResponse.json(
      {
        message:
          error instanceof Error ? error.message : "No se pudo escribir Google Sheets.",
      },
      { status: 500 }
    );
  }
}
