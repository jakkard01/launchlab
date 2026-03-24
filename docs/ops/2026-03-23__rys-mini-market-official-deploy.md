# 2026-03-23 - RYS Mini Market official deploy note

- Fecha exacta: 2026-03-23 19:07:48 CET
- Autor: Codex
- Scope: rename oficial a `RYS Mini Market` sobre ruta publica `/RYSminisuper`

## Estado actual consolidado al 2026-03-24

- El ultimo deployment de produccion documentado para RYS/PBIA es:
  - `https://launchlabv1-dnv14z9yy-gerrys-projects-7c589fcf.vercel.app`
- Estado operativo esperado:
  - `https://www.poweredbyia.com` = portfolio principal
  - `https://www.poweredbyia.com/RYSminisuper` = acceso heredado de RYS
  - `https://rysminimarket.com` = entrada comercial de RYS Mini Market
  - `https://www.rysminimarket.com` = entrada comercial alterna de RYS Mini Market
- Esta nota queda como referencia operativa historica; para resumen vivo del estado actual usar:
  - `docs/obsidian/06_ESTADO_ACTUAL__PBIA_RYS.md`

## Validaciones ejecutadas

- `npm run predeploy:env`
  - Resultado: ejecutado
  - Observacion: el `.env.local` de esta maquina reporta faltantes para PBIA y RYS (`CONTACT_WEBHOOK_URL`, `PBIA_LEADS_SHEETS_SPREADSHEET_ID`, `RYS_SHEETS_SPREADSHEET_ID`, `GOOGLE_SERVICE_ACCOUNT_EMAIL`, `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY`)
- `npm run lint`
  - Resultado: OK
- `npm run build`
  - Resultado: OK
  - Observacion: warning conocido de deopt a client rendering en `/RYSminisuper/admin/acceso`, sin bloquear build
- `npm run predeploy:smoke`
  - Resultado: no concluyente
  - Bloqueo: el script no pudo conectar con `next dev` dentro de esta sandbox por conectividad local entre sesiones

## Deploy oficial

- Comando usado: `vercel --prod`
- Resultado: OK
- Produccion creada: `https://launchlabv1-3vubvg6xf-gerrys-projects-7c589fcf.vercel.app`
- Inspect URL: `https://vercel.com/gerrys-projects-7c589fcf/launchlabv1/wCHsiVeUvBaCZ5qnopf7xLCd5LmD`
- Alias aplicado por Vercel: `https://www.poweredbyia.com`

## Nota sobre el cierre del comando

Despues de mostrar `Production` y `Aliased`, el CLI abrio un prompt no relacionado al deploy para acciones extra/actualizacion. Ese prompt se cerro con `SIGINT`. El deploy ya estaba completado antes de ese cierre, segun la salida del CLI.

## Rollback note

Si aparece una regresion ligada a este rename, revertir este bloque de commit y volver a desplegar con `vercel --prod`. No conviene mezclar rollback parcial de docs/config/metadata si la intencion es volver a un estado anterior consistente.
