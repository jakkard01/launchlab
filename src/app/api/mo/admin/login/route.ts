import { NextResponse } from "next/server";
import {
  clearLoginAttempts,
  consumeLoginAttempt,
  createSessionToken,
  findUserForLogin,
  getLegacyOwnerSession,
  serializeLegacyCompatCookie,
  serializeSessionCookie,
  touchSuccessfulLogin,
  verifyLegacySharedPassword,
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
  const hasRealUsers = users.length > 0;

  if (!hasRealUsers && !verifyLegacySharedPassword(password)) {
    return NextResponse.json(
      {
        ok: false,
        message:
          "No existe todavía un usuario real o la clave temporal no fue aceptada.",
      },
      { status: 401 }
    );
  }

  let sessionUser = null;
  let loginMode: "user" | "legacy" = "legacy";

  if (identifier.trim()) {
    const user = await findUserForLogin(identifier);
    if (user?.isActive && verifyPassword(password, user.passwordHash)) {
      sessionUser = {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
        role: user.role,
        isActive: user.isActive,
      };
      loginMode = "user";
      await touchSuccessfulLogin(user.id);
    }
  }

  if (!sessionUser && verifyLegacySharedPassword(password)) {
    sessionUser = getLegacyOwnerSession();
    loginMode = "legacy";
  }

  if (!sessionUser) {
    await appendAuditEntry({
      actorUserId: "anonymous",
      action: "login_failed",
      entityType: "auth",
      entityId: identifier.trim().toLowerCase() || "shared-password",
      after: JSON.stringify({ identifier: identifier.trim().toLowerCase() || null }),
    });
    return NextResponse.json({ ok: false, message: "Credenciales incorrectas." }, { status: 401 });
  }

  clearLoginAttempts(loginKey);
  const sessionToken = createSessionToken(sessionUser);
  const response = NextResponse.json({ ok: true });
  response.cookies.set(serializeSessionCookie(sessionToken));
  response.cookies.set(serializeLegacyCompatCookie());
  await appendAuditEntry({
    actorUserId: sessionUser.id,
    action: "login_success",
    entityType: "auth",
    entityId: sessionUser.id,
    after: JSON.stringify({ role: sessionUser.role, mode: loginMode }),
  });
  return response;
}
