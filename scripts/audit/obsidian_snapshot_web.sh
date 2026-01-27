#!/usr/bin/env bash
set -euo pipefail

REPO="$HOME/projects/launchlab__CLEAN"
VAULT="/mnt/c/Demonio_IA/01_PJECTOX/notas/PJECTOX_Vault"
PJ="$VAULT/02_Documentacion/PJETDOCS"
WEB="$PJ/10_WEB_POWEREDBYIA"
RUNS="$WEB/runs"
CURRENT="$WEB/WEB__CURRENT.md"

mkdir -p "$RUNS"
cd "$REPO"

TS="$(date +%Y-%m-%d__%H%M)"
RUNFILE="$RUNS/WEB__RUN__${TS}.md"

BRANCH="$(git branch --show-current 2>/dev/null || echo unknown)"
HEADSHA="$(git rev-parse --short HEAD 2>/dev/null || echo unknown)"

BUILD_OUT="$(mktemp)"
npm run build >"$BUILD_OUT" 2>&1 || true

{
  echo "# WEB — Run Snapshot"
  echo
  echo "- Timestamp: $(date)"
  echo "- Branch: $BRANCH"
  echo "- HEAD: $HEADSHA"
  echo
  echo "## Git status"
  git status -sb || true
  echo
  echo "## Git log (12)"
  git log -12 --oneline --decorate || true
  echo
  echo "## Build routes excerpt"
  sed -n '/Route (app)/,/Route (pages)/p' "$BUILD_OUT" | sed -n '1,240p' || true
} > "$RUNFILE"

rm -f "$BUILD_OUT"

{
  echo "# WEB — CURRENT"
  echo
  echo "- Último run snapshot: $RUNFILE"
  echo "- Branch: $BRANCH"
  echo "- HEAD: $HEADSHA"
  echo
  echo "## Volver en 2 minutos"
  echo "1) Abrir: $PJ/00_HUB/MASTER__STATE.md"
  echo "2) Leer: $WEB/WEB__BRIEF.md"
  echo "3) Ejecutar: scripts/audit/obsidian_snapshot_web.sh"
} > "$CURRENT"

echo "CREATED: $RUNFILE"
echo "UPDATED: $CURRENT"
