# Deploy Tonight — PBIA + RYS (Google Sheets)

## 0) Diagnóstico real detectado el 2026-03-10

### Actualización 2026-03-11
- `GOOGLE_SERVICE_ACCOUNT_EMAIL` en Vercel `production` ya quedó corregido al `client_email` real de la service account.
- Resultado live tras redeploy:
  - `GET /api/mo/products` ya devuelve `200`.
  - `POST /api/contact` ya devuelve `200` y registra lead.
- Siguiente causa exacta detectada:
  - `/RYSminisuper` seguía mostrando fallback porque la página server-side no tenía `runtime = "nodejs"` aunque la API sí lo tenía.
  - `getStoreProducts()` usa `crypto.createSign`; en API funcionaba porque `src/app/api/mo/products/route.ts` ya fijaba `runtime = "nodejs"`.
  - Fix mínimo aplicado: `export const runtime = "nodejs";` en `src/app/RYSminisuper/page.tsx`.

### Causa exacta del `invalid_grant` en producción
- Evidencia live el 2026-03-10:
  - `GET https://www.poweredbyia.com/api/mo/products` responde `500` con `No se pudo obtener token de Google Sheets: invalid_grant`.
  - `vercel env pull --environment=production` muestra:
    - `RYS_SHEETS_SPREADSHEET_ID` sí existe.
    - `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY` sí existe y conserva formato PEM con `\n` escapados.
    - `GOOGLE_SERVICE_ACCOUNT_EMAIL="launchlab-sheets-bot@tu-proyecto.iam.gserviceaccount.com"`.
- Causa exacta actual:
  - la variable `GOOGLE_SERVICE_ACCOUNT_EMAIL` en producción sigue apuntando a un placeholder (`...@tu-proyecto.iam.gserviceaccount.com`), no a una service account real.
  - mientras eso siga así, RYS no llega siquiera a la etapa de validar pestañas/columnas; el bloqueo es de autenticación previa contra Google OAuth.
- Consecuencia:
  - falla `GET /api/mo/products`
  - falla snapshot/admin de `/RYSminisuper/admin`
  - el storefront entra en fallback server-side
  - el admin puede abrir acceso, pero no puede cargar datos vivos

### Fix mínimo correcto
1. Sustituir en Vercel `GOOGLE_SERVICE_ACCOUNT_EMAIL` por el `client_email` real del JSON de la service account activa.
2. Sustituir `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY` por la `private_key` de esa misma cuenta.
3. Mantener la clave con `\\n` escapados si se pega en una sola línea; el runtime ya la normaliza.
4. Confirmar que la hoja RYS está compartida con ese `client_email`.
5. Confirmar que `RYS_SHEETS_SPREADSHEET_ID` y `PBIA_LEADS_SHEETS_SPREADSHEET_ID` siguen apuntando a hojas válidas.
6. Tras corregir el email, volver a probar esquema:
   - pestañas: `products`, `orders`, `daily_sales`
   - columnas `products`: `id`, `name`, `category`, `sortOrder`, `price`, `description`, `image`, `imageKey`, `isFeatured`, `status`, `stockStatus`, `promoEnabled`, `promoPercent`, `hotStatus`, `hotWindowStart`, `hotWindowEnd`, `hotNote`, `hotUpdatedAt`, `updatedAt`

### Verificación mínima tras corregir Vercel
- `GET /api/mo/products` -> `200`
- `/RYSminisuper` sin banner de respaldo
- login en `/RYSminisuper/admin/acceso` + `GET /api/mo/admin` -> `200`
- `POST /api/mo/admin` -> `200` para:
  - `updatePrice`
  - `updateStock`
  - `updateStatus`
  - `updateSortOrder`
  - `updateImage`
- `POST /api/contact` con mensaje humano normal -> `200` + `leadId`

## 1) PBIA Leads (formulario)

### Endpoint
- `POST /api/contact`

### Destinos soportados
1. Webhook
- `CONTACT_WEBHOOK_URL`
- opcional: `CONTACT_WEBHOOK_TOKEN`

2. Google Sheets (pestaña obligatoria: `pbia_leads`)
- `PBIA_LEADS_SHEETS_SPREADSHEET_ID`
- `GOOGLE_SERVICE_ACCOUNT_EMAIL`
- `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY`

