import "server-only";
import { db } from "./client";

export interface Lead {
  id: number;
  name: string;
  phone: string;
  email: string | null;
  source: string | null;
  created_at: string;
}

export async function getAllLeads(): Promise<Lead[]> {
  const r = await db.execute(
    "SELECT id, name, phone, email, source, created_at FROM leads ORDER BY created_at DESC"
  );
  return r.rows as unknown as Lead[];
}

export async function insertLead(
  name: string,
  phone: string,
  email: string | null,
  source: string
): Promise<void> {
  await db.execute({
    sql: "INSERT INTO leads (name, phone, email, source) VALUES (?, ?, ?, ?)",
    args: [name, phone, email, source],
  });
}

export interface ProductItem {
  id: string;
  title: string;
  price: string;
  imageUrl: string;
  description?: string;
  rating?: number;
  gallery?: string[];
  type?: string;
  colors?: Array<{ name: string; hex: string; imageUrl: string }>;
}

export async function getAllProducts(): Promise<ProductItem[]> {
  const r = await db.execute(
    "SELECT id, title, price, imageUrl, description, type, gallery FROM products ORDER BY created_at DESC"
  );
  return r.rows.map((row) => {
    let galleryArr: string[] = [];
    if (row.gallery && typeof row.gallery === "string") {
      try {
        galleryArr = JSON.parse(row.gallery);
      } catch (e) {
        galleryArr = [];
      }
    }
    return {
      id: String(row.id),
      title: String(row.title),
      price: String(row.price),
      imageUrl: String(row.imageUrl),
      description: row.description ? String(row.description) : undefined,
      type: row.type ? String(row.type) : undefined,
      gallery: galleryArr
    };
  });
}

export async function updateProduct(
  id: string,
  title: string,
  price: string,
  description: string,
  imageUrl?: string,
  type?: string
): Promise<void> {
  const img = imageUrl || "/images/products/default.jpg";
  const t = type || "new";
  await db.execute({
    sql: `INSERT INTO products (id, title, price, imageUrl, description, type, gallery) 
          VALUES (?, ?, ?, ?, ?, ?, ?) 
          ON CONFLICT(id) DO UPDATE SET 
          title=excluded.title, price=excluded.price, imageUrl=excluded.imageUrl, description=excluded.description, type=excluded.type`,
    args: [id, title, price, img, description, t, JSON.stringify([])],
  });
}

export async function insertProduct(
  id: string,
  title: string,
  price: string,
  imageUrl: string,
  description: string,
  type: string
): Promise<void> {
  await db.execute({
    sql: "INSERT INTO products (id, title, price, imageUrl, description, type, gallery) VALUES (?, ?, ?, ?, ?, ?, ?)",
    args: [id, title, price, imageUrl, description, type, JSON.stringify([])],
  });
}

export async function deleteProduct(id: string): Promise<void> {
  await db.execute({
    sql: "DELETE FROM products WHERE id = ?",
    args: [id],
  });
}
