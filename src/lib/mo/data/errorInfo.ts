import { MoApiError } from "./apiAdapter";

export type MoBackendErrorKind =
  | "auth"
  | "not_configured"
  | "placeholder"
  | "private_key"
  | "invalid_grant"
  | "schema"
  | "network"
  | "unknown";

export type MoBackendErrorInfo = {
  kind: MoBackendErrorKind;
  title: string;
  message: string;
  help: string;
};

const buildInfo = (
  kind: MoBackendErrorKind,
  title: string,
  message: string,
  help: string
): MoBackendErrorInfo => ({ kind, title, message, help });

export const getMoBackendErrorInfo = (error: unknown): MoBackendErrorInfo => {
  const message =
    error instanceof Error ? error.message : "No se pudo completar la operación.";

  if (error instanceof MoApiError && (error.status === 401 || error.status === 403)) {
    return buildInfo(
      "auth",
      "Sesión inválida o acceso denegado",
      "La sesión admin no está activa o la clave no fue aceptada.",
      "Vuelve a entrar desde /RYSminisuper/admin/acceso y prueba de nuevo."
    );
  }

  if (message.includes("Unauthorized")) {
    return buildInfo(
      "auth",
      "Sesión inválida o acceso denegado",
      "La cookie del admin no está activa o ya venció.",
      "Vuelve a entrar desde /RYSminisuper/admin/acceso."
    );
  }

  if (
    message.includes("GOOGLE_SERVICE_ACCOUNT_EMAIL no apunta") ||
    message.includes("tu-proyecto.iam.gserviceaccount.com")
  ) {
    return buildInfo(
      "placeholder",
      "Google Sheets sigue con un placeholder",
      "La variable GOOGLE_SERVICE_ACCOUNT_EMAIL no apunta a una cuenta real.",
      "Sustituye GOOGLE_SERVICE_ACCOUNT_EMAIL por el client_email exacto del JSON de la service account activa."
    );
  }

  if (message.includes("Google Sheets no configurado")) {
    return buildInfo(
      "not_configured",
      "Falta configuración de Google Sheets",
      "El runtime no tiene todas las variables requeridas para RYS.",
      "Define RYS_SHEETS_SPREADSHEET_ID, GOOGLE_SERVICE_ACCOUNT_EMAIL y GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY."
    );
  }

  if (
    message.includes("PRIVATE_KEY no tiene formato PEM válido") ||
    message.includes("PRIVATE_KEY no se pudo decodificar")
  ) {
    return buildInfo(
      "private_key",
      "La clave privada de Google está mal cargada",
      "La private key no pudo validarse como PEM.",
      "Revisa comillas envolventes, saltos de línea escapados (\\n) y que la clave corresponda a la misma service account."
    );
  }

  if (
    message.includes("account not found") ||
    message.includes("invalid_grant")
  ) {
    return buildInfo(
      "invalid_grant",
      "Google Sheets rechazó la autenticación",
      message,
      "La causa real suele ser service account inexistente, placeholder o private key que no corresponde a ese email."
    );
  }

  if (
    message.includes("Esquema inválido") ||
    message.includes("Unable to parse range") ||
    message.includes("Range")
  ) {
    return buildInfo(
      "schema",
      "La hoja no coincide con el esquema esperado",
      message,
      "Revisa nombres de pestañas (`products`, `orders`, `daily_sales`) y columnas obligatorias."
    );
  }

  if (
    message.includes("fetch failed") ||
    message.includes("network") ||
    message.includes("ENOTFOUND")
  ) {
    return buildInfo(
      "network",
      "No hubo conexión con Google Sheets",
      message,
      "Comprueba salida de red del runtime y vuelve a intentar."
    );
  }

  return buildInfo(
    "unknown",
    "No se pudo completar la operación",
    message,
    "Revisa /api/mo/products y /api/mo/admin para ver el detalle del backend."
  );
};
