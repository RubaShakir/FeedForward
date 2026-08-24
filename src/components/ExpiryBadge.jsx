import React from 'react';
import { AlertCircle, Clock, CheckCircle2, AlertTriangle } from 'lucide-react';
import { getExpiryDetails } from '../utils/dateUtils';

export default function ExpiryBadge({ expiryDate, className = '' }) {
  const details = getExpiryDetails(expiryDate);

  if (details.status === 'unknown') {
    return (
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600 ${className}`}>
        <Clock className="w-3.5 h-3.5" />
        {details.label}
      </span>
    );
  }

  if (details.isExpired) {
    return (
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-100 text-rose-700 border border-rose-200 ${className}`}>
        <AlertCircle className="w-3.5 h-3.5" />
        {details.label}
      </span>
    );
  }

  if (details.isExpiringSoon) {
    return (
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-300 shrink-0 ${className}`}>
        <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
        {details.label}
      </span>
    );
  }


  if (details.status === 'moderate') {
    return (
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-800 border border-emerald-200 ${className}`}>
        <Clock className="w-3.5 h-3.5 text-emerald-600" />
        {details.label}
      </span>
    );
  }

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200 ${className}`}>
      <CheckCircle2 className="w-3.5 h-3.5 text-slate-500" />
      {details.label}
    </span>
  );
}
