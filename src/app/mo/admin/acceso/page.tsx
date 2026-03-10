"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function MoAdminAccessPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/mo/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      const data = (await response.json()) as { ok?: boolean; message?: string };

      if (!response.ok || !data.ok) {
        if (response.status === 401) {
          setError("Clave incorrecta. Verifica la clave admin e intenta de nuevo.");
        } else if (response.status === 403) {
          setError("Acceso denegado. El panel admin no está habilitado.");
        } else {
          setError(data.message ?? "No se pudo iniciar sesión.");
        }
        return;
      }

      router.push("/RYSminisuper/admin");
      router.refresh();
    } catch {
      setError("No se pudo iniciar sesión.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen w-full px-4 pb-20 pt-12 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-lg rounded-3xl border border-slate-200 bg-white px-6 py-8 shadow-sm">
        <p className="text-xs uppercase tracking-[0.3em] text-emerald-600">
          Acceso admin
        </p>
        <h1 className="mt-3 text-2xl font-semibold text-slate-900">
          Panel restringido
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Este panel es solo para administracion. Ingresa la clave para abrir el
          panel operativo de la tienda.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <label className="block text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            Clave admin
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              disabled={submitting}
              className="h-12 w-full rounded-2xl border border-slate-200 px-4 pr-24 text-sm text-slate-900 outline-none focus:border-emerald-400"
              placeholder="Ingresa la clave"
              autoComplete="current-password"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((value) => !value)}
              disabled={submitting}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600 transition hover:border-emerald-300 hover:text-emerald-700"
              aria-label={showPassword ? "Ocultar clave" : "Mostrar clave"}
            >
              {showPassword ? "Ocultar" : "Mostrar"}
            </button>
          </div>
          <p aria-live="polite" className="text-xs text-slate-500">
            {submitting
              ? "Validando acceso..."
              : "Si la clave está bien, entrarás directo al panel."}
          </p>
          {error ? (
            <p aria-live="assertive" className="text-sm text-rose-600">
              {error}
            </p>
          ) : null}
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex h-11 items-center justify-center rounded-full bg-emerald-600 px-5 text-sm font-semibold text-white transition hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {submitting ? "Entrando..." : "Entrar al admin"}
          </button>
        </form>

        <a
          href="/RYSminisuper"
          className="mt-6 inline-flex h-11 items-center justify-center rounded-full border border-slate-200 px-5 text-sm font-semibold text-slate-600 transition hover:border-emerald-300 hover:text-emerald-700"
        >
          Volver a la tienda
        </a>
      </div>
    </main>
  );
}
