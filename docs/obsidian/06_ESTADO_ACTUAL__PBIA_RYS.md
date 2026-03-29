# 06_ESTADO_ACTUAL__PBIA_RYS

- Nota: nombre legacy conservado por continuidad. El arranque operativo actual se hace desde `00_START_HERE.md` y `docs/ops/00_START_HERE__PBIA.md`.

## Estado actual en esta rama

### Powered by IA

- Rama: `feat/pbia-portfolio-next`
- Worktree: `/mnt/c/Demonio_IA/06_Web/launchlab__PROD/.worktrees/feat-pbia-portfolio-next`
- Ruta correcta para abrir Codex y trabajar PBIA:
  - `cd /mnt/c/Demonio_IA/06_Web/launchlab__PROD/.worktrees/feat-pbia-portfolio-next`
  - usar `docs/ops/00_START_HERE__PBIA.md`
- Render real de la home:
  - `src/app/page.tsx`
  - `src/app/components/MainContent.tsx`
  - `src/app/components/HomeContent.tsx`
- PBIA se trabaja como experiencia aislada y no debe mezclarse con `feat/pagina-hermana-live`.
- Base buena de referencia recuperada:
  - commit `7f058c6` `feat(pbia): sharpen home positioning and simplify conversion flow`
- Regla operativa:
  - no volver a parchear PBIA desde un estado intermedio degradado
  - primero restaurar la base buena
  - después aplicar mejoras mínimas compatibles
- Problema detectado:
  - la home local había derivado a un estado peor que la base buena
  - se había debilitado la dirección comercial
  - el fondo perdió presencia
  - la foto había desaparecido
  - había riesgo de mezclar worktrees o tomar como base una versión incorrecta
- Estado correcto actual de la home:
  - vende sistemas comerciales con IA para captar, responder y convertir mejor
  - mantiene `Hablar por WhatsApp` como CTA principal
  - mantiene `Ver proyectos` como CTA secundaria para el bloque de pruebas reales
  - mantiene una sección de precios orientativos clara y corta
  - cierra con CTA final visible con WhatsApp, Formulario y Email
  - devuelve la foto al hero como apoyo de credibilidad
  - vuelve a mostrar el fondo de marca con más respiración y menos caja opaca
  - deja a RYS como caso real principal
  - mantiene bots, automatizaciones y pruebas reales como capacidades subordinadas
  - muestra WhatsApp real y email visible en el cierre
- CTA principal:
  - `Hablar por WhatsApp`
- CTA secundaria:
  - `Ver proyectos`
- Cierre técnico del worktree:
  - `npm ci` local ejecutado dentro de este worktree
  - `next` local validado en `14.2.30`
  - `dev` usa `.next-dev`
  - `build` usa `.next`
  - `.next-dev` queda ignorado en Git
- Validación cerrada:
  - `npm run lint` OK
  - primer `npm run build` OK
  - segundo `npm run build` OK
  - `npm run dev` OK
  - `/` estable en build dentro de esta línea PBIA
- Estado actual:
  - home afinada para captación
  - bloque `Servicios` en refinamiento con 3 ofertas paquetizadas
  - bloque `Proceso` en refinamiento con 4 pasos simples
  - bloque `Proyectos reales` ya cerrado con Powered by IA y RYS Minimarket
  - bloque `Enfoque / Sobre mí` ya cerrado con copy práctico y breve
  - bloque `Precios orientativos` ya cerrado
  - bloque `CTA final` ya cerrado
  - build estable
  - lista para validar y cerrar deploy desde esta línea PBIA
- Qué no se tocó:
  - RYS Mini Market fuera de su experiencia propia
  - `feat/pagina-hermana-live` como contexto separado de PBIA
  - `next-env.d.ts` tratado como ruido de entorno salvo necesidad estricta

### RYS Mini Market

- No fue tocada en esta pasada.
- Estado bueno ya conseguido y mantenido en memoria:
  - auth/login/logout/roles/404/aislamiento cerrados y validados
  - usuario `yasmin.rys` creado con rol `admin_operator`
  - admin móvil más usable
  - lecturas a Google Sheets reducidas
- Sigue siendo caso real dentro de PBIA, no producto activo de esta pasada.
- Debe seguir tratándose como experiencia separada.

## Checkpoint 2026-03-29

- Worktree actual: `/mnt/c/Demonio_IA/06_Web/launchlab__PROD/.worktrees/feat-pbia-portfolio-next`
- Rama actual: `feat/pbia-portfolio-next`
- Bloque completado en esta pasada: `precios orientativos`, `CTA final` y limpieza general
- Siguiente minibloque lógico: SEO / metadata, legal / cookies o sustitución de placeholders por capturas reales
- Riesgo operativo: cambios sueltos preexistentes en el worktree padre no se deben arrastrar aquí; no tocar PBIA desde el repo padre ni mezclarlo con RYS
