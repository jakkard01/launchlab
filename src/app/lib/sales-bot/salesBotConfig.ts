import { buildWhatsAppLink } from './whatsapp';
import type { SalesBotQuickReply } from './types';

export const salesBotConfig = {
  source: 'poweredbyia.com',
  channel: 'sales_bot',
  dryRunNotice:
    'Modo demo/offline. No es atención automática 24/7 y no sustituye revisión humana.',
  diagnosisWhatsAppUrl: buildWhatsAppLink(
    'Hola Powered by IA, quiero pedir un diagnostico gratis para mi negocio local.',
  ),
  quickReplies: [
    {
      id: 'has-website',
      label: 'Ya tengo web',
      userText: 'Ya tengo web',
      botText:
        'Entonces revisaría claridad, móvil y llamadas a la acción. Puede encajar Mejora Web Express desde 180 €.',
      signals: ['has_business', 'has_website'],
      profilePatch: { hasWebsite: true, goal: 'improve_website' },
    },
    {
      id: 'no-website',
      label: 'No tengo web',
      userText: 'No tengo web',
      botText:
        'Para empezar con algo claro y profesional, suele encajar Web Local Base desde 350 €.',
      signals: ['has_business', 'no_website'],
      profilePatch: { hasWebsite: false, goal: 'new_website' },
    },
    {
      id: 'more-contacts',
      label: 'Quiero más contactos',
      userText: 'Quiero más contactos',
      botText:
        'Si el objetivo es captar y ordenar consultas, el pack recomendado es Web + Contactos desde 500 €.',
      signals: ['has_business', 'wants_more_contacts'],
      profilePatch: { goal: 'more_contacts' },
    },
    {
      id: 'prices',
      label: 'Quiero saber precios',
      userText: 'Quiero saber precios',
      botText:
        'Referencias: mejora desde 180 €, web base desde 350 €, web + contactos desde 500 € y captación pro desde 750 €.',
      signals: ['asked_price'],
    },
    {
      id: 'whatsapp',
      label: 'Quiero hablar por WhatsApp',
      userText: 'Quiero hablar por WhatsApp',
      botText:
        'Perfecto. Te dejo el botón directo a WhatsApp con contexto para pedir diagnóstico.',
      signals: ['requested_budget', 'clicked_whatsapp'],
      profilePatch: { ctaClicked: 'whatsapp' },
    },
    {
      id: 'diagnosis',
      label: 'Quiero diagnóstico gratis',
      userText: 'Quiero diagnóstico gratis',
      botText:
        'Buen siguiente paso. Con unas pocas respuestas puedo orientar el paquete y pasarte a WhatsApp.',
      signals: ['requested_budget', 'clicked_whatsapp'],
      profilePatch: { ctaClicked: 'diagnosis' },
    },
  ] satisfies SalesBotQuickReply[],
};
