# 03_DECISION_LOG

- 2026-01-29: Smart FAB para evitar solapes con CTAs y footer (mejora UX mobile y accesibilidad).
- 2026-01-29: FAQ demo inline con scroll suave para mantener contexto en móvil.
- 2026-01-29: Copy profesional con límites claros (sin lenguaje defensivo).
- 2026-01-29: Dominio/hosting explicado como gestión opcional con coste externo para reducir bloqueos.
- 2026-01-29: Rangos orientativos para precios por variabilidad de alcance.
- 2026-03-09: Fuente de verdad operativa = repo local canónico; deploy público viejo no se usa para auditar estado actual.
- 2026-03-09: Flujo de ejecución con Codex: bloques estables, `build`/`lint` antes de commit, commit atómico, sin `push` automático.
- 2026-03-09: RYS queda en backend único por API (`apiAdapter`) con store de Google Sheets (`sheetsStore`); se retiran adapters legacy ambiguos.
- 2026-03-09: PBIA contacto ajustado a "solicitud registrada" mientras no exista evidencia de delivery real de leads.
- 2026-03-09: PBIA contacto con delivery real configurable (webhook o Google Sheets `pbia_leads`); si no hay destino configurado, falla explícitamente.
- 2026-03-09: RYS `products` incorpora `sortOrder` editable + orden estable en storefront/admin.
- 2026-03-09: RYS admin incorpora edición de `image` por URL y mantiene ocultar/mostrar con `status`.
- 2026-03-09: Catálogo semilla RYS se amplía como base editable (precios iniciales no definitivos).
- 2026-03-09: Predeploy final: se agregan scripts reproducibles de readiness y smoke (`scripts/predeploy/check-env-readiness.sh`, `scripts/predeploy/smoke-local.sh`).
- 2026-03-09: Política operativa confirmada: sin variables de destino (PBIA) o Sheets (RYS), las APIs fallan explícitamente (`503`/`500`) para evitar falso positivo.
- 2026-03-09: PBIA leads por Sheets usa variable dedicada `PBIA_LEADS_SHEETS_SPREADSHEET_ID` para evitar mezclar hoja de leads con hoja de catálogo RYS por fallback implícito.
- 2026-03-09: Se publica guía breve `docs/ops/DEPLOY_TONIGHT_SHEETS.md` como referencia canónica de activación esta noche.
