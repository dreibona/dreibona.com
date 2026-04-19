/* ─────────────────────────────────────────────────────────────────────────── */
/* Utility functions for building post URLs consistently across the site       */
/* Centralizes post URL construction to ensure consistency and ease updates    */
/* ─────────────────────────────────────────────────────────────────────────── */

import type { Locale } from '@/i18n/locales';
import { getLocalizedPostUrl } from '@/i18n/utils';

/* Builds the relative URL path for a post, locale-aware */
export const getPostUrl = (postSlug: string, locale: Locale): string =>
  getLocalizedPostUrl(postSlug, locale);

/* Builds the absolute URL for a post, locale-aware */
export const getPostAbsoluteUrl = (postSlug: string, locale: Locale, baseUrl: string): string =>
  new URL(getPostUrl(postSlug, locale), baseUrl).href;
