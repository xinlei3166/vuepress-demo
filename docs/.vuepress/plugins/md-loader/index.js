// 参考 https://github.com/element-plus/element-plus/blob/dev/website/md-loader/index.js
// 参考 https://github.com/calebman/vuepress-plugin-demo-container/blob/master/src/index.js
const mdContainer = require('markdown-it-container')

exports.useDemoBlock = md => {
  md.use(mdContainer, 'demo', {
    validate (params) {
      return params.trim().match(/^demo\s*(.*)$/)
    },
    render (tokens, idx) {
      // const m = tokens[idx].info.trim().match(/^demo\s*(.*)$/)
      if (tokens[idx].nesting === 1) {
        // const description = m && m.length > 1 ? m[1] : ''
        const content = tokens[idx + 1].type === 'fence' ? tokens[idx +
        1].content : ''
        return `<demo-code-block sourceCode="${md.utils.escapeHtml(content)}">${content ? `<!--vue-demo:${content}:vue-demo-->` : ''}`
      }
      return '</demo-code-block>'
    }
  })
}

exports.useDemoCode = (md, lang = 'vue') => {
  const defaultRender = md.renderer.rules.fence
  md.renderer.rules.fence = (tokens, idx, options, env, self) => {
    const token = tokens[idx]
    // 判断该 fence 是否在 :::demo 内
    const prevToken = tokens[idx - 1]
    const isInDemoContainer = prevToken && prevToken.nesting === 1 &&
      prevToken.info.trim().match(/^demo\s*(.*)$/)
    if (token.info.trim() === lang && isInDemoContainer) {
      const m = prevToken.info.trim().match(/^demo\s*(.*)$/)
      const description = m && m.length > 1 ? m[1] : ''
      return `
        ${description ? `<template #description>
          <div>${md.renderInline(description)}</div>
        </template>` : ''}
        <template #highlight>
          <div v-pre class='language-${lang}'>
            ${md.options.highlight(token.content, lang) || ''}
          </div>
        </template>`
    }
    return defaultRender(tokens, idx, options, env, self)
  }
}

const renderDemoBlock = require('./render')
const scriptRegexp = /^.*(<script>.*<\/script>).*$/s
const styleRegexp = /^.*(<style>.*<\/style>).*$/s

exports.useDemoRender = md => {
  const render = md.render
  md.render = (...args) => {
    let result = render.call(md, ...args)
    const arr = args
    const startTag = '<!--vue-demo:'
    const endTag = ':vue-demo-->'
    if (result.indexOf(startTag) !== -1 && result.indexOf(endTag) !== -1) {
      const { template, script, style } = renderDemoBlock(result)
      result = template
      if (!arr[1].hoistedTags) {
        arr[1].hoistedTags = []
      }
      arr[1].hoistedTags.push(script)
      arr[1].hoistedTags.push(style)
    }
    return result
  }
}

