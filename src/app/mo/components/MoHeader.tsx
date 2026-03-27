"use client";

import { ChangeEvent, FormEvent, KeyboardEvent, useRef } from "react";
import ThemeToggle from "../../components/ThemeToggle";
import {
  MO_BRAND,
  MO_STORE_LOCATION_FALLBACK_MESSAGE,
  MO_STORE_MAPS_URL,
} from "../../../lib/mo/config";
import { buildWhatsAppMessageLink } from "../../../lib/mo/whatsapp";

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
  const mapsFallbackLink = buildWhatsAppMessageLink(
    MO_STORE_LOCATION_FALLBACK_MESSAGE
  );
  const mapsLink = MO_STORE_MAPS_URL || mapsFallbackLink;
  const mapsLabel = MO_STORE_MAPS_URL ? "Cómo llegar" : "Ubicación";

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
            : "gap-2.5 px-3 py-2.5 sm:gap-3 sm:px-5 sm:py-3"
        }`}
        >
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="text-sm font-semibold tracking-[0.08em] text-main sm:text-base">
              {MO_BRAND.currentDisplayName}
            </div>
            <p className="mt-0.5 text-[11px] text-muted-strong">
              {MO_BRAND.locationLabel}
            </p>
            <p className="mt-0.5 text-[11px] text-muted sm:text-xs">
              Retiro confirmado antes de salir.
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <div className="hidden sm:block">
              <ThemeToggle compact className="shrink-0" />
            </div>
            <a
              href={mapsLink}
              className={`inline-flex items-center justify-center rounded-full border border-default bg-surface text-[11px] font-semibold text-main transition hover:border-[var(--accent)] hover:text-[var(--accent)] ${
                isCompact
                  ? "min-h-9 px-3 py-1.5 sm:min-h-10 sm:px-3.5"
                  : "min-h-10 px-3 py-2 sm:min-h-11 sm:px-4 sm:text-xs"
              }`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {mapsLabel}
            </a>
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
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[var(--accent)]">
                {isCompact ? "Buscar producto" : "Buscador rápido"}
              </p>
            </div>
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
              placeholder="Busca café, shampoo o Coca-Cola"
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
            <div className="mt-2 flex flex-wrap items-center gap-2 text-[11px] text-muted">
              <span className="rounded-full border border-default bg-surface px-3 py-1 font-semibold text-main">
                Retiro hoy
              </span>
              <span className="rounded-full border border-default bg-surface px-3 py-1 font-semibold text-main">
                Pago al retirar
              </span>
              <button
                type="button"
                onClick={onScrollToSpecial}
                className="rounded-full border border-default bg-[color-mix(in_srgb,var(--surface-2)_55%,transparent)] px-3 py-1 font-semibold text-main transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
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
