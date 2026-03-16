## 2026-03-15 — RYS bloque comercial realista: snacks locales + café + combos
- Rama: feat/pagina-hermana-live
- Objetivo: representar mejor el consumo real de minisúper local y subir ticket promedio sin tocar diseño ni abrir features nuevas.

### Vacíos reales detectados
- `café` existía, pero demasiado concentrado en un combo; faltaba presencia clara como producto servido, molido e instantáneo.
- `coca` no estaba bien encontrada porque el naming era genérico (`gaseosa cola 2L`).
- Snacks locales de antojo rápido estaban flojos: faltaban `tortillitas con limón`, `maní con limón y chile` y `platanitos`.
- Faltaban combos más obvios de movimiento rápido: `pupusas + Coca-Cola`, `snack + Coca-Cola`, `antojito + bebida`.

### Productos añadidos o corregidos
- Nuevos:
  - `Coca-Cola 600ml`
  - `Café servido vaso`
  - `Café instantáneo 50g`
  - `Café molido 340g`
  - `Pan dulce surtido`
  - `Tortillitas con limón`
  - `Maní con limón y chile`
  - `Platanitos crujientes`
  - `Combo pupusas + Coca-Cola`
  - `Combo boquita + Coca-Cola`
- Corregidos:
  - `Gaseosa cola 2L` -> `Coca-Cola 2L`
  - `Cafe frio botella` -> `Café frío botella`
  - `Combo cafe + pan dulce` -> `Combo café + pan dulce`
  - combos producto existentes ahora nombran explícitamente `Coca-Cola` donde aplica
  - `Mani salado 100g` -> `Maní salado 100g`

### Lógica comercial aplicada
- Antojo:
  - boquitas saladas, platanitos, maní con limón/chile, pan dulce, pupusas.
- Salida rápida:
  - Coca-Cola personal, café servido, combos listos de una decisión.
- Desayuno / merienda:
  - café servido, café instantáneo, café molido, pan dulce, combo café + pan dulce.
- Margen / ticket:
  - combos de bebida + snack/antojito y café + pan dulce para subir promedio sin complicar operación.
- Consumo local real:
  - naming y productos más cercanos a cómo la gente realmente busca y compra: `coca`, `café`, `maní`, `boquita`.

### Editabilidad / operación
- Editable vía fuente de datos/admin:
  - todos los productos en `src/data/products.json` y luego en Sheets/admin (`precio`, `visible`, `stock`, `destacado`, etc.).
- Duro en código:
  - combos rápidos de la sección `Combos útiles` en `src/lib/mo/combos.ts`.
- Razón:
  - productos/combo-productos deben seguir siendo operables por la clienta; bundles rápidos manuales siguen simples y centralizados en un archivo.

### Verificación realizada
- Búsquedas útiles por dataset y normalización:
  - `cafe` / `café` -> combo + café frío + café servido + instantáneo + molido
  - `coca` -> Coca-Cola 2L + Coca-Cola 600ml + combos con Coca-Cola
  - `mani` / `maní` -> maní salado + maní con limón y chile
  - `pupusas` -> pupusas + combo pupusas + Coca-Cola
- Lint/build:
  - `npm run lint` OK
  - `npm run build` OK

## 2026-03-15 — RYS hotfix urgente: regresión funcional en CTAs / combos
- Rama: feat/pagina-hermana-live
- Objetivo: restaurar comportamiento confiable del storefront, sin abrir mejoras nuevas.

### Regresión detectada
- `Ver caliente` y `Pedir algo que no veo` habían quedado dependiendo solo de handlers JS.
- `Agregar combo` y el add-to-cart individual dependían del mismo subtree interactivo endurecido en el bloque anterior.
- En práctica, la UI podía seguir viéndose bien pero sentirse “visual” si esa hidratación no montaba limpia.

### Causa exacta registrada
- El bloque reciente añadió más acoplamiento cliente en el storefront crítico (tracking y drawer extendido) sobre el mismo árbol que monta scroll handlers y cart actions.
- Los CTAs de scroll no tenían fallback nativo; eran botones puramente JS.
- Resultado: ante fallo o montaje incompleto del subtree, los handlers críticos no quedaban disponibles.

### Fix aplicado
- Se quitó el acoplamiento adicional del flujo crítico de storefront/cart para volver al camino estable.
- `Ver caliente` y `Pedir algo que no veo` vuelven a tener fallback real por `href` a anclas, manteniendo mejora por scroll suave cuando hay JS.
- `Agregar combo`, `Agregar` de producto y drawer/cart path volvieron a la versión operativa simple sin la capa extra reciente.

### Verificación hecha
- `npm run lint` OK
- `npm run build` OK
- Verificación funcional final prevista sobre deploy del hotfix:
  - `Ver caliente`
  - `Pedir algo que no veo`
  - `Agregar combo`
  - `Agregar` individual
  - abrir carrito
  - continuar a WhatsApp
  - búsqueda operativa

## 2026-03-15 — RYS next block: conversion + operator ease + marketing hooks
- Rama: feat/pagina-hermana-live
- Objetivo: bajar fricción operativa real, subir conversión storefront y empezar a capturar señales mínimas de interés/uso.

### Qué se mejoró
- Carrito:
  - persistencia local mantenida y endurecida con sincronización entre pestañas.
  - checkout a WhatsApp deja de vaciar el carrito automáticamente; ahora evita pérdida de pedidos si la app se cierra o el envío no se completa.
  - upsell ligero en drawer con sugerencias por categoría/promos/destacados para subir ticket sin meter recomendador complejo.
