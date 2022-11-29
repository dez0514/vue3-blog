import { createApp } from "vue"
import prompt from "./prompt.vue"
export default function (content: string = '', onConfirmCb: Function = () => {}, onCancelCb: Function = () => {}, title: string = '提示') {
  const div = document.createElement('div')
  const app = createApp(prompt, {
    title,
    content,
    onCancel: () => {
      onCancelCb()
      div.remove()
      app.unmount()
    },
    onConfirm: async () => {
      await onConfirmCb()
    }
  })
  app.mount(div)
  div.style.display = 'contents' // 避免被公共div样式覆盖
  document.body.append(div)
}