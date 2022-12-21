import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['index.ts'],
  // target: 'esnext',
  format: ['esm', 'cjs'],
  splitting: false,
  sourcemap: true,
  clean: true
})
