/* Dynamic robots.txt generation */
import type { APIRoute } from 'astro';
import { siteConfig } from '@config/site';

export const GET: APIRoute = ({ site }) => {
  /* Resolves base URL for sitemap link, prioritizing Astro config */
  const baseUrl = site?.toString() || siteConfig.url;
  const normalizedBaseUrl = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
  const sitemapUrl = new URL('sitemap-index.xml', normalizedBaseUrl).href;

  /* Sets crawl permissions based on global configuration */
  const content = `
User-agent: *
${siteConfig.robots ? 'Allow: /' : 'Disallow: /'}

Sitemap: ${sitemapUrl}
`.trim();

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      /* Cache response for 1 hour to optimize performance */
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
