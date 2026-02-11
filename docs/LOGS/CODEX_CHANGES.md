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