- Búsqueda:
  - ahora resuelve por nombre, categoría y coincidencia parcial.
  - cuando hay query, muestra resultados globales claros en lugar de esconderse por secciones.
  - estado vacío útil con salida a pedido especial/WhatsApp.
- Operación admin:
  - filtros nuevos para `Destacados`, `Promos`, `Hoy`.
  - atajos por producto para marcar `hoy`, `agotado`, `destacado` y `promo 10%` sin recorrer todos los selects.
  - módulo visual de señales de marketing dentro del panel para lectura rápida.

### Qué quedó más fácil para la clienta
- Marcar rápido un producto como disponible hoy o agotado.
- Encender/apagar destacados y promos sin bajar por todos los campos.
- Encontrar productos operativos relevantes con filtros de `Hoy`, `Promos` y `Destacados`.
- Evitar que un pedido se pierda por tocar WhatsApp antes de enviarlo.

### Señales de marketing capturadas
- productos más clicados (`product_click`)
- búsquedas sin resultado (`search_zero_results`)
- combos más usados (`combo_used`)
- promos usadas (`promo_used`)
- clicks en CTA WhatsApp (`whatsapp_cta`)
- Persistencia:
  - se guardan localmente como buffer de respaldo
  - se envían a `/api/mo/events`
  - backend las registra en la hoja `events` para crecer después sin rehacer el storefront

### Aprendizaje útil para luego pulir PBIA
- El patrón correcto no es “meter analytics”, sino registrar 4-5 eventos comerciales con intención clara y lectura operativa simple.
- Los atajos de operación valen más que rediseñar paneles enteros cuando la clienta necesita moverse rápido en el día.
- La búsqueda comercial útil en móvil requiere ranking simple + salida clara cuando no encuentra nada.

### Siguiente bloque recomendado
- Antes de pasar de lleno a PBIA, queda un último ajuste crítico razonable en RYS:
  - volver editable la capa de combos/promos “manuales” sin tocar código, pero solo si la clienta realmente la va a mover con frecuencia.
- Si en la siguiente ronda ya no hay dolor real con combos, entonces sí: el siguiente bloque debería ir a PBIA usando esta misma lógica de señales mínimas + copy/CTA accionables.

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

## 2026-03-09 — Fix inmediato error de carga + miniaturas reales
- Causa detectada del fallback `app/error.tsx`:
  - Ruta `/RYSminisuper` ejecutaba `getStoreProducts()` en servidor.
  - Si faltan credenciales o falla Sheets, lanzaba excepción en render server-side y caía en “No pudimos cargar esta página”.
- Solución aplicada:
  - `/RYSminisuper` ahora captura error de Sheets y usa catálogo semilla local como respaldo temporal.
  - Se muestra aviso claro de “modo respaldo” sin romper toda la experiencia.
  - APIs de Sheets siguen fallando explícitamente (`500`) para no ocultar problemas de configuración.
- Miniaturas de demos/videos conectadas de forma explícita (sin random):
  - Carpeta: `public/imagenes/fondo/`
  - `web_que_se_paga_sola.jpeg`
  - `auditoria_movil.jpeg`
  - `whatsapp.jpeg`
  - Mapping en `src/app/content/videoPacks.ts` (`poster` de cada demo).
- Punto de reanudación:
  - Cargar credenciales reales y quitar dependencia del respaldo local en `/RYSminisuper` validando lectura en vivo de Sheets.

## 2026-03-09 — Fix final RYS (imágenes + prueba admin operativa)
- Causa de inconsistencia visual en cards:
  - render de imagen sin manejo explícito de error y sin fallback visual dedicado por card.
- Ajuste aplicado en `src/app/mo/ProductCard.tsx`:
  - contenedor estable con proporción fija (`pt-[75%]`);
  - imagen con `object-cover object-center`;
  - fallback limpio cuando `image` no existe o falla carga (`onError`).
- Ajuste aplicado en `src/app/mo/components/MoStorefront.tsx`:
  - si ya existe catálogo inicial en servidor, un fallo de refresco cliente no muestra banner rojo innecesario.
  - el banner `No se pudo cargar el catálogo` queda reservado para casos sin catálogo inicial.
- Documentación operativa actualizada:
  - `docs/ops/DEPLOY_TONIGHT_SHEETS.md` ahora incluye:
    - prueba admin rápida de punta a punta,
    - detección explícita de fallback vs datos en vivo.
- Punto de reanudación:
  - con credenciales Sheets reales cargadas, ejecutar prueba admin completa y validar persistencia cross-sesión sin banner de respaldo.

## 2026-03-10 — RYS next block (diagnóstico real + home comercial + admin operativo)
- Rama de trabajo confirmada:
  - `feat/pagina-hermana-live`
- Estado real confirmado antes de tocar:
  - storefront live responde y sigue entrando en fallback;
  - `GET https://www.poweredbyia.com/api/mo/products` responde `500` con `No se pudo obtener token de Google Sheets: invalid_grant`;
  - deployment productivo activo: `launchlabv1-l95uatbvt-gerrys-projects-7c589fcf.vercel.app` (creado el 2026-03-09, alias `www.poweredbyia.com`);
  - local `.env.local` no trae variables de Sheets, solo admin local mínimo;
  - existe un archivo no trackeado ajeno al bloque: `public/imagenes/perfil/rysminisuper.jpeg`.
- Causa exacta del fallo real de Sheets/admin:
  - se hizo `vercel env pull /tmp/rys-prod.env --environment=production`;
  - resultado:
    - `RYS_SHEETS_SPREADSHEET_ID` sí está configurado;
    - `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY` sí está configurada y mantiene formato PEM;
    - `GOOGLE_SERVICE_ACCOUNT_EMAIL="launchlab-sheets-bot@tu-proyecto.iam.gserviceaccount.com"`;
  - conclusión:
    - el bloqueo actual es credencial/config externa;
    - no es un problema primario de pestañas o columnas porque la autenticación falla antes de leer la hoja;
    - storefront y admin siguen cayendo porque ambos dependen de la misma fuente (`sheetsStore`).
