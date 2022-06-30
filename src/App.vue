<template>
  <div :class="['page-container', isCollapse ? 'rotate' : '']">
    <vheader></vheader>
    <div :class="['content', isPc ? 'pc-content' : '']">
      <router-view></router-view>
    </div>
    <vfooter></vfooter>
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
import { onMounted, onUnmounted } from 'vue';
import { storeToRefs } from 'pinia'
const configStores = configStore()
const { isPc, isCollapse } = storeToRefs(configStores)
const hideSide = () => {
  configStores.updateCollapse(false)
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
onMounted(() => {
  window.addEventListener('resize', () => resize())
})
onUnmounted(() => {
  window.removeEventListener('resize', () => {})
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
  transform: perspective(600px) rotateY(10deg) translateX(250px);
}
</style>