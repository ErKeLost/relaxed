import path from 'path'

import NodeResolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import babel from '@rollup/plugin-babel'
import json from '@rollup/plugin-json'
import ts from 'rollup-plugin-typescript2'
import { terser } from 'rollup-plugin-terser'

const name = 'Adny'

export default {
  input: 'src/index.ts',
  output: [
    {
      name,
      file: 'dist/utils.umd.min.js',
      format: 'umd'
    },
    {
      name,
      file: 'dist/utils.es.min.js',
      format: 'es'
    },
    {
      name,
      file: 'dist/utils.cjs.min.js',
      format: 'cjs'
    }
  ],
  plugins: [
    NodeResolve(),
    commonjs(),
    json(),
    ts({
      tsconfig: path.resolve(__dirname, 'tsconfig.json')
    }),
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**'
    }),
    terser()
  ]
}
