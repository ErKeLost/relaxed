import * as esbuild from 'esbuild'

await esbuild.build({
  bundle: true,
  entryPoints: ['src/index.ts'],
  outfile: 'dist/index.js',
  format: 'cjs',
  platform: 'browser',
  target: 'node16',
  treeShaking: true,
  plugins: []
})
