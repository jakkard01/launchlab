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

## Obsidian snapshot (permisos)
Si el script falla por permisos en `/mnt/c`:
1. Crea snapshot local:
   - `mkdir -p tmp_runs`
   - Ejecuta build y guarda el run en `tmp_runs/WEB__RUN__<timestamp>.md`
2. Copia manualmente al Vault:
   - `cp tmp_runs/WEB__RUN__<timestamp>.md /mnt/c/Demonio_IA/01_PJECTOX/notas/PJECTOX_Vault/02_Documentacion/PJETDOCS/10_WEB_POWEREDBYIA/runs/`
