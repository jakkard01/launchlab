#!/usr/bin/env bash
set -euo pipefail

EXPECTED_ROOT="/home/hagga/work/launchlab__PROD"

if [[ "${PWD}" != "${EXPECTED_ROOT}"* ]]; then
  echo "Guardrails: wrong working dir (PWD=${PWD}). Expected ${EXPECTED_ROOT}." >&2
  exit 1
fi

vercel_changes="$(printf "%s\n%s\n" "$(git diff --name-only)" "$(git diff --cached --name-only)" | rg -n '^.vercel/' || true)"
if [[ -n "${vercel_changes}" ]]; then
  echo "Guardrails: changes detected in .vercel/. This is not allowed." >&2
  exit 1
fi

echo "Guardrails OK"
echo "Branch: $(git rev-parse --abbrev-ref HEAD)"
echo "Commit: $(git rev-parse --short HEAD)"
