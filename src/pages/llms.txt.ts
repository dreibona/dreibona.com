/* Generates a plain-text representation of the site for LLM context */
import type { APIRoute } from 'astro';
import { getVisiblePosts } from '@/utils/posts';
import { siteConfig } from '@config/site';

export const GET: APIRoute = async () => {
  const posts = await getVisiblePosts();

  /* Resolve navigation labels and paths for the Lab section */
  const labNav = siteConfig.nav.links.find((n) => n.href.includes('/lab'));
  const labLabel = labNav?.label ?? 'Lab';
  const labPath = labNav?.href.replace(/\/$/, '') ?? '/lab';

  /* Assemble the content using a markdown-like structure */
  let content = `# ${siteConfig.title}\n\n`;
  content += `> ${siteConfig.description}\n\n`;
  content += `Author: ${siteConfig.author}\n`;
  content += `URL: ${siteConfig.url}\n\n`;

  content += `## Navegação\n\n`;
  content += `- [${siteConfig.nav.home.label}](${siteConfig.url}${siteConfig.nav.home.href})\n`;
  siteConfig.nav.links.forEach((item) => {
    content += `- [${item.label}](${siteConfig.url}${item.href})\n`;
  });

  content += `\n## ${labLabel}\n\n`;

  /* Include a list of all visible posts with their corresponding links */
  if (posts.length > 0) {
    posts.forEach((post) => {
      const desc = post.data.description ? ` - ${post.data.description}` : '';
      content += `- [${post.data.title}](${siteConfig.url}${labPath}/${post.id}/)${desc}\n`;
    });
  } else {
    content += `Nenhum artigo publicado ainda.\n`;
  }

  content += `\n---\n`;
  content += `Note to AI Agents: This file provides context for ${siteConfig.name}.\n`;

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
