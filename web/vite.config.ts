import { defineConfig } from 'vite';

export default defineConfig({
  server: { open: true },
  // satellite.js v7 ships a WASM variant with top-level await. Target esnext so
  // every esbuild pass (dev transform, dep scan, pre-bundle) accepts TLA, and
  // exclude it from pre-bundling so only the pure-JS propagation path is used.
  esbuild: { target: 'esnext' },
  optimizeDeps: {
    exclude: ['satellite.js'],
    esbuildOptions: { target: 'esnext' },
  },
  build: {
    target: 'esnext',
    rollupOptions: {
      external: (id: string) => id.startsWith('#wasm'),
    },
  },
});
