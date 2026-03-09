import { NextResponse } from "next/server";
import { getStoreProducts } from "../../../../lib/mo/data/sheetsStore";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  try {
    const products = await getStoreProducts();
    return NextResponse.json({ products });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "No se pudo leer Google Sheets.";
    const code = message.includes("account not found")
      ? "SHEETS_SERVICE_ACCOUNT_NOT_FOUND"
      : message.includes("GOOGLE_SERVICE_ACCOUNT_EMAIL no apunta")
        ? "SHEETS_SERVICE_ACCOUNT_PLACEHOLDER"
        : message.includes("PRIVATE_KEY no tiene formato PEM válido")
          ? "SHEETS_PRIVATE_KEY_FORMAT"
          : message.includes("PRIVATE_KEY no se pudo decodificar")
            ? "SHEETS_PRIVATE_KEY_INVALID"
            : message.includes("invalid_grant")
              ? "SHEETS_INVALID_GRANT"
              : "SHEETS_READ_FAILED";

    return NextResponse.json(
      {
        code,
        message,
      },
      { status: 500 }
    );
  }
}
