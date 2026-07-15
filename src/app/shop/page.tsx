"use client";

import { useState } from "react";
import { FILTERS, CATEGORIES, NEW_ARRIVALS, BEST_SELLERS } from "@/content";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { ImagePlaceholder } from "@/components/Placeholders";
import { useLead } from "@/lead";

export default function ShopPage() {
  const { openModal } = useLead();
  const allProducts = [...NEW_ARRIVALS, ...BEST_SELLERS];
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredProducts = selectedCategory
    ? allProducts.filter(
        (p) =>
          p.title.toLowerCase().includes(selectedCategory.toLowerCase()) ||
          (selectedCategory === "Women" && p.title.includes("Women")) ||
          (selectedCategory === "Men" && p.title.includes("Men")) ||
          (selectedCategory === "Watches" && p.title.includes("Watch")) ||
          (selectedCategory === "Bags" && p.title.includes("Handbag")) ||
          (selectedCategory === "Bags" && p.title.includes("Backpack")) ||
          (selectedCategory === "Footwear" && p.title.includes("Sneaker"))
      )
    : allProducts;

  return (
    <div className="relative min-h-screen bg-brand-beige text-brand-green selection:bg-brand-green selection:text-brand-beige">
      <Navbar />
      
      <main className="pt-32 pb-24 max-w-7xl mx-auto px-6">
        <Reveal direction="up" delay={0.1}>
          <div className="mb-12">
            <span className="text-[10px] font-bold tracking-widest text-text-light uppercase mb-1 block">
              MAX Collections
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl font-semibold tracking-tight text-brand-green">
              Shop All Products
            </h1>
          </div>
        </Reveal>

        {/* Quick category filter grid */}
        <Reveal direction="up" delay={0.15}>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-16">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(selectedCategory === cat.name ? null : cat.name)}
                className={`p-4 rounded-2xl border text-center transition-all cursor-pointer ${
                  selectedCategory === cat.name
                    ? "bg-brand-green text-brand-beige border-brand-green shadow-md"
                    : "bg-white text-brand-green border-brand-rose/25 hover:border-brand-green/30"
                }`}
              >
                <div className="w-12 h-12 mx-auto mb-2 flex items-center justify-center">
                  <ImagePlaceholder type={cat.id} className="w-8 h-8 object-contain" />
                </div>
                <h3 className="text-xs font-bold">{cat.name}</h3>
              </button>
            ))}
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Sidebar Filters */}
          <aside className="lg:col-span-3 space-y-8 bg-white p-6 sm:p-8 rounded-3xl border border-brand-rose/10 shadow-sm">
            <h2 className="font-bold text-xs uppercase tracking-widest border-b border-brand-rose/20 pb-4 mb-4">
              Filter By
            </h2>
            
            {/* Category Filter */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-text-light mb-3">Categories</h3>
              <div className="space-y-2">
                {FILTERS.categories.map((c) => (
                  <button
                    key={c}
                    onClick={() => setSelectedCategory(selectedCategory === c ? null : c)}
                    className={`flex items-center text-xs w-full text-left transition-colors cursor-pointer ${
                      selectedCategory === c ? "text-brand-green font-bold" : "text-text-dark hover:text-brand-green"
                    }`}
                  >
                    <span
                      className={`w-3.5 h-3.5 rounded border border-brand-green/30 mr-2 flex items-center justify-center text-[8px] ${
                        selectedCategory === c ? "bg-brand-green text-white" : "bg-white"
                      }`}
                    >
                      {selectedCategory === c && "✓"}
                    </span>
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Brand Filter */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-text-light mb-3">Brands</h3>
              <div className="space-y-2">
                {FILTERS.brands.map((b) => (
                  <label key={b} className="flex items-center text-xs text-text-dark hover:text-brand-green cursor-pointer">
                    <input type="checkbox" className="w-3.5 h-3.5 rounded border border-zinc-300 mr-2 text-brand-green focus:ring-brand-green" />
                    {b}
                  </label>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-text-light mb-3">Price Range</h3>
              <div className="space-y-2">
                {FILTERS.prices.map((p) => (
                  <label key={p} className="flex items-center text-xs text-text-dark hover:text-brand-green cursor-pointer">
                    <input type="radio" name="price" className="w-3.5 h-3.5 border border-zinc-300 mr-2 text-brand-green focus:ring-brand-green" />
                    {p}
                  </label>
                ))}
              </div>
            </div>

            {/* Size Filter */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-text-light mb-3">Sizes</h3>
              <div className="flex flex-wrap gap-2">
                {FILTERS.sizes.map((s) => (
                  <button key={s} className="px-3 py-1.5 border border-brand-rose/25 text-[10px] font-bold rounded-lg hover:border-brand-green hover:bg-brand-green hover:text-brand-beige transition-all cursor-pointer">
                    {s}
                  </button>
                ))}
              </div>
            </div>

          </aside>

          {/* Product Grid Area */}
          <div className="lg:col-span-9">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-3xl border border-brand-rose/10 shadow-sm">
                <span className="text-3xl mb-4 block">🔍</span>
                <h3 className="font-serif text-lg font-semibold text-brand-green">No products found</h3>
                <p className="text-xs text-text-light mt-1">Try clearing your category filter to see all items.</p>
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="mt-4 px-5 py-2 rounded-full bg-brand-green text-brand-beige text-xs font-semibold cursor-pointer"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map((product, idx) => (
                  <Reveal key={product.id} direction="up" delay={idx * 0.05 + 0.1}>
                    <div className="group bg-white rounded-2xl p-4 border border-brand-rose/10 hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                      <div className="relative h-64 bg-brand-beige rounded-xl overflow-hidden mb-4 flex items-center justify-center">
                        {product.imageUrl && !product.imageUrl.includes("/images/products/") ? (
                          <img src={product.imageUrl} alt={product.title} className="w-full h-full object-cover" />
                        ) : (
                          <ImagePlaceholder type={product.title} className="w-32 h-32 object-contain" />
                        )}
                        <button onClick={openModal} className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white flex items-center justify-center text-zinc-400 hover:text-red-500 shadow transition-colors cursor-pointer">
                          ♥
                        </button>
                      </div>
                      <h3 className="text-sm font-bold text-brand-green mb-1">{product.title}</h3>
                      {product.description && (
                        <p className="text-[10px] text-text-light mb-3 line-clamp-2 leading-snug">{product.description}</p>
                      )}
                      <div className="flex items-center justify-between mt-auto">
                        <span className="text-sm font-medium text-brand-green">{product.price}</span>
                        <button
                          onClick={openModal}
                          className="px-4 py-1.5 rounded-lg border border-brand-green/20 text-[10px] font-bold text-brand-green hover:bg-brand-green hover:text-brand-beige transition-colors cursor-pointer"
                        >
                          Add To Cart
                        </button>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
