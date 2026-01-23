import * as React from "react";

export type Glyph =
  | "layout"
  | "messages"
  | "workflow"
  | "video"
  | "shield"
  | "mail"
  | "play"
  | "cpu";

type Props = {
  glyph: Glyph;
  className?: string;
  title?: string;
  label?: string;
};

function Icon({ glyph }: { glyph: Glyph }) {
  const common =
    "fill-none stroke-current stroke-[1.8] stroke-linecap-round stroke-linejoin-round";
  switch (glyph) {
    case "layout":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path className={common} d="M4 5h16v14H4z" />
          <path className={common} d="M4 9h16" />
          <path className={common} d="M9 9v10" />
        </svg>
      );
    case "messages":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path className={common} d="M21 12a8 8 0 0 1-8 8H7l-4 2 1.2-4A8 8 0 1 1 21 12z" />
          <path className={common} d="M8 12h8" />
          <path className={common} d="M8 9h6" />
        </svg>
      );
    case "cpu":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path className={common} d="M9 9h6v6H9z" />
          <path className={common} d="M9 2v3M15 2v3M9 19v3M15 19v3" />
          <path className={common} d="M2 9h3M2 15h3M19 9h3M19 15h3" />
          <path className={common} d="M7 7h10v10H7z" />
        </svg>
      );
    case "workflow":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path className={common} d="M7 7h4v4H7zM13 13h4v4h-4zM7 17h4v4H7z" />
          <path className={common} d="M11 9h3a3 3 0 0 1 3 3v1" />
          <path className={common} d="M11 19h3a3 3 0 0 0 3-3v-1" />
        </svg>
      );
    case "play":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path className={common} d="M8 5l12 7-12 7z" />
        </svg>
      );
    case "video":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path className={common} d="M4 7h11v10H4z" />
          <path className={common} d="M15 10l5-3v10l-5-3z" />
        </svg>
      );
    case "shield":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path className={common} d="M12 3l8 4v6c0 5-3.5 8.5-8 9-4.5-.5-8-4-8-9V7l8-4z" />
          <path className={common} d="M9 12l2 2 4-5" />
        </svg>
      );
    case "mail":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path className={common} d="M4 6h16v12H4z" />
          <path className={common} d="M4 7l8 6 8-6" />
        </svg>
      );
  }
}

export default function GlyphBadge({ glyph, className = "", title, label }: Props) {
  return (
    <span
      className={[
        "inline-flex h-9 w-9 items-center justify-center rounded-full",
        "border border-cyan-300/30 bg-black/70 text-cyan-100 shadow-[0_0_0_1px_rgba(34,211,238,0.06)]",
        className,
      ].join(" ")}
      title={title}
      aria-label={label ?? title ?? glyph}
    >
      <span className="h-5 w-5 opacity-90">
        <Icon glyph={glyph} />
      </span>
    </span>
  );
}
