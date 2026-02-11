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