- Fixes aplicados en repo:
  - helper nuevo `src/lib/mo/data/errorInfo.ts` para clasificar errores reales de auth/config/schema/red;
  - `/RYSminisuper` ahora muestra fallback con causa y ayuda accionable, no solo mensaje genérico;
  - `/api/mo/admin/login` devuelve `400` claro si el body no llega como JSON válido;
  - `/RYSminisuper/admin/acceso` mantiene loading, mostrar/ocultar clave y mensajes más claros;
  - `/RYSminisuper/admin` separa:
    - error fatal de carga inicial;
    - error puntual al guardar cambios;
    - así evita “NO SE PUDO CARGAR EL PANEL” como pantalla negra por cualquier fallo menor.
- Home comercial RYS:
  - se quitó fricción visual de “demo” en el header RYS (sin toggle, CTA directo a WhatsApp);
  - hero ahora explica en 5 segundos:
    - qué es;
    - dónde está;
    - cómo pedir;
    - por qué ahorra tiempo;
  - quick shop y bloques de apoyo ahora priorizan:
    - categorías útiles;
    - combos/packs;
    - antojitos;
    - ofertas;
    - señales de confianza local;
    - horario/ubicación/pagos claros.
- Modal / video móvil:
  - body scroll lock;
  - `touch-action: none` mientras el modal está abierto;
  - cierre por tap fuera;
  - cierre por `Escape`;
  - botón cerrar fijo/visible arriba.
- Prueba manual recomendada al retomar:
  1. Corregir en Vercel `GOOGLE_SERVICE_ACCOUNT_EMAIL` con el `client_email` real.
  2. Verificar que la hoja esté compartida con esa service account.
  3. Revisar `GET /api/mo/products` => `200`.
  4. Abrir `/RYSminisuper` y confirmar que desaparece el fallback.
  5. Entrar a `/RYSminisuper/admin/acceso`.
  6. Probar cambios reales en admin:
     - `price`
     - `stockStatus`
     - `status`
     - `sortOrder`
     - `image`
  7. Recargar storefront y confirmar persistencia.
- Punto de reanudación siguiente:
  - corregir env productivo de Google service account;
  - validar lectura viva;
  - recién entonces revisar nombres de pestañas/columnas si apareciera un error `SHEETS_SCHEMA_*`.

## 2026-03-10 — RYS bloque local (UX + home + admin + video)
- Criterio operativo de este bloque:
  - no tocar más producción;
  - asumir que el bloqueo live de Sheets sigue siendo externo/config;
  - avanzar solo mejoras locales útiles para el próximo deploy.
- Mejoras locales aplicadas:
  - home:
    - nuevo bloque de resumen rápido con conteo visible y atajos móviles;
    - mensaje final de ubicación/pago reforzado para compras en lista;
    - menos sensación de prototipo y mejor entrada al catálogo en móvil.
  - admin:
    - mensajes de éxito visibles para acciones comunes;
    - botón de recarga explícito;
    - tarjetas resumen de operación (`visibles`, `ocultos`, `agotados`);

## 2026-03-11 — RYS cierre live OK + pulido comercial final + QA
- Estado live confirmado:
  - `GET /api/mo/products` en `200`;
  - `/RYSminisuper` sin fallback;
  - login/admin live funcional;
  - `POST /api/contact` funcional sobre `pbia_leads`.
- QA real ejecutada en este bloque:
  - revisión de storefront y admin sobre componentes activos + revalidación live de endpoints;
  - hallazgo principal de storefront:
    - faltaba bajar fricción en búsqueda móvil y acceso a "pedido especial";
    - el hero aún sonaba un poco a demo y no remataba suficiente la promesa local;
  - hallazgo principal de admin:
    - "Registrar venta manual" no tenía etiquetas claras y podía confundir a una operadora no técnica;
    - faltaba una guía visible recordando que los cambios guardan al salir del campo.
- Ajustes aplicados:
  - `src/app/mo/components/MoHeader.tsx`
    - microcopy más local y más claro;
    - botón `Limpiar` en búsqueda;
    - acceso directo a "No veo lo que busco";
  - `src/app/mo/components/MoHero.tsx`
    - copy más comercial y menos tono demo;
    - promesa más explícita de confirmación por WhatsApp antes de salir;
  - `src/app/mo/components/MoStorefront.tsx`
    - conecta el acceso rápido del header al bloque de pedido especial;
  - `src/app/mo/admin/AdminClient.tsx`
    - guía rápida visible para uso diario;
    - etiquetas explícitas en registro manual de venta;
    - total estimado visible antes de guardar.
- Limpieza:
  - `public/imagenes/perfil/rysminisuper.jpeg` no estaba referenciado en código ni docs operativas;
  - se elimina para dejar el repo limpio.
- Punto de continuidad siguiente:
  - QA visual final en móvil real sobre dos o tres teléfonos si el usuario quiere cerrar detalle fino de spacing/tap targets;
  - luego ya no abrir otro bloque de arquitectura: solo operación normal y mejoras pequeñas por uso real.

## 2026-03-11 — QA móvil real + remates finos de conversión en RYS y PBIA
- Estado confirmado antes de tocar:
  - RYS live ya estaba estable y sin fallback;
  - admin funcional;
  - PBIA estable sin necesidad de tocar backend;
  - objetivo de este bloque: remates finos, no rediseño ni features nuevas.
