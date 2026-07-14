"use client";

import { useState } from "react";
import { Reveal } from "./Reveal";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setEmail("");
      }, 3500);
    }
  };

  return (
    <section className="py-20 bg-brand-beige border-t border-brand-rose/20">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Newsletter Signup Panel */}
        <Reveal direction="up" delay={0.1}>
          <div className="relative rounded-3xl bg-brand-rose p-8 sm:p-12 md:p-16 text-center max-w-4xl mx-auto shadow-md mb-20">
            <h3 className="font-serif text-3xl md:text-4xl font-semibold tracking-tight text-brand-green mb-4">
              Join the MAX Club
            </h3>
            <p className="text-sm text-text-dark mb-8 max-w-md mx-auto leading-relaxed">
              Get exclusive discounts, latest arrivals, and fashion tips delivered directly to your inbox.
            </p>

            {subscribed ? (
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 max-w-sm mx-auto shadow-inner border border-brand-green/10">
                <span className="text-sm font-bold text-brand-green">🎉 Success! Check your inbox soon.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-5 py-3 rounded-full bg-white text-brand-green placeholder-text-light/75 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-transparent transition-all border border-brand-rose/40"
                />
                <button
                  type="submit"
                  className="px-8 py-3 rounded-full bg-brand-green hover:bg-brand-green-hover text-brand-beige font-semibold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </Reveal>

        {/* Feature Badges under Newsletter */}
        <Reveal direction="up" delay={0.2}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pt-8 border-t border-brand-rose/20 text-center sm:text-left">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-brand-green mb-2">Quality You Can Trust</h4>
              <p className="text-xs text-text-light leading-relaxed">Premium handpicked fashion items from trusted global designers.</p>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-brand-green mb-2">Customer Support</h4>
              <p className="text-xs text-text-light leading-relaxed">We are here to assist you 24/7 with any order requests.</p>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-brand-green mb-2">Loved by Thousands</h4>
              <p className="text-xs text-text-light leading-relaxed">Join a happy customer community enjoying style everyday.</p>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-brand-green mb-2">Sustainable Choice</h4>
              <p className="text-xs text-text-light leading-relaxed">Eco-friendly selections supporting green production goals.</p>
            </div>
          </div>
        </Reveal>

      </div>
    </section>
  );
}

export default NewsletterSection;
