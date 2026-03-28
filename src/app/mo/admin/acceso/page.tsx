import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  MO_ADMIN_SESSION_COOKIE,
  getAdminSessionFromCookieStore,
} from "../../../../lib/mo/adminAuth";
import MoAdminAccessClient from "./access-client";

export default async function MoAdminAccessPage() {
  const session = await getAdminSessionFromCookieStore(
    cookies().get(MO_ADMIN_SESSION_COOKIE)?.value
  );

  if (session) {
    redirect("/admin");
  }

  return <MoAdminAccessClient />;
}
