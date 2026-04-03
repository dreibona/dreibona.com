import { defineConfig, fontProviders } from 'astro/config';

export default defineConfig({
  fonts: [
    {
      name: 'Reddit Sans Condensed',
      cssVariable: '--font-sans',
      provider: fontProviders.fontsource(),
      weights: [400, 900],
    },
    {
      name: 'Reddit Mono',
      cssVariable: '--font-mono',
      provider: fontProviders.fontsource(),
      weights: [400],
      fallbacks: ['monospace'],
    },
  ],
});
