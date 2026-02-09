#!/usr/bin/env bash
set -euo pipefail

EXPECTED_ROOT="/home/hagga/work/launchlab__PROD"
PROD_URL="https://www.poweredbyia.com/"
LOCAL_URL="http://127.0.0.1:3000/"

if [[ "${PWD}" != "${EXPECTED_ROOT}"* ]]; then
  echo "Parity: wrong working dir (PWD=${PWD}). Expected ${EXPECTED_ROOT}." >&2
  exit 1
fi

vercel_changes="$(printf "%s\n%s\n" "$(git diff --name-only)" "$(git diff --cached --name-only)" | rg -n '^.vercel/' || true)"
if [[ -n "${vercel_changes}" ]]; then
  echo "Parity: changes detected in .vercel/. This is not allowed." >&2
  exit 1
fi

kill_listener() {
  local port="$1"
  local pids
  pids="$(lsof -nP -t -iTCP:${port} -sTCP:LISTEN 2>/dev/null || true)"
  if [[ -n "${pids}" ]]; then
    echo "Parity: killing listeners on port ${port}: ${pids}"
    kill -9 ${pids} || true
  fi
}

kill_listener 3000
kill_listener 3001

rm -rf .next
npm ci
npm run build

start_server() {
  npm run start -- --port 3000 --hostname 127.0.0.1 > /tmp/next-start.log 2>&1 &
  echo $!
}

SERVER_PID="$(start_server)"
cleanup() {
  if kill -0 "${SERVER_PID}" >/dev/null 2>&1; then
    kill "${SERVER_PID}" >/dev/null 2>&1 || true
    wait "${SERVER_PID}" >/dev/null 2>&1 || true
  fi
}
trap cleanup EXIT

ready=0
for _ in {1..10}; do
  if curl -sSf "${LOCAL_URL}" > /tmp/local.html; then
    ready=1
    break
  fi
  sleep 1
done

if [[ "${ready}" -ne 1 ]]; then
  echo "Parity: local server did not respond on ${LOCAL_URL}" >&2
  exit 1
fi

curl -s "${PROD_URL}" > /tmp/prod.html

fingerprints=(
  "Sistemas de IA listos para vender y escalar."
  "En 7–14 días implementamos captación, seguimiento y soporte. Con demos y casos."
  "Quiero una demo"
  "Reservar llamada"
  "Prueba rápida"
)

check_fp() {
  local fp="$1"
  local file="$2"
  if ! rg -q --fixed-strings "${fp}" "${file}"; then
    echo "Parity FAIL: missing fingerprint in ${file}: ${fp}" >&2
    return 1
  fi
}

for fp in "${fingerprints[@]}"; do
  check_fp "${fp}" /tmp/prod.html
  check_fp "${fp}" /tmp/local.html
done

echo "Parity PASS"
echo "Branch: $(git rev-parse --abbrev-ref HEAD)"
echo "Commit: $(git rev-parse --short HEAD)"
echo "Prod: ${PROD_URL}"
echo "Local: ${LOCAL_URL}"
