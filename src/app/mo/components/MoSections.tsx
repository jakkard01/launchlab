import type { Product } from "../../../lib/mo/types";
import CatalogSection from "../CatalogSection";
import FreeTextOrder from "../FreeTextOrder";
import type { TabId } from "../catalogConfig";
import {
  MO_STORE_HOURS_LABEL,
  MO_STORE_MAPS_URL,
  MO_STORE_NOTE_IF_MISSING,
  MO_STORE_PAYMENT_LABEL,
  MO_STORE_RESPONSE_TIME_LABEL,
} from "../../../lib/mo/config";
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
  whatsappLink: string;
  headerMode: "full" | "compact" | "hidden";
};

export default function MoSections({
  products,
  activeTab,
  onTabChange,
  query,
  onScrollToSpecial,
  onClearQuery,
  whatsappLink,
  headerMode,
}: MoSectionsProps) {
  return (
    <section className="space-y-8">
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

      <CatalogSection
        products={products}
        activeTab={activeTab}
        onTabChange={onTabChange}
        query={query}
        onScrollToSpecial={onScrollToSpecial}
        onClearQuery={onClearQuery}
        headerMode={headerMode}
      />

      <section className="rounded-3xl border border-default bg-surface px-4 py-5 shadow-sm dark:bg-[var(--surface-2)] dark:shadow-[0_18px_40px_rgba(3,8,16,0.2)] sm:px-6">
        <p className="text-xs uppercase tracking-[0.3em] text-[var(--accent)]">
          Cómo pedir
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border border-default bg-surface-3 px-4 py-4">
            <p className="text-sm font-semibold text-main">1. Elige tus productos</p>
            <p className="mt-2 text-sm text-muted-strong">
              Usa el buscador o entra por categorías para comprar más rápido.
            </p>
          </div>
          <div className="rounded-2xl border border-default bg-surface-3 px-4 py-4">
            <p className="text-sm font-semibold text-main">2. Manda el pedido por WhatsApp</p>
            <p className="mt-2 text-sm text-muted-strong">
              Puedes mandar lo que llevas o pedir algo que no aparezca.
            </p>
          </div>
          <div className="rounded-2xl border border-default bg-surface-3 px-4 py-4">
            <p className="text-sm font-semibold text-main">3. Te confirmamos y lo recoges en tienda</p>
            <p className="mt-2 text-sm text-muted-strong">
              Vas solo cuando ya está claro qué hay y cómo retirar.
            </p>
          </div>
        </div>
        <div className="mt-4 grid gap-2 text-sm text-muted-strong sm:grid-cols-2">
          <p>Pago al retirar: {MO_STORE_PAYMENT_LABEL}.</p>
          <p>Si no ves algo, escríbenos.</p>
          <p>Confirmación antes de salir.</p>
          <p>{MO_STORE_RESPONSE_TIME_LABEL}</p>
        </div>
      </section>

      <MoLocalTrust
        onScrollToSpecial={onScrollToSpecial}
        whatsappLink={whatsappLink}
      />

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
              Pagos: {MO_STORE_PAYMENT_LABEL}.
            </p>
            <p className="mt-2 text-sm text-muted-strong">
              Horario: {MO_STORE_HOURS_LABEL}. {MO_STORE_NOTE_IF_MISSING}
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
