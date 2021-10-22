# Vuepress Demo
基于 [vuepress-plugin-demoblock-plus](https://github.com/xinlei3166/vuepress-plugin-demoblock-plus) 插件来实现vue组件的支持。


- [x] vue组件

```js
<demo-block>
  <xl-button>默认按钮</xl-button>
  <xl-button type="primary">主要按钮</xl-button>
  <xl-button type="success">成功按钮</xl-button>
  <xl-button type="info">信息按钮</xl-button>
  <xl-button type="warning">警告按钮</xl-button>
  <xl-button type="danger">危险按钮</xl-button>
</demo-block>
```

![image-20210615194021326](https://tva1.sinaimg.cn/large/008i3skNly1grj6qits6pj312c04aq3j.jpg)



- [x] vue代码自动渲染并且显示对应code（支持script和style）

:::demo 使用`type`、`plain`、`round`和`circle`属性来定义 Button 的样式。
```vue
<template>
  <xl-button>默认按钮</xl-button>
  <xl-button type="primary">主要按钮</xl-button>
  <xl-button type="success">成功按钮</xl-button>
  <xl-button type="info">信息按钮</xl-button>
  <xl-button type="warning">警告按钮</xl-button>
  <xl-button type="danger">危险按钮</xl-button>
</template>
```
:::

![image-20210624155537957](https://tva1.sinaimg.cn/large/008i3skNly1grtetfss3hj317w0m0wi9.jpg)



- [x] 支持script和style

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

    function onSubmit() {
      content.value = input.value
    }

    return { input, content, onSubmit }
  }
})
</script>

<style>
.input {
  border: 1px solid #ebebeb;
  border-radius: 4px;
  padding: 14px;
  width: 300px;
  font-size: 16px;
  margin-right: 16px;
}
</style>
```

:::

![image-20210624155804884](https://tva1.sinaimg.cn/large/008i3skNly1grtevxvq2wj30u0103wjn.jpg)


## 捐赠

如果感觉对您有帮助，请作者喝杯咖啡吧，请注明您的名字或者昵称，方便作者感谢。

| 微信 | 支付宝 |
| :---: | :---: |
| ![](https://xinlei3166.github.io/wxpay.png) | ![](https://xinlei3166.github.io/alipay.png) |






