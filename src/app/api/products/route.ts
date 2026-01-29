import { NextResponse } from "next/server";
import { getProductsAdapter } from "../../../lib/products";
import type { ProductInput } from "../../../lib/products/adapter";
import { cookies } from "next/headers";

const isAdmin = () => cookies().get("admin_auth")?.value === "1";

export async function GET() {
  const adapter = await getProductsAdapter();
  const products = await adapter.list();
  return NextResponse.json({ products });
}

export async function POST(request: Request) {
  if (!isAdmin()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const adapter = await getProductsAdapter();
  const payload = (await request.json()) as ProductInput;
  const product = await adapter.create(payload);
  return NextResponse.json({ product }, { status: 201 });
}
