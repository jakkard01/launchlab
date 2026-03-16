"use client";

import { useEffect, useState } from "react";
import { useCart } from "./CartContext";

type CartButtonStickyProps = {
  onOpen: () => void;
  isSearchMode?: boolean;
};

export default function CartButtonSticky({
  onOpen,
  isSearchMode = false,
}: CartButtonStickyProps) {
  const { totalItems, items } = useCart();
  const [isCompact, setIsCompact] = useState(isSearchMode);

  useEffect(() => {
    const onScroll = () => {
      setIsCompact(window.scrollY > 240 || isSearchMode);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isSearchMode]);

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
    return null;
  }

  return (
    <div className="fixed bottom-[max(0.65rem,env(safe-area-inset-bottom))] left-0 right-0 z-50 flex justify-center px-4">
      <div
        className={`flex w-full max-w-sm items-center justify-between gap-3 border border-[var(--accent)]/28 bg-[color-mix(in_srgb,var(--surface)_92%,transparent)] shadow-lg backdrop-blur-md transition-all dark:bg-[color-mix(in_srgb,var(--surface-2)_92%,transparent)] dark:shadow-[0_22px_44px_rgba(3,8,16,0.34)] ${
          isCompact ? "rounded-full px-3 py-2.5" : "rounded-2xl px-4 py-3"
        }`}
      >
        <div className="flex min-w-0 flex-col">
          <span className="truncate text-xs font-semibold text-main">
            {totalItems} items · {totalLabel}
          </span>
          {!isCompact ? (
            <span className="text-[11px] text-muted-strong">
              Te confirmamos antes de salir
            </span>
          ) : null}
        </div>
        <button
          type="button"
          onClick={onOpen}
          className={`rounded-full bg-[var(--accent)] font-semibold text-[#07130c] transition hover:opacity-90 ${
            isCompact ? "min-h-[40px] px-4 text-xs" : "min-h-[48px] px-5 text-sm"
          }`}
          aria-label="Completar pedido en WhatsApp"
        >
          {isCompact ? "Ver pedido" : "Confirmar pedido"}
        </button>
      </div>
    </div>
  );
}
