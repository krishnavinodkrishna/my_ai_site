"use client";

import Link from "next/link";
import { CATEGORIES } from "@/content";
import { Reveal } from "./Reveal";
import { ImagePlaceholder } from "./Placeholders";

export function CategoriesSection() {
  return (
    <section id="categories" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-end mb-12">
          <Reveal direction="up" delay={0.1}>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold tracking-tight text-brand-green">
              Shop by Category
            </h2>
          </Reveal>
          <Reveal direction="up" delay={0.2}>
            <Link href="/shop" className="text-sm font-semibold tracking-wider uppercase text-brand-green hover:opacity-85 flex items-center gap-1 group">
              Browse all
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </Reveal>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8">
          {CATEGORIES.map((cat, idx) => (
            <Reveal key={cat.id} direction="up" delay={idx * 0.05 + 0.1}>
              <Link href={cat.href} className="flex flex-col items-center text-center group">
                <div className="w-32 h-32 rounded-full bg-brand-beige border border-brand-rose/20 overflow-hidden mb-4 shadow-md transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg relative flex items-center justify-center">
                  <ImagePlaceholder type={cat.id} className="w-16 h-16 object-contain" />
                </div>
                <h3 className="text-sm font-bold text-brand-green group-hover:text-black transition-colors">{cat.name}</h3>
                <span className="text-xs text-text-light">{cat.itemCount}</span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CategoriesSection;
