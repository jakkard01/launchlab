import Image from "next/image";
import { MO_STORE_HOURS_LABEL, MO_STORE_MAPS_URL } from "../../../lib/mo/config";

type MoLocalTrustProps = {
  onScrollToSpecial: () => void;
};

export default function MoLocalTrust({ onScrollToSpecial }: MoLocalTrustProps) {
  return (
    <section
      id="local-real"
      className="grid gap-4 rounded-3xl border border-default bg-surface px-4 py-4 shadow-sm dark:bg-[var(--surface-2)] dark:shadow-[0_18px_40px_rgba(3,8,16,0.2)] sm:grid-cols-[220px,1fr] sm:px-6 sm:py-5"
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-default bg-surface-3">
        <Image
          src="/imagenes/perfil/rysminisuper.jpeg"
          alt="Fachada del local RYS Minisúper en La Gloria"
          fill
          sizes="(max-width: 640px) 100vw, 220px"
          className="object-cover"
          priority
        />
      </div>
      <div className="flex flex-col justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--accent)]">
            Local real en La Gloria
          </p>
          <p className="mt-2 text-sm font-semibold text-main">
            Tienda de barrio, retiro fácil y confirmación antes de salir.
          </p>
          <p className="mt-2 text-sm text-muted-strong">
            {MO_STORE_HOURS_LABEL}. Si vas tarde o quieres varias cosas juntas, escríbenos y te confirmamos antes de que des la vuelta.
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <a
            href={MO_STORE_MAPS_URL}
            className="h-11 rounded-full border border-default bg-surface-3 px-4 py-2 text-center text-sm font-semibold text-main transition hover:border-[var(--accent)]/45 hover:text-[var(--accent)]"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ver ubicación
          </a>
          <button
            type="button"
            onClick={onScrollToSpecial}
            className="h-11 rounded-full border border-[var(--accent)]/40 bg-[color-mix(in_srgb,var(--accent)_10%,transparent)] px-4 py-2 text-center text-sm font-semibold text-main transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
          >
            Si no lo ves, pídelo
          </button>
        </div>
      </div>
    </section>
  );
}
