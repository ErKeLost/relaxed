import * as esbuild from 'esbuild'

await esbuild.build({
  bundle: true,
  entryPoints: ['index.ts'],
  outfile: 'dist/index.js',
  format: 'esm',
  target: 'esnext',
  treeShaking: true,
  plugins: []
})
