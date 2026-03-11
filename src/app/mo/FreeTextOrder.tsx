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
    <div className="rounded-3xl border border-emerald-200 bg-emerald-50/50 px-6 py-6 shadow-sm sm:px-8">
      <div className="flex flex-col gap-2">
        <p className="text-xs uppercase tracking-[0.3em] text-emerald-700">
          Pedido especial
        </p>
        <h2 className="text-lg font-semibold text-slate-900">
          ¿No ves algo en catálogo?
        </h2>
        <p className="text-sm text-slate-600">
          Escríbenos qué necesitas y te confirmamos si lo tenemos o si lo podemos conseguir para retiro.
        </p>
        <div className="mt-1 flex flex-wrap gap-2 text-[11px] text-emerald-800">
          {["Canasta básica", "Bebidas", "Algo que no viste"].map((hint) => (
            <span
              key={hint}
              className="rounded-full border border-emerald-200 bg-white/80 px-3 py-1 font-semibold"
            >
              {hint}
            </span>
          ))}
        </div>
      </div>
      <div className="mt-5 grid gap-3">
        <label className="text-xs font-semibold text-slate-600" htmlFor="free-item">
          Qué necesitas
        </label>
        <input
          id="free-item"
          type="text"
          value={item}
          onChange={(event) => setItem(event.target.value)}
          placeholder="Ej: pan integral, leche deslactosada"
          className="h-12 rounded-2xl border border-emerald-200 bg-white px-4 text-sm text-slate-700 focus:border-emerald-400 focus:outline-none"
        />
        <label className="text-xs font-semibold text-slate-600" htmlFor="free-note">
          Nota (opcional)
        </label>
        <input
          id="free-note"
          type="text"
          value={note}
          onChange={(event) => setNote(event.target.value)}
          placeholder="Marca, tamaño o detalle importante"
          className="h-12 rounded-2xl border border-emerald-200 bg-white px-4 text-sm text-slate-700 focus:border-emerald-400 focus:outline-none"
        />
        <label className="text-xs font-semibold text-slate-600" htmlFor="free-zone">
          Estoy cerca de (opcional)
        </label>
        <input
          id="free-zone"
          type="text"
          value={zone}
          onChange={(event) => setZone(event.target.value)}
          placeholder="Colonia, referencia"
          className="h-12 rounded-2xl border border-emerald-200 bg-white px-4 text-sm text-slate-700 focus:border-emerald-400 focus:outline-none"
        />
        <a
          href={whatsappLink}
          className="flex min-h-[48px] items-center justify-center rounded-full bg-emerald-600 px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-emerald-700"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Pedir algo que no está en el catálogo por WhatsApp"
        >
          Pedir esto por WhatsApp
        </a>
        <p className="text-xs text-emerald-700">
          Te respondemos con disponibilidad, total estimado y tiempo de retiro.
        </p>
      </div>
    </div>
  );
}
