#!/usr/bin/env bash
set -euo pipefail

# Usage: bash scripts/audit/obsidian_snapshot.sh <web|bots|services|linkedin|english|heygen>
KIND="${1:-}"

REPO="$HOME/projects/launchlab__CLEAN"
VAULT="/mnt/c/Demonio_IA/01_PJECTOX/notas/PJECTOX_Vault"
PJ="$VAULT/02_Documentacion/PJETDOCS"

usage() {
  cat <<USAGE
Usage:
  bash scripts/audit/obsidian_snapshot.sh <web|bots|services|linkedin|english|heygen>

What it does:
  - Creates a timestamped run file in PJETDOCS/<branch>/runs/
  - Updates <PREFIX>__CURRENT.md with pointer to last run
  - For "web": runs npm build and stores route excerpt
USAGE
}

if [[ -z "$KIND" ]]; then
  usage
  exit 2
fi

test -d "$REPO"  || { echo "ERROR: repo not found: $REPO"; exit 1; }
test -d "$VAULT" || { echo "ERROR: vault not found: $VAULT"; exit 1; }
test -d "$PJ"    || { echo "ERROR: PJETDOCS not found: $PJ"; exit 1; }

FOLDER=""
PREFIX=""
CURRENT=""

case "$KIND" in
  web)
    FOLDER="$PJ/10_WEB_POWEREDBYIA"
    PREFIX="WEB"
    CURRENT="$FOLDER/WEB__CURRENT.md"
    ;;
  bots)
    FOLDER="$PJ/20_PRODUCT_BOTS"
    PREFIX="BOTS"
    CURRENT="$FOLDER/BOTS__CURRENT.md"
    ;;
  services)
    FOLDER="$PJ/30_SERVICES_FREELANCE"
    PREFIX="SERVICES"
    CURRENT="$FOLDER/SERVICES__CURRENT.md"
    ;;
  linkedin)
    FOLDER="$PJ/40_GROWTH_LINKEDIN"
    PREFIX="LI"
    CURRENT="$FOLDER/LI__CURRENT.md"
    ;;
  english)
    FOLDER="$PJ/50_ENGLISH_CERTS"
    PREFIX="EN"
    CURRENT="$FOLDER/EN__CURRENT.md"
    ;;
  heygen)
    FOLDER="$PJ/60_VIDEO_HEYGEN"
    PREFIX="HEYGEN"
    CURRENT="$FOLDER/HEYGEN__CURRENT.md"
    ;;
  *)
    echo "ERROR: unknown kind: $KIND"
    usage
    exit 2
    ;;
esac

RUNS="$FOLDER/runs"
mkdir -p "$RUNS"

cd "$REPO"

TS="$(date +%Y-%m-%d__%H%M)"
RUNFILE="$RUNS/${PREFIX}__RUN__${TS}.md"

BRANCH="$(git branch --show-current 2>/dev/null || echo unknown)"
HEADSHA="$(git rev-parse --short HEAD 2>/dev/null || echo unknown)"

BUILD_EXCERPT=""
if [[ "$KIND" == "web" ]]; then
  BUILD_OUT="$(mktemp)"
  npm run build >"$BUILD_OUT" 2>&1 || true
  BUILD_EXCERPT="$(sed -n '/Route (app)/,/Route (pages)/p' "$BUILD_OUT" | sed -n '1,240p' || true)"
  rm -f "$BUILD_OUT"
fi

{
  echo "# ${PREFIX} — Run Snapshot"
  echo
  echo "- Timestamp: $(date)"
  echo "- Kind: $KIND"
  echo "- Repo: $REPO"
  echo "- Branch: $BRANCH"
  echo "- HEAD: $HEADSHA"
  echo
  echo "## Git status"
  git status -sb || true
  echo
  echo "## Git log (12)"
  git log -12 --oneline --decorate || true

  if [[ "$KIND" == "web" ]]; then
    echo
    echo "## Build routes excerpt"
    printf "%s\n" "$BUILD_EXCERPT"
  fi
} > "$RUNFILE"

{
  echo "# ${PREFIX} — CURRENT"
  echo
  echo "- Último run snapshot: $RUNFILE"
  echo "- Branch: $BRANCH"
  echo "- HEAD: $HEADSHA"
  echo
  echo "## Volver en 2 minutos"
  echo "1) Abrir: $PJ/00_HUB/MASTER__STATE.md"
  echo "2) Abrir: $PJ/90_LOGS/HANDOFFS.md (últimas líneas)"
  echo "3) Ejecutar: bash scripts/audit/obsidian_snapshot.sh $KIND"
} > "$CURRENT"

echo "CREATED: $RUNFILE"
echo "UPDATED: $CURRENT"
