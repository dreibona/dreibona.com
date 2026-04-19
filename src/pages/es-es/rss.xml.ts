/* ─────────────────────────────────────────────────────────────────────────── */
/* RSS Feed Generator — Spanish locale                                         */
/* ─────────────────────────────────────────────────────────────────────────── */

import rss from '@astrojs/rss';
import { getPublishedPosts } from '@/utils/routes';
import { toRSSItem } from '@/utils/rss';
import { siteConfig } from '@config/site';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = await getPublishedPosts('es-ES');

  return rss({
    title: siteConfig.name,
    description: siteConfig.description,
    site: context.site!,
    items: posts.map((p) => toRSSItem(p, 'es-ES')),
  });
}
