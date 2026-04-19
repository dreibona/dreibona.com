/* ─────────────────────────────────────────────────────────────────────────── */
/* RSS Feed Generator — Brazilian Portuguese locale                            */
/* ─────────────────────────────────────────────────────────────────────────── */

import rss from '@astrojs/rss';
import { getPublishedPosts } from '@/utils/routes';
import { siteConfig } from '@config/site';
import { toRSSItem } from '@/utils/rss';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = await getPublishedPosts('pt-BR');

  return rss({
    title: siteConfig.title,
    description: siteConfig.description,
    site: context.site!,
    items: posts.map((p) => toRSSItem(p, 'pt-BR')),
  });
}
