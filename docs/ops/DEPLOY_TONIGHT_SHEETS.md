# Deploy Tonight — PBIA + RYS (Google Sheets)

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

## 5) Checklist post-deploy (mínimo)
1. Homepage PBIA carga sin errores.
2. Formulario PBIA devuelve `200` y `leadId`.
3. Lead aparece en webhook o hoja `pbia_leads`.
4. `/RYSminisuper` carga catálogo (`/api/mo/products` en `200`).
5. Login admin funciona.
6. Cambio real (`sortOrder` o `image` o `stock`) persiste y se refleja en storefront.
7. Pedido por WhatsApp abre mensaje correcto.
