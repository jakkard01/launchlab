"use client";
import Header from "./Header";
import { ReactNode } from "react";
import SiteFooter from "./SiteFooter";

export default function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="pbia-header">
        <Header />
      </div>
      {children}
      <div className="pbia-footer">
        <SiteFooter />
      </div>
    </>
  );
}
