"use client";

import { useEffect, useRef, useState } from "react";

export type ChatVariant = "web" | "whatsapp";

export type ChatStep = {
  id: string;
  prompt: string;
  type: "input" | "options";
  key?: string;
  placeholder?: string;
  options?: string[];
  response?: (value: string, context: Record<string, string>) => string;
  next?: string | null;
};

type ChatSimulatorProps = {
  variant: ChatVariant;
  title: string;
  subtitle?: string;
  steps: ChatStep[];
  ctaLabel: string;
  ctaHref: string;
  autoDemoDefaults: Record<string, string>;
};

const buildId = () => Math.random().toString(36).slice(2, 10);

export default function ChatSimulator({
  variant,
  title,
  subtitle,
  steps,
  ctaLabel,
  ctaHref,
  autoDemoDefaults,
}: ChatSimulatorProps) {
  const [messages, setMessages] = useState<
    Array<{ id: string; role: "bot" | "user"; text: string }>
  >([]);
  const [currentStepId, setCurrentStepId] = useState(steps[0]?.id ?? "");
  const [typing, setTyping] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [context, setContext] = useState<Record<string, string>>({});
  const [autoRunning, setAutoRunning] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);
  const timersRef = useRef<number[]>([]);

  const currentStep = steps.find((step) => step.id === currentStepId) ?? null;

  useEffect(() => {
    if (!currentStep) return;
    setMessages([{ id: buildId(), role: "bot", text: currentStep.prompt }]);
  }, [currentStep]);

  useEffect(() => {
    if (!chatRef.current) return;
    chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages, typing]);

  const clearTimers = () => {
    timersRef.current.forEach((timer) => window.clearTimeout(timer));
    timersRef.current = [];
  };

  const reset = () => {
    clearTimers();
    setAutoRunning(false);
    setMessages([]);
    setContext({});
    setInputValue("");
    setCurrentStepId(steps[0]?.id ?? "");
    if (steps[0]) {
      setMessages([{ id: buildId(), role: "bot", text: steps[0].prompt }]);
    }
  };

  const pushBot = (text: string, delay = 900) => {
    setTyping(true);
    const timer = window.setTimeout(() => {
      setMessages((prev) => [...prev, { id: buildId(), role: "bot", text }]);
      setTyping(false);
    }, delay);
    timersRef.current.push(timer);
  };

  const advance = (value: string) => {
    if (!currentStep) return;
    setMessages((prev) => [
      ...prev,
      { id: buildId(), role: "user", text: value },
    ]);
    const nextContext = { ...context };
    if (currentStep.key) nextContext[currentStep.key] = value;
    setContext(nextContext);

    if (currentStep.response) {
      const responseText = currentStep.response(value, nextContext);
      pushBot(responseText);
    }

    const nextId = currentStep.next;
    if (nextId) {
      const nextStep = steps.find((step) => step.id === nextId);
      if (nextStep) {
        const timer = window.setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            { id: buildId(), role: "bot", text: nextStep.prompt },
          ]);
          setCurrentStepId(nextId);
        }, 1100);
        timersRef.current.push(timer);
      }
    } else {
      setCurrentStepId("");
    }
  };

  const handleSubmit = () => {
    const trimmed = inputValue.trim();
    if (!trimmed) return;
    setInputValue("");
    advance(trimmed);
  };

  const runAutoDemo = () => {
    reset();
    setAutoRunning(true);
    let delay = 600;
    let stepId = steps[0]?.id ?? "";

    steps.forEach((step) => {
      const value = autoDemoDefaults[step.id] ?? step.options?.[0] ?? "";
      if (!value) return;
      delay += 700;
      const userTimer = window.setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { id: buildId(), role: "user", text: value },
        ]);
      }, delay);
      timersRef.current.push(userTimer);
      delay += 900;
      const botTimer = window.setTimeout(() => {
        if (step.response) {
          const responseText = step.response(value, {
            ...context,
            [step.key ?? ""]: value,
          });
          setMessages((prev) => [
            ...prev,
            { id: buildId(), role: "bot", text: responseText },
          ]);
        }
        if (step.next) {
          const nextStep = steps.find((next) => next.id === step.next);
          if (nextStep) {
            setMessages((prev) => [
              ...prev,
              { id: buildId(), role: "bot", text: nextStep.prompt },
            ]);
          }
        }
      }, delay);
      timersRef.current.push(botTimer);
      stepId = step.next ?? "";
    });

    const finishTimer = window.setTimeout(() => {
      setCurrentStepId(stepId);
      setAutoRunning(false);
    }, delay + 200);
    timersRef.current.push(finishTimer);
  };

  const isWhatsapp = variant === "whatsapp";

  return (
    <section
      className={
        isWhatsapp
          ? "rounded-3xl border border-emerald-300/30 bg-white p-6 shadow-xl"
          : "rounded-3xl border border-cyan-400/30 bg-black/70 p-6 shadow-xl"
      }
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p
            className={
              isWhatsapp
                ? "text-xs uppercase tracking-[0.3em] text-emerald-600"
                : "text-xs uppercase tracking-[0.3em] text-cyan-200/80"
            }
          >
            {title}
          </p>
          {subtitle ? (
            <h2
              className={
                isWhatsapp
                  ? "mt-2 text-2xl font-semibold text-slate-900"
                  : "mt-2 text-2xl font-semibold text-white"
              }
            >
              {subtitle}
            </h2>
          ) : null}
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={runAutoDemo}
            className={
              isWhatsapp
                ? "rounded-full border border-emerald-200 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700"
                : "rounded-full border border-white/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/80"
            }
            disabled={autoRunning}
          >
            Auto demo
          </button>
          <button
            type="button"
            onClick={reset}
            className={
              isWhatsapp
                ? "rounded-full border border-emerald-200/60 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700"
                : "rounded-full border border-white/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/80"
            }
          >
            Reiniciar
          </button>
        </div>
      </div>

      <div
        ref={chatRef}
        className={
          isWhatsapp
            ? "mt-6 max-h-[420px] space-y-3 overflow-y-auto rounded-2xl border border-emerald-200/50 bg-emerald-50 p-4"
            : "mt-6 max-h-[420px] space-y-3 overflow-y-auto rounded-2xl border border-white/10 bg-black/70 p-4"
        }
      >
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={
                message.role === "user"
                  ? isWhatsapp
                    ? "max-w-[80%] rounded-2xl bg-emerald-500 px-4 py-3 text-sm text-white"
                    : "max-w-[80%] rounded-2xl bg-cyan-400 px-4 py-3 text-sm text-black"
                  : isWhatsapp
                    ? "max-w-[80%] rounded-2xl bg-white px-4 py-3 text-sm text-slate-800 shadow-sm"
                    : "max-w-[80%] rounded-2xl bg-white/10 px-4 py-3 text-sm text-slate-200"
              }
            >
              {message.text}
              {isWhatsapp && message.role === "bot" ? (
                <span className="ml-2 text-xs text-emerald-500">✓✓</span>
              ) : null}
            </div>
          </div>
        ))}
        {typing ? (
          <div className="flex justify-start">
            <div
              className={
                isWhatsapp
                  ? "rounded-2xl bg-white px-4 py-3 text-sm text-slate-500"
                  : "rounded-2xl bg-white/10 px-4 py-3 text-sm text-slate-300"
              }
            >
              Escribiendo...
            </div>
          </div>
        ) : null}
      </div>

      {currentStep?.type === "input" ? (
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
          <input
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            placeholder={currentStep.placeholder ?? ""}
            className={
              isWhatsapp
                ? "w-full rounded-full border border-emerald-200 bg-white px-4 py-2 text-sm text-slate-800 outline-none"
                : "w-full rounded-full border border-white/10 bg-black/40 px-4 py-2 text-sm text-white outline-none"
            }
          />
          <button
            type="button"
            onClick={handleSubmit}
            className={
              isWhatsapp
                ? "rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-white"
                : "rounded-full bg-cyan-500 px-4 py-2 text-sm font-semibold text-black"
            }
          >
            Enviar
          </button>
        </div>
      ) : null}

      {currentStep?.type === "options" && currentStep.options ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {currentStep.options.slice(0, 2).map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => advance(option)}
              className={
                isWhatsapp
                  ? "rounded-full border border-emerald-200 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700"
                  : "rounded-full border border-white/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/80"
              }
            >
              {option}
            </button>
          ))}
        </div>
      ) : null}

      {!currentStep && (
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <a
            href={ctaHref}
            target="_blank"
            rel="noopener noreferrer"
            className={
              isWhatsapp
                ? "rounded-full bg-emerald-500 px-6 py-3 text-center text-xs font-semibold uppercase tracking-[0.2em] text-white"
                : "rounded-full bg-emerald-400 px-6 py-3 text-center text-xs font-semibold uppercase tracking-[0.2em] text-black"
            }
          >
            {ctaLabel}
          </a>
        </div>
      )}
    </section>
  );
}
