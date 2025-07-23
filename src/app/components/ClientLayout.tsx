"use client";
import Header from "./Header";
import { useRef } from "react";
import Hero from "./Hero";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const avatarRef = useRef<HTMLImageElement>(null);
  return (
    <>
      <Header avatarRef={avatarRef} />
      {/* Si la página es Home, renderiza Hero con ref, si no, renderiza children normalmente */}
      {children.type && children.type.name === 'Home'
        ? <Hero ref={avatarRef} />
        : children}
    </>
  );
} 