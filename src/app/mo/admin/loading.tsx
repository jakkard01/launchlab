export default function MoAdminLoading() {
  return (
    <main className="min-h-screen px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-4">
        <div className="rounded-3xl border border-white/10 bg-white/5 px-6 py-6">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-emerald-200/80">
            RYS admin
          </p>
          <h1 className="mt-2 text-2xl font-semibold text-white">
            Cargando panel
          </h1>
          <p className="mt-2 text-sm text-slate-300">
            Estamos validando la sesión y leyendo la hoja viva.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="h-28 animate-pulse rounded-3xl border border-white/10 bg-white/5"
            />
          ))}
        </div>
      </div>
    </main>
  );
}
