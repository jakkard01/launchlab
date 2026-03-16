import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  MO_ADMIN_SESSION_COOKIE,
  getAdminSessionFromCookieStore,
  hasPermission,
} from "../../../../../lib/mo/adminAuth";
import {
  appendAuditEntry,
  createAdminUser,
  getAdminUsers,
  getAdminUserById,
  updateAdminUser,
} from "../../../../../lib/mo/data/securityStore";

const getSession = async () =>
  getAdminSessionFromCookieStore(cookies().get(MO_ADMIN_SESSION_COOKIE)?.value);

const toSafeUser = (user: Awaited<ReturnType<typeof createAdminUser>>) => ({
  id: user.id,
  name: user.name,
  username: user.username,
  email: user.email,
  role: user.role,
  isActive: user.isActive,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
  lastLoginAt: user.lastLoginAt,
});

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  if (!hasPermission(session, "users:manage")) {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  const users = await getAdminUsers();
  return NextResponse.json({ users: users.map(toSafeUser) });
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  if (!hasPermission(session, "users:manage")) {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  const payload = (await request.json()) as {
    name?: string;
    username?: string;
    email?: string;
    password?: string;
    role?: "owner" | "admin" | "operator" | "viewer";
    isActive?: boolean;
  };

  if (!payload.name?.trim() || !payload.password?.trim() || !payload.role) {
    return NextResponse.json(
      { message: "Nombre, contraseña y rol son obligatorios." },
      { status: 400 }
    );
  }

  const user = await createAdminUser({
    name: payload.name,
    username: payload.username,
    email: payload.email,
    password: payload.password,
    role: payload.role,
    isActive: payload.isActive,
  });

  await appendAuditEntry({
    actorUserId: session.id,
    action: "user_created",
    entityType: "user",
    entityId: user.id,
    after: JSON.stringify({ role: user.role, username: user.username, email: user.email }),
  });

  return NextResponse.json({ ok: true, user: toSafeUser(user) });
}

export async function PATCH(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  if (!hasPermission(session, "users:manage")) {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  const payload = (await request.json()) as {
    id?: string;
    name?: string;
    username?: string;
    email?: string;
    password?: string;
    role?: "owner" | "admin" | "operator" | "viewer";
    isActive?: boolean;
  };

  if (!payload.id) {
    return NextResponse.json({ message: "Falta id de usuario." }, { status: 400 });
  }

  const before = await getAdminUserById(payload.id);
  if (!before) {
    return NextResponse.json({ message: "Usuario no encontrado." }, { status: 404 });
  }
  const updated = await updateAdminUser({
    id: payload.id,
    name: payload.name,
    username: payload.username,
    email: payload.email,
    password: payload.password,
    role: payload.role,
    isActive: payload.isActive,
  });
  const action =
    payload.role && payload.role !== before.role
      ? "role_changed"
      : payload.isActive === false && before.isActive
        ? "user_deactivated"
        : "user_created";

  await appendAuditEntry({
    actorUserId: session.id,
    action,
    entityType: "user",
    entityId: updated.id,
    before: JSON.stringify({
      role: before.role,
      isActive: before.isActive,
      username: before.username,
      email: before.email,
    }),
    after: JSON.stringify({
      role: updated.role,
      isActive: updated.isActive,
      username: updated.username,
      email: updated.email,
    }),
  });

  return NextResponse.json({ ok: true, user: toSafeUser(updated) });
}
