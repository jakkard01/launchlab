import type { Product } from "../../lib/mo/types";
import { buildWhatsAppLink } from "../../lib/mo/whatsapp";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const whatsappLink = buildWhatsAppLink({
    productName: product.name,
    qty: 1,
    pickup: true,
  });

  return (
    <article className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-lg font-semibold text-slate-900">{product.name}</h3>
        {product.isFeatured ? (
          <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2 py-1 text-[11px] uppercase tracking-[0.2em] text-emerald-700">
            Destacado
          </span>
        ) : null}
      </div>
      <p className="mt-2 text-sm text-emerald-700">{product.price}</p>
      <p className="mt-3 text-sm text-slate-600">{product.description}</p>
      <div className="mt-4">
        <span className="rounded-full border border-slate-200 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-slate-500">
          {product.category}
        </span>
      </div>
      <a
        href={whatsappLink}
        className="mt-5 rounded-full bg-emerald-500 px-5 py-2 text-center text-sm font-semibold text-white transition hover:bg-emerald-600"
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Pedir ${product.name} por WhatsApp`}
      >
        Pedir por WhatsApp
      </a>
    </article>
  );
}
