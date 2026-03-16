"use client";

import { ChangeEvent } from "react";
import ThemeToggle from "../../components/ThemeToggle";

type MoHeaderProps = {
  query: string;
  onQueryChange: (value: string) => void;
  whatsappLink: string;
  hasAdminSession: boolean;
  onScrollToSpecial: () => void;
};

export default function MoHeader({
  query,
  onQueryChange,
  whatsappLink,
  hasAdminSession,
  onScrollToSpecial,
}: MoHeaderProps) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-default bg-[color-mix(in_srgb,var(--surface)_90%,transparent)] backdrop-blur-md shadow-sm shadow-slate-950/5">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-2 bg-surface px-3 py-2.5 sm:gap-3 sm:rounded-3xl sm:border sm:border-default sm:px-5 sm:py-3 lg:px-8 dark:bg-[var(--surface-2)] dark:shadow-[0_14px_40px_rgba(3,8,16,0.2)]">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="text-sm font-semibold tracking-[0.08em] text-main sm:text-base">
              RYS Minisúper
            </div>
            <p className="text-[11px] text-muted-strong">La Gloria, San Salvador</p>
            <p className="mt-0.5 text-[11px] text-muted sm:text-xs">
              Compra rápida para retiro. Te confirmamos antes de salir.
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <ThemeToggle compact className="shrink-0" />
            <a
              href={whatsappLink}
              className="inline-flex min-h-9 items-center justify-center rounded-full border border-[var(--accent)] bg-[var(--accent)] px-3 py-2 text-center text-[11px] font-semibold text-[#07130c] shadow-[0_10px_24px_rgba(34,197,94,0.16)] transition hover:opacity-90 sm:min-h-11 sm:min-w-[170px] sm:px-4 sm:text-xs"
              target="_blank"
              rel="noopener noreferrer"
            >
              Pedir
            </a>
            {hasAdminSession ? (
              <a
                href="/RYSminisuper/admin"
                className="inline-flex min-h-9 items-center justify-center rounded-full border border-default bg-surface-3 px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-strong transition hover:border-[var(--accent)]/45 hover:text-[var(--accent)]"
              >
                Admin
              </a>
            ) : null}
          </div>
        </div>
        <div className="flex w-full flex-col gap-2">
          <div className="flex w-full items-center gap-2">
          <input
            type="search"
            value={query}
            onChange={handleChange}
            placeholder="Busca pupusas, café, empanadas..."
            className="h-10 w-full rounded-full border border-default bg-surface-3 px-4 text-sm text-main placeholder:text-muted focus:border-[var(--accent)] focus:outline-none"
            aria-label="Buscar producto"
          />
            {query.trim().length > 0 ? (
              <button
                type="button"
                onClick={() => onQueryChange("")}
                className="rounded-full border border-default bg-surface-3 px-3 py-2 text-[11px] font-semibold text-main transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
              >
                Limpiar
              </button>
            ) : null}
          </div>
          <div className="flex items-center justify-between gap-2 text-[11px] text-muted">
            <span className="truncate text-muted-strong">
              Retiro fácil. Evita la cola y la vuelta en vano.
            </span>
            <button
              type="button"
              onClick={onScrollToSpecial}
              className="shrink-0 rounded-full border border-default bg-[color-mix(in_srgb,var(--surface-2)_55%,transparent)] px-3 py-1 font-semibold text-main transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              Si no lo ves, pídelo
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
