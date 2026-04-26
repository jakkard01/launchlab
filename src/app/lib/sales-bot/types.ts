export type LeadTemperature = 'cold' | 'warm' | 'hot';

export type RecommendedOffer =
  | 'mejora_web_express'
  | 'web_local_base'
  | 'pack_web_contactos'
  | 'pack_pro_captacion';

export type LeadSignal =
  | 'asked_price'
  | 'has_business'
  | 'has_website'
  | 'no_website'
  | 'wants_more_contacts'
  | 'asked_timeline'
  | 'requested_budget'
  | 'clicked_whatsapp';

export type SalesBotLeadPayload = {
  source: 'poweredbyia.com';
  channel: 'sales_bot';
  leadTemperature: LeadTemperature;
  score: number;
  recommendedOffer: RecommendedOffer;
  businessType: string;
  hasWebsite: boolean | null;
  goal: string;
  message: string;
  ctaClicked: string;
  pageUrl: string;
  createdAt: string;
  userAgent: string;
};

export type SalesBotLeadProfile = {
  businessType?: string;
  hasWebsite?: boolean | null;
  goal?: 'improve_website' | 'new_website' | 'more_contacts' | 'complete_capture' | '';
  message?: string;
  ctaClicked?: string;
};

export type SalesBotQuickReply = {
  id: string;
  label: string;
  userText: string;
  botText: string;
  signals: LeadSignal[];
  profilePatch?: Partial<SalesBotLeadProfile>;
};
