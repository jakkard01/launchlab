import type { LeadSignal, LeadTemperature } from './types';

export function scoreLead(signals: LeadSignal[]) {
  const weights: Record<LeadSignal, number> = {
    asked_price: 2,
    has_business: 3,
    has_website: 1,
    no_website: 2,
    wants_more_contacts: 3,
    asked_timeline: 2,
    requested_budget: 5,
    clicked_whatsapp: 5,
  };

  return signals.reduce((total, signal) => total + weights[signal], 0);
}

export function classifyLead(score: number): LeadTemperature {
  if (score >= 8) return 'hot';
  if (score >= 4) return 'warm';
  return 'cold';
}
