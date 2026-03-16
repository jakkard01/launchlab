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
        <div className="flex w-full max-w-sm items-center justify-center rounded-full border border-default bg-surface px-5 py-3 text-center text-xs font-semibold text-muted-strong shadow-md dark:bg-[var(--surface-2)] dark:shadow-[0_18px_36px_rgba(3,8,16,0.28)]">
          Elige productos y resuelve tu retiro en minutos
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-[max(0.75rem,env(safe-area-inset-bottom))] left-0 right-0 z-50 flex justify-center px-4">
      <div className="flex w-full max-w-sm items-center justify-between gap-3 rounded-2xl border border-[var(--accent)]/30 bg-surface px-4 py-3 shadow-lg dark:bg-[var(--surface-2)] dark:shadow-[0_22px_44px_rgba(3,8,16,0.34)]">
        <div className="flex flex-col">
          <span className="text-xs font-semibold text-main">
            {totalItems} items · {totalLabel}
          </span>
          <span className="text-[11px] text-muted-strong">
            Te confirmamos antes de salir
          </span>
        </div>
        <button
          type="button"
          onClick={onOpen}
          className="min-h-[48px] rounded-full bg-[var(--accent)] px-5 text-sm font-semibold text-[#07130c] transition hover:opacity-90"
          aria-label="Completar pedido en WhatsApp"
        >
          Confirmar pedido
        </button>
      </div>
    </div>
  );
}
