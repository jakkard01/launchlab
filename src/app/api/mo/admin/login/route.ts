import { NextResponse } from "next/server";
import {
  clearLoginAttempts,
  consumeLoginAttempt,
  createSessionToken,
  findUserForLogin,
  serializeSessionCookie,
  touchSuccessfulLogin,
  verifyPassword,
} from "../../../../../lib/mo/adminAuth";
import { appendAuditEntry, getAdminUsers } from "../../../../../lib/mo/data/securityStore";

export async function POST(request: Request) {
  if (process.env.MO_ADMIN_ENABLED !== "1") {
    return NextResponse.json(
      { ok: false, message: "Acceso denegado. Admin deshabilitado." },
      { status: 403 }
    );
  }

  let password = "";
  let identifier = "";
  try {
    const payload = (await request.json()) as {
      identifier?: string;
      password?: string;
    };
    identifier = payload.identifier ?? "";
    password = payload.password ?? "";
  } catch {
    return NextResponse.json(
      { ok: false, message: "Solicitud inválida. Envía la clave en formato JSON." },
      { status: 400 }
    );
  }

  const normalizedIdentifier = identifier.trim().toLowerCase();
  const normalizedPassword = password.trim();

  if (!normalizedIdentifier || !normalizedPassword) {
    return NextResponse.json(
      {
        ok: false,
        message: "Ingresa tu usuario o correo y una contraseña válida.",
      },
      { status: 400 }
    );
  }

  const loginKey =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown";
  const rateLimit = consumeLoginAttempt(loginKey);
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { ok: false, message: "Demasiados intentos. Espera unos minutos e intenta de nuevo." },
      { status: 429 }
    );
  }

  let users = [] as Awaited<ReturnType<typeof getAdminUsers>>;
  try {
    users = await getAdminUsers();
  } catch {
    return NextResponse.json(
      {
        ok: false,
        message:
          "El acceso admin está habilitado, pero la capa de usuarios/sesión aún no puede validar contra Sheets en este entorno.",
      },
      { status: 503 }
    );
  }
  if (users.length === 0) {
    return NextResponse.json(
      {
        ok: false,
        message:
          "No existe todavía un usuario admin interno para este entorno.",
      },
      { status: 503 }
    );
  }
  const user = await findUserForLogin(normalizedIdentifier);
  const sessionUser =
    user?.isActive && verifyPassword(normalizedPassword, user.passwordHash)
      ? {
          id: user.id,
          name: user.name,
          username: user.username,
          email: user.email,
          role: user.role,
          isActive: user.isActive,
        }
      : null;

  if (sessionUser) {
    await touchSuccessfulLogin(user.id);
  }

  if (!sessionUser) {
    await appendAuditEntry({
      actorUserId: "anonymous",
      action: "login_failed",
      entityType: "auth",
      entityId: normalizedIdentifier,
      after: JSON.stringify({ identifier: normalizedIdentifier }),
    });
    return NextResponse.json({ ok: false, message: "Credenciales incorrectas." }, { status: 401 });
  }

  clearLoginAttempts(loginKey);
  const sessionToken = createSessionToken(sessionUser);
  const response = NextResponse.json({ ok: true });
  response.cookies.set(serializeSessionCookie(sessionToken));
  await appendAuditEntry({
    actorUserId: sessionUser.id,
    action: "login_success",
    entityType: "auth",
    entityId: sessionUser.id,
    after: JSON.stringify({ role: sessionUser.role, mode: "user" }),
  });
  return response;
}
