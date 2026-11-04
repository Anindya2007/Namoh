import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Layers, Sparkles, Award } from 'lucide-react';

export const CollectionsPage: React.FC = () => {
  const collections = [
    {
      id: 'core',
      title: 'Core Collection',
      tag: 'PERMANENT ATELIER',
      image: '/assets/collection-core.jpg',
      category: 'REGULAR',
      headline: 'Architectural Daily Structure',
      description:
        'The foundation of NAMOH. Unwashed raw indigo denim tailored into minimalist stand-collar vests, boxy jackets, and structured silhouettes designed to develop individualized character over years of continuous wear.',
      features: ['14oz Deep Rope-Dyed Selvedge', 'Solid Brass Heavy-Gauge Zippers', 'Reinforced Bound Armholes'],
      pieces: '4 Available Silhouettes',
      icon: Layers,
    },
    {
      id: 'festive',
      title: 'Festive Edit',
      tag: 'OCCASION CAPSULE',
      image: '/assets/collection-festive.jpg',
      category: 'REGULAR',
      headline: 'Deep Burgundy & Heraldic Brass',
      description:
        'Rich, saturated wine and burgundy tailoring created for celebratory evenings and gallery openings. Heavy cotton twill paired with bespoke embossed heraldic buttons and peaked lapel proportions.',
      features: ['Custom Mill-Dyed Twill', 'Embossed Heraldic Cast Buttons', 'Silk-Blend Structural Inner Facing'],
      pieces: 'Curated Capsule',
      icon: Sparkles,
    },
    {
      id: 'limited',
      title: 'Limited Editions',
      tag: 'NUMBERED COLLECTOR CAPSULE',
      image: '/assets/collection-limited.jpg',
      category: 'LIMITED_EDITION',
      headline: 'Subtle Hues & Rarity',
      description:
        'Strictly limited, numbered production runs crafted from experimental washes and rare pastel denim weaves. Once the allocated fabric bolts are tailored, these silhouettes enter the permanent archive.',
      features: ['Individually Stamped Archive Number', 'Mineral-Washed Rose & Charcoal Selvedge', 'Numbered Certificate of Provenance'],
      pieces: 'Strictly 50 Units Worldwide',
      icon: Award,
    },
  ];

  return (
    <div className="bg-cream min-h-screen py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header matching Image 2 */}
        <div className="flex items-end justify-between border-b border-cream-dark/60 pb-6 mb-12 md:mb-16">
          <div>
            <span className="text-[11px] uppercase tracking-[0.25em] text-charcoal/60 font-semibold block mb-1">
              SEASONAL ARCHIVE
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-charcoal font-normal">
              Collections
            </h1>
          </div>
          <div className="text-right">
            <span className="font-serif text-lg md:text-xl text-charcoal font-medium">
              FW'26
            </span>
            <div className="w-20 h-[1.5px] bg-charcoal/80 mt-1 ml-auto" />
          </div>
        </div>

        {/* 3 Main Editorial Cards matching Image 2 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 mb-20">
          {collections.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: idx * 0.15 }}
                className="flex flex-col bg-white/70 backdrop-blur-sm rounded-3xl overflow-hidden border border-cream-dark/60 shadow-sm hover:shadow-xl transition-all duration-500"
              >
                {/* Visual Card Image matching Image 2 */}
                <Link
                  to={`/products?category=${item.category}`}
                  className="group block relative rounded-2xl overflow-hidden aspect-[3.2/4] bg-cream-dark/30 m-3"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 sm:p-7">
                    <span className="text-[9px] tracking-[0.25em] text-cream/70 uppercase font-semibold">
                      {item.tag}
                    </span>
                    <span className="font-serif text-2xl sm:text-3xl text-white font-normal group-hover:translate-x-1.5 transition-transform duration-300 inline-flex items-center gap-2 mt-1">
                      {item.title}
                      <span className="text-xl">→</span>
                    </span>
                  </div>
                </Link>

                {/* Detailed Capsule Specification */}
                <div className="p-6 pt-2 flex flex-col justify-between flex-grow">
                  <div>
                    <h3 className="font-serif text-lg text-charcoal font-medium mb-2">
                      {item.headline}
                    </h3>
                    <p className="text-xs text-charcoal/70 leading-relaxed font-light mb-5">
                      {item.description}
                    </p>

                    <div className="space-y-2 pt-3 border-t border-cream-dark/40 mb-6">
                      {item.features.map((f, i) => (
                        <div key={i} className="flex items-center space-x-2 text-[11px] text-charcoal/80">
                          <span className="w-1.5 h-1.5 rounded-full bg-navy/60" />
                          <span>{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-cream-dark/50 flex items-center justify-between">
                    <span className="text-[10px] tracking-wider uppercase font-semibold text-charcoal/50">
                      {item.pieces}
                    </span>
                    <Link
                      to={`/products?category=${item.category}`}
                      className="text-xs tracking-wider uppercase font-semibold text-navy hover:text-navy-dark inline-flex items-center gap-1.5"
                    >
                      <span>Shop Capsule</span>
                      <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Tailoring Standards Banner */}
        <div className="bg-navy text-cream rounded-3xl p-8 sm:p-14 text-center max-w-4xl mx-auto shadow-md">
          <span className="text-[10px] uppercase tracking-[0.3em] text-cream/70 font-semibold block mb-2">
            ATELIER BESPOKE SERVICE
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl text-cream font-normal">
            Bespoke Proportions & Private Sizing
          </h2>
          <p className="text-xs sm:text-sm text-cream/80 max-w-lg mx-auto mt-3 font-light leading-relaxed">
            Every NAMOH piece can be allocated for personal atelier measurements. Place a pre-order enquiry to request tailored alterations from our pattern master.
          </p>
          <div className="mt-6">
            <Link
              to="/products"
              className="bg-cream hover:bg-white text-navy px-8 py-3 rounded text-xs tracking-[0.2em] uppercase font-semibold transition-colors inline-block"
            >
              Browse All Pieces →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
