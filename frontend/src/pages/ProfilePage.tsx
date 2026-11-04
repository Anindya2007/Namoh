import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Package, Heart, Settings, LogOut, Trash2, MapPin, Calendar } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';
import { ProductCard } from '../components/product/ProductCard';
import * as preorderApi from '../api/preorder.api';
import { PreOrder } from '../types/preorder.types';

export const ProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'profile' | 'enquiries' | 'wishlist' | 'settings'>('profile');
  const [preorder, setPreorder] = useState<PreOrder | null>(null);
  const [loadingPreorder, setLoadingPreorder] = useState(false);
  const [cancelling, setCancelling] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const { user, logout } = useAuth();
  const { wishlist } = useWishlist();
  const navigate = useNavigate();

  useEffect(() => {
    if (activeTab === 'enquiries') {
      fetchUserPreOrder();
    }
  }, [activeTab]);

  const fetchUserPreOrder = async () => {
    setLoadingPreorder(true);
    try {
      const response = await preorderApi.getMyPreOrder();
      setPreorder(response.data);
    } catch (err) {
      console.error('Failed to fetch pre-order enquiry:', err);
    } finally {
      setLoadingPreorder(false);
    }
  };

  const handleCancelPreOrder = async () => {
    if (!preorder) return;
    if (!window.confirm('Are you sure you want to cancel this reservation enquiry?')) return;

    setCancelling(true);
    try {
      await preorderApi.cancelPreOrder(preorder.orderId);
      setPreorder(null);
    } catch (err: any) {
      alert(err.message || 'Failed to cancel pre-order');
    } finally {
      setCancelling(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="bg-cream min-h-screen py-10 md:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* ======================= SIDEBAR (MATCHING IMAGE 5) ======================= */}
          <div className="md:col-span-4 bg-transparent space-y-1.5">
            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-xs tracking-wider uppercase font-medium transition-colors ${
                activeTab === 'profile'
                  ? 'bg-navy text-white shadow-sm'
                  : 'text-charcoal/80 hover:bg-cream-dark/40 hover:text-charcoal'
              }`}
            >
              <User size={17} />
              <span>My Profile</span>
            </button>

            <button
              onClick={() => setActiveTab('enquiries')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-xs tracking-wider uppercase font-medium transition-colors ${
                activeTab === 'enquiries'
                  ? 'bg-navy text-white shadow-sm'
                  : 'text-charcoal/80 hover:bg-cream-dark/40 hover:text-charcoal'
              }`}
            >
              <Package size={17} />
              <span>Enquiries & PreOrders</span>
            </button>

            <button
              onClick={() => setActiveTab('wishlist')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-xs tracking-wider uppercase font-medium transition-colors ${
                activeTab === 'wishlist'
                  ? 'bg-navy text-white shadow-sm'
                  : 'text-charcoal/80 hover:bg-cream-dark/40 hover:text-charcoal'
              }`}
            >
              <Heart size={17} />
              <span>Wishlist ({wishlist.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-xs tracking-wider uppercase font-medium transition-colors ${
                activeTab === 'settings'
                  ? 'bg-navy text-white shadow-sm'
                  : 'text-charcoal/80 hover:bg-cream-dark/40 hover:text-charcoal'
              }`}
            >
              <Settings size={17} />
              <span>Account Settings</span>
            </button>

            <div className="pt-4 border-t border-cream-dark/60">
              <button
                onClick={handleLogout}
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-xs tracking-wider uppercase font-medium text-charcoal/70 hover:text-burgundy hover:bg-burgundy/10 transition-colors"
              >
                <LogOut size={17} />
                <span>Logout</span>
              </button>
            </div>
          </div>

          {/* ======================= RIGHT CONTENT AREA (MATCHING IMAGE 5) ======================= */}
          <div className="md:col-span-8 bg-white/70 backdrop-blur-sm border border-cream-dark/60 rounded-2xl p-6 sm:p-10 shadow-sm">
            {/* TAB 1: MY PROFILE */}
            {activeTab === 'profile' && (
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-cream-dark/50 mb-8">
                  <h2 className="font-serif text-2xl sm:text-3xl text-charcoal font-normal">
                    My Profile
                  </h2>
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="border border-charcoal/80 hover:bg-charcoal hover:text-white text-charcoal px-4 py-1.5 rounded-md text-xs tracking-wider uppercase font-medium transition-colors"
                  >
                    {isEditing ? 'Cancel' : 'Edit Profile'}
                  </button>
                </div>

                <div className="space-y-6 max-w-xl">
                  {/* Full Name field */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal/60 mb-2">
                      Full Name
                    </label>
                    <div className="w-full px-4 py-3 bg-white border border-cream-dark rounded-xl text-sm text-charcoal font-medium">
                      {user?.name || 'NAMOH Customer'}
                    </div>
                  </div>

                  {/* Email field */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal/60 mb-2">
                      Email
                    </label>
                    <div className="w-full px-4 py-3 bg-white border border-cream-dark rounded-xl text-sm text-charcoal font-medium">
                      {user?.email || 'customer@example.com'}
                    </div>
                  </div>

                  {/* Phone field matching Image 5 */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal/60 mb-2">
                      Phone
                    </label>
                    <div className="w-full px-4 py-3 bg-white border border-cream-dark rounded-xl text-sm text-charcoal font-medium flex items-center justify-between">
                      <span>{user?.phone || '+91 98765 43210'}</span>
                      <span className="text-[10px] text-charcoal/50 tracking-wider">PRIMARY</span>
                    </div>
                  </div>

                  {isEditing && (
                    <div className="p-4 bg-cream/70 rounded-xl border border-cream-dark text-xs text-charcoal/70 leading-relaxed">
                      💡 Profile data is synchronized with your registered NAMOH customer record. To request changes to your primary email address, please contact our concierge atelier.
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB 2: ENQUIRIES & PREORDERS */}
            {activeTab === 'enquiries' && (
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-cream-dark/50 mb-8">
                  <div>
                    <h2 className="font-serif text-2xl sm:text-3xl text-charcoal font-normal">
                      Atelier Enquiries
                    </h2>
                    <p className="text-xs text-charcoal/60 mt-1">
                      Your temporary FW'26 reservations and bespoke requests.
                    </p>
                  </div>
                </div>

                {loadingPreorder ? (
                  <div className="py-12 flex justify-center">
                    <div className="w-6 h-6 border-2 border-navy border-t-transparent rounded-full animate-spin" />
                  </div>
                ) : preorder ? (
                  <div className="bg-white border border-cream-dark rounded-xl p-6 space-y-4">
                    <div className="flex items-center justify-between border-b border-cream-dark/40 pb-3">
                      <div>
                        <span className="text-[10px] tracking-widest uppercase font-semibold text-charcoal/50">
                          PRE-ORDER #{preorder.orderId}
                        </span>
                        <h4 className="font-serif text-lg text-navy font-medium">
                          FW'26 Denim Reservation
                        </h4>
                      </div>
                      <span className="bg-navy/10 text-navy text-xs px-2.5 py-1 rounded-full font-medium">
                        Confirmed Active
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-charcoal/80 pt-2">
                      <div className="flex items-start space-x-2">
                        <MapPin size={15} className="text-navy shrink-0 mt-0.5" />
                        <div>
                          <span className="font-semibold block text-charcoal/60 uppercase text-[10px]">
                            Delivery Address
                          </span>
                          <span>{preorder.adress}</span>
                        </div>
                      </div>

                      <div className="flex items-start space-x-2">
                        <Calendar size={15} className="text-navy shrink-0 mt-0.5" />
                        <div>
                          <span className="font-semibold block text-charcoal/60 uppercase text-[10px]">
                            Reserved On
                          </span>
                          <span>{new Date(preorder.orderAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-cream-dark/40 flex justify-end">
                      <button
                        onClick={handleCancelPreOrder}
                        disabled={cancelling}
                        className="inline-flex items-center space-x-1.5 text-xs text-burgundy hover:underline font-medium"
                      >
                        <Trash2 size={13} />
                        <span>{cancelling ? 'Cancelling...' : 'Cancel Reservation'}</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-xs text-charcoal/70">
                      You have no active pre-orders or reservation enquiries.
                    </p>
                    <p className="text-[11px] text-charcoal/50 mt-1">
                      Navigate to any piece in our collection to submit a pre-order enquiry.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* TAB 3: WISHLIST */}
            {activeTab === 'wishlist' && (
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-cream-dark/50 mb-8">
                  <div>
                    <h2 className="font-serif text-2xl sm:text-3xl text-charcoal font-normal">
                      Saved Pieces
                    </h2>
                    <p className="text-xs text-charcoal/60 mt-1">
                      Pieces you have curated for future consideration.
                    </p>
                  </div>
                </div>

                {wishlist.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {wishlist.map((item) => (
                      <ProductCard key={item.id} product={item} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Heart size={32} className="mx-auto text-charcoal/30 stroke-1 mb-3" />
                    <p className="text-xs text-charcoal/70">Your curated wishlist is empty.</p>
                    <p className="text-[11px] text-charcoal/50 mt-1">
                      Explore our pieces and click the heart icon to save items here.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* TAB 4: ACCOUNT SETTINGS */}
            {activeTab === 'settings' && (
              <div>
                <div className="pb-6 border-b border-cream-dark/50 mb-8">
                  <h2 className="font-serif text-2xl sm:text-3xl text-charcoal font-normal">
                    Account Settings
                  </h2>
                </div>

                <div className="space-y-6 text-xs text-charcoal/80 max-w-lg">
                  <div className="p-4 bg-white rounded-xl border border-cream-dark space-y-1">
                    <span className="font-semibold text-charcoal block uppercase text-[10px] tracking-wider">
                      Account Role
                    </span>
                    <span className="text-navy font-medium uppercase tracking-wider text-xs">
                      {user?.role || 'USER'}
                    </span>
                  </div>

                  <div className="p-4 bg-white rounded-xl border border-cream-dark space-y-1">
                    <span className="font-semibold text-charcoal block uppercase text-[10px] tracking-wider">
                      Security & Authentication
                    </span>
                    <p className="text-charcoal/70 text-xs">
                      Your session is authenticated via secure HTTP-only cookies protected against client-side script inspection.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

