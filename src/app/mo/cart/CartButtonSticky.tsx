"use client";

import { useCart } from "./CartContext";

type CartButtonStickyProps = {
  onOpen: () => void;
};

export default function CartButtonSticky({ onOpen }: CartButtonStickyProps) {
  const { totalItems } = useCart();

  return (
    <div className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] left-0 right-0 z-50 flex justify-center px-4">
      <button
        type="button"
        onClick={onOpen}
        className="h-12 w-full max-w-sm rounded-full bg-emerald-600 px-6 text-center text-sm font-semibold text-white shadow-lg transition hover:bg-emerald-700"
        aria-label="Ver pedido"
      >
        Ver pedido ({totalItems})
      </button>
    </div>
  );
}
