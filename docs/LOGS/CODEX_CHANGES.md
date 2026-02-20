- Fecha/Hora: 2026-02-11 02:19:58 CET
- Commit: 7d1bdda
- Scope: src/app/mo/admin/page.tsx
- Resumen: Se creo /mo/admin con panel base y secciones de stock, precios y caliente hoy, guardado local.
- Pruebas: No probado.
- Notas/Riesgos: Estado guardado en localStorage como MVP; migrar a Sheets/Supabase.

- Fecha/Hora: 2026-02-11 02:19:58 CET
- Commit: acb15fa
- Scope: src/app/mo/admin/page.tsx
- Resumen: Se agrego registro manual de ventas y resumen basico de top 7/30.
- Pruebas: No probado.
- Notas/Riesgos: Estado guardado en localStorage como MVP; migrar a Sheets/Supabase.
- Fecha/Hora: 2026-02-11 02:36:10 CET
- Commit: 7341e8a
- Scope: src/lib/mo/data/index.ts, src/lib/mo/data/localAdapter.ts, src/lib/mo/data/sheetsAdapter.ts, src/lib/mo/data/supabaseAdapter.ts, src/lib/mo/data/types.ts
- Resumen: Se agrego data layer para tienda hermana con feature flag DATA_BACKEND y adapters local/sheets/supabase (skeleton).
- Pruebas: No probado.
- Notas/Riesgos: Adapters sheets/supabase no estan configurados; local usa almacenamiento local en navegador.

- Fecha/Hora: 2026-02-11 02:58:54 CET
- Commit: 1a213bd
- Scope: src/app/mo/CatalogSection.tsx, src/app/mo/FreeTextOrder.tsx, src/app/mo/StickyWhatsAppButton.tsx, src/app/mo/cart/CartButtonSticky.tsx, src/app/mo/cart/CartDrawer.tsx, src/app/mo/page.tsx, src/lib/mo/whatsapp.ts
- Resumen: Se corrigio la marca a RYS y se reemplazo "pickup" por copy de retiro/pasas a recoger.
- Pruebas: No probado.
- Notas/Riesgos: Copys actualizados; revisar mensajes de WhatsApp en flujo real.

- Fecha/Hora: 2026-02-11 03:09:01 CET
- Commit: 561d366
- Scope: src/data/products.json
- Resumen: Se reemplazo "pickup" por "retiro" en descripcion de producto.
- Pruebas: No probado.
- Notas/Riesgos: Ajuste de copy en data local; revisar catalogo si hay mas descripciones.

- Fecha/Hora: 2026-02-11 03:13:46 CET
- Commit: 36422fe
- Scope: src/middleware.ts, src/app/mo/admin/acceso/page.tsx
- Resumen: Se agrego gate de /mo/admin con llave por query y cookie httpOnly, mas pantalla de acceso.
- Pruebas: No probado.
- Notas/Riesgos: Requiere MO_ADMIN_ENABLED=1 y MO_ADMIN_KEY en entorno.

- Fecha/Hora: 2026-02-11 04:21:26 CET
- Commit: 86c78d7
- Scope: docs/SCOPE_CANONICO.md, scripts/scope-check.sh, package.json, docs/_Quarantine/00-INDEX.md
- Resumen: Se documento el scope canonico de tienda hermana, se agrego scope-check y se movio el indice duplicado a cuarentena.
- Pruebas: No probado.
- Notas/Riesgos: Verificar que el indice canonico sea docs/obsidian/00_INDEX.md.

- Fecha/Hora: 2026-02-11 04:30:26 CET
- Commit: a53e93d
- Scope: src/app/mo/admin/page.tsx, src/lib/mo/data/types.ts, src/lib/mo/data/localAdapter.ts, src/lib/mo/data/sheetsAdapter.ts, src/lib/mo/data/supabaseAdapter.ts
- Resumen: Admin ahora usa data layer; estado y ventas pasan por el adapter local.
- Pruebas: MO_ADMIN_ENABLED=1 MO_ADMIN_KEY=clave_larga npm run dev (falla EPERM 0.0.0.0:3000)
- Notas/Riesgos: No se pudo validar en navegador por bloqueo de puerto.

- Fecha/Hora: 2026-02-11 05:04:43 CET
- Commit: 798fc93
- Scope: src/lib/mo/config.ts, src/app/mo/page.tsx
- Resumen: Se agrego horario real y link de mapas para la tienda RYS.
- Pruebas: npm run dev (falla EPERM 0.0.0.0:3000)
- Notas/Riesgos: Sin validacion en navegador por bloqueo de puerto.

- Fecha/Hora: 2026-02-11 05:18:31 CET
- Commit: 46f08ea
- Scope: src/app/mo/page.tsx
- Resumen: Se agrego announcement bar y trust strip para conversion en /mo.
- Pruebas: No probado.
- Notas/Riesgos: Revisar contraste en mobile.

