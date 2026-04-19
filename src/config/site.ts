/* ─────────────────────────────────────────────────────────────────────────── */
/* Global site configuration and constants                                     */
/* ─────────────────────────────────────────────────────────────────────────── */

export const siteConfig = {
  /* Brand and ownership information */
  name: 'dreibona',
  title: 'dreibona',
  description: 'dreibona.',
  author: 'dreibona',

  /* Base URL for link generation */
  url: 'https://dreibona.com',

  /* Default assets for SEO and social sharing */
  defaultImage: '/assets/cover.jpg',

  /* Global SEO visibility toggle */
  /* Can be overridden by the 'robot' property in post frontmatter */
  robots: true,
};

export type SiteConfig = typeof siteConfig;
