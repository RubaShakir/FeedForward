import React, { useState } from 'react';
import { MapPin, Clock, User, Phone, Calendar, Check, Copy, PackageCheck } from 'lucide-react';
import ExpiryBadge from './ExpiryBadge';

export default function DonationCard({ donation }) {
  const [copied, setCopied] = useState(false);
  const {
    itemName,
    quantity,
    donorName,
    pickupWindow,
    location,
    contact,
    expiryDate,
    timestamp,
  } = donation;

  const handleCopyContact = () => {
    if (!contact || contact === 'Not provided') return;
    navigator.clipboard.writeText(contact);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isPhone = /^[+\d\s()-]{6,}$/.test(contact.trim());
  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.trim());

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-emerald-200 transition-all duration-200 flex flex-col justify-between group">
      <div>
        {/* Top bar: Item name, quantity pill, and optional expiry badge */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors truncate">
              {itemName}
            </h3>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/80">
                <PackageCheck className="w-3.5 h-3.5" />
                {quantity}
              </span>
              {expiryDate && <ExpiryBadge expiryDate={expiryDate} />}
            </div>
          </div>
        </div>

        {/* Details list */}
        <div className="space-y-2 text-sm text-slate-600 mt-4 pt-3 border-t border-slate-100">
          {/* Donor */}
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="text-xs text-slate-400 font-medium">Donor:</span>
            <span className="font-semibold text-slate-800 truncate">{donorName}</span>
          </div>

          {/* Pickup Window */}
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="text-xs text-slate-400 font-medium">Pickup:</span>
            <span className="font-medium text-slate-700 truncate">{pickupWindow}</span>
          </div>

          {/* Rough Location */}
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="text-xs text-slate-400 font-medium">Location:</span>
            <span className="font-medium text-slate-700 truncate">{location}</span>
          </div>

          {/* Contact Details */}
          <div className="flex items-center justify-between gap-2 pt-1">
            <div className="flex items-center gap-2 min-w-0">
              <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="text-xs text-slate-400 font-medium">Contact:</span>
              {isPhone ? (
                <a
                  href={`tel:${contact.replace(/\s+/g, '')}`}
                  className="font-medium text-emerald-600 hover:text-emerald-700 underline truncate"
                >
                  {contact}
                </a>
              ) : isEmail ? (
                <a
                  href={`mailto:${contact}`}
                  className="font-medium text-emerald-600 hover:text-emerald-700 underline truncate"
                >
                  {contact}
                </a>
              ) : (
                <span className="font-medium text-slate-800 truncate">{contact}</span>
              )}
            </div>

            {contact && contact !== 'Not provided' && (
              <button
                onClick={handleCopyContact}
                title="Copy contact"
                className="p-1 text-slate-400 hover:text-emerald-600 rounded-md hover:bg-slate-50 transition-colors"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Footer Timestamp */}
      {timestamp && (
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3 text-slate-400" />
            Posted {timestamp}
          </span>
          <span className="text-emerald-600 font-medium">Verified Public Entry</span>
        </div>
      )}
    </div>
  );
}
