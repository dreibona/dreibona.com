import { defineConfig, fontProviders } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import rehypeSlug from 'rehype-slug';

export default defineConfig({
  site: 'https://dreibona.com',
  fonts: [
    {
      name: 'Reddit Sans Condensed',
      cssVariable: '--font-sans',
      provider: fontProviders.fontsource(),
      weights: [400, 700],
    },
    {
      name: 'Reddit Mono',
      cssVariable: '--font-mono',
      provider: fontProviders.fontsource(),
      weights: [400],
      fallbacks: ['monospace'],
    },
  ],
  integrations: [
    mdx({
      rehypePlugins: [rehypeSlug],
    }),
    sitemap({
      lastmod: new Date(),
    }),
  ],
});
