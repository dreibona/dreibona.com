/* RSS feed generator for blog posts */
import rss from '@astrojs/rss';
import { getPublishedPosts } from '@/utils/posts';
import { siteConfig } from '@config/site';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  /* Retrieve all published posts to include in the feed */
  const posts = await getPublishedPosts();

  return rss({
    title: siteConfig.title,
    description: siteConfig.description,
    site: context.site!,
    items: posts.map((p) => ({
      title: p.data.title,
      pubDate: p.data.publishDate,
      description: p.data.description,
      link: `/lab/${p.id}/`,
    })),
  });
}
