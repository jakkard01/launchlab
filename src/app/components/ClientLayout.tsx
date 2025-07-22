"use client";

import React, { useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Header from "./Header";
import IntroOverlay from "./IntroOverlay";
import Hero from './Hero';



export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [showIntro, setShowIntro] = useState(true);
  const avatarRef = useRef<HTMLImageElement>(null);
  const pathname = usePathname();

  return (
    <>
      {/* Header recibe opcionalmente avatarRef pero no lo usa internamente */}
      <Header avatarRef={avatarRef} />

      {/* Si la ruta es "/" (home), muestran el Hero con ref, sino renderizan los children */}
      {pathname === "/" ? <Hero ref={avatarRef} /> : children}

      {/* Overlay de intro */}
      {showIntro && <IntroOverlay onSkip={() => setShowIntro(false)} />}
    </>
  );
}
