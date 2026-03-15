"use client";

import { useState } from "react";
import type { Product } from "../../../lib/mo/types";
import CartButtonSticky from "./CartButtonSticky";
import CartDrawer from "./CartDrawer";

type CartUIProps = {
  products: Product[];
};

export default function CartUI({ products }: CartUIProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <CartButtonSticky onOpen={() => setIsOpen(true)} />
      <CartDrawer
        products={products}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
}
