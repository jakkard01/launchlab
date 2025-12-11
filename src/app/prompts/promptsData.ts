// src/app/prompts/promptsData.ts

// 1. TIPOS DEFINIDOS (Typesafety para no fallar)
export type MainCategory = 
  | 'musica' 
  | 'video-ia' 
  | 'productividad' 
  | 'cursos' 
  | 'imagen' 
  | 'dev' 
  | 'mentalidad' 
  | 'vida';

export type SubCategory = 
  // Música
  | 'playlists' 
  // Vídeo
  | 'guion-shorts' 
  | 'youtube-largo' 
  | 'heygen-avatar' 
  | 'seo-youtube'
  // Productividad
  | 'planificacion' 
  | 'revision' 
  // Cursos
  | 'arquitectura-curso' 
  | 'estudio'
  // Imagen
  | 'midjourney' 
  | 'assets-web'
  // Dev
  | 'codigo-pro' 
  | 'debug'
  // Mentalidad
  | 'stoic' 
  | 'decision'
  // Vida
  | 'chollos' 
  | 'viajes'
  // Meta
  | 'meta-prompts';

export interface PromptItem {
  id: string;
  titulo: string;
  descripcion: string;
  mainCategory: MainCategory;
  subCategory: SubCategory;
  content: string;
}

// 2. ETIQUETAS VISUALES (Lo que ve el usuario en el botón)
export const MAIN_LABELS: Record<MainCategory, string> = {
  musica: '🎵 Música / Foco',
  'video-ia': '🎬 Contenido / Vídeo',
  productividad: '⚡ Productividad',
  cursos: '📚 Formación / Cursos',
  imagen: '🎨 Imagen / Diseño',
  dev: '👨‍💻 Código / Dev',
  mentalidad: '🧠 Mentalidad / Stoic',
  vida: '🛒 Vida & Chollos',
};

export const SUB_LABELS: Record<SubCategory, string> = {
  playlists: 'Playlists Brave',
  'guion-shorts': 'Shorts / Reels',
  'youtube-largo': 'YouTube Largo',
  'heygen-avatar': 'Avatar HeyGen',
  'seo-youtube': 'SEO Studio',
  planificacion: 'Organización Diaria',
  revision: 'Revisión Pareto',
  'arquitectura-curso': 'Diseño Instruccional',
  estudio: 'Técnicas de Estudio',
  midjourney: 'Midjourney V6',
  'assets-web': 'Assets Web',
  'codigo-pro': 'Experto Dev',
  debug: 'Debugging',
  stoic: 'Estoicismo',
  decision: 'Toma de Decisiones',
  chollos: 'Compras Inteligentes',
  viajes: 'Viajes Low-Cost',
  'meta-prompts': 'Wizards / Generadores',
};

// 3. RELACIONES (El mapa del submenú)
export const CATEGORY_RELATIONS: Record<MainCategory, SubCategory[]> = {
  musica: ['playlists', 'meta-prompts'],
  'video-ia': ['guion-shorts', 'youtube-largo', 'heygen-avatar', 'seo-youtube', 'meta-prompts'],
  productividad: ['planificacion', 'revision', 'meta-prompts'],
  cursos: ['arquitectura-curso', 'estudio'],
  imagen: ['midjourney', 'assets-web', 'meta-prompts'],
  dev: ['codigo-pro', 'debug'],
  mentalidad: ['stoic', 'decision'],
  vida: ['chollos', 'viajes', 'meta-prompts'],
};