- Fecha/Hora: 2026-02-11 05:34:19 CET
- Commit: 4718544
- Scope: src/app/mo/page.tsx, src/app/mo/CatalogSection.tsx, src/app/mo/ProductCard.tsx, src/app/mo/catalogConfig.ts, src/app/mo/components/MoHeader.tsx, src/app/mo/components/MoHero.tsx, src/app/mo/components/MoQuickShop.tsx, src/app/mo/components/MoSections.tsx, src/app/mo/components/MoStorefront.tsx
- Resumen: Redisenio retail del storefront /mo con header, hero compacto, quick shop y cards ajustadas.
- Pruebas: npm run dev (falla EPERM 0.0.0.0:3000)
- Notas/Riesgos: Validar layout real en navegador cuando el puerto lo permita.

- Fecha/Hora: 2026-02-11 05:41:57 CET
- Commit: cef4e73
- Scope: src/app/mo/CatalogSection.tsx, src/app/mo/components/MoQuickShop.tsx, src/app/mo/components/MoSections.tsx, src/app/mo/components/MoStorefront.tsx
- Resumen: Se agregaron pasillos, top picks y catalogo por secciones con tabs sticky.
- Pruebas: npm run dev (falla EPERM 0.0.0.0:3000)
- Notas/Riesgos: Verificar scroll suave y tabs sticky en navegador.

- Fecha/Hora: 2026-02-11 05:57:44 CET
- Commit: 10eddbd
- Scope: src/app/mo/ProductCard.tsx, src/app/mo/admin/page.tsx, src/app/mo/components/MoQuickShop.tsx, src/app/mo/components/MoStorefront.tsx, src/lib/mo/data/localAdapter.ts, src/lib/mo/data/sheetsAdapter.ts, src/lib/mo/data/supabaseAdapter.ts, src/lib/mo/data/types.ts, src/lib/mo/types.ts, src/lib/mo/pricing.ts
- Resumen: Se agrego control de ofertas en admin, pricing efectivo y seccion de ofertas en storefront.
- Pruebas: npm run dev (falla EPERM 0.0.0.0:3000)
- Notas/Riesgos: Validar que el descuento se aplique en carrito y total.


- Fecha/Hora: 2026-02-20 00:16:26 CET
- Commit: df39364
- Autor: Codex
- Scope: AUDIT_PACK.md, AUDIT_DATA.json, docs/LOGS/CODEX_CHANGES.md
- Resumen: Se genero pack de auditoria pre-deploy (snippets, rutas, outputs de build) y dataset de RYS para revision externa.
- Pruebas: pnpm lint (ok), pnpm build (ok), pnpm test (sin output; no hay script).
- Notas/Riesgos: pnpm install reporto dependencias deprecated (eslint@8.57.1, next@13.4.0, subdeps).
- Nota: hash final tras amend.

- Fecha/Hora: 2026-02-20 02:54:29 CET
- Commit: 64ec97f
- Autor: Codex
- Scope: src/middleware.ts, src/app/RYSminisuper/page.tsx, src/app/mo/admin/acceso/page.tsx, docs/LOGS/CODEX_CHANGES.md
- Resumen: Se habilito index/follow en /RYSminisuper y se agrego auth admin por ADMIN_PIN/ADMIN_PASSWORD (compatibilidad MO_ADMIN_KEY) con cookie.
- Pruebas: No probado.
- Notas/Riesgos: Requiere MO_ADMIN_ENABLED=1 y env vars en Vercel.

- Fecha/Hora: 2026-02-20 03:11:47 CET
- Commit: 4156f8b
- Autor: Codex
- Scope: src/data/products.json, src/lib/mo/types.ts, src/app/mo/ProductCard.tsx, src/app/mo/components/MoStorefront.tsx, docs/LOGS/CODEX_CHANGES.md
- Resumen: Se reemplazo placeholder por assets reales y se agrego status por producto (available/soon/hidden/out_of_stock) con CTA WhatsApp.
- Pruebas: pnpm lint, pnpm build.
- Notas/Riesgos: hidden filtra productos; soon/out_of_stock deshabilitan compra y muestran "Avisarme".

- Fecha/Hora: 2026-02-20 04:13:49 CET
- Commit: TBD_HASH
- Autor: Codex
- Scope: public/video/video-poster.png, src/app/web/page.tsx, src/app/components/Hero.tsx, src/app/components/IntroVideo.tsx, src/app/components/IntroOverlay.tsx, src/app/components/VideoModal.tsx, src/app/video/VideoGallery.tsx, docs/LOGS/CODEX_CHANGES.md
- Resumen: Se agrego poster y subtitulos al video y fallback UI con CTA.
- Pruebas: pnpm lint, pnpm build.
- Notas/Riesgos: Fallback visible en /web si el video falla.

- Fecha/Hora: 2026-02-20 04:14:30 CET
- Commit: TBD_HASH
- Autor: Codex
- Scope: src/app/mo/components/MoQuickShop.tsx, src/app/globals.css, docs/LOGS/CODEX_CHANGES.md
- Resumen: Se mejoro jerarquia visual de pasillos y se fijo fondo full-screen en dark mode.
- Pruebas: pnpm lint, pnpm build.
- Notas/Riesgos: Ninguno.
