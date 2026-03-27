import {
  createHmac,
  randomBytes,
  scryptSync,
  timingSafeEqual,
} from "crypto";
import type { NextRequest } from "next/server";
import type {
  AdminRole,
  AdminSessionUser,
  AdminUserRecord,
} from "./data/types";
import { normalizeAdminRole } from "./adminRoles";
import {
  getAdminUserById,
  getAdminUserByIdentifier,
  touchAdminUserLastLogin,
} from "./data/securityStore";

export const MO_ADMIN_SESSION_COOKIE = "mo_admin_session";
const SESSION_TTL_SECONDS = 60 * 60 * 8;
const LOGIN_WINDOW_MS = 10 * 60 * 1000;
const LOGIN_MAX_ATTEMPTS = 8;

type LoginBucket = {
  count: number;
  resetAt: number;
};

type SessionPayload = {
  userId: string;
  role: AdminRole | "viewer";
  iat: number;
  exp: number;
  legacy?: boolean;
};

const loginBuckets = new Map<string, LoginBucket>();

const base64UrlEncode = (value: string) =>
  Buffer.from(value)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");

const base64UrlDecode = (value: string) =>
  Buffer.from(
    value.replace(/-/g, "+").replace(/_/g, "/"),
    "base64"
  ).toString("utf8");

const getSessionSecret = () =>
  (
    process.env.MO_ADMIN_SESSION_SECRET ??
    process.env.ADMIN_PASSWORD ??
    process.env.ADMIN_PIN ??
    process.env.MO_ADMIN_KEY ??
    "rys-admin-dev-secret"
  ).trim();

const signValue = (payload: string) =>
  createHmac("sha256", getSessionSecret()).update(payload).digest("base64url");

export const hashPassword = (password: string) => {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `scrypt:${salt}:${hash}`;
};

export const verifyPassword = (password: string, storedHash: string) => {
  const [scheme, salt, expectedHash] = storedHash.split(":");
  if (scheme !== "scrypt" || !salt || !expectedHash) return false;
  const candidate = scryptSync(password, salt, 64).toString("hex");
  return timingSafeEqual(Buffer.from(candidate), Buffer.from(expectedHash));
};

export const createSessionToken = (user: AdminSessionUser) => {
  const issuedAt = Math.floor(Date.now() / 1000);
  const payload: SessionPayload = {
    userId: user.id,
    role: user.role,
    iat: issuedAt,
    exp: issuedAt + SESSION_TTL_SECONDS,
    legacy: user.isLegacy,
  };
  const encodedPayload = base64UrlEncode(JSON.stringify(payload));
  const signature = signValue(encodedPayload);
  return `${encodedPayload}.${signature}`;
};

const parseSessionToken = (token: string): SessionPayload | null => {
  const [encodedPayload, signature] = token.split(".");
  if (!encodedPayload || !signature) return null;

  const expectedSignature = signValue(encodedPayload);
  if (
    signature.length !== expectedSignature.length ||
    !timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))
  ) {
    return null;
  }

  try {
    const payload = JSON.parse(base64UrlDecode(encodedPayload)) as SessionPayload;
    if (!payload.userId || !payload.role || !payload.exp) return null;
    if (payload.exp < Math.floor(Date.now() / 1000)) return null;
    return payload;
  } catch {
    return null;
  }
};

const toSafeSessionUser = (user: AdminUserRecord): AdminSessionUser => ({
  id: user.id,
  name: user.name,
  username: user.username,
  email: user.email,
  role: normalizeAdminRole(user.role),
  isActive: user.isActive,
});

const getLegacyPassword = () =>
  (
    process.env.ADMIN_PASSWORD ??
    process.env.ADMIN_PIN ??
    process.env.MO_ADMIN_KEY ??
    ""
  ).trim();

export const verifyLegacySharedPassword = (password: string) => {
  const legacy = getLegacyPassword();
  return legacy.length > 0 && password === legacy;
};

