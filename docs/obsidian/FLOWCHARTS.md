# FLOWCHARTS

## Flujo de venta
```mermaid
graph TD
  A[Lead] --> B[Llamada]
  B --> C[Propuesta]
  C --> D[Entrega]
  D --> E[Soporte]
```

## Flujo producción video
```mermaid
graph TD
  V1[Brief] --> V2[Guion]
  V2 --> V3[Edicion]
  V3 --> V4[Revision]
  V4 --> V5[Entrega]
```

## Flujo doblaje
```mermaid
graph TD
  D1[Video master] --> D2[Traduccion]
  D2 --> D3[Voiceover]
  D3 --> D4[QA + subtitulos]
  D4 --> D5[Entrega]
```

## Arbol FAQ bot (10 preguntas)
```mermaid
graph TD
  Q1[Inicio] --> Q2[Plazos]
  Q1 --> Q3[Alcance]
  Q3 --> Q4[Revisiones]
  Q4 --> Q5[Integraciones]
  Q5 --> Q6[Soporte]
  Q6 --> Q7[Cambios posteriores]
  Q7 --> Q8[Privacidad]
  Q8 --> Q9[Canales]
  Q9 --> Q10[Proximos pasos]
  Q10 --> CTA1[WhatsApp]
  Q10 --> CTA2[/contact]
```
