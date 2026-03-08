import { NextResponse } from "next/server";
import { getStoreProducts } from "../../../../lib/mo/data/sheetsStore";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  try {
    const products = await getStoreProducts();
    return NextResponse.json({ products });
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
