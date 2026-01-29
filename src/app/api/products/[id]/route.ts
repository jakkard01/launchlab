import { NextResponse } from "next/server";
import { getProductsAdapter } from "../../../../lib/products";
import type { ProductInput } from "../../../../lib/products/adapter";
import { cookies } from "next/headers";

const isAdmin = () => cookies().get("admin_auth")?.value === "1";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const adapter = await getProductsAdapter();
  const product = await adapter.get(params.id);
  if (!product) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ product });
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  if (!isAdmin()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const adapter = await getProductsAdapter();
  const payload = (await request.json()) as ProductInput;
  const product = await adapter.update(params.id, payload);
  return NextResponse.json({ product });
}

export async function DELETE(
  _: Request,
  { params }: { params: { id: string } }
) {
  if (!isAdmin()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const adapter = await getProductsAdapter();
  await adapter.remove(params.id);
  return NextResponse.json({ ok: true });
}
