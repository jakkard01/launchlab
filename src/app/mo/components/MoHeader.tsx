"use client";

import { ChangeEvent, FormEvent, KeyboardEvent, useRef } from "react";
import ThemeToggle from "../../components/ThemeToggle";
import { MO_BRAND } from "../../../lib/mo/config";

type HeaderMode = "full" | "compact" | "hidden";

type MoHeaderProps = {
  query: string;
  onQueryChange: (value: string) => void;
  whatsappLink: string;
  onScrollToSpecial: () => void;
  mode: HeaderMode;
  onSearchFocusChange: (focused: boolean) => void;
  onSearchSubmit: () => void;
};

export default function MoHeader({
  query,
  onQueryChange,
  whatsappLink,
  onScrollToSpecial,
  mode,
  onSearchFocusChange,
  onSearchSubmit,
}: MoHeaderProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };

  const dismissKeyboardAndSubmit = () => {
    inputRef.current?.blur();
    onSearchFocusChange(false);
    onSearchSubmit();
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dismissKeyboardAndSubmit();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      dismissKeyboardAndSubmit();
    }
  };

  const hasQuery = query.trim().length > 0;
  const isCompact = mode === "compact" || mode === "hidden" || hasQuery;
  const isHidden = mode === "hidden" && !hasQuery;

  return (
    <header
      className={`sticky top-0 z-40 border-b border-default bg-[color-mix(in_srgb,var(--surface)_90%,transparent)] backdrop-blur-md shadow-sm shadow-slate-950/5 transition-transform duration-200 ${isHidden ? "-translate-y-full" : "translate-y-0"}`}
    >
      <div
        className={`mx-auto flex w-full max-w-5xl flex-col bg-surface transition-all duration-200 sm:rounded-3xl sm:border sm:border-default lg:px-8 dark:bg-[var(--surface-2)] dark:shadow-[0_14px_40px_rgba(3,8,16,0.2)] ${
          isCompact
            ? "gap-2 px-3 py-2 sm:px-4 sm:py-2.5"
            : "gap-3 px-3 py-2.5 sm:gap-3 sm:px-5 sm:py-3"
        }`}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="text-sm font-semibold tracking-[0.08em] text-main sm:text-base">
              {MO_BRAND.currentDisplayName}
            </div>
            <p className="text-[11px] text-muted-strong">{MO_BRAND.locationLabel}</p>
            {!isCompact ? (
              <p className="mt-0.5 text-[11px] text-muted sm:text-xs">
                Compra rápida para retiro. Te confirmamos antes de salir.
              </p>
            ) : null}
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <ThemeToggle compact className="shrink-0" />
            <a
              href={whatsappLink}
              className={`inline-flex items-center justify-center rounded-full border border-[var(--accent)] bg-[var(--accent)] text-center font-semibold text-[#07130c] shadow-[0_10px_24px_rgba(34,197,94,0.16)] transition hover:opacity-90 ${
                isCompact
                  ? "min-h-9 px-3 py-1.5 text-[11px] sm:min-h-10 sm:px-3.5"
                  : "min-h-10 px-3 py-2 text-[11px] sm:min-h-11 sm:min-w-[190px] sm:px-4 sm:text-xs"
              }`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {isCompact ? "WhatsApp" : "Pide por WhatsApp"}
            </a>
          </div>
        </div>
        <div
          className={`rounded-2xl border border-[var(--accent)]/22 bg-[color-mix(in_srgb,var(--accent)_8%,var(--surface))] transition-all duration-200 ${
            isCompact ? "p-2.5" : "p-3"
          }`}
        >
          <div className="flex items-center justify-between gap-2">
            {!isCompact ? (
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[var(--accent)]">
                  Buscador rapido
                </p>
                <p className="mt-1 text-xs text-muted-strong">
                  Busca por nombre, categoría o básico para ubicarlo rápido desde el móvil.
                </p>
              </div>
            ) : (
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[var(--accent)]">
                Buscar producto
              </p>
            )}
            {query.trim().length > 0 ? (
              <button
                type="button"
                onClick={() => onQueryChange("")}
                className="shrink-0 rounded-full border border-default bg-surface px-3 py-2 text-[11px] font-semibold text-main transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
              >
                Limpiar
              </button>
            ) : null}
          </div>
          <form
            onSubmit={handleSubmit}
            className={`flex w-full items-center gap-2 ${isCompact ? "mt-2" : "mt-3"}`}
          >
            <input
              ref={inputRef}
              type="search"
              value={query}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              onFocus={() => onSearchFocusChange(true)}
              onBlur={() => onSearchFocusChange(false)}
              placeholder="Busca café, shampoo, arroz o Coca-Cola..."
              className={`w-full rounded-full border border-default bg-surface px-4 text-sm text-main placeholder:text-muted focus:border-[var(--accent)] focus:outline-none ${
                isCompact ? "h-10" : "h-11"
              }`}
              aria-label="Buscar producto"
            />
            <button
              type="submit"
              className="h-10 shrink-0 rounded-full border border-[var(--accent)]/35 bg-surface px-3 text-[11px] font-semibold text-main transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              Buscar
            </button>
          </form>
          {!isCompact ? (
            <div className="mt-3 flex items-center justify-between gap-2 text-[11px] text-muted">
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
          ) : null}
        </div>
      </div>
    </header>
  );
}
