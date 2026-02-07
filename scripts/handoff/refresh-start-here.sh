#!/usr/bin/env bash
set -euo pipefail

START_HERE="/mnt/c/Demonio_IA/01_PJECTOX/00_START_HERE.md"

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
cd "$ROOT"

BRANCH="$(git branch --show-current || true)"
HEAD="$(git rev-parse --short HEAD || true)"
STATUS="$(git status -sb || true)"

SYMLINK="(missing)"
if [ -L "$HOME/work/launchlab" ]; then
  SYMLINK="$(readlink -f "$HOME/work/launchlab" || true)"
fi

VERCEL="(no .vercel/project.json)"
if [ -f ".vercel/project.json" ]; then
  VERCEL="$(cat .vercel/project.json | tr -d '\n')"
fi

NOW="$(date -Is)"

AUTO_CONTENT=$(cat <<EOF
✅ Updated: $NOW

Repo:
- top: $(git rev-parse --show-toplevel)
- branch: $BRANCH
- head: $HEAD

Symlink:
- ~/work/launchlab -> $SYMLINK

Vercel:
- .vercel/project.json: $VERCEL

Git status:
$STATUS
EOF
)

# Reemplaza bloque AUTO
perl -0777 -i -pe 's/<!-- AUTO-ESTADO-START -->.*?<!-- AUTO-ESTADO-END -->/<!-- AUTO-ESTADO-START -->\n'"$AUTO_CONTENT"'\n<!-- AUTO-ESTADO-END -->/s' "$START_HERE"

echo "✅ Updated AUTO block in: $START_HERE"
