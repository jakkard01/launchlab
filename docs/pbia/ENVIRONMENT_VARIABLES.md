# Environment Variables

## Variables

```bash
PBIA_N8N_WEBHOOK_URL=
PBIA_LEAD_DRY_RUN=true
PBIA_LOCAL_AI_ENDPOINT=http://localhost:11434
PBIA_LOCAL_AI_MODEL=
```

## PBIA_N8N_WEBHOOK_URL

Webhook privado de n8n para recibir leads del bot.

- No commitear el valor real.
- Configurar en Vercel Project Settings -> Environment Variables.
- Usar solo en servidor.

## PBIA_LEAD_DRY_RUN

Controla si `/api/pbia-lead` reenvia a n8n.

- `true` o variable ausente: responde OK en modo dry-run.
- `false`: intenta reenviar a `PBIA_N8N_WEBHOOK_URL`.

## PBIA_LOCAL_AI_ENDPOINT

Endpoint futuro para Ollama/local server.

- Valor local por defecto: `http://localhost:11434`.
- No se expone directamente al navegador.

## PBIA_LOCAL_AI_MODEL

Modelo futuro para IA local.

- Mantener vacio hasta decidir modelo.
- No bloquea la landing.
