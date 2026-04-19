/* ─────────────────────────────────────────────────────────────────────────── */
/* Date formatting utilities for consistent display across the site            */
/* ─────────────────────────────────────────────────────────────────────────── */

import type { Locale } from '@/i18n/locales';

/* Maps locale code to Intl locale string */
const DATE_LOCALE_MAP: Record<Locale, string> = {
  en: 'en-GB',
  'es-ES': 'es-ES',
  'pt-BR': 'pt-BR',
};

/* Memoized formatters per locale to avoid re-creating Intl objects */
const formatters: Partial<Record<Locale, Intl.DateTimeFormat>> = {};

/* Formats a Date object or string into a localized string */
export const formatDate = (date: Date | string, locale: Locale = 'en'): string => {
  if (!formatters[locale]) {
    formatters[locale] = new Intl.DateTimeFormat(DATE_LOCALE_MAP[locale], {
      timeZone: 'UTC',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  }
  const d = typeof date === 'string' ? new Date(date) : date;
  return formatters[locale]!.format(d);
};
