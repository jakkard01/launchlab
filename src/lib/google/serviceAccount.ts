import { createPrivateKey } from "crypto";

type ServiceAccountConfigOptions = {
  spreadsheetIdEnv: string;
  spreadsheetLabel: string;
  allowMissing?: boolean;
};

export type GoogleServiceAccountConfig = {
  spreadsheetId: string;
  clientEmail: string;
  privateKey: string;
};

export const normalizeGoogleEnvValue = (value: string | undefined) => {
  const trimmed = (value ?? "").trim();

  if (
    (trimmed.startsWith("\"") && trimmed.endsWith("\"")) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }

  return trimmed;
};

export const normalizeGooglePrivateKey = (value: string | undefined) =>
  normalizeGoogleEnvValue(value).replace(/\r\n/g, "\n").replace(/\\n/g, "\n");

export const isPlaceholderServiceAccountEmail = (email: string) =>
  /tu-proyecto/i.test(email) || !email.endsWith(".iam.gserviceaccount.com");

export const getGoogleServiceAccountConfig = ({
  spreadsheetIdEnv,
  spreadsheetLabel,
  allowMissing = false,
}: ServiceAccountConfigOptions): GoogleServiceAccountConfig | null => {
  const spreadsheetId = normalizeGoogleEnvValue(process.env[spreadsheetIdEnv]);
  const clientEmail = normalizeGoogleEnvValue(
    process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL
  );
  const privateKey = normalizeGooglePrivateKey(
    process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY
  );

  if (!spreadsheetId || !clientEmail || !privateKey) {
    if (allowMissing) {
      return null;
    }

    throw new Error(
      `Google Sheets no configurado. Define ${spreadsheetIdEnv}, GOOGLE_SERVICE_ACCOUNT_EMAIL y GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY para ${spreadsheetLabel}.`
    );
  }

  if (isPlaceholderServiceAccountEmail(clientEmail)) {
    throw new Error(
      "GOOGLE_SERVICE_ACCOUNT_EMAIL no apunta a una cuenta de servicio real. Reemplaza el placeholder por el client_email exacto del JSON de Google Cloud."
    );
  }

  if (
    !privateKey.startsWith("-----BEGIN PRIVATE KEY-----") ||
    !privateKey.trim().endsWith("-----END PRIVATE KEY-----")
  ) {
    throw new Error(
      "GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY no tiene formato PEM válido. Revisa comillas envolventes y saltos de línea escapados (\\n)."
    );
  }

  try {
    createPrivateKey({ key: privateKey, format: "pem" });
  } catch {
    throw new Error(
      "GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY no se pudo decodificar como PEM. Revisa que la clave pertenezca a la misma cuenta de servicio y no esté truncada."
    );
  }

  return { spreadsheetId, clientEmail, privateKey };
};

export const formatGoogleTokenError = (error: string, description?: string) => {
  const detail = description?.trim();

  if (error === "invalid_grant" && detail?.toLowerCase().includes("account not found")) {
    return "No se pudo obtener token de Google Sheets: invalid_grant (account not found). GOOGLE_SERVICE_ACCOUNT_EMAIL apunta a una cuenta de servicio inexistente, borrada o distinta de la clave privada configurada.";
  }

  if (error === "invalid_grant") {
    return `No se pudo obtener token de Google Sheets: invalid_grant${detail ? ` (${detail})` : ""}. Revisa que GOOGLE_SERVICE_ACCOUNT_EMAIL y GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY pertenezcan a la misma service account activa.`;
  }

  return `No se pudo obtener token de Google Sheets${error ? `: ${error}` : ""}${detail ? ` (${detail})` : "."}`;
};
