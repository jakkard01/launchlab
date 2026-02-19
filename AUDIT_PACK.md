# Audit Pack (Gemini pre-deploy)

## Contexto fijo
- Repo canonico: /mnt/c/Demonio_IA/06_Web/launchlab__PROD (Windows: C:\\Demonio_IA\\06_Web\\launchlab__PROD)
- Symlink WSL: /home/hagga/work/launchlab__PROD -> /mnt/c/Demonio_IA/06_Web/launchlab__PROD
- Branch: feat/pagina-hermana-live
- Remote: git@github.com:jakkard01/launchlab.git
- Vercel project: launchlabv1
- Regla de copy: "RYS" es NOMBRE COMERCIAL (no acronimo). No expandir.

## Commit/branch actual
```
/home/hagga/work/launchlab__PROD
/mnt/c/Demonio_IA/06_Web/launchlab__PROD
feat/pagina-hermana-live
ac9b942 fix(admin): reduce csr deopt by splitting server/client 2026-02-18
236e053 perf(next-image): replace raw img where needed 2026-02-18
27b0cb0 fix(lint): resolve hook deps warnings 2026-02-18
cd91411 fix(rys-ui): enlarge pasillos icons + premium badge for readability 2026-02-18
4906c2c fix(rys-ui): improve product placeholder to feel intentional 2026-02-18
```

## Rutas criticas a revisar (local)
- http://localhost:3000/RYSminisuper
- http://localhost:3000/RYSminisuper/admin
- http://localhost:3000/demos
- http://localhost:3000/services
- http://localhost:3000/

## Archivos relevantes (exactos + razon)
- src/app/RYSminisuper/page.tsx: entrypoint publico de tienda RYS (CTA + data products).
- src/app/RYSminisuper/admin/page.tsx: entrypoint admin (reexport).
- src/app/mo/admin/AdminClient.tsx: UI/admin logic (ventas, stock, promos, hot state).
- src/app/mo/admin/acceso/page.tsx: pantalla de acceso admin.
- src/app/mo/components/MoStorefront.tsx: orquestacion storefront (hero, quick shop, sections).
- src/app/mo/components/MoHero.tsx: hero + CTA + copy principal.
- src/app/mo/components/MoQuickShop.tsx: pasillos y accesos rapidos.
- src/app/mo/CatalogSection.tsx: catalogo completo + tabs.
- src/app/mo/ProductCard.tsx: card de producto + stock/price/promo + CTA.
- src/app/mo/catalogConfig.ts: tabs, criterios de categorias.
- src/data/products.json: inventario base RYS.
- src/data/product_images.json: imagenes por clave (categorias).
- src/lib/mo/data/index.ts: selector de adapter (local/sheets/supabase).
- src/lib/mo/data/localAdapter.ts: data local (localStorage) + stats.
- src/app/demos/page.tsx: pagina de demos.
- src/app/demos/ShowcaseGrid.tsx: manejo de WIP vs demo/live.
- src/app/content/showcase.ts: data de demos.
- src/app/services/page.tsx: servicios core + CTAs.
- src/app/page.tsx: home metadata + JSON-LD.

## Tree parcial (RYS + data + adapter)
```
src/app/RYSminisuper/admin/page.tsx
src/app/RYSminisuper/page.tsx
src/app/mo/admin/AdminClient.tsx
src/app/mo/admin/page.tsx
src/app/mo/cart/CartButtonSticky.tsx
src/app/mo/cart/CartContext.tsx
src/app/mo/cart/CartDrawer.tsx
src/app/mo/cart/CartUI.tsx
src/app/mo/cart/QuantityStepper.tsx
src/app/mo/catalogConfig.ts
src/app/mo/CatalogSection.tsx
src/app/mo/components/MoHeader.tsx
src/app/mo/components/MoHero.tsx
src/app/mo/components/MoQuickShop.tsx
src/app/mo/components/MoSections.tsx
src/app/mo/components/MoStorefront.tsx
src/app/mo/FreeTextOrder.tsx
src/app/mo/page.tsx
src/app/mo/ProductCard.tsx
src/app/mo/StickyWhatsAppButton.tsx
src/data/products.json
src/data/product_images.json
src/lib/mo/config.ts
src/lib/mo/data/index.ts
src/lib/mo/data/localAdapter.ts
src/lib/mo/data/sheetsAdapter.ts
src/lib/mo/data/supabaseAdapter.ts
src/lib/mo/data/types.ts
src/lib/mo/pricing.ts
src/lib/mo/types.ts
src/lib/mo/whatsapp.ts
```

## Snippets clave (40-60 lineas max)

### RYS entrypoint + CTA
```tsx
import type { Metadata } from "next";
import productsData from "../../data/products.json";
import type { Product } from "../../lib/mo/types";
import { buildWhatsAppMessageLink } from "../../lib/mo/whatsapp";
import { CartProvider } from "../mo/cart/CartContext";
import CartUI from "../mo/cart/CartUI";
import MoStorefront from "../mo/components/MoStorefront";

export const metadata: Metadata = {
  title: "RYS Minisúper",
  description: "Retiro en La Gloria, San Salvador.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function RysMiniSuperPage() {
  const products: Product[] = productsData;
  const ctaLink = buildWhatsAppMessageLink(
    "Hola RYS Minisúper, quiero hacer un pedido para retiro."
  );

  return (
    <CartProvider>
      <main className="min-h-screen w-full px-4 pb-36 pt-10 sm:px-6 lg:px-8">
        <MoStorefront products={products} ctaLink={ctaLink} />
        <CartUI />
      </main>
    </CartProvider>
  );
}
```

