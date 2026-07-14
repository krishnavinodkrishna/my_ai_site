"use client";

import { ABOUT_CONTENT } from "@/content";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";

export default function AboutPage() {
  return (
    <div className="relative min-h-screen bg-brand-beige text-brand-green selection:bg-brand-green selection:text-brand-beige">
      <Navbar />
      
      <main className="pt-32 pb-24">
        {/* About Hero Section */}
        <section className="max-w-4xl mx-auto px-6 text-center mb-20">
          <Reveal direction="up" delay={0.1}>
            <span className="text-[10px] font-bold tracking-widest text-text-light uppercase mb-2 block">
              Our Story
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-brand-green leading-[1.1] mb-6">
              {ABOUT_CONTENT.title}
            </h1>
          </Reveal>

          <Reveal direction="up" delay={0.2}>
            <p className="text-lg md:text-xl font-light text-text-dark mb-6 max-w-2xl mx-auto leading-relaxed">
              {ABOUT_CONTENT.intro}
            </p>
          </Reveal>

          <Reveal direction="up" delay={0.3}>
            <p className="text-sm text-text-light max-w-xl mx-auto leading-relaxed">
              {ABOUT_CONTENT.missionStatement}
            </p>
          </Reveal>
        </section>

        {/* Vision & Mission Split Section */}
        <section className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Vision card */}
          <Reveal direction="up" delay={0.4}>
            <div className="bg-brand-rose/40 rounded-3xl p-8 sm:p-12 h-full flex flex-col justify-between border border-brand-rose/10 shadow-sm">
              <div>
                <span className="text-2xl mb-4 block">👁️‍🗨️</span>
                <h2 className="font-serif text-2xl font-semibold text-brand-green mb-4">
                  {ABOUT_CONTENT.visionTitle}
                </h2>
                <p className="text-sm text-text-dark leading-relaxed">
                  {ABOUT_CONTENT.visionText}
                </p>
              </div>
            </div>
          </Reveal>

          {/* Mission card */}
          <Reveal direction="up" delay={0.5}>
            <div className="bg-brand-rose/40 rounded-3xl p-8 sm:p-12 h-full flex flex-col justify-between border border-brand-rose/10 shadow-sm">
              <div>
                <span className="text-2xl mb-4 block">🚀</span>
                <h2 className="font-serif text-2xl font-semibold text-brand-green mb-4">
                  {ABOUT_CONTENT.missionTitle}
                </h2>
                <p className="text-sm text-text-dark leading-relaxed">
                  {ABOUT_CONTENT.missionText}
                </p>
              </div>
            </div>
          </Reveal>
        </section>
      </main>

      <Footer />
    </div>
  );
}
