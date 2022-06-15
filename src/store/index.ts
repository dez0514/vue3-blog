import { defineStore } from 'pinia'
import { ConfigState } from '../types'

export const configStore = defineStore('config', {
  state: (): ConfigState => ({
    isCollapse: false,
    isPc: true
  }),
  getters: {
    getCommonConfig(state: ConfigState): ConfigState {
      return state
    }
  },
  actions: {
    updateCollapse(payload: boolean) {
      this.isCollapse = payload
    },
    updateIsPc(payload: boolean) {
      this.isPc = payload
    }
  },
})