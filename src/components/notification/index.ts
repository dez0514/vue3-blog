import { App, createApp } from "vue"
import notification from "./container.vue"
import { NotificationProps } from './type'
let app: App<Element> | null = null
const show = ({type, message, duration = 1000} : NotificationProps) => {
  const rootBox = document.getElementById('notificationContainerBox')
  if(!rootBox || !document.body.contains(rootBox) || !app) {
    const root = document.createElement('div')
    root.setAttribute('id', 'notificationContainerBox')
    app = createApp(notification, {
      onEnd: () => { // 当消息弹完时 再清除容器
        // console.log('onEnd trigger===销毁容器')
        root.remove()
        app?.unmount()
      }
    })
    root.style.display = 'contents' // 避免被公共div样式覆盖
    app.mount(root)
    document.body.append(root)
    // console.log('app===', app)
  }
  // 利用 app 获取组件内的 onAdd 方法
  // 每次触发show,都往消息队列追加一条消息
  app?._instance?.exposed?.onAdd({
    id: new Date().getTime().toString(), // 每条消息的唯一标识
    type,
    message,
    duration
  })
}

const error = ({ message, duration = 1000} : NotificationProps) => {
  show({
    type: 'error',
    message: message,
    duration: duration
  })
}
const info = ({ message, duration = 1000} : NotificationProps) => {
  show({
    type: 'info',
    message: message,
    duration: duration
  })
}

const success = ({ message, duration = 1000} : NotificationProps) => {
  show({
    type: 'success',
    message: message,
    duration: duration
  })
}
export default {
  show,
  error,
  info,
  success
}