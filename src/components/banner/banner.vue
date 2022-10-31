<template>
<div v-if="mode === 'swiper'">
  <div class="pc-banner-wrap" v-if="isPc">
    <bubble-cover :cover="curCover" :radius="true"></bubble-cover>
    <pc-swiper :list="bannerList" @changeSlideIndex="getSlideIndex"></pc-swiper>
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
  <div :class="['mode_image', isPc ? 'pc-banner-wrap':'banner-wrap']"
    :style="{
      background: banner ? `url(${banner}) no-repeat` : '',
      backgroundPosition: 'center center',
      backgroundSize: 'cover'
    }"
  >
    <bubble-cover :cover="banner"></bubble-cover>
    <div class="title-wraps">
      <div class="title">{{ title }}</div>
      <div class="little-title">{{ extraTitle }}</div>
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
import { onMounted, ref, toRefs } from 'vue'
const configStores = configStore()
const { isPc } = storeToRefs(configStores)
interface tagItem {
  name?: string;
}
interface bannerItem {
  title?: string;
  extraTitle?: string;
  banner?: string;
  tagList: tagItem[];
  articleId?: string | number;
}
interface Props {
  mode?: 'swiper' | 'image';
  bannerList?: bannerItem[];
  title?: string;
  extraTitle?: string;
  banner?: string;
  tagList?: tagItem[];
}
const curCover = ref<string>('')
const props = withDefaults(defineProps<Props>(), {
  mode: 'image',
  title: '',
  extraTitle: '',
  banner: '',
  bannerList: [] as any,
  tagList: [] as any
})
const { mode, title, extraTitle, banner, tagList, bannerList  } = toRefs(props)
const getSlideIndex = (index: number) => {
  if(bannerList.value && bannerList.value.length) {
    curCover.value = bannerList.value[index].banner || ''
  }
}
onMounted(() => {
  if(bannerList.value && bannerList.value.length > 0) {
    curCover.value = bannerList.value[0].banner || ''
  }
})
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