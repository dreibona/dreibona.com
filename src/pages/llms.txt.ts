/* ─────────────────────────────────────────────────────────────────────────── */
/* LLMs.txt Page Generator                                                     */
/* ─────────────────────────────────────────────────────────────────────────── */

import { getPublishedPosts } from '@/utils/routes';
import { getPostAbsoluteUrl } from '@/utils/postUrls';
import { extractPostSlug } from '@/i18n/utils';
import { siteConfig } from '@config/site';
import { getNav } from '@/i18n/nav';

/* Generates the llms.txt response containing site information and latest English posts */
export async function GET() {
  const nav = getNav('en');
  const enPosts = await getPublishedPosts('en');

  /* Initialize content with site title and description */
  let content = `# ${siteConfig.title}\n\n`;
  content += `${siteConfig.description}\n\n`;

  /* Build Latest Posts section with link to lab and 5 most recent posts */
  const labNav = nav.links.find((n) => n.href.includes('/lab'));
  if (labNav) {
    content += `## Latest Posts\n\n`;
    content += `- [${labNav.label}](${siteConfig.url}${labNav.href})\n\n`;

    /* Add the 5 most recent English posts as links */
    enPosts.slice(0, 5).forEach((post) => {
      content += `- [${post.data.title}](${getPostAbsoluteUrl(extractPostSlug(post.id), 'en', siteConfig.url)})\n`;
    });

    content += '\n';
  }

  /* Build Navigation section with home and all navigation links */
  content += `## Navigation\n\n`;
  content += `- [${nav.home.label}](${siteConfig.url}${nav.home.href})\n`;
  nav.links.forEach((item) => {
    content += `- [${item.label}](${siteConfig.url}${item.href})\n`;
  });

  /* Return plain text response with proper content-type header */
  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
