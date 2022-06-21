<!-- 内容区的左侧边栏， 当页面滚动距离不超过它的上边 距离 顶部的距离时，正常放，超过时贴顶定位放置 -->
<template>
    <div :class="['left-menu-wrap', isFixed ? 'fixed' : '']">
        <slot></slot>
    </div>
</template>
<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue'

const isFixed = ref<boolean>(false)
const handleScrollWindow = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
    console.log('scrollTop==', scrollTop)
    if(scrollTop >= 341) {
        isFixed.value = true
    } else {
        isFixed.value = false
    }
}

onMounted(() => {
  window.addEventListener('scroll', handleScrollWindow)
})
onUnmounted(() => {
  window.removeEventListener('scroll', handleScrollWindow)
})
</script>
<style lang="scss" scoped>
.left-menu-wrap {
    width: inherit;
    max-height: calc(100vh - 56px);
    &.fixed {
        position: fixed;
        top: 56px;
    }
}
</style>