# Powered by IA — Web
Sitio web oficial de Powered by IA. Portfolio tech y servicios premium de IA aplicada.

## Requisitos
- Node.js 18+
- npm

## Ejecutar en local
```bash
npm install
npm run dev
```

## Comandos clave
```bash
npm run lint
npm run build
```

## Estructura principal
- `src/app/page.tsx`: Home (hero + secciones de negocio).
- `src/app/services/page.tsx`: Servicios.
- `src/app/demos/page.tsx`: Demos.
- `src/app/courses/page.tsx`: Cursos.
- `src/app/contact/page.tsx`: Contacto.
- `src/app/prompts/*`: Biblioteca de prompts (no modificar la lógica).
- `src/app/layout.tsx`: Layout y metadata global.
- `src/app/components/*`: Componentes UI reutilizados.
- `public/imagenes/*`: Assets principales (fondos, perfil).
- `public/video/video.mp4`: Video demo.

## Añadir servicios o demos
- Servicios: edita el array `serviceBlocks` en `src/app/services/page.tsx`.
- Demos: edita el array `demoCards` en `src/app/demos/page.tsx`.
- Cursos: edita el array `tracks` en `src/app/courses/page.tsx`.

## RUNBOOK (breve)
1) Crear rama para cambios:
```bash
git checkout -b feat/nombre-cambio
```
2) Volver a un commit estable:
```bash
git log --oneline
git checkout <hash>
```
3) Verificar build antes de commit:
```bash
npm run lint
npm run build
```
