import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { password } = (await request.json()) as { password?: string };
  const adminPassword = process.env.ADMIN_PASSWORD ?? "";
  const adminPin = process.env.ADMIN_PIN ?? "";
  const legacyKey = process.env.MO_ADMIN_KEY ?? "";

  const isValid =
    (adminPassword.length > 0 && password === adminPassword) ||
    (adminPin.length > 0 && password === adminPin) ||
    (legacyKey.length > 0 && password === legacyKey);

  if (!isValid) {
    return NextResponse.json(
      { ok: false, message: "Clave incorrecta." },
      { status: 401 }
    );
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set("mo_admin", "1", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8,
  });
  return response;
}