// 4. EL CATÁLOGO DE PROMPTS
export const promptsData: PromptItem[] = [
  
  // --- MÚSICA / FOCO ---
  {
    id: 'dj-pareto-wizard',
    titulo: '🧙‍♂️ DJ Pareto (Wizard)',
    descripcion: 'Meta-prompt que te entrevista para crear la playlist perfecta según tu energía actual.',
    mainCategory: 'musica',
    subCategory: 'meta-prompts',
    content: `Actúa como un DJ experto en productividad y psicología musical. NO generes la lista todavía. 
Hazme estas 3 preguntas primero para calibrar: 
1. ¿Cuál es tu nivel de energía actual (1-10)? 
2. ¿Qué tarea vas a realizar (Gym, Code, Limpieza, Paseo)? 
3. ¿Qué géneros prefieres hoy (Rap, Metal, Reggae, Lo-Fi)? 

Una vez responda, genera una lista de 10 canciones (Título - Artista) y un enlace ÚNICO de YouTube (formato watch_videos?video_ids=...) que funcione en Brave.`,
  },
  {
    id: 'gym-metal-core',
    titulo: 'Gym Metal Core',
    descripcion: 'Playlist agresiva para romper fibras. Metalcore y Nu Metal.',
    mainCategory: 'musica',
    subCategory: 'playlists',
    content: `Genera una playlist de YouTube (enlace watch_videos único) con 12 canciones de alta energía para entrenamiento de fuerza. Géneros: Nu Metal, Metalcore, Hard Rock (ej: Slipknot, Korn, Metallica, ParkWay Drive). Evita intros largas. Dame la lista y el link.`,
  },

  // --- CONTENIDO / VÍDEO ---
  {
    id: 'guionista-viral',
    titulo: 'Guionista Viral (Shorts)',
    descripcion: 'Estructura de 60s con Hook, Retención y CTA para TikTok/Reels.',
    mainCategory: 'video-ia',
    subCategory: 'guion-shorts',
    content: `Actúa como experto en retención de audiencia para TikTok y Reels. Escribe un guion de 45-60 segundos sobre [TEMA]. 
Estructura obligatoria: 
1. HOOK VISUAL/AUDIO (0-3s): Frase que rompa el scroll. 
2. PROBLEMA (3-15s): Identificación con el dolor del usuario. 
3. SOLUCIÓN (15-45s): El consejo/truco/dato clave (sin relleno). 
4. CTA (45-60s): Llamada a la acción clara. 
Incluye sugerencias visuales (B-Roll, Texto en pantalla) para cada sección.`,
  },
  {
    id: 'script-heygen-pro',
    titulo: 'Script para HeyGen (Con Pausas)',
    descripcion: 'Texto optimizado con etiquetas de pausa para que el avatar suene natural.',
    mainCategory: 'video-ia',
    subCategory: 'heygen-avatar',
    content: `Escribe un guion para un avatar de IA (HeyGen) sobre [TEMA]. 
Usa un tono [TONO: Profesional / Cercano / Energético]. 
IMPORTANTE: Incluye etiquetas de pausa <break time="0.5s" /> donde sea necesario para que suene natural. El texto debe durar máximo 60 segundos leído a velocidad normal.`,
  },
  {
    id: 'wizard-productor-video',
    titulo: '🧙‍♂️ Wizard Productor de Vídeo',
    descripcion: 'Te ayuda a definir el formato y guion antes de empezar a escribir.',
    mainCategory: 'video-ia',
    subCategory: 'meta-prompts',
    content: `Actúa como mi Productor Ejecutivo. Quiero crear contenido pero no tengo clara la forma. Hazme estas preguntas: 
1. ¿Cuál es el objetivo principal (Venta, Seguidores, Autoridad)? 
2. ¿Cuánto tiempo tienes para producirlo? 
3. ¿Qué recursos tienes (Avatar, B-Roll, tú en cámara)? 
Con mis respuestas, sugiéreme el mejor formato y escribe el esquema del guion.`,
  },

  // --- PRODUCTIVIDAD ---
  {
    id: 'plan-turno-camarero',
    titulo: 'Plan Turno Camarero',
    descripcion: 'Organiza el día alrededor de un turno cambiante, protegiendo tu energía.',
    mainCategory: 'productividad',
    subCategory: 'planificacion',
    content: `Actúa como mi asistente de agenda. Hoy tengo turno de camarero de [HORA INICIO] a [HORA FIN]. Mi energía es [ALTA/MEDIA/BAJA]. Tengo que encajar estas tareas: [LISTA TAREAS]. 
Organiza mi día en bloques realistas, priorizando descanso antes del turno y una tarea clave de mis proyectos. Dime qué NO hacer hoy.`,
  },
  {
    id: 'modo-guerra',
    titulo: 'Modo Guerra (Ejecución Total)',
    descripcion: 'Plan de ataque estricto para días donde hay que sacar trabajo sí o sí.',
    mainCategory: 'productividad',
    subCategory: 'planificacion',
    content: `Hoy estoy en "Modo Guerra". Necesito sacar adelante [OBJETIVO PRINCIPAL]. Tengo [X] horas. Crea un horario estricto bloque a bloque (técnica Pomodoro o Bloques de 90min) eliminando toda distracción. Incluye pausas estratégicas para no quemarme. Tono: Militar/Disciplinado.`,
  },

  // --- FORMACIÓN / CURSOS ---
  {
    id: 'arquitecto-cursos',
    titulo: 'Arquitecto de Cursos (3 Niveles)',
    descripcion: 'Diseña la estructura completa de un curso: Básico, Intermedio y Avanzado.',
    mainCategory: 'cursos',
    subCategory: 'arquitectura-curso',
    content: `Actúa como diseñador instruccional. Quiero crear un curso sobre [TEMA]. Diseña el temario dividido en 3 niveles (Básico, Intermedio, Avanzado). Para cada nivel, define: Objetivo del nivel, 3-5 lecciones con título y una práctica final. Enfócate en resultados tangibles para el alumno.`,
  },
  {
    id: 'youtube-a-estudio',
    titulo: 'YouTube a Material de Estudio',
    descripcion: 'Convierte la transcripción de un vídeo en apuntes y tests.',
    mainCategory: 'cursos',
    subCategory: 'estudio',
    content: `Toma la transcripción o el resumen de este vídeo de YouTube sobre [TEMA]: [TEXTO/LINK]. 
Genera: 
1. Un resumen ejecutivo de 5 puntos. 
2. Un glosario de términos clave. 
3. Un test de 5 preguntas tipo opción múltiple para evaluar mi comprensión.`,
  },

  // --- IMAGEN / DISEÑO ---
  {
    id: 'portadas-branding',
    titulo: 'Portadas YouTube Branding',
    descripcion: 'Prompts para DALL-E 3 / Midjourney coherentes con tu marca Powered by IA.',
    mainCategory: 'imagen',
    subCategory: 'midjourney',
    content: `Genera un prompt para crear una miniatura de YouTube. Estilo: "Powered by IA", futurista, tech, colores neón (cyan, magenta) sobre fondo oscuro. Elementos: [ELEMENTOS DEL VÍDEO]. Debe dejar espacio para texto a la derecha. Formato 16:9.`,
  },
  {
    id: 'wizard-diseno',
    titulo: '🧙‍♂️ Wizard de Diseño',
    descripcion: 'Define el estilo visual antes de gastar créditos en Midjourney.',
    mainCategory: 'imagen',
    subCategory: 'meta-prompts',
    content: `Actúa como Director de Arte. Quiero generar una imagen pero no tengo claro el estilo. Pregúntame: 
1. ¿Qué quieres representar? 
2. ¿Qué emoción debe transmitir? 
3. ¿Estilo (foto realista, 3D, dibujo)? 
4. ¿Colores predominantes? 
Con mis respuestas, redacta el prompt perfecto para DALL-E 3 / Midjourney.`,
  },

  // --- CÓDIGO / DEV ---
  {
    id: 'pair-programmer',
    titulo: 'Pair Programmer (Explicador)',
    descripcion: 'Te explica código complejo línea a línea con paciencia.',
    mainCategory: 'dev',
    subCategory: 'codigo-pro',
    content: `Actúa como un Senior Developer mentor. Tengo este trozo de código: [CÓDIGO]. Explícame qué hace paso a paso, en lenguaje sencillo. Si hay errores o malas prácticas, señálalos y propón la versión corregida.`,
  },
  {
    id: 'traductor-errores',
    titulo: 'Traductor de Errores',
    descripcion: 'Pega el log de error y obtén la solución en humano.',
    mainCategory: 'dev',
    subCategory: 'debug',
    content: `Tengo este error en la consola: [PEGAR ERROR]. Explícame qué significa en español simple (sin jerga innecesaria) y dame 3 posibles soluciones ordenadas de la más probable a la menos probable.`,
  },

  // --- MENTALIDAD / STOIC ---
  {
    id: 'debrief-dia-duro',
    titulo: 'Debrief Día Duro',
    descripcion: 'Procesar un mal día de trabajo o trading con filosofía estoica.',
    mainCategory: 'mentalidad',
    subCategory: 'stoic',
    content: `He tenido un día duro en [TRABAJO/TRADING]. Pasó esto: [SITUACIÓN]. Actúa como un filósofo estoico. Ayúdame a separar lo que podía controlar de lo que no. Dame una perspectiva para cerrar el día en paz y aprender la lección.`,
  },

  // --- VIDA & CHOLLOS ---
  {
    id: 'cazador-chollos',
    titulo: 'Cazador de Chollos Real',
    descripcion: 'Analiza si una oferta es real o marketing.',
    mainCategory: 'vida',
    subCategory: 'chollos',
    content: `Quiero comprar [PRODUCTO]. Actúa como un experto en compras y chollos. Dime: 
1. Cuál es el precio histórico bajo real. 
2. Qué características son imprescindibles y cuáles son marketing. 
3. Tres opciones recomendadas (Baja, Media, Alta gama) con mejor calidad-precio hoy.`,
  },
  {
    id: 'optimizador-viaje',
    titulo: 'Optimizador de Viaje',
    descripcion: 'Planifica viajes a El Salvador o escapadas con presupuesto realista.',
    mainCategory: 'vida',
    subCategory: 'viajes',
    content: `Voy a viajar a [DESTINO] en [FECHAS]. Presupuesto: [CANTIDAD]. Diseña un itinerario que optimice vuelos y alojamiento. Dame trucos específicos para ahorrar en ese destino (transporte local, comida, SIM card, etc.).`,
  },
  {
    id: 'wizard-financiero',
    titulo: '🧙‍♂️ Wizard Financiero',
    descripcion: 'Ajuste de gastos inteligente sin vivir como un monje.',
    mainCategory: 'vida',
    subCategory: 'meta-prompts',
    content: `Actúa como asesor financiero personal. Quiero ahorrar más sin sufrir. Pregúntame: 
1. Mis gastos fijos. 
2. Mis gastos hormiga. 
3. Qué caprichos son "sagrados" para mí. 
Con eso, proponme un plan de recorte de gastos que respete mi felicidad pero aumente mi ahorro.`,
  },
];