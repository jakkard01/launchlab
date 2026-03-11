"use client";

import { usePathname } from "next/navigation";
import ClientLayout from "./ClientLayout";
import FAB from "./FAB";
import CookieBanner from "./CookieBanner";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isMo =
    pathname?.startsWith("/mo") ||
    pathname?.startsWith("/RYSminisuper");

  if (isMo) {
    return <div className="min-h-screen bg-base text-main">{children}</div>;
  }

  return (
    <>
      <ClientLayout>{children}</ClientLayout>
      <FAB />
      <CookieBanner />
    </>
  );
}
