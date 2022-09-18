import { defineConfig } from 'tsup'
import Vue from 'unplugin-vue/esbuild'

export default defineConfig({
  entry: ['./index.ts'],
  target: 'esnext',
  format: ['esm', 'cjs', 'iife'],
  splitting: false,
  sourcemap: true,
  clean: true,
  watch: true,
  external: ['vue'],
  plugins: [Vue()]
})
