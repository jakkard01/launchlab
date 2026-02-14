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

    const key = req.nextUrl.searchParams.get("key");
    const expectedKey = process.env.MO_ADMIN_KEY ?? "";
    if (key && expectedKey && key === expectedKey) {
      const redirectUrl = req.nextUrl.clone();
      redirectUrl.searchParams.delete("key");

      const res = NextResponse.redirect(redirectUrl);
      res.cookies.set("mo_admin", "1", {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
      });
      return res;
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
