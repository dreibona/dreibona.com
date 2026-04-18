/**
 * Robots.txt Endpoint
 * Dynamically generates the robots.txt file based on site configuration.
 */
import type { APIRoute } from 'astro';
import { siteConfig } from '@config/site';

export const GET: APIRoute = ({ site }) => {
  // URL Resolution: Prioritizes the production 'site' URL from Astro config,
  // falling back to siteConfig.url for local development or manual overrides.
  const baseUrl = site?.toString() || siteConfig.url;
  const normalizedBaseUrl = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
  const sitemapUrl = new URL('sitemap-index.xml', normalizedBaseUrl).href;

  // Directive Logic: Uses the global 'robots' toggle from siteConfig to
  // permit or deny search engine crawling site-wide.
  const content = `
User-agent: *
${siteConfig.robots ? 'Allow: /' : 'Disallow: /'}

Sitemap: ${sitemapUrl}
`.trim();

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      // Caching: Ensures the file is cached at the edge for 1 hour to optimize performance.
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
