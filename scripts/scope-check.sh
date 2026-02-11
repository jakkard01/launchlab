#!/usr/bin/env bash
set -euo pipefail

allowed_prefixes=("src/app/mo/" "src/lib/mo/")

collect_changes() {
  git status --porcelain=1 | awk '{print $2}'
}

is_allowed() {
  local file="$1"
  for prefix in "${allowed_prefixes[@]}"; do
    if [[ "$file" == "$prefix"* ]]; then
      return 0
    fi
  done
  return 1
}

changes=$(collect_changes)

if [[ -z "$changes" ]]; then
  echo "Scope check: sin cambios."
  exit 0
fi

violations=()
while IFS= read -r file; do
  if [[ -z "$file" ]]; then
    continue
  fi
  if ! is_allowed "$file"; then
    violations+=("$file")
  fi
 done <<< "$changes"

if [[ ${#violations[@]} -eq 0 ]]; then
  echo "Scope check: OK (solo cambios dentro de src/app/mo y src/lib/mo)."
  exit 0
fi

echo "Scope check: cambios fuera de scope:"
for file in "${violations[@]}"; do
  echo "- $file"
done

exit 1
