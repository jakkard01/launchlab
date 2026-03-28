import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const RYS_HOSTS = new Set(["rysminimarket.com", "www.rysminimarket.com"]);

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const hostHeader = req.headers.get("host") ?? "";
  const hostname = hostHeader.split(":")[0].toLowerCase();

  if (RYS_HOSTS.has(hostname)) {
    if (
      pathname === "/acces" ||
      pathname === "/admin/acces" ||
      pathname === "/mo/admin/acces" ||
      pathname === "/RYSminisuper/admin/acces"
    ) {
      const redirectUrl = req.nextUrl.clone();
      redirectUrl.pathname = "/admin/acceso";
      return NextResponse.redirect(redirectUrl, 307);
    }

    if (pathname === "/") {
      const rewriteUrl = req.nextUrl.clone();
      rewriteUrl.pathname = "/mo";
      return NextResponse.rewrite(rewriteUrl);
    }

    if (pathname === "/admin" || pathname.startsWith("/admin/")) {
      const rewriteUrl = req.nextUrl.clone();
      rewriteUrl.pathname = `/mo${pathname}`;
      return NextResponse.rewrite(rewriteUrl);
    }

    if (pathname === "/RYSminisuper" || pathname.startsWith("/RYSminisuper/")) {
      const redirectUrl = req.nextUrl.clone();
      redirectUrl.pathname = pathname.replace(/^\/RYSminisuper/, "/mo");
      return NextResponse.redirect(redirectUrl, 308);
    }
  }

  if (!RYS_HOSTS.has(hostname) && pathname.startsWith("/mo")) {
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = pathname.replace(/^\/mo/, "/RYSminisuper");
    return NextResponse.redirect(redirectUrl, 308);
  }

  if (
    pathname.startsWith("/RYSminisuper/admin") ||
    pathname.startsWith("/mo/admin")
  ) {
    const enabled = process.env.MO_ADMIN_ENABLED === "1";
    if (!enabled) {
      return new Response("Not Found", { status: 404 });
    }

    const legacyCookie = req.cookies.get("mo_admin")?.value;
    const sessionCookie = req.cookies.get("mo_admin_session")?.value;
    if (legacyCookie || sessionCookie) {
      return NextResponse.next();
    }

    return NextResponse.rewrite(
      new URL("/mo/admin/acceso", req.url)
    );
  }

  if (pathname === "/prompts" || pathname.startsWith("/prompts/")) {
    return new Response("Not Found", { status: 404 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|site.webmanifest|.*\\..*).*)"],
};
