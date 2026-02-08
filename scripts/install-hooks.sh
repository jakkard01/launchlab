#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

SRC="$ROOT/scripts/git-hooks"
DST="$ROOT/.git/hooks"

if [ ! -d "$DST" ]; then
  echo "❌ No existe $DST (no es repo git?)"
  exit 1
fi

install -m 0755 "$SRC/pre-push" "$DST/pre-push"
echo "✅ Hook instalado: $DST/pre-push"
