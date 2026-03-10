import { NextResponse } from "next/server";

export async function POST(request: Request) {
  if (process.env.MO_ADMIN_ENABLED !== "1") {
    return NextResponse.json(
      { ok: false, message: "Acceso denegado. Admin deshabilitado." },
      { status: 403 }
    );
  }

  let password = "";
  try {
    const payload = (await request.json()) as { password?: string };
    password = payload.password ?? "";
  } catch {
    return NextResponse.json(
      { ok: false, message: "Solicitud inválida. Envía la clave en formato JSON." },
      { status: 400 }
    );
  }

  const adminPassword = process.env.ADMIN_PASSWORD ?? "";
  const adminPin = process.env.ADMIN_PIN ?? "";
  const legacyKey = process.env.MO_ADMIN_KEY ?? "";

  if (!adminPassword && !adminPin && !legacyKey) {
    return NextResponse.json(
      { ok: false, message: "Admin sin credenciales configuradas." },
      { status: 503 }
    );
  }

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
