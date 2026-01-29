"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { buildWhatsappLink } from "../../lib/site";

const whatsappLink = buildWhatsappLink("demo_bot");

const faqData = [
  {
    category: "Precios",
    items: [
      {
        question: "Cuanto cuesta una demo basica?",
        answer:
          "Las demos basicas parten desde EUR 900 y se ajustan segun el alcance.",
      },
      {
        question: "Tienen paquetes mensuales?",
        answer:
          "Si, ofrecemos planes de mantenimiento para evolucion y soporte.",
      },
      {
        question: "Puedo empezar con un sprint corto?",
        answer:
          "Si, el Sprint IA es el punto de entrada para validar objetivos.",
      },
    ],
  },
  {
    category: "Plazos",
    items: [
      {
        question: "En cuanto tiempo entregan una demo?",
        answer:
          "Entre 7 y 14 dias, dependiendo de contenidos y validaciones.",
      },
      {
        question: "Puedo ver avances semanales?",
        answer:
          "Si, definimos checkpoints para revisar narrativa y flujo.",
      },
      {
        question: "Ofrecen soporte posterior?",
        answer:
          "Si, contamos con soporte continuo y mejoras por iteraciones.",
      },
    ],
  },
  {
    category: "Integraciones",
    items: [
      {
        question: "Se integra con WhatsApp?",
        answer:
          "Si, podemos conectar la demo a WhatsApp Business.",
      },
      {
        question: "Puedo conectar mi CRM?",
        answer:
          "Si, revisamos tu stack y definimos la integracion adecuada.",
      },
      {
        question: "Necesito APIs propias?",
        answer:
          "No es obligatorio, pero ayuda si quieres flujos avanzados.",
      },
    ],
  },
  {
    category: "Soporte",
    items: [
      {
        question: "Incluye capacitacion?",
        answer:
          "Si, dejamos guias de uso y soporte inicial para tu equipo.",
      },
      {
        question: "Puedo pedir cambios luego?",
        answer:
          "Claro, trabajamos por iteraciones para ajustar el producto.",
      },
      {
        question: "Quien da el soporte?",
        answer:
          "Nuestro equipo tecnico responde en horario laboral.",
      },
    ],
  },
];

const categories = ["Todos", ...faqData.map((section) => section.category)];

export default function DemoBotPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Todos");
  const [activeQuestion, setActiveQuestion] = useState<{
    question: string;
    answer: string;
    category: string;
  } | null>(null);

  const filteredQuestions = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return faqData
      .filter((section) => category === "Todos" || section.category === category)
      .flatMap((section) =>
        section.items.map((item) => ({ ...item, category: section.category }))
      )
      .filter((item) =>
        normalizedSearch
          ? item.question.toLowerCase().includes(normalizedSearch)
          : true
      );
  }, [search, category]);

  return (
    <main className="min-h-screen w-full px-4 pb-20 pt-28 sm:px-6 lg:px-8">
      <section className="mx-auto w-full max-w-6xl">
        <p className="text-xs uppercase tracking-[0.4em] text-cyan-300/80">
          Demo FAQ Bot
        </p>
        <h1 className="mt-3 text-4xl font-semibold text-white">
          Bot determinista: respuestas claras y guiadas
        </h1>
        <p className="mt-4 max-w-2xl text-base text-slate-300">
          Demo sin IA. Todas las respuestas estan predefinidas para asegurar un
          mensaje coherente.
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl border border-white/10 bg-black/60 p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Buscar pregunta"
                className="w-full rounded-full border border-white/10 bg-black/40 px-4 py-2 text-sm text-white outline-none focus:border-cyan-300"
              />
              <Link
                href="/contact?source=demos"
                className="rounded-full border border-white/20 px-5 py-2 text-center text-sm font-semibold text-white/80 transition hover:border-cyan-300/60"
              >
                Reservar llamada
              </Link>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {categories.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setCategory(item)}
                  className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] transition ${
                    category === item
                      ? "border-cyan-300 bg-cyan-400 text-black"
                      : "border-white/15 text-slate-200 hover:border-cyan-300/60"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            <div className="mt-6 grid gap-3">
              {filteredQuestions.map((item) => (
                <button
                  key={item.question}
                  type="button"
                  onClick={() => setActiveQuestion(item)}
                  className={`rounded-2xl border px-4 py-3 text-left text-sm transition ${
                    activeQuestion?.question === item.question
                      ? "border-cyan-300 bg-cyan-400/10 text-white"
                      : "border-white/10 bg-black/40 text-slate-300 hover:border-cyan-300/40"
                  }`}
                >
                  <span className="text-[11px] uppercase tracking-[0.25em] text-cyan-200/70">
                    {item.category}
                  </span>
                  <p className="mt-2 text-sm font-semibold text-white">
                    {item.question}
                  </p>
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-black/60 p-6">
            <p className="text-xs uppercase tracking-[0.4em] text-cyan-300/80">
              Respuesta
            </p>
            {activeQuestion ? (
              <div className="mt-4 space-y-4">
                <p className="text-lg font-semibold text-white">
                  {activeQuestion.question}
                </p>
                <p className="text-sm text-slate-300">
                  {activeQuestion.answer}
                </p>
                <div className="flex flex-col gap-3">
                  <a
                    href={whatsappLink}
                    className="rounded-full bg-emerald-400 px-6 py-3 text-center text-sm font-semibold text-black transition hover:bg-emerald-300"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Hablar por WhatsApp
                  </a>
                  <Link
                    href="/contact?source=demos"
                    className="rounded-full border border-white/20 px-6 py-3 text-center text-sm font-semibold text-white/80 transition hover:border-cyan-300/60"
                  >
                    Enviar formulario
                  </Link>
                </div>
              </div>
            ) : (
              <p className="mt-4 text-sm text-slate-300">
                Selecciona una pregunta para ver la respuesta predefinida.
              </p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
