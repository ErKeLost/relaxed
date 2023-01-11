const getBase = require('../../src/vitepress/config/baseConfig')
const path = require('path')
import { head } from './config/head'
import { nav } from './config/nav'
import { sidebar } from './config/sidebar'

module.exports = (async () => {
  const base = await getBase()
  return {
    ...base,

    vite: {
      ...base.vite,
      build: {
        minify: false
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '../../src'),
          '@vue/theme': path.join(__dirname, '../../src'),
          assets: path.join(__dirname, '../../assets')
        }
      }
    },

    lang: 'zh-CN',
    title: 'Value Online',
    lastUpdated: '最近更新',
    repo: 'https://github.com/ErKeLost/jzzx-docs',
    description: 'Value Online - The Value Online Front end architecture',
    head,
    themeConfig: {
      // logo: '/img/logo-vue.svg',

      algolia: {
        indexName: 'search_jzzx',
        appId: 'GRSW61FNDF',
        apiKey: '3e07faffcb963f53968c19521786d2d5'
      },

      carbonAds: {
        code: 'CEBDT27Y',
        placement: 'vuejsorg'
      },
      editLink: {
        repo: 'https://github.com/ErKeLost?tab=repositories',
        text: '在github 上编辑文档'
      },
      footer: {
        license: {
          text: 'MIT License',
          link: 'https://opensource.org/licenses/MIT'
        },
        copyright: `Copyright © 2022-${new Date().getFullYear()} Value Online - ERKELOST-ADNY`
      },

      socialLinks: [
        { icon: 'github', link: 'https://github.com/erkelost' }
        // { icon: 'twitter', link: 'https://twitter.com/vuejs' },
        // { icon: 'discord', link: 'https://discord.com/invite/HBherRA' }
      ],
      nav,
      sidebar
    },
    markdown: {
      config: (md) => {
        // md.use();
      }
    }
  }
})()
