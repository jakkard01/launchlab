import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  MO_ADMIN_SESSION_COOKIE,
  clearAdminSessionCookies,
  getAdminSessionFromCookieStore,
} from "../../../../../lib/mo/adminAuth";
import { appendAuditEntry } from "../../../../../lib/mo/data/securityStore";

export async function POST() {
  const session = await getAdminSessionFromCookieStore(
    cookies().get(MO_ADMIN_SESSION_COOKIE)?.value
  );

  if (session) {
    await appendAuditEntry({
      actorUserId: session.id,
      action: "logout",
      entityType: "auth",
      entityId: session.id,
      after: JSON.stringify({ role: session.role, legacy: Boolean(session.isLegacy) }),
    });
  }

  const response = NextResponse.json({ ok: true });
  clearAdminSessionCookies().forEach((cookie) => response.cookies.set(cookie));
  return response;
}
