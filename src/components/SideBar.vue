<template>
  <div :class="['side-wrap', isCollapse ? 'rotate' : '']">
    <div style="text-align: right">5555</div>
  </div>
</template>
<script lang="ts" setup>
import { configStore } from '../store'
import { storeToRefs } from 'pinia'
const configStores = configStore()
const { isCollapse } = storeToRefs(configStores)

</script>
<style lang="scss" scoped>
.side-wrap {
  z-index: var(--zIndex_6);
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  overflow: hidden;
  overflow-y: auto;
  box-sizing: border-box;
  height: 100vh;
  width: 250px;
  padding: 10px;
  background: var(--gray_9);
  transition: all .5s;
  transform-origin: right;
  transform: translateX(-250px) translateZ(100px) perspective(300px) rotateY(-55deg);
  &.rotate {
    transform-origin: right;
    transform: translateX(0) translateZ(100px) perspective(300px) rotateY(0deg);
  }
}
</style>