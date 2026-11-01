import { defineConfig } from 'astro/config';

import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  vite: {
    build: {
      target: ['chrome80', 'safari14', 'firefox80'],
      cssTarget: ['chrome80', 'safari14', 'firefox80'],
    },
  },

  adapter: cloudflare(),
});