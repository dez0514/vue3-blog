<template>
  <swiper class="swiper-text-container" 
    :loop="true"
    :resistanceRatio="0"
    :pagination="false"
    :followFinger="false"
    @slideChange="onSlideChange"
    @slidePrevTransitionStart="onSlidePrevStart"
    @slideNextTransitionStart="onSlideNextStart"
    @swiper="onSwiper"
    @resize="resize"
  >
    <swiper-slide v-for="item in list" :key="item.articleId">
      <div class="slide-content">
        <div class="slide-desc">
          <div class="title">{{ item.title }}</div>
            <div class="tag-wrap">
              <div class="tag" v-for="(inner, idx) in item.tagList" :key="`${item.articleId}_${idx}`">{{ inner?.name }}</div>
            </div>
            <div class="btn-read-wrap">
              <div class="btn-read" @click="goDetail(item.articleId)">
                <svg-icon class="icons" icon-class="right-arrow"></svg-icon>阅读全文
              </div>
            </div>
        </div>
      </div>
    </swiper-slide>
  </swiper>
</template>
<script lang="ts" setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import "swiper/css/bundle";
import { ref, toRefs } from "vue"
import { emitter } from '../../utils/useEmit'
import { useRouter } from "vue-router";
const router = useRouter();
const controlSwiper = ref(null)
const emit = defineEmits<{
  (e: 'changeSlideIndex', articleId: number | string): void
}>()
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
  list?: bannerItem[];
}
const props = withDefaults(defineProps<Props>(), {
  list: [] as any,
})
const { list  } = toRefs(props)
const onSwiper = (swiper: any) => {
  // console.log(swiper);
  controlSwiper.value = swiper
  swiper.updateSlides();
  swiper.slideTo(1, 0, false);
};
const resize = (swiper: any) => {
  swiper.update();
}
const onSlideChange = (swiper: any) => {
  // emitter.emit('change-slide', swiper.activeIndex)
  const articleId = list.value[swiper.realIndex].articleId
  emit('changeSlideIndex', articleId)
};
const onSlidePrevStart = (swiper: any) => {
  emitter.emit('change-prev-slide')
}
const onSlideNextStart= (swiper: any) => {
  emitter.emit('change-next-slide')
}
const goDetail = (id: string | number | undefined) => {
  if(id) {
    router.push(`/detail/${id}`)
  }
}
</script>
<style lang="scss" scoped>
.swiper-text-container {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  width: 100%;
  text-align: center;
}

.swiper-slide .slide-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  
  box-sizing: border-box;
  padding: 220px 10px 10px;
  width: 100%;
  height: 100%;
  .title {
    text-align: center;
    font-size: 18px;
    font-weight: 600;
    color: var(--white);
  }
  .tag-wrap {
    overflow: hidden;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: center;
    color: var(--white);
    text-shadow: 0 2px 3px var(--gray_opacity_5);
    opacity: .6;
    font-size: 16px;
    margin: 4px 0;
    .tag {
      margin: 0 8px;
      padding: 3px 0;
      position: relative;
      color: var(--white);
    }
  }
  .btn-read-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    .btn-read {
      padding: 9px 7px;
      text-decoration: none;
      color: var(--white);
      border: 1px solid var(--white_opacity_3);
      border-radius: 7px;
      -webkit-transition: .25s;
      transition: .25s;
      margin-top: 5px;
      font-size: 14px;
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
      &:hover {
        color: var(--primary);
        background: var(--white);
      }
    }
  }
}
</style>