#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

bash scripts/doctor.sh

if [ ! -L "$HOME/work/launchlab" ]; then
  echo "❌ ~/work/launchlab no es symlink"
  exit 1
fi

TARGET="$(readlink -f "$HOME/work/launchlab" 2>/dev/null || true)"
TOP="$(git rev-parse --show-toplevel 2>/dev/null || true)"

if [ -z "${TARGET:-}" ] || [ -z "${TOP:-}" ] || [ "$TARGET" != "$TOP" ]; then
  echo "❌ Symlink incorrecto: $HOME/work/launchlab -> ${TARGET:-"(none)"} (esperado: $TOP)"
  exit 1
fi

if [ ! -f .vercel/project.json ]; then
  echo "❌ Falta .vercel/project.json (no está linkeado)"
  exit 1
fi

echo "✅ Preflight OK"
