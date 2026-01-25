// src/app/prompts/promptsData.ts

// 1. TIPOS (Estructura sólida)
export type MainCategory = 
  | 'musica' 
  | 'video-ia' 
  | 'productividad' 
  | 'cursos' 
  | 'imagen' 
  | 'dev' 
  | 'mentalidad' 
  | 'vida'
  | 'inversion'; // Nueva categoría para mover el dinero

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
  | 'emails' 
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
  | 'herramientas-basicas'
  // Mentalidad
  | 'stoic' 
  | 'decision'
  // Vida
  | 'chollos' 
  | 'viajes'
  | 'cocina'
  // Inversión (Dinero ahorrado)
  | 'setup-upgrade'
  | 'ads-trafico'
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

// 2. ETIQUETAS VISUALES
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
  'guion-shorts': 'Shorts / Reels',
  'youtube-largo': 'YouTube Largo',
  'heygen-avatar': 'Avatar HeyGen',
  'seo-youtube': 'SEO Studio',
  planificacion: 'Organización',
  emails: 'Emails & Textos',
  revision: 'Revisión Pareto',
  'arquitectura-curso': 'Diseño Amigable',
  estudio: 'Técnicas Estudio',
  midjourney: 'Midjourney V6',
  'assets-web': 'Assets Web',
  'codigo-pro': 'Experto Dev',
  debug: 'Debugging',
  'herramientas-basicas': 'Tools Básicas',
  stoic: 'Estoicismo',
  decision: 'Toma Decisiones',
  chollos: 'Caza-Ofertas',
  viajes: 'Viajes Smart',
  cocina: 'Nutrición',
  'setup-upgrade': 'Hardware/Software',
  'ads-trafico': 'Publicidad',
  'meta-prompts': 'Wizards / Generadores',
};

// 3. RELACIONES
export const CATEGORY_RELATIONS: Record<MainCategory, SubCategory[]> = {
  musica: ['playlists', 'meta-prompts'],
  'video-ia': ['guion-shorts', 'youtube-largo', 'heygen-avatar', 'seo-youtube', 'meta-prompts'],
  productividad: ['planificacion', 'emails', 'revision', 'meta-prompts'],
  cursos: ['arquitectura-curso', 'estudio'],
  imagen: ['midjourney', 'assets-web', 'meta-prompts'],
  dev: ['codigo-pro', 'debug', 'herramientas-basicas'],
  mentalidad: ['stoic', 'decision'],
  vida: ['chollos', 'viajes', 'cocina', 'meta-prompts'],
  inversion: ['setup-upgrade', 'ads-trafico', 'decision'],
};

