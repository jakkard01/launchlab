"use client";

import { useState } from "react";
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
        onTabChange={setActiveTab}
      />
      <MoSections
        products={products}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        query={query}
      />
    </div>
  );
}
