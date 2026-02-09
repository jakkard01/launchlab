import { buildWhatsAppMessageLink } from "../../lib/mo/whatsapp";

export default function StickyWhatsAppButton() {
  const message = "Hola, quiero hacer un pedido para pickup.";
  const whatsappLink = buildWhatsAppMessageLink(message);

  return (
    <div className="fixed bottom-4 left-0 right-0 z-50 flex justify-center sm:hidden">
      <a
        href={whatsappLink}
        className="rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-emerald-600"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Abrir WhatsApp para pedido pickup"
      >
        WhatsApp pickup
      </a>
    </div>
  );
}
