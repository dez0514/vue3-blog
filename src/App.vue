<template>
  <div :class="['page-container', isCollapse ? 'rotate' : '']">
    <vheader></vheader>
    <div :class="['content', isPc ? 'pc-content' : '']">
      <router-view></router-view>
    </div>
    <vfooter></vfooter>
  </div>
  <div v-show="showToTop" class="to-top" @click="handleToTop">
    <svg-icon class="icon" icon-class="top"></svg-icon>
  </div>
  <transition name="fade" v-if="!isPc">
	  <div class="sider-mask" v-show="isCollapse" @click="hideSide"></div>
  </transition>
  <side-bar v-if="!isPc"></side-bar>
</template>
<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import vheader from './components/vheader.vue'
import vfooter from './components/vfooter.vue'
import SideBar from './components/SideBar.vue'
import { configStore } from './store'
import { onMounted, onUnmounted, ref } from 'vue';
import { storeToRefs } from 'pinia'
import { setScrollTop } from './utils/dom'
const configStores = configStore()
const { isPc, isCollapse } = storeToRefs(configStores)
const showToTop = ref<boolean>(false)
const hideSide = () => {
  configStores.updateCollapse(false)
}
const handleToTop = () => {
  setScrollTop(0, { animate: true, duration: 1000 })
}
const resize = () => {
  // console.log(document.body.clientWidth)
  const ispc = document.body.clientWidth > 990
  configStores.updateIsPc(ispc)
  if(ispc) {
    // 防止侧边栏没隐藏
    configStores.updateCollapse(false)
  }
}
const handleScrollPage = () => {
  const distance = document.documentElement.scrollTop
  if (distance > 100) {
    showToTop.value = true
  } else {
    showToTop.value = false
  }
}
onMounted(() => {
  window.addEventListener('resize', () => resize())
  window.addEventListener('scroll', handleScrollPage)
})
onUnmounted(() => {
  window.removeEventListener('resize', () => resize())
  window.removeEventListener('scroll', handleScrollPage)
})
</script>
<style lang="scss" scoped>
.page-container {
  width: 100%;
  transition: all .5s;
}
.content {
  box-sizing: border-box;
  min-height: calc(100vh - 138px);
  padding-top: 58px;
  &.pc-content {
    padding: 78px 40px 0 40px;
  }
}
@media screen and (max-width: 990px) {
  .content {
    min-height: calc(100vh - 60px);
  }
}
.sider-mask {
  z-index: var(--zIndex_5);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--gray_opacity_5);
}
.fade-enter-active, .fade-leave-active {
	transition: opacity 1s
 }
.fade-enter, .fade-leave-to {
	opacity: 0
} 
.rotate {
  /* transform-origin: left 450px; */
  transform: perspective(600px) rotateY(10deg) translateX(250px) translateY(-30px);
}
.to-top {
  position: fixed;
  bottom: 60px;
  right: 20px;
  cursor: pointer;
  .icon {
    font-size: 34px;
  }
}
</style>