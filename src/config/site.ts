/**
 * Global Site Configuration
 * Serves as the central source of truth for the site's identity and behavior.
 * Consumed by the SEO engine, RSS generation, robots/LLM endpoints, and UI components.
 */
export const siteConfig = {
  // Basic Info
  // Used for global metadata, JSON-LD identity, and automated text endpoints.
  name: 'dreibona',
  title: 'dreibona',
  description: 'dreibona.',
  author: 'dreibona',

  // URLs & Localization
  // Required for absolute URL generation in Sitemaps, OpenGraph, and RSS feeds.
  url: 'https://dreibona.com',
  // Defines the HTML lang attribute and configures native Intl.DateTimeFormat localization.
  locale: 'en-GB',

  // SEO & Social
  // Global fallback assets used when page-specific metadata is missing.
  defaultImage: '/assets/cover.jpg',
  defaultImageAlt: 'dreibona',

  // Navigation
  // Defines the primary site structure rendered by navigation and discovery components.
  nav: [
    { label: 'Lab', href: '/lab/' },
    { label: 'About', href: '/about/' },
    { label: 'Now', href: '/now/' },
  ],

  // Global SEO Control
  // Site-wide indexing toggle. 'true' enables discovery; 'false' injects 'noindex, nofollow'.
  // Can be overridden per-page via frontmatter 'robot' property.
  robots: true,
};

export type SiteConfig = typeof siteConfig;
