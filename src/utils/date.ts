/* Date formatting utilities for consistent display across the site */
import { siteConfig } from '../config/site';

/* Shared formatter using site locale and UTC to avoid hydration mismatches */
const dateFormatter = new Intl.DateTimeFormat(siteConfig.locale, {
  timeZone: 'UTC',
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
});

/* Formats a Date object or string into a localized string */
export const formatDate = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return dateFormatter.format(d);
};
