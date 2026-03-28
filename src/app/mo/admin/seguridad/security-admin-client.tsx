"use client";

import { useEffect, useState } from "react";
import type {
  AdminAuditEntry,
  AdminRole,
  AdminSessionUser,
  AdminUserSafe,
} from "../../../../lib/mo/data/types";
import {
  ADMIN_ROLE_LABELS,
  ADMIN_ROLE_OPTIONS,
} from "../../../../lib/mo/adminRoles";
import { readApiResponseJson } from "../../../../lib/mo/data/apiAdapter";

const roles: AdminRole[] = ADMIN_ROLE_OPTIONS;

export default function SecurityAdminClient() {
  const [user, setUser] = useState<AdminSessionUser | null>(null);
  const [users, setUsers] = useState<AdminUserSafe[]>([]);
  const [audit, setAudit] = useState<AdminAuditEntry[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    role: "admin_operator" as AdminRole,
  });

  const loadAll = async () => {
    setError(null);
    try {
      const [meRes, usersRes, auditRes] = await Promise.all([
        fetch("/api/mo/admin/me"),
        fetch("/api/mo/admin/users"),
        fetch("/api/mo/admin/audit"),
      ]);

      if (!meRes.ok) throw new Error("No se pudo validar la sesión.");
      const meData = await readApiResponseJson<{ user: AdminSessionUser }>(meRes);
      setUser(meData.user);

      if (usersRes.status === 403 || auditRes.status === 403) {
        throw new Error("Solo super admin puede ver usuarios y auditoría.");
      }

      if (usersRes.ok) {
        const usersData = await readApiResponseJson<{ users: AdminUserSafe[] }>(
          usersRes
        );
        setUsers(usersData.users);
      }

      if (auditRes.ok) {
        const auditData = await readApiResponseJson<{
          entries: AdminAuditEntry[];
        }>(auditRes);
        setAudit(auditData.entries);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo cargar seguridad.");
    }
  };

  useEffect(() => {
    loadAll();
  }, []);

  const createUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const response = await fetch("/api/mo/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await readApiResponseJson<{ message?: string }>(response);
      if (!response.ok) {
        throw new Error(data.message ?? "No se pudo crear el usuario.");
      }
      setForm({
        name: "",
        username: "",
        email: "",
        password: "",
        role: "admin_operator",
      });
      await loadAll();
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo crear el usuario.");
    } finally {
      setSaving(false);
    }
  };

  const updateUser = async (
    id: string,
    patch: Partial<Pick<AdminUserSafe, "role" | "isActive">>
  ) => {
    setSaving(true);
    setError(null);
    try {
      const response = await fetch("/api/mo/admin/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...patch }),
      });
      const data = await readApiResponseJson<{ message?: string }>(response);
      if (!response.ok) {
        throw new Error(data.message ?? "No se pudo actualizar el usuario.");
      }
      await loadAll();
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo actualizar el usuario.");
    } finally {
      setSaving(false);
    }
  };

  const logout = async () => {
    await fetch("/api/mo/admin/logout", { method: "POST" });
    window.location.href = "/admin/acceso";
  };

  return (
    <main className="min-h-screen w-full px-4 pb-20 pt-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <section className="rounded-3xl border border-slate-200 bg-white px-6 py-5 shadow-sm">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-emerald-700">
                Seguridad admin
              </p>
              <h1 className="mt-2 text-2xl font-semibold text-slate-900">
                Usuarios, roles y auditoría
              </h1>
              <p className="mt-2 text-sm text-slate-600">
                Base operativa del panel. Desde aquí el super admin crea cuentas internas, cambia roles y revisa trazabilidad.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <a
                href="/admin"
                className="inline-flex h-11 items-center justify-center rounded-full border border-slate-200 px-4 text-sm font-semibold text-slate-700"
              >
                Volver al panel
              </a>
              <button
                type="button"
                onClick={logout}
                className="inline-flex h-11 items-center justify-center rounded-full bg-slate-900 px-4 text-sm font-semibold text-white"
              >
                Cerrar sesión
              </button>
            </div>
          </div>
          {user ? (
            <div className="mt-4 rounded-2xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
              Sesión actual: <strong>{user.name}</strong> ({ADMIN_ROLE_LABELS[user.role]})
              {user.isLegacy ? " · acceso temporal de emergencia" : ""}
            </div>
          ) : null}
          {error ? (
            <div className="mt-4 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
              {error}
            </div>
          ) : null}
        </section>

        <div className="grid gap-6 lg:grid-cols-[1.1fr,1.4fr]">
          <section className="rounded-3xl border border-slate-200 bg-white px-6 py-5 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">Crear usuario</h2>
            <form onSubmit={createUser} className="mt-4 grid gap-3">
              <input
                value={form.name}
                onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
                placeholder="Nombre"
                className="h-11 rounded-2xl border border-slate-200 px-4 text-sm"
                required
              />
              <input
                value={form.username}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, username: event.target.value }))
                }
                placeholder="Username"
                className="h-11 rounded-2xl border border-slate-200 px-4 text-sm"
              />
              <input
                value={form.email}
                onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
                placeholder="Email"
                className="h-11 rounded-2xl border border-slate-200 px-4 text-sm"
              />
              <input
                type="password"
                value={form.password}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, password: event.target.value }))
                }
                placeholder="Contraseña temporal"
                className="h-11 rounded-2xl border border-slate-200 px-4 text-sm"
                required
              />
              <select
                value={form.role}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, role: event.target.value as AdminRole }))
                }
                className="h-11 rounded-2xl border border-slate-200 px-4 text-sm"
              >
                {roles.map((role) => (
                  <option key={role} value={role}>
                    {ADMIN_ROLE_LABELS[role]}
                  </option>
                ))}
              </select>
              <button
                type="submit"
                disabled={saving}
                className="inline-flex h-11 items-center justify-center rounded-full bg-emerald-600 px-4 text-sm font-semibold text-white disabled:opacity-60"
              >
                {saving ? "Guardando..." : "Crear usuario"}
              </button>
            </form>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white px-6 py-5 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">Usuarios</h2>
            <div className="mt-4 space-y-3">
              {users.map((entry) => (
                <div
                  key={entry.id}
                  className="rounded-2xl border border-slate-200 px-4 py-4"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="font-semibold text-slate-900">{entry.name}</p>
                      <p className="text-xs text-slate-500">
                        {entry.username || entry.email || entry.id}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <select
                        value={entry.role}
                        onChange={(event) =>
                          updateUser(entry.id, {
                            role: event.target.value as AdminRole,
                          })
                        }
                        className="h-10 rounded-full border border-slate-200 px-3 text-sm"
                      >
                        {roles.map((role) => (
                          <option key={role} value={role}>
                            {ADMIN_ROLE_LABELS[role]}
                          </option>
                        ))}
                      </select>
                      <button
                        type="button"
                        onClick={() => updateUser(entry.id, { isActive: !entry.isActive })}
                        className="inline-flex h-10 items-center justify-center rounded-full border border-slate-200 px-3 text-sm font-semibold text-slate-700"
                      >
                        {entry.isActive ? "Desactivar" : "Activar"}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <section className="rounded-3xl border border-slate-200 bg-white px-6 py-5 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Auditoría reciente</h2>
          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-left text-slate-500">
                  <th className="px-3 py-2">Fecha</th>
                  <th className="px-3 py-2">Actor</th>
                  <th className="px-3 py-2">Acción</th>
                  <th className="px-3 py-2">Entidad</th>
                  <th className="px-3 py-2">ID</th>
                </tr>
              </thead>
              <tbody>
                {audit.map((entry) => (
                  <tr key={entry.id} className="border-b border-slate-100">
                    <td className="px-3 py-2 text-slate-600">{entry.createdAt}</td>
                    <td className="px-3 py-2 text-slate-900">{entry.actorUserId}</td>
                    <td className="px-3 py-2 text-slate-900">{entry.action}</td>
                    <td className="px-3 py-2 text-slate-600">{entry.entityType}</td>
                    <td className="px-3 py-2 text-slate-600">{entry.entityId}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}
