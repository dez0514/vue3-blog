<template>
  <div v-if="mode === 'swiper'">
    <div class="pc-banner-wrap" v-if="isPc">
      <bubble-cover :cover="curCover" :radius="true"></bubble-cover>
      <pc-swiper v-if="bannerList.length > 0" :list="bannerList" @changeSlideIndex="getSlideIndex"></pc-swiper>
    </div>
    <div class="banner-wrap" v-else>
      <bubble-cover :cover="curCover"></bubble-cover>
      <div v-if="bannerList.length > 0">
        <div class="swiper-pics">
          <pic-swiper :list="picList"></pic-swiper>
        </div>
        <text-swiper :list="bannerList" @changeSlideIndex="getSlideIndex"></text-swiper>
      </div>
    </div>
  </div>
  <div v-else>
    <div :class="['mode_image', isPc ? 'pc-banner-wrap' : 'banner-wrap']">
      <bubble-cover :cover="banner" :radius="true" :shadow="shadow" :isBlur="isBlur"></bubble-cover>
      <div class="title-wraps">
        <div class="title">{{ title }}</div>
        <div class="tag-wrap" v-if="tagList.length > 0">
          <div class="tag" v-for="(item, idx) in tagList" :key="idx">{{ item.name }}</div>
        </div>
        <div class="little-title">{{ extraTitle }}</div>
        <div class="img-wrap" v-show="banner" :style="{ '--url': `url(${banner})` }"></div>
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
import { onMounted, ref, toRefs, computed } from 'vue'
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
  articleId: string | number;
}
interface Props {
  mode?: 'swiper' | 'image';
  bannerList?: bannerItem[];
  title?: string;
  extraTitle?: string;
  banner?: string;
  tagList?: tagItem[];
  shadow?: boolean;
  isBlur?: boolean;
}
const curCover = ref<string>('')
const props = withDefaults(defineProps<Props>(), {
  mode: 'image',
  title: '',
  extraTitle: '',
  banner: '',
  bannerList: [] as any,
  tagList: [] as any,
  shadow: false,
  isBlur: false
})
const { mode, title, extraTitle, banner, tagList, bannerList, shadow, isBlur } = toRefs(props)
const picList = computed(() => {
  return bannerList.value.map(item => {
    return {
      banner: item.banner,
      articleId: item.articleId
    }
  }) || []
})
const getSlideIndex = (index: number | string) => {
  const findex = bannerList.value.findIndex(item => item.articleId === index)
  if (findex > -1) {
    curCover.value = bannerList.value[findex].banner || ''
  }
}
onMounted(() => {
  console.log('banner page===', bannerList.value)
  // if(bannerList.value && bannerList.value.length > 0) {
  //   curCover.value = bannerList.value[0].banner || ''
  // }
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
  position: absolute;
  width: 100%;
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
  padding: 20px 280px 20px 80px;
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

.tag-wrap {
  overflow: hidden;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  color: var(--white);
  text-shadow: 0 2px 3px var(--gray_opacity_5);
  opacity: .6;
  font-size: 16px;
  margin: 10px 0;

  .tag {
    margin: 0 8px;
    padding: 3px 0;
    position: relative;
    color: var(--white);
  }
}

.img-wrap {
  position: absolute;
  right: 60px;
  /* margin-right: 60px; */
  width: 220px;
  height: 220px;
  border-radius: 12px;
  box-shadow: 0 8px 15px rgba(0, 0, 0, .4), 60px 0 20px -30px rgba(0, 0, 0, .5), -60px 0 20px -30px rgba(0, 0, 0, .5);
  background: var(--url) no-repeat;
  background-position: 0 0;
  background-size: 100% 100%;
}
</style>