"use client";

import { usePathname } from "next/navigation";
import ClientLayout from "./ClientLayout";
import FAB from "./FAB";
import CookieBanner from "./CookieBanner";

export default function AppShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isMo =
    pathname?.startsWith("/mo") ||
    pathname?.startsWith("/RYSminisuper");

  if (isHome || isMo) {
    return <div className="min-h-screen bg-base text-main">{children}</div>;
  }

  return (
    <>
      <div className="pbia-shell relative min-h-screen bg-galaxy-shell">
        <ClientLayout>{children}</ClientLayout>
      </div>
      <div className="pbia-fab">
        <FAB />
      </div>
      <div className="pbia-cookie">
        <CookieBanner />
      </div>
    </>
  );
}
