"use client";

import { useState } from "react";
import { useLead } from "@/lead";
import { Navbar } from "./Navbar";
import { Hero } from "./Hero";
import { CategoriesSection } from "./CategoriesSection";
import { PromoSection } from "./PromoSection";
import { ProductGrid } from "./ProductGrid";
import { ReviewsSection } from "./ReviewsSection";
import { NewsletterSection } from "./NewsletterSection";
import { Footer } from "./Footer";
import { AnimatePresence, motion } from "motion/react";

export function SiteShell() {
  const { isModalOpen, closeModal } = useLead();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setEmail("");
        closeModal();
      }, 2000);
    }
  };

  return (
    <div className="relative min-h-screen bg-brand-beige text-brand-green selection:bg-brand-green selection:text-brand-beige overflow-hidden">
      <Navbar />
      <main>
        <Hero />
        <CategoriesSection />
        <PromoSection />
        <ProductGrid />
        <ReviewsSection />
        <NewsletterSection />
      </main>
      <Footer />

      {/* Lead/Waitlist Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-md overflow-hidden rounded-3xl border border-brand-rose/20 bg-brand-beige p-8 shadow-2xl"
            >
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-text-light hover:text-brand-green transition-colors p-2 rounded-full hover:bg-brand-rose-light cursor-pointer"
              >
                ✕
              </button>

              {submitted ? (
                <div className="text-center py-8">
                  <div className="w-12 h-12 rounded-full bg-brand-green/10 text-brand-green flex items-center justify-center mx-auto mb-4 border border-brand-green/20">
                    ✓
                  </div>
                  <h3 className="font-serif text-xl font-bold mb-2">Thank you!</h3>
                  <p className="text-sm text-text-light">
                    You've successfully joined the waitlist.
                  </p>
                </div>
              ) : (
                <div>
                  <h3 className="font-serif text-2xl font-bold mb-2 text-brand-green">
                    Join the Waitlist
                  </h3>
                  <p className="text-sm text-text-light mb-6 leading-relaxed">
                    Be the first to get access to the new season collection and style updates. Enter your email below.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="modal-email" className="sr-only">
                        Email Address
                      </label>
                      <input
                        id="modal-email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@example.com"
                        className="w-full px-4 py-3 rounded-xl bg-white border border-brand-rose/40 text-brand-green placeholder-text-light focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-transparent transition-all"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-3 rounded-xl bg-brand-green hover:bg-brand-green-hover text-brand-beige font-semibold transition-colors shadow-lg cursor-pointer"
                    >
                      Sign Up
                    </button>
                  </form>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default SiteShell;
