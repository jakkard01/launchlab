#!/usr/bin/env bash
set -euo pipefail

START_HERE="/mnt/c/Demonio_IA/01_PJECTOX/00_START_HERE.md"

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
cd "$ROOT"

BRANCH="$(git branch --show-current 2>/dev/null || true)"
HEAD="$(git rev-parse --short HEAD 2>/dev/null || true)"
STATUS="$(git status -sb 2>/dev/null || true)"

SYMLINK="(missing)"
if [ -L "$HOME/work/launchlab" ]; then
  SYMLINK="$(readlink -f "$HOME/work/launchlab" 2>/dev/null || true)"
fi

VERCEL="(no .vercel/project.json)"
if [ -f ".vercel/project.json" ]; then
  VERCEL="$(tr -d '\n' < .vercel/project.json)"
fi

NOW="$(date -Is)"

AUTO_CONTENT="$(
cat <<EOF
Actualizado: $NOW

Repo top: $ROOT
Branch:   ${BRANCH:-"(none)"}
HEAD:     ${HEAD:-"(none)"}

Symlink ~/work/launchlab -> $SYMLINK

Vercel link:
$VERCEL

Git status:
$STATUS
EOF
)"

python3 - <<PY
from pathlib import Path

start_here = Path("$START_HERE")
text = start_here.read_text(encoding="utf-8")

start = "<!-- AUTO-ESTADO-START -->"
end   = "<!-- AUTO-ESTADO-END -->"

if start not in text or end not in text:
    raise SystemExit("❌ No encuentro bloque AUTO-ESTADO en 00_START_HERE.md")

before = text.split(start, 1)[0]
after  = text.split(end, 1)[1]

new_text = before + start + "\n" + """$AUTO_CONTENT""" + "\n" + end + after
start_here.write_text(new_text, encoding="utf-8")
print("✅ START HERE actualizado:", start_here)
PY
