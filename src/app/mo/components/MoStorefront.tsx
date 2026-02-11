"use client";

import { useCallback, useState } from "react";
import type { Product } from "../../../lib/mo/types";
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
      <MoHero ctaLink={ctaLink} />
      <MoQuickShop
        products={products}
        activeTab={activeTab}
        onJumpToTab={handleJumpToTab}
        onScrollToSpecial={() => scrollToId("pedido-especial")}
      />
      <MoSections
        products={products}
        activeTab={activeTab}
        onTabChange={handleJumpToTab}
        query={query}
      />
    </div>
  );
}
