import { defineConfig } from 'tsup';

const buildPrefix = process.env.BUILD_PREFIX ?? 'ds';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  dts: true,
  clean: true,
  sourcemap: true,
  external: ['react', 'react-dom'],
  define: {
    'process.env.BUILD_PREFIX': JSON.stringify(buildPrefix),
  },
});
