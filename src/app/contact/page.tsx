"use client";

import { useState } from "react";
import { CONTACT_INFO } from "@/content";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.name && form.email && form.message) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setForm({ name: "", email: "", message: "" });
      }, 3000);
    }
  };

  return (
    <div className="relative min-h-screen bg-brand-beige text-brand-green selection:bg-brand-green selection:text-brand-beige">
      <Navbar />
      
      <main className="pt-32 pb-24 max-w-7xl mx-auto px-6">
        <Reveal direction="up" delay={0.1}>
          <div className="mb-16 text-center max-w-xl mx-auto">
            <span className="text-[10px] font-bold tracking-widest text-text-light uppercase mb-1 block">
              Say Hello
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl font-semibold tracking-tight text-brand-green">
              Get In Touch
            </h1>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Info Details (Left) */}
          <div className="lg:col-span-5 space-y-8">
            <Reveal direction="up" delay={0.2}>
              <div className="bg-white p-8 rounded-3xl border border-brand-rose/10 shadow-sm space-y-6">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-text-light mb-2">📍 Address</h3>
                  <p className="text-sm text-text-dark font-medium">{CONTACT_INFO.address}</p>
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-text-light mb-2">📞 Phone</h3>
                  <a href={`tel:${CONTACT_INFO.phone}`} className="text-sm text-text-dark font-bold hover:underline">
                    {CONTACT_INFO.phone}
                  </a>
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-text-light mb-2">📧 Email</h3>
                  <a href={`mailto:${CONTACT_INFO.email}`} className="text-sm text-text-dark font-bold hover:underline">
                    {CONTACT_INFO.email}
                  </a>
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-text-light mb-2">⏰ Business Hours</h3>
                  <p className="text-xs text-text-dark font-medium leading-relaxed">{CONTACT_INFO.hours}</p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Form Card (Right) */}
          <div className="lg:col-span-7">
            <Reveal direction="up" delay={0.3}>
              <div className="bg-white p-8 sm:p-12 rounded-3xl border border-brand-rose/10 shadow-sm">
                {submitted ? (
                  <div className="text-center py-12">
                    <span className="text-3xl mb-4 block">✉️</span>
                    <h3 className="font-serif text-xl font-bold text-brand-green mb-2">Message Sent!</h3>
                    <p className="text-xs text-text-light">We will respond to you within 24 hours.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-wider text-text-light mb-2 block">
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full px-4 py-3 rounded-xl bg-brand-beige border border-brand-rose/30 text-brand-green placeholder-text-light/50 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-wider text-text-light mb-2 block">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="john@example.com"
                        className="w-full px-4 py-3 rounded-xl bg-brand-beige border border-brand-rose/30 text-brand-green placeholder-text-light/50 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-wider text-text-light mb-2 block">
                        Message
                      </label>
                      <textarea
                        rows={5}
                        required
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        placeholder="How can we help you?"
                        className="w-full px-4 py-3 rounded-xl bg-brand-beige border border-brand-rose/30 text-brand-green placeholder-text-light/50 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green resize-none"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-xl bg-brand-green hover:bg-brand-green-hover text-brand-beige font-semibold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      Send Message
                    </button>
                  </form>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
