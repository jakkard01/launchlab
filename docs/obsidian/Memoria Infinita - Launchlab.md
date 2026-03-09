## 2026-02-09 — launchlab tienda hermana (YRS)
- Rama: feat/pagina-hermana-live
- Objetivo: tienda pickup + WhatsApp
- Guardrails/parity: scripts doctor/parity OK
- WhatsApp: wa.me sin '+', numero temporal configurado
- Commits relevantes (ultimos 8):
  - 02d56f9 codex(sis-hermana): add WhatsApp cart checkout (add-to-cart + quantities + message builder)
  - 0e285c7 codex(sis-hermana): fix wa.me number format (strip plus)
  - 11aa2f6 codex(sis-hermana): set temporary whatsapp number for store
  - 3137e37 codex(sis-hermana): set temporary whatsapp number for store
  - 380fd15 codex(sis-hermana): rename store to YRS Minisuper + add free-text WhatsApp order + mobile UI polish
  - 41901e0 codex(sis-hermana): remove /tienda route
  - 7f2f516 codex(sis-hermana): isolate store layout + rename route to /mo + noindex prelaunch
  - fc65ae9 codex(ops): harden parity script (root+retry+cleanup)
- Estado: listo para pruebas locales y preview deploy
- Proximo: carrito WhatsApp + "Pedir algo que no esta en catalogo" + layout aislado + noindex

## 2026-02-14 — Intro video gating + simulador bot
- Rama: feat/pagina-hermana-live
- Objetivo: evitar mismatch del intro video en demos y agregar simulador determinista de bot.
- Cambios clave:
  - Gateo del IntroVideo por rutas permitidas (solo /, /web, /pricing, /services).
  - CTA "Bot en vivo" en home ahora lleva a /demos/bot (no dispara video).
  - Modal de intro con safe-area, botón "Cerrar" + "Saltar", preload metadata y skeleton.
  - Simulador de bot determinista con auto demo, inputs (nombre, tipo negocio, objetivo) y CTA WhatsApp.
- Commits:
  - 354de65 codex(ux): gate intro video by route + fix demo mismatch
  - b6eb518 codex(ux): improve intro modal mobile behavior
  - 6bf4bdb codex(demo): add deterministic bot simulator (chat UI)
- QA mobile:
  - /: intro video aparece y se puede cerrar/saltar sin cortar contenido.
  - /demos y /demos/bot: no aparece intro video; simulador visible.
  - CTA WhatsApp del simulador genera link correcto.
  - No loops con localStorage welcomeVideoSeen.

## 2026-02-14 — RYS Minisúper: limpieza media + confianza + UX carrito
- Rama: feat/pagina-hermana-live
- Objetivo: limpiar media pesada y mejorar percepcion de tienda real + UX movil.
- Cambios clave:
  - Se ignora media pesada y se elimina public/video/video.mp4 del repo.
  - Product cards muestran imagen con placeholder robusto.
  - Catalogo demo ampliado con productos coherentes (sin nuevas categorias).
  - Bloque de confianza local en hero con horarios, retiro y pagos + CTA mapas.
  - CTA carrito renombrado a \"Completar pedido\" + CTA WhatsApp en drawer.
  - /mo ahora redirige server-side a /RYSminisuper (legacy).
- Commits:
  - df0d25a codex(chore): clean media artifacts + harden gitignore
  - c648556 codex(rys): show product images + robust placeholder
  - de9313f codex(rys): strengthen locality trust block + maps CTA
  - ec580bd codex(ux): improve mobile cart sheet + safe-area + copy
  - 2f0ef8b codex(routing): enforce /mo as legacy redirect + update shell
- QA mobile:
  - /RYSminisuper muestra imagen o placeholder sin 404.
  - CTA mapas abre link correcto.
  - Carrito movil no se corta y CTA WhatsApp es accesible.
  - /mo redirige a /RYSminisuper (308) y admin sigue funcionando.

## 2026-02-14 — Web video + FAQ bot conversacional + RYS antojitos
- Rama: feat/pagina-hermana-live
- Objetivo: video de venta en /web, FAQ bot como conversación real, y mejoras de tienda barrio.
- Cambios clave:
  - /web ahora incluye bloque de video de venta con CTA directo a WhatsApp/demo.
  - FAQ Bot demo ahora usa burbujas, typing y quick replies max 2.
  - RYS agrega bloque Antojitos de hoy + CTA inteligente al Pedido Especial.
