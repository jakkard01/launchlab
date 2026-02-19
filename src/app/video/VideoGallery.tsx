"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { buildWhatsappLink } from "../../lib/site";
import type { VideoExample } from "../content/videoPacks";

const buildEmbedUrl = (videoId: string) =>
  `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`;

export default function VideoGallery({ items }: { items: VideoExample[] }) {
  const [active, setActive] = useState<VideoExample | null>(null);

  const whatsappLink = useMemo(
    () => buildWhatsappLink("video_gallery", "Quiero info de Video Packs."),
    []
  );

  return (
    <>
      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <article
            key={item.id}
            className="flex h-full flex-col rounded-3xl border border-white/10 bg-black/60 p-5 shadow-xl"
          >
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/70">
              <div className="relative flex h-40 items-center justify-center bg-gradient-to-br from-black/40 to-black/80 text-xs text-slate-300">
                {item.poster ? (
                  <Image
                    src={item.poster}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                  />
                ) : (
                  "Vista previa"
                )}
              </div>
            </div>
            <div className="mt-4 flex flex-col gap-2">
              <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/80">
                {item.category}
              </p>
              <h3 className="text-lg font-semibold text-white">{item.title}</h3>
              <p className="text-sm text-slate-300">{item.benefit}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 bg-black/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="mt-4 flex flex-col gap-2">
              <button
                type="button"
                onClick={() => setActive(item)}
                className="rounded-full border border-cyan-300/60 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-100 transition hover:bg-cyan-400 hover:text-black"
              >
                Ver ejemplo
              </button>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-emerald-300/60 px-4 py-2 text-center text-xs font-semibold uppercase tracking-[0.2em] text-emerald-200 transition hover:bg-emerald-300 hover:text-black"
              >
                Pedir pack
              </a>
            </div>
          </article>
        ))}
      </div>

      {active && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4"
          role="dialog"
          aria-modal="true"
          onClick={() => setActive(null)}
        >
          <div
            className="w-full max-w-3xl rounded-2xl border border-white/10 bg-black/90 p-4"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-white">{active.title}</p>
              <button
                type="button"
                onClick={() => setActive(null)}
                className="rounded-full border border-white/10 px-3 py-1 text-xs font-semibold text-white/80"
              >
                Cerrar
              </button>
            </div>
            <div className="mt-4 overflow-hidden rounded-xl border border-white/10 bg-black">
              {active.platform === "youtube" && active.videoId ? (
                <iframe
                  src={buildEmbedUrl(active.videoId)}
                  title={active.title}
                  className="h-[360px] w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <video
                  controls
                  playsInline
                  preload="metadata"
                  className="h-auto w-full"
                >
                  <source src={active.src} type="video/mp4" />
                  Tu navegador no soporta la reproducción de video.
                </video>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
