"use client";

import Link from "next/link";
import { NEW_ARRIVALS, BEST_SELLERS, TRENDING_PRODUCTS } from "@/content";
import { useLead } from "@/lead";
import { Reveal } from "./Reveal";
import { ImagePlaceholder } from "./Placeholders";

import { useState, useEffect } from "react";

export function ProductGrid() {
  const { openModal } = useLead();
  const [arrivals, setArrivals] = useState<any[]>(NEW_ARRIVALS);
  const [bestSellers, setBestSellers] = useState<any[]>(BEST_SELLERS);

  useEffect(() => {
    async function load() {
      const { getProductsAction } = await import("@/app/actions/products");
      const res = await getProductsAction();
      if (res.ok && res.products && res.products.length > 0) {
        const dbNew = res.products.filter((p: any) => p.type === "new");
        const dbBest = res.products.filter((p: any) => p.type === "best");
        if (dbNew.length > 0) setArrivals(dbNew);
        if (dbBest.length > 0) setBestSellers(dbBest);
      }
    }
    load();
  }, []);

  return (
    <section className="py-20 bg-brand-beige">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* NEW ARRIVALS */}
        <div className="mb-24">
          <div className="flex justify-between items-end mb-12">
            <Reveal direction="up" delay={0.1}>
              <div>
                <span className="text-[10px] font-bold tracking-widest text-text-light uppercase mb-1 block">
                  Fresh off the runway
                </span>
                <h2 className="font-serif text-3xl md:text-4xl font-semibold tracking-tight text-brand-green">
                  New Arrivals
                </h2>
              </div>
            </Reveal>
            <Reveal direction="up" delay={0.2}>
              <Link href="/shop" className="text-sm font-semibold tracking-wider uppercase text-brand-green hover:opacity-85 flex items-center gap-1 group">
                View all
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {arrivals.map((product, idx) => (
              <Reveal key={product.id} direction="up" delay={idx * 0.05 + 0.1}>
                <div className="group bg-white rounded-2xl p-4 border border-brand-rose/10 hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                  <Link href={`/product/${product.id}`} className="block">
                    <div className="relative h-64 bg-brand-beige rounded-xl overflow-hidden mb-4 flex items-center justify-center">
                      {product.imageUrl && !product.imageUrl.includes("default.jpg") ? (
                        <img src={product.imageUrl} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      ) : (
                        <ImagePlaceholder type={product.title} className="w-32 h-32 object-contain" />
                      )}
                      <button onClick={(e) => { e.preventDefault(); openModal(); }} className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white flex items-center justify-center text-zinc-400 hover:text-red-500 shadow transition-colors cursor-pointer">
                        ♥
                      </button>
                    </div>
                    <h3 className="text-sm font-bold text-brand-green mb-1 group-hover:underline underline-offset-2">{product.title}</h3>
                  </Link>
                  <div className="flex items-center justify-between mt-2">
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
        </div>

        {/* TRENDING PRODUCTS */}
        <div className="mb-24 py-12 border-y border-brand-rose/20">
          <Reveal direction="up" delay={0.1}>
            <h3 className="text-center font-bold text-xs uppercase tracking-widest text-text-light mb-8">
              Currently Trending
            </h3>
          </Reveal>
          <Reveal direction="up" delay={0.2}>
            <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
              {TRENDING_PRODUCTS.map((tag) => (
                <Link
                  key={tag}
                  href={`/shop`}
                  className="px-5 py-2.5 rounded-full border border-brand-green/10 bg-white hover:border-brand-green hover:bg-brand-green hover:text-brand-beige text-xs font-semibold text-brand-green transition-all duration-200"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </Reveal>
        </div>

        {/* BEST SELLERS */}
        <div>
          <div className="mb-12 text-center">
            <Reveal direction="up" delay={0.1}>
              <span className="text-[10px] font-bold tracking-widest text-text-light uppercase mb-1 block">
                Loved by everyone
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-semibold tracking-tight text-brand-green">
                Best Sellers
              </h2>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {bestSellers.map((product, idx) => (
              <Reveal key={product.id} direction="up" delay={idx * 0.05 + 0.1}>
                <div className="group bg-white rounded-2xl p-4 border border-brand-rose/10 hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                  <Link href={`/product/${product.id}`} className="block">
                    <div className="relative h-56 bg-brand-beige rounded-xl overflow-hidden mb-4 flex items-center justify-center">
                      {product.imageUrl && !product.imageUrl.includes("default.jpg") ? (
                        <img src={product.imageUrl} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      ) : (
                        <ImagePlaceholder type={product.title} className="w-28 h-28 object-contain" />
                      )}
                    </div>
                    <h3 className="text-sm font-bold text-brand-green mb-1 group-hover:underline underline-offset-2">{product.title}</h3>
                  </Link>
                  <p className="text-[10px] text-text-light leading-snug line-clamp-2 mb-3">{product.description}</p>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-sm font-medium text-brand-green">{product.price}</span>
                    <button
                      onClick={openModal}
                      className="px-3 py-1.5 rounded-lg bg-brand-green hover:bg-brand-green-hover text-brand-beige text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      Shop Item
                    </button>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

export default ProductGrid;
