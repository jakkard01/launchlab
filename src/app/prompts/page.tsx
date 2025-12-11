'use client';

import { useState } from 'react';

type Prompt = {
  id: string;
  title: string;
  category: string;
  description: string;
  content: string;
};

const prompts: Prompt[] = [
  {
    id: 'pareto-playlist-brave',
    category: 'Música / Foco',
    title: 'Pareto Playlist Brave (YouTube en una sola URL)',
    description:
      'Genera playlists cortas (6–8 temas) con un solo enlace YouTube en formato watch_videos, comprobado para Brave y España.',
    content: `Quiero que actúes como un generador de playlists para YouTube optimizado para Brave.

Objetivo:
- Crear una playlist corta y muy cuidada (6–8 canciones máximo) para escuchar en el navegador Brave.
- El resultado DEBE ser:
  1) Un único enlace de YouTube usando el formato:
     https://www.youtube.com/watch_videos?video_ids=ID1,ID2,ID3...
  2) Una lista numerada con TÍTULO – ARTISTA de cada canción, en el mismo orden que los IDs.

Reglas IMPORTANTES:
- Los IDs de vídeo deben corresponder a:
  - Vídeos oficiales, audio oficial o canales verificados.
  - Nada de lyric videos cutres, fan-mades, directos con mala calidad, remixes random, etc.
- Verifica que:
  - El enlace generado funciona en España.
  - El enlace abre directamente en YouTube dentro de Brave (sin cosas raras).
- No cambies nombres de artistas ni títulos: deben coincidir con el vídeo elegido.
- No mezclas versiones raras: elige la versión más estándar/fácil de reconocer.

Parámetros que te daré cada vez:
- Mi estado de ánimo (mood).
- Los géneros que quiero (ej: rap en español, metal, reggae, etc.).
- Si quiero energía alta, media o baja.

Estructura de la respuesta SIEMPRE:
1) Enlace único de YouTube con el formato watch_videos.
2) Lista numerada:
   1. Título – Artista
   2. ...
3) Una frase final resumiendo el mood general de la playlist.

No expliques el prompt, solo devuélveme el enlace y la lista.`,
  },
  {
    id: 'video-corto-ia',
    category: 'Contenido / Vídeo',
    title: 'Guionador de vídeo corto con IA (Short / Reel)',
    description:
      'Crea un guion rápido para vídeo vertical con avatar IA (CapCut/HeyGen), optimizado para retención.',
    content: `Quiero que actúes como guionista de VÍDEOS CORTOS en formato vertical (Shorts, Reels, TikTok) con avatar de IA.

Objetivo:
- Crear un guion de 30–60 segundos.
- Pensado para alguien que hace contenido sobre IA aplicada al día a día, productividad y trabajo.

Estructura del guion:
- HOOK (0–3s): frase muy directa que haga que la persona deje de hacer scroll.
- CUERPO (3–45s): 2–4 ideas claras, sin tecnicismos innecesarios.
- REMATE (45–60s): una frase potente + llamada a la acción (seguir, comentar o ver otro vídeo).

Requisitos:
- Lenguaje en español, cercano, sin humo corporativo.
- Frases cortas, fáciles de leer como subtítulos.
- Indica en qué momentos sería bueno:
  - Añadir texto grande en pantalla,
  - Hacer un zoom-in,
  - Cambiar de plano del avatar.

Al final de la respuesta, dame:
1) El guion en bloques con marcas de tiempo aproximadas.
2) 3 ideas de TÍTULO corto para el Short.
3) 2–3 frases cortas para usar como texto grande en pantalla.`,
  },
  {
    id: 'plan-dia-pareto',
    category: 'Productividad',
    title: 'Plan del día Pareto (enfoque 80/20)',
    description:
      'Organiza mi día en bloques, encontrando la Tarea Pareto y dejando claro qué NO hacer.',
    content: `Quiero que actúes como organizador de mi día usando el principio de Pareto (80/20).

Contexto:
- Trabajo como camarero con horarios variables.
- Además, estoy construyendo proyectos de IA, bots y contenido.
- Mi objetivo es avanzar cada día sin reventarme física ni mentalmente.

Tu trabajo:
1) Pregúntame:
   - A qué hora me he despertado.
   - A qué hora entro a trabajar (si trabajo hoy).
   - Cómo estoy de energía (alta / media / baja).
   - Cuáles son las 3 cosas que más me preocupan hoy.

2) Con mis respuestas, devuelve:
   - LA TAREA PARETO DEL DÍA:
     - Una sola tarea que, si la hago, hace que el día cuente como victoria.
   - 2–3 tareas secundarias opcionales.
   - Un mini plan por bloques:
     - Bloque de foco 1 (40–60 min),
     - Descanso,
     - Bloque de foco 2 (opcional),
     - Recordatorio de sueño/comida.

3) Muy importante:
   - Dime explícitamente QUÉ NO HACER hoy (cosas que suenan productivas pero son distracción).
   - No llenes la agenda de cosas, quiero claridad, no estrés.`,
  },
  {
    id: 'diseno-curso-ia',
    category: 'Formación / Cursos',
    title: 'Diseñador de curso de IA práctico (estructura 3 niveles)',
    description:
      'Crea la estructura de un curso en 3 niveles (básico, intermedio, avanzado) centrado en IA aplicada.',
    content: `Quiero que actúes como diseñador instruccional para crear un curso de IA PRÁCTICA.

Objetivo:
- Definir un curso en 3 niveles:
  - Módulo 1: Básico (conceptos clave + usos diarios).
  - Módulo 2: Intermedio (automatizaciones simples, prompts avanzados, flujos).
  - Módulo 3: Avanzado (bots, APIs, proyectos reales).

Público:
- Personas que trabajan y tienen poco tiempo.
- Quieren usar IA para ahorrar tiempo, mejorar su trabajo y abrir nuevas oportunidades.

Tu respuesta debe incluir:
1) Título general del curso + promesa clara.
2) Estructura en 3 módulos:
   - Para cada módulo:
     - Título,
     - Objetivo del módulo,
     - 4–6 lecciones con título y 1 frase de descripción.
3) Sugerencia de proyecto final práctico que conecte los 3 módulos.

Tono:
- Cero academicismo inútil.
- Todo orientado a aplicaciones reales (trabajo, dinero, organización personal).`,
  },
];

