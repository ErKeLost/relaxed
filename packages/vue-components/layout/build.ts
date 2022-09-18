import { build } from 'esbuild'
import Vue from 'unplugin-vue/esbuild'
;(async () => {
  await build({
    entryPoints: ['index.ts'],
    bundle: true,
    outfile: 'dist/index.js',
    format: 'esm',
    treeShaking: true,
    define: {
      'process.env.NODE_ENV': JSON.stringify('production')
    },
    plugins: [Vue()]
  })
})()
