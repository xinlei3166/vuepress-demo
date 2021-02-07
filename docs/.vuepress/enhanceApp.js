// import Demo from './dynamic/demo.vue'
import Button from '../../src/components/Button.vue'
import '../../src/styles/index.css'
import './styles/iconfont/iconfont.css'

export default ({
  Vue, // VuePress 正在使用的 Vue 构造函数
  options, // 附加到根实例的一些选项
  router, // 当前应用的路由实例
  siteData, // 站点元数据
  isServer // 当前应用配置是处于 服务端渲染 或 客户端
}) => {
  Vue.component(Button.name, Button)
  // Vue.component(Demo.name, Demo)
}
