/* ─────────────────────────────────────────────────────────────────────────── */
/* Navigation — single source of truth for nav structure and translations      */
/* To add a nav link: add entry to NAV_LINKS + add the key to translations.ts */
/* ─────────────────────────────────────────────────────────────────────────── */

import type { Locale } from './locales';
import { useTranslations, type UIKey } from './translations';

export interface NavItem {
  label: string;
  href: string;
}

export interface NavConfig {
  home: NavItem;
  links: NavItem[];
}

/* href → translation key pairs — the only place to register a nav link */
const NAV_LINKS: ReadonlyArray<{ key: UIKey; href: string }> = [
  { key: 'nav.lab', href: '/lab/' },
  { key: 'nav.about', href: '/about/' },
  { key: 'nav.now', href: '/now/' },
];

/* Returns locale-resolved nav configuration with labels from translations */
export function getNav(locale: Locale): NavConfig {
  const t = useTranslations(locale);
  return {
    home: { label: t('nav.home'), href: '/' },
    links: NAV_LINKS.map(({ key, href }) => ({ label: t(key), href })),
  };
}
