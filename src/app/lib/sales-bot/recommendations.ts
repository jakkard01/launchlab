import type { RecommendedOffer, SalesBotLeadProfile } from './types';

export function getOfferLabel(offer: RecommendedOffer) {
  const labels: Record<RecommendedOffer, string> = {
    mejora_web_express: 'Mejora Web Express — desde 180 €',
    web_local_base: 'Web Local Base — desde 350 €',
    pack_web_contactos: 'Pack Web + Contactos — desde 500 €',
    pack_pro_captacion: 'Pack Pro Captación — desde 750 €',
  };

  return labels[offer];
}

export function recommendOffer(profile: SalesBotLeadProfile): RecommendedOffer {
  if (profile.goal === 'complete_capture') return 'pack_pro_captacion';
  if (profile.goal === 'more_contacts') return 'pack_web_contactos';
  if (profile.hasWebsite === true) return 'mejora_web_express';
  if (profile.hasWebsite === false) return 'web_local_base';
  return 'pack_web_contactos';
}

export function getOfferReason(offer: RecommendedOffer) {
  const reasons: Record<RecommendedOffer, string> = {
    mejora_web_express:
      'Encaja si ya tienes web y quieres hacerla más clara, móvil y orientada a contacto.',
    web_local_base:
      'Encaja si necesitas una presencia profesional simple para explicar tu negocio y recibir consultas.',
    pack_web_contactos:
      'Encaja si además de verte mejor quieres recoger y ordenar contactos desde el primer día.',
    pack_pro_captacion:
      'Encaja si buscas una presencia más seria, más copy, SEO local y medición básica.',
  };

  return reasons[offer];
}
