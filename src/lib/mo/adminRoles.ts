import type { AdminRole } from "./data/types";

export const ADMIN_ROLE_OPTIONS: AdminRole[] = [
  "super_admin",
  "admin_operator",
];

export const normalizeAdminRole = (
  role?: string | null
): AdminRole | "viewer" => {
  switch ((role ?? "").trim()) {
    case "super_admin":
    case "owner":
    case "admin":
      return "super_admin";
    case "admin_operator":
    case "operator":
      return "admin_operator";
    case "viewer":
    default:
      return "viewer";
  }
};

export const isSuperAdminRole = (role?: string | null) =>
  normalizeAdminRole(role) === "super_admin";

export const isAdminOperatorRole = (role?: string | null) =>
  normalizeAdminRole(role) === "admin_operator";

export const ADMIN_ROLE_LABELS: Record<AdminRole | "viewer", string> = {
  super_admin: "Super admin",
  admin_operator: "Admin operator",
  viewer: "Solo lectura",
};