### Storefront orchestration
```tsx
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
        onScrollToSpecial={() => scrollToId("pedido-especial")}
      />
    </div>
  );
}
```

### Hero/CTA RYS
```tsx
export default function MoHero({ ctaLink }: MoHeroProps) {
  return (
    <section className="space-y-4">
      <div className="flex h-10 items-center justify-center rounded-2xl border border-default bg-surface px-4 text-center text-xs text-main sm:justify-between sm:text-sm">
        <span className="text-main">Pedís por WhatsApp y pasás a recoger. Sin vueltas.</span>
        <span className="hidden text-muted sm:inline">
          La Gloria • {MO_STORE_HOURS_LABEL}
        </span>
      </div>
      <div
        className="relative overflow-hidden rounded-3xl border border-default bg-surface px-6 py-6 shadow-sm sm:px-8"
        data-hero-bg="placeholder-gradient"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,color-mix(in_srgb,var(--accent)_20%,transparent),transparent_55%),radial-gradient(circle_at_85%_20%,color-mix(in_srgb,var(--accent)_12%,transparent),transparent_60%),linear-gradient(135deg,color-mix(in_srgb,var(--accent)_10%,transparent),transparent_70%)]" />
        <div className="absolute inset-0 bg-[color-mix(in_srgb,var(--surface)_65%,transparent)] backdrop-blur-[2px]" />
        <div className="relative">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--accent)]">
            TIENDA EXPRESS
          </p>
          <h1 className="mt-3 text-3xl font-semibold text-main sm:text-4xl">
            RYS Minisúper
          </h1>
          <p className="mt-2 text-sm text-muted">
            Retiro en La Gloria, San Salvador
          </p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href={ctaLink}
              className="h-12 rounded-full bg-[var(--accent)] px-6 py-3 text-center text-sm font-semibold text-[var(--surface)] transition hover:opacity-90"
              target="_blank"
              rel="noopener noreferrer"
            >
              Escribir por WhatsApp
            </a>
            <a
              href="#catalogo"
              className="h-12 rounded-full border border-default px-6 py-3 text-center text-sm font-semibold text-main transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              Ver catálogo
            </a>
            <a
              href={MO_STORE_MAPS_URL}
              className="h-12 rounded-full border border-[var(--accent)]/40 px-6 py-3 text-center text-sm font-semibold text-main transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
              target="_blank"
              rel="noopener noreferrer"
            >
              ¿Dónde estamos?
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
```

### Admin entrypoint + acceso
```tsx
export { default } from "../../mo/admin/page";
```
```tsx
export default function MoAdminAccessPage() {
  return (
    <main className="min-h-screen w-full px-4 pb-20 pt-12 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-lg rounded-3xl border border-slate-200 bg-white px-6 py-8 shadow-sm">
        <p className="text-xs uppercase tracking-[0.3em] text-emerald-600">
          Acceso admin
        </p>
        <h1 className="mt-3 text-2xl font-semibold text-slate-900">
          Panel restringido
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Este panel es solo para administración. Si necesitas acceso, pedilo al
          responsable.
        </p>
        <a
          href="/RYSminisuper"
          className="mt-6 inline-flex h-11 items-center justify-center rounded-full border border-slate-200 px-5 text-sm font-semibold text-slate-600 transition hover:border-emerald-300 hover:text-emerald-700"
        >
          Volver a la tienda
        </a>
      </div>
    </main>
  );
}
```

### Admin core (estado/ventas)
```tsx
const loadSnapshot = useCallback(async (activeAdapter: MoDataAdapter) => {
  const snapshot = await activeAdapter.getAdminSnapshot();
  setProducts(snapshot.products);
  setStock(snapshot.stock);
  setPrices(snapshot.prices);
  setPromo(snapshot.promo);
  setHotToday(snapshot.hotToday);
  setOrderLogs(snapshot.orderLogs);
}, []);

const registerSale = async () => {
  if (!adapter) return;
  if (!saleProductId) return;

  const product = products.find((item) => item.id === saleProductId);
  if (!product) return;

  const saleEntry: OrderLogInput = {
    items: [
      {
        productId: saleProductId,
        quantity: safeQuantity,
      },
    ],
    total: saleTotal,
    channel: "manual",
    note: product.name,
  };

  try {
    await adapter.logOrder(saleEntry);
    await reloadAll(adapter);
  } catch (err) {
    setError("No se pudo registrar la venta.");
    await reloadAll(adapter);
  }
};
```

