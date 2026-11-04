import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, User, ShoppingBag, Menu, X, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useWishlist } from '../../context/WishlistContext';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const { isAuthenticated, user } = useAuth();
  const { wishlistCount } = useWishlist();

  const navLinks = [
    { name: 'SHOP', path: '/products' },
    { name: 'COLLECTIONS', path: '/collections' },
    { name: 'JOURNAL', path: '/journal' },
    { name: 'ATELIER', path: '/about' },
  ];

  return (
    <>
      {/* Top Luxury Announcement Bar */}
      <div className="bg-navy text-cream py-1.5 px-4 text-center text-[10px] tracking-[0.25em] font-medium uppercase border-b border-navy-light/40">
        Complimentary Domestic Fitting & Global Delivery On All FW'26 Pre-Orders
      </div>

      <header className="sticky top-0 z-50 bg-cream/95 backdrop-blur-md border-b border-cream-dark/60 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 md:h-20 flex items-center justify-between">
          {/* Left Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center space-x-7 lg:space-x-9">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-xs tracking-[0.2em] font-medium transition-colors hover:text-navy relative py-1.5 ${
                    isActive ? 'text-navy font-semibold' : 'text-charcoal/80'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-navy" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-charcoal hover:text-navy focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

          {/* Center: NAMOH Wordmark */}
          <div className="flex-1 md:flex-none text-center">
            <Link
              to="/"
              className="inline-block font-serif text-2xl md:text-3xl tracking-[0.24em] text-charcoal font-normal hover:opacity-90 transition-opacity uppercase"
            >
              NAMOH
            </Link>
          </div>

          {/* Right: Utility Icons */}
          <div className="flex items-center space-x-5 sm:space-x-6">
            {/* Search Input Bar */}
            <div className="relative">
              {searchOpen ? (
                <div className="flex items-center bg-white border border-cream-dark rounded-full px-3 py-1.5 text-xs shadow-sm">
                  <input
                    type="text"
                    placeholder="Search collection..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-transparent outline-none text-xs w-32 sm:w-44 text-charcoal placeholder:text-charcoal/40"
                    autoFocus
                  />
                  <button
                    onClick={() => setSearchOpen(false)}
                    className="text-charcoal/50 hover:text-charcoal text-xs ml-1"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setSearchOpen(true)}
                  className="text-charcoal/85 hover:text-navy transition-colors p-1"
                  aria-label="Search catalogue"
                  title="Search"
                >
                  <Search size={19} strokeWidth={1.75} />
                </button>
              )}
            </div>

            {/* Profile / Account Button */}
            <Link
              to={isAuthenticated ? '/profile' : '/login'}
              className="text-charcoal/85 hover:text-navy transition-colors p-1 relative flex items-center gap-1.5"
              title={isAuthenticated ? `Profile (${user?.name})` : 'Account Sign In'}
              aria-label="Account"
            >
              <User size={19} strokeWidth={1.75} />
              {isAuthenticated && (
                <span className="hidden lg:inline text-[11px] font-medium tracking-wider text-navy uppercase">
                  {user?.name?.split(' ')[0]}
                </span>
              )}
            </Link>

            {/* Shopping Bag / Wishlist Button */}
            <Link
              to="/profile/wishlist"
              className="text-charcoal/85 hover:text-navy transition-colors p-1 relative"
              title="Curated Wishlist & Pre-orders"
              aria-label="Wishlist"
            >
              <ShoppingBag size={19} strokeWidth={1.75} />
              {wishlistCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-navy text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-semibold">
                  {wishlistCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-cream border-b border-cream-dark px-6 py-6 space-y-4 animate-in slide-in-from-top duration-200">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-sm tracking-[0.2em] font-medium text-charcoal hover:text-navy py-1.5"
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 border-t border-cream-dark/60 flex items-center justify-between text-xs tracking-wider">
              <Link
                to="/about/philosophy"
                onClick={() => setMobileMenuOpen(false)}
                className="text-charcoal/70 hover:text-navy uppercase"
              >
                Philosophy
              </Link>
              <Link
                to={isAuthenticated ? '/profile' : '/login'}
                onClick={() => setMobileMenuOpen(false)}
                className="text-navy font-semibold uppercase flex items-center gap-1"
              >
                <span>{isAuthenticated ? 'My Atelier' : 'Client Login'}</span>
                <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
