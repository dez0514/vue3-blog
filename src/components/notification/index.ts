import { createVNode, render } from "vue"
import notification from "./notification.vue"
import { NotificationProps } from './type'
export default function ({type, message, duration = 1000} : NotificationProps) {
  const div = document.createElement('div')
  const app = createVNode(notification, {
    type,
    message,
    duration,
    onRemove: () => {
      render(null, div)
      div.remove()
    }
  })
  div.style.display = 'contents' // 避免被公共div样式覆盖
  render(app, div)
  document.body.append(div)
}