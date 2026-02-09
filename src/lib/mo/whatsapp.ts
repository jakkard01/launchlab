type WhatsAppParams = {
  productName: string;
  qty: number;
  pickup: boolean;
  zone?: string;
};

const WHATSAPP_NUMBER = "50300000000"; // TODO: reemplazar con el numero real.

export const buildWhatsAppMessageLink = (message: string) => {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
};

export const buildWhatsAppLink = ({
  productName,
  qty,
  pickup,
  zone,
}: WhatsAppParams) => {
  const pickupLabel = pickup ? "Pickup" : "Delivery";
  const userZone = zone ?? "mi zona";
  const message = `Hola, quiero ${productName} x${qty}. ${pickupLabel}. Estoy en ${userZone}.`;
  return buildWhatsAppMessageLink(message);
};
