import { defineConfig, fontProviders } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import rehypeSlug from 'rehype-slug';
import rehypeExternalLinks from 'rehype-external-links';

export default defineConfig({
  site: 'https://dreibona.com',
  output: 'static',
  trailingSlash: 'always',

  build: {
    format: 'directory',
  },

  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
    },
  },

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
      rehypePlugins: [
        rehypeSlug,
        [rehypeExternalLinks, { target: '_blank', rel: ['noopener', 'noreferrer'] }],
      ],
    }),
    sitemap({
      lastmod: new Date(),
    }),
  ],
});
