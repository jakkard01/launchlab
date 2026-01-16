// src/app/prompts/promptsData.ts

export type MainCategory =
  | 'musica'
  | 'video-ia'
  | 'productividad'
  | 'cursos'
  | 'imagen'
  | 'dev'
  | 'mentalidad'
  | 'vida'
  | 'inversion';

export type SubCategory =
  // Música
  | 'playlists'
  | 'foco'
  // Video IA
  | 'guion-shorts'
  | 'youtube-largo'
  | 'heygen-avatar'
  | 'seo-youtube'
  // Productividad
  | 'planificacion'
  | 'emails'
  | 'revision'
  | 'oratoria'
  // Cursos
  | 'english'
  | 'resumen'
  // Imagen
  | 'midjourney'
  | 'thumbnails'
  | 'branding'
  // Dev
  | 'codigo-pro'
  | 'debug'
  | 'herramientas-basicas'
  // Mentalidad
  | 'stoic'
  | 'decision'
  // Vida
  | 'chollos'
  | 'viajes'
  | 'cocina'
  // Inversión
  | 'setup-upgrade'
  | 'ads-trafico'
  | 'meta-prompts';

export interface PromptItem {
  id: string;
  titulo: string;
  descripcion: string;
  mainCategory: MainCategory;
  subCategory: SubCategory;
  content: string;
  // flags opcionales (no rompen nada si no se usan)
  isTop10?: boolean;
  isExclusive?: boolean;
}

export const MAIN_LABELS: Record<MainCategory, string> = {
  musica: '🎵 Música / Foco',
  'video-ia': '🎬 Contenido / Vídeo',
  productividad: '⚡ Productividad',
  cursos: '📚 Formación / Cursos',
  imagen: '🎨 Imagen / Diseño',
  dev: '👨‍💻 Código / Dev',
  mentalidad: '🧠 Mentalidad / Stoic',
  vida: '🛒 Vida & Chollos',
  inversion: '💸 Inversión / ROI',
};

export const SUB_LABELS: Record<SubCategory, string> = {
  playlists: 'Playlists Brave',
  foco: 'Foco',

  'guion-shorts': 'Guion Shorts',
  'youtube-largo': 'YouTube Largo',
  'heygen-avatar': 'Avatar HeyGen',
  'seo-youtube': 'SEO YouTube',

  planificacion: 'Organización',
  emails: 'Emails',
  revision: 'Revisión / Obsidian',
  oratoria: 'Oratoria / Discurso',

  english: 'Inglés',
  resumen: 'Resumen',

  midjourney: 'Midjourney v6',
  thumbnails: 'Thumbnails',
  branding: 'Branding',

  'codigo-pro': 'Experto Dev',
  debug: 'Debugging',
  'herramientas-basicas': 'Tools Básicas',

  stoic: 'Estoicismo',
  decision: 'Toma Decisiones',

  chollos: 'Caza-Ofertas',
  viajes: 'Viajes Smart',
  cocina: 'Cocina / Proteína',

  'setup-upgrade': 'Hardware/Software',
  'ads-trafico': 'Publicidad',
  'meta-prompts': 'Wizards / Generadores',
};

export const CATEGORY_RELATIONS: Record<MainCategory, SubCategory[]> = {
  musica: ['playlists', 'meta-prompts'],

  'video-ia': ['guion-shorts', 'youtube-largo', 'heygen-avatar', 'seo-youtube', 'meta-prompts'],

  productividad: ['planificacion', 'oratoria', 'emails', 'revision', 'meta-prompts'],

  cursos: ['english', 'resumen', 'meta-prompts'],

  imagen: ['midjourney', 'thumbnails', 'branding', 'meta-prompts'],

  dev: ['codigo-pro', 'debug', 'herramientas-basicas', 'meta-prompts'],

  mentalidad: ['stoic', 'decision', 'meta-prompts'],

  vida: ['chollos', 'cocina', 'viajes', 'meta-prompts'],

  inversion: ['setup-upgrade', 'ads-trafico', 'decision'],
};

