# Vue Script

## 基础用法

基础的按钮用法。

:::demo 使用`type`、`plain`、`round`和`circle`属性来定义 Button 的样式。

```vue
<template>
  <input class="input" type="text" v-model="input"/>
  <xl-button type="primary" @click="onSubmit">提交</xl-button>
  <div style="margin-top: 16px">输出内容：{{ content }}</div>
</template>

<script>
import { ref, defineComponent } from 'vue'

export default defineComponent({
  name: 'InputDemo',
  setup() {
    const input = ref()
    const content = ref()

    const url = 'https://github.com/xinlei3166/vuepress-plugin-demoblock-plus'

    const data = [
      {
        name: '1'
      },
      {
        name: '1'
      },
      {
        name: '1'
      }
    ]

    function onSubmit() {
      content.value = input.value
    }

    return { input, content, onSubmit }
  }
})
</script>

<style lang="less">
.input {
  border: 1px solid var(--c-border);
  border-radius: 4px;
  background: transparent;
  padding: 14px;
  width: 300px;
  font-size: 16px;
  margin-right: 16px;
}
</style>
```

:::


## Setup TypeScript 用法

setup typescript 用法。

:::demo 使用`type`、`plain`、`round`和`circle`属性来定义 Button 的样式。

```vue
<template>
  <input class="input" type="text" v-model="input"/>
  <xl-button type="primary" @click="onSubmit">提交</xl-button>
  <div style="margin-top: 16px">输出内容：{{ content }}</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

interface IObject {
  [k: string]: any
}

const input = ref<any>()
const content = ref<any>()

function onSubmit(data: any, params: {}, { a = 1, b} : any) {
  content.value = input.value
}
</script>

<style lang="less">
.input {
  border: 1px solid var(--c-border);
  border-radius: 4px;
  background: transparent;
  padding: 14px;
  width: 300px;
  font-size: 16px;
  margin-right: 16px;
}
</style>
```

:::
