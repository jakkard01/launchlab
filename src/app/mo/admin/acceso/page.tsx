"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function MoAdminAccessPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [statusNote, setStatusNote] = useState(
    "Escribe la clave y toca entrar. Si la clave es correcta, pasarás al panel."
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setError(null);
    setStatusNote("Validando clave admin...");

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
          setStatusNote("La clave no fue aceptada. Corrígela e intenta de nuevo.");
        } else if (response.status === 403) {
          setError("Acceso denegado. El panel admin no está habilitado.");
          setStatusNote("El acceso está bloqueado porque el admin está deshabilitado.");
        } else if (response.status === 503) {
          setError("El admin no tiene credenciales configuradas en este entorno.");
          setStatusNote(
            "La pantalla de acceso responde, pero este entorno no tiene la clave configurada."
          );
        } else {
          setError(data.message ?? "No se pudo iniciar sesión.");
          setStatusNote(
            "La clave pudo enviarse, pero el acceso no se completó. Revisa el mensaje."
          );
        }
        return;
      }

      setStatusNote("Clave correcta. Abriendo el panel...");
      router.push("/RYSminisuper/admin");
      router.refresh();
    } catch {
      setError("No se pudo iniciar sesión.");
      setStatusNote(
        "Falló la conexión al validar la clave. Esto es distinto a una clave incorrecta."
      );
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
        <div className="mt-4 rounded-2xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-xs text-emerald-900">
          En móvil: escribe la clave, toca entrar y espera unos segundos. Si la
          clave falla, verás el error aquí mismo. Si la clave entra pero luego no
          carga la hoja, el siguiente paso te lo dirá dentro del panel.
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="space-y-2">
            <label className="block text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Clave admin
            </label>
            <p className="text-xs text-slate-500">
              Usa la misma clave corta que se utiliza para abrir el panel de operación.
            </p>
          </div>
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
          <div
            aria-live="polite"
            className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs text-slate-600"
          >
            {statusNote}
          </div>
          <div className="grid gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-4 text-xs text-slate-600">
            <p className="font-semibold text-slate-800">Qué significa cada caso</p>
            <p>Clave incorrecta: la clave no fue aceptada.</p>
            <p>
              Error de carga después: la clave sí entró, pero el panel no pudo leer datos o la sesión no quedó activa.
            </p>
          </div>
          {error ? (
            <p
              aria-live="assertive"
              className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700"
            >
              {error}
            </p>
          ) : null}
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex h-12 w-full items-center justify-center rounded-full bg-emerald-600 px-5 text-sm font-semibold text-white transition hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {submitting ? "Entrando..." : "Entrar al admin"}
          </button>
        </form>

        <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-600">
          <p className="font-semibold text-slate-800">Qué deberías ver</p>
          <p className="mt-1">
            Si la clave está bien, entras al panel. Si luego falla la carga, el
            panel te dirá si faltan datos de la hoja, si la sesión no quedó activa
            o si hay un problema de conexión.
          </p>
        </div>

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
