"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { buildWhatsappLink } from "../../../lib/site";

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
    id: "web_offer",
    category: "Web",
    question: "Quiero una web: ¿qué entregan?",
    answer:
      "Landing o sitio completo con diseño premium, SEO base, performance y panel de edición. Alcance y páginas definidos por plan.",
  },
  {
    id: "timeline",
    category: "Plazos",
    question: "¿Cuánto tarda?",
    answer:
      "Depende del producto. Video Packs: producción semanal. Doblaje: 48-72h por pieza. n8n Ops: 1-3 semanas según complejidad. Bot: 1-3 semanas según canales.",
  },
  {
    id: "includes_excludes",
    category: "Scope",
    question: "¿Qué incluye y qué NO incluye?",
    answer:
      "Incluimos entregables y revisiones definidas en cada pack. No incluye cambios de concepto fuera de scope, grabaciones presenciales, ni licencias de terceros.",
  },
  {
    id: "revisions",
    category: "Scope",
    question: "¿Cuántas revisiones tengo?",
    answer:
      "2 revisiones por pieza en Video Packs. En Doblaje, 1 pase de corrección de timing/texto. Cambios de guion/concepto cuentan como nueva pieza.",
  },
  {
    id: "more_scope",
    category: "Upgrades",
    question: "¿Qué pasa si quiero más?",
    answer:
      "Podemos ampliar volumen, formatos o idiomas con add-ons. Se cotiza por unidad extra o por upgrade de pack.",
  },
  {
    id: "languages",
    category: "Doblaje",
    question: "¿Soportan cualquier idioma?",
    answer:
      "Sí. Incluimos 2 idiomas por defecto (demo EN + DE). Idiomas extra disponibles como add-on.",
  },
  {
    id: "whatsapp_channels",
    category: "Bots",
    question: "¿WhatsApp API o web?",
    answer:
      "Soportamos Web widget y WhatsApp Cloud API. Otros canales son bajo pedido.",
  },
  {
    id: "crm",
    category: "n8n Ops",
    question: "¿Integran CRM?",
    answer:
      "Sí, con integraciones simples (1-2 sistemas) o complejas (3+ sistemas, ERP/CRM custom, logs y retries).",
  },
  {
    id: "support",
    category: "Soporte",
    question: "¿Qué soporte ofrecen?",
    answer:
      "Soporte estándar en horario laboral y handoff documentado. En packs Pro, soporte prioritario y ventanas de respuesta más cortas.",
  },
  {
    id: "pricing_logic",
    category: "Pricing",
    question: "¿Cómo se calculan los precios?",
    answer:
      "Por volumen, duración, formatos y complejidad. Todos los precios son “desde” con límites claros.",
  },
  {
    id: "video_packs",
    category: "Video Packs",
    question: "Quiero Video Packs: ¿qué entregan?",
    answer:
      "Producción mensual con guion, edición y subtítulos. Hasta 45s por video, 2 revisiones, formatos según pack.",
  },
  {
    id: "dubbing",
    category: "Doblaje",
    question: "Quiero Doblaje: ¿qué entregan?",
    answer:
      "Voiceover + subtítulos pro. Lip-sync básico solo talking head. Lip-sync avanzado es add-on.",
  },
  {
    id: "ops",
    category: "n8n Ops",
    question: "Quiero n8n Ops: ¿qué entregan?",
    answer:
      "Flujos n8n con requisitos definidos, QA, documentación y handoff. Complejidad determina el rango de precio.",
  },
  {
    id: "bot",
    category: "Bots",
    question: "Quiero un Bot: ¿qué entregan?",
    answer:
      "Bot con intents y flows definidos, handoff humano y analítica básica. Canales: web widget y WhatsApp Cloud API.",
  },
  {
    id: "super_pack",
    category: "Super Pack",
    question: "¿Qué incluye el Super Pack?",
    answer:
      "8 videos/mes (≤45s, 2 formatos) + 2 flujos n8n/mes + 1 bot (≤15 intents + handoff) + 2 doblajes/mes (2 idiomas).",
  },
];

const quickReplies = [
  { label: "Quiero una web", target: "web_offer" },
  { label: "Quiero automatizar (n8n)", target: "ops" },
  { label: "Quiero video/doblaje", target: "video_packs" },
  { label: "Quiero un bot", target: "bot" },
  { label: "Super Pack", target: "super_pack" },
  { label: "Hablar por WhatsApp", target: "start_needs" },
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
              Reservar llamada
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
