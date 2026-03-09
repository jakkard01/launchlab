import { createSign } from "crypto";

export type ContactLead = {
  leadId: string;
  createdAt: string;
  name: string;
  email: string;
  message: string;
  source?: string;
  clientIp: string;
};

const GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token";
const GOOGLE_SHEETS_SCOPE = "https://www.googleapis.com/auth/spreadsheets";
const GOOGLE_SHEETS_API = "https://sheets.googleapis.com/v4/spreadsheets";
const LEADS_SHEET = "pbia_leads";
const LEAD_HEADERS = [
  "leadId",
  "createdAt",
  "name",
  "email",
  "source",
  "clientIp",
  "message",
] as const;

const base64Url = (value: string | Buffer) =>
  Buffer.from(value)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");

const getSheetsConfig = () => {
  const spreadsheetId = process.env.PBIA_LEADS_SHEETS_SPREADSHEET_ID ?? "";
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL ?? "";
  const privateKey = (process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY ?? "").replace(
    /\\n/g,
    "\n"
  );

  if (!spreadsheetId || !clientEmail || !privateKey) {
    return null;
  }

  return { spreadsheetId, clientEmail, privateKey };
};

const createSignedJwt = (clientEmail: string, privateKey: string) => {
  const now = Math.floor(Date.now() / 1000);
  const header = { alg: "RS256", typ: "JWT" };
  const payload = {
    iss: clientEmail,
    scope: GOOGLE_SHEETS_SCOPE,
    aud: GOOGLE_TOKEN_URL,
    exp: now + 3600,
    iat: now,
  };
  const encodedHeader = base64Url(JSON.stringify(header));
  const encodedPayload = base64Url(JSON.stringify(payload));
  const unsignedToken = `${encodedHeader}.${encodedPayload}`;
  const signer = createSign("RSA-SHA256");
  signer.update(unsignedToken);
  signer.end();
  const signature = signer.sign(privateKey);
  return `${unsignedToken}.${base64Url(signature)}`;
};

const getAccessToken = async (clientEmail: string, privateKey: string) => {
  const assertion = createSignedJwt(clientEmail, privateKey);
  const response = await fetch(GOOGLE_TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion,
    }),
    cache: "no-store",
  });
  const data = (await response.json()) as { access_token?: string; error?: string };

  if (!response.ok || !data.access_token) {
    throw new Error(
      `No se pudo obtener token de Google Sheets${data.error ? `: ${data.error}` : "."}`
    );
  }

  return data.access_token;
};

const sheetsFetch = async (
  spreadsheetId: string,
  clientEmail: string,
  privateKey: string,
  suffix: string,
  init?: RequestInit
) => {
  const accessToken = await getAccessToken(clientEmail, privateKey);
  const response = await fetch(
    `${GOOGLE_SHEETS_API}/${spreadsheetId}${suffix}`,
    {
      ...init,
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        ...(init?.headers ?? {}),
      },
    }
  );
  const raw = await response.text();
  const data = raw ? (JSON.parse(raw) as Record<string, unknown>) : {};

  if (!response.ok) {
    const message =
      (data?.error as { message?: string } | undefined)?.message ??
      (data?.message as string | undefined) ??
      "No se pudo escribir en Google Sheets.";
    throw new Error(message);
  }
};

const ensureSheet = async (
  spreadsheetId: string,
  clientEmail: string,
  privateKey: string,
  title: string
) => {
  const metaResponse = await fetch(
    `${GOOGLE_SHEETS_API}/${spreadsheetId}`,
    {
      headers: {
        Authorization: `Bearer ${await getAccessToken(clientEmail, privateKey)}`,
      },
      cache: "no-store",
    }
  );
  const meta = (await metaResponse.json()) as {
    sheets?: Array<{ properties?: { title?: string } }>;
  };
  const exists = meta.sheets?.some((sheet) => sheet.properties?.title === title);
  if (exists) return;

  await sheetsFetch(spreadsheetId, clientEmail, privateKey, ":batchUpdate", {
    method: "POST",
    body: JSON.stringify({
      requests: [{ addSheet: { properties: { title } } }],
    }),
  });
};

const ensureHeaders = async (
  spreadsheetId: string,
  clientEmail: string,
  privateKey: string
) => {
  await ensureSheet(spreadsheetId, clientEmail, privateKey, LEADS_SHEET);

  const readRange = encodeURIComponent(`${LEADS_SHEET}!A1:G1`);
  const response = await fetch(
    `${GOOGLE_SHEETS_API}/${spreadsheetId}/values/${readRange}`,
    {
      headers: {
        Authorization: `Bearer ${await getAccessToken(clientEmail, privateKey)}`,
      },
      cache: "no-store",
    }
  );
  const data = (await response.json()) as { values?: string[][] };
  const hasHeaders = Array.isArray(data.values) && data.values.length > 0;
  if (hasHeaders) return;

  const writeRange = encodeURIComponent(`${LEADS_SHEET}!A1:G1`);
  await sheetsFetch(
    spreadsheetId,
    clientEmail,
    privateKey,
    `/values/${writeRange}?valueInputOption=RAW`,
    {
      method: "PUT",
      body: JSON.stringify({
        range: `${LEADS_SHEET}!A1:G1`,
        majorDimension: "ROWS",
        values: [LEAD_HEADERS],
      }),
    }
  );
};

const deliverToWebhook = async (lead: ContactLead) => {
  const webhookUrl = process.env.CONTACT_WEBHOOK_URL ?? "";
  if (!webhookUrl) return false;

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(process.env.CONTACT_WEBHOOK_TOKEN
        ? { Authorization: `Bearer ${process.env.CONTACT_WEBHOOK_TOKEN}` }
        : {}),
    },
    body: JSON.stringify(lead),
    cache: "no-store",
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(
      `Webhook de contacto rechazo el lead (status ${response.status})${text ? `: ${text}` : "."}`
    );
  }

  return true;
};

const deliverToSheets = async (lead: ContactLead) => {
  const config = getSheetsConfig();
  if (!config) return false;
  const { spreadsheetId, clientEmail, privateKey } = config;
  await ensureHeaders(spreadsheetId, clientEmail, privateKey);
  const appendRange = encodeURIComponent(`${LEADS_SHEET}!A:G`);
  await sheetsFetch(
    spreadsheetId,
    clientEmail,
    privateKey,
    `/values/${appendRange}:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS`,
    {
      method: "POST",
      body: JSON.stringify({
        values: [
          [
            lead.leadId,
            lead.createdAt,
            lead.name,
            lead.email,
            lead.source ?? "",
            lead.clientIp,
            lead.message,
          ],
        ],
      }),
    }
  );
  return true;
};

export const deliverContactLead = async (lead: ContactLead) => {
  if (await deliverToWebhook(lead)) {
    return { channel: "webhook" as const };
  }

  if (await deliverToSheets(lead)) {
    return { channel: "sheets" as const };
  }

  throw new Error(
    "No hay destino de contacto configurado. Define CONTACT_WEBHOOK_URL o PBIA_LEADS_SHEETS_SPREADSHEET_ID con credenciales de Google Sheets."
  );
};
