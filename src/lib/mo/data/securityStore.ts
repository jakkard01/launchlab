import { createSign, randomBytes, scryptSync } from "crypto";
import {
  formatGoogleTokenError,
  getGoogleServiceAccountConfig,
} from "../../google/serviceAccount";
import { normalizeAdminRole } from "../adminRoles";
import type {
  AdminAuditEntry,
  AdminUserCreateInput,
  AdminUserRecord,
  AdminUserUpdateInput,
} from "./types";

const hashPassword = (password: string) => {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `scrypt:${salt}:${hash}`;
};

const GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token";
const GOOGLE_SHEETS_SCOPE = "https://www.googleapis.com/auth/spreadsheets";
const GOOGLE_SHEETS_API = "https://sheets.googleapis.com/v4/spreadsheets";
const ACCESS_TOKEN_TTL_MS = 55 * 60 * 1000;
const SECURITY_STATE_TTL_MS = 15 * 1000;

const USERS_SHEET = "users";
const AUDIT_SHEET = "audit_log";

const USER_HEADERS = [
  "id",
  "name",
  "username",
  "email",
  "passwordHash",
  "role",
  "isActive",
  "createdAt",
  "updatedAt",
  "lastLoginAt",
] as const;

const AUDIT_HEADERS = [
  "id",
  "actorUserId",
  "actorUsername",
  "actorRole",
  "action",
  "entityType",
  "entityId",
  "productId",
  "productName",
  "field",
  "oldValue",
  "newValue",
  "reversible",
  "revertedAt",
  "revertedByUserId",
  "before",
  "after",
  "createdAt",
] as const;

type CachedValue<T> = {
  expiresAt: number;
  value: T;
};

type SecurityState = {
  users: AdminUserRecord[];
  audit: AdminAuditEntry[];
};

let accessTokenCache: CachedValue<string> | null = null;
let accessTokenInFlight: Promise<string> | null = null;
let securityStateCache: CachedValue<SecurityState> | null = null;
let securityStateInFlight: Promise<SecurityState> | null = null;
let sheetMetaCache: CachedValue<Record<string, unknown>> | null = null;
let sheetMetaInFlight: Promise<Record<string, unknown>> | null = null;

const now = () => Date.now();

const isFresh = <T>(entry: CachedValue<T> | null) =>
  Boolean(entry && entry.expiresAt > now());

const invalidateSecurityCache = () => {
  securityStateCache = null;
  securityStateInFlight = null;
  sheetMetaCache = null;
  sheetMetaInFlight = null;
};

const getSheetsConfig = () =>
  getGoogleServiceAccountConfig({
    spreadsheetIdEnv: "RYS_SHEETS_SPREADSHEET_ID",
    spreadsheetLabel: "RYS",
  });

const base64Url = (value: string | Buffer) =>
  Buffer.from(value)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");

const createSignedJwt = () => {
  const { clientEmail, privateKey } = getSheetsConfig();
  const issuedAt = Math.floor(Date.now() / 1000);
  const header = { alg: "RS256", typ: "JWT" };
  const payload = {
    iss: clientEmail,
    scope: GOOGLE_SHEETS_SCOPE,
    aud: GOOGLE_TOKEN_URL,
    exp: issuedAt + 3600,
    iat: issuedAt,
  };

  const encodedHeader = base64Url(JSON.stringify(header));
  const encodedPayload = base64Url(JSON.stringify(payload));
  const unsignedToken = `${encodedHeader}.${encodedPayload}`;
  const signer = createSign("RSA-SHA256");
  signer.update(unsignedToken);
  signer.end();
  return `${unsignedToken}.${base64Url(signer.sign(privateKey))}`;
};

const getAccessToken = async () => {
  if (isFresh(accessTokenCache)) return accessTokenCache!.value;
  if (accessTokenInFlight) return accessTokenInFlight;

  accessTokenInFlight = (async () => {
    const assertion = createSignedJwt();
    const response = await fetch(GOOGLE_TOKEN_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
        assertion,
      }),
      cache: "no-store",
    });

    const data = (await response.json()) as {
      access_token?: string;
      error?: string;
      error_description?: string;
    };

    if (!response.ok || !data.access_token) {
      throw new Error(formatGoogleTokenError(data.error ?? "", data.error_description));
    }

    accessTokenCache = {
      value: data.access_token,
      expiresAt: now() + ACCESS_TOKEN_TTL_MS,
    };
    return data.access_token;
  })();

  try {
    return await accessTokenInFlight;
  } finally {
    accessTokenInFlight = null;
  }
};

