# Ollama Local Roadmap

## Estado actual

El bot esta en modo FAQ/offline. No hay IA local conectada en produccion y no se promete atencion 24/7.

## Objetivo futuro

Preparar una capa opcional de IA local/privada para responder dudas basicas, orientar paquetes y resumir leads antes de enviarlos a n8n.

## Variables previstas

- `PBIA_LOCAL_AI_ENDPOINT=http://localhost:11434`
- `PBIA_LOCAL_AI_MODEL=`

## Reglas de seguridad

- Nunca exponer Ollama directamente al navegador en produccion.
- Si se implementa, usar una API route server-side como `/api/pbia-ai`.
- Mantener fallback FAQ si Ollama esta offline.
- Limitar longitud de prompts y respuestas.
- No enviar datos personales sensibles al modelo.

## Roadmap tecnico

1. Mantener FAQ/scoring actual como fallback.
2. Crear `/api/pbia-ai` server-side cuando el backend local este listo.
3. Detectar disponibilidad del endpoint local.
4. Responder con FAQ si la IA local no responde.
5. Registrar solo eventos minimos en n8n.
6. Revisar privacidad antes de pedir email/telefono dentro del bot.
