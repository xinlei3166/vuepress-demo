import { defineClientConfig } from '@vuepress/client'
import Button from '../../src/components/Button.vue'
import '../../src/styles/index.css'
import './styles/index.scss'

export default defineClientConfig({
  enhance({ app, router, siteData }) {
    app.component(Button.name, Button)
  },
  setup() { },
  rootComponents: [],
})