const getSpreadsheetUrl = (suffix: string) => {
  const { spreadsheetId } = getSheetsConfig();
  return `${GOOGLE_SHEETS_API}/${spreadsheetId}${suffix}`;
};

const sheetsFetch = async (input: string, init?: RequestInit) => {
  const accessToken = await getAccessToken();
  const response = await fetch(input, {
    ...init,
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });

  const raw = await response.text();
  const data = raw ? JSON.parse(raw) : {};
  if (!response.ok) {
    const message =
      data?.error?.message ??
      data?.message ??
      "No se pudo completar la operación con Google Sheets.";
    throw new Error(message);
  }
  return data as Record<string, unknown>;
};

const getSpreadsheetMeta = async () => {
  if (isFresh(sheetMetaCache)) return sheetMetaCache!.value;
  if (sheetMetaInFlight) return sheetMetaInFlight;
  sheetMetaInFlight = (async () => {
    const meta = await sheetsFetch(getSpreadsheetUrl(""));
    sheetMetaCache = { value: meta, expiresAt: now() + SECURITY_STATE_TTL_MS };
    return meta;
  })();
  try {
    return await sheetMetaInFlight;
  } finally {
    sheetMetaInFlight = null;
  }
};

const ensureSheet = async (title: string) => {
  const meta = (await getSpreadsheetMeta()) as {
    sheets?: Array<{ properties?: { title?: string } }>;
  };
  const exists = meta.sheets?.some((sheet) => sheet.properties?.title === title);
  if (exists) return;

  await sheetsFetch(getSpreadsheetUrl(":batchUpdate"), {
    method: "POST",
    body: JSON.stringify({
      requests: [{ addSheet: { properties: { title } } }],
    }),
  });
  sheetMetaCache = null;
};

const readSheet = async (sheetName: string) => {
  await ensureSheet(sheetName);
  const encodedRange = encodeURIComponent(`${sheetName}!A:Z`);
  const data = (await sheetsFetch(
    getSpreadsheetUrl(`/values/${encodedRange}`)
  )) as { values?: string[][] };
  return Array.isArray(data.values) ? data.values : [];
};

const writeSheet = async (
  sheetName: string,
  headers: readonly string[],
  rows: string[][]
) => {
  await ensureSheet(sheetName);
  const clearRange = encodeURIComponent(`${sheetName}!A:Z`);
  const writeRange = encodeURIComponent(`${sheetName}!A1:Z`);

  await sheetsFetch(`${getSpreadsheetUrl(`/values/${clearRange}`)}:clear`, {
    method: "POST",
    body: JSON.stringify({}),
  });

  await sheetsFetch(
    `${getSpreadsheetUrl(`/values/${writeRange}`)}?valueInputOption=RAW`,
    {
      method: "PUT",
      body: JSON.stringify({
        range: `${sheetName}!A1:Z`,
        majorDimension: "ROWS",
        values: [headers, ...rows],
      }),
    }
  );
  invalidateSecurityCache();
};

const parseUsers = (rows: string[][]): AdminUserRecord[] => {
  if (rows.length <= 1) return [];
  const headers = rows[0];
  return rows
    .slice(1)
    .filter((row) => row[0])
    .map((row) => {
      const record = Object.fromEntries(headers.map((key, index) => [key, row[index] ?? ""]));
      return {
        id: String(record.id),
        name: String(record.name),
        username: String(record.username ?? ""),
        email: String(record.email ?? ""),
        passwordHash: String(record.passwordHash ?? ""),
        role: normalizeAdminRole(record.role),
        isActive: String(record.isActive ?? "true") === "true",
        createdAt: String(record.createdAt ?? ""),
        updatedAt: String(record.updatedAt ?? ""),
        lastLoginAt: String(record.lastLoginAt ?? "") || undefined,
      };
    });
};

const serializeUsers = (users: AdminUserRecord[]) =>
  users.map((user) => [
    user.id,
    user.name,
    user.username,
    user.email,
    user.passwordHash,
    user.role,
    String(user.isActive),
    user.createdAt,
    user.updatedAt,
    user.lastLoginAt ?? "",
  ]);

