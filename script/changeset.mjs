import { resolveJson, resolvePkgJson, resolvePrivatePkgDirs, resolveRoot } from './utils.mjs'
import fs from 'fs-extra'

const CHANGESET_CONFIG = resolveRoot('.changeset/config.json')

const updateChangesetIgnore = () => {
  const privatePkgs = resolvePrivatePkgDirs()
  const privatePkgNames = privatePkgs.map((dir) => resolvePkgJson(dir).name)

  const changesetConfig = resolveJson(CHANGESET_CONFIG)
  changesetConfig.ignore = privatePkgNames

  fs.writeFileSync(CHANGESET_CONFIG, JSON.stringify(changesetConfig, null, 2), { encoding: 'utf-8' })
}

updateChangesetIgnore()
