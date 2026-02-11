"use client";

import { useCallback, useEffect, useState } from "react";
import type { Product } from "../../../lib/mo/types";
import { getMoDataAdapter } from "../../../lib/mo/data";
import type { TabId } from "../catalogConfig";
import MoHeader from "./MoHeader";
import MoHero from "./MoHero";
import MoQuickShop from "./MoQuickShop";
import MoSections from "./MoSections";

type MoStorefrontProps = {
  products: Product[];
  ctaLink: string;
};

export default function MoStorefront({ products, ctaLink }: MoStorefrontProps) {
  const [activeTab, setActiveTab] = useState<TabId>("hot");
  const [query, setQuery] = useState("");
  const [catalog, setCatalog] = useState<Product[]>(products);
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
        setCatalog(data);
        setError(null);
      } catch (err) {
        if (!active) return;
        setError("No se pudo cargar el catálogo.");
      } finally {
        if (active) setLoading(false);
      }
    };

    loadProducts();

    return () => {
      active = false;
    };
  }, []);

  const scrollToId = useCallback((id: string) => {
    const target = document.getElementById(id);
    if (!target) return;
    const top = target.getBoundingClientRect().top + window.scrollY - 96;
    window.scrollTo({ top, behavior: "smooth" });
  }, []);

  const handleJumpToTab = useCallback(
    (next: TabId) => {
      setActiveTab(next);
      scrollToId(`catalogo-${next}`);
    },
    [scrollToId]
  );

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 pb-10">
      <MoHeader
        query={query}
        onQueryChange={setQuery}
        whatsappLink={ctaLink}
      />
      {error ? (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {error}
        </div>
      ) : null}
      {loading ? (
        <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-500">
          Cargando catálogo...
        </div>
      ) : null}
      <MoHero ctaLink={ctaLink} />
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
      />
    </div>
  );
}