- Hallazgos reales:
  - RYS storefront:
    - el bloque de pedido especial aún podía ser más rápido y más claro en móvil;
    - la barra sticky inferior se entendía, pero el CTA podía ser más directo;
  - RYS admin:
    - faltaban pequeños detalles de teclado móvil para cantidad, precio y orden;
    - la pantalla de acceso ganaba claridad con una instrucción muy corta arriba;
  - PBIA:
    - el hero principal seguía con un matiz algo abstracto;
    - en móvil convenía empujar más rápido a dos decisiones: WhatsApp o ver demos;
    - el menú móvil ganaba si ofrecía también reserva de llamada sin pasos extra;
  - video/modal:
    - sin hallazgos nuevos suficientes para justificar más cambios.
- Cambios aplicados:
  - `src/app/mo/FreeTextOrder.tsx`
    - bloque más directo;
    - pistas visuales rápidas;
    - CTA y texto final más claros;
  - `src/app/mo/cart/CartButtonSticky.tsx`
    - copy más directo en estado vacío y CTA `Abrir pedido`;
  - `src/app/mo/admin/acceso/page.tsx`
    - instrucción corta orientada a móvil;
    - botón principal a ancho completo;
  - `src/app/mo/admin/AdminClient.tsx`
    - `inputMode` móvil para cantidad, precio y orden;
  - `src/app/components/Header.tsx`
    - menú móvil PBIA añade acceso directo a `Reservar llamada`;
  - `src/app/components/LandingLocal.tsx`
    - hero más claro y menos abstracto;
    - CTA secundaria cambia a `Ver demos`;
    - contacto remata mejor la intención comercial;
    - sticky CTA móvil queda más explícita.
- Lo que quedó mejor en móvil:
  - menos pasos para salir del home a una acción útil;
  - más claridad entre hablar por WhatsApp, ver demos y reservar llamada;
  - mejor teclado en admin RYS para tareas operativas rápidas;
  - pedido especial de RYS más fácil de interpretar y usar.
- Pendiente real:
  - validar visualmente en dispositivos físicos concretos si el usuario quiere un último bloque ultra fino de spacing;
  - no hay pendiente estructural nuevo detectado.
- Punto de continuidad siguiente:
  - solo microajustes basados en uso real o feedback humano;
  - evitar abrir bloques grandes sobre RYS/PBIA mientras no aparezca una fricción nueva confirmada.
    - acceso con explicación más clara de qué esperar si la clave entra pero la carga falla después.
  - video/modal:
    - sin cambio extra de arquitectura en este bloque;
    - se mantiene la base ya endurecida con lock de scroll, cierre visible y cierre por tap fuera/`Escape`.
- Resultado práctico:
  - aunque Sheets live siga caído, el siguiente deploy ya tendría una experiencia más clara y más vendible.
- Punto de reanudación siguiente:
  1. Esperar corrección externa de credenciales.
  2. Desplegar este bloque local.
  3. Validar storefront/admin con datos vivos.
  4. Si Sheets responde, pasar a prueba operativa real de edición persistente.

## 2026-03-09 — Post-deploy admin RYS (login + errores claros + móvil)
- Diagnóstico real en producción:
  - `POST /api/mo/admin/login` con clave incorrecta responde `401` y `Clave incorrecta.`.
  - `GET /api/mo/products` responde `500` con `No se pudo obtener token de Google Sheets: invalid_grant`.
  - Causa operativa actual: backend Sheets en producción falla autenticación de service account (`invalid_grant`), y eso afecta carga de snapshot/admin.
- Ajustes implementados:
  - Login admin: mostrar/ocultar clave + estado `Validando acceso...` + mensajes claros por `401/403`.
  - API login admin: respuestas explícitas para `403` (admin deshabilitado) y `503` (sin credenciales admin).
  - API admin: incluye `code` en errores (`SHEETS_INVALID_GRANT`, `SHEETS_NOT_CONFIGURED`, `SHEETS_SCHEMA_INVALID`, etc.).
  - UI admin: mensaje de carga fallida ahora es accionable y distingue auth/sheets/schema.
  - Modal/video móvil: bloqueo de scroll de fondo + botón `Cerrar` siempre visible + cierre por tap fuera.
- Punto de reanudación:
  - corregir credenciales/permisos de Google service account en Vercel y en la hoja;
  - validar `GET /api/mo/products` y `GET /api/mo/admin` en `200` con cookie activa.

## 2026-03-09 — Fix crítico post-deploy (Sheets + contacto + CTA móvil)
- Rama: feat/pagina-hermana-live
- Diagnóstico real confirmado con env de producción + prueba directa a Google OAuth:
  - `GOOGLE_SERVICE_ACCOUNT_EMAIL` en producción estaba configurado como placeholder `launchlab...@tu-proyecto.iam.gserviceaccount.com`.
  - Prueba contra `https://oauth2.googleapis.com/token` devolvió:
    - `invalid_grant`
    - `Invalid grant: account not found`
  - Esto aísla la causa exacta:
    - no era `spreadsheetId`;
    - no era solo `\\n`;
    - la cuenta de servicio configurada no existe o no coincide con la clave.
- Fix aplicado en código:
  - normalización unificada de `GOOGLE_SERVICE_ACCOUNT_EMAIL` y `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY`:
    - quita comillas envolventes;
    - convierte `\\n` a saltos reales;
    - valida encabezado/cola PEM;
    - detecta placeholder en email.
  - APIs RYS ahora devuelven códigos diagnósticos más precisos:
    - `SHEETS_SERVICE_ACCOUNT_PLACEHOLDER`
    - `SHEETS_SERVICE_ACCOUNT_NOT_FOUND`
    - `SHEETS_PRIVATE_KEY_FORMAT`
    - `SHEETS_PRIVATE_KEY_INVALID`
