import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  MO_ADMIN_SESSION_COOKIE,
  getAdminSessionFromCookieStore,
  hasPermission,
} from "../../../../../lib/mo/adminAuth";
import { getAuditEntries } from "../../../../../lib/mo/data/securityStore";

export async function GET() {
  const session = await getAdminSessionFromCookieStore(
    cookies().get(MO_ADMIN_SESSION_COOKIE)?.value
  );

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  if (!hasPermission(session, "audit:view")) {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  const entries = await getAuditEntries(250);
  return NextResponse.json({ entries });
}
