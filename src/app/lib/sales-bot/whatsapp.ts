export const PBIA_WHATSAPP_NUMBER = '34911528753';

export function buildWhatsAppLink(message: string) {
  return `https://wa.me/${PBIA_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function buildDiagnosisMessage({
  offerLabel,
  score,
}: {
  offerLabel: string;
  score: number;
}) {
  return [
    'Hola Powered by IA, quiero pedir un diagnostico gratis.',
    `Me interesa: ${offerLabel}.`,
    `Score demo del bot: ${score}.`,
  ].join(' ');
}
