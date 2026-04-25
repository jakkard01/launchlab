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
  - muestra capturas reales en `Proyectos reales` en lugar de placeholders
  - incluye una línea breve de `Mi papel` en cada proyecto
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
  - bloque `Proyectos reales` ahora usa capturas reales y línea de `Mi papel`
  - build estable
  - lista para validar y cerrar deploy desde esta línea PBIA
- Cierre 2026-03-30:
  - SEO / metadata finalizados para negocio local, mejora de webs y automatización de contactos
  - páginas legales añadidas: `Aviso legal`, `Política de privacidad`, `Política de cookies`
  - cookies resueltas sin banner porque no hay analítica ni cookies no exentas en esta versión
  - CTA `Quiero esto` prellenado por servicio en WhatsApp
  - capturas móviles ajustadas para que PBIA encaje mejor en móvil sin rehacer bloques
  - fase 2 explícita: brief guiado, presupuesto orientativo, Sheets, n8n y scoring
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
- Bloque completado en esta pasada: `Proyectos reales` con capturas reales y `Mi papel`
- Siguiente minibloque lógico: SEO / metadata, legal / cookies o un repaso de compacidad visual general
- Imágenes exactas usadas:
  - `/imagenes/pbidesk.jpeg`
  - `/imagenes/pbiamov.jpeg`
  - `/imagenes/rysdesk.jpeg`
  - `/imagenes/rysmov.jpeg`
- Mi papel exacto:
  - PBIA: `Dirección comercial, estructura web y ejecución del producto.`
  - RYS: `Definición operativa, validación funcional y mejora del flujo de tienda/admin.`
- Commit exacto: `7e7ef22`
- Deploy exacto: `https://launchlabv1-hdltyncg3-gerrys-projects-7c589fcf.vercel.app`
- Alias: `https://www.poweredbyia.com`
- Riesgo operativo: cambios sueltos preexistentes en el worktree padre no se deben arrastrar aquí; no tocar PBIA desde el repo padre ni mezclarlo con RYS

## Cierre 2026-03-30

- Commit exacto: `4d25222`
- Deploy exacto: `https://launchlabv1-gnyyw0bmm-gerrys-projects-7c589fcf.vercel.app`
- Alias: `https://www.poweredbyia.com`
- Estado final de PBIA:
  - SEO / metadata profesional
  - legal mínimo + cookies sin banner porque no hay analítica ni cookies no exentas
  - microajustes móviles en proyectos reales
  - CTA `Quiero esto` con mensaje prellenado por servicio
  - fase 2 documentada pero no implementada
