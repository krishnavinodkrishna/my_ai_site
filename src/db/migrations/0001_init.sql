-- src/db/migrations/0001_init.sql
-- Leads: form submissions from the Join Waitlist / CTA modal
CREATE TABLE IF NOT EXISTS leads (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  name        TEXT NOT NULL,
  phone       TEXT NOT NULL,
  email       TEXT,
  source      TEXT,                         -- which CTA/section triggered it
  created_at  TEXT NOT NULL DEFAULT (datetime('now'))
);
