import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  MO_ADMIN_SESSION_COOKIE,
  getAdminSessionFromCookieStore,
  hasPermission,
} from "../../../../lib/mo/adminAuth";
import SecurityAdminClient from "./security-admin-client";

export default async function MoAdminSecurityPage() {
  const session = await getAdminSessionFromCookieStore(
    cookies().get(MO_ADMIN_SESSION_COOKIE)?.value
  );

  if (!session) {
    redirect("/admin/acceso");
  }

  if (!hasPermission(session, "users:manage")) {
    redirect("/admin");
  }

  return <SecurityAdminClient />;
}
