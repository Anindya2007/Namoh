import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { Product } from '../../types/product.types';
import { useWishlist } from '../../context/WishlistContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const wishlisted = isInWishlist(product.id);

  const formatPrice = (price: number | string) => {
    const num = typeof price === 'string' ? parseFloat(price) : price;
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(num);
  };

  const imageSrc =
    product.imageUrl ||
    'https://ik.imagekit.io/apib5ajwo/Dark%20Blue%20Denim?updatedAt=1793770944599';

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (wishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const isLimited = product.category === 'LIMITED_EDITION';

  return (
    <div className="group relative flex flex-col bg-white/70 backdrop-blur-sm rounded-xl overflow-hidden border border-cream-dark/60 hover:border-charcoal/30 hover:shadow-lg transition-all duration-500">
      {/* Product Image Frame */}
      <Link
        to={`/products/${product.id}`}
        className="block relative aspect-[3.2/4] overflow-hidden bg-cream-dark/20"
      >
        <img
          src={imageSrc}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
          loading="lazy"
        />

        {/* Edition Badge */}
        <span
          className={`absolute top-3.5 left-3.5 text-[9px] tracking-[0.2em] uppercase font-semibold px-2.5 py-1 rounded-sm shadow-sm ${
            isLimited
              ? 'bg-burgundy text-white'
              : 'bg-white/95 text-charcoal backdrop-blur-sm'
          }`}
        >
          {isLimited ? 'Limited Edition' : 'Core Denim'}
        </span>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistClick}
          className="absolute top-3.5 right-3.5 p-2 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white text-charcoal hover:text-burgundy transition-all duration-300 shadow-sm"
          aria-label={wishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
        >
          <Heart
            size={15}
            className={`transition-colors ${
              wishlisted ? 'fill-burgundy text-burgundy' : 'text-charcoal/80'
            }`}
          />
        </button>

        {/* Quick Sizes Overlay on Hover */}
        <div className="absolute bottom-0 inset-x-0 bg-white/95 backdrop-blur-md py-2 px-3 flex items-center justify-center space-x-3 text-[10px] font-medium tracking-widest text-charcoal uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300 border-t border-cream-dark/40">
          <span>S</span>
          <span className="text-charcoal/30">•</span>
          <span>M</span>
          <span className="text-charcoal/30">•</span>
          <span>L</span>
          <span className="text-charcoal/30">•</span>
          <span>XL</span>
        </div>
      </Link>

      {/* Product Meta */}
      <div className="p-4 sm:p-5 flex flex-col justify-between flex-grow">
        <div>
          <h3 className="font-serif text-base sm:text-lg text-charcoal font-medium group-hover:text-navy transition-colors">
            <Link to={`/products/${product.id}`}>{product.name}</Link>
          </h3>
          <p className="text-xs text-charcoal/60 mt-1 line-clamp-1 font-light">
            {product.description}
          </p>
        </div>

        <div className="mt-4 pt-3 border-t border-cream-dark/50 flex items-center justify-between">
          <span className="font-serif font-medium text-base text-charcoal">
            {formatPrice(product.price)}
          </span>
          <Link
            to={`/products/${product.id}`}
            className="text-[10px] tracking-[0.2em] uppercase font-semibold text-navy hover:text-navy-dark inline-flex items-center gap-1 group/btn"
          >
            <span>ENQUIRE</span>
            <span className="transition-transform group-hover/btn:translate-x-1">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
