# CHECKLIST SALIDA PRE-DEPLOY

Fecha base: 2026-03-09
Branch: feat/pagina-hermana-live

## Checklist operativo (hermana) — uso diario
1. Entrar a `/RYSminisuper/admin/acceso` y hacer login.
2. Cambiar precio en `Precio unitario` y salir del campo para guardar.
3. Cambiar stock en selector `Stock`.
4. Ocultar/mostrar producto en `Estado (visible/oculto)`.
5. Cambiar orden:
   - rápido con botones `↑` / `↓`
   - o exacto con número en `Orden catálogo`.
6. Cambiar imagen en `Imagen URL` (ruta local o URL pública).
7. Abrir `/RYSminisuper` y confirmar que el cambio se ve.
8. Hacer un pedido de prueba por botón `Completar pedido en WhatsApp`.

## Checklist técnico post-deploy (obligatorio)
1. Abrir homepage PBIA (`/`) y confirmar carga normal.
2. Probar `POST /api/contact` desde formulario y confirmar respuesta exitosa con `leadId`.
3. Verificar llegada real del lead en webhook o hoja `pbia_leads`.
4. Consultar `GET /api/mo/health` y exigir `200` + `mode=fully_operational`.
5. Abrir `/RYSminisuper` y confirmar lectura de catálogo (`200` en `/api/mo/products`).
6. Confirmar en móvil que el primer viewport muestra buscador, CTA principal y copy clara sin scroll extra innecesario.
7. Buscar un producto real (`pupusas`, `cafe`, `coca`) y validar que el modo búsqueda no muestre categorías vacías.
8. Login admin en `/RYSminisuper/admin/acceso`.
9. Cambiar un producto real (ej. `sortOrder`, `stock`, `image`) y guardar.
10. Recargar storefront y confirmar reflejo del cambio.
11. Agregar productos, abrir/cerrar carrito y validar que el sticky de WhatsApp no estorbe ni quede encima del drawer.
12. Probar CTA de WhatsApp de carrito y validar formato del mensaje.
13. Abrir teclado móvil en buscador o campos del drawer y confirmar que las barras sticky inferiores se oculten.

## Punto de reanudación siguiente
1. Subida simple de imagen (sin panel complejo), manteniendo URL manual como fallback.
2. Atajos de edición rápida en lote para precio/stock/estado.
3. Cerrar validación de credenciales productivas con evidencia en deploy nocturno.
