/* ─────────────────────────────────────────────────────────────────────────── */
/* Shared RSS feed utilities                                                    */
/* ─────────────────────────────────────────────────────────────────────────── */

import type { PostEntry } from './routes';
import { getPostUrl } from './postUrls';
import { extractPostSlug } from '@/i18n/utils';
import type { Locale } from '@/i18n/locales';

/* Transforms a post entry into an RSS feed item for the given locale */
export const toRSSItem = (post: PostEntry, locale: Locale) => ({
  title: post.data.title,
  pubDate: post.data.publishDate,
  description: post.data.description,
  link: getPostUrl(extractPostSlug(post.id), locale),
});
