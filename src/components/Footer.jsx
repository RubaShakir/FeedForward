import React from 'react';
import { Heart, Sparkles, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-white py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-600 flex items-center justify-center text-white text-xs">
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="font-bold text-slate-800 tracking-tight">FeedForward</span>
            <span className="text-slate-400 text-sm">— Reducing waste, feeding communities.</span>
          </div>

          <div className="flex items-center gap-6 text-sm text-slate-600 font-medium">
            <Link to="/" className="hover:text-emerald-600 transition-colors">Home</Link>
            <Link to="/track" className="hover:text-emerald-600 transition-colors">My Kitchen</Link>
            <Link to="/browse" className="hover:text-emerald-600 transition-colors">Browse Donations</Link>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-2">
          <p>Client-side food tracker with direct Google Form & Sheet community integration.</p>
          <p className="flex items-center gap-1">
            Made with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for a zero-waste world.
          </p>
        </div>
      </div>
    </footer>
  );
}
