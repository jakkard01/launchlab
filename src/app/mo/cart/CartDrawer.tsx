"use client";

import { useMemo, useState } from "react";
import { buildOrderWhatsAppLink } from "../../../lib/mo/whatsapp";
import { formatPriceLabel } from "../../../lib/mo/pricing";
import QuantityStepper from "./QuantityStepper";
import { useCart } from "./CartContext";

const parsePrice = (price?: string) => {
  if (!price) return null;
  const numeric = Number(price.replace(/[^0-9.]/g, ""));
  return Number.isFinite(numeric) ? numeric : null;
};

type CartDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function CartDrawer({
  isOpen,
  onClose,
}: CartDrawerProps) {
  const [orderMessage, setOrderMessage] = useState<string | null>(null);
  const {
    items,
    updateItemQty,
    zone,
    note,
    paymentMethod,
    pickupWindow,
    setZone,
    setNote,
    setPaymentMethod,
    setPickupWindow,
    clearCart,
  } = useCart();
  const total = useMemo(() => {
    if (items.length === 0) return null;
    const totals = items
      .map((item) => {
        const parsed = parsePrice(item.price);
        return parsed !== null ? parsed * item.qty : null;
      })
      .filter((value): value is number => value !== null);
    if (totals.length !== items.length) return null;
    return totals.reduce((sum, value) => sum + value, 0);
  }, [items]);

  const whatsappLink = useMemo(
    () => buildOrderWhatsAppLink(items, zone, note, paymentMethod, pickupWindow),
    [items, zone, note, paymentMethod, pickupWindow]
  );

  const handleSubmit = () => {
    if (items.length === 0) return;
    setOrderMessage("Tu pedido se abrió en WhatsApp. Vacíalo solo cuando ya lo hayas enviado.");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-[rgba(11,18,32,0.55)] px-0 pb-[calc(env(safe-area-inset-bottom)+16px)] pt-6 backdrop-blur-sm sm:items-center sm:px-4 sm:pb-6 sm:pt-10">
      <div className="w-full max-h-[calc(100dvh-16px)] overflow-y-auto rounded-t-3xl border border-default bg-surface p-6 pb-[calc(env(safe-area-inset-bottom)+24px)] text-main shadow-2xl motion-safe:animate-[sheet-up_240ms_ease-out] sm:max-h-[calc(100dvh-80px)] sm:max-w-lg sm:rounded-3xl sm:p-8">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-main">Tu pedido para retiro</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-default px-3 py-2 text-xs font-semibold text-muted transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
            aria-label="Cerrar pedido"
          >
            Cerrar
          </button>
        </div>

        {items.length === 0 ? (
          <p className="mt-6 text-sm text-muted">
            Aún no agregas nada. Agrega productos y te confirmamos antes de que salgas.
          </p>
        ) : (
          <div className="mt-6 space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl border border-default bg-base px-4 py-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-main">
                      {item.name}
                    </p>
                    {item.price ? (
                      <p className="mt-1 text-xs text-main">
                        {formatPriceLabel(item.price)}
                      </p>
                    ) : null}
                  </div>
                  <button
                    type="button"
                    onClick={() => updateItemQty(item.id, 0)}
                    className="text-xs font-semibold text-muted transition hover:text-rose-500"
                  >
                    Quitar
                  </button>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <QuantityStepper
                    value={item.qty}
                    onChange={(next) => updateItemQty(item.id, next)}
                  />
                </div>
              </div>
            ))}

            {total !== null ? (
              <div className="flex items-center justify-between rounded-2xl border border-default bg-base px-4 py-3">
                <span className="text-sm font-semibold text-main">
                  Total estimado
                </span>
                <span className="text-sm font-semibold text-main">
                  ${total.toFixed(2)}
                </span>
              </div>
            ) : null}

            <div className="grid gap-3">
              <label className="text-xs font-semibold text-main" htmlFor="cart-zone">
                Estoy cerca de...
              </label>
              <input
                id="cart-zone"
                type="text"
                value={zone}
                onChange={(event) => setZone(event.target.value)}
                placeholder="Colonia, referencia"
                className="h-12 rounded-2xl border border-default bg-surface px-4 text-sm text-main focus:border-[var(--accent)] focus:outline-none"
              />
              <label className="text-xs font-semibold text-main" htmlFor="cart-note">
                Nota (opcional)
              </label>
              <input
                id="cart-note"
                type="text"
                value={note}
                onChange={(event) => setNote(event.target.value)}
                placeholder="Sin picante, por favor"
                className="h-12 rounded-2xl border border-default bg-surface px-4 text-sm text-main focus:border-[var(--accent)] focus:outline-none"
              />
              <div className="mt-2 grid gap-2">
                <span className="text-xs font-semibold text-main">
                  Método de pago
                </span>
                <div className="grid gap-2 sm:grid-cols-3">
                  {[
                    { value: "efectivo", label: "Efectivo" },
                    { value: "tigo", label: "Tigo Money" },
                    { value: "transferencia", label: "Transferencia" },
                  ].map((option) => (
                    <label
                      key={option.value}
                      className="flex items-center gap-2 rounded-2xl border border-default bg-surface px-3 py-2 text-xs font-semibold text-main"
                    >
                      <input
                        type="radio"
                        name="payment"
                        value={option.value}
                        checked={paymentMethod === option.value}
                        onChange={() =>
                          setPaymentMethod(option.value as typeof paymentMethod)
                        }
                        className="h-4 w-4 accent-[var(--accent)]"
                      />
                      {option.label}
                    </label>
                  ))}
                </div>
              </div>
              <div className="mt-2 grid gap-2">
                <label
                  className="text-xs font-semibold text-main"
                  htmlFor="pickup-window"
                >
                  Ventana de retiro si pides caliente hoy
                </label>
                <select
                  id="pickup-window"
                  value={pickupWindow}
                  onChange={(event) =>
                    setPickupWindow(event.target.value as typeof pickupWindow)
                  }
                  className="h-12 rounded-2xl border border-default bg-surface px-3 text-sm text-main focus:border-[var(--accent)] focus:outline-none"
                >
                  <option value="">Selecciona una ventana</option>
                  <option value="mediodia">Mediodía (11:30–12:30)</option>
                  <option value="tarde">Tarde (5:00–6:30)</option>
                  <option value="frio">Fuera de ventana: retiro en frío</option>
                </select>
                <p className="text-[11px] text-muted">
                  Solo aplica si pedís “Caliente hoy”.
                </p>
              </div>
            </div>

            <a
              href={whatsappLink}
              className="mt-3 flex h-12 items-center justify-center rounded-full bg-[var(--accent)] px-5 text-center text-sm font-semibold text-[var(--surface)] transition hover:opacity-90"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Completar pedido en WhatsApp"
              onClick={handleSubmit}
            >
              Confirmar pedido por WhatsApp
            </a>
            {orderMessage ? (
              <p className="text-xs text-[var(--accent)]">{orderMessage}</p>
            ) : null}
            <div className="flex items-center justify-between text-xs text-muted">
              <span>Te confirmamos total y retiro antes de salir</span>
              <button
                type="button"
                onClick={clearCart}
                className="text-xs font-semibold text-muted transition hover:text-rose-500"
              >
                Vaciar pedido
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
