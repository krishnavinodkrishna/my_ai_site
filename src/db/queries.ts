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
  description: string
): Promise<void> {
  await db.execute({
    sql: "UPDATE products SET title = ?, price = ?, description = ? WHERE id = ?",
    args: [title, price, description, id],
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