### Columnas exactas (`pbia_leads`)
1. `leadId`
2. `createdAt`
3. `name`
4. `email`
5. `source`
6. `clientIp`
7. `message`

### Resultado esperado
- Si hay destino válido: `200` con `ok=true` y `leadId`.
- Si no hay destino: `503` (falla honesta, sin falso éxito).

## 2) RYS (backend completo en Sheets)

### Endpoints
- Lectura storefront/API: `GET /api/mo/products`
- Escritura admin/API: `POST /api/mo/admin`

### Variables requeridas
- `RYS_SHEETS_SPREADSHEET_ID`
- `GOOGLE_SERVICE_ACCOUNT_EMAIL`
- `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY`
- `MO_ADMIN_ENABLED=1`
- uno de: `ADMIN_PASSWORD` o `ADMIN_PIN` o `MO_ADMIN_KEY`

### Pestañas requeridas
- `products`
- `orders`
- `daily_sales`

### Columnas exactas (`products`)
1. `id`
2. `name`
3. `category`
4. `sortOrder`
5. `price`
6. `description`
7. `image`
8. `imageKey`
9. `isFeatured`
10. `status`
11. `stockStatus`
12. `promoEnabled`
13. `promoPercent`
14. `hotStatus`
15. `hotWindowStart`
16. `hotWindowEnd`
17. `hotNote`
18. `hotUpdatedAt`
19. `updatedAt`

### Campos operativos mínimos ya conectados
- `price`
- `stockStatus`
- `status`
- `sortOrder`
- `image`

Admin y storefront leen/escriben la misma fuente (`sheetsStore`).

## 3) Miniaturas / imágenes

### Rutas esperadas en repo
- Iconos de categorías: `public/mo/categories/`
- Iconos de pasillos RYS: `public/RYSminisuper/icons/pasillos/`
- Imágenes top productos RYS: `public/RYSminisuper/images/top/`
- Miniaturas demos/video: `public/imagenes/fondo/`

### Regla práctica
- No usar imágenes random.
- Si agregas miniaturas nuevas, colócalas en esas carpetas y usa rutas absolutas desde `/` en `image` o `imageKey`.

### Convención actual de miniaturas de demos
- `web_que_se_paga_sola.jpeg` -> demo `web-conversion-hero`
- `auditoria_movil.jpeg` -> demo `audit-mobile`
- `whatsapp.jpeg` -> demo `whatsapp-operator`
- Configuración en `src/app/content/videoPacks.ts` (campo `poster`).

## 4) Comandos de validación local

```bash
npm run predeploy:env
npm run predeploy:smoke
pnpm -s build || npm run build
npm run lint
```

## 4.1) Qué diagnostica ahora el backend
- `SHEETS_SERVICE_ACCOUNT_PLACEHOLDER`
  - `GOOGLE_SERVICE_ACCOUNT_EMAIL` sigue con placeholder o valor no real.
- `SHEETS_SERVICE_ACCOUNT_NOT_FOUND`
  - Google no encuentra la cuenta (`invalid_grant: account not found`).
- `SHEETS_PRIVATE_KEY_FORMAT`
  - la PEM no empieza/termina correctamente.
- `SHEETS_PRIVATE_KEY_INVALID`
  - la PEM no se puede decodificar o no coincide con la cuenta.
- `SHEETS_INVALID_GRANT`
  - credencial inválida/revocada sin detalle adicional.

## 5) Checklist post-deploy (mínimo)
1. Homepage PBIA carga sin errores.
2. Formulario PBIA devuelve `200` y `leadId`.
3. Lead aparece en webhook o hoja `pbia_leads`.
4. `/RYSminisuper` carga catálogo (`/api/mo/products` en `200`).
5. Login admin funciona.
6. Cambio real (`sortOrder` o `image` o `stock`) persiste y se refleja en storefront.
7. Pedido por WhatsApp abre mensaje correcto.

## 6) Prueba admin operativa (rápida)
1. Abrir `/RYSminisuper/admin/acceso` y hacer login.
2. Cambiar un producto en admin:
   - `price`
   - `stockStatus`
   - `status` (active/hidden)
   - `sortOrder`
   - `image` (URL)
3. Guardar y verificar respuesta exitosa del endpoint (`POST /api/mo/admin` en `200`).
4. Recargar `/RYSminisuper` y confirmar reflejo visual de los cambios.
5. Abrir otra sesión/navegador y confirmar que los cambios persisten.

