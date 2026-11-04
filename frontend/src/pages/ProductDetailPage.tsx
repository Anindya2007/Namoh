import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Heart, Share2, Star, Check, AlertCircle, ArrowLeft, Ruler } from 'lucide-react';
import { Product } from '../types/product.types';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';
import * as productApi from '../api/product.api';
import * as preorderApi from '../api/preorder.api';
import { apiRequest } from '../api/client';
import { ProductCard } from '../components/product/ProductCard';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>('M');
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

  // Enquiry / PreOrder Modal State
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [submittingEnquiry, setSubmittingEnquiry] = useState(false);
  const [enquirySuccess, setEnquirySuccess] = useState(false);
  const [enquiryError, setEnquiryError] = useState<string | null>(null);

  // Reviews State
  const [reviews, setReviews] = useState<any[]>([]);
  const [userRating, setUserRating] = useState<number>(5);
  const [userReview, setUserReview] = useState<string>('');
  const [submittingReview, setSubmittingReview] = useState(false);

  // Size Guide Modal State
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);

  const { isAuthenticated } = useAuth();
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const navigate = useNavigate();

  const sizes = ['S', 'M', 'L', 'XL'];

  useEffect(() => {
    if (!id) return;
    const fetchDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await productApi.getProductById(id);
        if (response && response.data) {
          setProduct(response.data);
        } else {
          setError('Product record not found');
        }
      } catch (err: any) {
        setError(err.message || 'Failed to load product details');
      } finally {
        setLoading(false);
      }
    };

    const fetchRelated = async () => {
      try {
        const res = await productApi.getProducts();
        if (res.data) {
          setRelatedProducts(res.data.filter((p) => p.id !== Number(id)).slice(0, 3));
        }
      } catch {
        // Ignored
      }
    };

    const fetchReviews = async () => {
      try {
        const res = await apiRequest<any>(`/api/feedback/${id}`);
        if (res.data) {
          setReviews(res.data);
        }
      } catch {
        // Feedback is optional
      }
    };

    fetchDetails();
    fetchRelated();
    fetchReviews();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  const formatPrice = (price: number | string | undefined) => {
    if (!price) return '₹4,999';
    const num = typeof price === 'string' ? parseFloat(price) : price;
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(num);
  };

  const handleEnquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (!deliveryAddress.trim() || deliveryAddress.trim().length < 5) {
      setEnquiryError('Please provide a complete delivery address (minimum 5 characters)');
      return;
    }

    setSubmittingEnquiry(true);
    setEnquiryError(null);
    try {
      await preorderApi.createPreOrder(deliveryAddress);
      setEnquirySuccess(true);
    } catch (err: any) {
      setEnquiryError(err.message || 'Failed to submit pre-order enquiry');
    } finally {
      setSubmittingEnquiry(false);
    }
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    if (!userReview.trim()) return;

    setSubmittingReview(true);
    try {
      await apiRequest('/api/feedback', {
        method: 'POST',
        body: JSON.stringify({
          productId: Number(id),
          ratings: userRating,
          review: userReview,
        }),
      });
      setUserReview('');
      const res = await apiRequest<any>(`/api/feedback/${id}`);
      if (res.data) setReviews(res.data);
    } catch (err: any) {
      alert(err.message || 'Failed to submit review');
    } finally {
      setSubmittingReview(false);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: product?.name || 'NAMOH Denim Piece',
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Product link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] bg-cream flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-navy border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-[70vh] bg-cream flex flex-col items-center justify-center px-4 text-center">
        <AlertCircle size={40} className="text-burgundy/80 mb-3" />
        <h2 className="font-serif text-2xl text-charcoal font-medium">Piece Not Found</h2>
        <p className="text-xs text-charcoal/70 mt-1 max-w-sm">
          {error || 'This specific piece is currently not available in our atelier catalog.'}
        </p>
        <Link
          to="/products"
          className="mt-6 inline-flex items-center space-x-1 text-xs tracking-wider uppercase font-semibold text-navy hover:underline"
        >
          <ArrowLeft size={14} />
          <span>Back to Collection</span>
        </Link>
      </div>
    );
  }

  const wishlisted = isInWishlist(product.id);

  // Gallery images with thumbnails matching Image 6
  const galleryImages = [
    product.imageUrl || '/assets/denim-vest-main.jpg',
    '/assets/denim-vest-thumb1.jpg',
    '/assets/denim-vest-thumb2.jpg',
    '/assets/denim-vest-thumb3.jpg',
  ];

  return (
    <div className="bg-cream min-h-screen py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <div className="mb-8 text-xs tracking-wider uppercase text-charcoal/60 flex items-center space-x-2">
          <Link to="/" className="hover:text-navy">HOME</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-navy">PIECES</Link>
          <span>/</span>
          <span className="text-navy font-semibold">{product.name}</span>
        </div>

        {/* ======================= PRODUCT DETAIL MAIN SECTION (IMAGE 6) ======================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start bg-white/70 backdrop-blur-sm border border-cream-dark/60 rounded-3xl p-6 sm:p-10 shadow-sm">
          {/* Left Column: Thumbnail Rail + Large Image Stage */}
          <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4 sm:gap-6">
            {/* Vertical Thumbnail Rail (Image 6 Reference) */}
            <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-visible pb-2 sm:pb-0 shrink-0">
              {galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-16 h-20 sm:w-20 sm:h-24 rounded-xl overflow-hidden border-2 transition-all bg-cream-dark/20 shrink-0 ${
                    activeImageIndex === idx
                      ? 'border-navy shadow-sm'
                      : 'border-transparent hover:border-cream-dark'
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.name} angle ${idx + 1}`}
                    className="w-full h-full object-cover object-center"
                  />
                </button>
              ))}
            </div>

            {/* Main Stage Large Image (Image 6 Reference) */}
            <div className="flex-1 rounded-2xl overflow-hidden bg-cream-dark/20 border border-cream-dark/50 shadow-sm aspect-[4/5] relative">
              <img
                src={galleryImages[activeImageIndex]}
                alt={product.name}
                className="w-full h-full object-contain sm:object-cover object-center transition-all duration-300"
              />
            </div>
          </div>

          {/* Right Column: Information & Enquire Actions (Image 6 Reference) */}
          <div className="lg:col-span-5 flex flex-col justify-start space-y-6 lg:pl-4">
            <div>
              <h1 className="font-serif text-3xl sm:text-4xl text-charcoal font-normal leading-tight">
                {product.name}
              </h1>
              <p className="text-xs uppercase tracking-widest text-charcoal/60 mt-1 font-semibold">
                {product.category === 'LIMITED_EDITION' ? 'Limited Edition Capsule' : 'Core Vests'}
              </p>
            </div>

            {/* Price */}
            <div>
              <span className="font-serif text-2xl sm:text-3xl text-charcoal font-medium">
                {formatPrice(product.price)}
              </span>
              <span className="text-[11px] text-charcoal/50 block mt-0.5">
                Inclusive of domestic taxes & complimentary tailored fitting
              </span>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-charcoal/80 leading-relaxed font-light">
              {product.description}
            </p>

            {/* Size Selector (Image 6 Reference) */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-charcoal/70">
                  Size
                </span>
                <button
                  onClick={() => setSizeGuideOpen(true)}
                  className="text-[11px] text-navy hover:underline inline-flex items-center gap-1 font-medium"
                >
                  <Ruler size={13} />
                  <span>Size Guide</span>
                </button>
              </div>

              <div className="flex items-center space-x-3">
                {sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`w-12 h-11 rounded-lg border text-xs font-medium uppercase transition-colors ${
                      selectedSize === s
                        ? 'border-navy bg-navy text-white shadow-sm font-semibold'
                        : 'border-cream-dark bg-white text-charcoal hover:border-charcoal'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Enquire CTA Button (Image 6 Reference) */}
            <div className="pt-2">
              <button
                onClick={() => setEnquiryModalOpen(true)}
                className="w-full bg-navy hover:bg-navy-dark text-white py-4 px-6 rounded-xl text-xs tracking-[0.2em] uppercase font-semibold transition-colors flex items-center justify-center space-x-2 group shadow-sm"
              >
                <span>Enquire</span>
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </button>
            </div>

            {/* Secondary Actions: Wishlist & Share (Image 6 Reference) */}
            <div className="flex items-center space-x-8 pt-3 border-t border-cream-dark/50 text-xs text-charcoal/80">
              <button
                onClick={() => (wishlisted ? removeFromWishlist(product.id) : addToWishlist(product))}
                className="inline-flex items-center space-x-2 hover:text-navy transition-colors py-1 font-medium"
              >
                <Heart size={16} className={wishlisted ? 'fill-burgundy text-burgundy' : ''} />
                <span>{wishlisted ? 'Saved in Wishlist' : 'Add to Wishlist'}</span>
              </button>

              <button
                onClick={handleShare}
                className="inline-flex items-center space-x-2 hover:text-navy transition-colors py-1 font-medium"
              >
                <Share2 size={16} />
                <span>Share Piece</span>
              </button>
            </div>

            {/* Specifications Accordion */}
            <div className="pt-4 border-t border-cream-dark/40 space-y-3 text-xs text-charcoal/70">
              <div className="flex justify-between py-1 border-b border-cream-dark/30">
                <span className="font-medium text-charcoal">Fabric</span>
                <span>{product.fabric || 'Heavy Selvedge Rigid Denim'}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-cream-dark/30">
                <span className="font-medium text-charcoal">Silhouette</span>
                <span>{product.fit || 'Architectural stand-collar boxy fit'}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="font-medium text-charcoal">Hardware</span>
                <span>Bespoke continuous brass zipper closure</span>
              </div>
            </div>
          </div>
        </div>

        {/* ======================= REVIEWS & ATELIER FEEDBACK ======================= */}
        <div className="mt-16 pt-10 border-t border-cream-dark/60 max-w-4xl">
          <h3 className="font-serif text-2xl text-charcoal font-normal mb-6">
            Atelier Client Reviews
          </h3>

          <div className="space-y-4 mb-10">
            {reviews.length > 0 ? (
              reviews.map((rev) => (
                <div key={rev.feedbackId} className="bg-white/80 border border-cream-dark/50 rounded-xl p-5 shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-charcoal uppercase tracking-wider">
                      {rev.User?.name || 'Verified Patron'}
                    </span>
                    <div className="flex text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={13}
                          className={i < rev.ratings ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-charcoal/75 leading-relaxed font-light">{rev.review}</p>
                </div>
              ))
            ) : (
              <p className="text-xs text-charcoal/60 italic">
                No reviews yet for this piece. Be the first to share your feedback.
              </p>
            )}
          </div>

          {isAuthenticated ? (
            <form onSubmit={handleReviewSubmit} className="bg-white/80 border border-cream-dark/50 rounded-2xl p-6 shadow-sm">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-charcoal mb-4">
                Leave Client Feedback
              </h4>
              <div className="flex items-center space-x-2 mb-3">
                <span className="text-xs text-charcoal/70">Rating:</span>
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    type="button"
                    key={star}
                    onClick={() => setUserRating(star)}
                    className="text-amber-500 p-0.5"
                  >
                    <Star
                      size={18}
                      className={star <= userRating ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}
                    />
                  </button>
                ))}
              </div>
              <textarea
                value={userReview}
                onChange={(e) => setUserReview(e.target.value)}
                rows={3}
                placeholder="Share your experience on denim drape, sizing, and construction..."
                className="w-full text-xs p-3 bg-cream/40 border border-cream-dark rounded-xl outline-none focus:border-navy mb-3 text-charcoal"
                required
              />
              <button
                type="submit"
                disabled={submittingReview}
                className="bg-navy hover:bg-navy-dark text-white px-6 py-2.5 rounded-lg text-xs tracking-wider uppercase font-semibold transition-colors"
              >
                {submittingReview ? 'Submitting...' : 'Post Review'}
              </button>
            </form>
          ) : (
            <div className="p-4 bg-white/70 rounded-xl border border-cream-dark/50 text-xs text-charcoal/70 flex items-center justify-between">
              <span>Please sign in to your atelier account to leave feedback.</span>
              <Link to="/login" className="text-navy font-semibold underline">
                Sign In →
              </Link>
            </div>
          )}
        </div>

        {/* ======================= RELATED PIECES ======================= */}
        {relatedProducts.length > 0 && (
          <div className="mt-20 pt-12 border-t border-cream-dark/60">
            <div className="flex items-end justify-between mb-8">
              <div>
                <span className="text-[11px] uppercase tracking-[0.24em] text-charcoal/60 font-semibold block mb-1">
                  COMPLEMENTARY SILHOUETTES
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-charcoal font-normal">
                  You May Also Admire
                </h3>
              </div>
              <Link to="/products" className="text-xs uppercase tracking-wider text-navy font-semibold hover:underline">
                View All →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ======================= ENQUIRY / PREORDER MODAL ======================= */}
      {enquiryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-cream border border-cream-dark max-w-md w-full rounded-2xl p-6 sm:p-8 shadow-2xl relative">
            <button
              onClick={() => {
                setEnquiryModalOpen(false);
                setEnquirySuccess(false);
                setEnquiryError(null);
              }}
              className="absolute top-4 right-4 text-charcoal/60 hover:text-charcoal text-sm p-1"
            >
              ✕
            </button>

            {enquirySuccess ? (
              <div className="text-center py-6 space-y-3">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto">
                  <Check size={24} />
                </div>
                <h3 className="font-serif text-2xl text-charcoal font-medium">Reservation Recorded</h3>
                <p className="text-xs text-charcoal/70 leading-relaxed max-w-xs mx-auto">
                  Your FW'26 Pre-Order enquiry for <strong>{product.name}</strong> (Size {selectedSize}) has been registered in our allocation queue.
                </p>
                <div className="pt-4 flex justify-center space-x-3">
                  <Link
                    to="/profile"
                    className="bg-navy text-white text-xs px-5 py-2.5 rounded-lg font-semibold tracking-wider uppercase"
                  >
                    View My Enquiries
                  </Link>
                </div>
              </div>
            ) : (
              <div>
                <span className="text-[10px] tracking-widest uppercase font-semibold text-charcoal/60 block mb-1">
                  FW'26 RESERVATION
                </span>
                <h3 className="font-serif text-2xl text-charcoal font-normal">
                  Reserve {product.name}
                </h3>
                <p className="text-xs text-charcoal/70 mt-1 mb-5">
                  Size: <strong>{selectedSize}</strong> • {formatPrice(product.price)}
                </p>

                {enquiryError && (
                  <div className="p-3 mb-4 rounded-lg bg-burgundy/10 text-burgundy text-xs">
                    {enquiryError}
                  </div>
                )}

                <form onSubmit={handleEnquirySubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal/70 mb-1.5">
                      Delivery / Atelier Address
                    </label>
                    <textarea
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      rows={3}
                      placeholder="Enter your complete delivery address..."
                      className="w-full text-xs p-3 bg-white border border-cream-dark rounded-xl outline-none focus:border-navy text-charcoal"
                      required
                    />
                  </div>

                  <p className="text-[11px] text-charcoal/60 leading-relaxed font-light">
                    * Submitting registers your reservation in our temporary pre-order system. No upfront card payment required at enquiry stage.
                  </p>

                  <button
                    type="submit"
                    disabled={submittingEnquiry}
                    className="w-full bg-navy hover:bg-navy-dark text-white py-3.5 rounded-xl text-xs tracking-wider uppercase font-semibold transition-colors"
                  >
                    {submittingEnquiry ? 'Submitting Reservation...' : 'Confirm Pre-Order Enquiry'}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ======================= SIZE GUIDE MODAL ======================= */}
      {sizeGuideOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-cream border border-cream-dark max-w-lg w-full rounded-2xl p-6 sm:p-8 shadow-2xl relative">
            <button
              onClick={() => setSizeGuideOpen(false)}
              className="absolute top-4 right-4 text-charcoal/60 hover:text-charcoal text-sm p-1"
            >
              ✕
            </button>
            <h3 className="font-serif text-2xl text-charcoal font-normal mb-2">Atelier Sizing Guide</h3>
            <p className="text-xs text-charcoal/70 mb-5">
              All measurements are in inches. Designed for an architectural boxy drape.
            </p>
            <table className="w-full text-xs text-charcoal border-collapse">
              <thead>
                <tr className="border-b border-cream-dark font-semibold text-charcoal/60">
                  <th className="py-2 text-left">Size</th>
                  <th className="py-2 text-left">Chest</th>
                  <th className="py-2 text-left">Length</th>
                  <th className="py-2 text-left">Shoulder</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cream-dark/40">
                <tr><td className="py-2 font-medium">S</td><td className="py-2">38"</td><td className="py-2">24"</td><td className="py-2">16.5"</td></tr>
                <tr><td className="py-2 font-medium">M</td><td className="py-2">41"</td><td className="py-2">25"</td><td className="py-2">17.5"</td></tr>
                <tr><td className="py-2 font-medium">L</td><td className="py-2">44"</td><td className="py-2">26"</td><td className="py-2">18.5"</td></tr>
                <tr><td className="py-2 font-medium">XL</td><td className="py-2">47"</td><td className="py-2">27"</td><td className="py-2">19.5"</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
