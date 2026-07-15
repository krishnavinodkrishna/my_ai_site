"use client";

import { use, useState, useEffect } from "react";
import Link from "next/link";
import { COLLECTION_PAGES, NEW_ARRIVALS, BEST_SELLERS } from "@/content";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { ImagePlaceholder } from "@/components/Placeholders";
import { useLead } from "@/lead";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ category: string }>;
}

export default function CategoryCollectionPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const catKey = resolvedParams.category.toLowerCase();
  
  // Verify category exists
  if (
    catKey !== "women" &&
    catKey !== "men" &&
    catKey !== "watches" &&
    catKey !== "bags" &&
    catKey !== "accessories"
  ) {
    notFound();
  }

  const collection = COLLECTION_PAGES[catKey as keyof typeof COLLECTION_PAGES];
  const { openModal } = useLead();

  const [products, setProducts] = useState<any[]>([...NEW_ARRIVALS, ...BEST_SELLERS]);

  useEffect(() => {
    async function load() {
      const { getProductsAction } = await import("@/app/actions/products");
      const res = await getProductsAction();
      if (res.ok && res.products) {
        setProducts(res.products);
      }
    }
    load();
  }, []);

  const filteredProducts = products.filter((p) => {
    const title = p.title.toLowerCase();
    if (catKey === "women") return title.includes("women") || title.includes("dress") || title.includes("earring");
    if (catKey === "men") return title.includes("men") || title.includes("shirt");
    if (catKey === "watches") return title.includes("watch");
    if (catKey === "bags") return title.includes("handbag") || title.includes("backpack");
    if (catKey === "accessories") return title.includes("sunglass") || title.includes("earring") || title.includes("watch");
    return true;
  });

  return (
    <div className="relative min-h-screen bg-brand-beige text-brand-green selection:bg-brand-green selection:text-brand-beige">
      <Navbar />
      
      <main className="pt-32 pb-24 max-w-7xl mx-auto px-6">
        <section className="text-center max-w-3xl mx-auto mb-16">
          <Reveal direction="up" delay={0.1}>
            <span className="text-[10px] font-bold tracking-widest text-text-light uppercase mb-2 block">
              MAX Collections
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl font-semibold tracking-tight text-brand-green mb-4">
              {collection.title}
            </h1>
          </Reveal>
          <Reveal direction="up" delay={0.2}>
            <p className="text-sm text-text-light leading-relaxed">
              {collection.description}
            </p>
          </Reveal>

          {/* Subcategories (specifically for watches or others if available) */}
          {"subcategories" in collection && (
            <Reveal direction="up" delay={0.25}>
              <div className="flex flex-wrap justify-center gap-2 mt-6">
                {(collection as any).subcategories.map((sub: string) => (
                  <span key={sub} className="px-3.5 py-1.5 bg-white border border-brand-rose/25 text-[10px] font-bold rounded-full">
                    {sub}
                  </span>
                ))}
              </div>
            </Reveal>
          )}
        </section>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product, idx) => (
            <Reveal key={product.id} direction="up" delay={idx * 0.05 + 0.1}>
              <div className="group bg-white rounded-2xl p-4 border border-brand-rose/10 hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                <Link href={`/product/${product.id}`} className="block">
                  <div className="relative h-64 bg-brand-beige rounded-xl overflow-hidden mb-4 flex items-center justify-center">
                    {product.imageUrl && !product.imageUrl.includes("/images/products/") ? (
                      <img
                        src={product.imageUrl}
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <ImagePlaceholder type={product.title} className="w-32 h-32 object-contain" />
                    )}
                    {product.gallery && product.gallery.length > 1 && (
                      <span className="absolute bottom-3 left-3 bg-black/60 text-white text-[10px] font-bold px-2 py-1 rounded-full backdrop-blur-sm">
                        {product.gallery.length} photos
                      </span>
                    )}
                    <button onClick={(e) => { e.preventDefault(); openModal(); }} className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white flex items-center justify-center text-zinc-400 hover:text-red-500 shadow transition-colors cursor-pointer">
                      ♥
                    </button>
                  </div>
                  <h3 className="text-sm font-bold text-brand-green mb-1 group-hover:underline underline-offset-2">{product.title}</h3>
                </Link>
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
      </main>

      <Footer />
    </div>
  );
}
