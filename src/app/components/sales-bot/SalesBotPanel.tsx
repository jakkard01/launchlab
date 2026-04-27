"use client";

import type { LeadTemperature, SalesBotQuickReply } from '../../lib/sales-bot/types';
import { getLeadTemperatureLabel } from '../../lib/sales-bot/leadScoring';
import SalesBotMessage from './SalesBotMessage';
import SalesBotQuickReplies from './SalesBotQuickReplies';

export type BotMessage = {
  id: string;
  role: 'user' | 'bot';
  text: string;
};

export type SalesBotPanelProps = {
  messages: BotMessage[];
  replies: SalesBotQuickReply[];
  activeReplyId: string;
  score: number;
  leadTemperature: LeadTemperature;
  recommendedOfferLabel: string;
  recommendedOfferReason: string;
  diagnosisHref: string;
  onClose: () => void;
  onSelectReply: (reply: SalesBotQuickReply) => void;
  onDiagnosisClick: () => void;
};

export default function SalesBotPanel({
  messages,
  replies,
  activeReplyId,
  score,
  leadTemperature,
  recommendedOfferLabel,
  recommendedOfferReason,
  diagnosisHref,
  onClose,
  onSelectReply,
  onDiagnosisClick,
}: SalesBotPanelProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/62 px-2 py-2 backdrop-blur-sm sm:items-center sm:p-6">
      <div className="flex max-h-[75vh] w-full max-w-lg flex-col overflow-hidden rounded-[1.25rem] bg-[#061018] shadow-[0_28px_90px_rgba(0,0,0,0.46),inset_0_0_0_1px_rgba(255,255,255,0.1)] sm:rounded-[1.6rem]">
        <div className="flex shrink-0 items-start justify-between gap-4 border-b border-white/8 px-4 py-3 sm:px-5 sm:py-4">
          <div>
            <p className="text-sm font-semibold text-white">Chat IA demo</p>
            <p className="mt-1 text-xs text-amber-100/78">Modo respuestas rápidas</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/[0.08] text-lg font-semibold text-white transition hover:bg-white/[0.13]"
            aria-label="Cerrar chat IA demo"
          >
            ×
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-3 py-3 sm:px-5 sm:py-5">
          <div className="space-y-3">
            {messages.map((message) => (
              <SalesBotMessage key={message.id} role={message.role}>
                {message.text}
              </SalesBotMessage>
            ))}
          </div>

          <SalesBotQuickReplies
            replies={replies}
            activeReplyId={activeReplyId}
            diagnosisHref={diagnosisHref}
            onSelect={onSelectReply}
            onDiagnosisClick={onDiagnosisClick}
          />

          <div className="mt-4 rounded-[1rem] bg-white/[0.05] p-3 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-100/78">
                {getLeadTemperatureLabel(leadTemperature)}
              </p>
              <p className="text-xs text-white/50">Score demo: {score}</p>
            </div>
            <p className="mt-2 text-sm font-semibold text-white">{recommendedOfferLabel}</p>
            <p className="mt-1 text-xs leading-5 text-white/62">{recommendedOfferReason}</p>
          </div>

          <p className="mt-5 text-xs leading-5 text-white/46">
            La versión con IA comercial real está en preparación y se activará cuando el servidor esté disponible. No es atención automática 24/7 y no sustituye una revisión humana.
          </p>
        </div>
      </div>
    </div>
  );
}
