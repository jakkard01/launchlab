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
    return <div className="min-h-screen bg-slate-50 text-slate-900">{children}</div>;
  }

  return (
    <>
      <ClientLayout>{children}</ClientLayout>
      <FAB />
      <CookieBanner />
    </>
  );
}
