/* ─────────────────────────────────────────────────────────────────────────── */
/* Utility functions for building page titles consistently across the site     */
/* ─────────────────────────────────────────────────────────────────────────── */

/* Formats segment name: capitalize and replace hyphens with spaces */
const formatSegmentName = (segment: string): string =>
  segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');

/* Builds a title for post list pages with tag filtering and pagination */
export const buildPostListTitle = (tag?: string, page?: number, siteName?: string): string => {
  const baseTitle = tag ? `Posts with tag "${tag}"` : 'Lab';
  const pageNumber = page && page > 1 ? ` — Page ${page}` : '';
  return `${baseTitle}${pageNumber}${siteName ? ` — ${siteName}` : ''}`;
};

/* Builds a description for post list pages filtered by tag */
export const buildPostListDescription = (tag?: string): string => {
  return tag ? `All articles tagged with ${tag}.` : 'All published articles.';
};

/* Builds the display title for post list pages (with or without tag) */
/* Returns 'Lab' for main list or object with tag for filtered lists */
export const buildListPageTitle = (tag?: string): string | { tag: string } => {
  if (tag) {
    return { tag };
  }
  return 'Lab';
};

/* Builds the secondary content visibility flags for post list pages */
/* Determines which UI elements to show (total count and back link) */
export interface ListPageContent {
  showTotal: boolean;
  showBackLink: boolean;
}

export const buildListPageContent = (tag?: string): ListPageContent => {
  return {
    showTotal: !!tag,
    showBackLink: !!tag,
  };
};

/* Builds page title from metadata or URL context */
export const buildPageTitle = (
  metaTitle: string | undefined,
  pathname: string,
  siteName: string,
  siteTitle: string,
): string => {
  if (metaTitle && metaTitle !== siteTitle) return `${metaTitle} — ${siteName}`;
  const segment = pathname.split('/').filter(Boolean).at(-1);
  return segment ? `${formatSegmentName(segment)} — ${siteName}` : siteTitle;
};

/* Exports the segment formatter for use in other utilities */
export { formatSegmentName };
