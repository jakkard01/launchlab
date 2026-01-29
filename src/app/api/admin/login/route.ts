import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const { password } = (await request.json()) as { password?: string };
  const adminPassword = process.env.ADMIN_PASSWORD;
  const clientPassword = process.env.ADMIN_CLIENT_PASSWORD;

  if (!password) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const role =
    adminPassword && password === adminPassword
      ? "superadmin"
      : clientPassword && password === clientPassword
      ? "admin"
      : null;

  if (!role) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set("admin_auth", "1", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8,
  });
  response.cookies.set("admin_role", role, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8,
  });
  return response;
}
