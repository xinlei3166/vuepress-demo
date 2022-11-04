import { pwaPlugin } from '@vuepress/plugin-pwa'
import { pwaPopupPlugin } from '@vuepress/plugin-pwa-popup'
import { searchPlugin } from '@vuepress/plugin-search'
import { registerComponentsPlugin } from '@vuepress/plugin-register-components'
import { getDirname } from '@vuepress/utils'
import { defineUserConfig, defaultTheme } from 'vuepress'
import { demoblockPlugin } from 'vuepress-plugin-demoblock-plus'
import path from 'path'
import navbar from './configs/navbar'
import sidebar from './configs/sidebar'

const __dirname = getDirname(import.meta.url)

export default defineUserConfig({
  title: 'VuePress',
  description: 'Life is short, Keep it simple.',
  head: [['link', { rel: 'icon', type: 'image/png', href: '/logo.png' }]],
  base: process.env.BASE || '/',
  port: 3000,
  theme: defaultTheme({
    repo: 'xinlei3166/vuepress-demo',
    docsDir: 'docs',
    docsBranch: 'master',

    darkMode: true,

    // navbar
    navbar,

    // sidebar
    sidebar,
    // sidebarDepth: 1,

    // page meta
    editLinkText: '在 GitHub 上编辑此页',
    lastUpdatedText: '上次更新',
    contributorsText: '贡献者',
  }),
  markdown: {
    // options for markdown-it-anchor
    anchor: { permalink: false, level: [1, 2] },

    // options for markdown-it-toc
    toc: { level: [1, 2] },

    extractHeaders: { level: [ 'h2', 'h3', 'h4' ] },
  },
  plugins: [
    // '@vuepress/plugin-back-to-top',
    // '@vuepress/plugin-active-header-links',
    pwaPlugin(),
    pwaPopupPlugin({
      message: '发现新内容可用',
      buttonText: '刷新',
    }),
    searchPlugin({ searchMaxSuggestions: 5 }),
    registerComponentsPlugin({
        componentsDir: path.resolve(__dirname, './components'),
    }),
    demoblockPlugin({customClass: 'demoblock-custom',
      // theme: 'github-light',
      cssPreprocessor: 'less',
      scriptReplaces: [
        { searchValue: /const ({ defineComponent as _defineComponent }) = Vue/g,
          replaceValue: 'const { defineComponent: _defineComponent } = Vue'
        }
      ]
    })
  ]
})


