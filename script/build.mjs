import { resolve } from 'path'
import { buildPkg, resolvePkgDirs, resolvePkgJson } from './utils.mjs'
const ENTRY_NAME = 'index'

const buildPackages = () => {
  resolvePkgDirs().forEach((dir) => {
    const input = resolve(dir, ENTRY_NAME)
    const outDir = resolve(dir, OUT_DIR)
    const pkgJson = resolvePkgJson(dir)
    buildPkg({
      pkgJson,
      entryPoints: [input],
      outdir: outDir
    })
  })
}
buildSubPkgs()

export const OUT_DIR = 'dist'