- Commits:
  - 4fdbc15 codex(pbia): add web sales video block to /web
  - fb5f258 codex(demo): make FAQ bot conversational (bubbles + typing)
  - 9d29c3e codex(rys): add antojitos block + smart empty-search CTA
- QA rapido:
  - /web: video visible en desktop y mobile, CTA correcto.
  - /demos/bot: conversacion real con typing y quick replies max 2.
  - /RYSminisuper: antojitos visible y CTA empty-search lleva a pedido especial.

## 2026-02-14 — RYS Mercadito UI + sistema de imagenes
- Rama: feat/pagina-hermana-live
- Objetivo: quitar sensacion clinica y ordenar imagenes de producto.
- Cambios clave:
  - Hero y cards con estilo mas calido (mercadito), sombras suaves y CTA mas jugoso.
  - Tabs con emoji para lectura rapida.
  - Sistema de imagenes:
    - Archivos en `public/mo/categories/`
    - Mapping en `src/data/product_images.json` con `imageKey -> src/alt`
    - Productos con `imageKey` en `src/data/products.json`
    - Script `scripts/check_product_images.mjs` para detectar faltantes.
- Commits:
  - 418d09b codex(rys-ui): warm up hero + product cards + category icons
  - 2692736 codex(data): add product image mapping + checks script
- QA rapido:
  - /RYSminisuper: hero legible, cards con sombra y precio destacado.
  - Tabs con emoji no rompen layout.
  - No 404 en imagenes; script de check lista faltantes si aplica.

## 2026-02-14 — Video Packs catalogo + simuladores + tabs con thumbnails
- Rama: feat/pagina-hermana-live
- Objetivo: unificar video como producto, galeria en /video, simuladores web/WhatsApp y tabs de RYS con thumbnails.
- Cambios clave:
  - Fuente canonica de videos en `src/app/content/videoPacks.ts` con `videoExamples` y `featured`.
  - Galeria /video renderiza cards + modal con soporte `youtube` y `local`.
  - Intro video consume el `featured` del catalogo con CTA WhatsApp y link a /video.
  - Simulador de chat reusable (`ChatSimulator`) con skins web/whatsapp y flow determinista.
  - Nueva ruta /demos/whatsapp y card en /demos (showcase actualizado).
  - Tabs RYS con thumbnails (imagen o emoji) y scroller sin scrollbar visible.
- Commits:
  - 657b970 codex(video): add video examples catalog + single source of truth
  - 28d8647 codex(demo): refactor ChatSimulator with web+whatsapp skins
  - 2ef53a9 codex(demo): add whatsapp demo route + cards in /demos
  - 2f0ca7f codex(rys-ui): hide category scrollbar + prep category thumbnails
- Convenciones:
  - Agregar video: editar `src/app/content/videoPacks.ts` y añadir item con `platform` `local` (src `/video/...`) o `youtube` (videoId).
  - Agregar thumbnail de categoria RYS: en `src/app/mo/catalogConfig.ts` usar `image: '/mo/categories/<archivo>'` o `icon`.
- QA rapido:
  - /video: cards y modal funcionan en mobile/desktop.
  - /demos y /demos/whatsapp: simuladores con typing + reset.
  - /RYSminisuper: tabs sin scrollbar visible y con icono/thumbnail.

## 2026-02-14 — RYS tabs polish (paths + a11y + iOS scroll)
- Rama: feat/pagina-hermana-live
- Objetivo: mover thumbnails de categorias a carpeta dedicada, mejorar accesibilidad y feel iOS.
- Cambios clave:
  - Thumbnails ahora viven en `public/mo/categories/` (paths actualizados en config y mapping).
  - A11y: thumbnails con `alt={label}` y emojis decorativos con `aria-hidden`.
  - Scroll horizontal con `-webkit-overflow-scrolling: touch`.
- Commit:
  - 32fe0cb codex(rys-ui): polish category thumbnails (paths+a11y+iOS)

