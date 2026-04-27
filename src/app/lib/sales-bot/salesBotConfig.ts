import { buildWhatsAppLink } from './whatsapp';
import type { SalesBotQuickReply } from './types';

export const salesBotConfig = {
  source: 'poweredbyia.com',
  channel: 'sales_bot',
  dryRunNotice:
    'Modo respuestas rápidas. La IA comercial real está en preparación y no sustituye revisión humana.',
  diagnosisWhatsAppUrl: buildWhatsAppLink(
    'Hola Powered by IA, quiero pedir un diagnostico gratis para mi negocio local.',
  ),
  quickReplies: [
    {
      id: 'timeline',
      label: '¿Cuánto tarda una web?',
      userText: '¿Cuánto tarda una web?',
      botText:
        'Depende del alcance. Una landing local sencilla puede prepararse en pocos días si el material está claro. Lo primero es revisar tu caso y decirte qué haría antes de presupuestar.',
      signals: ['asked_timeline'],
    },
    {
      id: 'prices',
      label: '¿Cuánto cuesta?',
      userText: '¿Cuánto cuesta?',
      botText:
        'Referencias: mejora desde 180 €, web base desde 350 €, web + contactos desde 500 € y captación pro desde 750 €. El precio final depende del alcance.',
      signals: ['asked_price'],
    },
    {
      id: 'payment',
      label: '¿Cómo se paga?',
      userText: '¿Cómo se paga?',
      botText:
        'Ahora mismo podemos trabajar con transferencia bancaria o metálico. En proyectos más completos se puede reservar con anticipo y cerrar el resto al entregar o publicar.',
      signals: ['asked_price'],
    },
    {
      id: 'has-website',
      label: 'Ya tengo web',
      userText: 'Ya tengo web',
      botText:
        'Entonces probablemente encaje Mejora Web Express desde 180 € si la base sirve. Revisaría mensaje, móvil y contacto antes de recomendarte rehacerla.',
      signals: ['has_business', 'has_website'],
      profilePatch: { hasWebsite: true, goal: 'improve_website' },
    },
    {
      id: 'no-website',
      label: 'No tengo web',
      userText: 'No tengo web',
      botText:
        'Entonces puede encajar Web Local Base desde 350 €, una landing clara para explicar tu negocio y recibir contactos por WhatsApp, formulario o correo.',
      signals: ['has_business', 'no_website'],
      profilePatch: { hasWebsite: false, goal: 'new_website' },
    },
    {
      id: 'more-contacts',
      label: 'Quiero más contactos',
      userText: 'Quiero más contactos',
      botText:
        'Ahí suele encajar Pack Web + Contactos desde 500 €: web clara, siguiente paso visible y contacto ordenado. Es el recomendado si quieres algo más que presencia.',
      signals: ['has_business', 'wants_more_contacts'],
      profilePatch: { goal: 'more_contacts' },
    },
    {
      id: 'start',
      label: '¿Qué necesito para empezar?',
      userText: '¿Qué necesito para empezar?',
      botText:
        'Con una explicación breve del negocio, servicios, zona, forma de contacto y el enlace de tu web actual si existe, ya se puede hacer un primer diagnóstico.',
      signals: ['has_business'],
    },
    {
      id: 'ai-status',
      label: '¿El bot IA está activo?',
      userText: '¿El bot IA está activo?',
      botText:
        'Ahora mismo está en modo respuestas rápidas/demo. La versión con IA comercial real está en preparación y dependerá del servidor. No sustituye atención humana.',
      signals: [],
    },
    {
      id: 'whatsapp',
      label: 'Cómo contacto',
      userText: 'Quiero hablar por WhatsApp',
      botText:
        'Perfecto. Te dejo el botón directo a WhatsApp con contexto para pedir diagnóstico.',
      signals: ['requested_budget', 'clicked_whatsapp'],
      profilePatch: { ctaClicked: 'whatsapp' },
    },
    {
      id: 'diagnosis',
      label: 'Pedir diagnóstico gratis',
      userText: 'Quiero diagnóstico gratis',
      botText:
        'Buen siguiente paso. Envíame tu web o cuéntame tu negocio y te respondo con 3 mejoras claras: mensaje, móvil y contacto.',
      signals: ['requested_budget', 'clicked_whatsapp'],
      profilePatch: { ctaClicked: 'diagnosis' },
    },
  ] satisfies SalesBotQuickReply[],
};
