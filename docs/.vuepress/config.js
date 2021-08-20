const path = require('path')
const navbar = require('./configs/navbar')
const sidebar = require('./configs/sidebar')

module.exports = {
  title: 'VuePress',
  description: 'Life is short, Keep it simple.',
  head: [['link', { rel: 'icon', type: 'image/png', href: '/logo.png' }]],
  base: process.env.BASE || '/',
  port: 3000,
  themeConfig: {
    repo: 'xinlei3166/vuepress-demo',
    docsDir: 'docs',
    docsBranch: 'master',

    darkMode: false,

    // navbar
    navbar,

    // sidebar
    sidebar,
    // sidebarDepth: 1,

    // page meta
    editLinkText: '在 GitHub 上编辑此页',
    lastUpdatedText: '上次更新',
    contributorsText: '贡献者',
  },
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
    ['@vuepress/plugin-debug'],
    ['@vuepress/plugin-pwa'],
    [
      '@vuepress/plugin-pwa-popup',
      {
        message: '发现新内容可用',
        buttonText: '刷新',
      },
    ],
    ['@vuepress/plugin-search', { searchMaxSuggestions: 5 }],
    [
      '@vuepress/plugin-register-components',
      {
        componentsDir: path.resolve(__dirname, './components'),
      },
    ],
    ['vuepress-plugin-demoblock-plus', {
      scriptImports: [
        { searchValue: /const ({ defineComponent as _defineComponent }) = Vue/g,
          replaceValue: 'const { defineComponent: _defineComponent } = Vue'
        }
      ]
    }]
  ]
}


