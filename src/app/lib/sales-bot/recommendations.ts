import type { RecommendedOffer } from './types';

export function getOfferLabel(offer: RecommendedOffer) {
  const labels: Record<RecommendedOffer, string> = {
    mejora_web_express: 'Mejora Web Express — desde 180 €',
    web_local_base: 'Web Local Base — desde 350 €',
    pack_web_contactos: 'Pack Web + Contactos — desde 500 €',
    pack_pro_captacion: 'Pack Pro Captación — desde 750 €',
  };

  return labels[offer];
}
