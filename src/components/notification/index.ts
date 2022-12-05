import { App, createApp } from "vue"
import notification from "./container.vue"
import { NotificationProps } from './type'
let notifyApp: App<Element> | null = null
const show = ({type, message, duration = 1000} : NotificationProps) => {
  const rootBox = document.getElementById('notificationContainerBox')
  if(!rootBox || !document.body.contains(rootBox) || !notifyApp) {
    const root = document.createElement('div')
    root.setAttribute('id', 'notificationContainerBox')
    notifyApp = createApp(notification, {
      onEnd: () => { // 当消息弹完时 再清除容器
        // console.log('onEnd trigger===销毁容器')
        root.remove()
        notifyApp?.unmount()
      }
    })
    root.style.display = 'contents' // 避免被公共div样式覆盖
    notifyApp.mount(root)
    document.body.append(root)
    // console.log('app===', app)
  }
  // 利用 app 获取组件内的 onAdd 方法
  // 每次触发show,都往消息队列追加一条消息
  notifyApp?._instance?.exposed?.onAdd({
    id: new Date().getTime().toString(), // 每条消息的唯一标识
    type,
    message,
    duration
  })
}
const msgFunc = (notice : NotificationProps | string, type: 'error' | 'info' | 'success') => {
  let duration = 1000
  let message = ''
  if(typeof notice === 'string') {
    message = notice
  } else {
    message = notice.message
    if(notice.duration) {
      duration = notice.duration
    }
  }
  show({
    type: type,
    message: message,
    duration: duration
  })
}
const error = (notice : NotificationProps | string) => {
  msgFunc(notice, 'error')
}
const info = (notice : NotificationProps | string) => {
  msgFunc(notice, 'info')
}
const success = (notice : NotificationProps | string) => {
  msgFunc(notice, 'success')
}
export default {
  show,
  error,
  info,
  success
}