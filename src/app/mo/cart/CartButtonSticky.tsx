"use client";

import { useEffect, useRef, useState } from "react";
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
  const [isPeeked, setIsPeeked] = useState(false);
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  const [isHiddenWhileReading, setIsHiddenWhileReading] = useState(false);
  const idleTimerRef = useRef<number | null>(null);

  useEffect(() => {
    let lastY = window.scrollY;

    const onScroll = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastY;
      const scrollingDown = delta > 8;
      const scrollingUp = delta < -8;
      const nearTop = currentY < 760;

      setIsCompact(currentY > 520 || isSearchMode);

      if (!isSearchMode && currentY > 900 && scrollingDown) {
        setIsPeeked(true);
      } else if (currentY < 620 || scrollingUp) {
        setIsPeeked(false);
      }

      if (idleTimerRef.current) {
        window.clearTimeout(idleTimerRef.current);
      }

      if (isSearchMode || nearTop) {
        setIsHiddenWhileReading(true);
      } else if (scrollingDown) {
        setIsHiddenWhileReading(true);
      } else if (scrollingUp) {
        setIsHiddenWhileReading(false);
      }

      idleTimerRef.current = window.setTimeout(() => {
        setIsHiddenWhileReading(window.scrollY < 760 && !isSearchMode);
      }, 180);

      lastY = currentY;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (idleTimerRef.current) {
        window.clearTimeout(idleTimerRef.current);
      }
    };
  }, [isSearchMode]);

  useEffect(() => {
    const viewport = window.visualViewport;
    if (!viewport) return;

    const updateKeyboardState = () => {
      setKeyboardOpen(viewport.height < window.innerHeight - 120);
    };

    updateKeyboardState();
    viewport.addEventListener("resize", updateKeyboardState);
    return () => viewport.removeEventListener("resize", updateKeyboardState);
  }, []);

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

  if (totalItems === 0 || keyboardOpen) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed bottom-[max(0.95rem,env(safe-area-inset-bottom))] left-0 right-0 z-50 flex justify-center px-3 sm:px-4">
      <div
        className={`pointer-events-auto flex w-full max-w-[17.25rem] items-center justify-between gap-2 border border-[var(--accent)]/24 bg-[color-mix(in_srgb,var(--surface)_94%,transparent)] shadow-[0_10px_24px_rgba(15,24,38,0.12)] backdrop-blur-md transition-all duration-200 dark:bg-[color-mix(in_srgb,var(--surface-2)_92%,transparent)] dark:shadow-[0_18px_34px_rgba(3,8,16,0.3)] ${
          isCompact ? "rounded-full px-2.5 py-1.5" : "rounded-2xl px-2.5 py-1.5"
        } ${
          isHiddenWhileReading
            ? "translate-y-20 opacity-0"
            : isPeeked
              ? "translate-y-3 opacity-95"
              : "translate-y-0 opacity-100"
        }`}
      >
        <div className="flex min-w-0 flex-col">
          <span className="truncate text-[11px] font-semibold leading-tight text-main">
            {totalItems} producto{totalItems === 1 ? "" : "s"}
          </span>
          <span className="truncate text-[10px] leading-tight text-muted-strong">
            {isCompact ? totalLabel.replace("Total est. ", "") : totalLabel}
          </span>
        </div>
        <button
          type="button"
          onClick={onOpen}
          className={`rounded-full bg-[var(--accent)] font-semibold text-[#07130c] transition hover:opacity-90 ${
            isCompact ? "min-h-[32px] px-3 text-[11px]" : "min-h-[34px] px-3 text-[11px]"
          }`}
          aria-label="Completar pedido en WhatsApp"
        >
          Ver
        </button>
      </div>
    </div>
  );
}
