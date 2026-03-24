"use client";

import { useEffect, useState } from "react";
import { useCart } from "./cart/CartContext";
import { buildWhatsAppMessageLink } from "../../lib/mo/whatsapp";
import { MO_BRAND } from "../../lib/mo/config";

type StickyWhatsAppButtonProps = {
  hidden?: boolean;
};

export default function StickyWhatsAppButton({
  hidden = false,
}: StickyWhatsAppButtonProps) {
  const { totalItems } = useCart();
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  const message = `Hola ${MO_BRAND.currentDisplayName}, quiero hacer un pedido para retiro.`;
  const whatsappLink = buildWhatsAppMessageLink(message);

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

  if (totalItems > 0 || hidden || keyboardOpen) {
    return null;
  }

  return (
    <div className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] left-0 right-0 z-50 flex justify-center px-4 sm:hidden">
      <a
        href={whatsappLink}
        className="flex min-h-[56px] w-full max-w-sm items-center justify-center rounded-2xl border border-[var(--accent)] bg-[var(--accent)] px-6 py-3 text-center text-sm font-semibold text-[#07130c] shadow-lg transition hover:opacity-90"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Abrir WhatsApp para pedido retiro"
      >
        Pide por WhatsApp
      </a>
    </div>
  );
}
