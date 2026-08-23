import React from 'react';
import { Link } from 'react-router-dom';
import { UtensilsCrossed, HeartHandshake, ArrowRight, Clock, ShieldAlert, Sparkles, Share2, CheckCircle2 } from 'lucide-react';

export default function Home() {
  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 sm:pt-14 pb-10 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-6 animate-fade-in">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          Zero-waste food sharing initiative
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight max-w-3xl mx-auto leading-tight">
          Keep your food fresh, share what you can't finish.
        </h1>

        <p className="mt-5 text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed">
          <strong className="text-slate-800 font-semibold">FeedForward</strong> tracks your kitchen inventory, warns you before items expire, and helps you give surplus food away to your local community in seconds.
        </p>

        {/* Call to Actions */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/track"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-base shadow-md shadow-emerald-600/25 hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5"
          >
            <UtensilsCrossed className="w-5 h-5" />
            Track My Kitchen
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            to="/browse"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-semibold text-base border border-slate-200 shadow-xs hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
          >
            <HeartHandshake className="w-5 h-5 text-emerald-600" />
            Browse Donations
          </Link>
        </div>

        {/* Feature Highlights Grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6 text-left max-w-5xl mx-auto">
          {/* Feature 1 */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:border-emerald-200 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 mb-4 border border-emerald-100">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Smart Expiry Countdowns</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Log pantry and fridge items with automated countdowns. Get instant visual alerts when food is within 2 days of expiring.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:border-emerald-200 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 mb-4 border border-emerald-100">
              <Share2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">1-Click Google Form Pre-fill</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Got extra loaves or produce? Click "Give this away" to open a pre-filled donation form with your item name & quantity.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:border-emerald-200 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 mb-4 border border-emerald-100">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Live Community Feed</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Explore real-time community donations fetched directly from the public board. Connect directly with donors in your area.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-emerald-950 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <span className="text-emerald-400 text-xs font-bold uppercase tracking-widest">How It Works</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mt-2 mb-6">
            Four simple steps to zero food waste
          </h2>

          <div className="space-y-4 text-slate-200">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-emerald-600/60 text-emerald-300 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                1
              </div>
              <p className="text-sm sm:text-base">
                <strong className="text-white">Log your food:</strong> Add your groceries and pantry items to your local tracker on <Link to="/track" className="text-emerald-400 underline font-medium">My Kitchen</Link>.
              </p>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-emerald-600/60 text-emerald-300 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                2
              </div>
              <p className="text-sm sm:text-base">
                <strong className="text-white">Watch expiry alerts:</strong> Items expiring within 2 days are highlighted in amber/red so nothing slips by.
              </p>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-emerald-600/60 text-emerald-300 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                3
              </div>
              <p className="text-sm sm:text-base">
                <strong className="text-white">Give it away:</strong> Click "Give this away" to open a pre-filled donation form without typing item details again.
              </p>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-emerald-600/60 text-emerald-300 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                4
              </div>
              <p className="text-sm sm:text-base">
                <strong className="text-white">Connect & nourish:</strong> Your post appears on the public <Link to="/browse" className="text-emerald-400 underline font-medium">Donations Board</Link> for neighbors to claim!
              </p>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-emerald-900/80 flex flex-wrap gap-4">
            <Link
              to="/track"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-sm transition-colors"
            >
              Start Logging Items
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