- Fix aplicado en contacto:
  - formulario y backend separan:
    - `CONTACT_RATE_LIMITED`
    - `CONTACT_MESSAGE_TOO_SHORT`
    - `CONTACT_SPAM_BLOCKED`
    - `CONTACT_DELIVERY_FAILED`
  - se eliminó el mensaje genérico que mezclaba cualquier fallo con anti-spam/rate limit.
  - heurística anti-spam quedó más conservadora:
    - honeypot;
    - 2+ enlaces;
    - texto claramente repetitivo;
    - pitch sospechoso con enlaces.
  - mensaje humano corto normal tipo `hola, soy Gerry y quiero una web` queda permitido.
- Fix aplicado en mobile CTA:
  - nueva barra sticky móvil dual (`WhatsApp` + `Reservar`) en:
    - `/video`
    - `/web`
    - `/bots`
    - `/ops`
  - `pb` ampliado para no tapar contenido final.
- Acción operativa pendiente fuera del repo:
  1. Reemplazar en Vercel `GOOGLE_SERVICE_ACCOUNT_EMAIL` por el `client_email` real.
  2. Reemplazar `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY` por la `private_key` de esa misma cuenta.
  3. Verificar hoja compartida con esa service account.
- Verificación objetivo después del redeploy:
  - `GET /api/mo/products` -> `200`
  - `/RYSminisuper` sin banner fallback
  - `/RYSminisuper/admin/acceso` + snapshot admin -> `200`
  - `POST /api/contact` con lead humano -> `200` + `leadId`
  - CTAs móviles visibles en `/video` y páginas comerciales largas

## 2026-03-11 — RYS final page fix (catálogo primero + foto local + dark toggle)
- Rama: `feat/pagina-hermana-live`
- Causa exacta del bug de catálogo:
  - `Caliente hoy` no leía `hotStatus` real de Sheets/admin.
  - La storefront usaba `HOT_IDS = ["mo-cafe-pack"]` hardcodeado en `src/app/mo/catalogConfig.ts`, por eso el bloque/tab mostraba café aunque no fuera comida caliente.
  - `Combos` también dependía de heurística por nombre (`combo|pack`) sin categoría real, así que el catálogo quedaba mezclado y frágil.
  - `Ofertas` estaba leyendo `isFeatured` en vez de promos reales.
- Corrección aplicada:
  - `Product` ahora carga `hotStatus`, ventanas y nota desde `products`/Sheets.
  - `Caliente hoy` se construye solo con `hotStatus = preparando|listo`.
  - `Combos` se construye por `category === "combos"` o fallback textual.
  - `Ofertas` usa promo real (`promoEnabled` + `promoPercent > 0`).
  - `Destacados` se deja como selección editorial visible (`isFeatured`) excluyendo calientes y combos para evitar duplicados raros.
- Ajuste de datos semilla/precios:
  - `mo-cafe-pack` pasó de `Pack cafe molido` a `Combo cafe + pan dulce` (`$2.25`) para que el fallback no se sienta ajeno a una tienda de barrio.
  - `mo-sandwich` y `mo-pan-con-pollo` se reclasificaron como `combos`.
  - `mo-pupusas` y `mo-empanadas` quedaron marcados con `hotStatus` activo y ventanas reales de retiro.
  - Se retocaron precios puntuales (`jugo`, `cold brew/cafe frio`, `yuca`, `ensalada`) para mayor credibilidad comercial local.
- Causa de que no se viera la imagen del local:
  - La ruta pedida para perfil no existía.
  - Solo estaba el asset en `public/imagenes/fondo/rysminisuper.jpeg`, pero no había ningún bloque de RYS renderizando una foto del local.
- Fix de imagen:
  - se creó `public/imagenes/perfil/rysminisuper.jpeg` reutilizando el asset real existente;
  - se integró en el hero con `next/image`, copy de confianza y layout móvil.
- Causa de que no se viera el toggle oscuro:
  - `/RYSminisuper` usa header propio (`MoHeader`) y no el header global donde vive `ThemeToggle`;
  - además `AppShell` para rutas RYS fijaba `bg-slate-50 text-slate-900`, dejando el contenedor principal en claro aunque el tema cambiara.
- Fix de dark mode:
  - `ThemeToggle` se montó dentro de `MoHeader` con etiqueta visible;
  - `AppShell` pasó a usar tokens `bg-base text-main`;
  - se añadió script inicial en `layout.tsx` para restaurar tema desde `localStorage` o preferencia del sistema.
- Verificación local ejecutada:
  - `pnpm -s build || npm run build` OK
  - `npm run lint` OK
  - `curl` al dev server confirmó presencia de:
    - botón `Modo oscuro`
    - imagen `/_next/image?url=%2Fimagenes%2Fperfil%2Frysminisuper.jpeg`
    - bloque `Caliente hoy`
    - bloque `Combos`
- Pendiente real:
  - si producción sigue sin credenciales válidas de Sheets, RYS continuará mostrando banner de fallback aunque la UX ya quede coherente con la semilla.

## 2026-03-11 — RYS next block (acceso + flujo admin)
- Estado confirmado antes de tocar:
  - home/catálogo RYS no se reabrieron;
  - branch activa: `feat/pagina-hermana-live`;
  - persistía un archivo no trackeado previo: `public/imagenes/fondo/rysminisuper.jpeg`;
  - en local el bloqueo de Sheets seguía visible en fallback, pero no era el foco de este bloque.