export default function PromptsPage() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = async (prompt: Prompt) => {
    try {
      await navigator.clipboard.writeText(prompt.content);
      setCopiedId(prompt.id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Error al copiar', err);
    }
  };

  return (
    <main className="min-h-screen w-full px-4 py-16 max-w-5xl mx-auto">
      <header className="mb-10 text-center">
        <p className="text-xs uppercase tracking-[0.25em] text-sky-300/80">
          Biblioteca de prompts
        </p>
        <h1 className="mt-2 text-3xl md:text-4xl font-semibold text-white">
          Prompts listos para copiar y usar
        </h1>
        <p className="mt-4 text-sm md:text-base text-slate-200/80 max-w-2xl mx-auto">
          Esta página recoge los prompts que más uso en mi día a día para música, vídeos, cursos y
          productividad. Están pensados para ChatGPT, Gemini o cualquier otra IA de texto.
        </p>
      </header>

      <section className="grid gap-6 md:grid-cols-2">
        {prompts.map((p) => (
          <article
            key={p.id}
            className="rounded-2xl border border-white/10 bg-slate-950/40 backdrop-blur-sm p-4 shadow-lg shadow-black/40 flex flex-col"
          >
            <div className="text-[11px] font-medium text-sky-300/80 mb-1">
              {p.category}
            </div>
            <h2 className="text-lg font-semibold text-white">{p.title}</h2>
            <p className="mt-2 text-sm text-slate-200/80 flex-1">{p.description}</p>
            <pre className="mt-3 text-[11px] leading-relaxed bg-black/50 border border-white/10 rounded-xl p-3 overflow-auto max-h-56 whitespace-pre-wrap text-slate-100">
{p.content}
            </pre>
            <button
              onClick={() => handleCopy(p)}
              className="mt-3 inline-flex items-center justify-center rounded-full px-3 py-1.5 text-xs font-medium bg-sky-500 hover:bg-sky-400 text-black transition"
            >
              {copiedId === p.id ? '✅ Copiado' : 'Copiar prompt'}
            </button>
          </article>
        ))}
      </section>

      <p className="mt-10 text-xs text-center text-slate-300/70">
        Iré añadiendo más prompts a medida que avance el proyecto (trading, bots, automatizaciones,
        etc.).
      </p>
    </main>
  );
}
