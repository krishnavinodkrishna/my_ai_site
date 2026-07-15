// Run: node scripts/migrate.mjs
import { createClient } from "@libsql/client";

const url = "libsql://max-krishnavinod.aws-ap-south-1.turso.io";
const authToken = "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3ODQxMDM0NDksImlkIjoiMDE5ZjY0ZDktZmIwMS03MTEwLTg4ZTgtZmExN2U0MzhhZGU4Iiwia2lkIjoieTV1WG5kS2owT3hpal9yYUlHN0JxdTRxWjJfM1hncC1ZQ1ZxQTZfTEcyVSIsInJpZCI6IjZiYWEzNzUzLTVhMDEtNDEwNi05YjRiLWJmYmQ5ZTFmNTY3NCJ9.JN8pRGDKnFOd8eM0gWz8b5x-mtiGB4g8EdoYBWF2BkK2_vA2tCB2_lpv_XrfhEDuBPgmgVsQEXG9GVlOCbzGCQ";

const db = createClient({ url, authToken });

const initialProducts = [
  {
    id: "new-1",
    title: "Women's Floral Dress",
    price: "₹500",
    imageUrl: "/images/floral-dress.jpg",
    description: "Elegant floral dress perfect for every occasion. Crafted with premium fabric for a graceful, feminine look.",
    type: "new",
    gallery: JSON.stringify([
      "/images/floral-dress.jpg",
      "/images/floral-dress-2.jpg",
      "/images/floral-dress-3.jpg",
      "/images/floral-dress-4.jpg",
      "/images/floral-dress-5.jpg",
      "/images/floral-dress-6.jpg"
    ])
  },
  {
    id: "new-2",
    title: "Premium Leather Handbag",
    price: "₹2,000",
    imageUrl: "/images/leather-handbag.jpg",
    description: "Stylish and spacious premium leather handbag.",
    type: "new",
    gallery: JSON.stringify([])
  },
  {
    id: "new-3",
    title: "Luxury Wrist Watch",
    price: "$179",
    imageUrl: "/images/products/luxury-watch.jpg",
    description: "Luxury wrist watch with dynamic analog interface.",
    type: "new",
    gallery: JSON.stringify([])
  },
  {
    id: "new-4",
    title: "White Sneakers",
    price: "$89",
    imageUrl: "/images/products/white-sneakers.jpg",
    description: "Clean classic white sneakers for casual outings.",
    type: "new",
    gallery: JSON.stringify([])
  },
  {
    id: "new-5",
    title: "Sunglasses",
    price: "$49",
    imageUrl: "/images/products/sunglasses.jpg",
    description: "Sleek modern sunglasses with UV protection.",
    type: "new",
    gallery: JSON.stringify([])
  },
  {
    id: "new-6",
    title: "Gold Earrings",
    price: "$39",
    imageUrl: "/images/products/gold-earrings.jpg",
    description: "Minimalist elegant gold earrings.",
    type: "new",
    gallery: JSON.stringify([])
  },
  {
    id: "best-1",
    title: "Women's Party Dress",
    price: "₹1,500",
    imageUrl: "/images/party-dress.jpg",
    description: "Premium quality evening dress.",
    type: "best",
    gallery: JSON.stringify([])
  },
  {
    id: "best-2",
    title: "Men's Formal Shirt",
    price: "$49",
    imageUrl: "/images/products/formal-shirt.jpg",
    description: "Perfect for office and casual wear.",
    type: "best",
    gallery: JSON.stringify([])
  },
  {
    id: "best-3",
    title: "Smart Watch",
    price: "$149",
    imageUrl: "/images/products/smart-watch.jpg",
    description: "Track fitness and stay connected.",
    type: "best",
    gallery: JSON.stringify([])
  },
  {
    id: "best-4",
    title: "Leather Backpack",
    price: "₹3,000",
    imageUrl: "/images/leather-backpack.jpg",
    description: "Designed for style and comfort.",
    type: "best",
    gallery: JSON.stringify([])
  }
];

async function migrate() {
  console.log("Connecting to Turso DB...");

  // Leads migration
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
  console.log("✅ Leads table ready.");

  // Products migration
  await db.execute(`
    CREATE TABLE IF NOT EXISTS products (
      id           TEXT PRIMARY KEY,
      title        TEXT NOT NULL,
      price        TEXT NOT NULL,
      imageUrl     TEXT NOT NULL,
      description  TEXT,
      type         TEXT NOT NULL,
      gallery      TEXT,
      created_at   TEXT NOT NULL DEFAULT (datetime('now'))
    )
  `);
  console.log("✅ Products table ready.");

  // Seed products if empty
  const countRes = await db.execute("SELECT COUNT(*) as count FROM products");
  const count = Number(countRes.rows[0].count);

  if (count === 0) {
    console.log("Seeding products table...");
    for (const p of initialProducts) {
      await db.execute({
        sql: "INSERT INTO products (id, title, price, imageUrl, description, type, gallery) VALUES (?, ?, ?, ?, ?, ?, ?)",
        args: [p.id, p.title, p.price, p.imageUrl, p.description, p.type, p.gallery]
      });
    }
    console.log(`✅ Seeded ${initialProducts.length} products.`);
  } else {
    console.log(`ℹ️ Products table already has ${count} records. Seeding skipped.`);
  }

  // Verify
  const result = await db.execute("SELECT name FROM sqlite_master WHERE type='table'");
  console.log("✅ Available tables:", result.rows.map(r => r.name));
}

migrate().catch((err) => {
  console.error("❌ Migration failed:", err);
  process.exit(1);
});
