/* ─────────────────────────────────────────────────────────────────────────── */
/* Global site configuration and constants                                     */
/* ─────────────────────────────────────────────────────────────────────────── */

/* Navigation item interface */
export interface NavItem {
  label: string;
  href: string;
}

/* ─────────────────────────────────────────────────────────────────────────── */
/* Main configuration object for the site                                      */
/* ─────────────────────────────────────────────────────────────────────────── */
export const siteConfig = {
  /* Brand and ownership information */
  name: 'dreibona',
  title: 'dreibona',
  description: 'dreibona.',
  author: 'dreibona',

  /* Base URL for link generation and localization settings */
  url: 'https://dreibona.com',
  locale: 'en-GB',

  /* Default assets for SEO and social sharing */
  defaultImage: '/assets/cover.jpg',
  defaultImageAlt: 'dreibona',

  /* Global SEO visibility toggle */
  /* Can be overridden by the 'robot' property in post frontmatter */
  robots: true,

  /* Navigation structure */
  nav: {
    home: {
      label: 'db',
      href: '/',
    },
    links: [
      { label: 'Lab', href: '/lab/' },
      { label: 'About', href: '/about/' },
      { label: 'Now', href: '/now/' },
    ] as NavItem[],
  },
};

export type SiteConfig = typeof siteConfig;
