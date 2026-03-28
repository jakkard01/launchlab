"use client";

export default function MoAdminError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="min-h-screen px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-2xl rounded-3xl border border-rose-200/20 bg-slate-900 px-6 py-8 shadow-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-200/80">
          RYS admin
        </p>
        <h1 className="mt-3 text-2xl font-semibold text-white">
          No pudimos cargar el panel
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-slate-300">
          La sesión puede seguir activa, pero no se pudieron leer los datos del panel en
          este momento.
        </p>
        <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-300">
          Reintenta primero. Si sigue igual, vuelve al acceso y entra otra vez.
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={reset}
            className="inline-flex h-11 items-center justify-center rounded-full bg-emerald-500 px-5 text-sm font-semibold text-slate-950"
          >
            Reintenta
          </button>
          <a
            href="/admin/acceso"
            className="inline-flex h-11 items-center justify-center rounded-full border border-white/15 px-5 text-sm font-semibold text-white"
          >
            Volver al acceso
          </a>
        </div>
      </div>
    </main>
  );
}
