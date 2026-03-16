#!/usr/bin/env bash
set -euo pipefail

BASE_URL="${1:-http://127.0.0.1:3011}"
ENV_FILE="${2:-.env.local}"

read_env_value() {
  local key="$1"
  local file="$2"
  [[ -f "$file" ]] || return 0
  awk -F= -v k="$key" '$1==k {sub(/^[^=]*=/,""); print; exit}' "$file"
}

echo "Smoke tests against: $BASE_URL"

echo ""
echo "1) RYS operational health"
curl -sS -i "$BASE_URL/api/mo/health" | sed -n '1,40p'

echo ""
echo "2) PBIA contact POST"
curl -sS -i -X POST "$BASE_URL/api/contact" \
  -H 'Content-Type: application/json' \
  --data '{"name":"Test Operativo","email":"ops@example.com","message":"Mensaje de prueba operativa para validar wiring real.","source":"predeploy-smoke"}' \
  | sed -n '1,20p'

echo ""
echo "3) RYS products GET"
curl -sS -i "$BASE_URL/api/mo/products" | sed -n '1,20p'

echo ""
echo "4) RYS admin GET (sin cookie)"
curl -sS -i "$BASE_URL/api/mo/admin" | sed -n '1,20p'

echo ""
echo "5) RYS admin login + stats + write"
secret="${ADMIN_PASSWORD:-${ADMIN_PIN:-${MO_ADMIN_KEY:-}}}"
if [[ -z "$secret" ]]; then
  secret="$(read_env_value ADMIN_PASSWORD "$ENV_FILE")"
fi
if [[ -z "$secret" ]]; then
  secret="$(read_env_value ADMIN_PIN "$ENV_FILE")"
fi
if [[ -z "$secret" ]]; then
  secret="$(read_env_value MO_ADMIN_KEY "$ENV_FILE")"
fi
if [[ -z "$secret" ]]; then
  echo "NO_ADMIN_SECRET_IN_ENV"
  exit 0
fi

login_resp=$(curl -sS -i -X POST "$BASE_URL/api/mo/admin/login" \
  -H 'Content-Type: application/json' \
  --data "{\"password\":\"$secret\"}")

echo "$login_resp" | sed -n '1,20p'

cookie=$(echo "$login_resp" | awk '/^set-cookie: mo_admin=/{print $2}' | tr -d ';\r\n')
if [[ -z "$cookie" ]]; then
  echo "NO_COOKIE_FROM_LOGIN"
  exit 0
fi

echo "COOKIE_OBTAINED"

curl -sS -i "$BASE_URL/api/mo/admin?view=stats" -H "Cookie: $cookie" | sed -n '1,20p'

curl -sS -i -X POST "$BASE_URL/api/mo/admin" \
  -H 'Content-Type: application/json' \
  -H "Cookie: $cookie" \
  --data '{"action":"updateSortOrder","id":"mo-cafe-pack","sortOrder":1}' | sed -n '1,20p'
