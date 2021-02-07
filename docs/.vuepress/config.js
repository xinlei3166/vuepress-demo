const path = require('path')

module.exports = {
  title: 'VuePress',
  description: 'Life is short, Keep it simple.',
  head: [
    [
      'style',
      {},
      '.theme-default-content:not(.custom), .page-edit, .page-nav { max-width: unset !important; padding-left: 3rem !important; padding-right: 12.5rem !important; }'
    ]
  ],
  base: process.env.BASE || '/',
  port: 3000,
  themeConfig: {
    repo: 'xinlei3166/vuepress-demo',
    docsDir: 'docs',
    docsBranch: 'master',

    // editLinks: true,
    // editLinkText: 'Suggest changes to this page',
    lastUpdated: '上次更新',
    smoothScroll: true,
    sidebarDepth: 1,

    nav: [
      { text: '文档', link: '/guide/' },
      { text: '组件', link: '/components/button' },
      { text: 'API 参考', link: '/api/' },
      { text: '插件', link: '/plugins/' },
      {
        text: '更新日志',
        link:
          'https://github.com/xinlei3166/vuepress-demo'
      }
    ],

    sidebar: {
      '/api/': 'auto',
      '/plugins/': 'auto',
      '/components/': getComponentsSidebar(),
      '/guide/': getGuideSidebar()
    }
  },
  markdown: {
    // options for markdown-it-anchor
    anchor: { permalink: false, level: [1, 2] },

    // options for markdown-it-toc
    toc: { includeLevel: [1, 2] },

    extractHeaders: [ 'h2', 'h3', 'h4' ],

    extendMarkdown: (md) => {
      // use more markdown-it plugins
      // md.use(require('markdown-it-xxx'))
      const { demoBlock, demoCode } = require('./plugins/md-loader')
      demoBlock(md)
      demoCode(md) // 代码高亮的语言默认为vue，可传入第二个参数自定义语言 demoCode(md, 'html')
    }
  },
  extraWatchFiles: [
    './config.js',
    './enhanceApp.js'
  ],
  plugins: [
    '@vuepress/back-to-top',
    '@vuepress/active-header-links',
    [
      '@vuepress/last-updated',
      {
        transformer: (timestamp, lang) => {
          const dayjs = require('dayjs')
          dayjs.locale(lang)
          return dayjs(timestamp).format('YYYY-MM-DD HH:mm:ss')
        }
      }
    ],
    ['@vuepress/search', { searchMaxSuggestions: 5 }]
  ],
  alias: {
    'styles': path.resolve(__dirname, './styles')
  }
}

function getComponentsSidebar() {
  return [
    {
      title: '组件',
      collapsable: false,
      children: [
        {
          title: 'Button 按钮',
          path: '/components/button'
        },
        {
          title: 'Tabs 标签页',
          path: '/components/tabs'
        },
        {
          title: 'Modal 对话框',
          path: '/components/modal'
        }
      ]
    }
  ]
}

function getGuideSidebar() {
  return [
    {
      title: '指南',
      collapsable: false,
      children: [
        { title: '文档1', path:'/guide/button'},
        { title: '文档2', path:'/guide/modal'}
      ]
    },
    {
      title: '教程',
      collapsable: false,
      children: [
        { title: '教程1', path:'/guide/button'},
        { title: '教程2', path:'/guide/modal'}
      ]
    }
  ]
}
