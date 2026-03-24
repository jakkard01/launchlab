# CODEX_CHANGES

- Fecha/Hora: 2026-03-24 03:22:23 CET
- Autor: Codex
- Scope: `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/components/HomeContent.tsx`, `src/app/components/MainContent.tsx`, `src/app/components/ProfileModal.tsx`, `src/app/components/Sidebar.tsx`, `src/app/components/HamburgerMenu.tsx`, `src/app/globals.css`, `docs/obsidian/*`, `docs/ops/2026-03-24__pbia-home-positioning-and-deploy.md`
- Resumen: Se afiló el posicionamiento de la home de Powered by IA para vender sistemas comerciales de captación, seguimiento y conversión; se redujo tono commodity, se simplificó el flujo principal, se eliminó la dependencia implícita de `lucide-react` que rompía Vercel y se dejó trazabilidad del deploy exitoso.
- Pruebas: `npm run lint` OK, `npm run build` OK, `vercel --prod` OK.
- Notas/Riesgos: Sigue pendiente conectar el WhatsApp real de PBIA. RYS Mini Market no fue tocada en esta pasada.
