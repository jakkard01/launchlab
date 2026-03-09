"use client";

import { useState } from "react";
import { trackEvent } from "../../lib/analytics";

type ContactFormProps = {
  source: string;
};

type FormState = "idle" | "loading" | "success" | "error";

type ApiResponse = {
  ok: boolean;
  code?: string;
  message?: string;
  hint?: string;
  leadId?: string;
  retryAfterSeconds?: number;
};

export default function ContactForm({ source }: ContactFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [companyWebsite, setCompanyWebsite] = useState("");
  const [status, setStatus] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [errorHint, setErrorHint] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [leadId, setLeadId] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setErrorMessage(null);
    setErrorHint(null);
    setSuccessMessage(null);
    setLeadId(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          message,
          source,
          companyWebsite,
        }),
      });

      const data = (await response.json()) as ApiResponse;

      if (response.status === 429) {
        setStatus("error");
        setErrorMessage(data.message ?? "Demasiadas solicitudes.");
        setErrorHint(
          data.hint ??
            (data.retryAfterSeconds
              ? `Espera ${data.retryAfterSeconds}s antes de reenviar.`
              : "Espera un momento antes de reenviar.")
        );
        trackEvent("contact_submit_429", { source });
        return;
      }

      if (!response.ok || !data.ok) {
        setStatus("error");
        setErrorMessage(data.message ?? "No pudimos enviar el mensaje.");
        setErrorHint(data.hint ?? null);
        trackEvent("contact_submit_error", { source });
        return;
      }

      setStatus("success");
      trackEvent("contact_submit_ok", { source });
      setSuccessMessage(
        data.message ??
          "Solicitud registrada. Para atención directa, continúa por WhatsApp."
      );
      setLeadId(data.leadId ?? null);
      setName("");
      setEmail("");
      setMessage("");
      setCompanyWebsite("");
    } catch (error) {
      setStatus("error");
      setErrorMessage("No pudimos enviar el mensaje.");
      setErrorHint("Parece un problema técnico temporal. Reintenta o usa WhatsApp.");
      trackEvent("contact_submit_error", { source });
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-5">
      <div className="grid gap-5 md:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200/70">
            Nombre
          </label>
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
            minLength={2}
            placeholder="Tu nombre"
            className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none focus:border-cyan-300"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200/70">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            placeholder="tucorreo@empresa.com"
            className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none focus:border-cyan-300"
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200/70">
          Mensaje
        </label>
        <textarea
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          required
          minLength={8}
          rows={5}
          placeholder="Cuentanos que necesitas y objetivos principales"
          className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none focus:border-cyan-300"
        />
        <p className="text-xs text-slate-400">
          Un mensaje humano normal como “hola, soy Gerry y quiero una web” ya debería pasar.
        </p>
      </div>

      <div className="hidden" aria-hidden="true">
        <label htmlFor="company-website">Website</label>
        <input
          id="company-website"
          name="companyWebsite"
          tabIndex={-1}
          autoComplete="off"
          value={companyWebsite}
          onChange={(event) => setCompanyWebsite(event.target.value)}
        />
      </div>

      {status === "success" && (
        <div className="rounded-2xl border border-amber-400/40 bg-amber-400/10 px-4 py-3 text-sm text-amber-100">
          {successMessage ??
            "Solicitud registrada. Para asegurar atención, escríbenos por WhatsApp."}
          {leadId ? (
            <p className="mt-2 text-xs uppercase tracking-[0.2em] text-amber-200/80">
              Ref: {leadId}
            </p>
          ) : null}
        </div>
      )}
      {status === "error" && (
        <div className="rounded-2xl border border-red-400/40 bg-red-400/10 px-4 py-3 text-sm text-red-200">
          <p>{errorMessage ?? "No pudimos enviar el mensaje."}</p>
          {errorHint ? <p className="mt-2 text-red-100/80">{errorHint}</p> : null}
        </div>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full rounded-full bg-cyan-400 px-6 py-3 text-center text-sm font-semibold text-black transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "loading" ? "Enviando..." : "Enviar mensaje"}
      </button>
      <p className="text-xs text-slate-400">
        Protección activa: rate limit suave + heurística básica anti-spam. Si falla la entrega, te lo mostraremos aparte.
      </p>
    </form>
  );
}
