"use client";
import Header from "./Header";
import { useRef, ReactNode, isValidElement } from "react";
import Hero from "./Hero";

export default function ClientLayout({ children }: { children: ReactNode }) {
  const avatarRef = useRef<HTMLImageElement>(null);

  const isHome =
    isValidElement(children) && children.type && (children.type as any).name === "Home";

  return (
    <>
      <Header avatarRef={avatarRef} />
      {/* Si la página es Home, renderiza Hero con ref, si no, renderiza children normalmente */}
      {isHome ? <Hero ref={avatarRef} /> : children}
    </>
  );
}
