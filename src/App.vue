<template>
  <div>
    <vheader></vheader>
    <div :class="['content', isPc ? 'pc-content' : '']">
      <router-view></router-view>
    </div>
  </div>
</template>
<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import vheader from './components/vheader.vue'
import { configStore } from './store'
import { onMounted, onUnmounted } from 'vue';
import { storeToRefs } from 'pinia'
const configStores = configStore()
const { isPc } = storeToRefs(configStores)
const resize = () => {
  // console.log(document.body.clientWidth)
  const ispc = document.body.clientWidth > 990
  configStores.updateIsPc(ispc)
}
onMounted(() => {
  resize()
  window.addEventListener('resize', () => resize())
})
onUnmounted(() => {
  window.removeEventListener('resize', () => {})
})
</script>

<style lang="scss" scoped>
.content {
  padding-top: 58px;
  &.pc-content {
    padding: 78px 40px 0 40px;
  }
}
</style>
