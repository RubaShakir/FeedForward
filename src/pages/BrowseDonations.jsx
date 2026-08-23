import React, { useState, useEffect, useCallback } from 'react';
import { RefreshCw, Search, HeartHandshake, AlertCircle, Sparkles, MapPin, PackageOpen, ExternalLink, PlusCircle } from 'lucide-react';
import { fetchDonationsCSV } from '../utils/csvParser';
import DonationCard from '../components/DonationCard';
import { Link } from 'react-router-dom';

const FORM_LINK = 'https://docs.google.com/forms/d/e/1FAIpQLSeYr2_U-ZaaQVVYfzTWX3bKJz8NH2wkraxUgd3-Twqjf1Y06g/viewform?usp=pp_url';

export default function BrowseDonations() {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [lastUpdated, setLastUpdated] = useState(null);

  const loadDonations = useCallback(async (isManualRefresh = false) => {
    if (isManualRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }
    setError(null);

    try {
      const data = await fetchDonationsCSV();
      // Reverse to show most recent entries first if timestamps exist
      setDonations(data.reverse());
      setLastUpdated(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    } catch (err) {
      console.error('Failed to load donations:', err);
      setError(err.message || 'Unable to fetch donations from community sheet.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadDonations();
  }, [loadDonations]);

  // Filter donations by search query (item name, donor, location)
  const filteredDonations = donations.filter((item) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return (
      item.itemName.toLowerCase().includes(query) ||
      item.location.toLowerCase().includes(query) ||
      item.donorName.toLowerCase().includes(query) ||
      item.quantity.toLowerCase().includes(query)
    );
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-16">
      {/* Header Banner */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800">
              Community Board
            </span>
            <span className="text-xs text-slate-400 font-medium">Public Google Sheet Feed</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Community Food Donations
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Browse surplus food, bread, and groceries posted by local neighbors. Contact donors directly to claim items before they expire.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            onClick={() => loadDonations(true)}
            disabled={loading || refreshing}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-sm shadow-xs hover:border-emerald-300 transition-all disabled:opacity-50"
            title="Fetch latest data from Google Sheet"
          >
            <RefreshCw className={`w-4 h-4 text-emerald-600 ${refreshing ? 'animate-spin' : ''}`} />
            <span>{refreshing ? 'Refreshing...' : 'Refresh'}</span>
          </button>

          <a
            href={FORM_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm shadow-md shadow-emerald-600/20 hover:shadow-lg transition-all"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Donate Food</span>
          </a>
        </div>
      </div>

      {/* Search & Metadata Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        {/* Search Box */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by food item, donor, or location..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
            >
              Clear
            </button>
          )}
        </div>

        {/* Count & Status */}
        <div className="flex items-center gap-4 text-xs text-slate-500 font-medium">
          <span>
            Showing <strong className="text-slate-900">{filteredDonations.length}</strong> of{' '}
            <strong>{donations.length}</strong> donations
          </span>
          {lastUpdated && (
            <span className="hidden sm:inline text-slate-400">
              Last updated: {lastUpdated}
            </span>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      {loading ? (
        /* Loading Skeletons */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div
              key={n}
              className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs animate-pulse space-y-4"
            >
              <div className="flex justify-between items-start">
                <div className="h-6 bg-slate-200 rounded-md w-3/4"></div>
                <div className="h-5 bg-slate-200 rounded-md w-1/5"></div>
              </div>
              <div className="space-y-2 pt-2">
                <div className="h-4 bg-slate-100 rounded-md w-1/2"></div>
                <div className="h-4 bg-slate-100 rounded-md w-2/3"></div>
                <div className="h-4 bg-slate-100 rounded-md w-3/4"></div>
              </div>
            </div>
          ))}
        </div>
      ) : error ? (
        /* Error State */
        <div className="bg-white rounded-3xl p-10 text-center border border-rose-200 shadow-xs space-y-4 max-w-lg mx-auto">
          <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-slate-900">Failed to load donations</h2>
          <p className="text-sm text-slate-600">{error}</p>
          <button
            onClick={() => loadDonations(false)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm transition-all"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </button>
        </div>
      ) : filteredDonations.length === 0 ? (
        /* Empty State */
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-xs space-y-4 max-w-md mx-auto">
          <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
            <PackageOpen className="w-7 h-7" />
          </div>
          <h2 className="text-lg font-bold text-slate-900">No donations found</h2>
          <p className="text-sm text-slate-500">
            {searchQuery
              ? `No items match "${searchQuery}". Try clearing the search filter.`
              : 'There are currently no active community donations. Be the first to share food!'}
          </p>
          {searchQuery ? (
            <button
              onClick={() => setSearchQuery('')}
              className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-slate-200 transition-colors"
            >
              Reset Search
            </button>
          ) : (
            <Link
              to="/track"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm transition-all"
            >
              Log Food & Donate
            </Link>
          )}
        </div>
      ) : (
        /* Donations Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDonations.map((donation) => (
            <DonationCard key={donation.id} donation={donation} />
          ))}
        </div>
      )}
    </div>
  );
}
