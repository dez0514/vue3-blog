import { defineStore } from 'pinia'
import { ConfigState } from '../types'

export const configStore = defineStore('config', {
  state: (): ConfigState => ({
    isCollapse: false, // app sidebar
    isPc: document.body.clientWidth > 990 // is pc
  }),
  getters: {
    getCommonConfig(state: ConfigState): ConfigState {
      return state
    }
  },
  actions: {
    updateCollapse(payload: boolean) {
      this.isCollapse = payload
      if (payload) {
        document.getElementsByTagName("body")[0].className = 'lock'
      } else {
        document.body.removeAttribute("class")
      }
    },
    updateIsPc(payload: boolean) {
      this.isPc = payload
    }
  },
})