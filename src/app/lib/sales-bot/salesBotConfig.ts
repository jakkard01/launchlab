import { buildWhatsAppLink } from './whatsapp';

export const salesBotConfig = {
  source: 'poweredbyia.com',
  channel: 'sales_bot',
  dryRunNotice:
    'Modo demo/offline. No es atención automática 24/7 y no sustituye revisión humana.',
  diagnosisWhatsAppUrl: buildWhatsAppLink(
    'Hola Powered by IA, quiero pedir un diagnostico gratis para mi negocio local.',
  ),
};
