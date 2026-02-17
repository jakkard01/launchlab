"use client";

import { ChangeEvent } from "react";
import ThemeToggle from "../../components/ThemeToggle";

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
    <header className="sticky top-0 z-40 border-b border-default bg-surface backdrop-blur sm:static sm:border-none">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3">
          <div className="text-lg font-semibold tracking-[0.2em] text-main">
            RYS
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <a
              href={whatsappLink}
              className="rounded-full border border-[var(--accent)] bg-[var(--accent)] px-3 py-2 text-xs font-semibold text-[var(--surface)] transition hover:opacity-90"
              target="_blank"
              rel="noopener noreferrer"
              style={{ minHeight: 44 }}
            >
              WhatsApp
            </a>
          </div>
        </div>
        <div className="flex w-full items-center gap-3 sm:max-w-md">
          <input
            type="search"
            value={query}
            onChange={handleChange}
            placeholder="Buscar en la tienda"
            className="h-11 w-full rounded-full border border-default bg-surface px-4 text-sm text-main focus:border-[var(--accent)] focus:outline-none"
            aria-label="Buscar producto"
          />
        </div>
      </div>
    </header>
  );
}
