#!/usr/bin/env bash
set -euo pipefail

CANON="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

echo "== CANON CHECK =="
cd "$CANON"
echo "PWD:  $PWD"
test -f .CANON_OK || { echo "❌ Falta .CANON_OK (este NO es el repo canónico)"; exit 1; }
test -f package.json || { echo "❌ No hay package.json (no es root)"; exit 1; }
test -d .git || { echo "❌ No hay .git (no es repo)"; exit 1; }
echo "✅ Repo canónico OK"

echo
echo "== GIT CHECK =="
echo "Top:    $(git rev-parse --show-toplevel)"
echo "Branch: $(git branch --show-current)"
echo "HEAD:   $(git rev-parse --short HEAD)"
git status -sb || true

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
  cat .vercel/project.json
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
