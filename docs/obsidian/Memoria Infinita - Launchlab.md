# Memoria Infinita - Launchlab

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
