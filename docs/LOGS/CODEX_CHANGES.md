# CODEX_CHANGES

- Fecha/Hora: 2026-03-29 22:26:20 CEST
- Autor: Codex
- Scope: `src/app/components/HomeContent.tsx`, `docs/LOGS/CODEX_CHANGES.md`, `docs/obsidian/Memoria Infinita - Launchlab.md`, `docs/obsidian/06_ESTADO_ACTUAL__PBIA_RYS.md`, `docs/ops/00_START_HERE__PBIA.md`
- Resumen: Se cerró el bloque 4 de PBIA con precios orientativos, CTA final fuerte y limpieza visual/comercial de la home. Se añadieron tres rangos de precio reales, CTA con WhatsApp/Formulario/Email y una jerarquía más compacta.
- Pruebas: `npm run lint` OK, `npm run build` OK, deploy prod OK.
- Commit: `5e4ba1c`
- Deploy: `https://launchlabv1-ehc6smxm6-gerrys-projects-7c589fcf.vercel.app`
- Alias: `https://www.poweredbyia.com`
- Notas/Riesgos: No tocar legal, cookies, metadata avanzada ni nuevas páginas; RYS sigue solo como caso real dentro de PBIA.

- Fecha/Hora: 2026-03-29 22:10:49 CEST
- Autor: Codex
- Scope: `src/app/components/HomeContent.tsx`, `docs/LOGS/CODEX_CHANGES.md`, `docs/obsidian/Memoria Infinita - Launchlab.md`, `docs/obsidian/06_ESTADO_ACTUAL__PBIA_RYS.md`, `docs/ops/00_START_HERE__PBIA.md`
- Resumen: Se cerró el bloque de `Proyectos reales` y `Enfoque / Sobre mí` en PBIA. Quedaron dos proyectos reales creíbles con placeholders elegantes para capturas y papel, y un bloque de enfoque breve, serio y práctico.
- Pruebas: `npm run lint` OK, `npm run build` OK, deploy prod OK.
- Commit: `d61a546`
- Deploy: `https://launchlabv1-osz7jpzye-gerrys-projects-7c589fcf.vercel.app`
- Alias: `https://www.poweredbyia.com`
- Notas/Riesgos: RYS sigue solo como caso real dentro de PBIA; no se tocó como producto activo.

- Fecha/Hora: 2026-03-29 21:55:43 CEST
- Autor: Codex
- Scope: `src/app/components/HomeContent.tsx`, `docs/LOGS/CODEX_CHANGES.md`, `docs/obsidian/Memoria Infinita - Launchlab.md`, `docs/obsidian/06_ESTADO_ACTUAL__PBIA_RYS.md`, `docs/ops/00_START_HERE__PBIA.md`
- Resumen: Se refinó la primera mitad de la home de PBIA para dejar paquetizados los bloques de `Servicios` y `Proceso` con copy corto, precios y CTA claros, manteniendo el hero ya consolidado. También se dejó memoria operativa actualizada con el checkpoint PBIA/RYS de esta pasada.
- Pruebas: `npm run lint` OK, `npm run build` OK.
- Notas/Riesgos: No tocar RYS como producto activo ni mezclar branding/layouts con PBIA.

- Fecha/Hora: 2026-03-26 00:00:00 CET
- Autor: Codex
- Scope: `00_START_HERE.md`, `docs/ops/00_START_HERE__PBIA.md`, `docs/ops/00_START_HERE__N8N.md`, `docs/ops/00_START_HERE__IA_LOCAL.md`, `docs/obsidian/Memoria Infinita - Launchlab.md`, `docs/obsidian/03_DECISION_LOG.md`, `docs/obsidian/06_ESTADO_ACTUAL__PBIA_RYS.md`
- Resumen: Se reorganizó el arranque documental para separar dominio maestro, PBIA y futuros contextos de `n8n` e `IA local`. Se eliminaron referencias innecesarias que mezclaban worktrees y se dejó explícito que solo PBIA tiene ruta verificada en este worktree.
- Pruebas: Verificación manual de rutas y archivos referenciados dentro del worktree PBIA.
- Notas/Riesgos: `n8n` e `IA local` quedan como placeholders hasta que exista ruta operativa real verificada.

- Fecha/Hora: 2026-03-26 00:00:00 CET
- Autor: Codex
- Scope: `next.config.js`, `.gitignore`, `tsconfig.json`, `00_START_HERE.md`, `docs/obsidian/Memoria Infinita - Launchlab.md`, `docs/obsidian/03_DECISION_LOG.md`, `docs/obsidian/06_ESTADO_ACTUAL__PBIA_RYS.md`, `docs/LOGS/CODEX_CHANGES.md`
- Resumen: Se cerró el contexto operativo de PBIA en su worktree real. Se fijó la ruta correcta de arranque, se documentó la fuente real de la home, se explicó la causa del bloqueo técnico de `/` y se dejó estable el aislamiento de artefactos (`dev -> .next-dev`, `build -> .next`) con validación repetida de lint/build/dev.
- Pruebas: `npm run lint` OK, primer `npm run build` OK, segundo `npm run build` OK, `npm run dev` OK.
- Notas/Riesgos: No volver a trabajar PBIA desde el repo padre ni desde `feat/pagina-hermana-live`.

- Fecha/Hora: 2026-03-24 03:22:23 CET
- Autor: Codex
- Scope: `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/components/HomeContent.tsx`, `src/app/components/MainContent.tsx`, `src/app/components/ProfileModal.tsx`, `src/app/components/Sidebar.tsx`, `src/app/components/HamburgerMenu.tsx`, `src/app/globals.css`, `docs/obsidian/*`, `docs/ops/2026-03-24__pbia-home-positioning-and-deploy.md`
- Resumen: Se afiló el posicionamiento de la home de Powered by IA para vender sistemas comerciales de captación, seguimiento y conversión; se redujo tono commodity, se simplificó el flujo principal, se eliminó la dependencia implícita de `lucide-react` que rompía Vercel y se dejó trazabilidad del deploy exitoso.
- Pruebas: `npm run lint` OK, `npm run build` OK, `vercel --prod` OK.
- Notas/Riesgos: Sigue pendiente conectar el WhatsApp real de PBIA. RYS Mini Market no fue tocada en esta pasada.
