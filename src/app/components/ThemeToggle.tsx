"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

const applyTheme = (next: Theme) => {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  root.classList.remove("light", "dark");
  root.classList.add(next);
  root.style.colorScheme = next;
  try {
    localStorage.setItem("theme", next);
  } catch {
    // ignore
  }
};

export default function ThemeToggle({
  className = "",
  showLabel = false,
  compact = false,
}: {
  className?: string;
  showLabel?: boolean;
  compact?: boolean;
}) {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    if (typeof document === "undefined") return;
    const current = document.documentElement.classList.contains("dark")
      ? "dark"
      : "light";
    setTheme(current);
  }, []);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    applyTheme(next);
  };

  const label = theme === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro";
  const icon = theme === "dark" ? "🌙" : "☀️";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className={`flex items-center justify-center gap-2 rounded-full border border-default bg-surface text-main shadow-sm transition hover:border-[var(--accent)] hover:text-[var(--accent)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] ${
        showLabel
          ? "min-h-10 min-w-[148px] px-3"
          : compact
            ? "h-9 w-9"
            : "h-11 w-11"
      } ${className}`}
    >
      <span aria-hidden="true" className={compact ? "text-base" : "text-lg"}>
        {icon}
      </span>
      {showLabel ? (
        <span className="text-xs font-semibold uppercase tracking-[0.14em]">
          {theme === "dark" ? "Modo claro" : "Modo oscuro"}
        </span>
      ) : null}
    </button>
  );
}
