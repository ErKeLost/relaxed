#!/usr/bin/env zx
import { fetch } from 'zx'

const requestUrl = 'https://npmmirror.com/sync/eslint-config-relaxed'
const requestUrlAlias = 'https://npmmirror.com/sync/@relaxed'

const pkgs = ['base', 'ts', '', 'vue', 'vue2']

const requestUrls = pkgs.map((item) => requestUrl + (item ? `-${item}` : ''))
const requestUrlAliass = pkgs.map((item) => requestUrlAlias + (item ? `-${item}` : ''))

await Promise.all(requestUrls.map((url) => fetch(url)))
await Promise.all(requestUrlAliass.map((url) => fetch(url)))
