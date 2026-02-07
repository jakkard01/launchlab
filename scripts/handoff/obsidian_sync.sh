#!/usr/bin/env bash
set -euo pipefail

VAULT="/mnt/c/Demonio_IA/01_PJECTOX"
START_HERE="$VAULT/00_START_HERE.md"
RAMA="$VAULT/RAMA_ACTIVA.md"
LINK="$VAULT/RAMA_ACTIVA_LINK.md"
ERR="$VAULT/ERROR_LOG.md"

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

# A) ERROR_LOG.md — registrar bug perl y fix python
TODAY="$(date +%Y-%m-%d)"

ERROR_BLOCK=$(cat <<EOF
## ${TODAY} — refresh-start-here.sh fallaba con "Unknown regexp modifier /h"
Síntoma:
- Al correr \`bash scripts/handoff/refresh-start-here.sh\` salía:
  \`Unknown regexp modifier "/h"\` (perl compilation aborted)

Causa:
- Reemplazo con perl/regex se rompía por rutas con \`/\` (ej. \`/mnt/c/...\`) y contenido multilinea.

Fix definitivo:
- \`scripts/handoff/refresh-start-here.sh\` usa \`python3\` para reemplazar el bloque:
  \`<!-- AUTO-ESTADO-START -->\` ... \`<!-- AUTO-ESTADO-END -->\`

Verificación rápida:
- \`cd ~/work/launchlab\`
- \`bash scripts/handoff/refresh-start-here.sh\`
- Debe aparecer “Actualizado:” dentro de \`00_START_HERE.md\`.
EOF
)

append_if_missing "$ERR" "Unknown regexp modifier /h" "$ERROR_BLOCK"

# B) 00_START_HERE.md — Troubleshooting extra
START_HERE_BLOCK=$(cat <<'EOF'
E) Error: "Unknown regexp modifier /h" al refrescar START HERE
- Fix:
  - cd ~/work/launchlab
  - bash scripts/handoff/refresh-start-here.sh
- Nota:
  - El script ya usa python3 para evitar bugs de regex con rutas (/mnt/c/...) y multilinea.
EOF
)

append_if_missing "$START_HERE" 'E) Error: "Unknown regexp modifier /h" al refrescar START HERE' "$START_HERE_BLOCK"

# C) RAMA_ACTIVA.md — referencia a handoff scripts
RAMA_BLOCK=$(cat <<'EOF'
- Handoff scripts (memoria infinita):
  - scripts/handoff/refresh-start-here.sh
  - scripts/handoff/resume_contextpack.sh
EOF
)

append_if_missing "$RAMA" "Handoff scripts (memoria infinita):" "$RAMA_BLOCK"

echo "✅ Obsidian sync terminado."
