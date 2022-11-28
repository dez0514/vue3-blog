import { createApp, ref } from "vue"
import prompt from "./prompt.vue"
export default function (content: string = '', onConfirmCb: Function = () => {}, onCancelCb: Function = () => {}, title: string = '提示') {
  const div = document.createElement('div')
  const promptLoading = ref<boolean>(true)
  const app = createApp(prompt, {
    title,
    content,
    loading: promptLoading.value,
    onClose: () => {
      onCancelCb()
      div.remove()
      app.unmount()
    },
    onCancel: () => {
      onCancelCb()
      div.remove()
      app.unmount()
    },
    onConfirm: async () => {
      try {
        promptLoading.value = true
        await onConfirmCb()
        promptLoading.value = false
        onCancelCb()
        div.remove()
        app.unmount()
      } catch {
        promptLoading.value = false
      }
    }
  })
  app.mount(div)
  div.style.display = 'contents' // 避免被公共div样式覆盖
  document.body.append(div)
}