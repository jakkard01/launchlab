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
  onClearQuery: () => void;
};

export default function MoSections({
  products,
  activeTab,
  onTabChange,
  query,
  onScrollToSpecial,
  onClearQuery,
}: MoSectionsProps) {
  return (
    <section className="space-y-10">
      <section className="grid gap-4 rounded-3xl border border-default bg-surface px-6 py-6 shadow-sm dark:bg-[var(--surface-2)] dark:shadow-[0_18px_40px_rgba(3,8,16,0.2)] sm:grid-cols-3 sm:px-8">
        <div className="rounded-2xl border border-default bg-surface-3 px-4 py-4">
          <p className="text-xs uppercase tracking-[0.24em] text-[var(--accent)]">
            Tienda real
          </p>
          <p className="mt-2 text-sm font-semibold text-main">
            Local de barrio en La Gloria
          </p>
          <p className="mt-1 text-xs text-muted-strong">
            Compra directa, retiro fácil y trato real por WhatsApp.
          </p>
        </div>
        <div className="rounded-2xl border border-default bg-surface-3 px-4 py-4">
          <p className="text-xs uppercase tracking-[0.24em] text-[var(--accent)]">
            Pedido fácil
          </p>
          <p className="mt-2 text-sm font-semibold text-main">
            Confirmación por WhatsApp
          </p>
          <p className="mt-1 text-xs text-muted-strong">
            Te confirmamos disponibilidad, total y retiro antes de que salgas.
          </p>
        </div>
        <div className="rounded-2xl border border-default bg-surface-3 px-4 py-4">
          <p className="text-xs uppercase tracking-[0.24em] text-[var(--accent)]">
            Pago simple
          </p>
          <p className="mt-2 text-sm font-semibold text-main">
            Pagas al retirar
          </p>
          <p className="mt-1 text-xs text-muted-strong">
            Efectivo, transferencia o Tigo Money.
          </p>
        </div>
      </section>

      <CatalogSection
        products={products}
        activeTab={activeTab}
        onTabChange={onTabChange}
        query={query}
        onScrollToSpecial={onScrollToSpecial}
        onClearQuery={onClearQuery}
      />

      <section className="grid gap-4 rounded-3xl border border-default bg-surface px-6 py-8 shadow-sm dark:bg-[var(--surface-2)] dark:shadow-[0_18px_40px_rgba(3,8,16,0.2)] sm:grid-cols-3 sm:px-8">
        <div className="sm:col-span-3">
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--accent)]">
            Cómo pedir
          </p>
          <p className="mt-2 text-sm text-muted-strong">
            Lo resuelves en tres pasos cortos.
          </p>
        </div>
        <div className="rounded-2xl border border-default bg-surface-3 px-4 py-4">
          <p className="text-xs font-semibold text-[var(--accent)]">Paso 1</p>
          <p className="mt-1 text-sm font-semibold text-main">
            Elige del catálogo
          </p>
          <p className="mt-1 text-xs text-muted-strong">
            Usa el buscador, los pasillos y el pedido especial si te falta algo.
          </p>
        </div>
        <div className="rounded-2xl border border-default bg-surface-3 px-4 py-4">
          <p className="text-xs font-semibold text-[var(--accent)]">Paso 2</p>
          <p className="mt-1 text-sm font-semibold text-main">
            Escribe por WhatsApp
          </p>
          <p className="mt-1 text-xs text-muted-strong">
            Te confirmamos disponibilidad, total y tiempo de retiro.
          </p>
        </div>
        <div className="rounded-2xl border border-default bg-surface-3 px-4 py-4">
          <p className="text-xs font-semibold text-[var(--accent)]">Paso 3</p>
          <p className="mt-1 text-sm font-semibold text-main">
            Pasás a recoger
          </p>
          <p className="mt-1 text-xs text-muted-strong">
            Pasas cuando esté listo y pagas al retirar.
          </p>
        </div>
      </section>

      <div id="pedido-especial" className="scroll-mt-28">
        <FreeTextOrder />
      </div>

      <section className="rounded-3xl border border-default bg-surface px-6 py-8 shadow-sm dark:bg-[var(--surface-2)] dark:shadow-[0_18px_40px_rgba(3,8,16,0.2)] sm:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--accent)]">
              Ubicación, horario y pago
            </p>
            <p className="mt-2 text-sm font-semibold text-main">
              Retiro en La Gloria, San Salvador
            </p>
            <p className="mt-2 text-sm text-muted-strong">
              {MO_STORE_HOURS_LABEL}
            </p>
            <p className="mt-2 text-sm text-muted-strong">
              Si vas tarde, escríbenos y te confirmamos si seguimos atendiendo.
            </p>
            <p className="mt-2 text-sm text-muted-strong">
              Pagos: efectivo, transferencia o Tigo Money.
            </p>
            <p className="mt-2 text-sm text-muted-strong">
              Si necesitas varias cosas juntas, manda la lista por WhatsApp y te la dejamos preparada.
            </p>
          </div>
          <a
            href={MO_STORE_MAPS_URL}
            className="h-11 rounded-full border border-default bg-surface-3 px-4 py-2 text-sm font-semibold text-main transition hover:border-[var(--accent)]/45 hover:text-[var(--accent)]"
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
