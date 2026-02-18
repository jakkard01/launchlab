import { buildWhatsAppMessageLink } from "../../lib/mo/whatsapp";

export default function StickyWhatsAppButton() {
  const message = "Hola RYS Minisúper, quiero hacer un pedido para retiro.";
  const whatsappLink = buildWhatsAppMessageLink(message);

  return (
    <div className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] left-0 right-0 z-50 flex justify-center px-4 sm:hidden">
      <a
        href={whatsappLink}
        className="h-12 w-full max-w-xs rounded-full bg-[var(--accent)] px-6 py-3 text-center text-sm font-semibold text-[var(--surface)] shadow-lg transition hover:opacity-90"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Abrir WhatsApp para pedido retiro"
      >
        Escribir por WhatsApp
      </a>
    </div>
  );
}
