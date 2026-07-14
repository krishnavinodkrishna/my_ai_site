"use client";

import Image from "next/image";
import { HERO, VALUE_PROPS } from "@/content";
import { useLead } from "@/lead";
import { Reveal } from "./Reveal";
import { ImagePlaceholder } from "./Placeholders";

export function Hero() {
  const { openModal } = useLead();

  return (
    <section className="relative min-h-screen flex items-center pt-28 pb-16 overflow-hidden bg-brand-beige">
      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Content Column */}
        <div className="lg:col-span-6 flex flex-col justify-center z-10">
          <Reveal direction="up" delay={0.1}>
            <span className="text-xs font-bold tracking-widest text-text-light uppercase mb-3 block">
              {HERO.smallHeading}
            </span>
          </Reveal>

          <Reveal direction="up" delay={0.2}>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-brand-green leading-[1.1] mb-6">
              Discover Your <br />
              <span className="italic font-normal">Perfect Style.</span>
            </h1>
          </Reveal>

          <Reveal direction="up" delay={0.3}>
            <p className="text-text-light text-base md:text-lg mb-8 max-w-xl leading-relaxed">
              {HERO.description}
            </p>
          </Reveal>

          <Reveal direction="up" delay={0.4}>
            <div className="flex flex-wrap gap-4 mb-12">
              <button
                onClick={openModal}
                className="px-8 py-4 rounded-full font-semibold bg-brand-green text-brand-beige hover:bg-brand-green-hover transition-all duration-300 shadow-lg hover:shadow-brand-green/20 flex items-center gap-2 group cursor-pointer"
              >
                <span>{HERO.primaryCtaText}</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 group-hover:translate-x-1 transition-transform">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </button>
              <a
                href="#categories"
                className="px-8 py-4 rounded-full font-semibold border border-brand-green/20 text-brand-green hover:bg-brand-green/5 transition-colors duration-300 flex items-center justify-center"
              >
                {HERO.secondaryCtaText}
              </a>
            </div>
          </Reveal>

          {/* Trust Badges */}
          <Reveal direction="up" delay={0.5}>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-brand-rose/30">
              {VALUE_PROPS.map((item) => (
                <div key={item.title} className="flex flex-col items-start">
                  <div className="w-10 h-10 rounded-full bg-brand-rose-light flex items-center justify-center text-lg mb-2 shadow-sm">
                    {item.icon}
                  </div>
                  <h4 className="text-xs font-bold text-brand-green mb-0.5">{item.title}</h4>
                  <p className="text-[10px] text-text-light leading-tight">{item.description.replace(/orders above \$75|30-day/g, "")}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Right Graphic/Image Column */}
        <div className="lg:col-span-6 relative flex justify-center lg:justify-end items-center h-full min-h-[500px] lg:min-h-[600px] z-0">
          {/* Pastel Rose Backdrop Graphic */}
          <div className="absolute top-1/2 left-1/2 lg:left-2/3 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[450px] lg:w-[480px] h-[500px] sm:h-[600px] rounded-[180px] bg-brand-rose/65 rotate-6 pointer-events-none -z-10" />

          {/* Model Portrait Image */}
          <div className="relative w-[280px] sm:w-[350px] lg:w-[380px] h-[400px] sm:h-[500px] lg:h-[540px] rounded-[150px] overflow-hidden border-8 border-brand-beige shadow-2xl z-10 transition-transform hover:scale-[1.01] duration-500">
            <Image
              src="/images/hero_model.jpg"
              alt="MAX fashion model"
              fill
              priority
              className="object-cover"
              sizes="(max-w-768px) 350px, 380px"
            />
          </div>

          {/* Floating Product Card */}
          <div className="absolute bottom-10 left-0 lg:left-10 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-zinc-100/50 flex flex-col w-[180px] z-20 hover:-translate-y-1 transition-transform duration-300">
            <div className="relative h-28 bg-brand-beige rounded-xl overflow-hidden mb-3">
              <ImagePlaceholder type="handbag" className="w-full h-full object-contain p-2" />
              <button className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white flex items-center justify-center text-zinc-400 hover:text-red-500 shadow transition-colors cursor-pointer">
                ♥
              </button>
            </div>
            <h5 className="text-xs font-bold text-zinc-800 leading-tight">Luxe Handbag</h5>
            <span className="text-xs text-zinc-500 font-medium mb-2">$129.00</span>
            <button
              onClick={openModal}
              className="w-full py-2 rounded-lg bg-brand-green hover:bg-brand-green-hover text-brand-beige text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer"
            >
              Add to Cart
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}

export default Hero;
