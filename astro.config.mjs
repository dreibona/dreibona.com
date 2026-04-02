import { defineConfig, fontProviders } from 'astro/config';

export default defineConfig({
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: 'Reddit Sans Condensed',
      cssVariable: '--font-reddit',
      weights: [300, 400, 700, 900],
      formats: ['woff2', 'woff'],
    },
  ],
});