export const getLegacyOwnerSession = (): AdminSessionUser => ({
  id: "legacy-owner",
  name: "Legacy Owner",
  username: "legacy-owner",
  email: "",
  role: "super_admin",
  isActive: true,
  isLegacy: true,
});

export const getAdminSessionFromToken = async (token: string | undefined) => {
  if (!token) return null;
  const payload = parseSessionToken(token);
  if (!payload) return null;

  if (payload.legacy) {
    return getLegacyOwnerSession();
  }

  const user = await getAdminUserById(payload.userId);
  if (!user || !user.isActive) return null;
  return toSafeSessionUser(user);
};

export const getAdminSessionFromRequest = async (request: NextRequest) =>
  getAdminSessionFromToken(request.cookies.get(MO_ADMIN_SESSION_COOKIE)?.value);

export const getAdminSessionFromCookieStore = async (
  cookieValue: string | undefined
) => getAdminSessionFromToken(cookieValue);

export const serializeSessionCookie = (token: string) => ({
  name: MO_ADMIN_SESSION_COOKIE,
  value: token,
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: SESSION_TTL_SECONDS,
});

export const serializeLegacyCompatCookie = () => ({
  name: "mo_admin",
  value: "1",
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: SESSION_TTL_SECONDS,
});

export const clearAdminSessionCookies = () => [
  {
    name: MO_ADMIN_SESSION_COOKIE,
    value: "",
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  },
  {
    name: "mo_admin",
    value: "",
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  },
];

export const adminPermissions: Record<AdminRole | "viewer", Set<string>> = {
  super_admin: new Set([
    "users:manage",
    "audit:view",
    "catalog:view",
    "catalog:edit",
    "price:edit",
    "stock:edit",
    "promo:edit",
    "manualSale:write",
    "stats:view",
    "sensitive:edit",
  ]),
  admin_operator: new Set([
    "catalog:view",
    "catalog:edit",
    "price:edit",
    "stock:edit",
    "promo:edit",
    "manualSale:write",
    "stats:view",
    "sensitive:edit",
  ]),
  viewer: new Set(["catalog:view", "stats:view"]),
};

export const hasPermission = (
  user: AdminSessionUser,
  permission: string
) => adminPermissions[user.role].has(permission);

export const getPermissionForAdminAction = (action: string) => {
  switch (action) {
    case "saveProductDraft":
      return "catalog:edit";
    case "updateStock":
      return "stock:edit";
    case "updatePrice":
      return "price:edit";
    case "updateImage":
    case "updateSortOrder":
    case "updateFeatured":
      return "sensitive:edit";
    case "updatePromo":
      return "promo:edit";
    case "updateStatus":
    case "updateHot":
      return "stock:edit";
    case "importBackup":
      return "sensitive:edit";
    case "logOrder":
    case "logDailySales":
    case "removeOrder":
      return "manualSale:write";
    case "logMarketingEvent":
      return "catalog:view";
    default:
      return "catalog:edit";
  }
};

export const consumeLoginAttempt = (key: string) => {
  const current = loginBuckets.get(key);
  const currentTime = Date.now();
  if (!current || current.resetAt <= currentTime) {
    loginBuckets.set(key, { count: 1, resetAt: currentTime + LOGIN_WINDOW_MS });
    return { allowed: true, remaining: LOGIN_MAX_ATTEMPTS - 1 };
  }

  if (current.count >= LOGIN_MAX_ATTEMPTS) {
    return { allowed: false, remaining: 0, resetAt: current.resetAt };
  }

  current.count += 1;
  loginBuckets.set(key, current);
  return { allowed: true, remaining: LOGIN_MAX_ATTEMPTS - current.count };
};

export const clearLoginAttempts = (key: string) => {
  loginBuckets.delete(key);
};

export const findUserForLogin = async (identifier: string) => {
  if (!identifier.trim()) return null;
  return getAdminUserByIdentifier(identifier);
};

export const touchSuccessfulLogin = async (userId: string) => {
  if (userId === "legacy-owner") return;
  await touchAdminUserLastLogin(userId);
};
