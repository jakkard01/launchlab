# 00_START_HERE__PBIA

## Ruta correcta

```bash
cd /mnt/c/Demonio_IA/06_Web/launchlab__PROD/.worktrees/feat-pbia-portfolio-next
```

## Rama esperada

```bash
git branch --show-current
# esperado: feat/pbia-portfolio-next
```

## Regla operativa

- Esta es la ruta correcta para abrir Codex y trabajar PBIA.
- No trabajar PBIA desde el repo padre.
- No trabajar PBIA desde `feat/pagina-hermana-live`.
- Antes de tocar nada, confirmar worktree y rama reales.

## Check mínimo obligatorio

```bash
pwd
git branch --show-current
git worktree list --porcelain | sed -n '1,40p'
```

## Fuente real de la home

- `src/app/page.tsx`
- `src/app/components/MainContent.tsx`
- `src/app/components/HomeContent.tsx`

## Cierre técnico vigente

- Este worktree debe tener dependencias locales propias.
- `next` validado localmente: `14.2.30`
- `dev` usa `.next-dev`
- `build` usa `.next`
- `.next-dev` está ignorado en Git

## Validación base antes de deploy

```bash
npm run lint
npm run build
npm run build
npm run dev
```

## Checkpoint actual

- Worktree real: `/mnt/c/Demonio_IA/06_Web/launchlab__PROD/.worktrees/feat-pbia-portfolio-next`
- Rama real: `feat/pbia-portfolio-next`
- Bloque en curso: `Servicios` y `Proceso`
- Lo ya preservado de PBIA: hero, CTA WhatsApp, tono serio y apoyo real a `RYS Minimarket`
- Lo ya consolidado de RYS en memoria: auth/login/logout/roles/404/aislamiento, `yasmin.rys`, admin móvil y reducción de lecturas a Sheets
- Siguiente paso lógico: `npm run lint`, `npm run build`, validar home en móvil y cerrar deploy trazable
