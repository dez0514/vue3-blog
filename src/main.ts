
import { App, createApp } from 'vue'
import AppVue from '@/App.vue'
import router from './router'
import { createPinia } from 'pinia'
import 'virtual:svg-icons-register'
import SvgIcon from '@components/svgIcon.vue' // 引入组件
import '@iconfu/svg-inject'
import { copyTextByDom } from './utils/dom'
import "@/styles/reset.scss";
import 'nprogress/nprogress.css'
import './styles/md/index.less'
import notification from './components/notification'

// 复制代码
const copyCode = () => {
  copyTextByDom('copy-code-btn', {
    deep: true,
    success: () => {
      notification.info('代码复制成功~')
    },
    error: () => {
      notification.error('代码复制失败~')
    }
  })
}
// const _window = window as any
window.copyCode = copyCode

const app: App<Element> = createApp(AppVue)
app.component('svg-icon', SvgIcon)
app.use(createPinia())
app.use(router)
app.mount('#app')