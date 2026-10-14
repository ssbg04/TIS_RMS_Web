import { defineConfig } from 'astro/config';

export default defineConfig({
  vite: {
    build: {
      target: ['chrome80', 'safari14', 'firefox80'],
      cssTarget: ['chrome80', 'safari14', 'firefox80'],
    },
  },
});