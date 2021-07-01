import { defineClientAppEnhance } from '@vuepress/client'
import Button from '../../src/components/Button.vue'
import '../../src/styles/index.css'
import './styles/index.scss'

export default defineClientAppEnhance(({
  app,
  router, // 当前应用的路由实例
  siteData, // 站点元数据
}) => {
  app.component(Button.name, Button)
})

