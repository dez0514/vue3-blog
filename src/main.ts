
import { App, createApp } from 'vue'
import AppVue from '@/App.vue'
import router from './router'
import { createPinia } from 'pinia'
import 'virtual:svg-icons-register'
import SvgIcon from '@components/svgIcon.vue' // 引入组件
import 'nprogress/nprogress.css'

import "@/styles/reset.scss";
const app: App<Element> = createApp(AppVue)
app.component('svg-icon', SvgIcon)
app.use(createPinia())
app.use(router)
app.mount('#app')