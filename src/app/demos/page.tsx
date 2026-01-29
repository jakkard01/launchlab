import type { Metadata } from "next";
import Link from "next/link";
import ShowcaseGrid from "./ShowcaseGrid";
import { showcase } from "../content/showcase";
import { site } from "../../lib/site";

export const metadata: Metadata = {
  title: "Demos | Powered by IA",
  description: "Showcase de demos Powered by IA y productos listos para activar.",
  openGraph: {
    title: "Demos | Powered by IA",
    description:
      "Showcase de demos Powered by IA y productos listos para activar.",
    images: [{ url: site.ogImage, alt: site.ogAlt }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Demos | Powered by IA",
    description:
      "Showcase de demos Powered by IA y productos listos para activar.",
    images: [site.ogImage],
  },
};

export default function DemosPage() {
  return (
    <main className="min-h-screen w-full px-4 pb-20 pt-28 sm:px-6 lg:px-8">
      <section className="mx-auto w-full max-w-6xl">
        <p className="text-xs uppercase tracking-[0.4em] text-cyan-300/80">
          Demos
        </p>
        <h1 className="mt-3 text-4xl font-semibold text-white">
          Demos Powered by IA para validar y vender
        </h1>
        <p className="mt-4 max-w-2xl text-base text-slate-300">
          Activos reales para validar, vender y escalar sin rehacer la base.
        </p>

        <ShowcaseGrid items={showcase} />

        <div className="mt-14 flex flex-col gap-4 rounded-3xl border border-cyan-400/30 bg-black/70 p-8 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-white">
              Quieres activar una demo?
            </h2>
            <p className="mt-2 text-sm text-slate-300">
              Te ayudamos a personalizarla para tu negocio.
            </p>
          </div>
          <Link
            href="/contact?source=demos"
            className="rounded-full bg-cyan-400 px-6 py-3 text-center text-sm font-semibold text-black transition hover:bg-cyan-300"
          >
            Reservar llamada
          </Link>
        </div>
      </section>
    </main>
  );
}
