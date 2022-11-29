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
  <div class="login-btn" @click="handleClickLoginBtn">
    <svg-icon class="icon" :icon-class="global_isLogin ? 'me': 'memb'"></svg-icon>
  </div>
  <login-card v-model:visiable="showLogin" />
  <transition name="fade">
	  <div class="system-mask" v-show="isShowMask" @click="hideMaskAll"></div>
  </transition>
  <side-bar v-if="!isPc"></side-bar>
</template>
<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import vheader from './components/vheader.vue'
import vfooter from './components/vfooter.vue'
import SideBar from './components/SideBar.vue'
import loginCard from './components/loginCard.vue'
import { configStore } from './store'
import { onMounted, onUnmounted, ref } from 'vue';
import { storeToRefs } from 'pinia'
import { setScrollTop } from './utils/dom'
import { useLoginInfo } from './utils/useLoginInfo'
const { global_isLogin } = useLoginInfo()
const configStores = configStore()
const { isPc, isCollapse, isShowMask } = storeToRefs(configStores)
const showToTop = ref<boolean>(false)
const showLogin = ref<boolean>(false)
const handleChangeShowLogin = (flag: boolean) => {
  showLogin.value = flag
}
const handleClickLoginBtn = () => {
  configStores.updateConfig({ isShowMask: true })
  handleChangeShowLogin(true)
}
const hideMaskAll = () => {
  configStores.updateConfig({ isCollapse: false, isShowMask: false })
  handleChangeShowLogin(false)
}
const handleToTop = () => {
  setScrollTop(0, { animate: true, duration: 1000 })
}
const resize = () => {
  // console.log(document.body.clientWidth)
  const ispc = document.body.clientWidth > 990
  configStores.updateConfig({ isPc: ispc })
  if(ispc) {
    // 防止侧边栏没隐藏
    configStores.updateConfig({ isCollapse: false, isShowMask: false })
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
  configStores.updateConfig({ isCollapse: false, isShowMask: false })
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
.system-mask {
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
.login-btn {
  z-index: var(--zIndex_2);
  position: fixed;
  bottom: 118px;
  right: 20px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: var(--text_color);
  background-color: var(--white);
  transition: .5s;
  box-shadow: 0 13px 15px -5px var(--gray_opacity_2);
  line-height: 38px;
  text-align: center;
  cursor: pointer;
  .icon {
    font-size: 16px;
  }
  &:hover {
    background-color: var(--primary);
    color: var(--white);
    box-shadow: 0 13px 15px -5px var(--primary_opacity_5);
  }
}
</style>