export const PBIA_WHATSAPP_NUMBER = '34911528753';

export function buildWhatsAppLink(message: string) {
  return `https://wa.me/${PBIA_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
