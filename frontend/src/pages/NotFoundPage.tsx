import React from 'react';
import { Link } from 'react-router-dom';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="bg-cream min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-16">
      <span className="text-xs uppercase tracking-[0.25em] text-charcoal/50 font-semibold mb-2">
        ERROR 404
      </span>
      <h1 className="font-serif text-3xl sm:text-4xl text-charcoal font-medium mb-3">
        Page Not Found
      </h1>
      <p className="text-xs sm:text-sm text-charcoal/70 max-w-sm mb-8 leading-relaxed font-light">
        The destination you are attempting to reach does not exist in our atelier directory.
      </p>
      <Link
        to="/"
        className="bg-navy hover:bg-navy-dark text-white px-6 py-2.5 rounded-sm text-xs tracking-wider uppercase font-semibold transition-colors"
      >
        Return to Home →
      </Link>
    </div>
  );
};

