"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import ClientLayout from "./ClientLayout";
import FAB from "./FAB";
import CookieBanner from "./CookieBanner";

export default function AppShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isRysHost, setIsRysHost] = useState(false);
  const isHome = pathname === "/";
  const isMo =
    pathname?.startsWith("/mo") ||
    pathname?.startsWith("/RYSminisuper");
  const isMoAdmin = pathname?.startsWith("/admin");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const host = window.location.hostname.toLowerCase();
    setIsRysHost(host === "rysminimarket.com" || host === "www.rysminimarket.com");
  }, []);

  if (isHome || isMo || isMoAdmin || isRysHost) {
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
