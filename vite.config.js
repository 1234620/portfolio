import { defineConfig } from 'vite';

export default defineConfig({
  base: '/portfolio/',
  root: '.',
  build: {
    outDir: 'dist',
  },
  server: {
    port: 3000,
    open: true,
  },
});
