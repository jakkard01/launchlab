"use client";

import { useMemo } from "react";
import { buildOrderWhatsAppLink } from "../../../lib/mo/whatsapp";
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

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/40 px-4 pb-6 pt-10 sm:items-center">
      <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl sm:p-8">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900">Tu pedido</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 transition hover:border-emerald-200 hover:text-emerald-700"
            aria-label="Cerrar pedido"
          >
            Cerrar
          </button>
        </div>

        {items.length === 0 ? (
          <p className="mt-6 text-sm text-slate-600">
            Aún no agregas nada. Toca &quot;Agregar&quot; para armar tu pedido.
          </p>
        ) : (
          <div className="mt-6 space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl border border-slate-200 px-4 py-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      {item.name}
                    </p>
                    {item.price ? (
                      <p className="mt-1 text-xs text-emerald-700">
                        {item.price}
                      </p>
                    ) : null}
                  </div>
                  <button
                    type="button"
                    onClick={() => updateItemQty(item.id, 0)}
                    className="text-xs font-semibold text-slate-500 transition hover:text-rose-500"
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
              <div className="flex items-center justify-between rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3">
                <span className="text-sm font-semibold text-emerald-800">
                  Total estimado
                </span>
                <span className="text-sm font-semibold text-emerald-800">
                  ${total.toFixed(2)}
                </span>
              </div>
            ) : null}

            <div className="grid gap-3">
              <label className="text-xs font-semibold text-slate-600" htmlFor="cart-zone">
                Estoy cerca de...
              </label>
              <input
                id="cart-zone"
                type="text"
                value={zone}
                onChange={(event) => setZone(event.target.value)}
                placeholder="Colonia, referencia"
                className="h-12 rounded-2xl border border-slate-200 px-4 text-sm text-slate-700 focus:border-emerald-400 focus:outline-none"
              />
              <label className="text-xs font-semibold text-slate-600" htmlFor="cart-note">
                Nota (opcional)
              </label>
              <input
                id="cart-note"
                type="text"
                value={note}
                onChange={(event) => setNote(event.target.value)}
                placeholder="Sin picante, por favor"
                className="h-12 rounded-2xl border border-slate-200 px-4 text-sm text-slate-700 focus:border-emerald-400 focus:outline-none"
              />
              <div className="mt-2 grid gap-2">
                <span className="text-xs font-semibold text-slate-600">
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
                      className="flex items-center gap-2 rounded-2xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700"
                    >
                      <input
                        type="radio"
                        name="payment"
                        value={option.value}
                        checked={paymentMethod === option.value}
                        onChange={() =>
                          setPaymentMethod(option.value as typeof paymentMethod)
                        }
                        className="h-4 w-4 accent-emerald-600"
                      />
                      {option.label}
                    </label>
                  ))}
                </div>
              </div>
              <div className="mt-2 grid gap-2">
                <label
                  className="text-xs font-semibold text-slate-600"
                  htmlFor="pickup-window"
                >
                  Ventana de retiro (Caliente hoy)
                </label>
                <select
                  id="pickup-window"
                  value={pickupWindow}
                  onChange={(event) =>
                    setPickupWindow(event.target.value as typeof pickupWindow)
                  }
                  className="h-12 rounded-2xl border border-slate-200 bg-white px-3 text-sm text-slate-700 focus:border-emerald-400 focus:outline-none"
                >
                  <option value="">Selecciona una ventana</option>
                  <option value="mediodia">Mediodía (11:30–12:30)</option>
                  <option value="tarde">Tarde (5:00–6:30)</option>
                  <option value="frio">Fuera de ventana: entregar frío</option>
                </select>
                <p className="text-[11px] text-slate-500">
                  Solo aplica si pedís “Caliente hoy”.
                </p>
              </div>
            </div>

            <a
              href={whatsappLink}
              className="mt-3 flex h-12 items-center justify-center rounded-full bg-emerald-600 px-5 text-center text-sm font-semibold text-white transition hover:bg-emerald-700"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Enviar pedido por WhatsApp"
            >
              Enviar pedido por WhatsApp
            </a>
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>Pickup</span>
              <button
                type="button"
                onClick={clearCart}
                className="text-xs font-semibold text-slate-500 transition hover:text-rose-500"
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
