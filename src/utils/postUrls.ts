/* ─────────────────────────────────────────────────────────────────────────── */
/* Utility functions for building post URLs consistently across the site       */
/* Centralizes post URL construction to ensure consistency and ease updates    */
/* ─────────────────────────────────────────────────────────────────────────── */

/* Builds the relative URL path for a post */
export const getPostUrl = (postId: string): string => `/lab/${postId}/`;

/* Builds the absolute URL for a post */
export const getPostAbsoluteUrl = (postId: string, baseUrl: string): string =>
  new URL(getPostUrl(postId), baseUrl).href;
