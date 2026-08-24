import React from 'react';
import { Heart, Sparkles, Home, UtensilsCrossed, HeartHandshake } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-white text-slate-600">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Brand & Tagline (Column 1 - 6 cols on desktop) */}
          <div className="md:col-span-6 space-y-3 text-center md:text-left">
            <Link to="/" className="inline-flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="text-lg font-bold text-slate-900 tracking-tight">
                Feed<span className="text-emerald-600">Forward</span>
              </span>
            </Link>
            <p className="text-sm text-slate-500 font-medium max-w-sm mx-auto md:mx-0">
              Reducing food waste, one shared meal at a time.
            </p>
          </div>

          {/* Quick Links (Column 2 - 6 cols on desktop) */}
          <div className="md:col-span-6 flex flex-col md:items-end justify-center text-center md:text-right space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Quick Links
            </span>
            <div className="flex flex-wrap items-center justify-center md:justify-end gap-x-6 gap-y-2 text-sm font-medium">
              <Link
                to="/"
                className="hover:text-emerald-600 transition-colors inline-flex items-center gap-1.5"
              >
                <Home className="w-3.5 h-3.5 text-emerald-600" />
                <span>Home</span>
              </Link>
              <Link
                to="/track"
                className="hover:text-emerald-600 transition-colors inline-flex items-center gap-1.5"
              >
                <UtensilsCrossed className="w-3.5 h-3.5 text-emerald-600" />
                <span>My Kitchen</span>
              </Link>
              <Link
                to="/browse"
                className="hover:text-emerald-600 transition-colors inline-flex items-center gap-1.5"
              >
                <HeartHandshake className="w-3.5 h-3.5 text-emerald-600" />
                <span>Browse Donations</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Sub-bar */}
        <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-3 text-center sm:text-left">
          <p>© {new Date().getFullYear()} FeedForward. Free & open community food sharing.</p>
          <p className="flex items-center justify-center gap-1">
            Made with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for zero food waste.
          </p>
        </div>
      </div>
    </footer>
  );
}
