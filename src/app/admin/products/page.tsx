"use client";

import { useState, useEffect, useTransition } from "react";
import { ProductItem, NEW_ARRIVALS, BEST_SELLERS } from "@/content";
import {
  getProductsAction,
  saveProductAction,
  addProductAction,
  deleteProductAction,
} from "@/app/actions/products";

const PRESET_IMAGES = [
  { name: "Floral Dress (White)", url: "/images/floral-dress.jpg" },
  { name: "Floral Dress Side", url: "/images/floral-dress-2.jpg" },
  { name: "Floral Dress Detail", url: "/images/floral-dress-4.jpg" },
  { name: "Party Dress", url: "/images/party-dress.jpg" },
  { name: "Leather Handbag", url: "/images/leather-handbag.jpg" },
  { name: "Maroon Handbag", url: "/images/leather-handbag-maroon.jpg" },
  { name: "White-Brown Handbag", url: "/images/leather-handbag-white-brown.jpg" },
  { name: "Leather Backpack", url: "/images/leather-backpack.jpg" },
  { name: "Formal Shirt", url: "/images/products/formal-shirt.jpg" },
  { name: "Gold Earrings", url: "/images/products/gold-earrings.jpg" },
  { name: "Luxury Watch", url: "/images/products/luxury-watch.jpg" },
  { name: "Smart Watch", url: "/images/products/smart-watch.jpg" },
  { name: "Sunglasses", url: "/images/products/sunglasses.jpg" },
  { name: "White Sneakers", url: "/images/products/white-sneakers.jpg" },
];