- Hallazgos reales del flujo de acceso/admin:
  - `/RYSminisuper/admin/acceso` ya aceptaba clave, mostrar/ocultar y loading, pero seguía explicando poco la diferencia entre:
    - clave incorrecta;
    - admin deshabilitado/sin credenciales;
    - acceso correcto con fallo posterior de carga.
  - `AdminClient` ya permitía operar, pero el feedback era demasiado genérico (`Precio guardado`, `No se pudo...`) y no ayudaba a una usuaria no técnica a saber qué pasó.
  - el catálogo operativo del admin no tenía búsqueda ni filtro, lo que volvía lento revisar precio, stock, orden o imagen en móvil.
  - registrar venta manual no validaba casos básicos como producto ausente o total/precio `<= 0`.
- Mejoras aplicadas en acceso:
  - estado explicativo en vivo (`statusNote`) durante validación;
  - microcopy más claro sobre qué significa cada fallo;
  - mensaje explícito para `503` cuando el entorno no tiene credenciales admin;
  - error visual más claro dentro de tarjeta, sin mezclarlo con fallo posterior del panel.
- Mejoras aplicadas en admin:
  - banner de acción separado por tono:
    - éxito con título + detalle;
    - error con título + detalle;
    - estado temporal de guardado/acción en curso.
  - feedback más específico por operación:
    - stock,
    - precio,
    - visibilidad,
    - orden,
    - imagen,
    - oferta,
    - destacado,
    - caliente del día,
    - venta manual,
    - importación y recarga.
  - búsqueda y filtro operativo en `Control de catálogo`:
    - texto libre;
    - `Todos / Solo visibles / Solo ocultos / Agotados`.
  - validaciones nuevas en venta manual:
    - producto requerido;
    - cantidad > 0;
    - precio/total > 0.
  - microcopy extra para precio, venta manual y relación entre acceso correcto vs fallo de lectura posterior.
- QA fino aplicado:
  - tap targets y botones críticos mantienen altura cómoda;
  - filtros y buscador quedan visibles arriba del listado para uso móvil;
  - el botón de venta manual muestra `Guardando...` mientras persiste.
- Verificación ejecutada:
  - `pnpm -s build || npm run build` OK
  - `npm run lint` OK
- Pendiente real:
  - no se cerró un smoke interactivo completo con login real + edición persistente porque el foco local sigue condicionado por env/Sheets según entorno;
  - sigue pendiente una validación operativa manual completa en entorno con credenciales reales y cookie activa.
- Punto de continuidad siguiente:
  1. smoke manual real de login admin;
  2. editar precio/stock/imagen/orden con credenciales activas;
  3. validar venta manual reflejada en resumen;
  4. solo después, si no hay fricción nueva, pasar a PBIA sin reabrir home RYS.

## 2026-03-11 — RYS final QA (login real + panel real + persistencia)
- Estado confirmado antes de tocar:
  - branch activa: `feat/pagina-hermana-live`;
  - home/catálogo no se reabrieron;
  - el único residuo local era `public/imagenes/fondo/rysminisuper.jpeg` no trackeado.
- Resultado del login real:
  - `POST /api/mo/admin/login` con clave incorrecta devolvió `401` + `Clave incorrecta.`
  - `POST /api/mo/admin/login` con clave correcta devolvió `200` + cookie `mo_admin=1`.
  - la diferencia entre clave mala y acceso correcto quedó validada a nivel de backend real.
  - la pantalla de acceso servida en local ya expone el microcopy nuevo sobre:
    - clave incorrecta;
    - error posterior de carga;
    - flujo esperado en móvil.
- Resultado del panel real:
  - con cookie válida, `GET /api/mo/admin` devolvió `500` con código `SHEETS_NOT_CONFIGURED`.
  - con cookie válida, `GET /api/mo/admin?view=stats` devolvió el mismo bloqueo `SHEETS_NOT_CONFIGURED`.
  - con cookie válida, pruebas reales de escritura:
    - `updatePrice`
    - `logOrder`
    devolvieron `500` con el mismo código `SHEETS_NOT_CONFIGURED`.
  - conclusión: el login local sí funciona; la carga y persistencia del panel local quedan bloqueadas por configuración ausente de Sheets, no por la UI ni por auth.
- Resultado de persistencia:
  - no se pudo validar persistencia real en local porque no hay lectura viva de Sheets;
  - tampoco puede confirmarse reflejo en storefront local por la misma causa: `GET /api/mo/products` devuelve `SHEETS_READ_FAILED` / `Google Sheets no configurado`, y la storefront cae a semilla/fallback.
  - bloqueo exacto y verificable:
    - faltan `RYS_SHEETS_SPREADSHEET_ID`, `GOOGLE_SERVICE_ACCOUNT_EMAIL` y `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY` en `.env.local`.
- Decisión sobre archivo no trackeado:
  - `public/imagenes/fondo/rysminisuper.jpeg` se eliminó.
  - no tenía referencias activas en código;
  - la ruta vigente y usada por RYS quedó en `public/imagenes/perfil/rysminisuper.jpeg`.
- Qué sí quedó validado:
  - auth local real;
  - distinción backend entre clave incorrecta y acceso correcto;
  - bloqueo posterior de carga/escritura con código backend exacto;
  - limpieza del repo respecto al duplicado de imagen.
- Qué no se pudo validar y por qué:
  - edición persistente real en panel;
  - reflejo en storefront;
  - reflejo en datos/Sheets vivos;
  - causa: entorno local sin variables activas de Sheets.
