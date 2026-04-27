"use client";

import type { LeadTemperature } from '../../lib/sales-bot/types';

export type SalesBotLauncherProps = {
  onOpen: () => void;
  leadTemperature: LeadTemperature;
};

export default function SalesBotLauncher({
  onOpen,
  leadTemperature,
}: SalesBotLauncherProps) {
  const isHot = leadTemperature === 'hot';

  return (
    <div className="fixed bottom-[calc(0.75rem+env(safe-area-inset-bottom))] right-3 z-30 flex flex-col items-end gap-2 sm:bottom-4 sm:right-4">
      <button
        type="button"
        onClick={onOpen}
        className="group max-w-[calc(100vw-1.5rem)] rounded-full bg-[#061018]/90 p-0.5 text-left shadow-[0_10px_24px_rgba(0,0,0,0.28),inset_0_0_0_1px_rgba(103,232,249,0.18)] backdrop-blur-md transition hover:shadow-[0_10px_24px_rgba(0,0,0,0.28),inset_0_0_0_1px_rgba(103,232,249,0.34)] sm:rounded-2xl sm:p-1"
        aria-label="Abrir chat IA demo"
      >
        <span className="flex items-center rounded-full bg-cyan-300 px-3 py-2 text-xs font-semibold leading-tight text-[#041018] sm:gap-3 sm:rounded-[0.85rem] sm:px-4 sm:py-3 sm:text-sm">
          <span className="sm:hidden">{isHot ? 'Lead caliente' : 'FAQ RÁPIDA'}</span>
          <span className="hidden sm:inline">Chat IA demo</span>
          <span className="hidden rounded-full bg-[#041018]/10 px-2 py-1 text-[10px] uppercase tracking-[0.14em] sm:inline">
            FAQ RÁPIDA
          </span>
        </span>
      </button>
    </div>
  );
}
