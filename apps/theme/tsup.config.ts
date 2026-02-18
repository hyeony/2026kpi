import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  dts: true,
  clean: true,
  sourcemap: true,
  external: ['react', 'react-dom', '@test2/core'],
  onSuccess: 'pnpm exec tsx scripts/build-theme-css.ts',
});
