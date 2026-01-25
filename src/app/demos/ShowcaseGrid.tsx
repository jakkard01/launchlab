"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { ShowcaseItem } from "../content/showcase";
import GlyphBadge from "../components/GlyphBadge";

type ShowcaseGridProps = {
  items: ShowcaseItem[];
};

const typeOptions: { label: string; value: ShowcaseItem["type"] | "all" }[] = [
  { label: "Todos", value: "all" },
  { label: "Bot", value: "bot" },
  { label: "Landing", value: "landing" },
  { label: "Sistema", value: "system" },
  { label: "Automatizacion", value: "automation" },
];

const statusOptions: { label: string; value: ShowcaseItem["status"] | "all" }[] = [
  { label: "Todos", value: "all" },
  { label: "Demo", value: "demo" },
  { label: "Live", value: "live" },
  { label: "WIP", value: "wip" },
];

function statusBadge(status: ShowcaseItem["status"]) {
  if (status === "live") {
    return "Live";
  }
  if (status === "wip") {
    return "WIP";
  }
  return "Demo";
}

export default function ShowcaseGrid({ items }: ShowcaseGridProps) {
  const [typeFilter, setTypeFilter] = useState<ShowcaseItem["type"] | "all">(
    "all"
  );
  const [statusFilter, setStatusFilter] = useState<
    ShowcaseItem["status"] | "all"
  >("all");

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchType = typeFilter === "all" || item.type === typeFilter;
      const matchStatus = statusFilter === "all" || item.status === statusFilter;
      return matchType && matchStatus;
    });
  }, [items, typeFilter, statusFilter]);

  return (
    <div className="mt-10">
      <div className="flex flex-col gap-6 rounded-3xl border border-white/10 bg-black/60 p-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/70">
            Filtros
          </p>
          <h2 className="mt-2 text-xl font-semibold text-white">
            Encuentra la demo que necesitas
          </h2>
          <p className="mt-2 text-sm text-slate-300">
            {filteredItems.length} resultados
          </p>
        </div>
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="flex flex-wrap gap-2">
            {typeOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setTypeFilter(option.value)}
                className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] transition ${
                  typeFilter === option.value
                    ? "border-cyan-300 bg-cyan-400 text-black"
                    : "border-white/15 text-slate-200 hover:border-cyan-300/60"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {statusOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setStatusFilter(option.value)}
                className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] transition ${
                  statusFilter === option.value
                    ? "border-emerald-300 bg-emerald-400 text-black"
                    : "border-white/15 text-slate-200 hover:border-emerald-300/60"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredItems.map((item) => {
          const badge = statusBadge(item.status);
          const hasLive = item.status === "live" && item.liveUrl;
          const ctaHref = item.status === "wip" ? "/contact?source=demos" : item.ctaHref;
          const ctaLabel = item.status === "wip" ? "Pedir acceso" : item.ctaLabel;

          return (
            <div
              key={item.slug}
              className="rounded-2xl border border-white/10 bg-black/60 p-6 shadow-lg"
            >
              <div className="flex items-start justify-between">
                <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-black/70 px-3 py-1">
                  <GlyphBadge glyph={item.glyph} />
                  <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-cyan-100/90">
                    {badge}
                  </span>
                </div>
                {hasLive && (
                  <a
                    href={item.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300"
                  >
                    Live
                  </a>
                )}
              </div>
              <h3 className="mt-4 text-lg font-semibold text-white">
                {item.title}
              </h3>
              <p className="mt-3 text-sm text-slate-300">{item.summary}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 bg-black/50 px-3 py-1 text-xs font-semibold text-slate-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              {ctaHref.startsWith("/") ? (
                <Link
                  href={ctaHref}
                  className="mt-6 inline-flex w-full items-center justify-center rounded-full border border-cyan-300/60 px-4 py-2 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-400 hover:text-black"
                >
                  {ctaLabel}
                </Link>
              ) : (
                <a
                  href={ctaHref}
                  className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-emerald-400 px-4 py-2 text-sm font-semibold text-black transition hover:bg-emerald-300"
                  target="_blank"
                  rel="noreferrer"
                >
                  {ctaLabel}
                </a>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
