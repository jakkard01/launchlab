import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const RYS_HOSTS = new Set(["rysminimarket.com", "www.rysminimarket.com"]);

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const hostHeader = req.headers.get("host") ?? "";
  const hostname = hostHeader.split(":")[0].toLowerCase();

  if (RYS_HOSTS.has(hostname)) {
    if (pathname === "/") {
      const rewriteUrl = req.nextUrl.clone();
      rewriteUrl.pathname = "/RYSminisuper";
      return NextResponse.rewrite(rewriteUrl);
    }

    if (pathname === "/admin" || pathname.startsWith("/admin/")) {
      const rewriteUrl = req.nextUrl.clone();
      rewriteUrl.pathname = `/RYSminisuper${pathname}`;
      return NextResponse.rewrite(rewriteUrl);
    }
  }

  if (pathname.startsWith("/mo")) {
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = pathname.replace(/^\/mo/, "/RYSminisuper");
    return NextResponse.redirect(redirectUrl, 308);
  }

  if (pathname.startsWith("/RYSminisuper/admin")) {
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
      new URL("/RYSminisuper/admin/acceso", req.url)
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
