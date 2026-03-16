import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  MO_ADMIN_SESSION_COOKIE,
  adminPermissions,
  getAdminSessionFromCookieStore,
} from "../../../../../lib/mo/adminAuth";

export async function GET() {
  const session = await getAdminSessionFromCookieStore(
    cookies().get(MO_ADMIN_SESSION_COOKIE)?.value
  );

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({
    user: session,
    permissions: Array.from(adminPermissions[session.role]),
  });
}
