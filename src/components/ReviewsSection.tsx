"use client";

import { REVIEWS } from "@/content";
import { Reveal } from "./Reveal";

export function ReviewsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <Reveal direction="up" delay={0.1}>
            <span className="text-[10px] font-bold tracking-widest text-text-light uppercase mb-1 block">
              What they say
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold tracking-tight text-brand-green">
              Customer Reviews
            </h2>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {REVIEWS.map((review, idx) => (
            <Reveal key={review.author} direction="up" delay={idx * 0.1 + 0.1}>
              <div className="bg-brand-beige border border-brand-rose/10 rounded-2xl p-8 hover:shadow-md transition-shadow">
                <div className="flex gap-1 text-amber-500 mb-4">
                  {Array.from({ length: review.stars }).map((_, i) => (
                    <span key={i} className="text-sm">★</span>
                  ))}
                </div>
                <p className="text-sm italic text-text-dark mb-6 leading-relaxed">
                  {review.content}
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-brand-rose flex items-center justify-center text-xs font-bold text-brand-green uppercase">
                    {review.author[0]}
                  </div>
                  <h4 className="text-xs font-bold text-brand-green">{review.author}</h4>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ReviewsSection;