// 4. EL ARSENAL COMPLETO
export const promptsData: PromptItem[] = [

  // ===========================================================================
  // 🏆 TOP 10: TUS ARMAS PRINCIPALES (Supervivencia & Facturación)
  // ===========================================================================
  {
    id: 'top-1-avatar-ventas-b2b',
    titulo: '🏆 Vendedor IA B2B (El "Agente")',
    descripcion: 'Guion diseñado para vender automatización. Foco en dolor (perder clientes).',
    mainCategory: 'video-ia',
    subCategory: 'heygen-avatar',
    content: `Escribe un guion de 45s para mi Avatar HeyGen. 
Objetivo: Vender mi servicio de "Agentes IA que responden WhatsApp".
Público: Dueños de PYMES (Clínicas, Talleres, Restaurantes).
Estructura:
1. Hook (0-5s): "¿Cuánto dinero pierdes cuando no coges el teléfono?"
2. Dolor: Explicar que el cliente se va a la competencia.
3. Solución: Mi Agente IA que trabaja 24/7.
4. CTA: "Comenta AGENTE para una demo".
Usa pausas <break time="0.5s" />. Tono: Autoridad, serio, directo.`,
  },
  {
    id: 'top-2-plan-camarero',
    titulo: '🏆 Plan del Día (Turno Camarero)',
    descripcion: 'Organiza el día protegiendo tu energía antes/después del turno.',
    mainCategory: 'productividad',
    subCategory: 'planificacion',
    content: `Actúa como mi Jefe de Operaciones.
Input: 
- Hora despertar: [HORA].
- Turno de trabajo: [HORA INICIO] a [HORA FIN].
- Energía: [1-10].
Tu misión:
1. Bloquear tiempo sagrado para KRATOS.
2. Bloquear 1 hora sagrada para PROYECTO (antes de estar cansado).
3. Definir logística de comida (tuppers/preparación).
Dame la agenda hora a hora.`,
  },
  {
    id: 'top-3-senior-nextjs',
    titulo: '🏆 Senior Next.js Dev (LaunchLab)',
    descripcion: 'Experto en tu stack para arreglar bugs o crear componentes rápido.',
    mainCategory: 'dev',
    subCategory: 'codigo-pro',
    content: `Actúa como Senior Fullstack Dev experto en Next.js 14 (App Router), TypeScript y Tailwind CSS.
Conoces mi proyecto "Powered by IA".
Tarea: [DESCRIBE LO QUE QUIERES HACER O EL ERROR].
Dame:
1. El código completo y corregido.
2. Explicación breve de por qué fallaba.
3. Comandos de terminal si hace falta instalar algo.
Prioridad: Código limpio y funcional.`,
  },
  {
    id: 'top-4-dj-pareto',
    titulo: '🏆 DJ Pareto (Anti-Repetición)',
    descripcion: 'Playlists de YouTube limpias que no repiten temas. Tu combustible.',
    mainCategory: 'musica',
    subCategory: 'playlists',
    content: `Actúa como DJ experto.
Objetivo: Playlist de 8 canciones para [MOOD: Gym / Code / Relax].
Estilo: [GÉNERO: Metal, Rap, Reggae].
IMPORTANTE: Revisa el historial de este chat y NO REPITAS canciones anteriores.
Salida: Link único watch_videos para Brave.`,
  },
  {
    id: 'top-5-branding-cyberpunk',
    titulo: '🏆 Branding Cyberpunk IA',
    descripcion: 'Genera assets visuales coherentes para tu web y vídeos.',
    mainCategory: 'imagen',
    subCategory: 'midjourney',
    content: `Prompt para Midjourney V6.
Sujeto: [DESCRIPCIÓN, ej: Avatar hacker, fondo de código].
Estilo: Cyberpunk, Neon Blue & Purple (colores de mi marca), Dark mode, High Tech, 8k, Cinematic lighting.
Aspect Ratio: --ar 16:9 (para web/YouTube) o --ar 9:16 (para Shorts).`,
  },
  {
    id: 'top-6-estoico-guerra',
    titulo: '🏆 Modo Guerra (Anti-Quejas)',
    descripcion: 'Reset mental rápido cuando el turno o la vida se ponen difíciles.',
    mainCategory: 'mentalidad',
    subCategory: 'stoic',
    content: `Actúa como mi Coach Estoico.
Situación: Estoy agobiado/cansado/enfadado por [CAUSA].
Dame:
1. Un reencuadre brutalmente honesto (La Dicotomía del Control).
2. Una acción física inmediata para cambiar el estado.
3. Un recordatorio de mi objetivo (2000€/mes).
Hazlo corto y duro.`,
  },
  {
    id: 'top-7-cazador-chollos',
    titulo: '🏆 Cazador de Chollos Tech',
    descripcion: 'Para comprar hardware/software sin tirar el dinero.',
    mainCategory: 'vida',
    subCategory: 'chollos',
    content: `Quiero comprar [PRODUCTO].
Analiza:
1. Precio histórico (¿Es oferta real?).
2. Alternativas mejores por el mismo precio.
3. Veredicto: ¿Comprar ya o esperar?`,
  },
  {
    id: 'top-8-guion-viral',
    titulo: '🏆 Guion Short Viral (Retención)',
    descripcion: 'Estructura probada para vídeos de 30s que retienen.',
    mainCategory: 'video-ia',
    subCategory: 'guion-shorts',
    content: `Guion para TikTok/Reels sobre [TEMA].
Estructura Rígida:
0-3s: Hook Visual + Frase Polémica.
3-15s: Agitación del Problema.
15-40s: Solución Rápida (Tu método).
40-50s: CTA Claro ("Sígueme para X").
Formato: Tabla con Visual / Audio / Texto.`,
  },
  {
    id: 'top-9-ideas-bots',
    titulo: '🏆 Arquitecto de Bots',
    descripcion: 'Ideas para vender automatizaciones a clientes.',
    mainCategory: 'dev',
    subCategory: 'codigo-pro',
    content: `Analiza este tipo de negocio: [TIPO, ej: Peluquería].
Dime 3 automatizaciones simples (con n8n o Zapier) que les ahorrarían tiempo/dinero y por las que pagarían 200-500€.
Explica el flujo lógico de cada una.`,
  },
  {
    id: 'top-10-ingles-tech',
    titulo: '🏆 Inglés Tech de Guerrilla',
    descripcion: 'Para entender documentación y tutoriales sin sufrir.',
    mainCategory: 'cursos',
    subCategory: 'estudio',
    content: `Actúa como profesor de Inglés Técnico.
Tengo este texto/documentación: [PEGAR TEXTO].
1. Resúmelo en Español.
2. Explícame las 3 palabras técnicas clave.
3. Dame un ejemplo de cómo usar esas palabras en una frase laboral.`,
  },

  // ===========================================================================
  // 💸 EL TRIDENTE DE INVERSIÓN (Para el siguiente ciclo)
  // ===========================================================================
  {
    id: 'inv-11-setup-upgrade',
    titulo: '🚀 Inversión: Next Level Setup',
    descripcion: 'Tengo dinero ahorrado. ¿En qué hardware/software invierto para ir más rápido?',
    mainCategory: 'inversion',
    subCategory: 'setup-upgrade',
    content: `Tengo [CANTIDAD] ahorrada para mejorar mi setup.
Objetivo: Producir contenido y código más rápido.
Mi equipo actual: [DESCRIBE TU PC/MÓVIL].
Analiza el ROI (Retorno de Inversión) de:
1. Mejorar PC (RAM/Gráfica).
2. Comprar periféricos (Micro/Pantalla).
3. Pagar Software (Cursor, Midjourney anual, etc.).
Dime qué compra me va a ahorrar más horas al mes.`,
  },
  {
    id: 'inv-12-ads-scaling',
    titulo: '🚀 Inversión: Ads & Tráfico',
    descripcion: 'Cómo meter dinero en publicidad para captar clientes sin quemarlo.',
    mainCategory: 'inversion',
    subCategory: 'ads-trafico',
    content: `Quiero invertir [CANTIDAD] en Ads para vender mi servicio de Bots.
Actúa como Trafficker Digital.
Dime:
1. ¿En qué plataforma meto el dinero (Meta/TikTok/Google)?
2. Estrategia de campaña simple para empezar.
3. Qué métricas debo mirar para saber si estoy tirando el dinero o ganando.`,
  },
  {
    id: 'inv-13-delegacion',
    titulo: '🚀 Inversión: Comprar Tiempo (Delegar)',
    descripcion: 'Cuándo y cómo contratar a alguien para quitarme trabajo sucio.',
    mainCategory: 'inversion',
    subCategory: 'decision',
    content: `Estoy saturado. Tengo [CANTIDAD] para delegar.
¿Qué me sale más rentable delegar primero?
A) Edición de vídeo básica.
B) Prospección de clientes (Lead Gen).
C) Tareas administrativas.
Dame un plan para contratar a un freelancer barato pero bueno y qué instrucciones darle.`,
  },

  // ===========================================================================
  // MÚSICA / FOCO (El resto del arsenal)
  // ===========================================================================
  {
    id: 'playlist-metal',
    titulo: 'Playlist: Metal Gym',
    descripcion: 'Slipknot, Korn, Rammstein. Energía pura.',
    mainCategory: 'musica',
    subCategory: 'playlists',
    content: `Genera playlist YouTube (watch_videos). Género: Nu Metal / Metalcore. Mood: Agresivo, Entreno Pesado. 8 Canciones. Solo oficiales.`,
  },
  {
    id: 'playlist-rap',
    titulo: 'Playlist: Rap Español',
    descripcion: 'Violadores, SFDK, Nach. Foco callejero.',
    mainCategory: 'musica',
    subCategory: 'playlists',
    content: `Genera playlist YouTube. Género: Rap Español Clásico y Nuevo. Mood: Foco, Liricismo. 8 Canciones.`,
  },
  {
    id: 'playlist-reggae',
    titulo: 'Playlist: Reggae Chill',
    descripcion: 'Bob Marley, Morodo. Para pasear a Kratos.',
    mainCategory: 'musica',
    subCategory: 'playlists',
    content: `Genera playlist YouTube. Género: Reggae Roots & Dub. Mood: Relax, Positivo. 8 Canciones.`,
  },
  {
    id: 'playlist-phonk',
    titulo: 'Playlist: Aggressive Phonk',
    descripcion: 'Para conducir de noche o codear rápido.',
    mainCategory: 'musica',
    subCategory: 'playlists',
    content: `Genera playlist YouTube. Género: Drift Phonk / Aggressive Phonk. Mood: Velocidad, Adrenalina. 8 Canciones.`,
  },
  {
    id: 'dj-wizard',
    titulo: '🧙‍♂️ DJ Wizard (Interactivo)',
    descripcion: 'Te entrevista para crear la lista perfecta.',
    mainCategory: 'musica',
    subCategory: 'meta-prompts',
    content: `Actúa como DJ. Hazme 3 preguntas (ánimo, género, actividad) y luego genera el link de YouTube.`,
  },

  // ===========================================================================
  // VIDA & CHOLLOS (Optimizados y Temporales)
  // ===========================================================================
  {
    id: 'pareto-chollos-season',
    titulo: 'Ofertas Chollos Temporada',
    descripcion: '¿Es buen momento para comprar X? Análisis estacional.',
    mainCategory: 'vida',
    subCategory: 'chollos',
    content: `Quiero comprar [PRODUCTO].
Analiza la estacionalidad:
1. ¿Estamos en buena época para comprar esto (Rebajas, Black Friday, Liquidación)?
2. ¿Va a salir un modelo nuevo pronto que baje el precio del actual?
3. ¿Me espero o compro ya?`,
  },
  {
    id: 'cazador-chollos-real',
    titulo: 'Cazador de Chollos (Anti-Estafa)',
    descripcion: 'Filtra opiniones falsas y precios inflados.',
    mainCategory: 'vida',
    subCategory: 'chollos',
    content: `Analiza esta oferta de [PRODUCTO] a [PRECIO].
1. ¿Es su precio mínimo histórico real?
2. Busca opiniones negativas recurrentes (lo que nadie dice).
3. ¿Hay alguna alternativa china (AliExpress/Temu) que sea el MISMO producto sin marca?`,
  },
  {
    id: 'meal-prep',
    titulo: 'Planificador de Comidas (Batch Cooking)',
    descripcion: 'Cocina un día, come toda la semana. Ahorro y salud.',
    mainCategory: 'vida',
    subCategory: 'cocina',
    content: `Dame un plan de comidas semanal barato y saludable. Tengo [INGREDIENTES]. Quiero cocinar solo el domingo (Batch Cooking). Dame la lista de la compra y los pasos.`,
  },
  {
    id: 'viaje-presupuesto',
    titulo: 'Presupuesto de Viaje Detallado',
    descripcion: 'Calcula cuánto necesitas realmente para El Salvador o escapadas.',
    mainCategory: 'vida',
    subCategory: 'viajes',
    content: `Calcula un presupuesto realista para un viaje a [DESTINO] de [DÍAS] días. Incluye: Vuelos, Alojamiento medio, Comida callejera y Transporte. Dame el total y un margen de seguridad.`,
  },

  // ===========================================================================
  // FORMACIÓN / CURSOS (Concatenados y Amigables)
  // ===========================================================================
  {
    id: 'curso-concatenado-friendly',
    titulo: 'Diseñador de Cursos "Saga"',
    descripcion: 'Crea cursos con nombres épicos/familiares, no "Nivel 1".',
    mainCategory: 'cursos',
    subCategory: 'arquitectura-curso',
    content: `Actúa como diseñador de experiencias de aprendizaje. Quiero crear una ruta de aprendizaje sobre [TEMA].
Diseña 3 etapas, pero NO las llames "Básico/Medio/Avanzado".
Usa nombres metafóricos o épicos (Ej: "El Despertar", "La Forja", "La Maestría" o "Cinturón Blanco/Negro").
Para cada etapa:
1. Objetivo (La Transformación).
2. 3 Lecciones clave.
3. Un "Jefe Final" (Proyecto práctico para pasar de nivel).`,
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
  {
    id: 'feynman-technique',
    titulo: 'Técnica Feynman (Explicar simple)',
    descripcion: 'Aprende cualquier cosa explicándosela a un niño.',
    mainCategory: 'cursos',
    subCategory: 'estudio',
    content: `Explícame el concepto [CONCEPTO COMPLEJO] como si tuviera 12 años. Usa analogías sencillas y evita la jerga técnica.`,
  },

  // ===========================================================================
  // CONTENIDO / VÍDEO (Más herramientas)
  // ===========================================================================
  {
    id: 'ideas-infinitas',
    titulo: 'Generador de Ideas Infinitas',
    descripcion: 'Nunca te quedes en blanco. Matriz de contenidos.',
    mainCategory: 'video-ia',
    subCategory: 'guion-shorts',
    content: `Dame 10 ideas de vídeos cortos para mi nicho [TU NICHO]. 
Distribución:
- 3 Educativos (Cómo hacer X).
- 3 Mitos/Errores (No hagas X).
- 2 Entretenimiento/Humor.
- 2 Venta directa.`,
  },
  {
    id: 'comment-responder',
    titulo: 'Respondedor de Comentarios (Haters)',
    descripcion: 'Convierte el odio en engagement.',
    mainCategory: 'video-ia',
    subCategory: 'guion-shorts',
    content: `Tengo este comentario hater: [COMENTARIO]. Escribe una respuesta ingeniosa y educada que me haga quedar bien y genere más debate.`,
  },
  {
    id: 'seo-youtube-pack',
    titulo: 'Pack SEO YouTube',
    descripcion: 'Título, Descripción y Tags optimizados.',
    mainCategory: 'video-ia',
    subCategory: 'seo-youtube',
    content: `Para un vídeo sobre [TEMA]. Genera: 5 Títulos clickbait (alto CTR), Descripción SEO friendly (200 palabras) y 20 Tags separados por comas.`,
  },

  // ===========================================================================
  // DEV / CÓDIGO (Más herramientas)
  // ===========================================================================
  {
    id: 'pair-programmer',
    titulo: 'Pair Programmer (Explicador)',
    descripcion: 'Te explica código complejo línea a línea.',
    mainCategory: 'dev',
    subCategory: 'codigo-pro',
    content: `Actúa como un Senior Developer mentor. Tengo este trozo de código: [CÓDIGO]. Explícame qué hace paso a paso, en lenguaje sencillo. Si hay errores o malas prácticas, señálalos.`,
  },
  {
    id: 'regex-generator',
    titulo: 'Generador de Regex',
    descripcion: 'La magia negra de las expresiones regulares, fácil.',
    mainCategory: 'dev',
    subCategory: 'herramientas-basicas',
    content: `Necesito una expresión regular (Regex) para capturar: [QUÉ QUIERES CAPTURAR]. Explícame cómo funciona.`,
  },
  {
    id: 'git-commands',
    titulo: 'Chuleta Git de Emergencia',
    descripcion: 'Comandos para no romper el repositorio cuando la lías.',
    mainCategory: 'dev',
    subCategory: 'herramientas-basicas',
    content: `¿Qué comando de Git uso para [ACCIÓN: deshacer commit, crear rama, fusionar]? Explica los riesgos antes de que lo ejecute.`,
  },

  // ===========================================================================
  // MENTALIDAD (Más herramientas)
  // ===========================================================================
  {
    id: 'decision-matrix',
    titulo: 'Matriz de Decisión',
    descripcion: 'Evalúa pros y contras objetivamente.',
    mainCategory: 'mentalidad',
    subCategory: 'decision',
    content: `Ayúdame a decidir entre [OPCIÓN A] y [OPCIÓN B]. Haz una lista de Pros y Contras ponderados para cada una.`,
  },
  {
    id: 'pre-mortem',
    titulo: 'Análisis Pre-Mortem',
    descripcion: 'Anticipa fallos antes de empezar un proyecto.',
    mainCategory: 'mentalidad',
    subCategory: 'decision',
    content: `Voy a lanzar [PROYECTO]. Imagina que ha pasado un año y ha fracasado estrepitosamente. Dame 5 razones probables de por qué falló y cómo prevenirlas hoy.`,
  },
];