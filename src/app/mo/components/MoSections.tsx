import type { Product } from "../../../lib/mo/types";
import CatalogSection from "../CatalogSection";
import FreeTextOrder from "../FreeTextOrder";
import type { TabId } from "../catalogConfig";
import { MO_STORE_HOURS_LABEL, MO_STORE_MAPS_URL } from "../../../lib/mo/config";
import MoPromos from "./MoPromos";
import MoQuickShop from "./MoQuickShop";
import MoLocalTrust from "./MoLocalTrust";

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
    <section className="space-y-8">
      <CatalogSection
        products={products}
        activeTab={activeTab}
        onTabChange={onTabChange}
        query={query}
        onScrollToSpecial={onScrollToSpecial}
        onClearQuery={onClearQuery}
      />

      <MoLocalTrust onScrollToSpecial={onScrollToSpecial} />

      {!query ? (
        <>
          <MoQuickShop
            products={products}
            activeTab={activeTab}
            onJumpToTab={onTabChange}
            onScrollToSpecial={onScrollToSpecial}
          />
          <MoPromos products={products} />
        </>
      ) : null}

      <div id="pedido-especial" className="scroll-mt-32 sm:scroll-mt-28">
        <FreeTextOrder />
      </div>

      <section className="rounded-3xl border border-default bg-surface px-4 py-5 shadow-sm dark:bg-[var(--surface-2)] dark:shadow-[0_18px_40px_rgba(3,8,16,0.2)] sm:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--accent)]">
              Retiro rápido
            </p>
            <p className="mt-2 text-sm font-semibold text-main">
              Confirmas por WhatsApp y pasas cuando ya está claro.
            </p>
            <p className="mt-2 text-sm text-muted-strong">
              Pagos: efectivo, transferencia o Tigo Money.
            </p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <a
              href="#inicio-rys"
              className="h-11 rounded-full border border-default bg-surface-3 px-4 py-2 text-center text-sm font-semibold text-main transition hover:border-[var(--accent)]/45 hover:text-[var(--accent)]"
            >
              Volver arriba
            </a>
            <a
              href={MO_STORE_MAPS_URL}
              className="h-11 rounded-full border border-default bg-surface-3 px-4 py-2 text-center text-sm font-semibold text-main transition hover:border-[var(--accent)]/45 hover:text-[var(--accent)]"
              target="_blank"
              rel="noopener noreferrer"
            >
              Cómo llegar
            </a>
          </div>
        </div>
      </section>
    </section>
  );
}
