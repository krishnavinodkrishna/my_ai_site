import "server-only";
import { createClient, Client } from "@libsql/client";

let dbInstance: Client | null = null;

function getDbInstance(): Client {
  if (dbInstance) return dbInstance;

  const url = process.env.TURSO_DATABASE_URL;
  const authToken = process.env.TURSO_AUTH_TOKEN;

  // Next.js build-time check to prevent builds from crashing if env vars aren't set yet on Vercel
  const isBuildTime = process.env.NEXT_PHASE === "phase-production-build" || process.env.NODE_ENV === "production" && !url;

  if (!url || !authToken) {
    if (isBuildTime) {
      console.warn("⚠️ Warning: TURSO credentials missing at build time. Using mock database client.");
      return {
        execute: async () => ({ rows: [], columns: [] }),
        batch: async () => [],
        close: () => {},
      } as any;
    }
    throw new Error(
      "TURSO_DATABASE_URL / TURSO_AUTH_TOKEN missing — please add them to your environment variables."
    );
  }

  dbInstance = createClient({ url, authToken });
  return dbInstance;
}

// Export a lazy Proxy so module evaluation at build time doesn't invoke database initialization.
export const db = new Proxy({} as Client, {
  get(_target, prop) {
    const instance = getDbInstance();
    const value = Reflect.get(instance, prop);
    if (typeof value === "function") {
      return value.bind(instance);
    }
    return value;
  },
});
