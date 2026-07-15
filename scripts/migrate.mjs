// Run: node scripts/migrate.mjs
import { createClient } from "@libsql/client";

const url = "libsql://max-krishnavinod.aws-ap-south-1.turso.io";
const authToken = "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3ODQxMDM0NDksImlkIjoiMDE5ZjY0ZDktZmIwMS03MTEwLTg4ZTgtZmExN2U0MzhhZGU4Iiwia2lkIjoieTV1WG5kS2owT3hpal9yYUlHN0JxdTRxWjJfM1hncC1ZQ1ZxQTZfTEcyVSIsInJpZCI6IjZiYWEzNzUzLTVhMDEtNDEwNi05YjRiLWJmYmQ5ZTFmNTY3NCJ9.JN8pRGDKnFOd8eM0gWz8b5x-mtiGB4g8EdoYBWF2BkK2_vA2tCB2_lpv_XrfhEDuBPgmgVsQEXG9GVlOCbzGCQ";

const db = createClient({ url, authToken });

async function migrate() {
  console.log("Connecting to Turso DB...");

  await db.execute(`
    CREATE TABLE IF NOT EXISTS leads (
      id          INTEGER PRIMARY KEY AUTOINCREMENT,
      name        TEXT NOT NULL,
      phone       TEXT NOT NULL,
      email       TEXT,
      source      TEXT,
      created_at  TEXT NOT NULL DEFAULT (datetime('now'))
    )
  `);

  console.log("✅ Migration applied: leads table created.");

  // Verify
  const result = await db.execute("SELECT name FROM sqlite_master WHERE type='table' AND name='leads'");
  console.log("✅ Table verified:", result.rows);
}

migrate().catch((err) => {
  console.error("❌ Migration failed:", err);
  process.exit(1);
});
