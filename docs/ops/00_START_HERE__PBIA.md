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
- Bloque cerrado: SEO / metadata, legal mínimo, cookies, microajustes móviles y CTA `Quiero esto` prellenado por servicio
- Lo ya preservado de PBIA: hero, problema, servicios, proceso, proyectos reales, enfoque / sobre mí, precios orientativos, CTA final y apoyo real a `RYS Minimarket`
- Lo ya consolidado de RYS en memoria: auth/login/logout/roles/404/aislamiento, `yasmin.rys`, admin móvil y reducción de lecturas a Sheets
- Siguiente paso lógico: commit, deploy y verificación final de lo ya cerrado
- Commit exacto: `4d25222`
- Deploy exacto: `https://launchlabv1-gnyyw0bmm-gerrys-projects-7c589fcf.vercel.app`
- Alias: `https://www.poweredbyia.com`
- Imágenes exactas:
  - `/imagenes/pbidesk.jpeg`
  - `/imagenes/pbiamov.jpeg`
  - `/imagenes/rysdesk.jpeg`
  - `/imagenes/rysmov.jpeg`
- Mi papel exacto:
  - PBIA: `Dirección comercial, estructura web y ejecución del producto.`
  - RYS: `Definición operativa, validación funcional y mejora del flujo de tienda/admin.`
