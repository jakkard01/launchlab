"use client";

import { useMemo, useState } from 'react';
import { classifyLead, scoreLead } from '../../lib/sales-bot/leadScoring';
import { getOfferLabel, getOfferReason, recommendOffer } from '../../lib/sales-bot/recommendations';
import { salesBotConfig } from '../../lib/sales-bot/salesBotConfig';
import type {
  LeadSignal,
  SalesBotLeadPayload,
  SalesBotLeadProfile,
  SalesBotQuickReply,
} from '../../lib/sales-bot/types';
import { buildDiagnosisMessage, buildWhatsAppLink } from '../../lib/sales-bot/whatsapp';
import SalesBotLauncher from './SalesBotLauncher';
import SalesBotPanel, { type BotMessage } from './SalesBotPanel';

export type SalesBotProps = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

const initialMessages: BotMessage[] = [
  {
    id: 'intro',
    role: 'bot',
    text: 'Estoy en modo demo/offline. Puedo orientarte con respuestas rápidas y preparar un diagnóstico por WhatsApp.',
  },
];

export default function SalesBot({ isOpen, onOpen, onClose }: SalesBotProps) {
  const [messages, setMessages] = useState<BotMessage[]>(initialMessages);
  const [signals, setSignals] = useState<LeadSignal[]>([]);
  const [profile, setProfile] = useState<SalesBotLeadProfile>({});
  const [activeReplyId, setActiveReplyId] = useState(salesBotConfig.quickReplies[0].id);
  const [lastSubmittedScore, setLastSubmittedScore] = useState<number | null>(null);

  const score = scoreLead(signals);
  const leadTemperature = classifyLead(score);
  const recommendedOffer = recommendOffer(profile);
  const recommendedOfferLabel = getOfferLabel(recommendedOffer);
  const recommendedOfferReason = getOfferReason(recommendedOffer);
  const diagnosisHref = buildWhatsAppLink(
    buildDiagnosisMessage({ offerLabel: recommendedOfferLabel, score }),
  );

  const payload = useMemo<SalesBotLeadPayload>(() => {
    const now = new Date().toISOString();

    return {
      source: 'poweredbyia.com',
      channel: 'sales_bot',
      leadTemperature,
      score,
      recommendedOffer,
      businessType: profile.businessType || '',
      hasWebsite: typeof profile.hasWebsite === 'boolean' ? profile.hasWebsite : null,
      goal: profile.goal || '',
      message: profile.message || '',
      ctaClicked: profile.ctaClicked || '',
      pageUrl: typeof window === 'undefined' ? '' : window.location.href,
      createdAt: now,
      userAgent: typeof window === 'undefined' ? '' : window.navigator.userAgent,
    };
  }, [leadTemperature, profile, recommendedOffer, score]);

  async function submitLead(nextPayload: SalesBotLeadPayload) {
    try {
      await fetch('/api/pbia-lead', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(nextPayload),
        keepalive: true,
      });
    } catch {
      // The sales bot must never block the landing or the WhatsApp CTA.
    }
  }

  function appendMessages(reply: SalesBotQuickReply) {
    setMessages((current) => [
      ...current,
      { id: `${reply.id}-user-${current.length}`, role: 'user', text: reply.userText },
      { id: `${reply.id}-bot-${current.length}`, role: 'bot', text: reply.botText },
    ]);
  }

  function handleSelectReply(reply: SalesBotQuickReply) {
    const nextSignals = [...signals, ...reply.signals];
    const nextProfile = { ...profile, ...reply.profilePatch };
    const nextScore = scoreLead(nextSignals);
    const nextTemperature = classifyLead(nextScore);
    const nextOffer = recommendOffer(nextProfile);

    setSignals(nextSignals);
    setProfile(nextProfile);
    setActiveReplyId(reply.id);
    appendMessages(reply);

    if (nextTemperature === 'hot' && lastSubmittedScore !== nextScore) {
      setLastSubmittedScore(nextScore);
      submitLead({
        ...payload,
        leadTemperature: nextTemperature,
        score: nextScore,
        recommendedOffer: nextOffer,
        hasWebsite: typeof nextProfile.hasWebsite === 'boolean' ? nextProfile.hasWebsite : null,
        goal: nextProfile.goal || '',
        ctaClicked: nextProfile.ctaClicked || '',
      });
    }
  }

  function handleDiagnosisClick() {
    const nextSignals = [...signals, 'clicked_whatsapp' as LeadSignal];
    const nextScore = scoreLead(nextSignals);

    setSignals(nextSignals);
    setProfile((current) => ({ ...current, ctaClicked: 'diagnosis' }));
    submitLead({
      ...payload,
      ctaClicked: 'diagnosis',
      score: nextScore,
      leadTemperature: classifyLead(nextScore),
    });
  }

  return (
    <>
      <SalesBotLauncher onOpen={onOpen} leadTemperature={leadTemperature} />
      {isOpen ? (
        <SalesBotPanel
          messages={messages}
          replies={salesBotConfig.quickReplies}
          activeReplyId={activeReplyId}
          score={score}
          leadTemperature={leadTemperature}
          recommendedOfferLabel={recommendedOfferLabel}
          recommendedOfferReason={recommendedOfferReason}
          diagnosisHref={diagnosisHref}
          onClose={onClose}
          onSelectReply={handleSelectReply}
          onDiagnosisClick={handleDiagnosisClick}
        />
      ) : null}
    </>
  );
}
