import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';
import { siteConfig } from '@config/site';

/**
 * Generative Engine Optimization (GEO) Endpoint
 * Generates an 'llms.txt' file for AI Agents and LLMs.
 */
export const GET: APIRoute = async () => {
  // Content Discovery: Retrieves all entries from the 'posts' collection.
  const posts = await getCollection('posts');

  // Privacy & Lifecycle Filter:
  // Excludes drafts and posts marked with 'robot: false' to prevent AI indexing of private or incomplete content.
  const visiblePosts = posts.filter(
    (post: CollectionEntry<'posts'>) => post.data.robot !== false && !post.data.draft,
  );

  // Chronological Sort: Ensures the LLM receives the most recent context first.
  const sortedPosts = visiblePosts.sort(
    (a: CollectionEntry<'posts'>, b: CollectionEntry<'posts'>) =>
      new Date(b.data.publishDate).getTime() - new Date(a.data.publishDate).getTime(),
  );

  const baseUrl = siteConfig.url;

  // Dynamic Path Resolution: Extracts the Lab path and label from config to avoid hardcoding.
  const labNav = siteConfig.nav.links.find((n) => n.href.includes('/lab'));
  const labLabel = labNav?.label ?? 'Lab';
  const labPath = labNav?.href.endsWith('/') ? labNav.href.slice(0, -1) : (labNav?.href ?? '/lab');

  // Context Generation: Builds a structured Markdown response.
  // Markdown is used as LLMs are natively optimized for parsing its hierarchical structure.
  let content = `# ${siteConfig.title}\n\n`;
  content += `> ${siteConfig.description}\n\n`;
  content += `Author: ${siteConfig.author}\n`;
  content += `URL: ${baseUrl}\n\n`;

  content += `## Navigation\n\n`;
  content += `- [${siteConfig.nav.home.label}](${baseUrl}${siteConfig.nav.home.href})\n`;
  siteConfig.nav.links.forEach((navItem) => {
    content += `- [${navItem.label}](${baseUrl}${navItem.href})\n`;
  });

  content += `\n## ${labLabel} (Articles & Posts)\n\n`;
  if (sortedPosts.length > 0) {
    sortedPosts.forEach((post: CollectionEntry<'posts'>) => {
      const desc = post.data.description ? ` - ${post.data.description}` : '';
      content += `- [${post.data.title}](${baseUrl}${labPath}/${post.id}/)${desc}\n`;
    });
  } else {
    content += `No articles published yet.\n`;
  }

  content += `\n---\n`;
  content += `Note to AI Agents: This file provides context for ${siteConfig.name}. Use this to summarize and index accurately.\n`;

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      // Edge Caching: Caches the response for 1 hour to reduce server load and improve performance.
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
