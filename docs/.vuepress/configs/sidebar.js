module.exports = {
  '/api/': getAPISidebar(),
  '/plugins/': getPluginsSidebar(),
  '/components/': getComponentsSidebar(),
  '/guide/': getGuideSidebar()
}

function getComponentsSidebar() {
  return [
    {
      isGroup: true,
      text: '组件',
      children: [
        {
          text: 'Button 按钮',
          link: '/components/button.md'
        },
        {
          text: 'Tabs 标签页',
          link: '/components/tabs.md'
        },
        {
          text: 'Modal 对话框',
          link: '/components/modal.md'
        },
        {
          text: 'Vue 引用组件',
          link: '/components/vue.md'
        },
        {
          text: 'Vue Script',
          link: '/components/vue-script.md'
        }
      ]
    }
  ]
}

function getGuideSidebar() {
  return [
    {
      isGroup: true,
      text: '指南',
      children: [
        { text: '文档1', link:'/guide/button.md'},
        { text: '文档2', link:'/guide/modal.md'}
      ]
    },
    {
      isGroup: true,
      text: '教程',
      children: [
        { text: '教程1', link:'/guide/button.md'},
        { text: '教程2', link:'/guide/modal.md'}
      ]
    }
  ]
}

function getAPISidebar() {
  return [
    { text: 'API参考', link:'/api/index.md'}
  ]
}

function getPluginsSidebar() {
  return [
    { text: '插件', link:'/plugins/index.md'},
  ]
}
