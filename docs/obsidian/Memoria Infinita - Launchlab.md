# Memoria Infinita - Launchlab

## 2026-03-26 — Cierre técnico de `npm run lint` standalone

- La causa real del bloqueo en este worktree no era la home: `next lint` estaba entrando en un estado inconsistente por dos motivos de entorno:
  - no había `eslint` ni `eslint-config-next` instalados localmente
  - al añadirlos en versión latest apareció un conflicto extra: `next@14.2.30` no era compatible con `eslint@9`/`eslint-config-next@16`, y además ESLint estaba heredando la config del repo padre
- Cierre técnico aplicado:
  - `eslint@8.57.0`
  - `eslint-config-next@14.2.30`
  - `.eslintrc.json` local con `extends: ["next/core-web-vitals"]`
  - `.eslintrc.json` marcado con `"root": true` para cortar la herencia del repo padre
- Verificación cerrada:
  - primer `npm run lint` OK
  - segundo `npm run lint` OK
  - `npm run build` OK
- Estado final:
  - el worktree PBIA queda técnicamente listo para deploy final

## 2026-03-26 — Sincronización final PBIA / RYS

- La referencia local buena de PBIA manda sobre la home pública vieja de `poweredbyia.com`, que todavía mostraba estructura anterior, naming viejo de RYS y bloques ya descartados.
- Naming final fijado en PBIA: `RYS Minimarket`.
- Ruta vieja descartada como referencia pública en PBIA: `/RYSminisuper`.
- Verificación externa real:
  - `https://www.rysminimarket.com/` queda verificada como web real, usable y presentable
- Decisión aplicada en la home:
  - RYS queda presentado como caso real en producción
  - CTA real de RYS pasa a `https://www.rysminimarket.com/`
  - deja de salir por WhatsApp dentro de PBIA
- Foco fijado en la home principal:
  - PBIA sigue vendiendo sistemas comerciales con IA para captar, responder y convertir mejor
  - vídeos, avatares, HeyGen y CapCut quedan fuera del eje principal en esta fase
- Estado real al cierre:
  - `npm run build` OK
  - `npm run dev` OK
  - `npm run lint` sigue sin devolver cierre estable en standalone en este entorno, aunque `next build` completa su fase de lint/types

## 2026-03-26 — Alineación CANON -> START HERE PBIA

- El CANON del Vault queda alineado como navegación maestra de alto nivel, no como manual operativo duplicado.
- `02_Documentacion/_CANON/00_START_HERE.md` pasa a derivar a PBIA cuando la tarea corresponde a Powered by IA.
- `RAMA_ACTIVA.md` y `ESTADO_ACTUAL.md` del CANON quedan actualizados a:
  - worktree `/mnt/c/Demonio_IA/06_Web/launchlab__PROD/.worktrees/feat-pbia-portfolio-next`
  - rama `feat/pbia-portfolio-next`
- El detalle operativo sigue viviendo exclusivamente en `docs/ops/00_START_HERE__PBIA.md`.
- Criterio fijado:
  - CANON = índice maestro
  - START HERE PBIA = operación concreta
  - no mezclar PBIA con `feat/pagina-hermana-live`
  - no reutilizar PBIA para `n8n` o `IA local`

## 2026-03-26 — Higiene de arranque y separación de contexto

- `00_START_HERE.md` deja de ser un arranque PBIA hardcodeado y pasa a ser índice maestro corto.
- El arranque operativo real de PBIA queda fijado en `docs/ops/00_START_HERE__PBIA.md`.
- PBIA sigue consolidado en `/mnt/c/Demonio_IA/06_Web/launchlab__PROD/.worktrees/feat-pbia-portfolio-next` sobre la rama `feat/pbia-portfolio-next`.
- Se crean placeholders explícitos para `n8n` e `IA local` sin inventar rutas no verificadas.
- Criterio fijado:
  - no abrir PBIA desde el repo padre
  - no mezclar PBIA con `feat/pagina-hermana-live`
  - no reutilizar el contexto PBIA como contexto de n8n o IA local
  - si una ruta no está verificada, se deja como placeholder y no se asume

## 2026-03-25 — PBIA home: simplificación visual final sin rehacer la estructura

### Problema visual identificado

- La home seguía demasiado encajonada por cajas dentro de cajas.
- El fondo de marca había quedado enterrado por superficies opacas y bordes compitiendo.
- La parte superior perdió integración con el fondo por exceso de wrapper y opacidad.
- El bloque de foto se estaba percibiendo como otro módulo más, no como ancla visual.

### Decisión aplicada

- Se corrigió la home simplificando wrappers, bordes y superficies pesadas, sin rehacer su estructura ni abrir otra dirección visual.
- Se restauró respiración del fondo bajando opacidades, soltando el hero y devolviendo transparencia al tramo superior.
- Se mantiene el criterio ya fijado: `/` corre fuera del `AppShell` para que la home PBIA viva standalone sin contaminar el resto.

