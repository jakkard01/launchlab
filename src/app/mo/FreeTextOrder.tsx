"use client";

import { useMemo, useState } from "react";
import { trackMoEvent } from "../../lib/mo/marketing";
import { buildWhatsAppLinkFreeText } from "../../lib/mo/whatsapp";

export default function FreeTextOrder() {
  const [item, setItem] = useState("");
  const [note, setNote] = useState("");
  const [zone, setZone] = useState("");

  const whatsappLink = useMemo(() => {
    return buildWhatsAppLinkFreeText({
      item,
      note,
      zone,
    });
  }, [item, note, zone]);

  return (
    <div className="rounded-3xl border border-[var(--accent)]/25 bg-[color-mix(in_srgb,var(--accent)_10%,var(--surface))] px-6 py-6 shadow-sm dark:bg-[color-mix(in_srgb,var(--accent)_8%,var(--surface-2))] dark:shadow-[0_18px_40px_rgba(3,8,16,0.24)] sm:px-8">
      <div className="flex flex-col gap-2">
        <p className="text-xs uppercase tracking-[0.3em] text-[var(--accent)]">
          Pedido especial
        </p>
        <h2 className="text-lg font-semibold text-main">
          ¿No ves algo en catálogo?
        </h2>
        <p className="text-sm text-muted-strong">
          Escríbenos qué necesitas y te confirmamos si lo tenemos o si lo podemos conseguir para retiro.
        </p>
        <div className="mt-1 flex flex-wrap gap-2 text-[11px] text-main">
          {["Canasta básica", "Bebidas", "Algo que no viste"].map((hint) => (
            <span
              key={hint}
              className="rounded-full border border-[var(--accent)]/20 bg-surface-3 px-3 py-1 font-semibold"
            >
              {hint}
            </span>
          ))}
        </div>
      </div>
      <div className="mt-5 grid gap-3">
        <label className="text-xs font-semibold text-muted-strong" htmlFor="free-item">
          Qué necesitas
        </label>
        <input
          id="free-item"
          type="text"
          value={item}
          onChange={(event) => setItem(event.target.value)}
          placeholder="Ej: pan integral, leche deslactosada"
          className="h-12 rounded-2xl border border-default bg-surface-3 px-4 text-sm text-main placeholder:text-muted focus:border-[var(--accent)] focus:outline-none"
        />
        <label className="text-xs font-semibold text-muted-strong" htmlFor="free-note">
          Nota (opcional)
        </label>
        <input
          id="free-note"
          type="text"
          value={note}
          onChange={(event) => setNote(event.target.value)}
          placeholder="Marca, tamaño o detalle importante"
          className="h-12 rounded-2xl border border-default bg-surface-3 px-4 text-sm text-main placeholder:text-muted focus:border-[var(--accent)] focus:outline-none"
        />
        <label className="text-xs font-semibold text-muted-strong" htmlFor="free-zone">
          Estoy cerca de (opcional)
        </label>
        <input
          id="free-zone"
          type="text"
          value={zone}
          onChange={(event) => setZone(event.target.value)}
          placeholder="Colonia, referencia"
          className="h-12 rounded-2xl border border-default bg-surface-3 px-4 text-sm text-main placeholder:text-muted focus:border-[var(--accent)] focus:outline-none"
        />
        <a
          href={whatsappLink}
          onClick={() =>
            trackMoEvent("whatsapp_cta", {
              context: "free_text_order",
              label: item.trim() || "pedido_especial",
              query: item.trim(),
            })
          }
          className="flex min-h-[48px] items-center justify-center rounded-full bg-[var(--accent)] px-5 py-3 text-center text-sm font-semibold text-[#07130c] transition hover:opacity-90"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Pedir algo que no está en el catálogo por WhatsApp"
        >
          Pedir esto por WhatsApp
        </a>
        <p className="text-xs text-muted-strong">
          Te respondemos con disponibilidad, total estimado y tiempo de retiro.
        </p>
      </div>
    </div>
  );
}