### Data adapter (local vs sheets/supabase)
```ts
export const getMoDataAdapter = async (): Promise<MoDataAdapter> => {
  const backend = process.env.DATA_BACKEND ?? "local";

  if (backend === "sheets") {
    const adapterModule = await import("./sheetsAdapter");
    return adapterModule.sheetsAdapter;
  }

  if (backend === "supabase") {
    const adapterModule = await import("./supabaseAdapter");
    return adapterModule.supabaseAdapter;
  }

  return localAdapter;
};
```

### Demos: WIP handling
```tsx
const ctaHref = item.status === "wip" ? "/contact?source=demos" : item.ctaHref;
const ctaLabel = item.status === "wip" ? "Pedir acceso" : item.ctaLabel;
```

## Resultados de comandos

### pnpm lint
```
/bin/bash: line 1: pnpm: command not found
```

### pnpm build
```
/bin/bash: line 1: pnpm: command not found
```

### pnpm test
```
/bin/bash: line 1: pnpm: command not found
```

### Hash video (asset critico)
```
ffbb3f4187f31788ff09b2ada20575d9a1d217f059d347fdefc3a078d5221b40  public/video/video.mp4
```

## Checklist GO/NO-GO (preliminar)
- GO si: lint/build pasan, rutas RYS/admin/demos/services consistentes, assets cargan.
- NO-GO si: pnpm no disponible, build falla, RYS copy o CTA inconsistente, WIP visible como live.


## Build Results

### pnpm install
```
Progress: resolved 1, reused 0, downloaded 0, added 0
WARN deprecated eslint@8.57.1: This version is no longer supported. Please see https://eslint.org/version-support for other options.
WARN deprecated next@13.4.0: This version has a security vulnerability. Please upgrade to a patched version. See https://nextjs.org/blog/security-update-2025-12-11 for more details.
WARN 6 deprecated subdependencies found: @humanwhocodes/config-array@0.13.0, @humanwhocodes/object-schema@2.0.3, glob@7.1.7, glob@7.2.3, inflight@1.0.6, rimraf@3.0.2
Packages: +353
Ignored build scripts: unrs-resolver@1.11.1 (pnpm approve-builds)
Done in 1m 5.2s using pnpm v10.30.0
```

### pnpm lint
```
> launchlab@1.0.0 lint /mnt/c/Demonio_IA/06_Web/launchlab__PROD
> next lint

info  - Loaded env from /mnt/c/Demonio_IA/06_Web/launchlab__PROD/.env.local
✔ No ESLint warnings or errors
```

### pnpm build
```
> launchlab@1.0.0 build /mnt/c/Demonio_IA/06_Web/launchlab__PROD
> next build

info  - Loaded env from /mnt/c/Demonio_IA/06_Web/launchlab__PROD/.env.local
info  - Creating an optimized production build...
info  - Compiled successfully
info  - Linting and checking validity of types...
info  - Collecting page data...
info  - Generating static pages (33/33)
info  - Finalizing page optimization...

Route (app)                                Size     First Load JS
┌ ○ /                                      14.7 kB         102 kB
├ ○ /_not-found                            0 B                0 B
├ ○ /admin                                 2.48 kB        79.6 kB
├ ○ /alcance                               210 B            83 kB
├ λ /api/admin/login                       0 B                0 B
├ λ /api/admin/logout                      0 B                0 B
├ λ /api/admin/me                          0 B                0 B
├ λ /api/contact                           0 B                0 B
├ λ /api/health                            0 B                0 B
├ λ /api/products                          0 B                0 B
├ λ /api/products/[id]                     0 B                0 B
├ ○ /bots                                  210 B            83 kB
├ λ /contact                               2.02 kB        79.1 kB
├ ○ /courses                               415 B          77.5 kB
├ ○ /cursos                                1.04 kB        78.1 kB
├ ○ /demos                                 2.72 kB        85.5 kB
├ λ /demos/[slug]                          426 B          83.2 kB
├ ○ /demos/bot                             3.31 kB        89.9 kB
├ ○ /demos/business-os                     4.19 kB          87 kB
├ ○ /demos/whatsapp                        1.02 kB          82 kB
├ ○ /mo                                    415 B          77.5 kB
├ ○ /mo/admin                              138 B          83.8 kB
├ ○ /mo/admin/acceso                       161 B          77.3 kB
├ ○ /ops                                   209 B            83 kB
├ ○ /portfolio                             209 B            83 kB
├ λ /portfolio/[slug]                      426 B          83.2 kB
├ ○ /pricing                               179 B            82 kB
├ ○ /privacidad                            161 B          77.3 kB
├ ○ /robots.txt                            0 B                0 B
├ ○ /RYSminisuper                          16.1 kB        97.9 kB
├ ○ /RYSminisuper/admin                    138 B          83.8 kB
├ ○ /RYSminisuper/admin/acceso             161 B          77.3 kB
├ ○ /services                              209 B            83 kB
├ λ /services/[slug]                       426 B          83.2 kB
├ ○ /sitemap.xml                           0 B                0 B
├ ○ /video                                 3.44 kB        90.9 kB
└ ○ /web                                   209 B            83 kB

ƒ Middleware                               24.3 kB
```

### pnpm test
```
(sin output; el repo no define script "test" en package.json)
```

