export default function MoAdminAccessPage() {
  return (
    <main className="min-h-screen w-full bg-base px-4 pb-20 pt-12 text-main sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-lg rounded-3xl border border-default bg-surface px-6 py-8 shadow-sm">
        <p className="text-xs uppercase tracking-[0.3em] text-[var(--accent)]">
          Acceso admin
        </p>
        <h1 className="mt-3 text-2xl font-semibold text-main">
          Panel restringido
        </h1>
        <p className="mt-2 text-sm text-muted">
          Este panel es solo para administracion. Si necesitas acceso, pedilo al
          responsable.
        </p>
        <a
          href="/RYSminisuper"
          className="mt-6 inline-flex h-11 items-center justify-center rounded-full border border-default px-5 text-sm font-semibold text-main transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
        >
          Volver a la tienda
        </a>
      </div>
    </main>
  );
}
