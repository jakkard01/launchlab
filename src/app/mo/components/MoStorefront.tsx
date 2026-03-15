"use client";

import { MouseEvent, useCallback, useEffect, useState } from "react";
import type { Product } from "../../../lib/mo/types";
import { getMoDataAdapter } from "../../../lib/mo/data";
import type { TabId } from "../catalogConfig";
import MoHeader from "./MoHeader";
import MoHero from "./MoHero";
import MoCombos from "./MoCombos";
import MoPromos from "./MoPromos";
import MoQuickShop from "./MoQuickShop";
import MoSections from "./MoSections";

type MoStorefrontProps = {
  products: Product[];
  ctaLink: string;
  hasAdminSession: boolean;
};

const filterHidden = (items: Product[]) =>
  items
    .filter((product) => product.status !== "hidden")
    .sort((a, b) => {
      const byOrder = (a.sortOrder ?? 9999) - (b.sortOrder ?? 9999);
      if (byOrder !== 0) return byOrder;
      return a.name.localeCompare(b.name, "es");
    });

export default function MoStorefront({
  products,
  ctaLink,
  hasAdminSession,
}: MoStorefrontProps) {
  const hasInitialCatalog = products.length > 0;
  const [activeTab, setActiveTab] = useState<TabId>("hot");
  const [query, setQuery] = useState("");
  const [catalog, setCatalog] = useState<Product[]>(filterHidden(products));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    const loadProducts = async () => {
      setLoading(true);
      try {
        const adapter = await getMoDataAdapter();
        const data = await adapter.getProducts();
        if (!active) return;
        setCatalog(filterHidden(data));
        setError(null);
      } catch (err) {
        if (!active) return;
        setError(hasInitialCatalog ? null : "No se pudo cargar el catálogo.");
      } finally {
        if (active) setLoading(false);
      }
    };

    loadProducts();

    return () => {
      active = false;
    };
  }, [hasInitialCatalog]);

  const scrollToId = useCallback((id: string) => {
    const target = document.getElementById(id);
    if (!target) return;
    // Keep anchor targets visible below the sticky RYS header (mobile is taller).
    const headerOffset = window.innerWidth < 640 ? 176 : 128;
    const top = target.getBoundingClientRect().top + window.scrollY - headerOffset;
    window.scrollTo({ top, behavior: "smooth" });
  }, []);

  const handleJumpToTab = useCallback(
    (next: TabId) => {
      setActiveTab(next);
      scrollToId(`catalogo-${next}`);
    },
    [scrollToId]
  );

  const readyProducts = catalog.length;

  const handleAnchorScroll = useCallback(
    (event: MouseEvent<HTMLAnchorElement>, id: string) => {
      event.preventDefault();
      scrollToId(id);
    },
    [scrollToId]
  );

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 pb-10">
      <MoHeader
        query={query}
        onQueryChange={setQuery}
        whatsappLink={ctaLink}
        hasAdminSession={hasAdminSession}
        onScrollToSpecial={() => scrollToId("pedido-especial")}
      />
      {error ? (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {error}
        </div>
      ) : null}
      {loading ? (
        <div className="rounded-2xl border border-default bg-surface px-4 py-3 text-sm text-muted-strong">
          Cargando catálogo...
        </div>
      ) : null}
      <MoHero ctaLink={ctaLink} />
      <section className="grid gap-3 rounded-3xl border border-default bg-surface px-4 py-4 shadow-sm dark:bg-[var(--surface-2)] dark:shadow-[0_18px_40px_rgba(3,8,16,0.22)] sm:grid-cols-[1.2fr,1fr,1fr] sm:px-6">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-[var(--accent)]">
            Resumen rápido
          </p>
          <p className="mt-2 text-sm font-semibold text-main">
            {readyProducts} productos visibles para retiro
          </p>
          <p className="mt-1 text-xs text-muted-strong">
            Catálogo rápido, confirmación por WhatsApp y retiro local.
          </p>
        </div>
        <a
          href="#catalogo-hot"
          onClick={(event) => {
            handleJumpToTab("hot");
            handleAnchorScroll(event, "catalogo-hot");
          }}
          className="rounded-2xl border border-default bg-surface-3 px-4 py-3 text-left text-sm font-semibold text-main transition hover:border-[var(--accent)]/45 hover:text-[var(--accent)]"
        >
          Ver caliente hoy
        </a>
        <a
          href="#pedido-especial"
          onClick={(event) => handleAnchorScroll(event, "pedido-especial")}
          className="rounded-2xl border border-default bg-surface-3 px-4 py-3 text-left text-sm font-semibold text-main transition hover:border-[var(--accent)]/45 hover:text-[var(--accent)]"
        >
          Pedir algo que no veo
        </a>
      </section>
      <MoCombos products={catalog} />
      <MoPromos products={catalog} />
      <MoQuickShop
        products={catalog}
        activeTab={activeTab}
        onJumpToTab={handleJumpToTab}
        onScrollToSpecial={() => scrollToId("pedido-especial")}
      />
      <MoSections
        products={catalog}
        activeTab={activeTab}
        onTabChange={handleJumpToTab}
        query={query}
        onScrollToSpecial={() => scrollToId("pedido-especial")}
      />
    </div>
  );
}
