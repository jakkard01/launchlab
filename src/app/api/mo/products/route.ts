import { NextResponse } from "next/server";
import {
  getMoBackendErrorCode,
  getMoBackendErrorMessage,
} from "../../../../lib/mo/data/backendError";
import { getStoreProducts } from "../../../../lib/mo/data/sheetsStore";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  try {
    const products = await getStoreProducts();
    return NextResponse.json(
      { products },
      {
        headers: {
          "Cache-Control": "s-maxage=15, stale-while-revalidate=60",
        },
      }
    );
  } catch (error) {
    const message = getMoBackendErrorMessage(
      error,
      "No se pudo leer Google Sheets."
    );
    const code = getMoBackendErrorCode(error, "SHEETS_READ_FAILED");

    return NextResponse.json(
      {
        code,
        message,
      },
      { status: 500 }
    );
  }
}
