import { App, createApp } from "vue"
import loading from "./loading.vue"
let loadApp: App<Element> | null = null
let needLoadCount = 0 // 多次连续触发show时，合并loading
const show = () => {
  if(needLoadCount > 0) {
    needLoadCount++
    return
  }
  const rootBox = document.getElementById('loadBox')
  if(rootBox && document.body.contains(rootBox) && loadApp) return
  const div = document.createElement('div')
  div.setAttribute('id', 'loadBox')
  loadApp = createApp(loading, {
    isfixed: true,
    isShow: true,
    status: 0,
    onClose: () => {
      div.remove()
      loadApp?.unmount()
    }
  })
  loadApp.mount(div)
  div.style.display = 'contents' // 避免被公共div样式覆盖
  document.body.append(div)
  needLoadCount++
  console.log('needLoadCount==', needLoadCount)
}

const hide = () => {
  console.log('needLoadCount=======', needLoadCount)
  needLoadCount--
  if(needLoadCount === 0) {
    const rootBox = document.getElementById('loadBox')
    if(rootBox && document.body.contains(rootBox) && loadApp) {
      rootBox.remove()
      loadApp?.unmount()
    }
  }
}

export default {
  show,
  hide
}