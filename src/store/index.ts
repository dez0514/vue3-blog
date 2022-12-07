import { defineStore } from 'pinia'
import { ConfigState, UpdateState } from '../types'

export const configStore = defineStore('config', {
  state: (): ConfigState => ({
    isPc: document.body.clientWidth > 990, // is pc
    isCollapse: false, // app sidebar
    isShowMask: false
  }),
  getters: {
    getCommonConfig(state: ConfigState): ConfigState {
      return state
    }
  },
  actions: {
    // updateCollapse(payload: boolean) {
    //   this.isCollapse = payload
    //   if (payload) {
    //     document.getElementsByTagName("body")[0].className = 'lock'
    //   } else {
    //     document.body.removeAttribute("class")
    //   }
    // },
    // updateIsPc(payload: boolean) {
    //   this.isPc = payload
    // },
    // updateIsShowMask(payload: boolean) {
    //   this.isShowMask = payload
    // },
    // 合并更新方法
    updateConfig(payload: UpdateState) {
      this.$state = { ...this.$state, ...payload }
      if (payload.isShowMask) {
        document.documentElement.classList.add('lock')
      } else {
        document.documentElement.classList.remove('lock')
      }
    }
  },
})