export default function AdminProductsPage() {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState<ProductItem | null>(null);
  const [imageSourceMode, setImageSourceMode] = useState<"preset" | "upload" | "custom">("preset");
  
  const [form, setForm] = useState({
    title: "",
    price: "",
    description: "",
    imageUrl: "",
    type: "new",
    gallery: [] as string[],
  });

  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  // Load products on mount
  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    setLoading(true);
    const res = await getProductsAction();
    const dbList = res.ok && res.products ? res.products : [];

    const dbMap = new Map(dbList.map((p: ProductItem) => [p.id, p]));
    const combined: ProductItem[] = [...dbList];

    const staticItems: ProductItem[] = [
      ...NEW_ARRIVALS.map((p) => ({ ...p, type: "new" })),
      ...BEST_SELLERS.map((p) => ({ ...p, type: "best" })),
    ];

    for (const item of staticItems) {
      if (!dbMap.has(item.id)) {
        combined.push(item);
      }
    }

    setProducts(combined);
    setLoading(false);
  }

  const filtered = products.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      (p.description ?? "").toLowerCase().includes(search.toLowerCase()) ||
      (p.type ?? "").toLowerCase().includes(search.toLowerCase())
  );

  function openAdd() {
    setError("");
    setEditProduct(null);
    setImageSourceMode("preset");
    const initialImg = PRESET_IMAGES[0].url;
    setForm({
      title: "",
      price: "",
      description: "",
      imageUrl: initialImg,
      type: "new",
      gallery: [initialImg],
    });
    setShowModal(true);
  }

  function openEdit(p: ProductItem) {
    setError("");
    setEditProduct(p);
    const isPreset = PRESET_IMAGES.some((img) => img.url === p.imageUrl);
    setImageSourceMode(isPreset ? "preset" : p.imageUrl?.startsWith("data:") ? "upload" : "custom");
    
    const existingGallery = p.gallery && p.gallery.length > 0 
      ? p.gallery 
      : p.imageUrl ? [p.imageUrl] : [];

    setForm({
      title: p.title,
      price: p.price,
      description: p.description ?? "",
      imageUrl: p.imageUrl ?? "",
      type: p.type ?? "new",
      gallery: existingGallery,
    });
    setShowModal(true);
  }

  function handleMainImageSelect(url: string) {
    setForm((prev) => {
      const newGallery = prev.gallery.includes(url) ? prev.gallery : [url, ...prev.gallery];
      return { ...prev, imageUrl: url, gallery: newGallery };
    });
  }

  function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setError("File size too large. Please select an image under 2MB.");
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          const url = event.target.result as string;
          handleMainImageSelect(url);
          setError("");
        }
      };
      reader.readAsDataURL(file);
    }
  }

  function addImageToGallery(url: string) {
    if (!form.gallery.includes(url)) {
      setForm((prev) => ({ ...prev, gallery: [...prev.gallery, url] }));
    }
  }

  function removeImageFromGallery(url: string) {
    setForm((prev) => {
      const updated = prev.gallery.filter((g) => g !== url);
      const newMain = updated.length > 0 ? (updated.includes(prev.imageUrl) ? prev.imageUrl : updated[0]) : "";
      return { ...prev, gallery: updated, imageUrl: newMain };
    });
  }

  function handleSave() {
    if (!form.title || !form.price) {
      setError("Title and price are required.");
      return;
    }
    setError("");

    const finalGallery = form.gallery.length > 0 
      ? form.gallery 
      : form.imageUrl ? [form.imageUrl] : [];

    startTransition(async () => {
      let res;
      if (editProduct) {
        res = await saveProductAction(
          editProduct.id,
          form.title,
          form.price,
          form.description,
          form.imageUrl,
          form.type,
          finalGallery
        );
      } else {
        res = await addProductAction(
          form.title,
          form.price,
          form.description,
          form.type,
          form.imageUrl,
          finalGallery
        );
      }

      if (res.ok) {
        setShowModal(false);
        fetchProducts();
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
          fetchProducts();
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
          <h1 className="text-2xl font-bold text-white">Products Catalog</h1>
          <p className="text-sm text-white/40 mt-1">
            {loading ? "Loading products..." : `${products.length} total products available on store`}
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
          <span className="inline-block animate-spin text-emerald-400 mr-2">⏳</span> Loading catalog products...
        </div>
      ) : (
        <div className="bg-[#151820] border border-white/5 rounded-2xl overflow-hidden shadow-xl">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5 bg-white/2">
                {["Product", "Type", "Price", "Gallery", "Actions"].map((h) => (
                  <th key={h} className="text-left px-6 py-3.5 text-[10px] font-bold text-white/40 uppercase tracking-widest">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-white/30 text-sm">No products found.</td>
                </tr>
              ) : (
                filtered.map((p) => {
                  const gCount = p.gallery ? p.gallery.length : 1;
                  return (
                    <tr key={p.id} className="border-b border-white/5 hover:bg-white/2 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl overflow-hidden bg-white/5 flex-shrink-0 border border-white/10">
                            {p.imageUrl ? (
                              <img src={p.imageUrl} alt={p.title} className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-white/20 text-xs font-bold bg-white/5">IMG</div>
                            )}
                          </div>
                          <div>
                            <p className="font-semibold text-white text-sm">{p.title}</p>
                            <p className="text-[10px] text-white/30 font-mono">ID: {p.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                          p.type === "best" 
                            ? "bg-violet-500/15 text-violet-400 border border-violet-500/20" 
                            : "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20"
                        }`}>
                          {p.type === "best" ? "★ Best Seller" : "✦ New Arrival"}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-bold text-emerald-400 text-sm">{p.price}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-white/70 bg-white/5 border border-white/10 px-2 py-1 rounded-lg">
                            🖼️ {gCount} {gCount === 1 ? "Image" : "Images"}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => openEdit(p)}
                            disabled={isPending}
                            className="px-3 py-1.5 text-[10px] font-bold bg-white/5 hover:bg-white/10 text-white/80 border border-white/10 rounded-lg transition-all cursor-pointer disabled:opacity-50"
                          >
                            ✏️ Edit
                          </button>
                          <button
                            onClick={() => handleDelete(p.id)}
                            disabled={isPending}
                            className="px-3 py-1.5 text-[10px] font-bold bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 rounded-lg transition-all cursor-pointer disabled:opacity-50"
                          >
                            🗑 Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Add / Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md px-4 py-6 overflow-y-auto">
          <div className="bg-[#151820] border border-white/10 rounded-2xl p-6 w-full max-w-lg shadow-2xl my-auto">
            <h2 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
              <span>{editProduct ? "✏️ Edit Product & Gallery" : "✨ Add New Product"}</span>
            </h2>
            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1.5">Product Title *</label>
                <input
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g. Women's Silk Dress"
                  disabled={isPending}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-emerald-500/50 transition-all disabled:opacity-50"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1.5">Price *</label>
                  <input
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                    placeholder="e.g. ₹1,499"
                    disabled={isPending}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-emerald-500/50 transition-all disabled:opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1.5">Collection Type</label>
                  <select
                    value={form.type}
                    onChange={(e) => setForm({ ...form, type: e.target.value })}
                    disabled={isPending}
                    className="w-full bg-[#1b1f2b] border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500/50 transition-all disabled:opacity-50"
                  >
                    <option value="new">✦ New Arrival</option>
                    <option value="best">★ Best Seller</option>
                  </select>
                </div>
              </div>

              {/* MULTI-IMAGE GALLERY MANAGER */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-[10px] font-bold text-white/40 uppercase tracking-widest">
                    Product Image Gallery ({form.gallery.length} Images)
                  </label>
                  <div className="flex bg-white/5 p-1 rounded-lg border border-white/5 text-[10px] font-semibold">
                    <button
                      type="button"
                      onClick={() => setImageSourceMode("preset")}
                      className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                        imageSourceMode === "preset" ? "bg-emerald-500 text-white shadow" : "text-white/40 hover:text-white"
                      }`}
                    >
                      🖼️ Catalog Gallery
                    </button>
                    <button
                      type="button"
                      onClick={() => setImageSourceMode("upload")}
                      className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                        imageSourceMode === "upload" ? "bg-emerald-500 text-white shadow" : "text-white/40 hover:text-white"
                      }`}
                    >
                      📁 Upload File
                    </button>
                    <button
                      type="button"
                      onClick={() => setImageSourceMode("custom")}
                      className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                        imageSourceMode === "custom" ? "bg-emerald-500 text-white shadow" : "text-white/40 hover:text-white"
                      }`}
                    >
                      🔗 Custom URL
                    </button>
                  </div>
                </div>

                {/* CURRENT GALLERY LIST PREVIEW */}
                {form.gallery.length > 0 && (
                  <div className="mb-3 p-3 bg-white/5 rounded-xl border border-white/10">
                    <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider mb-2">
                      Active Product Images (Click to set primary, ✖ to remove):
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {form.gallery.map((gUrl, idx) => {
                        const isMain = form.imageUrl === gUrl;
                        return (
                          <div
                            key={gUrl + idx}
                            className={`relative group w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                              isMain ? "border-emerald-500 ring-2 ring-emerald-500/30" : "border-white/10"
                            }`}
                          >
                            <img
                              src={gUrl}
                              alt="Gallery Item"
                              onClick={() => setForm((prev) => ({ ...prev, imageUrl: gUrl }))}
                              className="w-full h-full object-cover cursor-pointer"
                            />
                            {isMain && (
                              <span className="absolute top-0.5 left-0.5 bg-emerald-500 text-white text-[8px] font-bold px-1 rounded shadow">
                                Primary
                              </span>
                            )}
                            <button
                              type="button"
                              onClick={() => removeImageFromGallery(gUrl)}
                              className="absolute top-0.5 right-0.5 w-4 h-4 rounded-full bg-red-500/90 hover:bg-red-600 text-white text-[9px] font-bold flex items-center justify-center shadow transition-transform hover:scale-110"
                              title="Remove image"
                            >
                              ✕
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* MODE 1: PRESET GALLERY GRID */}
                {imageSourceMode === "preset" && (
                  <div className="bg-white/5 border border-white/10 rounded-xl p-3 max-h-48 overflow-y-auto grid grid-cols-4 gap-2">
                    {PRESET_IMAGES.map((img) => {
                      const inGallery = form.gallery.includes(img.url);
                      return (
                        <button
                          key={img.url}
                          type="button"
                          onClick={() => {
                            if (inGallery) {
                              removeImageFromGallery(img.url);
                            } else {
                              addImageToGallery(img.url);
                            }
                          }}
                          className={`relative group h-20 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                            inGallery
                              ? "border-emerald-500 ring-2 ring-emerald-500/30 scale-[0.98]"
                              : "border-white/10 hover:border-white/30 opacity-70 hover:opacity-100"
                          }`}
                        >
                          <img src={img.url} alt={img.name} className="w-full h-full object-cover" />
                          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent p-1 text-[9px] text-white font-medium truncate text-center">
                            {img.name}
                          </div>
                          {inGallery && (
                            <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[9px] font-bold shadow">
                              ✓
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* MODE 2: UPLOAD FILE */}
                {imageSourceMode === "upload" && (
                  <div className="bg-white/5 border border-dashed border-white/20 rounded-xl p-5 text-center flex flex-col items-center justify-center hover:border-emerald-500/50 transition-colors">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      id="image-file-input"
                      className="hidden"
                    />
                    <label
                      htmlFor="image-file-input"
                      className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 text-xs text-white font-semibold cursor-pointer transition-all mb-2 flex items-center gap-2"
                    >
                      <span>📁 Select Image from Device</span>
                    </label>
                    <p className="text-[10px] text-white/30">Select image file to add to product gallery</p>
                  </div>
                )}

                {/* MODE 3: CUSTOM URL */}
                {imageSourceMode === "custom" && (
                  <div className="flex gap-2">
                    <input
                      value={form.imageUrl}
                      onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                      placeholder="https://example.com/image.jpg"
                      disabled={isPending}
                      className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-emerald-500/50 transition-all disabled:opacity-50 font-mono text-xs"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (form.imageUrl) addImageToGallery(form.imageUrl);
                      }}
                      className="px-3 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold rounded-xl transition-all"
                    >
                      + Add
                    </button>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1.5">Description</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Short product details..."
                  rows={2}
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
                  className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-sm font-bold hover:opacity-90 transition-all cursor-pointer disabled:opacity-50 shadow-lg shadow-emerald-500/20"
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
