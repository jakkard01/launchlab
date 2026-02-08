#!/usr/bin/env bash
set -euo pipefail

VAULT="/mnt/c/Demonio_IA/01_PJECTOX"
START_HERE="$VAULT/00_START_HERE.md"
RAMA="$VAULT/RAMA_ACTIVA.md"
LINK="$VAULT/RAMA_ACTIVA_LINK.md"
ERR="$VAULT/ERROR_LOG.md"
CHECK="$VAULT/CHECKLIST_INICIO.md"

need() { test -f "$1" || { echo "❌ Falta archivo: $1"; exit 1; }; }

need "$START_HERE"
need "$RAMA"
need "$LINK"
need "$ERR"

# helpers idempotentes
append_if_missing() {
  local file="$1"
  local needle="$2"
  local block="$3"
  if rg -nF "$needle" "$file" >/dev/null 2>&1; then
    echo "✅ Ya estaba: $needle -> $file"
  else
    printf "\n%s\n" "$block" >> "$file"
    echo "✅ Agregado: $needle -> $file"
  fi
}

# 1) Garantiza CHECKLIST_INICIO.md (si falta, lo crea limpio)
if [ ! -f "$CHECK" ]; then
  cat > "$CHECK" <<'MD'
# CHECKLIST_INICIO (modo zombie)

## 0) Arranque (30s)
- cd ~/work/launchlab
- bash scripts/doctor.sh
- bash scripts/handoff/refresh-start-here.sh
- bash scripts/handoff/resume_contextpack.sh

## 1) Si vas a codear
- npm ci
- PORT=3333 npm run dev

## 2) Si algo huele raro (fantasma)
- pkill -f "next dev" || true
- pkill -f "next start" || true
- rm -f ~/work/launchlab && ln -s ~/projects/launchlab__CLEAN ~/work/launchlab
- cd ~/work/launchlab && bash scripts/doctor.sh

## 3) Antes de cerrar la laptop (guardar estado)
- cd ~/work/launchlab
- bash scripts/handoff/obsidian_sync.sh
- bash scripts/handoff/refresh-start-here.sh
- bash scripts/handoff/resume_contextpack.sh
MD
  echo "✅ Creado: $CHECK"
else
  echo "✅ CHECKLIST ya existe: $CHECK"
fi

# 2) START HERE: link a checklist (para que siempre esté visible)
append_if_missing "$START_HERE" "CHECKLIST_INICIO (modo zombie)" \
"## CHECKLIST_INICIO (modo zombie)\n- Abrir: CHECKLIST_INICIO.md\n- Ruta: $CHECK\n- Tip: corre \`llresume\` y listo."

# 3) ERROR_LOG: registra el bug histórico del perl regex
append_if_missing "$ERR" "refresh-start-here.sh fallaba con \"Unknown regexp modifier /h\"" \
"## 2026-02-08 — refresh-start-here.sh fallaba con \"Unknown regexp modifier /h\"\n- Síntoma: al refrescar START HERE salía error de perl regex.\n- Causa: reemplazo con regex incompatible.\n- Fix: refresh-start-here.sh usa Python para reemplazo robusto.\n- Prevención: usar scripts/handoff/refresh-start-here.sh (no inventar sed/perl oneliners)."

# 4) RAMA_ACTIVA: menciona scripts handoff
append_if_missing "$RAMA" "Handoff scripts (memoria infinita):" \
"- Handoff scripts (memoria infinita):\n  - bash scripts/handoff/refresh-start-here.sh\n  - bash scripts/handoff/resume_contextpack.sh\n  - bash scripts/handoff/obsidian_sync.sh\n  - alias: llresume"

echo "✅ Obsidian sync terminado."
