# 06_ESTADO_ACTUAL__PBIA_RYS

## Fuente canonica actual

Esta nota es la referencia principal de estado vivo para entender la convivencia actual entre Powered by IA y RYS Mini Market.

- `Memoria Infinita - Launchlab.md` queda como memoria amplia e historica.
- `03_DECISION_LOG.md` queda como registro de decisiones.
- `docs/LOGS/*` y `docs/ops/*` quedan como trazabilidad por iteracion y operativa puntual.

## RYS Mini Market

### Identidad y accesos

- Naming visible oficial: `RYS Mini Market`
- Identificador tecnico preferido: `rysminimarket`
- Dominio comercial principal: `rysminimarket.com`
- Dominio comercial alterno: `www.rysminimarket.com`
- Ruta tecnica heredada por compatibilidad: `/RYSminisuper`
- Acceso heredado dentro de PBIA: `https://www.poweredbyia.com/RYSminisuper`

### Estado real de experiencia

- La tienda vive dentro del repo principal, apoyada en la capa compartida `mo`.
- El dominio `rysminimarket.com` entra a la experiencia de tienda via routing por host, sin exponer `/RYSminisuper` al cliente.
- `poweredbyia.com/RYSminisuper` sigue existiendo y no debe romperse.
- La experiencia tiene favicon propio de carrito.
- La imagen local vigente se centraliza en `src/lib/mo/config.ts` con `MO_STORE_IMAGE_SRC = /rys/local/rys-mini-market-fachada.png`.
- El flujo principal sigue siendo `pedido por WhatsApp + retiro`.

### Mejoras ya resueltas

- Buscador visible y orientado a movil.
- CTA principal de WhatsApp reforzado.
- Header sticky mas inteligente en scroll y en modo busqueda.
- Categorias utiles y ocultacion de categorias vacias.
- Bloque `Como pedir`.
- Bloque de confianza local.
- Foto/local trust reubicados y mas coherentes con la tienda real.
- Tarjetas de producto mas compactas y consistentes.
- Barra sticky inferior del carrito mas compacta.
- Ajustes de busqueda movil para cerrar teclado y bajar a resultados.
- Routing por host para `rysminimarket.com` y `www.rysminimarket.com`.
- Ocultacion visual de la capa PBIA en el dominio de RYS.

### Pendientes finos reales

- Direccion exacta del negocio.
- Referencia exacta para reconocer el local.
- Tiempo real comprometible de respuesta por WhatsApp.
- Afinar aislamiento de metadata social/canonical para el dominio propio de RYS si se quiere una identidad 100% separada tambien en previews y señales SEO.

## Powered by IA

### Rol actual

- Powered by IA sigue siendo el sitio principal y portfolio del proyecto en `poweredbyia.com`.
- No debe romperse por cambios orientados a la tienda.
- La home y sus rutas principales siguen siendo experiencia separada de RYS aunque convivan en el mismo repo.

### Relacion con RYS

- PBIA comparte repo, layouts globales, tooling y parte de la infraestructura.
- RYS se trata como experiencia separada de negocio dentro del mismo monorepo de aplicacion.
- Los cambios de RYS no deben introducir branding PBIA en el dominio `rysminimarket.com`.
- Los cambios de PBIA no deben tocar por accidente la experiencia de tienda ni su routing por host.

## Produccion y dominios

- `https://www.poweredbyia.com` = portfolio principal Powered by IA.
- `https://www.poweredbyia.com/RYSminisuper` = acceso heredado de RYS Mini Market.
- `https://rysminimarket.com` = entrada comercial principal de RYS Mini Market.
- `https://www.rysminimarket.com` = entrada comercial alterna de RYS Mini Market.

### Estado de deploy documentado

- El rename y las pasadas de UX/host routing se desplegaron a produccion en Vercel.
- Ultimo deployment documentado en esta memoria: `https://launchlabv1-dnv14z9yy-gerrys-projects-7c589fcf.vercel.app`
- Alias confirmado por CLI en los deploy notes historicos: `https://www.poweredbyia.com`
- El dominio de RYS se considera parte del estado vivo actual, pero si se quiere verificacion de alias exacto por CLI/web, debe hacerse como chequeo operativo puntual.

## Recomendacion de ramas y separacion de trabajo

- No mezclar PBIA y RYS en la misma rama cuando el bloque de trabajo sea claramente de una sola experiencia.
- Convencion recomendada:
  - `feat/pbia-*` para cambios del portfolio
  - `feat/rys-*` para cambios de tienda
- Si el bloque es largo o delicado, usar worktrees separados.
- Estructura sugerida:
  - worktree PBIA para portfolio
  - worktree RYS para tienda
- Objetivo: evitar contaminacion visual, de branding, de routing o de metadata entre experiencias.

### Setup operativo ya creado

- Worktree actual de RYS en uso: `/mnt/c/Demonio_IA/06_Web/launchlab__PROD`
- Rama actual de RYS/documentacion en ese worktree: `feat/pagina-hermana-live`
- Nueva rama limpia creada para PBIA: `feat/pbia-portfolio-next`
- Nuevo worktree limpio creado para PBIA: `/mnt/c/Demonio_IA/06_Web/launchlab__PROD/.worktrees/feat-pbia-portfolio-next`
- Base estable usada para abrir la rama PBIA: `main` = `origin/main` en el commit `b7ef08b`
- Motivo de esta separacion: el worktree de RYS tiene cambios sin commit y no debe contaminar el inicio del siguiente bloque de trabajo de PBIA.

## Nota de higiene documental

- Los logs del 2026-03-23 siguen siendo validos como historia de cambio, pero no sustituyen esta nota como resumen vivo.
- Si una nota historica contradice este estado actual, debe leerse como snapshot de esa fecha, no como verdad vigente.
