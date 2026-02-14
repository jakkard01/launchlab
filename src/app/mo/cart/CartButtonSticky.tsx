"use client";

import { useCart } from "./CartContext";

type CartButtonStickyProps = {
  onOpen: () => void;
};

export default function CartButtonSticky({ onOpen }: CartButtonStickyProps) {
  const { totalItems, items } = useCart();

  let allPriced = true;
  const totalEstimate = items.reduce((sum, item) => {
    if (!item.price) {
      allPriced = false;
      return sum;
    }
    const numeric = Number(item.price.replace(/[^0-9.]/g, ""));
    if (!Number.isFinite(numeric)) {
      allPriced = false;
      return sum;
    }
    return sum + numeric * item.qty;
  }, 0);

  const totalLabel = allPriced
    ? `Total est. $${totalEstimate.toFixed(2)}`
    : "Total est. por confirmar";

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
    <div className="fixed bottom-[max(0.75rem,env(safe-area-inset-bottom))] left-0 right-0 z-50 flex justify-center px-4">
      <div className="flex w-full max-w-sm items-center justify-between gap-3 rounded-2xl border border-emerald-200 bg-white px-4 py-3 shadow-lg">
        <div className="flex flex-col">
          <span className="text-xs font-semibold text-slate-700">
            {totalItems} items · {totalLabel}
          </span>
          <span className="text-[11px] text-slate-500">
            Pedido listo para retiro
          </span>
        </div>
        <button
          type="button"
          onClick={onOpen}
          className="h-12 rounded-full bg-emerald-600 px-5 text-sm font-semibold text-white transition hover:bg-emerald-700"
          aria-label="Completar pedido en WhatsApp"
        >
          Completar pedido
        </button>
      </div>
    </div>
  );
}
