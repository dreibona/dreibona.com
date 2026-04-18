/**
 * RSS Feed Generator
 * Dynamically builds the Atom/RSS feed for the site's blog posts.
 */
import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { siteConfig } from '@config/site';

export async function GET(context) {
  // Discovery: Retrieves all entries from the 'posts' collection.
  const posts = await getCollection('posts');

  // Privacy Filter: Ensures only finalized, non-draft content is included in the feed.
  const publishedPosts = posts.filter((post) => !post.data.draft);

  return rss({
    title: siteConfig.title,
    description: siteConfig.description,
    site: context.site,
    // Item Mapping: Transforms collection entries into the standard RSS item format.
    items: publishedPosts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.publishDate,
      description: post.data.description,
      link: `/lab/${post.id}/`,
    })),
  });
}
