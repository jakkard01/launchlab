"use client";

import { useRef, ReactNode, isValidElement } from "react";

import Header from "./Header";
import Hero from "./Hero";
import CookieBanner from "./CookieBanner";
import ConsentGate from "./ConsentGate";

export default function ClientLayout({ children }: { children: ReactNode }) {
  const avatarRef = useRef<HTMLImageElement>(null);

  const isHome =
    isValidElement(children) &&
    children.type &&
    (children.type as any).name === "Home";

  return (
    <>
      {/* 1) Trackers SOLO si hay consentimiento */}
      <ConsentGate />

      {/* 2) UI normal */}
      <Header avatarRef={avatarRef} />
      {isHome ? <Hero ref={avatarRef} /> : children}

      {/* 3) Banner siempre al final (overlay) */}
      <CookieBanner />
    </>
  );
}
