import React, { useState, useEffect } from 'react';
import { PlusCircle, Trash2, ExternalLink, AlertTriangle, CheckCircle, Clock, Utensils, Sparkles, Filter, X } from 'lucide-react';
import { getExpiryDetails } from '../utils/dateUtils';
import ExpiryBadge from '../components/ExpiryBadge';

const LOCAL_STORAGE_KEY = 'feedforward_kitchen_items';

const GOOGLE_FORM_BASE = 'https://docs.google.com/forms/d/e/1FAIpQLSeYr2_U-ZaaQVVYfzTWX3bKJz8NH2wkraxUgd3-Twqjf1Y06g/viewform?usp=pp_url';

export default function MyKitchen() {
  const [isFormOpen, setIsFormOpen] = useState(true);
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to parse kitchen items from localStorage:', e);
    }
    // Default initial sample items if empty
    const today = new Date();
    const addDays = (d) => {
      const target = new Date();
      target.setDate(today.getDate() + d);
      return target.toISOString().split('T')[0];
    };

    return [
      { id: '1', name: 'Fresh Milk (Whole)', quantity: '1 Liter', expiryDate: addDays(1) },
      { id: '2', name: 'Artisan Sourdough Loaf', quantity: '2 loaves', expiryDate: addDays(2) },
      { id: '3', name: 'Organic Apples', quantity: '6 pcs', expiryDate: addDays(5) },
    ];
  });

  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [filter, setFilter] = useState('all'); // all | expiring | fresh
  const [successToast, setSuccessToast] = useState('');

  // Persist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('Failed to save to localStorage:', e);
    }
  }, [items]);

  const handleAddItem = (e) => {
    e.preventDefault();
    if (!itemName.trim() || !quantity.trim() || !expiryDate) {
      return;
    }

    const newItem = {
      id: `item-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      name: itemName.trim(),
      quantity: quantity.trim(),
      expiryDate,
    };

    setItems((prev) => [newItem, ...prev]);
    setItemName('');
    setQuantity('');
    setExpiryDate('');

    showToast(`Added "${newItem.name}" to kitchen!`);
  };

  const handleDeleteItem = (id, name) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
    showToast(`Removed "${name}"`);
  };

  const showToast = (msg) => {
    setSuccessToast(msg);
    setTimeout(() => {
      setSuccessToast('');
    }, 2500);
  };

  /**
   * Generates the pre-filled Google Form URL and opens it in a new tab.
   * entry.713133488 = [ITEM_NAME]
   * entry.1065046570 = [QUANTITY]
   */
  const handleGiveAway = (item) => {
    const encodedItemName = encodeURIComponent(item.name);
    const encodedQuantity = encodeURIComponent(item.quantity);
    const formUrl = `${GOOGLE_FORM_BASE}&entry.713133488=${encodedItemName}&entry.1065046570=${encodedQuantity}`;

    window.open(formUrl, '_blank', 'noopener,noreferrer');
  };

  // Count items expiring within 2 days (or expired)
  const expiringSoonCount = items.filter((item) => {
    const details = getExpiryDetails(item.expiryDate);
    return details.isExpiringSoon || details.isExpired;
  }).length;

  // Filtered items list
  const filteredItems = items.filter((item) => {
    const details = getExpiryDetails(item.expiryDate);
    if (filter === 'expiring') {
      return details.isExpiringSoon || details.isExpired;
    }
    if (filter === 'fresh') {
      return !details.isExpiringSoon && !details.isExpired;
    }
    return true;
  });

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800">
              Personal Inventory
            </span>
            <span className="text-xs text-slate-400 font-medium">Stored in Browser</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            My Kitchen Tracker
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-xl">
            Log your groceries, monitor countdowns to expiry, and turn surplus food into community donations with one click.
          </p>
        </div>

        {/* Expiring Alert Pill */}
        {expiringSoonCount > 0 ? (
          <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 shrink-0">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-amber-800">Attention Needed</p>
              <p className="text-sm font-bold">
                {expiringSoonCount} {expiringSoonCount === 1 ? 'item' : 'items'} expiring soon!
              </p>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 shrink-0">
            <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700">Kitchen Status</p>
              <p className="text-sm font-bold">All items in good shape</p>
            </div>
          </div>
        )}
      </div>

      {/* Main Grid: Add Item Form & Items List */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Column - Collapsible */}
        {isFormOpen ? (
          <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs relative lg:sticky lg:top-24 lg:self-start z-10 animate-fade-in">
            {/* Header with Title and Top-Right Close (X) Button */}
            <div className="flex items-center justify-between gap-2 mb-1">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <PlusCircle className="w-5 h-5 text-emerald-600" />
                Log Food Item
              </h2>
              <button
                type="button"
                onClick={() => setIsFormOpen(false)}
                aria-label="Close form"
                title="Close form"
                className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-slate-500 mb-5">
              Add any perishable or pantry item to start tracking its expiry.
            </p>

            <form onSubmit={handleAddItem} className="space-y-4">
              {/* Item Name */}
              <div>
                <label htmlFor="itemName" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Item Name <span className="text-rose-500">*</span>
                </label>
                <input
                  id="itemName"
                  type="text"
                  required
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                  placeholder="e.g. Sliced Bread, Greek Yogurt, Apples"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all text-sm"
                />
              </div>

              {/* Quantity */}
              <div>
                <label htmlFor="quantity" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Quantity <span className="text-rose-500">*</span>
                </label>
                <input
                  id="quantity"
                  type="text"
                  required
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="e.g. 2 loaves, 500g, 3 packs"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all text-sm"
                />
              </div>

              {/* Expiry Date */}
              <div>
                <label htmlFor="expiryDate" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Expiry Date <span className="text-rose-500">*</span>
                </label>
                <input
                  id="expiryDate"
                  type="date"
                  required
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all text-sm"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm shadow-md shadow-emerald-600/20 hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
              >
                <PlusCircle className="w-4 h-4" />
                Add to Kitchen
              </button>
            </form>

            {/* Tips Info Box */}
            <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-slate-500 flex items-start gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <p>
                Items with <strong>≤ 2 days left</strong> are automatically highlighted. Click "Give this away" anytime to share with your neighbors!
              </p>
            </div>
          </div>
        ) : (
          /* Collapsed Reopen Button */
          <div className="lg:col-span-5 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs relative lg:sticky lg:top-24 lg:self-start z-10 animate-fade-in">
            <button
              type="button"
              onClick={() => setIsFormOpen(true)}
              className="w-full py-3 px-4 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-semibold text-sm border border-emerald-200 transition-all flex items-center justify-center gap-2 group shadow-xs"
            >
              <PlusCircle className="w-4 h-4 text-emerald-600 group-hover:scale-110 transition-transform" />
              <span>+ Log a new item</span>
            </button>
          </div>
        )}

        {/* List Column (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Controls / Filter Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200">
            <div className="flex items-center gap-2">
              <Utensils className="w-4 h-4 text-emerald-600" />
              <span className="text-sm font-bold text-slate-800">
                Tracked Items ({items.length})
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-slate-400" />
              <div className="inline-flex rounded-lg bg-slate-100 p-0.5 text-xs font-semibold">
                <button
                  onClick={() => setFilter('all')}
                  className={`px-2.5 py-1 rounded-md transition-colors ${
                    filter === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  All ({items.length})
                </button>
                <button
                  onClick={() => setFilter('expiring')}
                  className={`px-2.5 py-1 rounded-md transition-colors ${
                    filter === 'expiring' ? 'bg-amber-100 text-amber-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Expiring ({expiringSoonCount})
                </button>
                <button
                  onClick={() => setFilter('fresh')}
                  className={`px-2.5 py-1 rounded-md transition-colors ${
                    filter === 'fresh' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Fresh ({items.length - expiringSoonCount})
                </button>
              </div>
            </div>
          </div>

          {/* Items List */}
          {filteredItems.length === 0 ? (
            <div className="bg-white rounded-3xl p-10 text-center border border-slate-200 space-y-3">
              <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
                <Utensils className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-800">No items found</h3>
              <p className="text-sm text-slate-500 max-w-sm mx-auto">
                {filter !== 'all'
                  ? `There are no items matching the "${filter}" filter.`
                  : 'Your kitchen inventory is currently empty. Use the form on the left to add items.'}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredItems.map((item) => {
                const details = getExpiryDetails(item.expiryDate);
                const isUrgent = details.isExpiringSoon || details.isExpired;

                return (
                  <div
                    key={item.id}
                    className={`relative isolate overflow-hidden bg-white rounded-2xl p-4 sm:p-5 border transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                      isUrgent
                        ? 'border-amber-300/80 bg-amber-50/20 shadow-xs ring-1 ring-amber-300/40'
                        : 'border-slate-200 shadow-xs hover:border-emerald-200'
                    }`}
                  >
                    {/* Item Information */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h3 className="text-base font-bold text-slate-900 truncate">
                          {item.name}
                        </h3>
                        <span className="px-2 py-0.5 rounded-md text-xs font-semibold bg-slate-100 text-slate-700">
                          {item.quantity}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 mt-2">
                        <ExpiryBadge expiryDate={item.expiryDate} />
                        <span className="text-xs text-slate-400">
                          Date: {details.formattedDate}
                        </span>
                      </div>
                    </div>

                    {/* Actions: Give this away + Delete */}
                    <div className="flex items-center gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                      {/* Give this away CTA */}
                      <button
                        onClick={() => handleGiveAway(item)}
                        className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs hover:shadow-md transition-all active:scale-95 group"
                        title="Open Google Form with item name and quantity pre-filled"
                      >
                        <span>Give this away</span>
                        <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </button>

                      {/* Delete Button */}
                      <button
                        onClick={() => handleDeleteItem(item.id, item.name)}
                        className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                        title="Remove item"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Floating Toast Notification */}
      {successToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2 text-sm font-medium animate-slide-up border border-slate-800">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <span>{successToast}</span>
        </div>
      )}
    </div>
  );
}
