"use client";

import { use, useState, useEffect } from "react";
import { notFound } from "next/navigation";
import { NEW_ARRIVALS, BEST_SELLERS } from "@/content";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { useLead } from "@/lead";
import Link from "next/link";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ProductDetailPage({ params }: PageProps) {
  const { id } = use(params);
  const { openModal } = useLead();

  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeImg, setActiveImg] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  useEffect(() => {
    async function load() {
      const { getProductsAction } = await import("@/app/actions/products");
      const res = await getProductsAction();
      const all = res.ok && res.products ? res.products : [...NEW_ARRIVALS, ...BEST_SELLERS];
      const found = all.find((p: any) => p.id === id);
      
      if (found) {
        const localFallback = [...NEW_ARRIVALS, ...BEST_SELLERS].find((p: any) => p.id === id);
        if (localFallback) {
          found.gallery = localFallback.gallery || found.gallery;
          found.colors = localFallback.colors || found.colors;
        }
        if (found.colors && found.colors.length > 0) {
          setSelectedColor(found.colors[0].name);
        }
      }
      
      setProduct(found || null);
      setLoading(false);
    }
    load();
  }, [id]);

  // Dynamically sync selectedColor when activeImg changes
  useEffect(() => {
    if (product && product.colors) {
      const imagesList: string[] = product.gallery && product.gallery.length > 0
        ? product.gallery
        : [product.imageUrl];
      const currentImgUrl = imagesList[activeImg];
      const matchingColor = product.colors.find((c: any) => c.imageUrl === currentImgUrl);
      if (matchingColor && matchingColor.name !== selectedColor) {
        setSelectedColor(matchingColor.name);
      }
    }
  }, [activeImg, product, selectedColor]);

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-beige flex items-center justify-center">
        <span className="animate-spin text-brand-green text-2xl">⏳</span>
      </div>
    );
  }

  if (!product) notFound();

  const images: string[] = product.gallery && product.gallery.length > 0
    ? product.gallery
    : [product.imageUrl];

  const sizes = ["XS", "S", "M", "L", "XL"];
  
  const isBagOrAccessory = 
    product.title.toLowerCase().includes("handbag") || 
    product.title.toLowerCase().includes("backpack") || 
    product.title.toLowerCase().includes("watch") || 
    product.title.toLowerCase().includes("sunglasses") || 
    product.title.toLowerCase().includes("earrings");

  const getOriginalPrice = (priceStr: string) => {
    if (!priceStr) return "";
    const num = parseInt(priceStr.replace(/[^0-9]/g, ""), 10);
    if (isNaN(num)) return "";
    const originalVal = num * 2;
    const symbol = priceStr.startsWith("₹") ? "₹" : "$";
    if (symbol === "₹") {
      return `₹${originalVal.toLocaleString("en-IN")}`;
    }
    return `${symbol}${originalVal}`;
  };

  return (
    <div className="relative min-h-screen bg-brand-beige text-brand-green selection:bg-brand-green selection:text-brand-beige">
      <Navbar />

      <main className="pt-32 pb-24 max-w-7xl mx-auto px-6">
        {/* Breadcrumb */}
        <Reveal direction="up" delay={0.05}>
          <nav className="flex items-center gap-2 text-[11px] font-medium text-text-light mb-10 uppercase tracking-widest">
            <Link href="/" className="hover:text-brand-green transition-colors">Home</Link>
            <span>›</span>
            <Link href="/shop/women" className="hover:text-brand-green transition-colors">Women</Link>
            <span>›</span>
            <span className="text-brand-green">{product.title}</span>
          </nav>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">

          {/* ── LEFT: Gallery ── */}
          <Reveal direction="up" delay={0.1}>
            <div className="flex flex-col gap-4">
              {/* Main image */}
              <div className="relative w-full aspect-[3/4] rounded-3xl overflow-hidden bg-white shadow-xl">
                <img
                  key={activeImg}
                  src={images[activeImg]}
                  alt={product.title}
                  className="w-full h-full object-cover transition-all duration-500 ease-in-out"
                  style={{ animation: "fadeIn 0.4s ease" }}
                />
                {/* Nav arrows */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={() => setActiveImg((prev) => (prev - 1 + images.length) % images.length)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur flex items-center justify-center text-brand-green shadow-lg hover:bg-white transition-all cursor-pointer"
                      aria-label="Previous image"
                    >
                      ‹
                    </button>
                    <button
                      onClick={() => setActiveImg((prev) => (prev + 1) % images.length)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur flex items-center justify-center text-brand-green shadow-lg hover:bg-white transition-all cursor-pointer"
                      aria-label="Next image"
                    >
                      ›
                    </button>
                  </>
                )}
                {/* Dot indicators */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {images.map((_: string, i: number) => (
                    <button
                      key={i}
                      onClick={() => setActiveImg(i)}
                      className={`w-2 h-2 rounded-full transition-all cursor-pointer ${i === activeImg ? "bg-brand-green scale-125" : "bg-white/60"}`}
                      aria-label={`Go to image ${i + 1}`}
                    />
                  ))}
                </div>
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-1">
                  {images.map((src, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImg(i)}
                      className={`flex-shrink-0 w-20 h-24 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                        i === activeImg
                          ? "border-brand-green shadow-md scale-105"
                          : "border-transparent opacity-60 hover:opacity-100"
                      }`}
                      aria-label={`Select image ${i + 1}`}
                    >
                      <img src={src} alt={`View ${i + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </Reveal>

          {/* ── RIGHT: Product Info ── */}
          <Reveal direction="up" delay={0.2}>
            <div className="flex flex-col gap-6 lg:sticky lg:top-32">
              {/* Badge */}
              <span className="inline-block self-start px-3 py-1 bg-brand-rose/20 text-brand-green text-[10px] font-bold uppercase tracking-widest rounded-full">
                New Arrival
              </span>

              {/* Title */}
              <h1 className="font-serif text-4xl font-semibold tracking-tight leading-tight text-brand-green">
                {product.title}
              </h1>

              {/* Stars */}
              <div className="flex items-center gap-1">
                {[1,2,3,4,5].map((s) => (
                  <span key={s} className="text-amber-400 text-sm">★</span>
                ))}
                <span className="text-[11px] text-text-light ml-2">(128 reviews)</span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-brand-green">{product.price}</span>
                <span className="text-sm text-text-light line-through">{getOriginalPrice(product.price)}</span>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">50% OFF</span>
              </div>

              {/* Description */}
              {product.description && (
                <p className="text-sm text-text-light leading-relaxed border-t border-brand-rose/20 pt-4">
                  {product.description}
                </p>
              )}

              {/* Color selector */}
              {product.colors && product.colors.length > 0 && (
                <div className="border-t border-brand-rose/20 pt-4">
                  <div className="flex justify-between items-baseline mb-3">
                    <p className="text-xs font-bold uppercase tracking-widest text-text-light">
                      Select Color
                    </p>
                    {selectedColor && (
                      <p className="text-[11px] text-brand-green font-semibold">
                        {selectedColor}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-3">
                    {product.colors.map((color: any) => (
                      <button
                        key={color.name}
                        onClick={() => {
                          setSelectedColor(color.name);
                          const imgIdx = images.indexOf(color.imageUrl);
                          if (imgIdx !== -1) {
                            setActiveImg(imgIdx);
                          }
                        }}
                        className="focus:outline-none cursor-pointer"
                        title={color.name}
                      >
                        <span
                          className={`w-9 h-9 rounded-full border-2 transition-all flex items-center justify-center ${
                            selectedColor === color.name
                              ? "border-brand-green scale-110 shadow-md"
                              : "border-transparent hover:border-brand-green/30"
                          }`}
                        >
                          <span
                            className="w-7 h-7 rounded-full shadow-inner border border-zinc-200"
                            style={{ backgroundColor: color.hex }}
                          />
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size selector */}
              <div className="border-t border-brand-rose/20 pt-4">
                <p className="text-xs font-bold uppercase tracking-widest text-text-light mb-3">
                  Select Size
                </p>
                {!isBagOrAccessory ? (
                  <div className="flex gap-2 flex-wrap">
                    {sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`w-12 h-12 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                          selectedSize === size
                            ? "border-brand-green bg-brand-green text-brand-beige shadow-md"
                            : "border-brand-rose/30 text-brand-green hover:border-brand-green"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm font-semibold text-brand-green bg-white/50 border border-brand-rose/10 inline-block px-4 py-2.5 rounded-xl">
                    Medium
                  </p>
                )}
              </div>

              {/* Image count chip */}
              <div className="flex items-center gap-2 text-[11px] text-text-light">
                <span className="w-5 h-5 rounded-full bg-brand-green text-brand-beige flex items-center justify-center text-[10px] font-bold">
                  {images.length}
                </span>
                <span>styles available in this collection</span>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={openModal}
                  className="flex-1 py-4 rounded-xl bg-brand-green text-brand-beige text-sm font-bold uppercase tracking-widest hover:opacity-90 active:scale-95 transition-all cursor-pointer shadow-lg"
                >
                  Add To Cart
                </button>
                <button
                  onClick={openModal}
                  className="flex-1 py-4 rounded-xl border-2 border-brand-green text-brand-green text-sm font-bold uppercase tracking-widest hover:bg-brand-green hover:text-brand-beige active:scale-95 transition-all cursor-pointer"
                >
                  ♥ Wishlist
                </button>
              </div>

              {/* Trust badges */}
              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-brand-rose/20">
                {[
                  { icon: "🚚", label: "Free Delivery" },
                  { icon: "↩️", label: "Easy Returns" },
                  { icon: "🔒", label: "Secure Pay" },
                ].map((b) => (
                  <div key={b.label} className="flex flex-col items-center gap-1 bg-white rounded-xl p-3 text-center">
                    <span className="text-xl">{b.icon}</span>
                    <span className="text-[10px] font-bold text-brand-green">{b.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </main>

      <Footer />

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(1.02); }
          to   { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
