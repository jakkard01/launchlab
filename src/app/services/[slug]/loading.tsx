export default function ServiceLoading() {
  return (
    <main className="min-h-screen w-full px-4 pb-20 pt-28 sm:px-6 lg:px-8">
      <section className="mx-auto w-full max-w-5xl">
        <div className="rounded-3xl border border-white/10 bg-black/60 p-8 shadow-xl">
          <div className="h-6 w-32 animate-pulse rounded-full bg-white/10" />
          <div className="mt-4 h-8 w-2/3 animate-pulse rounded-full bg-white/10" />
          <div className="mt-3 h-4 w-full animate-pulse rounded-full bg-white/5" />
        </div>
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="h-40 rounded-3xl border border-white/10 bg-black/50"
            />
          ))}
        </div>
      </section>
    </main>
  );
}
