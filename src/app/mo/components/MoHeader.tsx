"use client";

import { ChangeEvent } from "react";

type MoHeaderProps = {
  query: string;
  onQueryChange: (value: string) => void;
  whatsappLink: string;
};

export default function MoHeader({
  query,
  onQueryChange,
  whatsappLink,
}: MoHeaderProps) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur sm:static sm:border-none">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3">
          <div className="text-lg font-semibold tracking-[0.2em] text-slate-900">
            RYS
          </div>
          <a
            href={whatsappLink}
            className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700 transition hover:border-emerald-300"
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp
          </a>
        </div>
        <div className="flex w-full items-center gap-3 sm:max-w-md">
          <input
            type="search"
            value={query}
            onChange={handleChange}
            placeholder="Buscar en la tienda"
            className="h-10 w-full rounded-full border border-slate-200 bg-white px-4 text-sm text-slate-700 focus:border-emerald-400 focus:outline-none"
            aria-label="Buscar producto"
          />
        </div>
      </div>
    </header>
  );
}
