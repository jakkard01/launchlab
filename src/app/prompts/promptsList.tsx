'use client';

import { useState } from 'react';

type Prompt = {
  id: string;
  title: string;
  category: string;
  description: string;
  content: string;
};

// CATEGORÍAS DISPONIBLES: 'Vídeo IA', 'Productividad', 'Código', 'Meta-Prompts'

const prompts: Prompt[] = [
  {
    id: 'meta-prompt-generator',
    category: 'Meta-Prompts (Generadores)',
    title: '🛠️ El Constructor de Prompts (Sistema de Opciones)',
    description:
      'Usa este prompt para que ChatGPT te ayude a crear el prompt perfecto seleccionando opciones predefinidas. Ideal para no empezar de cero.',
    content: `Actúa como mi "Ingeniero de Prompts". Quiero crear un prompt nuevo, pero necesito que me guíes con opciones.

1. Primero, pregúntame: "¿Para qué herramienta es el prompt?"
   (Opciones: A) HeyGen Avatar, B) CapCut Script-to-Video, C) Midjourney, D) Chat General).

2. Según mi respuesta, dame una lista numerada de 3 "Tonos/Estilos" para elegir (ej: 1. Profesional/Serio, 2. Dinámico/YouTuber, 3. Narrativo/Cine).

3. Luego, pídeme el "Tema Central" en una frase.

4. Con esos datos (Herramienta + Tono + Tema), GENERA el prompt final optimizado y listo para copiar y pegar en esa herramienta específica.`,
  },
  {
    id: 'capcut-script-video',
    category: 'Vídeo IA',
    title: '🎬 Guion para CapCut (Script-to-Video)',
    description:
      'Genera guiones visuales que la IA de CapCut entienda perfectamente para crear B-Roll automático.',
    content: `Actúa como experto en la herramienta "Script-to-Video" de CapCut.
Genera un guion para un video de [DURACIÓN, ej: 30 segundos] sobre [TEMA].

Estructura obligatoria para que la IA elija bien las imágenes:
1. [Escena 1 - Gancho Visual]: Describe visualmente la primera imagen (ej: "Persona estresada mirando reloj"). Texto en pantalla: "[FRASE CORTE]".
2. [Escena 2 - Problema]: Descripción visual clara. Texto: "[FRASE PROBLEMA]".
3. [Escena 3 - Solución]: Descripción visual brillante/positiva. Texto: "[TU SOLUCIÓN]".
4. [Escena 4 - CTA]: Fondo liso o logo. Texto: "Sígueme para más".

Usa lenguaje visual muy descriptivo entre corchetes [] para que la IA de CapCut encuentre los clips de stock correctos.`,
  },
  {
    id: 'heygen-avatar-sales',
    category: 'Vídeo IA',
    title: '🗣️ Avatar de Ventas (HeyGen) - Estructura AIDA',
    description:
      'Guion para que tu avatar de HeyGen venda un servicio en menos de 1 minuto.',
    content: `Escribe un guion para un avatar de IA (HeyGen) hablando a cámara.
Objetivo: Vender [NOMBRE DEL SERVICIO].
Tono: Cercano, autoridad, directo.

Estructura:
1. Atención (0-5s): Una pregunta retórica sobre un dolor del cliente.
2. Interés (5-15s): Dato curioso o "sabías que..." que amplifica el problema.
3. Deseo (15-40s): Cómo mi servicio lo soluciona sin esfuerzo (beneficios, no características).
4. Acción (40-60s): Instrucción clara (ej: "Comenta la palabra X").

Incluye marcas de pausa <break time="0.5s" /> donde sea necesario para que el avatar respire.`,
  },
  {
    id: 'pareto-playlist-brave',
    category: 'Productividad',
    title: '🎵 Pareto Playlist Brave (YouTube limpio)',
    description:
      'Genera playlists de 6-8 canciones en un solo link, sin anuncios ni distracciones.',
    content: `Quiero que actúes como mi DJ de productividad.
Objetivo: Crear una playlist de [NÚMERO] canciones para [MOOD: Concentración / Gym / Relax].

Requisitos:
1. Solo vídeos oficiales de música.
2. Devuélveme UN SOLO ENLACE con este formato exacto:
   https://www.youtube.com/watch_videos?video_ids=ID1,ID2,ID3...
3. Lista debajo los títulos de las canciones.

¡Dame la música!`,
  },
  {
    id: 'secuencia-videos-tiktok',
    category: 'Vídeo IA',
    title: '📱 Secuencia de 5 Vídeos (Estrategia Semanal)',
    description:
      'Planifica una semana entera de contenido sobre un tema, con ganchos conectados.',
    content: `Actúa como estratega de contenidos. Tengo un nicho: [TU NICHO].
Dame 5 ideas de vídeos cortos (TikTok/Reels) que formen una secuencia lógica para esta semana:

- Lunes: Mito común (Romper creencia).
- Martes: Tutorial rápido "Cómo hacer X".
- Miércoles: Herramienta secreta / Recurso.
- Jueves: Historia personal / Error aprendido.
- Viernes: Venta suave / CTA.

Para cada día, dame:
1. Título Gancho (lo que aparece en portada).
2. La primera frase del guion.`,
  },
];