const parseAudit = (rows: string[][]): AdminAuditEntry[] => {
  if (rows.length <= 1) return [];
  const headers = rows[0];
  return rows
    .slice(1)
    .filter((row) => row[0])
    .map((row) => {
      const record = Object.fromEntries(headers.map((key, index) => [key, row[index] ?? ""]));
      return {
        id: String(record.id),
        actorUserId: String(record.actorUserId ?? ""),
        actorUsername: String(record.actorUsername ?? "") || undefined,
        actorRole: (String(record.actorRole ?? "") || undefined) as
          | AdminAuditEntry["actorRole"]
          | undefined,
        action: record.action as AdminAuditEntry["action"],
        entityType: record.entityType as AdminAuditEntry["entityType"],
        entityId: String(record.entityId ?? ""),
        productId: String(record.productId ?? "") || undefined,
        productName: String(record.productName ?? "") || undefined,
        field: String(record.field ?? "") || undefined,
        oldValue: String(record.oldValue ?? "") || undefined,
        newValue: String(record.newValue ?? "") || undefined,
        reversible: String(record.reversible ?? "false") === "true",
        revertedAt: String(record.revertedAt ?? "") || undefined,
        revertedByUserId: String(record.revertedByUserId ?? "") || undefined,
        before: String(record.before ?? "") || undefined,
        after: String(record.after ?? "") || undefined,
        createdAt: String(record.createdAt ?? ""),
      };
    })
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
};

const serializeAudit = (entries: AdminAuditEntry[]) =>
  entries.map((entry) => [
    entry.id,
    entry.actorUserId,
    entry.actorUsername ?? "",
    entry.actorRole ?? "",
    entry.action,
    entry.entityType,
    entry.entityId,
    entry.productId ?? "",
    entry.productName ?? "",
    entry.field ?? "",
    entry.oldValue ?? "",
    entry.newValue ?? "",
    String(Boolean(entry.reversible)),
    entry.revertedAt ?? "",
    entry.revertedByUserId ?? "",
    entry.before ?? "",
    entry.after ?? "",
    entry.createdAt,
  ]);

const ensureSecuritySheets = async () => {
  const users = await readSheet(USERS_SHEET);
  if (users.length === 0) {
    await writeSheet(USERS_SHEET, USER_HEADERS, []);
  }
  const audit = await readSheet(AUDIT_SHEET);
  if (audit.length === 0) {
    await writeSheet(AUDIT_SHEET, AUDIT_HEADERS, []);
  }
};

const loadSecurityState = async ({ forceRefresh = false }: { forceRefresh?: boolean } = {}) => {
  if (!forceRefresh && isFresh(securityStateCache)) return securityStateCache!.value;
  if (!forceRefresh && securityStateInFlight) return securityStateInFlight;

  securityStateInFlight = (async () => {
    await ensureSecuritySheets();
    const usersRows = await readSheet(USERS_SHEET);
    const auditRows = await readSheet(AUDIT_SHEET);
    const nextState = {
      users: parseUsers(usersRows),
      audit: parseAudit(auditRows),
    };
    securityStateCache = {
      value: nextState,
      expiresAt: now() + SECURITY_STATE_TTL_MS,
    };
    return nextState;
  })();

  try {
    return await securityStateInFlight;
  } finally {
    securityStateInFlight = null;
  }
};

const buildUserIdentifier = (input: { username?: string; email?: string }) => {
  return {
    username: (input.username ?? "").trim().toLowerCase(),
    email: (input.email ?? "").trim().toLowerCase(),
  };
};

export const getAdminUsers = async () => {
  const state = await loadSecurityState();
  return state.users;
};

export const getAdminUserById = async (id: string) => {
  const users = await getAdminUsers();
  return users.find((user) => user.id === id) ?? null;
};

export const getAdminUserByIdentifier = async (identifier: string) => {
  const normalized = identifier.trim().toLowerCase();
  if (!normalized) return null;
  const users = await getAdminUsers();
  return (
    users.find(
      (user) =>
        user.isActive &&
        (user.username.toLowerCase() === normalized ||
          user.email.toLowerCase() === normalized)
    ) ?? null
  );
};

export const getAuditEntries = async (limit = 200) => {
  const state = await loadSecurityState();
  return state.audit.slice(0, limit);
};

export const getAuditEntriesForUser = async (userId: string, limit = 20) => {
  const state = await loadSecurityState();
  return state.audit.filter((entry) => entry.actorUserId === userId).slice(0, limit);
};

