"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { buildWhatsappLink } from "../../../lib/site";

type Role = "bot" | "user";

type Message = {
  id: string;
  role: Role;
  text: string;
};

type Step = "start" | "ask_name" | "ask_business" | "ask_goal" | "summary";

const businessOptions = [
  "Ecommerce",
  "Servicios",
  "Restaurante",
  "SaaS",
  "Negocio local",
];

const goalOptions = [
  "Más ventas",
  "Soporte 24/7",
  "Reservas",
  "Automatizar procesos",
];

const autoScript: Array<{ role: Role; text: string; delay: number }> = [
  { role: "bot", text: "Hola, soy el bot demo. ¿Cómo te llamas?", delay: 400 },
  { role: "user", text: "Sofía", delay: 700 },
  { role: "bot", text: "Genial, Sofía. ¿Qué tipo de negocio tienes?", delay: 700 },
  { role: "user", text: "Ecommerce", delay: 700 },
  { role: "bot", text: "Perfecto. ¿Cuál es el objetivo principal?", delay: 700 },
  { role: "user", text: "Más ventas", delay: 700 },
  {
    role: "bot",
    text: "Listo. Te dejo un resumen y el siguiente paso por WhatsApp.",
    delay: 700,
  },
];

const buildId = () => Math.random().toString(36).slice(2, 10);

export default function BotSimulator() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [step, setStep] = useState<Step>("start");
  const [name, setName] = useState("");
  const [business, setBusiness] = useState("");
  const [goal, setGoal] = useState("");
  const [autoRunning, setAutoRunning] = useState(false);
  const timersRef = useRef<number[]>([]);

  const whatsappMessage = useMemo(() => {
    const safeName = name.trim() || "Cliente";
    const safeBusiness = business || "negocio";
    const safeGoal = goal || "mejorar conversion";
    return `Hola, soy ${safeName}. Tengo un ${safeBusiness} y busco ${safeGoal}. Quiero una demo del bot.`;
  }, [name, business, goal]);

  const whatsappLink = useMemo(
    () => buildWhatsappLink("demo_bot_sim", whatsappMessage),
    [whatsappMessage]
  );

  const addMessage = (role: Role, text: string) => {
    setMessages((prev) => [...prev, { id: buildId(), role, text }]);
  };

  const resetFlow = () => {
    timersRef.current.forEach((timer) => window.clearTimeout(timer));
    timersRef.current = [];
    setAutoRunning(false);
    setMessages([]);
    setStep("start");
    setName("");
    setBusiness("");
    setGoal("");
  };

  const startFlow = () => {
    if (step !== "start") return;
    addMessage("bot", "Hola, soy el bot demo. ¿Cómo te llamas?");
    setStep("ask_name");
  };

  const handleNameSubmit = () => {
    const trimmed = name.trim();
    if (!trimmed) return;
    addMessage("user", trimmed);
    addMessage("bot", "Genial. ¿Qué tipo de negocio tienes?");
    setStep("ask_business");
  };

  const handleBusinessSelect = (value: string) => {
    setBusiness(value);
    addMessage("user", value);
    addMessage("bot", "Perfecto. ¿Cuál es el objetivo principal?");
    setStep("ask_goal");
  };

  const handleGoalSelect = (value: string) => {
    setGoal(value);
    addMessage("user", value);
    addMessage(
      "bot",
      "Listo. Te dejo un resumen y el siguiente paso por WhatsApp."
    );
    setStep("summary");
  };

  const runAutoDemo = () => {
    resetFlow();
    setAutoRunning(true);
    setStep("ask_name");
    autoScript.forEach((item, index) => {
      const timer = window.setTimeout(() => {
        addMessage(item.role, item.text);
        if (index === 1) setName("Sofía");
        if (index === 3) setBusiness("Ecommerce");
        if (index === 5) {
          setGoal("Más ventas");
          setStep("summary");
        }
        if (index === autoScript.length - 1) {
          setAutoRunning(false);
        }
      }, autoScript.slice(0, index + 1).reduce((acc, cur) => acc + cur.delay, 0));
      timersRef.current.push(timer);
    });
  };

  useEffect(() => {
    return () => {
      timersRef.current.forEach((timer) => window.clearTimeout(timer));
    };
  }, []);

  return (
    <section className="rounded-3xl border border-cyan-400/30 bg-black/70 p-6 shadow-xl">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-cyan-200/80">
            Simulador
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-white">
            Simula una conversación real
          </h2>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={startFlow}
            className="rounded-full border border-cyan-300/60 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-100 transition hover:bg-cyan-400 hover:text-black"
            disabled={step !== "start" || autoRunning}
          >
            Probar demo
          </button>
          <button
            type="button"
            onClick={runAutoDemo}
            className="rounded-full border border-white/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/80 transition hover:border-cyan-300/60"
            disabled={autoRunning}
          >
            Auto demo
          </button>
          <button
            type="button"
            onClick={resetFlow}
            className="rounded-full border border-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/60 transition hover:border-cyan-300/40"
          >
            Reiniciar
          </button>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        {messages.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-black/60 px-4 py-4 text-sm text-slate-300">
            Inicia el simulador para ver la conversación.
          </div>
        ) : (
          messages.map((message) => (
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
          ))
        )}
      </div>

      {step === "ask_name" && !autoRunning && (
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Tu nombre"
            className="w-full rounded-full border border-white/10 bg-black/40 px-4 py-2 text-sm text-white outline-none focus:border-cyan-300 sm:max-w-xs"
          />
          <button
            type="button"
            onClick={handleNameSubmit}
            className="rounded-full bg-cyan-500 px-4 py-2 text-sm font-semibold text-black transition hover:bg-cyan-400"
          >
            Continuar
          </button>
        </div>
      )}

      {step === "ask_business" && !autoRunning && (
        <div className="mt-6 flex flex-wrap gap-2">
          {businessOptions.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => handleBusinessSelect(option)}
              className="rounded-full border border-white/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/80 transition hover:border-cyan-300/60"
            >
              {option}
            </button>
          ))}
        </div>
      )}

      {step === "ask_goal" && !autoRunning && (
        <div className="mt-6 flex flex-wrap gap-2">
          {goalOptions.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => handleGoalSelect(option)}
              className="rounded-full border border-white/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/80 transition hover:border-cyan-300/60"
            >
              {option}
            </button>
          ))}
        </div>
      )}

      {step === "summary" && (
        <div className="mt-8 rounded-2xl border border-emerald-300/30 bg-emerald-400/10 px-4 py-4 text-sm text-emerald-100">
          <p className="text-xs uppercase tracking-[0.3em] text-emerald-200/80">
            Resumen del caso
          </p>
          <p className="mt-2">
            {name || "Cliente"} · {business || "negocio"} · {goal || "objetivo"}
          </p>
          <a
            href={whatsappLink}
            className="mt-4 inline-flex rounded-full bg-emerald-400 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-black transition hover:bg-emerald-300"
            target="_blank"
            rel="noopener noreferrer"
          >
            Hablar por WhatsApp
          </a>
        </div>
      )}
    </section>
  );
}
