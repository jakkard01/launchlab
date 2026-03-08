import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

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

    const cookie = req.cookies.get("mo_admin")?.value;
    if (cookie) {
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
  matcher: ["/prompts/:path*", "/mo/:path*", "/RYSminisuper/admin/:path*"],
};
