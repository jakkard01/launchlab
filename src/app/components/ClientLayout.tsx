"use client";
import Header from "./Header";
import { ReactNode } from "react";
import SiteFooter from "./SiteFooter";

export default function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <SiteFooter />
    </>
  );
}
