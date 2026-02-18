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
}: {
  className?: string;
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
      className={`flex h-11 w-11 items-center justify-center rounded-full border border-default bg-surface text-main shadow-sm transition hover:border-[var(--accent)] hover:text-[var(--accent)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] ${className}`}
      style={{ minWidth: 44, minHeight: 44 }}
    >
      <span aria-hidden="true" className="text-lg">
        {icon}
      </span>
    </button>
  );
}
