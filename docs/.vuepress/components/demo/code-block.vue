<template>
  <div
    :class="['demo-block', blockClass, customClass ? customClass : '', { hover } ]"
    @mouseenter="hover=true"
    @mouseleave="hover=false">
    <div class="source">
      <slot/>
    </div>
    <div class="meta" ref="meta">
      <div v-if="$slots.description" class="description" ref="description">
        <slot name="description"/>
      </div>
      <div class="highlight" ref="highlight">
        <slot name="highlight"/>
      </div>
    </div>
    <div
        class="demo-block-control"
        ref="control"
        :class="{ 'is-fixed': fixedControl }"
        @click="isExpanded=!isExpanded">
      <transition name="arrow-slide">
        <i :class="['iconfont', 'control-icon', { 'icon-caret-down': !isExpanded, 'icon-caret-up': isExpanded, 'hovering': hover }]"></i>
      </transition>
      <transition name="text-slide">
        <span v-show="hover" class="control-text">{{ controlText }}</span>
      </transition>
      <div class="control-button-wrap">
        <transition name="text-slide">
          <span v-show="isExpanded" class="control-button copy-code" @click.stop='onCopy'>复制代码片段</span>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import { nextTick } from 'vue'
import clipboardCopy from 'clipboard-copy'
import { stripTemplate, stripScript, stripStyle } from '../../plugins/md-loader/assist'

export default {
  name: 'DemoCodeBlock',
  props: {
    customClass: String,
    sourceCode: String
  },
  data () {
    return {
      hover: false,
      fixedControl: false,
      isExpanded: false,
      codepen: {
        script: '',
        html: '',
        style: '',
      },
    }
  },
  computed: {
    blockClass () {
      const pathArr = this.$page.path.split('/')
      const component = pathArr[pathArr.length - 1].split('.')[0]
      return `demo-${component}`
    },
    controlText () {
      return this.isExpanded ? '隐藏代码' : '显示代码'
    },
    codeAreaHeight () {
      const description = this.$refs.description
      if (description) {
        return description.clientHeight + this.$refs.highlight.clientHeight + 20
      }
      return this.$refs.highlight.clientHeight
    }
  },
  watch: {
    isExpanded (val) {
      this.$refs.meta.style.height = val ? `${ this.codeAreaHeight + 1 }px` : '0'
      if (!val) {
        this.fixedControl = false
        this.$refs.control.style.left = '0'
        this.removeScrollHandler()
        return
      }
      setTimeout(() => {
        window.addEventListener('scroll', this.scrollHandler)
        this.scrollHandler()
      }, 300)
    },
  },
  created() {
    // if (this.sourceCode) {
    //   this.codepen.html = stripTemplate(this.sourceCode)
    //   this.codepen.script = stripScript(this.sourceCode)
    //   this.codepen.style = stripStyle(this.sourceCode)
    // }
  },
  mounted() {
    nextTick(() => {
      if (!this.$refs.description) {
        this.$refs.highlight.style.width = '100%'
      }
    })
  },
  beforeUnmount() {
    this.removeScrollHandler()
  },
  methods: {
    scrollHandler() {
      const { top, bottom, left } = this.$refs.meta.getBoundingClientRect()
      const innerHeight = window.innerHeight || document.body.clientHeight
      this.fixedControl = bottom > innerHeight && top + 44 <= innerHeight
      this.$refs.control.style.left = this.fixedControl ? `${ left }px` : '0'
    },
    removeScrollHandler() {
      window.removeEventListener('scroll', this.scrollHandler)
    },
    onCopy() {
      clipboardCopy(this.sourceCode)
      alert('复制成功')
    },
    goCodepen() {}
  }
}
</script>

<style lang='scss' scoped>
.demo-block {
  margin: 10px 0;
  border: solid 1px #ebebeb;
  border-radius: 3px;
  transition: .2s;
}

.demo-block.hover {
  box-shadow: 0 0 8px 0 rgba(232, 237, 250, .6), 0 2px 4px 0 rgba(232, 237, 250, .5);
}

.source {
  box-sizing: border-box;
  padding: 24px;
  transition: .2s;
}

.meta {
  border-top: solid 1px #ebebeb;
  background-color: var(--code-bg-color);
  overflow: hidden;
  height: 0;
  transition: height .2s;
}

.description {
  border: solid 1px #ebebeb;
  border-radius: 3px;
  padding: 20px;
  box-sizing: border-box;
  line-height: 26px;
  color: var(--c-text);
  word-break: break-word;
  margin: 10px 10px 6px 10px;
  background-color: #fff;
}

.demo-block-control {
  border-top: solid 1px #eaeefb;
  height: 44px;
  box-sizing: border-box;
  background-color: #fff;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  text-align: center;
  margin-top: -1px;
  color: #d3dce6;
  cursor: pointer;
  position: relative;
}

.demo-block-control.is-fixed {
  position: fixed;
  bottom: 0;
  width: calc(100% - 20rem - 3rem - 12.5rem - 1px);
  border-right: solid 1px #eaeefb;
  z-index: 1;
}

.demo-block-control .control-icon {
  display: inline-block;
  font-size: 16px;
  line-height: 44px;
  transition: .3s;
}
.demo-block-control .control-icon.hovering {
  transform: translateX(-40px);
}

.demo-block-control .control-text {
  position: absolute;
  transform: translateX(-30px);
  font-size: 14px;
  line-height: 44px;
  font-weight: 500;
  transition: .3s;
  display: inline-block;
}

.demo-block-control:hover {
  color: var(--c-brand);
  background-color: #f9fafc;
}

.demo-block-control .text-slide-enter,
.demo-block-control .text-slide-leave-active {
  opacity: 0;
  transform: translateX(10px);
}

.demo-block-control .control-button {
  padding: 14px 0;
  color: var(--c-brand);
  font-size: 14px;
  font-weight: 500;
  margin: 0 10px;
}

.demo-block-control .control-button-wrap {
  line-height: 44px;
  position: absolute;
  top: 0;
  right: 0;
  padding-left: 5px;
  padding-right: 25px;
}
</style>
<style>
.highlight div[class*='language-'] {
  margin: 0 !important;
}
</style>
