# PBIA Sales Bot Ecosystem

## Objetivo

Convertir el chat demo de Powered by IA en una base comercial real:

Landing -> bot vendedor -> scoring -> webhook n8n -> registro/alerta -> seguimiento.

La version actual mantiene fallback FAQ/offline. No promete atencion automatica 24/7 y no afirma que haya IA local conectada en produccion.

## Componentes

- `src/app/components/sales-bot/SalesBot.tsx`: orquestador cliente.
- `SalesBotLauncher.tsx`: CTA flotante discreto.
- `SalesBotPanel.tsx`: panel conversacional con scroll interno.
- `SalesBotQuickReplies.tsx`: respuestas rapidas comerciales.
- `SalesBotMessage.tsx`: burbujas de chat.

## Utilidades

- `src/app/lib/sales-bot/leadScoring.ts`: scoring y clasificacion.
- `recommendations.ts`: recomendacion de oferta.
- `whatsapp.ts`: helper de WhatsApp.
- `salesBotConfig.ts`: configuracion publica del bot.
- `types.ts`: contrato de tipos.

## Niveles de lead

- `cold`: 0-3 puntos.
- `warm`: 4-7 puntos.
- `hot`: 8+ puntos.

## Reglas de scoring

- Pregunta por precio: +2.
- Ya tiene negocio: +3.
- Ya tiene web: +1.
- No tiene web: +2.
- Quiere mas contactos: +3.
- Pregunta por tiempo de entrega: +2.
- Pide presupuesto/contacto: +5.
- Pulsa WhatsApp/diagnostico: +5.

## Ofertas recomendadas

- Ya tiene web y quiere mejorar: Mejora Web Express desde 180 €.
- No tiene web: Web Local Base desde 350 €.
- Quiere captar/ordenar contactos: Pack Web + Contactos desde 500 €.
- Quiere algo mas completo: Pack Pro Captacion desde 750 €.

## Privacidad y seguridad

- No capturar datos personales sensibles.
- No guardar cookies ni tracking nuevo.
- No incluir secretos en frontend ni repositorio.
- El webhook n8n se configura solo por variable de entorno.
- Si en el futuro se pide email/telefono dentro del bot, revisar privacidad y textos legales antes de activarlo.