- Punto de continuidad siguiente:
  1. cargar envs reales de Sheets en el entorno de QA que se vaya a usar;
  2. repetir smoke real con cookie activa:
     - `updatePrice`,
     - `updateStock`,
     - `updateStatus`,
     - `updateSortOrder`,
     - `updateImage`,
     - `logOrder`;
  3. comprobar reflejo en `/RYSminisuper` y en la hoja;
  4. si eso pasa, RYS queda operativo y cerrado.

## 2026-03-13 — RYS QA ready (sticky + dark estable + combos/promos)
- Rama: `feat/pagina-hermana-live`
- Objetivo: preparar QA real en deploy (Vercel) sin reabrir home/catálogo base.
- Cambios clave (solo fricción real):
  - Header/menu RYS sticky también en desktop, y tabs del catálogo se anclan debajo del header (evita tapar contenido al hacer scroll).
  - Dark mode más estable: reduce flash inicial usando `prefers-color-scheme` cuando no hay override explícito, y banner de fallback legible en oscuro.
  - Capas operables para ventas:
    - Combos: sección "Combos útiles" con "Agregar combo" que añade varios items al carrito (sin crear productos falsos).
    - Promos: sección "Promos de hoy" con 2 promos manuales (sampling premium + hoy/por salir) sin posicionarnos como "los más baratos".
- Commits:
  - `dd5e7a9` feat(rys): sticky header/menu on scroll
  - `e165976` fix(rys): dark mode stability/contrast
  - `540fc7a` feat(rys): combos model + rendering
  - `353f036` feat(rys): promos model + rendering
- Operación (editar sin romper):
  - Editar combos: `src/lib/mo/combos.ts` (IDs + qty + textos).
  - Editar promos: `src/lib/mo/promos.ts` (IDs + mensajes).
  - Importante: los `productId` deben existir en el catálogo (Sheets o fallback semilla).
- QA manual sugerido (antes de dar por cerrado):
  - `/RYSminisuper`: sticky + scroll + contraste OK en claro/oscuro.
  - Probar "Agregar combo" y confirmar que el carrito lista los items individuales.
  - Forzar fallback (sin envs) y validar el banner "modo respaldo" en dark.
  - Confirmar "Pedir por WhatsApp" y "Agregar" siguen destacando.

## 2026-03-13 — RYS final isolation + mobile P0 + admin entry
- Rama: `feat/pagina-hermana-live`
- Objetivo:
  - dejar `/RYSminisuper` listo para test real con cliente sin contaminación visual de PBIA;
  - corregir el bug P0 de móvil sin parche ciego;
  - mantener el acceso admin disponible pero no protagonista para público normal.
- Causa exacta del bug:
  - el fondo galaxia de PBIA estaba montado globalmente en `body.bg-galaxy::before`;
  - `AppShell` ya evitaba `ClientLayout` para rutas RYS, pero eso no quitaba el pseudo-elemento fijo del `body`;
  - en móvil, además, `MoHeader` forzaba demasiado ancho por meter branding + `ThemeToggle` ancho + CTA WhatsApp en una sola fila, y el sticky del catálogo expandía lateralmente con `-mx-4`.
- Fix aplicado:
  - `src/app/layout.tsx`: el `body` deja de cargar la galaxia por defecto.
  - `src/app/components/AppShell.tsx` + `src/app/globals.css`: la galaxia pasa a un wrapper exclusivo de PBIA (`.bg-galaxy-shell`).
  - `src/app/RYSminisuper/layout.tsx`: RYS recibe shell propio (`.rys-shell`) con fondo limpio y `overflow-x: clip`.
  - `src/app/mo/components/MoHeader.tsx`: el header se reorganiza para móvil; toggle compacto en móvil, toggle con label en `sm+`, CTA WhatsApp centrada y botón `Admin` visible solo con sesión.
  - `src/app/mo/CatalogSection.tsx`: el sticky de tabs deja de usar expansión lateral negativa y queda contenido dentro de un wrapper propio.
  - `src/app/RYSminisuper/page.tsx` + `src/app/mo/components/MoStorefront.tsx`: la cookie `mo_admin` se lee server-side para mostrar acceso rápido a admin solo cuando ya hay sesión activa.
- Estado verificado:
  - `npm run lint` OK.
  - `npm run build` OK.
  - la ruta `/RYSminisuper/admin/acceso` sigue compilando; Next marca deopt a CSR, pero no error de build.
- Estado operativo:
  - experiencia pública entra por `/RYSminisuper` sin CTA admin visible si no hay sesión;
  - si existe cookie `mo_admin`, aparece acceso rápido `Admin` dentro del header de RYS;
  - `/RYSminisuper/admin` y `/RYSminisuper/admin/acceso` quedan cubiertas por el shell aislado de RYS, no por el fondo PBIA.
- Pendiente de cierre:
  - smoke visual real en preview/dominio para confirmar en pantalla que no queda scroll horizontal residual en 360–430 px.

## 2026-03-15 — RYS bloque comercial realista: ajuste de fuente live
- Regresión detectada durante verificación del bloque comercial:
  - los combos nuevos (`Pupusas + Coca-Cola`, `Café + pan dulce`, `Snack + Coca-Cola`) sí se publicaban, pero varias referencias de producto salían como "No se encontró en el catálogo".
  - causa exacta: producción estaba leyendo la hoja `products` de Google Sheets; los nuevos SKUs se agregaron al seed local `src/data/products.json`, pero no existían todavía en la hoja live.
- Fix aplicado:
  - `src/lib/mo/data/sheetsStore.ts` ahora fusiona automáticamente los productos seed faltantes dentro de la hoja `products` cada vez que carga estado.
  - la fusión preserva operación actual: no pisa precios, stock, promos ni estados de SKUs ya existentes; solo agrega IDs nuevos ausentes.
