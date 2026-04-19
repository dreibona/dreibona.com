import { copyFile } from 'node:fs/promises';
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

  i18n: {
    defaultLocale: 'en',
    locales: [
      'en',
      { path: 'es-es', codes: ['es-ES', 'es'] },
      { path: 'pt-br', codes: ['pt-BR', 'pt'] },
    ],
    routing: {
      prefixDefaultLocale: false,
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
    {
      /* Copies locale 404 pages to the correct path for Cloudflare Pages.     */
      /* Astro only special-cases the root 404.astro → dist/404.html.          */
      /* Locale variants are generated as dist/{locale}/404/index.html         */
      /* but Cloudflare Pages expects dist/{locale}/404.html.                  */
      name: 'locale-404',
      hooks: {
        'astro:build:done': async ({ dir }) => {
          const locales = ['es-es', 'pt-br'];
          await Promise.all(
            locales.map((loc) =>
              copyFile(new URL(`${loc}/404/index.html`, dir), new URL(`${loc}/404.html`, dir)),
            ),
          );
        },
      },
    },
    mdx({
      rehypePlugins: [
        rehypeSlug,
        [rehypeExternalLinks, { target: '_blank', rel: ['noopener', 'noreferrer'] }],
      ],
    }),
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: {
          en: 'en-US',
          'es-es': 'es-ES',
          'pt-br': 'pt-BR',
        },
      },
      lastmod: new Date(),
    }),
  ],
});
