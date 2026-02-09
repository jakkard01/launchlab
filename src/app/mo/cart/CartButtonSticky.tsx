"use client";

import { useCart } from "./CartContext";

type CartButtonStickyProps = {
  onOpen: () => void;
};

export default function CartButtonSticky({ onOpen }: CartButtonStickyProps) {
  const { totalItems } = useCart();

  if (totalItems === 0) {
    return (
      <div className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] left-0 right-0 z-50 flex justify-center px-4">
        <div className="flex w-full max-w-sm items-center justify-center rounded-full border border-slate-200 bg-white px-5 py-3 text-xs font-semibold text-slate-600 shadow-md">
          Agrega productos para armar tu pedido
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] left-0 right-0 z-50 flex justify-center px-4">
      <div className="flex w-full max-w-sm items-center justify-between gap-3 rounded-full border border-emerald-200 bg-white px-4 py-2 shadow-lg">
        <span className="text-xs font-semibold text-slate-700">
          Tu pedido: {totalItems} productos
        </span>
        <button
          type="button"
          onClick={onOpen}
          className="h-10 rounded-full bg-emerald-600 px-4 text-xs font-semibold text-white transition hover:bg-emerald-700"
          aria-label="Enviar pedido por WhatsApp"
        >
          Enviar por WhatsApp
        </button>
      </div>
    </div>
  );
}
