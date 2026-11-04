import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Calendar, ArrowRight, X } from 'lucide-react';

interface Article {
  id: number;
  title: string;
  date: string;
  category: 'Design' | 'Collections' | 'Behind the Scenes';
  image: string;
  readTime: string;
  excerpt: string;
  content: string[];
}

export const JournalPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'All' | 'Design' | 'Collections' | 'Behind the Scenes'>('All');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const articles: Article[] = [
    {
      id: 1,
      title: 'The Art of Denim in Modern Tailoring',
      date: 'Oct 20, 2026',
      category: 'Design',
      image: '/assets/journal-denim.jpg',
      readTime: '4 min read',
      excerpt:
        'How we adapt industrial raw selvedge into architectural vests and structured suiting without compromising utilitarian durability.',
      content: [
        'Denim has historically occupied a dual existence in fashion: on one hand, the quintessential uniform of heavy labour; on the other, an icon of subcultural rebellion. At NAMOH, our inquiry begins at a different vantage point: what happens when denim is given the exact anatomical consideration as bespoke tailoring?',
        'By utilizing 14.5oz unwashed ring-spun selvedge, we eliminate artificial softening baths. The textile retains its rigid architectural tension. In creating our signature stand collar vest, the shoulder line is pitched slightly forward, countering the stiffness of the cotton and framing the neckline with razor-sharp geometry.',
        'The result is a silhouette that does not merely hang upon the body, but asserts its own sculptural form.',
      ],
    },
    {
      id: 2,
      title: "Inside the FW'26 Collection",
      date: 'Oct 12, 2026',
      category: 'Collections',
      image: '/assets/journal-spool.jpg',
      readTime: '6 min read',
      excerpt:
        'A preview into the custom dyed spools, bespoke brass buttons, and tailored jackets that define our autumn-winter atelier capsule.',
      content: [
        'Every collection at NAMOH begins with the raw elements: spools of high-tenacity thread, custom-cast zinc and copper hardware, and bolts of deep rope-dyed twill.',
        'For FW\'26, our color palette expands into saturated burgundies and nuanced mineral charcoals. The standout Festive Edit blazer utilizes bespoke cast heraldic buttons finished in antique gold, contrasting against the matte texture of mill-dyed heavy cotton.',
        'This season reinforces our commitment to capsule permanency. None of these pieces are designed for a single season; they are constructed as lasting fixtures for a discerning collector’s wardrobe.',
      ],
    },
    {
      id: 3,
      title: 'Craftsmanship at NAMOH',
      date: 'Oct 05, 2026',
      category: 'Behind the Scenes',
      image: '/assets/journal-mannequin.jpg',
      readTime: '5 min read',
      excerpt:
        'From canvas drafting to final hand finish: a step-by-step tour through our atelier workshop and pattern-making protocols.',
      content: [
        'Before a single piece of denim is cut, the pattern undergoes rigorous drafting on traditional tailor\'s mannequins. Adjusting a dart by three millimeters alters the way heavy denim drapes across the chest and back.',
        'In our atelier, seam allowances are generously proportioned and fully bound with tonal cotton tape. Raw denim tends to fray under stress; our interior binding ensures that the inside of the garment is as pristine and immaculate as the exterior.',
        'Every zipper is individually measured, pinned by hand, and secured with dual rows of lockstitching to guarantee smooth glide and perpetual durability.',
      ],
    },
  ];

  const featuredArticle = articles[0];

  const filteredArticles =
    activeFilter === 'All'
      ? articles
      : articles.filter((a) => a.category === activeFilter);

  const filters: Array<'All' | 'Design' | 'Collections' | 'Behind the Scenes'> = [
    'All',
    'Design',
    'Collections',
    'Behind the Scenes',
  ];

  return (
    <div className="bg-cream min-h-screen py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* ======================= FEATURED COVER STORY ======================= */}
        <section className="bg-white/70 backdrop-blur-sm border border-cream-dark/60 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            <div className="lg:col-span-7 aspect-[16/10] lg:aspect-auto lg:h-[450px] overflow-hidden bg-cream-dark/30">
              <img
                src={featuredArticle.image}
                alt={featuredArticle.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="lg:col-span-5 p-8 sm:p-12 space-y-4">
              <div className="flex items-center space-x-3 text-[10px] tracking-[0.25em] uppercase font-semibold text-charcoal/60">
                <span className="bg-navy text-white px-2.5 py-0.5 rounded">FEATURED ATELIER STORY</span>
                <span>{featuredArticle.readTime}</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-charcoal font-normal leading-tight">
                {featuredArticle.title}
              </h2>
              <p className="text-xs sm:text-sm text-charcoal/70 leading-relaxed font-light">
                {featuredArticle.excerpt}
              </p>
              <div className="pt-4 flex items-center justify-between border-t border-cream-dark/50">
                <span className="text-xs text-charcoal/60">{featuredArticle.date}</span>
                <button
                  onClick={() => setSelectedArticle(featuredArticle)}
                  className="text-xs uppercase tracking-wider font-semibold text-navy hover:underline inline-flex items-center gap-1.5"
                >
                  <span>Read Full Story</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ======================= JOURNAL FILTER & GRID (IMAGE 4) ======================= */}
        <section>
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-cream-dark/60 pb-6 mb-12 gap-6">
            <div>
              <span className="text-[11px] uppercase tracking-[0.25em] text-charcoal/60 font-semibold block mb-1">
                DISPATCHES FROM THE ATELIER
              </span>
              <h1 className="font-serif text-4xl sm:text-5xl text-charcoal font-normal">
                Journal
              </h1>
            </div>

            {/* Filter Categories matching Image 4 */}
            <div className="flex items-center space-x-6 overflow-x-auto pb-1 text-xs tracking-wider">
              {filters.map((filter) => {
                const isActive = activeFilter === filter;
                return (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`transition-colors whitespace-nowrap pb-1 relative font-medium ${
                      isActive
                        ? 'text-charcoal font-semibold'
                        : 'text-charcoal/60 hover:text-charcoal'
                    }`}
                  >
                    {filter}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-charcoal" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Article Cards Grid matching Image 4 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredArticles.map((article, idx) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                onClick={() => setSelectedArticle(article)}
                className="bg-white/80 rounded-2xl overflow-hidden border border-cream-dark/60 shadow-sm hover:shadow-lg transition-all group cursor-pointer flex flex-col"
              >
                <div className="aspect-[16/10] overflow-hidden bg-cream-dark/30">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>

                <div className="p-6 sm:p-7 flex flex-col justify-between flex-grow">
                  <div>
                    <div className="flex items-center justify-between text-[10px] text-charcoal/50 uppercase tracking-widest mb-2 font-medium">
                      <span>{article.category}</span>
                      <span>{article.readTime}</span>
                    </div>
                    <h3 className="font-serif text-lg sm:text-xl font-medium text-charcoal group-hover:text-navy transition-colors leading-snug">
                      {article.title}
                    </h3>
                    <p className="text-xs text-charcoal/70 mt-2 font-light leading-relaxed line-clamp-2">
                      {article.excerpt}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-cream-dark/50 flex items-center justify-between text-xs text-charcoal/60">
                    <span>{article.date}</span>
                    <span className="text-navy font-semibold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                      <span>Read Story</span>
                      <ArrowRight size={13} />
                    </span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </section>
      </div>

      {/* ======================= ARTICLE READING MODAL ======================= */}
      <AnimatePresence>
        {selectedArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-cream border border-cream-dark max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-3xl p-6 sm:p-10 shadow-2xl relative text-charcoal"
            >
              <button
                onClick={() => setSelectedArticle(null)}
                className="absolute top-5 right-5 text-charcoal/60 hover:text-charcoal p-1"
                aria-label="Close article"
              >
                <X size={20} />
              </button>

              <div className="space-y-4">
                <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-navy">
                  {selectedArticle.category} • {selectedArticle.date}
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl text-charcoal font-normal leading-tight">
                  {selectedArticle.title}
                </h2>

                <div className="aspect-[16/9] rounded-2xl overflow-hidden bg-cream-dark/30 my-6">
                  <img
                    src={selectedArticle.image}
                    alt={selectedArticle.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="space-y-4 text-xs sm:text-sm text-charcoal/80 font-light leading-relaxed">
                  {selectedArticle.content.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>

                <div className="pt-6 border-t border-cream-dark/60 flex justify-between items-center text-xs">
                  <span className="text-charcoal/50">NAMOH Atelier Dispatches</span>
                  <button
                    onClick={() => setSelectedArticle(null)}
                    className="bg-navy text-white px-5 py-2 rounded-lg font-medium text-xs uppercase tracking-wider"
                  >
                    Close Story
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
