#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
cd "$ROOT"

OUT_PJ="/tmp/contextpack_pjectox.txt"
OUT_LL="/tmp/contextpack_launchlab.txt"

# PJECTOX pack (obsidian paths + quick resume)
cat > "$OUT_PJ" <<EOF
[PJECTOX]
Vault: /mnt/c/Demonio_IA/01_PJECTOX
START HERE: /mnt/c/Demonio_IA/01_PJECTOX/00_START_HERE.md
RAMA_ACTIVA: /mnt/c/Demonio_IA/01_PJECTOX/RAMA_ACTIVA.md
RAMA_ACTIVA_LINK: /mnt/c/Demonio_IA/01_PJECTOX/RAMA_ACTIVA_LINK.md
ERROR_LOG: /mnt/c/Demonio_IA/01_PJECTOX/ERROR_LOG.md
EOF

# Launchlab pack (repo + git + vercel link)
BRANCH="$(git branch --show-current || true)"
HEAD="$(git rev-parse --short HEAD || true)"
TOP="$(git rev-parse --show-toplevel || true)"

VLINK="(no .vercel/project.json)"
if [ -f ".vercel/project.json" ]; then
  VLINK="$(cat .vercel/project.json | tr -d '\n')"
fi

cat > "$OUT_LL" <<EOF
[LAUNCHLAB]
Repo top: $TOP
Branch: $BRANCH
HEAD: $HEAD

Symlink expected:
- ~/work/launchlab -> ~/projects/launchlab__CLEAN

Vercel link (.vercel/project.json):
$VLINK

Run:
- cd ~/work/launchlab
- bash scripts/doctor.sh
- npm ci
- PORT=3333 npm run dev
EOF

echo "✅ Written:"
echo " - $OUT_PJ"
echo " - $OUT_LL"
