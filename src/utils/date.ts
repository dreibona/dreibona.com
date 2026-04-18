/**
 * Date Utilities
 * Provides centralized date formatting logic to ensure consistency across the site.
 */
import { siteConfig } from '../config/site';

/**
 * Intl Formatter:
 * Uses the global 'locale' from siteConfig to format dates.
 * Defaults to UTC timeZone to prevent hydration mismatches between server and client.
 */
const dateFormatter = new Intl.DateTimeFormat(siteConfig.locale, {
  timeZone: 'UTC',
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
});

export const formatDate = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return dateFormatter.format(d);
};
