<template>
  <div class="banner-wrap">
    <bubble-cover></bubble-cover>
    <div class="swiper-pics">
      <pic-swiper></pic-swiper>
    </div>
    <text-swiper></text-swiper>
  </div>
</template>
<script lang="ts" setup>
import BubbleCover from './BubbleCover/index.vue' 
import PicSwiper from './PicSwiper.vue'
import TextSwiper from './TextSwiper.vue'
</script>
<style lang="scss" scoped>
.banner-wrap {
  position: relative;
  background-color: #78797b;
  height: 350px;
  .swiper-pics {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
  }
}

/* 设备最大宽度1200px的样式 */
@media screen and (max-width: 1200px) {}

/* 平板 */
@media screen and (max-width: 768px) {}

/* 手机 */
@media screen and (max-width: 480px) {
  .box2 {
    width: 120Px;
    height: 60Px;
    background-color: #1890ff;
  }
}
</style>