# N8N Webhook Contract

## Endpoint

- Metodo: `POST`
- URL: variable de entorno `PBIA_N8N_WEBHOOK_URL`
- No incluir la URL real en el repo.

## Payload

```json
{
  "source": "poweredbyia.com",
  "channel": "sales_bot",
  "leadTemperature": "cold|warm|hot",
  "score": 0,
  "recommendedOffer": "mejora_web_express|web_local_base|pack_web_contactos|pack_pro_captacion",
  "businessType": "",
  "hasWebsite": true,
  "goal": "",
  "message": "",
  "ctaClicked": "",
  "pageUrl": "",
  "createdAt": "",
  "userAgent": ""
}
```

## Respuesta esperada

El workflow puede responder:

```json
{ "ok": true }
```

La landing no debe bloquearse si n8n falla. La API responde de forma controlada con `ok: true` y `mode: "webhook_error"` para evitar romper la experiencia.

## Flujo n8n recomendado

1. Webhook.
2. Validacion basica de campos.
3. Google Sheets o base simple.
4. Email o Telegram interno.
5. Seguimiento manual por WhatsApp/correo.

## Campos a evitar por ahora

- DNI/NIE, datos bancarios, datos medicos, credenciales o informacion sensible.
- Telefono/email dentro del bot hasta revisar privacidad y consentimiento.
