import "server-only";
import { createClient } from "@libsql/client";

// Both are required — this is always a hosted cloud DB, never a local file.
const url = process.env.TURSO_DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;

if (!url || !authToken) {
  throw new Error(
    "TURSO_DATABASE_URL / TURSO_AUTH_TOKEN missing — add them to .env.local"
  );
}

export const db = createClient({ url, authToken });
