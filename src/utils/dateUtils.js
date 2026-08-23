/**
 * Utility functions for parsing and calculating expiry dates and countdowns.
 */

export function parseDate(dateStr) {
  if (!dateStr) return null;
  if (dateStr instanceof Date) return dateStr;

  const str = String(dateStr).trim();

  // Format: DD/MM/YYYY or DD/MM/YYYY HH:mm:ss
  const dmyMatch = str.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})(?:\s+(\d{1,2}):(\d{1,2})(?::(\d{1,2}))?)?/);
  if (dmyMatch) {
    const day = parseInt(dmyMatch[1], 10);
    const month = parseInt(dmyMatch[2], 10) - 1;
    const year = parseInt(dmyMatch[3], 10);
    const hour = dmyMatch[4] ? parseInt(dmyMatch[4], 10) : 23;
    const min = dmyMatch[5] ? parseInt(dmyMatch[5], 10) : 59;
    const sec = dmyMatch[6] ? parseInt(dmyMatch[6], 10) : 59;
    return new Date(year, month, day, hour, min, sec);
  }

  // Format: YYYY-MM-DD (Standard HTML date input)
  const ymdMatch = str.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (ymdMatch) {
    const year = parseInt(ymdMatch[1], 10);
    const month = parseInt(ymdMatch[2], 10) - 1;
    const day = parseInt(ymdMatch[3], 10);
    return new Date(year, month, day, 23, 59, 59);
  }

  const parsed = new Date(str);
  return isNaN(parsed.getTime()) ? null : parsed;
}

export function getExpiryDetails(expiryDate) {
  const targetDate = parseDate(expiryDate);
  if (!targetDate) {
    return {
      status: 'unknown',
      daysRemaining: null,
      label: 'No expiry date set',
      isExpiringSoon: false,
      isExpired: false,
      formattedDate: expiryDate || 'N/A',
    };
  }

  const now = new Date();

  // Normalize both dates to calendar day midnights for consistent day-count calculations
  const todayMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  const targetMidnight = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate()).getTime();

  const diffCalendarDays = Math.round((targetMidnight - todayMidnight) / (1000 * 60 * 60 * 24));

  const isExpired = diffCalendarDays < 0;
  // Expiring soon if today (0), tomorrow (1), or in 2 days (2)
  const isExpiringSoon = !isExpired && diffCalendarDays <= 2;

  let status = 'fresh';
  let label = '';

  if (diffCalendarDays < 0) {
    status = 'expired';
    const absDays = Math.abs(diffCalendarDays);
    if (absDays === 1) {
      label = 'Expired yesterday';
    } else {
      label = `Expired ${absDays} days ago`;
    }
  } else if (diffCalendarDays === 0) {
    status = 'critical';
    label = 'Expires today!';
  } else if (diffCalendarDays === 1) {
    status = 'critical';
    label = 'Expires tomorrow (1 day left)';
  } else if (diffCalendarDays === 2) {
    status = 'critical';
    label = 'Expires in 2 days';
  } else if (diffCalendarDays <= 5) {
    status = 'moderate';
    label = `Expires in ${diffCalendarDays} days`;
  } else {
    status = 'fresh';
    label = `Expires in ${diffCalendarDays} days`;
  }

  const formattedDate = targetDate.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return {
    status,
    daysRemaining: diffCalendarDays,
    label,
    isExpiringSoon,
    isExpired,
    formattedDate,
    targetDate,
  };
}