export const promptsData: PromptItem[] = [
  // ===========================================================================
  // 🏆 TOP 10 — EXCLUSIVOS CHIEF (sin info confidencial)
  // ===========================================================================
  {
    id: 'top-1-plan-dia',
    titulo: '🏆 TOP10 — Plan del Día (Turno + Kratos + Proteína)',
    descripcion: 'Agenda realista por bloques. Turnos, energía, proteína 110g, paseo Kratos, 1 tarea Pareto.',
    mainCategory: 'productividad',
    subCategory: 'planificacion',
    isTop10: true,
    isExclusive: true,
    content: `Actúa como mi Jefe de Operaciones (modo Brujo Chief). Organiza mi día SIN drama.

INPUT
- Tipo de día: [LIBRE / TURNO APERTURA / TURNO LARGO / TURNO CIERRE]
- Hora actual: [HH:MM]
- Turno (si aplica): [INICIO–FIN]
- Energía: [1–10]
- Objetivo Pareto #1: [1 frase]
- Comidas hechas hoy: [lista rápida]
- Proteína estimada hoy: [g] (objetivo mínimo 110g)
- Kratos: [paseo corto/largo pendiente]
- Entreno: [sí/no + tipo]

NO NEGOCIABLES
1) Paseo Kratos mínimo 25 min (ideal 45).
2) Proteína 110g (si voy corto: “Yogur high-protein 28g” como comodín).
3) 1 bloque Pareto 25–45 min antes del cansancio.
4) 10 min orden rápido (casa/ropa) en el primer bloque útil.
5) Si detectas rumiación: activa “CORTA + RESET60” (respiración 4-4-4-4 + siguiente micro-tarea).

REGLAS
- Máximo 2 preguntas si falta algo. Si no respondo, asume y ejecuta.
- Nada de agenda imposible. Bloques realistas.

SALIDA (OBLIGATORIA)
A) Tarea Pareto del día (1 frase).
B) Agenda por bloques: MAÑANA / PRE-TURNO / TURNO / POST / CIERRE.
C) Plan comida simple (2 opciones) + cuándo.
D) Checklist de 5 ítems (máximo).`,
  },

  {
    id: 'top-2-anti-quejas',
    titulo: '🏆 TOP10 — Modo Guerra (Anti-Quejas) + RESET60',
    descripcion: 'Corta rumiación y vuelve al control en 60s. Directo, útil, sin terapia.',
    mainCategory: 'mentalidad',
    subCategory: 'stoic',
    isTop10: true,
    isExclusive: true,
    content: `Actúa como Coach Estoico (modo “cero quejas, cero drama”). Tono: directo, humor seco inteligente.

INPUT
- Qué pasó: [2–4 líneas]
- Estado: [cansado/cabreado/ansioso/rumiando/con ganas de alcohol/disperso]
- Energía: [1–10]
- Próxima obligación: [turno/gym/proyecto/dormir]

REGLAS
- 10–14 líneas máximo.
- No te enrolles. No terapia.
- Si detectas rumiación: activa CORTA + RESET60.

SALIDA (en este orden)
1) Realidad (1 frase dura y verdadera).
2) Hechos vs Historia (2 bullets).
3) Controlable vs No controlable (2 bullets).
4) CORTA + RESET60:
   - respiración 4-4-4-4 (1 línea)
   - micro-tarea ejecutable en 3 minutos (1 línea)
5) Plan 10 minutos (checklist 4 ítems).
6) Cierre: “soy una flecha” + 1 acción ahora.`,
  },

  {
    id: 'top-3-compra-necesidad-impulso',
    titulo: '🏆 TOP10 — Compra: Necesidad vs Impulso (Veredicto Brutal)',
    descripcion: 'Filtro anti-capricho: necesidad, ROI, alternativa, y “esperar 24h” si aplica.',
    mainCategory: 'vida',
    subCategory: 'chollos',
    isTop10: true,
    isExclusive: true,
    content: `Actúa como mi Analista Anti-Capricho.

INPUT
- Producto: [modelo]
- Precio: [€]
- Tienda: [Amazon/ECI/otra]
- Motivo real de compra: [1 frase]
- Urgencia: [hoy/esta semana/puedo esperar]
- ¿Qué problema resuelve?: [1 frase]
- ¿Qué pasa si NO lo compro?: [1 frase]
- Alternativas que ya tengo: [lista]

REGLAS
- No me justifiques caprichos.
- Si parece impulso: aplica “Regla 24h + comparación 2 alternativas”.
- Prioriza Amazon envío gratis (Prime). Evitar Carrefour salvo chollo excepcional y compra firme.

SALIDA (OBLIGATORIA)
1) Clasificación: NECESIDAD / MEJORA / CAPRICHO.
2) Veredicto: COMPRAR / ESPERAR 24H / DESCARTAR.
3) Razón principal (1 línea).
4) 2 alternativas (mismo presupuesto) + por qué.
5) Si es “comprar”: qué comprobar antes (checklist 5 items).`,
  },

  {
    id: 'top-4-cocina-proteina',
    titulo: '🏆 TOP10 — Cocina Proteica (110g) Sin Cocina Infinita',
    descripcion: 'Plan simple, compra mínima, batch cooking ligero y opciones post-turno.',
    mainCategory: 'vida',
    subCategory: 'cocina',
    isTop10: true,
    isExclusive: true,
    content: `Actúa como mi Chef Operativo (alto en proteína, cero complicaciones).

INPUT
- Tipo de día: [LIBRE / TURNO]
- Hora actual: [HH:MM]
- Proteína estimada ya consumida: [g]
- Comida disponible en casa: [lista]
- Tiempo para cocinar: [5/10/20/40 min]
- Equipo: [plancha / horno / airfryer / micro]

REGLAS
- Objetivo: llegar a 110g proteína hoy.
- 2 opciones “rápidas” + 1 opción “batch” (para 2 días).
- Si voy corto: usa comodín “yogur high-protein 28g”.

SALIDA (OBLIGATORIA)
1) Proteína que falta para 110g (cálculo).
2) Plan de 2 comidas (qué, cómo, cuánto).
3) Lista de compra mínima (si falta algo) con sustitutos.
4) Versión post-turno (cena ligera, fácil).`,
  },

  {
    id: 'top-5-dev-minimo',
    titulo: '🏆 TOP10 — Senior Next.js (Cambio Mínimo, Cero Bugs)',
    descripcion: 'Patch por archivo + test rápido. No inventa rutas ni refactors.',
    mainCategory: 'dev',
    subCategory: 'codigo-pro',
    isTop10: true,
    isExclusive: true,
    content: `Actúa como Senior Fullstack Dev (Next.js App Router + TS + Tailwind). Prioridad: cambio mínimo y no romper nada.

INPUT
1) Objetivo exacto (1–2 frases)
2) Error exacto (stack/console)
3) Archivos completos relevantes + rutas
4) Qué NO quieres (refactors, librerías, etc.)

REGLAS
- Si faltan datos, pide máx 3 cosas.
- No inventes nada. Si es incierto, dilo.

SALIDA
1) Diagnóstico (3 bullets).
2) Patch por archivo:
   - FILE:
   - BEFORE:
   - AFTER:
3) Checklist de pruebas (5 pasos).
4) Commit sugerido.`,
  },

  {
    id: 'top-6-playlist-brave',
    titulo: '🏆 TOP10 — DJ Pareto (Playlist Brave Anti-Repetición)',
    descripcion: '6–8 temas + 1 link watch_videos + lista numerada.',
    mainCategory: 'musica',
    subCategory: 'playlists',
    isTop10: true,
    isExclusive: true,
    content: `Actúa como DJ Pareto. Quiero playlist (6–8 temas) para [MOOD: gym / code / limpieza / relax / turno].

REGLAS
- CERO repetición de canciones.
- Mezcla inteligente.
- Si no puedes verificar IDs/región, dilo y dame cómo comprobar.

SALIDA (PROMPT PLAYLIST BRAVE)
1) Un ÚNICO link:
   https://www.youtube.com/watch_videos?video_ids=ID1,ID2,ID3,ID4,ID5,ID6(,ID7,ID8)
2) Lista numerada:
   1. Título — Artista
   ...
3) Nota de energía (1 línea).`,
  },

  {
    id: 'top-7-branding-kit',
    titulo: '🏆 TOP10 — Branding Cyberpunk (Kit Consistente)',
    descripcion: 'Prompts + negative + variaciones. Que no parezca genérico.',
    mainCategory: 'imagen',
    subCategory: 'branding',
    isTop10: true,
    isExclusive: true,
    content: `Actúa como Director de Arte de Powered by IA. Quiero un KIT consistente (no imagen suelta).

INPUT
- Uso: [web hero / thumbnail / banner / post]
- Tema: [agente IA / productividad / bots / etc.]
- Formato: [16:9 / 9:16 / 1:1]
- Texto (si aplica): [texto exacto]

SALIDA
1) Mini style guide (5 bullets).
2) Prompt Midjourney v6 (con --ar sugerido).
3) Prompt alternativo (sin sintaxis MJ).
4) Negative prompts (qué evitar).
5) 3 variaciones: minimal / glitch / corporate premium.`,
  },

  {
    id: 'top-8-oratoria-maestro',
    titulo: '🏆 TOP10 — Oratoria (Político / Pastor / Chef) Sin Humo',
    descripcion: 'Discurso potente adaptado al público, sin manipulación barata.',
    mainCategory: 'productividad',
    subCategory: 'oratoria',
    isTop10: true,
    isExclusive: true,
    content: `Actúa como Speechwriter y entrenador de oratoria.

INPUT
- Rol: [POLÍTICO / PASTOR / CHEF / OTRO]
- Público: [quiénes y dónde]
- Objetivo: [convencer / inspirar / vender / calmar / anunciar]
- Tema: [1 frase]
- Duración: [45s / 2 min / 5 min]
- Estilo: [serio / emocional / técnico / humor inteligente]

REGLAS
- Nada de demagogia barata.
- 1 idea central. 3 puntos. 1 cierre fuerte.
- Lenguaje claro.

SALIDA (OBLIGATORIA)
1) Estructura (hook → 3 puntos → cierre).
2) Discurso completo.
3) Pausas y énfasis (marcados).
4) 5 “frases-bala” (cortas) para rematar.
5) Entrenamiento: 5 tips de voz/ritmo/presencia.`,
  },

  {
    id: 'top-9-heygen-guion',
    titulo: '🏆 TOP10 — Guion HeyGen (30s) + Subtítulos CapCut',
    descripcion: 'Guion + subtítulos cortos + b-roll + CTA.',
    mainCategory: 'video-ia',
    subCategory: 'heygen-avatar',
    isTop10: true,
    isExclusive: true,
    content: `Crea un guion para avatar HeyGen (30s) en español de España.

INPUT
- Tema: [qué vendo/explico]
- Público: [quién]
- CTA: [comentar / DM / web]

REGLAS
- Hook 0–2s.
- Cortes cada 2–3s (pattern interrupt).
- Subtítulos 2–6 palabras.

SALIDA
1) Guion (con <break time="0.3s"/>).
2) Subtítulos CapCut (líneas cortas).
3) B-roll (8 clips).
4) Overlays (6 textos) con timing.
5) CTA final (1 línea).`,
  },

  {
    id: 'top-10-obsidian-log',
    titulo: '🏆 TOP10 — Nota Obsidian PJECTOX (Acción, no novela)',
    descripcion: 'Convierte cualquier caos en nota clara: decisiones, tareas, siguiente paso.',
    mainCategory: 'productividad',
    subCategory: 'revision',
    isTop10: true,
    isExclusive: true,
    content: `Convierte esto en nota Obsidian lista para ejecutar.

INPUT: [PEGA TEXTO / IDEAS / CAPTURA]

FORMATO OBLIGATORIO
# Título
## Resumen (5 líneas)
## Decisiones (bullets)
## Tareas (máx 7) (cada una con “siguiente acción”)
## Riesgos / Bloqueos
## Siguiente paso (1 sola cosa)
## Checklist 5 min (para arrancar YA)

REGLA: si falta algo, NO inventes. Pregunta máximo 2 cosas y si no respondo, asume y sigue.`,
  },

  // ===========================================================================
  // 🔥 MÁS PROMPTS (para nichos / catálogo)
  // ===========================================================================

  // ORATORIA — Variantes
  {
    id: 'ora-1-debate-politico',
    titulo: 'Oratoria: Debate Político (sin embarrarte)',
    descripcion: 'Respuesta a ataque + puente a tu mensaje + cierre corto.',
    mainCategory: 'productividad',
    subCategory: 'oratoria',
    content: `Eres coach de debate. Dame una respuesta para este ataque:
[ATAQUE]

Contexto:
- Mi postura: [1 frase]
- Mi objetivo: [ganar confianza / desmontar / calmar]
- Tono: [serio / firme / humor inteligente]

Salida:
1) Respuesta 20s
2) Respuesta 45s
3) “Puente” a mi tema (1 línea)
4) Qué NO decir (3 bullets)`,
  },

  {
    id: 'ora-2-sermon-pastor',
    titulo: 'Oratoria: Sermón Pastor (estructura clara)',
    descripcion: 'Historia breve + enseñanza + acción práctica.',
    mainCategory: 'productividad',
    subCategory: 'oratoria',
    content: `Eres redactor de sermones. Tema: [TEMA]. Público: [PÚBLICO]. Duración: [min].

Salida:
- Apertura con historia corta (30–60s)
- 3 puntos con ejemplo cada uno
- Cierre: 1 acción práctica para esta semana
- Frases memorables (5)`,
  },

  {
    id: 'ora-3-presentacion-chef',
    titulo: 'Oratoria: Chef presenta menú (vende sin parecer vendedor)',
    descripcion: 'Presentación de plato + historia + sugerencia de maridaje.',
    mainCategory: 'productividad',
    subCategory: 'oratoria',
    content: `Eres chef y comunicador. Plato: [PLATO]. Público: [tipo]. Lugar: [restaurante].

Salida:
1) Pitch 20s (mesa)
2) Pitch 45s (evento)
3) 3 frases “premium” sin cursilería
4) 1 recomendación de bebida y por qué`,
  },

  // VIDA / COCINA — extra
  {
    id: 'coc-1-batch-2-dias',
    titulo: 'Cocina: Batch 2 días (alto en proteína)',
    descripcion: 'Cocina 1 vez, comes 4 veces.',
    mainCategory: 'vida',
    subCategory: 'cocina',
    content: `Diseña batch cooking para 2 días.
Tiempo total: [30/45/60 min]. Equipo: [plancha/horno/airfryer/micro].
Objetivo: proteína alta, simple, barato.

Salida:
- 2 recetas base + 2 variaciones
- Lista de compra
- Cómo guardar/recalentar
- Proteína estimada por ración`,
  },

  // VIDA / CHOLLOS — extra
  {
    id: 'cho-1-rebajas-real',
    titulo: 'Compras: ¿Rebaja real o humo?',
    descripcion: 'Checklist para detectar descuentos falsos.',
    mainCategory: 'vida',
    subCategory: 'chollos',
    content: `Analiza esta “oferta”:
- Producto: [modelo]
- Precio ahora: [€]
- Precio antes (si dicen): [€]
- Tienda: [X]
- Link (si tienes): [pega]

Salida:
1) Señales de descuento falso (bullets)
2) Cómo verificar rápido (pasos)
3) Precio objetivo para que sí sea chollo
4) Veredicto: comprar / esperar / buscar alternativa`,
  },

  // DEV / BOT — (solo base, sin irnos de rama todavía)
  {
    id: 'dev-bot-whatsapp-brief',
    titulo: 'WhatsApp Bot: Brief perfecto (para avanzar luego)',
    descripcion: 'Define el bot antes de programar: objetivo, flujos, límites.',
    mainCategory: 'dev',
    subCategory: 'meta-prompts',
    content: `Vamos a definir un bot de WhatsApp sin programar todavía.

Pregúntame solo lo mínimo (máx 7 preguntas) y luego entrega:
- Objetivo del bot
- Flujos (3–5) con ejemplo de conversación
- Qué datos guarda y qué no (privacidad)
- Respuestas “no sé / no puedo” (límites)
- Métrica de éxito (qué medimos)`,
  },
];
