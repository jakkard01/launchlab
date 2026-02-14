"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { buildWhatsappLink } from "../../../lib/site";
import BotSimulator from "./BotSimulator";

const whatsappLink = buildWhatsappLink("demo_bot");

type FaqItem = {
  id: string;
  category: string;
  question: string;
  answer: string;
};

const faqData: FaqItem[] = [
  {
    id: "start_needs",
    category: "Inicio",
    question: "¿Qué necesito para empezar?",
    answer:
      "Brief claro, assets básicos (logo/brand), ejemplos de referencia y acceso a herramientas clave. Si no hay assets, podemos definir un pack mínimo con plantilla base.",
  },
  {
    id: "timeline",
    category: "Plazos",
    question: "¿Cuánto tarda?",
    answer:
      "Depende del alcance. Webs: 5-14 días típicos, Pro hasta 3 semanas. Video y doblaje tienen plazos por pieza. Se confirma con assets completos.",
  },
  {
    id: "scope_limits",
    category: "Alcance",
    question: "¿Qué incluye y qué no incluye?",
    answer:
      "Incluimos entregables y revisiones definidos por plan. No incluye hosting/dominio, licencias premium ni cambios de concepto fuera de alcance. Dominio y hosting se gestionan a tu nombre con coste externo y te guiamos.",
  },
  {
    id: "web_scope",
    category: "Web",
    question: "¿Qué incluye una web de conversión?",
    answer:
      "Estructura orientada a resultados, copywriting de venta, CTA claros, SEO básico y medición esencial (GA4 + eventos clave). Dominio/hosting se gestionan a tu nombre con costes de terceros.",
  },
  {
    id: "ops_scope",
    category: "Ops",
    question: "¿Cómo funcionan las automatizaciones n8n?",
    answer:
      "Definimos flujos y límites por complejidad. Simple: 1-2 integraciones y lógica directa; compleja: 3+ integraciones, ramas y retries.",
  },
  {
    id: "video_scope",
    category: "Video",
    question: "¿Qué incluye producción de video y doblaje?",
    answer:
      "Packs con guion, edición, formatos y revisiones definidos. Doblaje con voiceover + subtítulos, idiomas extra bajo add-on.",
  },
  {
    id: "revisions",
    category: "Cambios",
    question: "¿Cuántas revisiones tengo?",
    answer:
      "Web: 1-3 rondas según plan. Video: 2 revisiones por pieza. Cambios estructurales se consideran nuevo alcance.",
  },
  {
    id: "integrations",
    category: "Integraciones",
    question: "¿Se integra con mis herramientas?",
    answer:
      "Sí si hay APIs disponibles. Integraciones enterprise o custom se cotizan aparte.",
  },
  {
    id: "support",
    category: "Soporte",
    question: "¿Qué soporte ofrecen?",
    answer:
      "Handoff documentado y soporte post-entrega según plan. SLA y ventanas de soporte se definen en la propuesta.",
  },
  {
    id: "changes",
    category: "Cambios",
    question: "¿Qué pasa si quiero más cambios o páginas?",
    answer:
      "Se cotiza como ampliación de alcance o nueva pieza. Se valida antes de ejecutar.",
  },
  {
    id: "privacy",
    category: "Privacidad",
    question: "¿Cómo manejan datos y privacidad?",
    answer:
      "Se minimiza el uso de datos y se sigue la normativa aplicable. Si hay datos sensibles, se define flujo y permisos.",
  },
  {
    id: "channels",
    category: "Canales",
    question: "¿Qué canales soportan en bots?",
    answer:
      "Web widget y WhatsApp Cloud API. Otros canales son bajo pedido y se evalúan por caso.",
  },
  {
    id: "next_steps",
    category: "Siguiente paso",
    question: "¿Cuál es el siguiente paso?",
    answer:
      "Agendar una llamada corta para definir alcance, plazos y propuesta.",
  },
];

const quickReplies = [
  { label: "Quiero una web", target: "web_scope" },
  { label: "Quiero automatizar", target: "ops_scope" },
  { label: "Quiero video/doblaje", target: "video_scope" },
  { label: "Hablar por WhatsApp", target: "next_steps" },
];

