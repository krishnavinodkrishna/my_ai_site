import { createClient } from "@libsql/client";

const url = "libsql://max-krishnavinod.aws-ap-south-1.turso.io";
const authToken = "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3ODQxMTE1NzIsImlkIjoiMDE5ZjY0ZDktZmIwMS03MTEwLTg4ZTgtZmExN2U0MzhhZGU4Iiwia2lkIjoieTV1WG5kS2owT3hpal9yYUlHN0JxdTRxWjJfM1hncC1ZQ1ZxQTZfTEcyVSIsInJpZCI6IjZiYWEzNzUzLTVhMDEtNDEwNi05YjRiLWJmYmQ5ZTFmNTY3NCJ9.KcCh3ZQW-IzeHvhbUguf4apJZ7OiINHq3BwBfQxUi_Bi9JXfszE_Inns3vDq725IUIuPydrFG7EJb5lmLl-xBA";

const db = createClient({ url, authToken });

async function run() {
  console.log("Updating Premium Leather Handbag in Turso DB...");
  const gallery = JSON.stringify([
    "/images/leather-handbag.jpg",
    "/images/leather-handbag-maroon.jpg",
    "/images/leather-handbag-white-brown.jpg",
    "/images/leather-handbag-white-blue.png"
  ]);
  const description = "Elegant, stylish, and spacious premium leather handbag. Crafted from high-grade leather with meticulous stitching, featuring multiple compartments and a premium finish. Available in multiple exquisite color options to match your personal style.";
  
  await db.execute({
    sql: "UPDATE products SET gallery = ?, description = ? WHERE id = 'new-2'",
    args: [gallery, description]
  });
  console.log("✅ Successfully updated Premium Leather Handbag in Turso DB.");
}

run().catch(console.error);
