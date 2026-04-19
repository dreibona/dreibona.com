/* ─────────────────────────────────────────────────────────────────────────── */
/* RSS Feed Generator — English (default locale)                               */
/* ─────────────────────────────────────────────────────────────────────────── */

import rss from '@astrojs/rss';
import { getPublishedPosts } from '@/utils/routes';
import { toRSSItem } from '@/utils/rss';
import { siteConfig } from '@config/site';
import type { APIContext } from 'astro';

/* Generates RSS feed endpoint with published English posts */
export async function GET(context: APIContext) {
  const posts = await getPublishedPosts('en');

  return rss({
    title: siteConfig.title,
    description: siteConfig.description,
    site: context.site!,
    items: posts.map((p) => toRSSItem(p, 'en')),
  });
}
