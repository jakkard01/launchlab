export type MoBackendErrorCode =
  | "SHEETS_NOT_CONFIGURED"
  | "SHEETS_SERVICE_ACCOUNT_PLACEHOLDER"
  | "SHEETS_PRIVATE_KEY_FORMAT"
  | "SHEETS_PRIVATE_KEY_INVALID"
  | "SHEETS_SERVICE_ACCOUNT_NOT_FOUND"
  | "SHEETS_INVALID_GRANT"
  | "SHEETS_AUTH_FAILED"
  | "SHEETS_SCHEMA_RANGE_ERROR"
  | "SHEETS_SCHEMA_INVALID"
  | "SHEETS_READ_FAILED"
  | "ADMIN_BACKEND_ERROR";

export const getMoBackendErrorMessage = (
  error: unknown,
  fallbackMessage: string
) => (error instanceof Error ? error.message : fallbackMessage);

export const getMoBackendErrorCode = (
  error: unknown,
  fallbackCode: MoBackendErrorCode
): MoBackendErrorCode => {
  const message = getMoBackendErrorMessage(error, "");

  if (message.includes("Google Sheets no configurado")) {
    return "SHEETS_NOT_CONFIGURED";
  }

  if (message.includes("GOOGLE_SERVICE_ACCOUNT_EMAIL no apunta")) {
    return "SHEETS_SERVICE_ACCOUNT_PLACEHOLDER";
  }

  if (message.includes("PRIVATE_KEY no tiene formato PEM válido")) {
    return "SHEETS_PRIVATE_KEY_FORMAT";
  }

  if (message.includes("PRIVATE_KEY no se pudo decodificar")) {
    return "SHEETS_PRIVATE_KEY_INVALID";
  }

  if (message.includes("account not found")) {
    return "SHEETS_SERVICE_ACCOUNT_NOT_FOUND";
  }

  if (message.includes("invalid_grant")) {
    return "SHEETS_INVALID_GRANT";
  }

  if (message.includes("No se pudo obtener token de Google Sheets")) {
    return "SHEETS_AUTH_FAILED";
  }

  if (message.includes("Unable to parse range") || message.includes("Range")) {
    return "SHEETS_SCHEMA_RANGE_ERROR";
  }

  if (message.includes("Esquema inválido")) {
    return "SHEETS_SCHEMA_INVALID";
  }

  return fallbackCode;
};
