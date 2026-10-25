import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Menyisipkan CSS ke index.html agar tidak memblokir render.
function inlineCss() {
  return {
    name: 'inline-css',
    enforce: 'post',
    generateBundle(_, bundle) {
      const html = bundle['index.html'];
      if (!html) return;
      let src = String(html.source);
      for (const [name, asset] of Object.entries(bundle)) {
        if (!name.endsWith('.css')) continue;
        const file = name.split('/').pop();
        src = src.replace(new RegExp(`<link[^>]*href="[^"]*${file}"[^>]*>`), () => `<style>${asset.source}</style>`);
        delete bundle[name];
      }
      html.source = src;
    },
  };
}

export default defineConfig({
  plugins: [react(), inlineCss()],
  preview: { allowedHosts: true },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/setupTests.js',
    include: ['src/**/*.test.{js,jsx}'],
    coverage: {
      provider: 'v8',
      reporter: ['text-summary', 'lcov'],
      reportsDirectory: 'coverage',
      include: ['src/**/*.{js,jsx}'],
      exclude: ['src/main.jsx', 'src/setupTests.js', 'src/test-utils.jsx', 'src/**/*.test.{js,jsx}'],
    },
  },
  server: { proxy: { '/api': 'http://localhost:3001' } },
});