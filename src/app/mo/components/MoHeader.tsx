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
    <header className="sticky top-0 z-40 border-b border-default bg-[color-mix(in_srgb,var(--surface)_92%,transparent)] backdrop-blur-md shadow-sm shadow-slate-950/5">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-3 rounded-3xl border border-default bg-surface px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8 dark:bg-[var(--surface-2)] dark:shadow-[0_14px_40px_rgba(3,8,16,0.2)]">
        <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="text-base font-semibold tracking-[0.08em] text-main">
              RYS Minisúper
            </div>
            <p className="text-xs text-muted-strong">La Gloria, San Salvador</p>
            <p className="mt-1 text-[11px] text-muted">
              Compra rápida para retiro. Confirmamos antes de salir para que no vayas en vano.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:items-center sm:justify-end">
            <ThemeToggle className="w-full sm:hidden" />
            <ThemeToggle showLabel className="hidden shrink-0 sm:flex" />
            <a
              href={whatsappLink}
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-[var(--accent)] bg-[var(--accent)] px-3 py-2 text-center text-xs font-semibold text-[#07130c] shadow-[0_10px_24px_rgba(34,197,94,0.2)] transition hover:opacity-90 sm:min-w-[170px]"
              target="_blank"
              rel="noopener noreferrer"
            >
              Pedir y confirmar
            </a>
            {hasAdminSession ? (
              <a
                href="/RYSminisuper/admin"
                className="col-span-2 inline-flex min-h-11 items-center justify-center rounded-full border border-default bg-surface-3 px-4 py-2 text-center text-xs font-semibold uppercase tracking-[0.18em] text-main transition hover:border-[var(--accent)]/45 hover:text-[var(--accent)] sm:col-span-1 sm:min-w-[140px]"
              >
                Admin
              </a>
            ) : null}
          </div>
        </div>
        <div className="flex w-full flex-col gap-2 sm:max-w-xl">
          <div className="flex w-full items-center gap-3">
          <input
            type="search"
            value={query}
            onChange={handleChange}
            placeholder="Busca pupusas, café, empanadas..."
            className="h-11 w-full rounded-full border border-default bg-surface-3 px-4 text-sm text-main placeholder:text-muted focus:border-[var(--accent)] focus:outline-none"
            aria-label="Buscar producto"
          />
            {query.trim().length > 0 ? (
              <button
                type="button"
                onClick={() => onQueryChange("")}
                className="rounded-full border border-default bg-surface-3 px-3 py-2 text-xs font-semibold text-main transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
              >
                Limpiar
              </button>
            ) : null}
          </div>
          <div className="flex flex-wrap gap-2 text-[11px] text-muted">
            <span className="rounded-full border border-default bg-[color-mix(in_srgb,var(--surface-2)_55%,transparent)] px-3 py-1 text-muted-strong">
              Retiro fácil en La Gloria
            </span>
            <span className="rounded-full border border-default bg-[color-mix(in_srgb,var(--surface-2)_55%,transparent)] px-3 py-1 text-muted-strong">
              Te confirmamos antes de salir
            </span>
            <button
              type="button"
              onClick={onScrollToSpecial}
              className="rounded-full border border-default bg-[color-mix(in_srgb,var(--surface-2)_55%,transparent)] px-3 py-1 font-semibold text-main transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              Si no lo ves, pídelo
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
