import type { Product } from "../../../lib/mo/types";
import CatalogSection from "../CatalogSection";
import FreeTextOrder from "../FreeTextOrder";
import type { TabId } from "../catalogConfig";
import { MO_STORE_HOURS_LABEL, MO_STORE_MAPS_URL } from "../../../lib/mo/config";

type MoSectionsProps = {
  products: Product[];
  activeTab: TabId;
  onTabChange: (next: TabId) => void;
  query: string;
  onScrollToSpecial: () => void;
};

export default function MoSections({
  products,
  activeTab,
  onTabChange,
  query,
  onScrollToSpecial,
}: MoSectionsProps) {
  return (
    <section className="space-y-10">
      <CatalogSection
        products={products}
        activeTab={activeTab}
        onTabChange={onTabChange}
        query={query}
        onScrollToSpecial={onScrollToSpecial}
      />

      <section className="grid gap-4 rounded-3xl border border-slate-200 bg-white px-6 py-8 shadow-sm sm:grid-cols-3 sm:px-8">
        <div className="sm:col-span-3">
          <p className="text-xs uppercase tracking-[0.3em] text-emerald-600">
            Cómo pedir
          </p>
          <p className="mt-2 text-sm text-slate-600">
            3 pasos para pedir y retirar.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 px-4 py-4">
          <p className="text-xs font-semibold text-emerald-600">Paso 1</p>
          <p className="mt-1 text-sm font-semibold text-slate-900">
            Elige del catálogo
          </p>
          <p className="mt-1 text-xs text-slate-500">
            Usa el buscador y categorías rápidas.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 px-4 py-4">
          <p className="text-xs font-semibold text-emerald-600">Paso 2</p>
          <p className="mt-1 text-sm font-semibold text-slate-900">
            Escribe por WhatsApp
          </p>
          <p className="mt-1 text-xs text-slate-500">
            Confirmamos tu pedido en minutos.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 px-4 py-4">
          <p className="text-xs font-semibold text-emerald-600">Paso 3</p>
          <p className="mt-1 text-sm font-semibold text-slate-900">
            Pasás a recoger
          </p>
          <p className="mt-1 text-xs text-slate-500">
            Listo para retirar.
          </p>
        </div>
      </section>

      <div id="pedido-especial" className="scroll-mt-28">
        <FreeTextOrder />
      </div>

      <section className="rounded-3xl border border-slate-200 bg-white px-6 py-8 shadow-sm sm:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-emerald-600">
              Horario y ubicacion
            </p>
            <p className="mt-2 text-sm text-slate-600">
              {MO_STORE_HOURS_LABEL}
            </p>
            <p className="mt-2 text-sm text-slate-600">
              Si vas tarde, escribinos por WhatsApp y te confirmamos si seguimos
              atendiendo.
            </p>
          </div>
          <a
            href={MO_STORE_MAPS_URL}
            className="h-11 rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-emerald-300 hover:text-emerald-700"
            target="_blank"
            rel="noopener noreferrer"
          >
            Cómo llegar
          </a>
        </div>
      </section>
    </section>
  );
}
