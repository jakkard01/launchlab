"use client";

import type { SalesBotQuickReply } from '../../lib/sales-bot/types';

export type SalesBotQuickRepliesProps = {
  replies: SalesBotQuickReply[];
  activeReplyId: string;
  onSelect: (reply: SalesBotQuickReply) => void;
  diagnosisHref: string;
  onDiagnosisClick: () => void;
};

export default function SalesBotQuickReplies({
  replies,
  activeReplyId,
  onSelect,
  diagnosisHref,
  onDiagnosisClick,
}: SalesBotQuickRepliesProps) {
  return (
    <div className="mt-4 grid gap-1.5 sm:mt-5 sm:gap-2">
      {replies.map((reply) => (
        <button
          key={reply.id}
          type="button"
          onClick={() => onSelect(reply)}
          className={`rounded-full px-3 py-1.5 text-left text-xs font-medium transition sm:px-4 sm:py-2 sm:text-sm ${
            activeReplyId === reply.id
              ? 'bg-cyan-300 text-[#041018]'
              : 'bg-white/[0.06] text-white/78 hover:bg-white/[0.1]'
          }`}
        >
          {reply.label}
        </button>
      ))}
      <a
        href={diagnosisHref}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onDiagnosisClick}
        className="rounded-full bg-cyan-300 px-3 py-1.5 text-center text-xs font-semibold text-[#041018] transition hover:bg-cyan-200 sm:px-4 sm:py-2 sm:text-sm"
      >
        Quiero pedir diagnóstico
      </a>
    </div>
  );
}
