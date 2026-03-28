import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  MO_ADMIN_SESSION_COOKIE,
  getAdminSessionFromCookieStore,
} from "../../../lib/mo/adminAuth";
import AdminClient from "./AdminClient";

export default async function MoAdminPage() {
  const session = await getAdminSessionFromCookieStore(
    cookies().get(MO_ADMIN_SESSION_COOKIE)?.value
  );

  if (!session) {
    redirect("/admin/acceso");
  }

  return <AdminClient />;
}