export const getAuditEntryById = async (id: string) => {
  const state = await loadSecurityState();
  return state.audit.find((entry) => entry.id === id) ?? null;
};

export const createAdminUser = async (input: AdminUserCreateInput) => {
  const state = await loadSecurityState({ forceRefresh: true });
  const identifier = buildUserIdentifier(input);
  if (!identifier.username && !identifier.email) {
    throw new Error("Debes indicar email o username para el usuario.");
  }

  const duplicated = state.users.find(
    (user) =>
      user.username.toLowerCase() === identifier.username ||
      (identifier.email && user.email.toLowerCase() === identifier.email)
  );
  if (duplicated) {
    throw new Error("Ya existe un usuario con ese email o username.");
  }

  const timestamp = new Date().toISOString();
  const user: AdminUserRecord = {
    id: `usr_${Date.now()}_${Math.random().toString(16).slice(2, 8)}`,
    name: input.name.trim(),
    username: identifier.username,
    email: identifier.email,
    passwordHash: hashPassword(input.password),
    role: normalizeAdminRole(input.role),
    isActive: input.isActive ?? true,
    createdAt: timestamp,
    updatedAt: timestamp,
    lastLoginAt: "",
  };

  await writeSheet(USERS_SHEET, USER_HEADERS, serializeUsers([user, ...state.users]));
  return user;
};

export const updateAdminUser = async (input: AdminUserUpdateInput) => {
  const state = await loadSecurityState({ forceRefresh: true });
  const target = state.users.find((user) => user.id === input.id);
  if (!target) {
    throw new Error("Usuario no encontrado.");
  }

  const identifier = buildUserIdentifier({
    username: input.username ?? target.username,
    email: input.email ?? target.email,
  });

  const duplicated = state.users.find(
    (user) =>
      user.id !== input.id &&
      (user.username.toLowerCase() === identifier.username ||
        (identifier.email && user.email.toLowerCase() === identifier.email))
  );
  if (duplicated) {
    throw new Error("Ya existe otro usuario con ese email o username.");
  }

  const updatedAt = new Date().toISOString();
  const nextUsers = state.users.map((user) =>
    user.id === input.id
      ? {
          ...user,
          name: input.name?.trim() || user.name,
          username: identifier.username,
          email: identifier.email,
          passwordHash: input.password ? hashPassword(input.password) : user.passwordHash,
          role: input.role ? normalizeAdminRole(input.role) : user.role,
          isActive: input.isActive ?? user.isActive,
          updatedAt,
        }
      : user
  );

  await writeSheet(USERS_SHEET, USER_HEADERS, serializeUsers(nextUsers));
  return nextUsers.find((user) => user.id === input.id)!;
};

export const touchAdminUserLastLogin = async (userId: string) => {
  const state = await loadSecurityState({ forceRefresh: true });
  const updatedAt = new Date().toISOString();
  const nextUsers = state.users.map((user) =>
    user.id === userId
      ? { ...user, lastLoginAt: updatedAt, updatedAt }
      : user
  );
  await writeSheet(USERS_SHEET, USER_HEADERS, serializeUsers(nextUsers));
};

export const appendAuditEntry = async (
  entry: Omit<AdminAuditEntry, "id" | "createdAt">
) => {
  const state = await loadSecurityState({ forceRefresh: true });
  const nextEntry: AdminAuditEntry = {
    ...entry,
    id: `audit_${Date.now()}_${Math.random().toString(16).slice(2, 8)}`,
    createdAt: new Date().toISOString(),
  };
  await writeSheet(
    AUDIT_SHEET,
    AUDIT_HEADERS,
    serializeAudit([nextEntry, ...state.audit].slice(0, 1000))
  );
  return nextEntry;
};

export const markAuditEntryReverted = async (
  id: string,
  revertedByUserId: string
) => {
  const state = await loadSecurityState({ forceRefresh: true });
  const nextEntries = state.audit.map((entry) =>
    entry.id === id
      ? {
          ...entry,
          revertedAt: new Date().toISOString(),
          revertedByUserId,
        }
      : entry
  );
  await writeSheet(AUDIT_SHEET, AUDIT_HEADERS, serializeAudit(nextEntries));
  return nextEntries.find((entry) => entry.id === id) ?? null;
};
