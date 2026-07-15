"use server";

import { insertLead } from "@/db/queries";

export async function submitLead(formData: FormData) {
  // Honeypot: bots fill this hidden field, humans don't
  if (formData.get("company")) return { ok: true };

  const name = String(formData.get("name") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim() || null;
  const source = String(formData.get("source") ?? "lead-modal").trim();

  // Server-side validation
  if (!name || name.length > 120) {
    return { ok: false, error: "Please enter your name." };
  }
  if (!phone || !/^[+0-9\s()\\-]{7,20}$/.test(phone)) {
    return { ok: false, error: "Please enter a valid phone number." };
  }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: "Please enter a valid email address." };
  }

  try {
    await insertLead(name, phone, email, source);
    return { ok: true };
  } catch (err) {
    console.error("[submitLead] DB error:", err);
    return { ok: false, error: "Something went wrong. Please try again." };
  }
}
