"use client";

import { ChangeEvent } from "react";
import ThemeToggle from "../../components/ThemeToggle";

type MoHeaderProps = {
  query: string;
  onQueryChange: (value: string) => void;
  whatsappLink: string;
  onScrollToSpecial: () => void;
};

export default function MoHeader({
  query,
  onQueryChange,
  whatsappLink,
  onScrollToSpecial,
}: MoHeaderProps) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-default bg-surface backdrop-blur sm:static sm:border-none">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="text-base font-semibold tracking-[0.08em] text-main">
              RYS Minisúper
            </div>
            <p className="text-xs text-muted">La Gloria, San Salvador</p>
            <p className="mt-1 text-[11px] text-muted">
              Retiro local con confirmación por WhatsApp antes de salir.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle showLabel className="shrink-0" />
            <a
              href={whatsappLink}
              className="rounded-full border border-[var(--accent)] bg-[var(--accent)] px-3 py-2 text-xs font-semibold text-[var(--surface)] transition hover:opacity-90"
              target="_blank"
              rel="noopener noreferrer"
              style={{ minHeight: 44 }}
            >
              Pedir por WhatsApp
            </a>
          </div>
        </div>
        <div className="flex w-full flex-col gap-2 sm:max-w-xl">
          <div className="flex w-full items-center gap-3">
          <input
            type="search"
            value={query}
            onChange={handleChange}
            placeholder="Busca pan, leche, pupusas..."
            className="h-11 w-full rounded-full border border-default bg-surface px-4 text-sm text-main focus:border-[var(--accent)] focus:outline-none"
            aria-label="Buscar producto"
          />
            {query.trim().length > 0 ? (
              <button
                type="button"
                onClick={() => onQueryChange("")}
                className="rounded-full border border-default px-3 py-2 text-xs font-semibold text-main transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
              >
                Limpiar
              </button>
            ) : null}
          </div>
          <div className="flex flex-wrap gap-2 text-[11px] text-muted">
            <span className="rounded-full border border-default px-3 py-1">
              Retiro en La Gloria
            </span>
            <button
              type="button"
              onClick={onScrollToSpecial}
              className="rounded-full border border-default px-3 py-1 font-semibold text-main transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              No veo lo que busco
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
