import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ProductCard } from '../components/product/ProductCard';
import { Product, ProductCategory } from '../types/product.types';
import * as productApi from '../api/product.api';

export const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');

  const categoryFilter = searchParams.get('category') as ProductCategory | null;

  useEffect(() => {
    const fetchCatalog = async () => {
      setLoading(true);
      try {
        const response = await productApi.getProducts();
        if (response.data) {
          setProducts(response.data);
        }
      } catch (err) {
        console.error('Failed to load catalog:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCatalog();
  }, []);

  const handleCategoryChange = (cat: string | null) => {
    if (!cat) {
      searchParams.delete('category');
    } else {
      searchParams.set('category', cat);
    }
    setSearchParams(searchParams);
  };

  let displayed = categoryFilter
    ? products.filter((p) => p.category === categoryFilter)
    : [...products];

  if (sortBy === 'price-asc') {
    displayed.sort((a, b) => Number(a.price) - Number(b.price));
  } else if (sortBy === 'price-desc') {
    displayed.sort((a, b) => Number(b.price) - Number(a.price));
  }

  return (
    <div className="bg-cream min-h-screen py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-cream-dark/60 pb-6 mb-10 gap-6">
          <div>
            <span className="text-[11px] uppercase tracking-[0.25em] text-charcoal/60 font-semibold block mb-1">
              THE FW'26 ATELIER ARCHIVE
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-charcoal font-normal">
              Catalogue of Pieces
            </h1>
            <p className="text-xs text-charcoal/70 mt-1 max-w-md font-light">
              Structured raw selvedge vests, boxy jackets, and tailored silhouettes crafted in numbered batches.
            </p>
          </div>

          {/* Controls: Category Filter + Sort Dropdown */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center space-x-2 text-xs tracking-wider">
              <button
                onClick={() => handleCategoryChange(null)}
                className={`px-4 py-1.5 rounded-full border transition-all ${
                  !categoryFilter
                    ? 'bg-navy text-white border-navy font-semibold shadow-sm'
                    : 'bg-white border-cream-dark text-charcoal hover:border-charcoal'
                }`}
              >
                All Pieces ({products.length})
              </button>
              <button
                onClick={() => handleCategoryChange('REGULAR')}
                className={`px-4 py-1.5 rounded-full border transition-all ${
                  categoryFilter === 'REGULAR'
                    ? 'bg-navy text-white border-navy font-semibold shadow-sm'
                    : 'bg-white border-cream-dark text-charcoal hover:border-charcoal'
                }`}
              >
                Core Denim
              </button>
              <button
                onClick={() => handleCategoryChange('LIMITED_EDITION')}
                className={`px-4 py-1.5 rounded-full border transition-all ${
                  categoryFilter === 'LIMITED_EDITION'
                    ? 'bg-burgundy text-white border-burgundy font-semibold shadow-sm'
                    : 'bg-white border-cream-dark text-charcoal hover:border-charcoal'
                }`}
              >
                Limited Edition
              </button>
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-white border border-cream-dark text-xs px-3 py-1.5 rounded-full outline-none text-charcoal font-medium cursor-pointer"
            >
              <option value="featured">Sort by: Curated</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="aspect-[3.2/4] bg-cream-dark/30 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : displayed.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayed.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white/60 rounded-2xl border border-cream-dark/50 max-w-md mx-auto p-8">
            <h3 className="font-serif text-xl text-charcoal font-medium">No Pieces In This Capsule</h3>
            <p className="text-xs text-charcoal/70 mt-2 leading-relaxed">
              We are finalizing construction for this category. Check back shortly or browse all available silhouettes.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
