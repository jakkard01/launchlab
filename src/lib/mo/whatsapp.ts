type WhatsAppParams = {
  productName: string;
  qty: number;
  pickup: boolean;
  note?: string;
  zone?: string;
};

const WHATSAPP_NUMBER = "503XXXXXXXX";

export const buildWhatsAppMessageLink = (message: string) => {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
};

export const buildWhatsAppLink = ({
  productName,
  qty,
  pickup,
  note,
  zone,
}: WhatsAppParams) => {
  const pickupLabel = pickup ? "Pickup" : "Delivery";
  const userZone = zone && zone.trim().length > 0 ? zone.trim() : "____";
  const noteLine =
    note && note.trim().length > 0 ? ` Nota: ${note.trim()}.` : "";
  const message = `Hola, quiero ${productName} x${qty}.${noteLine} ${pickupLabel}. Estoy cerca de: ${userZone}.`;
  return buildWhatsAppMessageLink(message);
};

type WhatsAppFreeTextParams = {
  item: string;
  note?: string;
  zone?: string;
};

export const buildWhatsAppLinkFreeText = ({
  item,
  note,
  zone,
}: WhatsAppFreeTextParams) => {
  const safeItem = item.trim().length > 0 ? item.trim() : "algo adicional";
  const userZone = zone && zone.trim().length > 0 ? zone.trim() : "____";
  const noteLine =
    note && note.trim().length > 0 ? ` Nota: ${note.trim()}.` : " Nota: -.";
  const message = `Hola YRS Minisúper, necesito: ${safeItem}.${noteLine} Estoy cerca de: ${userZone}. Pickup.`;
  return buildWhatsAppMessageLink(message);
};
