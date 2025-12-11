'use client';

import { useState, useMemo, useEffect } from 'react';
import {
  promptsData,
  MAIN_LABELS,
  SUB_LABELS,
  CATEGORY_RELATIONS,
  MainCategory,
  SubCategory,
  PromptItem,
} from './promptsData';

export default function PromptsList() {
  const [mounted, setMounted] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  
  const [selectedMain, setSelectedMain] = useState<MainCategory | 'all'>('all');
  const [selectedSub, setSelectedSub] = useState<SubCategory | 'all'>('all');

  useEffect(() => {
    setMounted(true);
  }, []);

  const availableSubCategories = useMemo(() => {
    if (selectedMain === 'all') return [];
    return CATEGORY_RELATIONS[selectedMain] || [];
  }, [selectedMain]);

  const filteredPrompts = useMemo(() => {
    // Protección antibalas por si falla la carga de datos
    const safeData = promptsData || [];
    
    return safeData.filter((prompt) => {
      if (selectedMain !== 'all' && prompt.mainCategory !== selectedMain) return false;
      if (selectedMain !== 'all' && selectedSub !== 'all' && prompt.subCategory !== selectedSub) return false;
      return true;
    });
  }, [selectedMain, selectedSub]);

  const handleMainChange = (category: MainCategory | 'all') => {
    setSelectedMain(category);
    setSelectedSub('all'); // Resetear subcategoría al cambiar la principal
  };

  const handleCopy = async (prompt: PromptItem) => {
    try {
      await navigator.clipboard.writeText(prompt.content);
      setCopiedId(prompt.id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Error al copiar', err);
    }
  };

  if (!mounted) return null;

  return (
    <div className="w-full animate-in fade-in duration-500">
      {/* MENÚ PRINCIPAL (Categorías) */}
      <div className="flex flex-wrap gap-3 mb-8 justify-center">
        <button
          onClick={() => handleMainChange('all')}
          className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all shadow-sm ${
            selectedMain === 'all'
              ? 'bg-cyan-500 text-black shadow-cyan-500/40 scale-105'
              : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700'
          }`}
        >
          Todo
        </button>
        {(Object.keys(MAIN_LABELS) as MainCategory[]).map((key) => (
          <button
            key={key}
            onClick={() => handleMainChange(key)}
            className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all shadow-sm ${
              selectedMain === key
                ? 'bg-cyan-500 text-black shadow-cyan-500/40 scale-105'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700'
            }`}
          >
            {MAIN_LABELS[key]}
          </button>
        ))}
      </div>

      {/* SUBMENÚ (Subcategorías) */}
      {selectedMain !== 'all' && availableSubCategories.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-10 justify-center animate-in fade-in slide-in-from-top-2 duration-300 bg-black/20 p-4 rounded-2xl border border-white/5 inline-flex mx-auto w-full md:w-auto">
          <button
            onClick={() => setSelectedSub('all')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all border ${
              selectedSub === 'all'
                ? 'bg-purple-600 text-white border-purple-500 shadow-purple-500/30'
                : 'bg-transparent text-slate-400 border-slate-700 hover:border-slate-500 hover:text-white'
            }`}
          >
            Ver todo
          </button>
          {availableSubCategories.map((subKey) => (
            <button
              key={subKey}
              onClick={() => setSelectedSub(subKey)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all border ${
                selectedSub === subKey
                  ? 'bg-purple-600 text-white border-purple-500 shadow-purple-500/30'
                  : 'bg-transparent text-slate-400 border-slate-700 hover:border-slate-500 hover:text-white'
              }`}
            >
              {SUB_LABELS[subKey]}
            </button>
          ))}
        </div>
      )}

      {/* GRID DE RESULTADOS */}
      <div className="grid gap-6 md:grid-cols-2">
        {filteredPrompts.length > 0 ? (
          filteredPrompts.map((p) => (
            <article
              key={p.id}
              className="group relative rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-md p-6 shadow-xl transition-all hover:border-cyan-500/40 hover:shadow-cyan-500/10"
            >
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded text-[10px] font-bold bg-cyan-950 text-cyan-400 border border-cyan-800/50 uppercase tracking-wide">
                  {MAIN_LABELS[p.mainCategory]}
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded text-[10px] font-bold bg-purple-950 text-purple-400 border border-purple-800/50 uppercase tracking-wide">
                  {SUB_LABELS[p.subCategory]}
                </span>
              </div>

              <h2 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                {p.titulo}
              </h2>
              <p className="text-sm text-slate-400 mb-5 leading-relaxed min-h-[40px]">
                {p.descripcion}
              </p>

              <div className="relative mb-5 bg-black/50 rounded-xl border border-white/5 group-hover:border-white/10 transition-colors">
                <textarea
                  readOnly
                  value={p.content}
                  className="w-full h-32 bg-transparent p-4 text-[11px] font-mono text-slate-300 resize-none focus:outline-none scrollbar-thin scrollbar-thumb-slate-700"
                />
                <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-black/80 to-transparent pointer-events-none rounded-b-xl" />
              </div>

              <button
                onClick={() => handleCopy(p)}
                className={`w-full py-3 rounded-xl text-sm font-bold uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 ${
                  copiedId === p.id
                    ? 'bg-green-500 text-black shadow-[0_0_15px_rgba(34,197,94,0.4)] scale-[0.98]'
                    : 'bg-white/10 text-white hover:bg-cyan-500 hover:text-black hover:shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                }`}
              >
                {copiedId === p.id ? '¡Copiado!' : 'Copiar Prompt'}
              </button>
            </article>
          ))
        ) : (
          <div className="col-span-full py-20 text-center">
            <p className="text-slate-500 mb-4">No hay prompts con estos filtros.</p>
            <button 
              onClick={() => { setSelectedMain('all'); setSelectedSub('all'); }}
              className="text-cyan-400 hover:text-cyan-300 underline underline-offset-4"
            >
              Volver a ver todo
            </button>
          </div>
        )}
      </div>
    </div>
  );
}