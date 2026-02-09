#!/usr/bin/env bash
set -euo pipefail

ROOT="$(git rev-parse --show-toplevel 2>/dev/null || true)"
if [[ -z "${ROOT}" ]]; then
  ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
fi

echo "== CANON CHECK =="
cd "$ROOT"
echo "PWD:  $PWD"
test -f .CANON_OK || echo "⚠️  Falta .CANON_OK (este NO es el repo canónico)"
test -f package.json || echo "⚠️  No hay package.json (no es root)"
test -d .git || echo "⚠️  No hay .git (no es repo)"
echo "✅ Repo check complete"

echo
echo "== GIT CHECK =="
echo "Top:    $(git -C "$ROOT" rev-parse --show-toplevel 2>/dev/null || echo '-')"
echo "Branch: $(git -C "$ROOT" branch --show-current 2>/dev/null || echo '-')"
echo "HEAD:   $(git -C "$ROOT" rev-parse --short HEAD 2>/dev/null || echo '-')"
git -C "$ROOT" status -sb || true

echo
echo "== SYMLINK CHECK (~/work/launchlab) =="
if [ -L "$HOME/work/launchlab" ]; then
  echo "symlink -> $(readlink -f "$HOME/work/launchlab")"
else
  echo "⚠️  ~/work/launchlab NO es symlink (riesgo de fantasma)"
fi

echo
echo "== VERCEL LINK CHECK =="
if [ -f .vercel/project.json ]; then
  echo ".vercel/project.json: OK"
  cat "$ROOT/.vercel/project.json"
else
  echo "❌ No hay .vercel/project.json (no está linkeado a Vercel aquí)"
fi

echo
echo "== PORTS CHECK (3333/3000) =="
for p in 3333 3000; do
  PID=$(lsof -nP -t -iTCP:$p -sTCP:LISTEN 2>/dev/null | head -n 1 || true)
  if [ -n "${PID:-}" ]; then
    echo "PORT $p -> PID=$PID"
    echo "  CWD: $(readlink -f /proc/$PID/cwd 2>/dev/null || echo '?')"
    echo "  CMD: $(tr '\0' ' ' </proc/$PID/cmdline 2>/dev/null || echo '?')"
  else
    echo "PORT $p -> PID=none"
  fi
done

echo
echo "== HTML FINGERPRINT (navbar tokens) =="
if curl -fsS http://localhost:3333 >/dev/null 2>&1; then
  curl -sS http://localhost:3333 | grep -Eo "Video Packs|Doblaje|n8n Ops|Cursos|Prompts|TikTok|YouTube|Facebook" | head -n 30 || true
else
  echo "localhost:3333 no responde"
fi
