/* ─────────────────────────────────────────────────────────────────────────── */
/* Locale constants and types                                                   */
/* ─────────────────────────────────────────────────────────────────────────── */

export const LOCALES = ['en', 'es-ES', 'pt-BR'] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'en';

/* Maps locale code → URL path segment (lowercase for SEO-friendly URLs) */
export const LOCALE_PATHS: Record<Locale, string> = {
  en: '',
  'es-ES': 'es-es',
  'pt-BR': 'pt-br',
};

/* Display labels for the language switcher */
export const LOCALE_LABELS: Record<Locale, string> = {
  en: 'EN',
  'es-ES': 'ES',
  'pt-BR': 'PT',
};

/* Maps locale code to Open Graph locale format — single source of truth */
export const OG_LOCALE_MAP: Record<Locale, string> = {
  en: 'en_US',
  'es-ES': 'es_ES',
  'pt-BR': 'pt_BR',
};
