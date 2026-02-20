"use client";

import { useState } from "react";
import Link from "next/link";

type WebVideoCardProps = {
  whatsappLink: string;
};

export default function WebVideoCard({ whatsappLink }: WebVideoCardProps) {
  const [hasError, setHasError] = useState(false);

  return (
    <div className="relative rounded-2xl border border-white/10 bg-black/70 p-3">
      <div className="absolute left-6 top-6 rounded-full border border-white/20 bg-black/60 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/80">
        Video de venta (32s)
      </div>
      {hasError ? (
        <div className="mt-10 flex flex-col gap-2 rounded-xl border border-white/10 bg-black/50 px-4 py-6 text-xs text-slate-200">
          <p>No se pudo cargar el video.</p>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/demos"
              className="rounded-full border border-white/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/80 transition hover:border-cyan-300/60"
            >
              Ver ejemplos →
            </Link>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-emerald-400 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-black transition hover:bg-emerald-300"
            >
              Hablar por WhatsApp
            </a>
          </div>
        </div>
      ) : (
        <>
          <video
            controls
            playsInline
            muted
            preload="metadata"
            poster="/video/video-poster.png"
            className="h-auto w-full rounded-xl"
            onError={() => setHasError(true)}
          >
            <source src="/video/video.mp4" type="video/mp4" />
            <track
              kind="subtitles"
              src="/video/subs.es.vtt"
              srcLang="es"
              label="Español"
              default
            />
            Tu navegador no soporta la reproducción de video.
          </video>
          <div className="mt-3 flex flex-col gap-2 rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-xs text-slate-200">
            <p>Subtítulos disponibles en el reproductor.</p>
          </div>
        </>
      )}
    </div>
  );
}