## 💰 Estrategia capital semilla (500€) — 80/20
Mirror: decision canonica en Vault -> /mnt/c/Demonio_IA/01_PJECTOX/notas/PJECTOX_Vault/02_Documentacion/30_LOGS/decisiones-ia/DECISIONES_IA_2026-02.md

## 2026-03-09 — Pre-deploy continuidad real (PBIA + RYS)
- Rama: feat/pagina-hermana-live
- Regla estratégica activa:
  - La fuente de verdad es el repo canónico local.
  - No usar deploy viejo para concluir estado actual.
- PBIA (estado implementado):
  - Intro automática de video eliminada en home (`HomeClient` ya no monta `IntroVideo` automático).
  - Contacto ya no promete entrega confirmada; API responde como "solicitud registrada" y deriva a WhatsApp para atención directa.
  - Pendiente conectar un destino real de leads (email/webhook/CRM) con evidencia de entrega.
- RYS (estado implementado):
  - Storefront y admin base funcionales.
  - Auth por querystring eliminada.
  - Acceso admin migrado a login server-side (`/api/mo/admin/login`) + cookie `mo_admin`.
  - Fetch roto a `/api/mo/orders` eliminado del carrito.
  - Enum de stock unificado a `disponible | ultimas | agotado`.
  - Persistencia evolucionada: se retiró `localAdapter`/`supabaseAdapter`/`sheetsAdapter` y quedó un backend único por API (`apiAdapter`) con store en Google Sheets (`sheetsStore`).
- Flujo operativo con Codex:
  - Trabajar por bloques estables.
  - Verificar `build` + `lint` antes de commit.
  - Commits atómicos; no `push` automático.
  - Registrar decisiones de continuidad en este Vault.
- Punto de reanudación:
  - No rehacer UI base de PBIA/RYS.
  - Enfocar siguiente bloque en operación RYS: orden manual + imagen (cambio/subida simple) sobre backend ya consolidado.
  - Cerrar en PBIA la integración real de destino de contactos.

## 2026-03-09 — PBIA leads reales + RYS Sheets operativo (bloque siguiente)
- Rama: feat/pagina-hermana-live
- Commits:
  - `226aa8e` feat(pbia): deliver contact leads to webhook/sheets and tighten contact trust copy
  - `8470d66` feat(rys): add sheets sort/image controls and expand editable seed catalog

### PBIA estado nuevo
- `/api/contact` ahora intenta entrega real del lead con prioridad:
  1) `CONTACT_WEBHOOK_URL` (opcional `CONTACT_WEBHOOK_TOKEN`)
  2) Google Sheets (`pbia_leads`) usando service account
- Si no existe destino configurado, la API devuelve error (ya no finge entrega).
- El formulario muestra referencia `leadId` cuando el registro se entrega.
- Copy de contacto ajustado a expectativa real (email + WhatsApp urgente).

### RYS estado nuevo
- Backend único activo: Google Sheets via `sheetsStore` + `/api/mo/*`.
- Esquema `products` ahora soporta y usa:
  - `id`, `name`, `category`, `sortOrder`, `price`, `description`, `image`, `isFeatured`, `status`, `stockStatus`, `updatedAt`
  - (se mantiene `imageKey` por compatibilidad visual)
- Storefront:
  - filtra ocultos (`status=hidden`)
  - ordena por `sortOrder` y luego nombre
- Admin:
  - edición real de `Estado` (incluye ocultar/mostrar),
  - `Stock`,
  - `Precio`,
  - `Destacado`,
  - `Orden catálogo` (`sortOrder`),
  - `Imagen URL` (`image`)

### Catálogo semilla
- `src/data/products.json` ampliado a base amplia de minisúper de barrio.
- Incluye `sortOrder` y `stockStatus` desde semilla.
- Precios declarados como base editable (no definitivos del negocio).

### Reglas operativas para la hermana
- Para ocultar producto: en admin, `Estado -> Oculto`.
- Para reordenar: ajustar `Orden catálogo` (número menor sale antes).
- Para cambiar imagen: editar `Imagen URL` (ruta local o URL externa).
- Para precio/stock/destacado: usar campos directos y verificar en storefront tras guardar.

