import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Scissors, Shield, Compass, Sparkles } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="bg-cream min-h-screen py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        {/* ======================= SECTION 1: HERO STORY (MATCHING IMAGE 3) ======================= */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column: Craftsmanship Image from Reference Image 3 */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative rounded-3xl overflow-hidden aspect-[4/3] md:aspect-[5/4] shadow-md border border-cream-dark/60 bg-cream-dark/20"
          >
            <img
              src="/assets/about-craftsmanship.jpg"
              alt="Tailoring denim with vintage lockstitch machinery"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md text-white text-[10px] tracking-widest uppercase px-3 py-1.5 rounded">
              PRECISION LOCKSTITCH • NAMOH ATELIER
            </div>
          </motion.div>

          {/* Right Column: Editorial Copy matching Image 3 */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col justify-center space-y-6 md:pl-6"
          >
            <div>
              <span className="text-[11px] uppercase tracking-[0.25em] text-charcoal/60 font-semibold block mb-2">
                ABOUT NAMOH
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-charcoal font-normal leading-[1.12]">
                Timeless Craft.
                <br />
                Modern Expression.
              </h1>
            </div>

            <p className="text-sm md:text-base text-charcoal/85 leading-relaxed font-light">
              NAMOH is a contemporary fashion label rooted in tailored craftsmanship, refined fabrics and thoughtful design.
            </p>

            <p className="text-xs sm:text-sm text-charcoal/70 leading-relaxed font-light">
              Founded on the belief that everyday wardrobe foundations deserve the architectural rigour of haute couture, we interrogate classic denim silhouettes through structured proportion, bespoke hardware, and meticulous seam engineering.
            </p>

            <div className="pt-2">
              <Link
                to="/about/philosophy"
                className="inline-flex items-center space-x-2 border border-charcoal/80 text-charcoal px-7 py-3 rounded text-xs tracking-[0.18em] uppercase font-semibold hover:bg-navy hover:border-navy hover:text-white transition-all duration-300 group shadow-sm"
              >
                <span>Our Story</span>
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </motion.div>
        </section>

        {/* ======================= SECTION 2: THE APPROACH TO DENIM ======================= */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="order-2 md:order-1 space-y-5 md:pr-6">
            <span className="text-[11px] uppercase tracking-[0.25em] text-charcoal/60 font-semibold block">
              MATERIAL INTEGRITY
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-charcoal font-normal">
              Structured Heavy Selvedge
            </h2>
            <p className="text-xs sm:text-sm text-charcoal/75 leading-relaxed font-light">
              Denim is typically treated as casual workwear. At NAMOH, it is treated as a sculptural canvas. We select high-density, ring-spun selvedge cotton woven with unyielding structural integrity.
            </p>
            <p className="text-xs sm:text-sm text-charcoal/75 leading-relaxed font-light">
              Rather than pre-distressing or artificial fading, each garment is delivered in its crisp, unadulterated state. As you wear our vests and tailored jackets, the rigid textile gradually molds to your movement, developing high-contrast patina unique to your life.
            </p>
            <div className="pt-3 border-t border-cream-dark/50 grid grid-cols-2 gap-4 text-xs text-charcoal">
              <div>
                <span className="font-semibold block text-[10px] uppercase tracking-wider text-charcoal/50">Yarn Composition</span>
                <span>100% Rigid Ring-Spun Cotton</span>
              </div>
              <div>
                <span className="font-semibold block text-[10px] uppercase tracking-wider text-charcoal/50">Weave Density</span>
                <span>13.5oz to 15oz Heavy Selvedge</span>
              </div>
            </div>
          </div>

          <div className="order-1 md:order-2 rounded-3xl overflow-hidden aspect-[4/3] shadow-md border border-cream-dark/60 bg-cream-dark/30">
            <img
              src="/assets/journal-denim.jpg"
              alt="Raw indigo selvedge textile close-up"
              className="w-full h-full object-cover"
            />
          </div>
        </section>

        {/* ======================= SECTION 3: CRAFTSMANSHIP & ATELIER VALUES ======================= */}
        <section className="bg-white/80 border border-cream-dark/60 rounded-3xl p-8 sm:p-14 shadow-sm">
          <div className="max-w-2xl mx-auto text-center mb-14">
            <span className="text-[10px] uppercase tracking-[0.3em] text-charcoal/60 font-semibold block mb-2">
              THE PILLARS OF NAMOH
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-charcoal font-normal">
              Tailoring Without Compromise
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-2.5">
              <div className="w-8 h-8 rounded-lg bg-navy/10 text-navy flex items-center justify-center">
                <Scissors size={18} />
              </div>
              <h3 className="font-serif text-lg text-charcoal font-medium">Pattern Precision</h3>
              <p className="text-xs text-charcoal/70 leading-relaxed font-light">
                Each silhouette is drafted from scratch to ensure standing collars maintain sharp form without restricting head movement.
              </p>
            </div>

            <div className="space-y-2.5">
              <div className="w-8 h-8 rounded-lg bg-navy/10 text-navy flex items-center justify-center">
                <Shield size={18} />
              </div>
              <h3 className="font-serif text-lg text-charcoal font-medium">Bespoke Hardware</h3>
              <p className="text-xs text-charcoal/70 leading-relaxed font-light">
                Solid brass custom-cast buttons and heavy-duty metal zips designed to withstand years of tension and daily wear.
              </p>
            </div>

            <div className="space-y-2.5">
              <div className="w-8 h-8 rounded-lg bg-navy/10 text-navy flex items-center justify-center">
                <Compass size={18} />
              </div>
              <h3 className="font-serif text-lg text-charcoal font-medium">Considered Form</h3>
              <p className="text-xs text-charcoal/70 leading-relaxed font-light">
                Clean boxy silhouettes engineered to layer effortlessly over fine knitwear or serve as a standalone statement piece.
              </p>
            </div>

            <div className="space-y-2.5">
              <div className="w-8 h-8 rounded-lg bg-navy/10 text-navy flex items-center justify-center">
                <Sparkles size={18} />
              </div>
              <h3 className="font-serif text-lg text-charcoal font-medium">Limited Batches</h3>
              <p className="text-xs text-charcoal/70 leading-relaxed font-light">
                Constructed in strictly controlled quantities to maintain exacting atelier quality control over every unit produced.
              </p>
            </div>
          </div>
        </section>

        {/* ======================= SECTION 4: CALL TO ACTION ======================= */}
        <section className="bg-navy text-white rounded-3xl p-10 sm:p-16 text-center shadow-lg">
          <span className="text-[10px] uppercase tracking-[0.3em] text-cream/70 font-semibold block mb-2">
            EXPERIENCE THE COLLECTION
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-cream font-normal max-w-xl mx-auto">
            Discover the FW'26 Silhouettes
          </h2>
          <p className="text-xs sm:text-sm text-cream/80 max-w-md mx-auto mt-3 font-light leading-relaxed">
            Reserve your structured denim piece during our temporary launch reservation window.
          </p>
          <div className="mt-8 flex justify-center space-x-4">
            <Link
              to="/products"
              className="bg-cream hover:bg-white text-navy px-8 py-3.5 rounded text-xs tracking-[0.18em] uppercase font-semibold transition-colors"
            >
              Shop The Pieces →
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};
