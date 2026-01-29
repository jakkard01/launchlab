import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const isAdmin = cookies().get("admin_auth")?.value === "1";
  const role = cookies().get("admin_role")?.value ?? null;
  return NextResponse.json({ isAdmin, role });
}
