/* ─────────────────────────────────────────────────────────────────────────── */
/* i18n URL and locale utility functions                                        */
/* ─────────────────────────────────────────────────────────────────────────── */

import { getRelativeLocaleUrl } from 'astro:i18n';
import type { Locale } from './locales';
import { DEFAULT_LOCALE, LOCALE_PATHS } from './locales';

/* Generates a locale-prefixed URL for a post */
export function getLocalizedPostUrl(postSlug: string, locale: Locale): string {
  const path = `/lab/${postSlug}/`;
  return locale === DEFAULT_LOCALE ? path : getRelativeLocaleUrl(locale, path);
}

/* Generates a locale-prefixed URL for a tag page */
export function getLocalizedTagUrl(tag: string, locale: Locale): string {
  const path = `/lab/tags/${tag}/`;
  return locale === DEFAULT_LOCALE ? path : getRelativeLocaleUrl(locale, path);
}

/* Generates a locale-prefixed URL for a static page */
export function getLocalizedPageUrl(pagePath: string, locale: Locale): string {
  return locale === DEFAULT_LOCALE ? pagePath : getRelativeLocaleUrl(locale, pagePath);
}

/* Extracts the slug from a post ID that includes locale prefix */
/* e.g. 'en/post-1' → 'post-1', 'es-ES/post-1' → 'post-1' */
export function extractPostSlug(postId: string): string {
  const parts = postId.split('/');
  return parts.length > 1 ? parts.slice(1).join('/') : postId;
}

/* Maps lowercase content ID prefix → BCP 47 locale code */
/* Astro's Content Layer normalizes directory names to lowercase in IDs */
/* e.g. 'es-ES/' folder → prefix 'es-es' in IDs */
const PREFIX_TO_LOCALE: Record<string, Locale> = {
  en: 'en',
  'es-es': 'es-ES',
  'pt-br': 'pt-BR',
};

/* Extracts the locale code from a post ID */
/* e.g. 'en/post-1' → 'en', 'es-es/post-1' → 'es-ES', 'pt-br/post-1' → 'pt-BR' */
export function extractLocaleFromId(postId: string): Locale {
  const prefix = postId.split('/')[0].toLowerCase();
  return PREFIX_TO_LOCALE[prefix] ?? DEFAULT_LOCALE;
}

/* Strips the locale prefix from a URL pathname */
/* e.g. '/es-es/about/' → '/about/', '/about/' → '/about/' */
export function getCanonicalPath(pathname: string): string {
  for (const locPath of Object.values(LOCALE_PATHS)) {
    if (locPath && (pathname.startsWith(`/${locPath}/`) || pathname === `/${locPath}`)) {
      return pathname.slice(locPath.length + 1) || '/';
    }
  }
  return pathname;
}
