"use client";

import { useState, useTransition } from "react";
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
import { submitLead } from "@/app/actions/submit-lead";

export function SiteShell() {
  const { isModalOpen, closeModal } = useLead();
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const formData = new FormData(e.currentTarget);
    const phone = String(formData.get("phone") ?? "").trim();
    const name = String(formData.get("name") ?? "").trim();

    startTransition(async () => {
      const result = await submitLead(formData);
      if (!result.ok) {
        setError(result.error ?? "Something went wrong.");
        return;
      }
      setSubmitted(true);
      // Open WhatsApp with the user's name + phone
      const waMsg = encodeURIComponent(
        `Hi MAX! I'm ${name}. I'd like to join the waitlist. My number is ${phone}.`
      );
      window.open(`https://wa.me/911234567890?text=${waMsg}`, "_blank");
      setTimeout(() => {
        setSubmitted(false);
        closeModal();
      }, 2500);
    });
  }

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
                  <div className="w-12 h-12 rounded-full bg-brand-green/10 text-brand-green flex items-center justify-center mx-auto mb-4 border border-brand-green/20 text-xl">
                    ✓
                  </div>
                  <h3 className="font-serif text-xl font-bold mb-2">You are on the list!</h3>
                  <p className="text-sm text-text-light">
                    Your details have been saved. Opening WhatsApp for you…
                  </p>
                </div>
              ) : (
                <div>
                  <h3 className="font-serif text-2xl font-bold mb-1 text-brand-green">
                    Join the Waitlist
                  </h3>
                  <p className="text-sm text-text-light mb-6 leading-relaxed">
                    Be the first to access new collection drops. We will reach you on WhatsApp!
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Honeypot — hidden from humans, bots fill it */}
                    <input type="text" name="company" className="hidden" tabIndex={-1} autoComplete="off" />
                    <input type="hidden" name="source" value="lead-modal" />

                    {/* Name */}
                    <div>
                      <label htmlFor="modal-name" className="block text-xs font-semibold text-text-light mb-1.5 uppercase tracking-wider">
                        Full Name *
                      </label>
                      <input
                        id="modal-name"
                        name="name"
                        type="text"
                        required
                        maxLength={120}
                        placeholder="e.g. Priya Sharma"
                        className="w-full px-4 py-3 rounded-xl bg-white border border-brand-rose/40 text-brand-green placeholder-text-light focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-transparent transition-all"
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label htmlFor="modal-phone" className="block text-xs font-semibold text-text-light mb-1.5 uppercase tracking-wider">
                        Phone Number *
                      </label>
                      <input
                        id="modal-phone"
                        name="phone"
                        type="tel"
                        required
                        placeholder="e.g. +91 98765 43210"
                        className="w-full px-4 py-3 rounded-xl bg-white border border-brand-rose/40 text-brand-green placeholder-text-light focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-transparent transition-all"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="modal-email" className="block text-xs font-semibold text-text-light mb-1.5 uppercase tracking-wider">
                        Email <span className="text-text-light font-normal">(optional)</span>
                      </label>
                      <input
                        id="modal-email"
                        name="email"
                        type="email"
                        placeholder="name@example.com"
                        className="w-full px-4 py-3 rounded-xl bg-white border border-brand-rose/40 text-brand-green placeholder-text-light focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-transparent transition-all"
                      />
                    </div>

                    {/* Error */}
                    {error && (
                      <p className="text-xs text-red-500 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                        {error}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={isPending}
                      className="w-full py-3 rounded-xl bg-brand-green hover:bg-brand-green-hover text-brand-beige font-semibold transition-colors shadow-lg cursor-pointer disabled:opacity-60"
                    >
                      {isPending ? "Saving..." : "Join Waitlist & Chat on WhatsApp"}
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
