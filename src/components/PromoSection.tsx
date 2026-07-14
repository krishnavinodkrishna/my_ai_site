"use client";

import { FEATURED_OFFER } from "@/content";
import { useLead } from "@/lead";
import { Reveal } from "./Reveal";
import { ImagePlaceholder } from "./Placeholders";

export function PromoSection() {
  const { openModal } = useLead();

  return (
    <section className="py-16 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal direction="up" delay={0.1}>
          <div className="relative rounded-3xl bg-brand-green text-brand-beige grid grid-cols-1 lg:grid-cols-12 overflow-hidden shadow-xl min-h-[380px] items-center">
            
            {/* Left Content Area */}
            <div className="lg:col-span-6 p-8 sm:p-12 z-10">
              <span className="text-[10px] font-bold uppercase tracking-wider text-brand-rose opacity-90 mb-2 block">
                LIMITED TIME OFFER
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white mb-4 leading-tight">
                {FEATURED_OFFER.title}
              </h2>
              <p className="text-sm text-brand-beige/80 mb-8 max-w-sm">
                {FEATURED_OFFER.description}
              </p>
              <button
                onClick={openModal}
                className="px-6 py-3 rounded-full font-semibold text-xs uppercase tracking-wider bg-brand-rose text-brand-green hover:bg-brand-rose/90 transition-colors cursor-pointer"
              >
                {FEATURED_OFFER.ctaText}
              </button>
            </div>

            {/* Middle Promo Circle Sticker */}
            <div className="absolute top-1/2 left-1/2 lg:left-[55%] -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full bg-brand-rose text-brand-green flex flex-col items-center justify-center text-center shadow-lg border-4 border-brand-green rotate-[-12deg] z-20 pointer-events-none scale-90 sm:scale-100">
              <span className="text-[10px] font-bold uppercase tracking-widest leading-none">UP TO</span>
              <span className="text-2xl font-extrabold leading-none my-1">50%</span>
              <span className="text-[10px] font-bold uppercase tracking-widest leading-none">OFF</span>
            </div>

            {/* Right overlapping accessories layout */}
            <div className="lg:col-span-6 relative w-full h-full min-h-[300px] lg:min-h-0 flex items-center justify-center bg-brand-green-hover/20">
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-green-hover to-transparent pointer-events-none -z-10" />
              
              {/* Accessory layouts overlay */}
              <div className="relative w-full max-w-[360px] h-[260px] flex items-center justify-center">
                {/* Handbag */}
                <div className="absolute left-6 bottom-4 w-36 h-36 bg-white/5 rounded-2xl border border-white/10 shadow-xl backdrop-blur-sm p-3 rotate-[-6deg] hover:rotate-0 transition-transform duration-300">
                  <ImagePlaceholder type="handbag" className="w-full h-full object-contain" />
                </div>
                {/* Watch */}
                <div className="absolute right-6 top-4 w-32 h-32 bg-white/5 rounded-2xl border border-white/10 shadow-xl backdrop-blur-sm p-3 rotate-[12deg] hover:rotate-0 transition-transform duration-300">
                  <ImagePlaceholder type="watch" className="w-full h-full object-contain" />
                </div>
                {/* Sunglasses */}
                <div className="absolute left-[38%] top-[25%] w-28 h-28 bg-white/5 rounded-2xl border border-white/10 shadow-xl backdrop-blur-sm p-3 rotate-[-15deg] hover:rotate-0 transition-transform duration-300">
                  <ImagePlaceholder type="accessories" className="w-full h-full object-contain" />
                </div>
              </div>

            </div>

          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default PromoSection;