export default function DemoBotPage() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [history, setHistory] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const questionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const orderedFaqs = useMemo(() => {
    const normalized = search.trim().toLowerCase();
    if (!normalized) return faqData;
    return faqData.filter(
      (item) =>
        item.question.toLowerCase().includes(normalized) ||
        item.answer.toLowerCase().includes(normalized) ||
        item.category.toLowerCase().includes(normalized)
    );
  }, [search]);

  useEffect(() => {
    if (!activeId) return;
    const target = questionRefs.current[activeId];
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [activeId]);

  const handleSelect = (id: string) => {
    setHistory((prev) => (activeId ? [...prev, activeId] : prev));
    setActiveId(id);
  };

  const handleBack = () => {
    setHistory((prev) => {
      if (prev.length === 0) return prev;
      const next = [...prev];
      const last = next.pop() ?? null;
      setActiveId(last);
      return next;
    });
  };

  const handleReset = () => {
    setActiveId(null);
    setHistory([]);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="min-h-screen w-full px-4 pb-20 pt-28 sm:px-6 lg:px-8">
      <section className="mx-auto w-full max-w-5xl">
        <p className="text-xs uppercase tracking-[0.4em] text-cyan-300/80">
          Demo FAQ Bot
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-white md:text-4xl">
          FAQ conversacional: respuestas claras y directas
        </h1>
        <p className="mt-4 max-w-2xl text-base text-slate-300">
          Demo UI sin IA. Respuestas predefinidas para guiar decisión de compra.
        </p>

        <div className="mt-8">
          <BotSimulator />
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Buscar pregunta"
            className="w-full rounded-full border border-white/10 bg-black/40 px-4 py-2 text-sm text-white outline-none focus:border-cyan-300 md:max-w-sm"
          />
          <button
            type="button"
            onClick={handleBack}
            className="rounded-full border border-white/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/80 transition hover:border-cyan-300/60"
            disabled={history.length === 0}
          >
            Atrás
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="rounded-full border border-white/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/80 transition hover:border-cyan-300/60"
          >
            Reiniciar demo
          </button>
        </div>

        <div className="mt-8 grid gap-4">
          {orderedFaqs.map((item) => {
            const isActive = activeId === item.id;
            return (
              <div
                key={item.id}
                ref={(node) => {
                  questionRefs.current[item.id] = node;
                }}
                className={`rounded-2xl border p-5 transition ${
                  isActive
                    ? "border-cyan-300 bg-cyan-400/10"
                    : "border-white/10 bg-black/55 hover:border-cyan-300/40"
                }`}
              >
                <button
                  type="button"
                  onClick={() => handleSelect(item.id)}
                  className="w-full text-left"
                >
                  <span className="text-[11px] uppercase tracking-[0.25em] text-cyan-200/70">
                    {item.category}
                  </span>
                  <p className="mt-2 text-base font-semibold text-white">
                    {item.question}
                  </p>
                </button>

                {isActive && (
                  <div className="mt-4 space-y-4">
                    <p className="text-sm text-slate-200">{item.answer}</p>
                    <div className="flex flex-wrap gap-2">
                      {quickReplies.map((reply) => (
                        <button
                          key={reply.label}
                          type="button"
                          onClick={() => handleSelect(reply.target)}
                          className="rounded-full border border-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-200 transition hover:border-cyan-300/60"
                        >
                          {reply.label}
                        </button>
                      ))}
                    </div>
                    <div className="flex flex-col gap-2 sm:flex-row">
                      <Link
                        href="/demos"
                        className="rounded-full border border-white/20 px-4 py-2 text-center text-xs font-semibold text-white/80 transition hover:border-cyan-300/60"
                      >
                        Ver demos
                      </Link>
                      <Link
                        href="/pricing"
                        className="rounded-full border border-white/20 px-4 py-2 text-center text-xs font-semibold text-white/80 transition hover:border-cyan-300/60"
                      >
                        Ver planes
                      </Link>
                      <a
                        href={whatsappLink}
                        className="rounded-full border border-emerald-300/60 px-4 py-2 text-center text-xs font-semibold text-emerald-200 transition hover:bg-emerald-300 hover:text-black"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Hablar por WhatsApp
                      </a>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div
          className="mt-8 flex flex-col gap-3 rounded-3xl border border-white/10 bg-black/60 p-6"
          data-fab-avoid
        >
          <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/80">
            CTA final
          </p>
          <p className="text-sm text-slate-300">
            ¿Listo para decidir? Te respondemos por WhatsApp o en una llamada.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href={whatsappLink}
              className="rounded-full bg-emerald-400 px-6 py-3 text-center text-sm font-semibold text-black transition hover:bg-emerald-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              Hablar por WhatsApp
            </a>
            <Link
              href="/contact?source=demos"
              className="rounded-full border border-white/20 px-6 py-3 text-center text-sm font-semibold text-white/80 transition hover:border-cyan-300/60"
            >
              Solicitar propuesta
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
