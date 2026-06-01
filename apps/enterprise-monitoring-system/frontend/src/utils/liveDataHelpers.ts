/**
 * Generates a mock YYYY-MM-DD string relative to the current date.
 * Useful for keeping dashboards looking "live" instead of showing stale static mocks.
 */
export const getLiveDate = (daysOffset: number = 0): string => {
  const d = new Date();
  d.setDate(d.getDate() + daysOffset);
  return d.toISOString().split('T')[0];
};

/**
 * Generates a mock "Xm ago", "Xh ago", or "Xd ago" string.
 * Helpful for simulating live activity streams.
 */
export const getLiveTime = (minutesOffset: number = 0): string => {
  if (minutesOffset < 60) return `${minutesOffset}m ago`;
  const hours = Math.floor(minutesOffset / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
};

/**
 * Returns a specific formatted string like "May 2026" or "May 18" but mapped to the current month.
 */
export const getLiveMonthYear = (monthsOffset: number = 0): string => {
  const d = new Date();
  d.setMonth(d.getMonth() + monthsOffset);
  return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};
