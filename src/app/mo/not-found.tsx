import Link from "next/link";

export default function MoNotFound() {
  return (
    <main className="min-h-screen w-full bg-slate-950 px-4 pb-20 pt-20 text-slate-100 sm:px-6 lg:px-8">
      <section className="mx-auto w-full max-w-3xl rounded-3xl border border-white/10 bg-white/5 p-8 text-center shadow-xl">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-200/80">
          RYS admin
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-white">
          Esta ruta no existe
        </h1>
        <p className="mt-3 text-sm text-slate-300">
          Vuelve al acceso o al panel de RYS. Aquí no usamos páginas públicas de otra marca.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/admin/acceso"
            className="rounded-full bg-emerald-300 px-6 py-3 text-sm font-semibold text-[#08110c]"
          >
            Ir a acceso
          </Link>
          <Link
            href="/admin"
            className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white/90"
          >
            Ir al panel
          </Link>
        </div>
      </section>
    </main>
  );
}
