import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Scissors, Compass, Sparkles } from 'lucide-react';

export const PhilosophyPage: React.FC = () => {
  const pillars = [
    {
      icon: Scissors,
      title: 'Craftsmanship',
      description: 'Meticulous construction and an enduring attention to detail in every seam, rivet, and raw edge.',
    },
    {
      icon: Compass,
      title: 'Considered Design',
      description: 'Modern silhouettes with purpose and versatility, constructed to bring form to daily function.',
    },
    {
      icon: Sparkles,
      title: 'Made to Be Remembered',
      description: 'Signature pieces that transcend seasonal trends and age into personal heirlooms.',
    },
  ];

  return (
    <div className="bg-cream min-h-screen py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <div className="mb-8 text-xs tracking-wider uppercase text-charcoal/60">
          <Link to="/about" className="hover:text-navy">ABOUT</Link>
          <span className="mx-2">/</span>
          <span className="text-navy font-semibold">OUR PHILOSOPHY</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 rounded-3xl overflow-hidden shadow-lg border border-cream-dark/60">
          {/* Left Column: Textile / Tailoring Photography */}
          <div className="lg:col-span-5 bg-charcoal relative min-h-[380px] lg:min-h-[580px]">
            <img
              src="/assets/journal-denim.jpg"
              alt="Denim tailoring and precision stitching"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-navy/20 mix-blend-multiply" />
            <div className="absolute bottom-6 left-6 text-white text-xs tracking-widest uppercase bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full">
              ATELIER ARCHIVE • FW'26
            </div>
          </div>

          {/* Right Column: Deep Navy Philosophy Content */}
          <div className="lg:col-span-7 bg-navy p-8 sm:p-12 lg:p-16 text-white flex flex-col justify-center">
            <span className="text-xs uppercase tracking-[0.25em] text-cream/70 font-semibold block mb-3">
              THE ATELIER STANDARD
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-cream tracking-tight mb-10">
              THE NAMOH PHILOSOPHY
            </h1>

            <div className="space-y-8">
              {pillars.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: idx * 0.15 }}
                    className="flex items-start space-x-5"
                  >
                    <div className="p-2.5 rounded-lg bg-white/10 text-cream shrink-0 mt-0.5">
                      <Icon size={18} strokeWidth={1.75} />
                    </div>
                    <div>
                      <h3 className="font-serif text-lg sm:text-xl font-medium text-cream mb-1">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-cream/80 leading-relaxed font-light">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <div className="mt-12 pt-8 border-t border-white/10 flex flex-wrap gap-4">
              <Link
                to="/products"
                className="bg-cream hover:bg-white text-navy px-6 py-2.5 rounded-sm text-xs tracking-wider uppercase font-semibold transition-colors"
              >
                Explore The Edit →
              </Link>
              <Link
                to="/collections"
                className="border border-cream/50 hover:border-cream text-cream px-6 py-2.5 rounded-sm text-xs tracking-wider uppercase font-medium transition-colors"
              >
                View Capsules
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

