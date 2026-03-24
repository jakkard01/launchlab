"use client";

import { useState } from "react";
import StickyWhatsAppButton from "../StickyWhatsAppButton";
import CartButtonSticky from "./CartButtonSticky";
import CartDrawer from "./CartDrawer";

type CartUIProps = {
  isSearchMode?: boolean;
};

export default function CartUI({ isSearchMode = false }: CartUIProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <CartButtonSticky
        onOpen={() => setIsOpen(true)}
        isSearchMode={isSearchMode}
      />
      <CartDrawer isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <StickyWhatsAppButton hidden={isOpen} />
    </>
  );
}