- Impacto operativo:
  - los productos comerciales nuevos quedan disponibles en storefront/admin sin reimport manual completa;
  - sigue siendo editable en admin todo lo ya existente en la hoja;
  - los combos manuales continúan duros en `src/lib/mo/combos.ts`, pero ahora pueden referenciar nuevos SKUs del seed sin romper el live.

## 2026-03-15 — RYS storefront stabilization (deduplicación de CTAs/estados)
- Regresión visible confirmada en live:
  - productos como `Queso fresco 250g`, `Ensalada de frutas`, `Pan blanco grande`, `Pupusas mixtas (3 unid)` y combos comerciales estaban apareciendo con sensación de CTA/estado duplicado.
- Causa exacta:
  - el mismo `ProductCard` accionable se estaba reutilizando en `MoQuickShop`, `MoPromos` y `CatalogSection`;
  - además `ProductCard` conservaba dos árboles de acciones (`default` y `compact`) dentro del mismo componente, dejando la deduplicación apoyada en CSS en vez de en una sola rama real de render.
- Fix aplicado:
  - `ProductCard` ahora renderiza una sola rama de acciones por variante y soporta modo resumen (`showActions={false}`, `showStatusBadge={false}`).
  - `MoQuickShop` y `MoPromos` pasan a usar el card en modo resumen, sin botones `Agregar`, sin `No disponible` y sin `Avisarme`.
  - la acción operativa queda concentrada en el catálogo completo y en la sección manual de combos (`Agregar combo`).
- Criterio de render final:
  - teaser/promos/quickshop: resumen visual sin CTA operativa duplicada;
  - producto normal en catálogo: una sola acción principal `Agregar`;
  - producto no disponible/pronto en catálogo: un solo estado + un solo `Avisarme`;
  - combo manual: una sola acción `Agregar combo`.

## 2026-03-16 — RYS hardening operativo: health real vs fallback visual
- Rama: `feat/pagina-hermana-live`
- Objetivo: separar con evidencia técnica "la UI sigue viva" de "RYS está operando de verdad contra Sheets".

### Problema real
- El repo ya tenía:
  - fallback server-side en storefront;
  - códigos backend útiles en `products/admin`;
  - smoke local reproducible.
- Pero faltaba un chequeo único, read-only y operativo que permitiera responder sin ambigüedad:
  - si el storefront estaba leyendo Sheets de verdad;
  - si el admin podía escribir sobre la misma fuente viva;
  - si `/api/mo/events` seguía bloqueado o listo.

### Qué se cambió
- Nuevo endpoint: `GET /api/mo/health`
  - runtime `nodejs`;
  - lectura read-only;
  - no depende del banner visual para declarar salud.
- `sheetsStore` ahora expone un readiness operativo con tres modos:
  - `fully_operational`
  - `storefront_live_admin_blocked`
  - `fallback_only`
- El readiness revisa:
  - `MO_ADMIN_ENABLED` + secreto admin;
  - configuración de variables Sheets;
  - autenticación real contra Google;
  - pestañas y headers críticos:
    - `products`
    - `orders`
    - `daily_sales`
    - `events`
  - capacidad efectiva de storefront/admin/eventos.
- `src/app/api/mo/products/route.ts` y `src/app/api/mo/admin/route.ts` pasan a usar el mismo mapeo de códigos backend.
- `scripts/predeploy/smoke-local.sh` ahora consulta primero `/api/mo/health`.

### Verificación local real
- `npm run lint` OK.
- `npm run build` OK.
- `bash scripts/predeploy/check-env-readiness.sh .env.local`
  - RYS sin variables de Sheets en local;
  - admin access sí configurado.
- Smoke local contra dev server en `3011`:
  - `GET /api/mo/health` -> `503`
  - `mode=fallback_only`
  - `checks.adminAccess.ok=true`
  - `checks.sheetsConfig.ok=false`
  - `checks.storefrontLive.ok=false`
  - `checks.adminWriteLive.ok=false`
  - `checks.eventsLive.ok=false`
  - `GET /api/mo/products` -> `500` + `SHEETS_NOT_CONFIGURED`
  - `GET /api/mo/admin` sin cookie -> `401`
  - `POST /api/mo/admin/login` -> `200` + cookie `mo_admin`
  - `GET /api/mo/admin?view=stats` con cookie -> `500` + `SHEETS_NOT_CONFIGURED`
  - `POST /api/mo/admin` con cookie -> `500` + `SHEETS_NOT_CONFIGURED`
- Verificación funcional mínima:
  - `/RYSminisuper` sigue renderizando con banner de fallback;
  - `/RYSminisuper/admin/acceso` sigue cargando correctamente.

### Conclusión operativa
- Con este bloque, el sistema deja de esconderse detrás del fallback.
- En el estado local actual:
  - la UI puede sobrevivir;
  - el login admin funciona;
  - pero RYS no está operando de verdad contra Sheets.

### Último estado bueno de este bloque
- Commit técnico validado localmente: `a6122e2`
- Significado:
  - readiness honesto activo;
  - build/lint OK;
  - smoke local coherente con el entorno real.

### Cómo verificar que RYS está sano de verdad
1. `GET /api/mo/health` debe devolver `200` y `mode=fully_operational`.
2. `GET /api/mo/products` debe devolver `200`.
3. Login admin debe devolver cookie `mo_admin`.
4. `GET /api/mo/admin?view=stats` con cookie debe devolver `200`.
5. `POST /api/mo/admin` con una escritura mínima debe devolver `200`.
6. El cambio debe reflejarse en storefront tras recarga.

### Pendiente real
- Hacer smoke live post-deploy en un entorno con credenciales válidas de Sheets.