### Ramas y worktrees

- PBIA queda consolidado en `feat/pbia-portfolio-next`.
- La separación respecto de `feat/pagina-hermana-live` queda resuelta y no debe reabrirse para cambios de home PBIA.
- La restauración previa partió de la línea buena real de PBIA y esta pasada continúa sobre esa misma rama/worktree.

### Fuente real de la home

- `src/app/page.tsx`
- `src/app/components/MainContent.tsx`
- `src/app/components/HomeContent.tsx`

### Criterio fijado para no repetir el problema

- No volver a encajonar la home con cajas sobre cajas.
- No volver a matar el fondo con superficies pesadas o demasiados bordes.
- No volver a mezclar la home PBIA con implementaciones degradadas o ramas ajenas a PBIA.

### Estado de validación y deploy

- El problema visual final quedó acotado a tres puntos: fondo todavía demasiado tapado, legibilidad irregular sobre brillos del fondo y FAB móvil demasiado presente.
- La pasada final abrió más el fondo, bajó peso de overlays/superficies, añadió oscuridad local detrás del texto donde hacía falta y retiró el FAB de móvil para no competir con la lectura.
- Criterio fijado: el fondo debe seguir visible, pero la lectura manda siempre sobre cualquier brillo o transparencia.
- La causa real de la inestabilidad de `/` no estaba en la home ni en `AppShell`: este worktree no tenía `node_modules` propios y estaba heredando `next@13.4.0` del repo padre a través del `PATH`, pese a declarar `next@^14` en `package.json`.
- Además, `dev` y `build` compartían el mismo `.next`, lo que dejaba artefactos inconsistentes y errores de compilación intermitentes al prerenderizar `/`.
- Cierre técnico aplicado:
  - `npm ci` local dentro de `feat/pbia-portfolio-next`
  - `next` del worktree validado en `14.2.30`
  - `next.config.js` nuevo para separar artefactos: `dev -> .next-dev`, `build -> .next`
  - `tsconfig.json` actualizado por Next para incluir `.next-dev/types/**/*.ts`
  - `.next-dev` agregado a `.gitignore`
- Procedimiento limpio y repetible fijado:
  - correr desde `/mnt/c/Demonio_IA/06_Web/launchlab__PROD/.worktrees/feat-pbia-portfolio-next`
  - mantener dependencias locales del worktree
  - limpiar `.next` y `.next-dev` si se quiere partir de cero
  - no correr builds concurrentes en el mismo worktree
- Verificación cerrada:
  - `npm run lint` OK
  - primer `npm run build` limpio OK
  - segundo `npm run build` consecutivo OK
  - `npm run dev` OK
- Ramas y worktrees siguen consolidados: PBIA vive en `feat/pbia-portfolio-next` y no debe volver a mezclarse con `feat/pagina-hermana-live`.
- Estado final antes de deploy: la home queda visualmente aceptable para esta fase y el build de `/` queda estable en este worktree.

## 2026-03-24 — PBIA home: posicionamiento más claro + deploy exitoso

### Estado real de Powered by IA

- La home de PBIA se reordenó como landing comercial simple:
  - Hero
  - Qué hacemos
  - Sistemas principales
  - Demos/casos
  - Cómo trabajamos
  - Quién está detrás
  - CTA final / contacto
- El posicionamiento ya no empuja `webs`, `cursos` o `servicios sueltos` como eje.
- El mensaje actual prioriza:
  - captación
  - seguimiento
  - conversión
  - sistemas comerciales
  - activos digitales útiles

### Qué se saneó

- Se retiró el flujo principal con intro/video obligatorio.
- Se eliminó ruido de presentación personal a medio hacer.
- Se corrigió el placeholder en `ProfileModal`.
- Se dejó la CTA principal en `Hablar por WhatsApp`.
- Se dejó la CTA secundaria en `Ver demos`.
- Se redujo el tono commodity de la oferta.

### Estado del deploy

- `npm run lint` OK
- `npm run build` OK
- `vercel --prod` OK
- Deployment creado:
  - `https://launchlab-n4abojrej-gerrys-projects-7c589fcf.vercel.app`
- Alias reportado por Vercel CLI:
  - `https://launchlab-five.vercel.app`

### Pendiente menor real

- Falta conectar el número real de WhatsApp de PBIA.
- La home usa por ahora un enlace genérico de WhatsApp con mensaje precargado para no inventar un dato falso.

### Aislamiento de experiencias

- RYS Mini Market no fue tocada en esta pasada.
- Esta memoria corresponde solo al worktree y rama de PBIA:
  - `feat/pbia-portfolio-next`
