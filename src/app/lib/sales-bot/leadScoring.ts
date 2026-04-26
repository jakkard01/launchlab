import type { LeadSignal, LeadTemperature } from './types';

export const leadSignalWeights: Record<LeadSignal, number> = {
  asked_price: 2,
  has_business: 3,
  has_website: 1,
  no_website: 2,
  wants_more_contacts: 3,
  asked_timeline: 2,
  requested_budget: 5,
  clicked_whatsapp: 5,
};

export function scoreLead(signals: LeadSignal[]) {
  return signals.reduce((total, signal) => total + leadSignalWeights[signal], 0);
}

export function classifyLead(score: number): LeadTemperature {
  if (score >= 8) return 'hot';
  if (score >= 4) return 'warm';
  return 'cold';
}

export function getLeadTemperatureLabel(temperature: LeadTemperature) {
  const labels: Record<LeadTemperature, string> = {
    cold: 'Cliente frío',
    warm: 'Cliente potencial',
    hot: 'Cliente caliente',
  };

  return labels[temperature];
}
