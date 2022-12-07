import { defineStore } from 'pinia'
import { MdTitle } from '../utils/marked'
interface Istate {
  detailMenuList: MdTitle[];
  activeMenuIndex: number;
}
export const detailPageStore = defineStore('detailPageData', {
  state: (): Istate => ({
    detailMenuList: [],
    activeMenuIndex: 0
  }),
  getters: {
    getDetailMenuList(state: Istate): MdTitle[] {
      return state.detailMenuList
    },
    getActiveMenuIndex(state: Istate): number {
      return state.activeMenuIndex
    }
  },
  actions: {
    updateDetailMenuList(payload: MdTitle[]) {
      this.detailMenuList = payload
    },
    updateDetailMenuIndex(payload: number) {
      this.activeMenuIndex = payload
    }
  }
})