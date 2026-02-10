type WhatsAppParams = {
  productName: string;
  qty: number;
  pickup: boolean;
  note?: string;
  zone?: string;
};

const WHATSAPP_NUMBER = "34911528753".replace(/^\+/, "");

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

type CartItemInput = {
  name: string;
  qty: number;
  price?: string;
};

const parsePrice = (price?: string) => {
  if (!price) return null;
  const numeric = Number(price.replace(/[^0-9.]/g, ""));
  return Number.isFinite(numeric) ? numeric : null;
};

export const buildOrderWhatsAppLink = (
  items: CartItemInput[],
  zone: string,
  note: string
) => {
  const lines = items.map((item) => {
    const parsed = parsePrice(item.price);
    const subtotal = parsed !== null ? parsed * item.qty : null;
    const subtotalLabel = subtotal !== null ? ` = $${subtotal.toFixed(2)}` : "";
    return `- ${item.qty} x ${item.name}${subtotalLabel}`;
  });
  const totals = items
    .map((item) => {
      const parsed = parsePrice(item.price);
      return parsed !== null ? parsed * item.qty : null;
    })
    .filter((value): value is number => value !== null);
  const total =
    totals.length === items.length
      ? `Total estimado: $${totals
          .reduce((sum, value) => sum + value, 0)
          .toFixed(2)}`
      : "Total estimado: por confirmar";
  const zoneLine = `Ubicación de referencia: ${zone.trim().length > 0 ? zone.trim() : "____"}.`;
  const noteLine = `Nota: ${note.trim().length > 0 ? note.trim() : "-"}.`;
  const messageParts = [
    "YRS Minisúper (La Gloria)",
    "Pedido para pickup:",
    ...lines,
    total,
    zoneLine,
    noteLine,
    "Gracias.",
  ].filter((part) => part.length > 0);
  return buildWhatsAppMessageLink(messageParts.join("\n"));
};
