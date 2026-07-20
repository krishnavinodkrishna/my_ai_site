"use client";

import { useState, useEffect, useTransition } from "react";
import { ProductItem } from "@/content";
import {
  getProductsAction,
  saveProductAction,
  addProductAction,
  deleteProductAction,
} from "@/app/actions/products";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState<ProductItem | null>(null);
  const [form, setForm] = useState({ title: "", price: "", description: "" });
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  // Load products on mount
  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    setLoading(true);
    const res = await getProductsAction();
    if (res.ok && res.products) {
      setProducts(res.products);
    } else {
      setError(res.error || "Failed to load products.");
    }
    setLoading(false);
  }

  const filtered = products.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      (p.description ?? "").toLowerCase().includes(search.toLowerCase())
  );

  function openAdd() {
    setError("");
    setEditProduct(null);
    setForm({ title: "", price: "", description: "" });
    setShowModal(true);
  }

  function openEdit(p: ProductItem) {
    setError("");
    setEditProduct(p);
    setForm({ title: p.title, price: p.price, description: p.description ?? "" });
    setShowModal(true);
  }

  function handleSave() {
    if (!form.title || !form.price) return;
    setError("");

    startTransition(async () => {
      let res;
      if (editProduct) {
        res = await saveProductAction(editProduct.id, form.title, form.price, form.description);
      } else {
        res = await addProductAction(form.title, form.price, form.description, "new");
      }

      if (res.ok) {
        setShowModal(false);
        fetchProducts(); // Refresh list from DB
      } else {
        setError(res.error || "Failed to save product.");
      }
    });
  }

  function handleDelete(id: string) {
    if (confirm("Are you sure you want to delete this product?")) {
      startTransition(async () => {
        const res = await deleteProductAction(id);
        if (res.ok) {
          fetchProducts(); // Refresh list from DB
        } else {
          alert(res.error || "Failed to delete product.");
        }
      });
    }
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Products</h1>
          <p className="text-sm text-white/40 mt-1">
            {loading ? "Loading products..." : `${products.length} total products`}
          </p>
        </div>
        <button
          onClick={openAdd}
          disabled={isPending}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-sm font-bold hover:opacity-90 active:scale-95 transition-all cursor-pointer shadow-lg shadow-emerald-500/20 disabled:opacity-50"
        >
          + Add Product
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 text-sm">🔍</span>
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-[#151820] border border-white/8 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-emerald-500/50 transition-all"
        />
      </div>

      {/* Table / Loading */}
      {loading ? (
        <div className="bg-[#151820] border border-white/5 rounded-2xl p-12 text-center text-white/40">
          <span className="inline-block animate-spin text-emerald-400 mr-2">⏳</span> Loading store products...
        </div>
      ) : (
        <div className="bg-[#151820] border border-white/5 rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5">
                {["Product", "Price", "Description", "Actions"].map((h) => (
                  <th key={h} className="text-left px-6 py-3 text-[10px] font-bold text-white/30 uppercase tracking-widest">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-white/30 text-sm">No products found.</td>
                </tr>
              ) : (
                filtered.map((p) => (
                  <tr key={p.id} className="border-b border-white/5 hover:bg-white/2 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl overflow-hidden bg-white/5 flex-shrink-0">
                          {p.imageUrl && !p.imageUrl.includes("default.jpg") ? (
                            <img src={p.imageUrl} alt={p.title} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-white/20 text-xs font-bold bg-white/5">IMG</div>
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-white text-sm">{p.title}</p>
                          <p className="text-[10px] text-white/30 font-mono">{p.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-bold text-emerald-400">{p.price}</td>
                    <td className="px-6 py-4 text-xs text-white/40 max-w-xs">
                      <p className="line-clamp-2">{p.description || "—"}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openEdit(p)}
                          disabled={isPending}
                          className="px-3 py-1.5 text-[10px] font-bold bg-white/5 hover:bg-white/10 text-white/70 rounded-lg transition-all cursor-pointer disabled:opacity-50"
                        >
                          ✏️ Edit
                        </button>
                        <button
                          onClick={() => handleDelete(p.id)}
                          disabled={isPending}
                          className="px-3 py-1.5 text-[10px] font-bold bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-all cursor-pointer disabled:opacity-50"
                        >
                          🗑 Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
          <div className="bg-[#151820] border border-white/10 rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <h2 className="text-lg font-bold text-white mb-5">
              {editProduct ? "Edit Product" : "Add New Product"}
            </h2>
            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1.5">Title *</label>
                <input
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="Product name"
                  disabled={isPending}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-emerald-500/50 transition-all disabled:opacity-50"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1.5">Price *</label>
                <input
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  placeholder="e.g. ₹999"
                  disabled={isPending}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-emerald-500/50 transition-all disabled:opacity-50"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1.5">Description</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Short description..."
                  rows={3}
                  disabled={isPending}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-emerald-500/50 transition-all resize-none disabled:opacity-50"
                />
              </div>

              {error && (
                <p className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                  ⚠️ {error}
                </p>
              )}

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setShowModal(false)}
                  disabled={isPending}
                  className="flex-1 py-2.5 rounded-xl border border-white/10 text-white/60 text-sm font-semibold hover:bg-white/5 transition-all cursor-pointer disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={isPending}
                  className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-sm font-bold hover:opacity-90 transition-all cursor-pointer disabled:opacity-50"
                >
                  {isPending ? "Saving..." : editProduct ? "Save Changes" : "Add Product"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