## 7) Detectar fallback vs datos en vivo
- Storefront en fallback:
  - banner visible: `Catálogo temporal en modo respaldo...`
  - suele coincidir con error `500` en `GET /api/mo/products`.
- Datos en vivo activos:
  - sin banner de respaldo
  - `GET /api/mo/products` devuelve `200`
  - cambios guardados en admin aparecen tras recarga en otra sesión.

## 8) Diagnóstico rápido de admin (`/RYSminisuper/admin`)
- Paso 1: login en `/RYSminisuper/admin/acceso`
  - `401`: clave incorrecta (no entra al panel).
  - `403`: admin deshabilitado (`MO_ADMIN_ENABLED`).
  - `503`: faltan credenciales admin (`ADMIN_PASSWORD` / `ADMIN_PIN` / `MO_ADMIN_KEY`).
- Paso 2: carga de snapshot (`GET /api/mo/admin`) con cookie `mo_admin`
  - `401/403`: cookie inválida o sin sesión activa.
  - `500` + `code=SHEETS_SERVICE_ACCOUNT_PLACEHOLDER`: email configurado como placeholder.
  - `500` + `code=SHEETS_SERVICE_ACCOUNT_NOT_FOUND`: Google no encuentra la service account configurada.
  - `500` + `code=SHEETS_PRIVATE_KEY_FORMAT` o `SHEETS_PRIVATE_KEY_INVALID`: PEM mal formateada o desalineada.
  - `500` + `code=SHEETS_INVALID_GRANT`: credenciales de Google inválidas/permisos rotos.
  - `500` + `code=SHEETS_NOT_CONFIGURED`: faltan variables de Sheets.
  - `500` + `code=SHEETS_SCHEMA_INVALID`: columnas/pestañas no coinciden.
- Verificación mínima en producción:
  - `POST /api/mo/admin/login`
  - `GET /api/mo/admin`
  - `GET /api/mo/products`

## 8.1) Estado del repo tras este bloque
- Login admin:
  - mostrar/ocultar clave
  - estado `Validando acceso...`
  - error claro para `401`, `403`, `503`, `400`
- Panel admin:
  - separa error fatal de carga vs error de guardado
  - no cae a pantalla negra por un fallo puntual al editar
  - muestra ayuda accionable cuando falla Sheets/auth
- Storefront:
  - banner fallback ahora muestra causa útil y no solo mensaje genérico
- Home RYS:
  - más clara en 5 segundos: qué es, dónde está, cómo pedir y por qué ahorra tiempo
- Modal/video móvil:
  - bloquea scroll del body
  - permite cerrar con tap fuera y `Esc`
  - mantiene botón cerrar visible arriba

## 8.2) Mejoras locales listas aunque Sheets siga bloqueado
- Home:
  - resumen rápido con atajos móviles al catálogo y pedido especial;
  - copy más útil para compras rápidas y retiro local.
- Admin:
  - feedback positivo visible al guardar;
  - botón de recarga manual;
  - resumen operativo diario (`visibles`, `ocultos`, `agotados`).
- Regla operativa:
  - estas mejoras no dependen de arreglar producción;
  - pueden desplegarse en cuanto el usuario decida, pero la lectura viva de Sheets seguirá bloqueada hasta corregir `GOOGLE_SERVICE_ACCOUNT_EMAIL`.

## 9) Contacto y anti-spam
- Validaciones diferenciadas:
  - `CONTACT_RATE_LIMITED`
  - `CONTACT_MESSAGE_TOO_SHORT`
  - `CONTACT_SPAM_BLOCKED`
  - `CONTACT_DELIVERY_FAILED`
- El formulario ya no muestra “spam/rate limit” como cajón desastre cuando falla la entrega real del lead.
- Mensaje humano normal esperado para prueba:
  - `hola, soy Gerry y quiero una web`

## 10) CTA móvil
- Rutas con barra sticky móvil dual (`WhatsApp` + `Reservar`):
  - `/video`
  - `/web`
  - `/bots`
  - `/ops`
- Validación móvil:
  - los CTAs siguen visibles al hacer scroll largo
  - no tapan contenido final
  - respetan safe-area y no pelean con el FAB
