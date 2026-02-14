"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { buildWhatsappLink } from "../../../lib/site";

type Role = "bot" | "user";

type Message = {
  id: string;
  role: Role;
  text: string;
};

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

const buildId = () => Math.random().toString(36).slice(2, 10);

export default function FaqChatDemo() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [typing, setTyping] = useState(false);
  const [lastAnswerId, setLastAnswerId] = useState<string | null>(null);
  const chatRef = useRef<HTMLDivElement>(null);

  const whatsappLink = useMemo(() => buildWhatsappLink("demo_bot"), []);

  useEffect(() => {
    if (!chatRef.current) return;
    chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages, typing]);

  const handleSelectQuestion = (item: FaqItem) => {
    if (typing) return;
    setMessages((prev) => [
      ...prev,
      { id: buildId(), role: "user", text: item.question },
    ]);
    setTyping(true);
    setLastAnswerId(item.id);
    window.setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: buildId(), role: "bot", text: item.answer },
      ]);
      setTyping(false);
    }, 900);
  };

  const handleReset = () => {
    setMessages([]);
    setTyping(false);
    setLastAnswerId(null);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="rounded-3xl border border-white/10 bg-black/65 p-6 shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/80">
              Conversación
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-white">
              Habla con el bot demo
            </h2>
          </div>
          <button
            type="button"
            onClick={handleReset}
            className="rounded-full border border-white/20 px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/80 transition hover:border-cyan-300/60"
          >
            Reiniciar demo
          </button>
        </div>

        <div
          ref={chatRef}
          className="mt-6 max-h-[420px] space-y-3 overflow-y-auto rounded-2xl border border-white/10 bg-black/70 p-4"
        >
          {messages.length === 0 ? (
            <div className="rounded-2xl border border-white/10 bg-black/60 px-4 py-3 text-sm text-slate-300">
              Selecciona una pregunta para iniciar la conversación.
            </div>
          ) : null}
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm shadow-md ${
                  message.role === "user"
                    ? "bg-cyan-400 text-black"
                    : "bg-white/10 text-slate-200"
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}
          {typing ? (
            <div className="flex justify-start">
              <div className="rounded-2xl bg-white/10 px-4 py-3 text-sm text-slate-300">
                Escribiendo...
              </div>
            </div>
          ) : null}
        </div>

        {lastAnswerId ? (
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={handleReset}
              className="rounded-full border border-white/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-200 transition hover:border-cyan-300/60"
            >
              Otra pregunta
            </button>
            <a
              href={whatsappLink}
              className="rounded-full border border-emerald-300/60 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-200 transition hover:bg-emerald-300 hover:text-black"
              target="_blank"
              rel="noopener noreferrer"
            >
              Hablar por WhatsApp
            </a>
          </div>
        ) : null}
      </div>

      <div className="rounded-3xl border border-white/10 bg-black/60 p-6 shadow-xl">
        <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/80">
          Preguntas rápidas
        </p>
        <p className="mt-2 text-sm text-slate-300">
          Selecciona una pregunta para simular la conversación.
        </p>
        <div className="mt-5 flex flex-col gap-3">
          {faqData.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => handleSelectQuestion(item)}
              className="rounded-2xl border border-white/10 bg-black/70 px-4 py-3 text-left text-sm text-white transition hover:border-cyan-300/40"
            >
              <span className="text-[11px] uppercase tracking-[0.25em] text-cyan-200/70">
                {item.category}
              </span>
              <p className="mt-2 font-semibold">{item.question}</p>
            </button>
          ))}
        </div>

        <div className="mt-6 flex flex-col gap-3">
          <Link
            href="/pricing"
            className="rounded-full border border-white/20 px-4 py-2 text-center text-xs font-semibold text-white/80 transition hover:border-cyan-300/60"
          >
            Ver planes
          </Link>
          <Link
            href="/contact?source=demos"
            className="rounded-full border border-white/20 px-4 py-2 text-center text-xs font-semibold text-white/80 transition hover:border-cyan-300/60"
          >
            Reservar llamada
          </Link>
        </div>
      </div>
    </div>
  );
}
