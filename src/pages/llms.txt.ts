/* ─────────────────────────────────────────────────────────────────────────── */
/* LLMs.txt Page Generator                                                     */
/* ─────────────────────────────────────────────────────────────────────────── */

import { getCollection } from 'astro:content';
import { byDateDesc } from '@/utils/routes';
import { getPostAbsoluteUrl } from '@/utils/postUrls';
import { siteConfig } from '@config/site';
import type { CollectionEntry } from 'astro:content';

/* Generates the llms.txt response containing site information and latest posts */
export async function GET() {
  /* Fetch all posts from the content collection */
  const posts = await getCollection('posts');

  /* Sort posts by publish date in descending order (newest first) */
  const sortedPosts = posts.sort(byDateDesc as any);

  /* Initialize content with site title and description */
  let content = `# ${siteConfig.title}\n\n`;
  content += `${siteConfig.description}\n\n`;

  /* Build Latest Posts section with link to lab and 5 most recent posts */
  const labNav = siteConfig.nav.links.find((n) => n.href.includes('/lab'));
  if (labNav) {
    content += `## Latest Posts\n\n`;
    content += `- [${labNav.label}](${siteConfig.url}${labNav.href})\n\n`;

    /* Add the 5 most recent posts as links */
    sortedPosts.slice(0, 5).forEach((post: CollectionEntry<'posts'>) => {
      content += `- [${post.data.title}](${getPostAbsoluteUrl(post.id, siteConfig.url)})\n`;
    });

    content += '\n';
  }

  /* Build Navigation section with home and all navigation links */
  content += `## Navigation\n\n`;
  content += `- [${siteConfig.nav.home.label}](${siteConfig.url}${siteConfig.nav.home.href})\n`;
  siteConfig.nav.links.forEach((item) => {
    content += `- [${item.label}](${siteConfig.url}${item.href})\n`;
  });

  /* Return plain text response with proper content-type header */
  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
