-- src/db/migrations/0002_products.sql
CREATE TABLE IF NOT EXISTS products (
  id           TEXT PRIMARY KEY,
  title        TEXT NOT NULL,
  price        TEXT NOT NULL,
  imageUrl     TEXT NOT NULL,
  description  TEXT,
  type         TEXT NOT NULL, -- 'new' or 'best'
  gallery      TEXT,          -- JSON string array, e.g. '["/images/floral-dress.jpg"]'
  created_at   TEXT NOT NULL DEFAULT (datetime('now'))
);
