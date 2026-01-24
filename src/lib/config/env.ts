export type AppEnv = {
  NODE_ENV: string;
  SITE_URL: string;
  WHATSAPP_URL: string;
  CONTACT_EMAIL?: string;
  APP_VERSION?: string;
};

let cachedEnv: AppEnv | null = null;

export function getEnv(): AppEnv {
  if (cachedEnv) {
    return cachedEnv;
  }

  const NODE_ENV = process.env.NODE_ENV ?? "development";
  const SITE_URL =
    process.env.SITE_URL ??
    (NODE_ENV === "production" ? "" : "http://localhost:3000");
  const WHATSAPP_URL =
    process.env.WHATSAPP_URL ?? "https://wa.me/34911528753";
  const CONTACT_EMAIL = process.env.CONTACT_EMAIL;
  const APP_VERSION =
    process.env.APP_VERSION ?? process.env.npm_package_version;

  const isBuildPhase = process.env.NEXT_PHASE === "phase-production-build";

  if (!SITE_URL && NODE_ENV === "production" && !isBuildPhase) {
    throw new Error("Missing SITE_URL environment variable in production.");
  }

  cachedEnv = {
    NODE_ENV,
    SITE_URL,
    WHATSAPP_URL,
    CONTACT_EMAIL,
    APP_VERSION,
  };

  return cachedEnv;
}
