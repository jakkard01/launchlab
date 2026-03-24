# 2026-03-23 - RYS deploy note

- Fecha exacta: 2026-03-23 18:48:59 CET
- Autor: Codex
- Scope: branding visible `RYS Mini Market` sobre ruta publica `/RYSminisuper`

## Objetivo

Desplegar la version actual para probarla directamente en movil sin afirmar que ya esta en produccion.

## Pasos para desplegar

1. Validar entorno:
   - `npm run predeploy:env`
2. Validar calidad local:
   - `npm run lint`
   - `npm run build`
3. Si se quiere smoke local con app levantada:
   - `npm run dev -- --port 3011`
   - `npm run predeploy:smoke`
4. Desplegar con el flujo habitual del proyecto:
   - preview: `vercel`
   - produccion: `vercel --prod`

## Resultado de validacion en esta pasada

- `npm run lint`: OK
- `npm run build`: OK
- `npm run predeploy:env`: ejecutado, pero el entorno local actual reporta faltantes reales para produccion:
  - `CONTACT_WEBHOOK_URL`
  - `PBIA_LEADS_SHEETS_SPREADSHEET_ID`
  - `RYS_SHEETS_SPREADSHEET_ID`
  - `GOOGLE_SERVICE_ACCOUNT_EMAIL`
  - `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY`
- `npm run predeploy:smoke`: no verificable en esta sandbox porque el script no logro conectarse al `next dev` levantado en sesion separada; no se considera prueba funcional concluyente.

## Verificacion en produccion

### Rutas y checks base

- Abrir `/RYSminisuper`
- Abrir `/api/mo/health`
- Abrir `/api/mo/products`
- Abrir `/RYSminisuper/admin/acceso`

### Checklist movil

- Hero y buscador legibles en primer viewport.
- CTA principal de WhatsApp visible sin tapar contenido.
- Accesos rapidos utilizables con una mano.
- Categorias vacias no visibles.
- Tarjetas legibles: nombre, precio, categoria y CTA.
- Carrito sticky visible solo cuando hay productos.
- CTA sticky de WhatsApp oculto si el carrito esta abierto.
- Sticky inferior oculto con teclado abierto.
- Mensaje de WhatsApp final claro al salir desde carrito.

### Flujo a recorrer

1. Entrar al storefront.
2. Buscar un producto.
3. Volver al catalogo.
4. Entrar por acceso rapido.
5. Agregar uno o dos productos.
6. Abrir drawer.
7. Ajustar cantidades.
8. Ir a WhatsApp.

## Rollback note breve

Si aparece una regresion visual o funcional en `/RYSminisuper`, revertir este bloque completo al commit anterior estable y volver a desplegar. No conviene rollback parcial de componentes sueltos porque la pasada toco branding, sticky/cart y orden de bloques de forma coordinada.

## Datos reales pendientes antes de considerar cierre definitivo

- Direccion exacta del local
- Referencia exacta para retiro
- Tiempo real comprometible de respuesta por WhatsApp
- Confirmacion de si en una fase futura se migrara o no la ruta `/RYSminisuper`