export default function PromptsList() {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('Todos');

  // Extraemos las categorías únicas para el filtro
  const categories = ['Todos', ...Array.from(new Set(prompts.map((p) => p.category)))];

  const handleCopy = async (prompt: Prompt) => {
    try {
      await navigator.clipboard.writeText(prompt.content);
      setCopiedId(prompt.id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Error al copiar', err);
    }
  };

  const filteredPrompts =
    filter === 'Todos' ? prompts : prompts.filter((p) => p.category === filter);

  return (
    <div>
      {/* Filtro de Categorías */}
      <div className="flex flex-wrap gap-2 mb-8 justify-center">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
              filter === cat
                ? 'bg-sky-500 text-black shadow-[0_0_15px_rgba(14,165,233,0.4)]'
                : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid de Prompts */}
      <div className="grid gap-6 md:grid-cols-2">
        {filteredPrompts.map((p) => (
          <article
            key={p.id}
            className="rounded-2xl border border-white/10 bg-slate-950/40 backdrop-blur-sm p-5 shadow-lg shadow-black/40 flex flex-col hover:border-sky-500/30 transition-colors duration-300"
          >
            <div className="flex justify-between items-start mb-2">
              <span className="text-[10px] uppercase tracking-wider font-bold text-sky-400/80 bg-sky-950/30 px-2 py-1 rounded">
                {p.category}
              </span>
            </div>
            
            <h2 className="text-lg font-bold text-white mb-2">{p.title}</h2>
            <p className="text-sm text-slate-300/80 flex-1 mb-4 leading-relaxed">
              {p.description}
            </p>
            
            <div className="relative group">
              <pre className="text-[11px] leading-relaxed bg-black/60 border border-white/5 rounded-xl p-4 overflow-auto max-h-48 whitespace-pre-wrap text-slate-200 font-mono">
                {p.content}
              </pre>
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20 pointer-events-none rounded-xl" />
            </div>

            <button
              onClick={() => handleCopy(p)}
              className={`mt-4 w-full inline-flex items-center justify-center rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-200 ${
                copiedId === p.id
                  ? 'bg-green-500/20 text-green-400 border border-green-500/50'
                  : 'bg-white/5 text-white hover:bg-white/10 border border-white/10 hover:border-white/20'
              }`}
            >
              {copiedId === p.id ? (
                <span className="flex items-center gap-2">
                  ✓ Copiado al portapapeles
                </span>
              ) : (
                'Copiar Prompt'
              )}
            </button>
          </article>
        ))}
      </div>
    </div>
  );
}