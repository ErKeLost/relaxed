import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs-extra'
import { buildSync } from 'esbuild'

export const getDirname = (url = '') => dirname(fileURLToPath(url))

export const __dirname = getDirname(import.meta.url)

export const resolveRoot = (...paths) => resolve(__dirname, '..', ...paths)

export const resolvePackages = (...paths) => resolveRoot('packages', ...paths)

export const resolvePkgJson = (pkgDir) => resolveJson(resolve(pkgDir, 'package.json'))

export const resolveJson = (dir) => JSON.parse(fs.readFileSync(dir, { encoding: 'utf-8' }))

export const resolvePkgDirs = () => {
  const pkgDir = resolvePackages()
  const subPkgs = fs.readdirSync(pkgDir, { encoding: 'utf-8' }).map((name) => resolve(pkgDir, name))

  return subPkgs.filter((subPkgDir) => !resolvePkgJson(subPkgDir).private)
}

export const resolvePrivatePkgDirs = () => {
  const pkgDir = resolvePackages()
  const subPkgs = fs.readdirSync(pkgDir, { encoding: 'utf-8' }).map((name) => resolve(pkgDir, name))

  return subPkgs.filter((subPkgDir) => !!resolvePkgJson(subPkgDir).private)
}

export const resolveBanner = ({ name, description, version, homepage, license } = {}) => ({
  js: `\
\/*!
 * ${name} v${version}
 * ${description}
 *
 * ${homepage}
 *
 * Licensed under the ${license} license.
 *\/\
`
})

export const resolveExternalByPkgJson = (pkgJson) =>
  Object.keys(Object.assign({}, pkgJson.peerDependencies, pkgJson.dependencies))

/**
 * 构建包
 *
 * @param {import('esbuild').BuildOptions & { pkgJson?: Record<string, any> }} options
 */
export const buildPkg = (options = {}) => {
  const { pkgJson = {}, format = 'esm', ...buildOptions } = options

  buildSync({
    bundle: true,
    format,
    splitting: true,
    banner: resolveBanner(pkgJson),
    external: resolveExternalByPkgJson(pkgJson),
    minify: true,
    ...buildOptions
  })
}
