#!/usr/bin/env bash
set -euo pipefail

ENV_FILE="${1:-.env.local}"

if [[ ! -f "$ENV_FILE" ]]; then
  echo "ERROR: no existe $ENV_FILE"
  exit 1
fi

val_len() {
  local key="$1"
  awk -F= -v k="$key" '$1==k {print length($2)}' "$ENV_FILE" | tail -n1
}

has_value() {
  local key="$1"
  local n
  n="$(val_len "$key")"
  [[ -n "$n" && "$n" -gt 0 ]]
}

echo "ENV file: $ENV_FILE"

echo ""
echo "[PBIA] Contact lead delivery"
if has_value "CONTACT_WEBHOOK_URL"; then
  echo "- Webhook: READY"
else
  echo "- Webhook: MISSING (CONTACT_WEBHOOK_URL)"
fi

if has_value "PBIA_LEADS_SHEETS_SPREADSHEET_ID" && has_value "GOOGLE_SERVICE_ACCOUNT_EMAIL" && has_value "GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY"; then
  echo "- Google Sheets leads: READY"
else
  echo "- Google Sheets leads: MISSING (PBIA_LEADS_SHEETS_SPREADSHEET_ID / GOOGLE_SERVICE_ACCOUNT_EMAIL / GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY)"
fi

echo ""
echo "[RYS] Sheets backend"
if has_value "RYS_SHEETS_SPREADSHEET_ID" && has_value "GOOGLE_SERVICE_ACCOUNT_EMAIL" && has_value "GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY"; then
  echo "- RYS products/admin on Sheets: READY"
else
  echo "- RYS products/admin on Sheets: MISSING (RYS_SHEETS_SPREADSHEET_ID / GOOGLE_SERVICE_ACCOUNT_EMAIL / GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY)"
fi

echo ""
echo "[RYS] Admin access"
if has_value "MO_ADMIN_ENABLED"; then
  echo "- MO_ADMIN_ENABLED present"
else
  echo "- MISSING MO_ADMIN_ENABLED"
fi

if has_value "ADMIN_PASSWORD" || has_value "ADMIN_PIN" || has_value "MO_ADMIN_KEY"; then
  echo "- Admin secret configured: YES"
else
  echo "- Admin secret configured: NO (set ADMIN_PASSWORD or ADMIN_PIN or MO_ADMIN_KEY)"
fi
