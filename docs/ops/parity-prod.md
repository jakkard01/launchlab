# Parity Check (Prod vs Local)

## Why next dev is not parity
`next dev` uses a different compiler and runtime behavior than `next build` + `next start`.
To compare local with production, always use production mode locally.

## How to run
```bash
npm run ops:parity:prod
```

## PASS/FAIL meaning
- PASS: all required fingerprints are present in both prod and local HTML.
- FAIL: one or more fingerprints is missing; the script prints which one and where.

## If it fails
- Verify you are on the correct branch.
- Remove `.next` and rerun the parity command.
- Confirm you are not running a different local server on port 3000.
