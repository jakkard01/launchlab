"use client";

import { useState } from "react";
import CartButtonSticky from "./CartButtonSticky";
import CartDrawer from "./CartDrawer";

export default function CartUI() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <CartButtonSticky onOpen={() => setIsOpen(true)} />
      <CartDrawer isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
