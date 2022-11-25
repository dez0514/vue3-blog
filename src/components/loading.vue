<template>
  <div class="loading" v-show="isShow">
    <div class="sk-wave" v-show="status === 0">
      <div class="sk-wave-rect"></div>
      <div class="sk-wave-rect"></div>
      <div class="sk-wave-rect"></div>
      <div class="sk-wave-rect"></div>
      <div class="sk-wave-rect"></div>
    </div>
    <div class="nodata" v-show="status === 1">
      <svg-icon class="icon" icon-class="sad"></svg-icon>
      <div style="margin-top: 10px;font-size: 14px;text-align: center;">空空如也~</div>
    </div>
    <div class="refresh" v-show="status === 2">
      <svg-icon class="icon" icon-class="resad"></svg-icon>
      <div style="margin-top: 10px;font-size: 14px;text-align: center;">点击重新加载</div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { toRefs } from 'vue'
interface Props {
  isShow?: boolean, // 是否显示
  status?: number // 状态 
}
const props = withDefaults(defineProps<Props>(), {
  isShow: true,
  status: 2
})

const { isShow, status } = toRefs(props)
</script>
<style lang="scss" scoped>
.loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.nodata .icon,
.refresh .icon {
  font-size: 90px;
  text-align: center;
}

.refresh {
  cursor: pointer;
}

.sk-wave {
  position: relative;
  height: 50px;
  width: 36px;
}

.sk-wave-rect {
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  background-color: #8a99ac;
  /* #9faab9 #bcc2cf #dee2e9 */
  height: 100%;
  width: 4px;
  border-radius: 40px;
  transform-origin: center;
  animation: sk-wave 1.2s infinite ease-in-out;
}

.sk-wave-rect:nth-child(1) {
  animation-delay: -1.2s;
  left: 0
}

.sk-wave-rect:nth-child(2) {
  animation-delay: -1.1s;
  left: 8px;
}

.sk-wave-rect:nth-child(3) {
  animation-delay: -1.0s;
  left: 16px;
}

.sk-wave-rect:nth-child(4) {
  animation-delay: -0.9s;
  left: 24px;
}

.sk-wave-rect:nth-child(5) {
  animation-delay: -0.8s;
  left: 32px;
}

@keyframes sk-wave {

  0%,
  40%,
  100% {
    height: 50%;
  }

  20% {
    height: 100%;
  }
}
</style>