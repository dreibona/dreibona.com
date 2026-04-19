/* ─────────────────────────────────────────────────────────────────────────── */
/* RSS Feed Generator                                                          */
/* ─────────────────────────────────────────────────────────────────────────── */

import rss from '@astrojs/rss';
import { getPublishedPosts, type PostEntry } from '@/utils/routes';
import { getPostUrl } from '@/utils/postUrls';
import { siteConfig } from '@config/site';
import type { APIContext } from 'astro';

/* Transforms a post entry into an RSS feed item */
export const toRSSItem = (post: PostEntry) => ({
  title: post.data.title,
  pubDate: post.data.publishDate,
  description: post.data.description,
  link: getPostUrl(post.id),
});

/* Generates RSS feed endpoint with published posts */
export async function GET(context: APIContext) {
  /* Retrieve all published posts to include in the feed */
  const posts = await getPublishedPosts();

  return rss({
    title: siteConfig.title,
    description: siteConfig.description,
    site: context.site!,
    /* Map posts to RSS items with required metadata */
    items: posts.map(toRSSItem),
  });
}
