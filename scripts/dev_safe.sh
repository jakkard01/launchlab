#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

bash scripts/doctor.sh

kill_next_on_port() {
  local port="$1"
  local pid cmd

  pid="$(lsof -nP -t -iTCP:"$port" -sTCP:LISTEN 2>/dev/null | head -n 1 || true)"
  if [ -z "${pid:-}" ]; then
    echo "PORT $port -> PID=none"
    return 0
  fi

  cmd="$(tr '\0' ' ' </proc/"$pid"/cmdline 2>/dev/null || true)"

  # Solo matamos Next (dev/start). Si es otra cosa, no tocamos.
  if echo "$cmd" | grep -Eqi "(next dev|next start|node .*next)"; then
    echo "Killing Next on port $port (PID=$pid)"
    kill "$pid" || true
  else
    echo "PORT $port in use by non-Next process; skipping (PID=$pid)"
  fi
}

for p in 3333 3000; do
  kill_next_on_port "$p"
done

STAMP="node_modules/.ll_lockstamp"

need_ci=0
if [ ! -d node_modules ]; then need_ci=1; fi
if [ ! -f package-lock.json ]; then
  echo "❌ Falta package-lock.json (raro). Aborto."
  exit 1
fi
if [ ! -f "$STAMP" ]; then need_ci=1; fi
if [ "$STAMP" -ot package-lock.json ]; then need_ci=1; fi

if [ "$need_ci" -eq 1 ]; then
  npm ci
  mkdir -p node_modules
  date -Is > "$STAMP"
else
  echo "node_modules OK; npm ci not needed"
fi

PORT=3333 npm run dev
