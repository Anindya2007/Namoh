import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-cream border-t border-cream-dark/60 text-charcoal pt-16 pb-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8 mb-14">
          {/* Brand Column */}
          <div className="space-y-4 md:col-span-1">
            <Link to="/" className="font-serif text-2xl tracking-[0.22em] text-charcoal font-medium inline-block">
              NAMOH
            </Link>
            <p className="text-xs text-charcoal/70 leading-relaxed pr-4">
              A contemporary fashion label rooted in tailored craftsmanship, refined fabrics, and thoughtful structure.
            </p>
            <p className="text-[11px] text-charcoal/50 tracking-wider">
              FW'26 COLLECTION
            </p>
          </div>

          {/* Navigation Column */}
          <div>
            <h4 className="text-xs tracking-[0.18em] font-semibold text-charcoal mb-4">EXPLORE</h4>
            <ul className="space-y-2.5 text-xs text-charcoal/75">
              <li>
                <Link to="/products" className="hover:text-navy transition-colors">
                  Shop All
                </Link>
              </li>
              <li>
                <Link to="/collections" className="hover:text-navy transition-colors">
                  Collections
                </Link>
              </li>
              <li>
                <Link to="/journal" className="hover:text-navy transition-colors">
                  Journal & Stories
                </Link>
              </li>
            </ul>
          </div>

          {/* Brand & Craft Column */}
          <div>
            <h4 className="text-xs tracking-[0.18em] font-semibold text-charcoal mb-4">THE ATELIER</h4>
            <ul className="space-y-2.5 text-xs text-charcoal/75">
              <li>
                <Link to="/about" className="hover:text-navy transition-colors">
                  About NAMOH
                </Link>
              </li>
              <li>
                <Link to="/about/philosophy" className="hover:text-navy transition-colors">
                  Our Philosophy
                </Link>
              </li>
              <li>
                <Link to="/profile/enquiries" className="hover:text-navy transition-colors">
                  Custom Enquiries
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div>
            <h4 className="text-xs tracking-[0.18em] font-semibold text-charcoal mb-4">STAY INFORMED</h4>
            <p className="text-xs text-charcoal/70 mb-3 leading-relaxed">
              Receive private previews, limited capsule releases, and invitations.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="flex items-center">
              <input
                type="email"
                placeholder="Email address"
                className="bg-white border border-cream-dark px-3 py-2 text-xs rounded-l-md outline-none focus:border-navy text-charcoal w-full"
              />
              <button
                type="submit"
                className="bg-navy hover:bg-navy-dark text-white px-3.5 py-2 text-xs rounded-r-md tracking-wider transition-colors shrink-0"
              >
                JOIN
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-cream-dark/50 flex flex-col sm:flex-row items-center justify-between text-[11px] text-charcoal/60 space-y-4 sm:space-y-0">
          <p>© {new Date().getFullYear()} NAMOH. All rights reserved.</p>
          <div className="flex space-x-6">
            <span className="hover:text-navy cursor-pointer">Privacy Policy</span>
            <span className="hover:text-navy cursor-pointer">Terms of Service</span>
            <span className="hover:text-navy cursor-pointer">Craftsmanship Promise</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

