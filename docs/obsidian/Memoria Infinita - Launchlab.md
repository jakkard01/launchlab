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
