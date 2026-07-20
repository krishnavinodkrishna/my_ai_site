"use server";

import { insertProduct, updateProduct, deleteProduct } from "@/db/queries";
import { revalidatePath } from "next/cache";

export async function saveProductAction(
  id: string,
  title: string,
  price: string,
  description: string,
  imageUrl?: string,
  type?: string,
  gallery?: string[]
) {
  if (!title || !price) {
    return { ok: false, error: "Title and price are required." };
  }

  try {
    await updateProduct(id, title, price, description, imageUrl, type, gallery);
    revalidatePath("/", "layout");
    return { ok: true };
  } catch (err) {
    console.error("[saveProductAction] Error:", err);
    return { ok: false, error: "Failed to update product." };
  }
}

export async function addProductAction(
  title: string,
  price: string,
  description: string,
  type: string,
  imageUrl?: string,
  gallery?: string[]
) {
  if (!title || !price) {
    return { ok: false, error: "Title and price are required." };
  }

  const id = `new-${Date.now()}`;
  const img = imageUrl || "/images/products/default.jpg";

  try {
    await insertProduct(id, title, price, img, description, type || "new", gallery);
    revalidatePath("/", "layout");
    return { ok: true };
  } catch (err) {
    console.error("[addProductAction] Error:", err);
    return { ok: false, error: "Failed to add product." };
  }
}

export async function deleteProductAction(id: string) {
  try {
    await deleteProduct(id);
    revalidatePath("/", "layout");
    return { ok: true };
  } catch (err) {
    console.error("[deleteProductAction] Error:", err);
    return { ok: false, error: "Failed to delete product." };
  }
}

export async function getProductsAction() {
  const { getAllProducts } = await import("@/db/queries");
  try {
    const products = await getAllProducts();
    return { ok: true, products };
  } catch (err) {
    console.error("[getProductsAction] Error:", err);
    return { ok: false, error: "Failed to fetch products." };
  }
}

