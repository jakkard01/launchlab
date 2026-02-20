export default function MoAdminAccessPage() {
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
          Este panel es solo para administracion. Si necesitas acceso, pedilo al
          responsable.
        </p>
        <p className="mt-3 text-xs text-slate-500">
          Acceso con PIN o password via URL (pin/password) y cookie segura.
        </p>
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