### Punto de reanudación
- PBIA: validar credenciales reales del destino de leads en entorno y probar flujo end-to-end.
- RYS: siguiente bloque en orden manual más fino y flujo de imagen (subida simple + fallback de URL).

## 2026-03-09 — Pre-deploy final A (configuración real + pruebas operativas)
- Rama: feat/pagina-hermana-live
- Objetivo del bloque: dejar activación de esta noche sin ambigüedad.

### Estado verificado en entorno local actual
- `.env.local`:
  - `MO_ADMIN_ENABLED` y `MO_ADMIN_KEY` definidos.
  - Faltan variables de activación real para PBIA leads y RYS Sheets.
- Smoke local ejecutado contra `http://127.0.0.1:3011`:
  - `POST /api/contact` -> `503` cuando no hay destino de leads configurado (comportamiento correcto, no finge éxito).
  - `GET /api/mo/products` -> `500` por falta de credenciales Sheets (comportamiento esperado).
  - `GET /api/mo/admin` sin cookie -> `401` (auth funcionando).
  - `POST /api/mo/admin/login` -> `200` + cookie `mo_admin`.
  - `GET/POST /api/mo/admin` con cookie -> `500` por falta de Sheets (auth y wiring OK).

### Configuración exacta para activar PBIA contacto hoy
1. Opción webhook (prioridad):
   - `CONTACT_WEBHOOK_URL`
   - opcional `CONTACT_WEBHOOK_TOKEN`
2. Opción Google Sheets leads:
   - `PBIA_LEADS_SHEETS_SPREADSHEET_ID`
   - `GOOGLE_SERVICE_ACCOUNT_EMAIL`
   - `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY`
3. Verificación mínima:
   - `POST /api/contact` debe devolver `200` con `leadId`.

### Configuración exacta para activar RYS Sheets hoy
- Variables obligatorias:
  - `RYS_SHEETS_SPREADSHEET_ID`
  - `GOOGLE_SERVICE_ACCOUNT_EMAIL`
  - `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY`
- Variables admin:
  - `MO_ADMIN_ENABLED=1`
  - `ADMIN_PASSWORD` o `ADMIN_PIN` o `MO_ADMIN_KEY`
- Verificación mínima:
  - `GET /api/mo/products` -> `200` con `products`.
  - login admin -> cookie `mo_admin`.
  - `POST /api/mo/admin` (`updateSortOrder` o `updateImage`) -> `200`.

### Scripts operativos añadidos
- `bash scripts/predeploy/check-env-readiness.sh .env.local`
- `bash scripts/predeploy/smoke-local.sh http://127.0.0.1:3011 .env.local`

### Smoke tests post-deploy obligatorios (esta noche)
1. `POST /api/contact` con payload real -> status `200` + `leadId`.
2. Verificar llegada del lead en webhook o hoja `pbia_leads`.
3. `GET /api/mo/products` -> `200` y catálogo visible.
4. Login admin y cambio real de `sortOrder` o `image`.
5. Recargar storefront y confirmar reflejo del cambio desde otra sesión.

## 2026-03-09 — Pre-deploy final B (pulido operativo + salida)
- Admin RYS: orden rápido con botones `↑`/`↓` sin romper edición manual de `sortOrder`.
- Admin RYS: microcopy aclarado en `Estado (visible/oculto)` y `Imagen URL`.
- Checklist de salida creado en Vault:
  - `docs/obsidian/CHECKLIST_SALIDA_PREDEPLOY.md`
- Uso objetivo: ejecutar hoy sin abrir nuevos cambios de alcance.

## 2026-03-09 — Cierre deploy tonight (PBIA leads + RYS Sheets + docs)
- PBIA contacto en Sheets queda explícito a variable dedicada:
  - `PBIA_LEADS_SHEETS_SPREADSHEET_ID` (sin fallback implícito a hoja de RYS).
- Error de destino actualizado para indicar variables exactas de activación.
- Guía operativa corta creada en repo:
  - `docs/ops/DEPLOY_TONIGHT_SHEETS.md`
  - Incluye: estructura de pestañas/columnas, variables de Vercel, checklist local y post-deploy, y rutas de miniaturas/imágenes.
- Punto de reanudación siguiente:
  - Cargar credenciales reales en Vercel y ejecutar checklist post-deploy con evidencia.
