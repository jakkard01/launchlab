"use client";

import React, { MutableRefObject } from "react";
import Link from "next/link";

interface HeaderProps {
  /**  
   * Ref opcional que recibe ClientLayout.  
   * No es necesario usarla dentro del Header,  
   * pero debe declararse para que TypeScript la reconozca.  
   */
  avatarRef?: MutableRefObject<HTMLImageElement | null>;
}

export default function Header({ avatarRef }: HeaderProps) {
  return (
    <header className="fixed top-0 inset-x-0 z-[50] bg-black/70 backdrop-blur flex items-center justify-between px-6 py-4">
      {/* Logo */}
      <Link href="/" className="font-bold text-cyan-400">
        Powered by IA
      </Link>
    </header>
  );
}
