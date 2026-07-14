"use client";

import { useState } from "react";
import { FAQS } from "@/content";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { motion, AnimatePresence } from "motion/react";

export default function FAQPage() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const toggleFAQ = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <div className="relative min-h-screen bg-brand-beige text-brand-green selection:bg-brand-green selection:text-brand-beige">
      <Navbar />
      
      <main className="pt-32 pb-24 max-w-3xl mx-auto px-6">
        <Reveal direction="up" delay={0.1}>
          <div className="mb-16 text-center">
            <span className="text-[10px] font-bold tracking-widest text-text-light uppercase mb-1 block">
              Have Questions?
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl font-semibold tracking-tight text-brand-green">
              Frequently Asked Questions
            </h1>
          </div>
        </Reveal>

        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <Reveal key={idx} direction="up" delay={idx * 0.05 + 0.15}>
                <div className="bg-white rounded-2xl border border-brand-rose/15 overflow-hidden shadow-sm transition-all duration-300">
                  <button
                    onClick={() => toggleFAQ(idx)}
                    className="w-full flex items-center justify-between p-6 text-left cursor-pointer transition-colors"
                  >
                    <span className="text-sm font-bold text-brand-green">{faq.question}</span>
                    <span className={`text-xs text-text-light transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}>
                      ▼
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="p-6 pt-0 border-t border-brand-rose/10 text-xs text-text-light leading-relaxed">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
}
