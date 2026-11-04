import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ProductCard } from '../components/product/ProductCard';
import { Product, ProductCategory } from '../types/product.types';
import * as productApi from '../api/product.api';
import { Sparkles, Scissors, ShieldCheck, ArrowRight } from 'lucide-react';

export const LandingPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedFilter, setSelectedFilter] = useState<'ALL' | ProductCategory>('ALL');

  useEffect(() => {
    const fetchCatalog = async () => {
      try {
        const response = await productApi.getProducts();
        if (response.data) {
          setProducts(response.data);
        }
      } catch (err) {
        console.error('Failed to load products:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCatalog();
  }, []);

  const filteredProducts =
    selectedFilter === 'ALL'
      ? products
      : products.filter((p) => p.category === selectedFilter);

  return (
    <div className="bg-cream min-h-screen">
      {/* ======================= 1. HERO SECTION (MATCHING IMAGE 1 REFERENCE) ======================= */}
      <section className="relative bg-navy text-white overflow-hidden min-h-[600px] md:min-h-[700px] flex items-center">
        {/* Background Large Serif Watermark "NAMOH" */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
          <span className="font-serif text-[20vw] font-light text-cream/10 tracking-[0.2em] uppercase transform translate-y-4">
            NAMOH
          </span>
        </div>

        {/* Central Model Image */}
        <div className="absolute inset-0 flex items-end justify-center pointer-events-none z-10">
          <motion.img
            initial={{ opacity: 0, scale: 0.96, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            src="/assets/hero-model.jpg"
            alt="NAMOH FW'26 Model in Tailored Denim Vest"
            className="h-[88%] md:h-[96%] max-h-[660px] object-contain object-bottom filter drop-shadow-[0_25px_35px_rgba(0,0,0,0.6)]"
          />
        </div>

        {/* Left Editorial Copy Overlay */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20 md:py-28">
          <div className="max-w-md">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.15, ease: 'easeOut' }}
            >
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-cream/70 font-semibold block mb-3">
                FW'26 CAPSULE DEBUT
              </span>
              <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight text-cream leading-[1.08]">
                DENIM
                <br />
                REIMAGINED
              </h1>
              <p className="mt-4 text-xs sm:text-sm text-cream/80 tracking-wide font-light max-w-sm leading-relaxed">
                A new take on everyday structure. Architectural tailoring cut from heavy raw selvedge, crafted to transcend seasonal ephemera.
              </p>

              <div className="mt-8 flex items-center space-x-4">
                <Link
                  to="/products"
                  className="inline-flex items-center space-x-2 border border-cream/80 hover:border-cream bg-cream/10 hover:bg-cream text-cream hover:text-navy px-6 py-3.5 text-xs tracking-[0.18em] uppercase font-semibold transition-all duration-300 rounded-sm group shadow-sm"
                >
                  <span>SHOP THE EDIT</span>
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </Link>
                <Link
                  to="/about"
                  className="hidden sm:inline-flex items-center text-xs tracking-[0.18em] uppercase text-cream/70 hover:text-cream font-medium transition-colors"
                >
                  THE ATELIER STORY
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Right Diagonal Slice with FW'26 Label */}
        <div className="absolute bottom-0 right-0 z-20 pointer-events-none">
          <div
            className="w-48 sm:w-72 md:w-96 h-36 sm:h-48 md:h-60 bg-cream"
            style={{
              clipPath: 'polygon(100% 0, 100% 100%, 0 100%)',
            }}
          />
          <div className="absolute bottom-5 sm:bottom-7 right-5 sm:right-9 text-right pointer-events-auto">
            <span className="block font-serif text-lg sm:text-xl text-charcoal font-medium">
              FW'26
            </span>
            <div className="w-14 h-[1.5px] bg-charcoal/70 my-1 ml-auto" />
            <span className="block text-[10px] sm:text-[11px] tracking-[0.24em] text-charcoal/80 uppercase font-semibold">
              COLLECTION
            </span>
          </div>
        </div>
      </section>

      {/* ======================= 2. RUNNING ATELIER MARQUEE RIBBON ======================= */}
      <div className="bg-charcoal text-cream py-3 border-y border-charcoal/20 overflow-hidden whitespace-nowrap">
        <div className="animate-marquee flex items-center space-x-12 text-[10px] tracking-[0.3em] uppercase font-medium">
          <span>• RAW JAPANESE SELVEDGE</span>
          <span>• ARCHITECTURAL TAILORING</span>
          <span>• BESPOKE BRASS HARDWARE</span>
          <span>• FW'26 EXCLUSIVE CAPSULE</span>
          <span>• NUMBERED LIMITED EDITIONS</span>
          <span>• CONTEMPORARY MINIMALISM</span>
          <span>• RAW JAPANESE SELVEDGE</span>
          <span>• ARCHITECTURAL TAILORING</span>
          <span>• BESPOKE BRASS HARDWARE</span>
          <span>• FW'26 EXCLUSIVE CAPSULE</span>
          <span>• NUMBERED LIMITED EDITIONS</span>
          <span>• CONTEMPORARY MINIMALISM</span>
        </div>
      </div>

      {/* ======================= 3. FEATURED PIECES (DATABASE PRODUCTS) ======================= */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-cream-dark/60 gap-4">
          <div>
            <span className="text-[11px] uppercase tracking-[0.24em] text-charcoal/60 font-semibold block mb-1">
              THE ATELIER CATALOGUE
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-charcoal font-normal">
              Signature Silhouettes
            </h2>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center space-x-2 text-xs tracking-wider">
            <button
              onClick={() => setSelectedFilter('ALL')}
              className={`px-4 py-1.5 rounded-full border transition-all ${
                selectedFilter === 'ALL'
                  ? 'bg-navy text-white border-navy font-semibold'
                  : 'bg-white/80 border-cream-dark text-charcoal/80 hover:border-charcoal'
              }`}
            >
              All Pieces ({products.length})
            </button>
            <button
              onClick={() => setSelectedFilter('REGULAR')}
              className={`px-4 py-1.5 rounded-full border transition-all ${
                selectedFilter === 'REGULAR'
                  ? 'bg-navy text-white border-navy font-semibold'
                  : 'bg-white/80 border-cream-dark text-charcoal/80 hover:border-charcoal'
              }`}
            >
              Core Collection
            </button>
            <button
              onClick={() => setSelectedFilter('LIMITED_EDITION')}
              className={`px-4 py-1.5 rounded-full border transition-all ${
                selectedFilter === 'LIMITED_EDITION'
                  ? 'bg-burgundy text-white border-burgundy font-semibold'
                  : 'bg-white/80 border-cream-dark text-charcoal/80 hover:border-charcoal'
              }`}
            >
              Limited Editions
            </button>
          </div>
        </div>

        {/* Dynamic Product Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="aspect-[3.2/4] bg-cream-dark/30 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 lg:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        <div className="mt-14 text-center">
          <Link
            to="/products"
            className="inline-flex items-center space-x-2 border border-charcoal/80 text-charcoal hover:bg-navy hover:border-navy hover:text-white px-8 py-3.5 rounded-sm text-xs tracking-[0.2em] uppercase font-semibold transition-all duration-300 group shadow-sm"
          >
            <span>Explore Complete Catalogue</span>
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </section>

      {/* ======================= 4. CURATED COLLECTIONS (MATCHING IMAGE 2) ======================= */}
      <section className="py-20 bg-cream-light/70 border-y border-cream-dark/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10 pb-4 border-b border-cream-dark/50">
            <div>
              <span className="text-[11px] uppercase tracking-[0.24em] text-charcoal/60 font-semibold block mb-1">
                SEASONAL RELEASES
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-charcoal font-normal">
                Curated Capsules
              </h2>
            </div>
            <Link
              to="/collections"
              className="text-xs uppercase tracking-[0.18em] text-navy font-semibold hover:underline flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight size={13} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            <Link
              to="/collections"
              className="group relative rounded-2xl overflow-hidden aspect-[3.2/4] bg-cream-dark/30 border border-cream-dark/60 shadow-sm"
            >
              <img
                src="/assets/collection-core.jpg"
                alt="Core Denim Capsule"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent flex flex-col justify-end p-6 sm:p-8">
                <span className="text-[10px] tracking-[0.25em] text-cream/70 uppercase font-medium">
                  PERMANENT ATELIER
                </span>
                <span className="font-serif text-2xl text-white font-normal mt-1 group-hover:translate-x-1 transition-transform inline-flex items-center gap-2">
                  Core Collection <span>→</span>
                </span>
              </div>
            </Link>

            <Link
              to="/collections"
              className="group relative rounded-2xl overflow-hidden aspect-[3.2/4] bg-cream-dark/30 border border-cream-dark/60 shadow-sm"
            >
              <img
                src="/assets/collection-festive.jpg"
                alt="Festive Burgundy Edit"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent flex flex-col justify-end p-6 sm:p-8">
                <span className="text-[10px] tracking-[0.25em] text-cream/70 uppercase font-medium">
                  ORNATE OCCASION
                </span>
                <span className="font-serif text-2xl text-white font-normal mt-1 group-hover:translate-x-1 transition-transform inline-flex items-center gap-2">
                  Festive Edit <span>→</span>
                </span>
              </div>
            </Link>

            <Link
              to="/collections"
              className="group relative rounded-2xl overflow-hidden aspect-[3.2/4] bg-cream-dark/30 border border-cream-dark/60 shadow-sm"
            >
              <img
                src="/assets/collection-limited.jpg"
                alt="Limited Editions Tailoring"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent flex flex-col justify-end p-6 sm:p-8">
                <span className="text-[10px] tracking-[0.25em] text-cream/70 uppercase font-medium">
                  NUMBERED RUNS
                </span>
                <span className="font-serif text-2xl text-white font-normal mt-1 group-hover:translate-x-1 transition-transform inline-flex items-center gap-2">
                  Limited Editions <span>→</span>
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ======================= 5. BRAND CRAFTSMANSHIP SPREAD (IMAGE 3) ======================= */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Craftsmanship Image */}
          <div className="relative rounded-2xl overflow-hidden aspect-[5/4] shadow-md border border-cream-dark/60 bg-cream-dark/20">
            <img
              src="/assets/about-craftsmanship.jpg"
              alt="Vintage sewing machine stitching heavy denim"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md text-white text-[10px] tracking-widest uppercase px-3 py-1.5 rounded">
              ATELIER TAILORING WORKSHOP
            </div>
          </div>

          {/* Right Brand Story Copy */}
          <div className="space-y-6 md:pl-4">
            <span className="text-[11px] uppercase tracking-[0.25em] text-charcoal/60 font-semibold block">
              ABOUT NAMOH
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-charcoal font-normal leading-[1.12]">
              Timeless Craft.
              <br />
              Modern Expression.
            </h2>
            <p className="text-sm text-charcoal/85 leading-relaxed font-light">
              NAMOH is a contemporary fashion label rooted in tailored craftsmanship, refined fabrics and thoughtful design.
            </p>
            <p className="text-xs sm:text-sm text-charcoal/70 leading-relaxed font-light">
              Our designs bridge the utilitarian permanence of structured workwear with the clean lines of European tailoring. Every cut is engineered to enhance the natural drape of heavy selvedge, ensuring each garment shapes itself to its wearer over years of ownership.
            </p>

            <div className="pt-2">
              <Link
                to="/about"
                className="inline-flex items-center space-x-2 border border-charcoal text-charcoal hover:bg-navy hover:border-navy hover:text-white px-7 py-3 rounded text-xs tracking-[0.18em] uppercase font-semibold transition-all duration-300 group shadow-sm"
              >
                <span>Our Story</span>
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ======================= 6. THE NAMOH PHILOSOPHY (SECTION 4) ======================= */}
      <section className="py-20 bg-navy text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[10px] uppercase tracking-[0.3em] text-cream/70 font-semibold block mb-2">
              ATELIER ETHOS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-cream">
              THE NAMOH PHILOSOPHY
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            <div className="bg-white/5 border border-white/10 p-8 rounded-2xl">
              <div className="w-10 h-10 rounded-lg bg-cream/10 text-cream flex items-center justify-center mb-5">
                <Scissors size={20} />
              </div>
              <h3 className="font-serif text-xl text-cream font-medium mb-2.5">
                Craftsmanship
              </h3>
              <p className="text-xs sm:text-sm text-cream/75 leading-relaxed font-light">
                Meticulous construction and an enduring attention to detail in every single seam, raw edge, and custom hardware setting.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 p-8 rounded-2xl">
              <div className="w-10 h-10 rounded-lg bg-cream/10 text-cream flex items-center justify-center mb-5">
                <Sparkles size={20} />
              </div>
              <h3 className="font-serif text-xl text-cream font-medium mb-2.5">
                Considered Design
              </h3>
              <p className="text-xs sm:text-sm text-cream/75 leading-relaxed font-light">
                Modern silhouettes crafted with purpose and architectural versatility, balancing structure with daily ease.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 p-8 rounded-2xl">
              <div className="w-10 h-10 rounded-lg bg-cream/10 text-cream flex items-center justify-center mb-5">
                <ShieldCheck size={20} />
              </div>
              <h3 className="font-serif text-xl text-cream font-medium mb-2.5">
                Made to Be Remembered
              </h3>
              <p className="text-xs sm:text-sm text-cream/75 leading-relaxed font-light">
                Signature pieces engineered to transcend temporary trends, developing unique patina and character with age.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ======================= 7. ATELIER JOURNAL PREVIEW (IMAGE 4) ======================= */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10 pb-4 border-b border-cream-dark/50">
          <div>
            <span className="text-[11px] uppercase tracking-[0.24em] text-charcoal/60 font-semibold block mb-1">
              THE NOTEBOOK
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-charcoal font-normal">
              Journal & Stories
            </h2>
          </div>
          <Link
            to="/journal"
            className="text-xs uppercase tracking-[0.18em] text-navy font-semibold hover:underline flex items-center gap-1"
          >
            <span>View All Stories</span>
            <ArrowRight size={13} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          <article className="bg-white/80 rounded-2xl overflow-hidden border border-cream-dark/50 shadow-sm flex flex-col group">
            <div className="aspect-[16/10] overflow-hidden bg-cream-dark/30">
              <img
                src="/assets/journal-denim.jpg"
                alt="The Art of Denim in Modern Tailoring"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>
            <div className="p-6 flex flex-col justify-between flex-grow">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-charcoal/50 font-semibold block mb-1.5">
                  DESIGN • OCT 20, 2026
                </span>
                <h3 className="font-serif text-lg font-medium text-charcoal group-hover:text-navy transition-colors">
                  The Art of Denim in Modern Tailoring
                </h3>
              </div>
              <div className="mt-4 pt-3 border-t border-cream-dark/40">
                <Link
                  to="/journal"
                  className="text-xs text-navy font-semibold inline-flex items-center gap-1"
                >
                  Read Story →
                </Link>
              </div>
            </div>
          </article>

          <article className="bg-white/80 rounded-2xl overflow-hidden border border-cream-dark/50 shadow-sm flex flex-col group">
            <div className="aspect-[16/10] overflow-hidden bg-cream-dark/30">
              <img
                src="/assets/journal-spool.jpg"
                alt="Inside the FW'26 Collection"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>
            <div className="p-6 flex flex-col justify-between flex-grow">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-charcoal/50 font-semibold block mb-1.5">
                  COLLECTIONS • OCT 12, 2026
                </span>
                <h3 className="font-serif text-lg font-medium text-charcoal group-hover:text-navy transition-colors">
                  Inside the FW'26 Collection
                </h3>
              </div>
              <div className="mt-4 pt-3 border-t border-cream-dark/40">
                <Link
                  to="/journal"
                  className="text-xs text-navy font-semibold inline-flex items-center gap-1"
                >
                  Read Story →
                </Link>
              </div>
            </div>
          </article>

          <article className="bg-white/80 rounded-2xl overflow-hidden border border-cream-dark/50 shadow-sm flex flex-col group">
            <div className="aspect-[16/10] overflow-hidden bg-cream-dark/30">
              <img
                src="/assets/journal-mannequin.jpg"
                alt="Craftsmanship at NAMOH"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>
            <div className="p-6 flex flex-col justify-between flex-grow">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-charcoal/50 font-semibold block mb-1.5">
                  BEHIND THE SCENES • OCT 05, 2026
                </span>
                <h3 className="font-serif text-lg font-medium text-charcoal group-hover:text-navy transition-colors">
                  Craftsmanship at NAMOH
                </h3>
              </div>
              <div className="mt-4 pt-3 border-t border-cream-dark/40">
                <Link
                  to="/journal"
                  className="text-xs text-navy font-semibold inline-flex items-center gap-1"
                >
                  Read Story →
                </Link>
              </div>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
};
