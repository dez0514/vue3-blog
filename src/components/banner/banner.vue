<template>
<div v-if="mode === 'swiper'">
  <div class="pc-banner-wrap" v-if="isPc">
    <bubble-cover></bubble-cover>
    <pc-swiper></pc-swiper>
  </div>
  <div class="banner-wrap" v-else>
    <bubble-cover></bubble-cover>
    <div>
      <div class="swiper-pics">
        <pic-swiper></pic-swiper>
      </div>
      <text-swiper></text-swiper>
    </div>
  </div>
</div>
<div v-else>
  <div :class="['mode_image', isPc ? 'pc-banner-wrap':'banner-wrap']">
    <bubble-cover></bubble-cover>
    <div class="title-wraps">
      <div class="title">标题测试</div>
      <div class="little-title">测试，小标题</div>
    </div>
  </div>
</div>
</template>
<script lang="ts" setup>
import BubbleCover from '../BubbleCover/index.vue' 
import PicSwiper from './PicSwiper.vue'
import TextSwiper from './TextSwiper.vue'
import PcSwiper from './pcSwiper.vue'
import { configStore } from '../../store'
import { storeToRefs } from 'pinia'
import { toRefs } from 'vue'
const configStores = configStore()
const { isPc } = storeToRefs(configStores)
interface Props {
  mode?: 'swiper' | 'image'
}
const props = withDefaults(defineProps<Props>(), {
  mode: 'image'
})
const { mode } = toRefs(props)
</script>
<style lang="scss" scoped>
.pc-banner-wrap {
  position: relative;
  background-color: #78797b;
  height: 320px;
  border-radius: 10px;
}
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
  &.mode_image {
    height: 220px;
  }
}
.title-wraps {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
}
.title {
  font-size: 28px;
  font-weight: 600;
  color: var(--white);
  
}
.little-title {
  color: var(--white);
  text-shadow: 0 2px 3px var(--gray_opacity_5);
  opacity: .6;
  font-size: 16px;
  margin: 10px 0;
}
.pc-banner-wrap .title-wraps {
  padding: 20px 80px;
}
.banner-wrap .title-wraps {
  padding: 10px;
  align-items: center;
  .title {
    text-align: center;
  }
  .little-title {
    text-align: center;
  }
}

</style>