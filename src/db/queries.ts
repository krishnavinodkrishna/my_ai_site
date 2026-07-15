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
