#!/usr/bin/env node

import { randomBytes, scryptSync } from "crypto";

const usage = () => {
  console.error(
    "Uso: node scripts/rys-bootstrap-super-admin.mjs \"Nombre\" \"username\" \"email\" \"password\" [super_admin|admin_operator]"
  );
};

const [name, usernameRaw, emailRaw, password, roleRaw] = process.argv.slice(2);

if (!name || !usernameRaw || !emailRaw || !password) {
  usage();
  process.exit(1);
}

const role = roleRaw === "admin_operator" ? "admin_operator" : "super_admin";
const username = usernameRaw.trim().toLowerCase();
const email = emailRaw.trim().toLowerCase();

if (!username || !email || !password.trim()) {
  usage();
  process.exit(1);
}

const salt = randomBytes(16).toString("hex");
const hash = scryptSync(password, salt, 64).toString("hex");
const passwordHash = `scrypt:${salt}:${hash}`;
const timestamp = new Date().toISOString();

const row = {
  id: `usr_${Date.now()}_${Math.random().toString(16).slice(2, 8)}`,
  name: name.trim(),
  username,
  email,
  passwordHash,
  role,
  isActive: "true",
  createdAt: timestamp,
  updatedAt: timestamp,
  lastLoginAt: "",
};

console.log(
  JSON.stringify(
    {
      headers: [
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
      ],
      row,
      note: "Copia esta fila a la pestaña users de la hoja viva. No guarda ni escribe nada por sí mismo.",
    },
    null,
    2
  )
);
