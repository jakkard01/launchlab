"use client";

import { useMemo, useState } from "react";
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
    <div className="rounded-3xl border border-default bg-surface px-6 py-6 shadow-sm sm:px-8">
      <div className="flex flex-col gap-2">
        <p className="text-xs uppercase tracking-[0.3em] text-[var(--accent)]">
          Pedido especial
        </p>
        <h2 className="text-lg font-semibold text-main">
          Pedir algo que no está en el catálogo
        </h2>
        <p className="text-sm text-muted">
          Escríbenos y lo buscamos para retiro.
        </p>
      </div>
      <div className="mt-5 grid gap-3">
        <label className="text-xs font-semibold text-main" htmlFor="free-item">
          Qué necesitas
        </label>
        <input
          id="free-item"
          type="text"
          value={item}
          onChange={(event) => setItem(event.target.value)}
          placeholder="Ej: pan integral, leche deslactosada"
          className="h-12 rounded-2xl border border-default bg-base px-4 text-sm text-main focus:border-[var(--accent)] focus:outline-none"
        />
        <label className="text-xs font-semibold text-main" htmlFor="free-note">
          Nota (opcional)
        </label>
        <input
          id="free-note"
          type="text"
          value={note}
          onChange={(event) => setNote(event.target.value)}
          placeholder="Marca preferida, sin azucar"
          className="h-12 rounded-2xl border border-default bg-base px-4 text-sm text-main focus:border-[var(--accent)] focus:outline-none"
        />
        <label className="text-xs font-semibold text-main" htmlFor="free-zone">
          Estoy cerca de
        </label>
        <input
          id="free-zone"
          type="text"
          value={zone}
          onChange={(event) => setZone(event.target.value)}
          placeholder="Colonia, referencia"
          className="h-12 rounded-2xl border border-default bg-base px-4 text-sm text-main focus:border-[var(--accent)] focus:outline-none"
        />
        <a
          href={whatsappLink}
          className="h-12 rounded-full bg-[var(--accent)] px-5 py-3 text-center text-sm font-semibold text-[var(--surface)] transition hover:opacity-90"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Pedir algo que no está en el catálogo por WhatsApp"
        >
          Enviar pedido por WhatsApp
        </a>
        <p className="text-xs text-[var(--accent)]">
          Te confirmamos disponibilidad y tiempo de retiro.
        </p>
      </div>
    </div>
  );
}
