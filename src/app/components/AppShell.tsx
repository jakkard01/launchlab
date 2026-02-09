"use client";

import { usePathname } from "next/navigation";
import ClientLayout from "./ClientLayout";
import FAB from "./FAB";
import CookieBanner from "./CookieBanner";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isMo = pathname?.startsWith("/mo");

  if (isMo) {
    return <div className="min-h-screen bg-slate-50 text-slate-900">{children}</div>;
  }

  return (
    <>
      <div
        className="fixed inset-0 -z-10 w-full h-full bg-galaxy bg-cover bg-center bg-no-repeat"
        aria-hidden="true"
      />
      <div
        className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.15),_transparent_55%),radial-gradient(circle_at_30%_70%,_rgba(14,116,144,0.25),_transparent_50%)]"
        aria-hidden="true"
      />
      <ClientLayout>{children}</ClientLayout>
      <FAB />
      <CookieBanner />
    </>
  );
}
