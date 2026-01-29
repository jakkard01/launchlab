# Assumptions (Locked for final release)

## Web (Paginas web)
- Planes en EUR con rangos definidos.
- Web Starter: 1 pagina, hasta 6-8 secciones, 1 ronda.
- Web Growth: 4-6 paginas, 2 rondas, 1 idioma.
- Web Pro: 6-10 paginas, 3 rondas, 1 idioma, A/B de CTA o 2 variantes hero.
- Add-on Ecommerce: catalogo + carrito/checkout o pedido por WhatsApp, hasta 100 productos iniciales.
- No incluye: hosting, dominio, licencias premium, integraciones enterprise.
- Panel de edicion simple incluido en planes web.
- Integraciones n8n solo como add-on.

## Admin / Data layer
- Modo default: mockAdapter en memoria (sin DB).
- Supabase opcional solo si existen SUPABASE_URL y SUPABASE_ANON_KEY.
- Esquema Supabase esperado: tabla "products" con campos id, name, price, description, images, categories, status.
- Login admin por ADMIN_PASSWORD (superadmin) o ADMIN_CLIENT_PASSWORD (admin). Cookies httpOnly.

## Video Packs
- Duracion incluida por video: hasta 45s.
- Revisiones: 2 por video.
- Growth: 8 videos/mes, formatos 9:16 + 1:1, 1 concepto/mes (variaciones), guion ligero (hooks + CTA).
- Pro: 12-16 videos/mes, formatos 9:16 + 1:1 + 16:9, 2 conceptos/mes, guion completo + storyboard simple.
- Cambios: ajuste = microcambios; nuevo = rehacer concepto/guion/estilo (cuenta como nueva pieza).

## Doblaje + Subtitulos
- Incluye voiceover + subtitulos pro.
- Lip-sync basico SOLO talking head.
- Lip-sync avanzado = add-on.
- Idiomas incluidos: 2 (demo EN + DE + ES). Cualquier idioma disponible.
- Idioma extra: €39/video o €149/batch.
- Duracion max asumida: hasta 2 minutos por video en precios base.

## n8n Ops
- Producto separado (no se mezcla con Video/Doblaje salvo Super Pack).
- Simple: 1-2 integraciones, <10 nodos.
- Compleja: 3+ integraciones, 20+ nodos, ERP/CRM custom, logs/retries/branches.

## Bots
- Soportado: Web widget + WhatsApp Cloud API.
- Otros canales: solo bajo pedido (no estandar).

## Super Pack (bundle)
- Desde €2,499/mes.
- Caps: 8 videos/mes (≤45s, 2 formatos) + 2 flujos n8n/mes + 1 bot (≤15 intents + handoff) + 2 doblajes/mes (2 idiomas) + SLA 24–48h habiles.

## Precios
- Modelo: precio a medida (Desde: consulta).
- Se cotiza por alcance, volumen, formatos y complejidad.
