# Deploy checklist (Powered by IA)

## Commands
- `npm run lint`
- `npm run build`
- `bash scripts/audit/obsidian_snapshot.sh web`

## Checklist
- Lint OK, build OK
- `/prompts` no aparece en rutas ni en `sitemap.xml`
- `robots.txt` apunta a sitemap correcto
- OG image (`/public/og.png`) y metadata global válidas
- Contacto: success/error/429 con mensajes claros
- WhatsApp CTA funcionando (principal)
- Mobile menu: tap fuera cierra, scroll interno funciona, safe-area OK
- Sticky CTA + FAB ocultos cuando menú está abierto
- Hero mobile: H1 + sub + bullets + proof chips + CTAs visibles en 5s

## Post-deploy verification (PROD)
- `/sitemap.xml`
- `/robots.txt`
- `/api/health`
- `/contact`
- `/pricing`
- `/portfolio`
- Confirmar que `/prompts` responde 404 y no está en sitemap.

## Dominio en Vercel
- Configura `NEXT_PUBLIC_SITE_URL` y `SITE_URL` con el dominio de producción.
- Ejemplo: `https://poweredbyia.com`

## Facebook link
- Mientras el perfil no sea público, usar link de búsqueda.
- Cuando esté activo, reemplazar por la URL final del perfil o ID.

## Obsidian snapshot (permisos)
Si el script falla por permisos en `/mnt/c`:
1. Crea snapshot local:
   - `mkdir -p tmp_runs`
   - Ejecuta build y guarda el run en `tmp_runs/WEB__RUN__<timestamp>.md`
2. Copia manualmente al Vault:
   - `cp tmp_runs/WEB__RUN__<timestamp>.md /mnt/c/Demonio_IA/01_PJECTOX/notas/PJECTOX_Vault/02_Documentacion/PJETDOCS/10_WEB_POWEREDBYIA/runs/`
