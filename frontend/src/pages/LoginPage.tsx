import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ArrowRight, Lock, Mail } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as any)?.from?.pathname || '/profile';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError('Please provide both email and password.');
      return;
    }

    setIsSubmitting(true);
    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err: any) {
      setError(err.message || 'Invalid login credentials. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-cream min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full bg-white/80 backdrop-blur-sm border border-cream-dark/60 rounded-3xl overflow-hidden shadow-lg grid grid-cols-1 md:grid-cols-12">
        {/* Left Column: Editorial Atmospheric Brand Image */}
        <div className="hidden md:flex md:col-span-5 bg-navy relative p-10 flex-col justify-between text-white overflow-hidden">
          <img
            src="/assets/about-craftsmanship.jpg"
            alt="NAMOH Atelier Craft"
            className="absolute inset-0 w-full h-full object-cover opacity-35 mix-blend-overlay"
          />
          <div className="relative z-10">
            <span className="font-serif text-2xl tracking-[0.25em] font-normal block">
              NAMOH
            </span>
            <span className="text-[10px] tracking-[0.25em] uppercase text-cream/70 font-semibold mt-1 block">
              ATELIER CLIENT PORTAL
            </span>
          </div>

          <div className="relative z-10 space-y-3">
            <h3 className="font-serif text-2xl text-cream font-normal leading-snug">
              Timeless Craft.
              <br />
              Modern Expression.
            </h3>
            <p className="text-xs text-cream/80 font-light leading-relaxed">
              Sign in to manage your FW'26 reservations, bespoke tailoring requests, and curated wishlist.
            </p>
          </div>

          <div className="relative z-10 text-[10px] text-cream/50 tracking-wider">
            FW'26 ATELIER REGISTRY
          </div>
        </div>

        {/* Right Column: High Fashion Sign-In Form */}
        <div className="md:col-span-7 p-8 sm:p-12 flex flex-col justify-center">
          <div className="mb-8">
            <span className="text-[10px] tracking-[0.25em] uppercase text-charcoal/50 font-semibold block mb-1">
              WELCOME BACK
            </span>
            <h2 className="font-serif text-3xl text-charcoal font-normal">
              Client Sign In
            </h2>
            <p className="text-xs text-charcoal/60 mt-1 font-light">
              Enter your credentials to access your private account.
            </p>
          </div>

          {error && (
            <div className="mb-6 p-3.5 bg-burgundy/10 border border-burgundy/20 rounded-xl text-burgundy text-xs font-medium text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal/70 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-cream/30 border border-cream-dark rounded-xl text-xs text-charcoal outline-none focus:border-navy focus:bg-white transition-all font-medium"
                />
                <Mail size={16} className="absolute left-3.5 top-3.5 text-charcoal/40" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal/70 mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-cream/30 border border-cream-dark rounded-xl text-xs text-charcoal outline-none focus:border-navy focus:bg-white transition-all font-medium"
                />
                <Lock size={16} className="absolute left-3.5 top-3.5 text-charcoal/40" />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-navy hover:bg-navy-dark text-white py-3.5 rounded-xl text-xs tracking-[0.18em] uppercase font-semibold transition-all mt-3 shadow-md flex items-center justify-center space-x-2 group disabled:opacity-60"
            >
              <span>{isSubmitting ? 'Authenticating...' : 'Sign In To Account'}</span>
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-cream-dark/50 text-center text-xs text-charcoal/70">
            <span>New to the atelier? </span>
            <Link to="/signup" className="text-navy font-semibold hover:underline">
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
