#!/usr/bin/env bash
set -euo pipefail
OUT="/tmp/CODEX_PACKET_$(date +%Y%m%d_%H%M%S).txt"

{
  echo "=== REPO ==="
  echo "PWD: $(pwd)"
  echo "BRANCH: $(git branch --show-current)"
  echo

  echo "=== git status -sb ==="
  git status -sb || true
  echo

  echo "=== Últimos commits (12) ==="
  git log --oneline -n 12 || true
  echo

  echo "=== Diff stat ==="
  git diff --stat || true
  echo

  echo "=== Header.tsx (1..240) ==="
  sed -n '1,240p' src/app/components/Header.tsx 2>/dev/null || true
  echo

  echo "=== LandingLocal.tsx (zona servicios + cards) ==="
  rg -n "SERVICIOS|Soluciones IA|GlyphBadge|Paso|RouteStepper|service" src/app/components/LandingLocal.tsx 2>/dev/null || true
  echo

  echo "=== GlyphBadge.tsx (1..260) ==="
  sed -n '1,260p' src/app/components/GlyphBadge.tsx 2>/dev/null || true
  echo

  echo "=== RouteStepper.tsx (1..260) ==="
  sed -n '1,260p' src/app/components/RouteStepper.tsx 2>/dev/null || true
  echo

  echo "=== services/page.tsx (1..260) ==="
  sed -n '1,260p' src/app/services/page.tsx 2>/dev/null || true
  echo

  echo "=== /prompts guard ==="
  git diff --name-only | rg -n '^src/app/prompts' && echo "ALERTA: tocaste /prompts" || echo "OK: /prompts intacto"
  echo
} | tee "$OUT" >/dev/null

echo "OK: paquete listo -> $OUT"
echo "Pega esto en Codex:"
echo "cat $OUT"
